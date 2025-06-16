"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { PublicationStatus } from "@prisma/client";
import { requireAuth } from "@/lib/auth";
import { stringUtils } from "@/lib/utils";
import { blogPostSchema, type BlogPostFormData } from "@/lib/schemas";

// Função auxiliar para obter ID do usuário atual
async function getCurrentUserId(): Promise<string> {
  const user = await requireAuth();
  return user.id;
}

// Buscar todos os posts
export async function getBlogPosts(
  filters: {
    category?: string;
    status?: PublicationStatus;
    featured?: boolean;
    search?: string;
  } = {}
) {
  try {
    const where: Record<string, unknown> = {};

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.featured !== undefined) {
      where.featured = filters.featured;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { excerpt: { contains: filters.search, mode: "insensitive" } },
        { content: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        createdByUser: {
          select: { name: true, email: true },
        },
        updatedByUser: {
          select: { name: true, email: true },
        },
      },
      orderBy: [
        { featured: "desc" },
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
    });

    return { success: true, data: posts };
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return { success: false, error: "Erro ao buscar posts" };
  }
}

// Buscar post por ID
export async function getBlogPostById(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        createdByUser: {
          select: { name: true, email: true },
        },
        updatedByUser: {
          select: { name: true, email: true },
        },
      },
    });

    if (!post) {
      return { success: false, error: "Post não encontrado" };
    }

    return { success: true, data: post };
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return { success: false, error: "Erro ao buscar post" };
  }
}

// Buscar post por slug
export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        createdByUser: {
          select: { name: true, email: true },
        },
      },
    });

    if (!post) {
      return { success: false, error: "Post não encontrado" };
    }

    // Incrementar visualizações se o post estiver publicado
    if (post.status === PublicationStatus.PUBLISHED) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      });
    }

    return { success: true, data: post };
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return { success: false, error: "Erro ao buscar post" };
  }
}

// Criar novo post
export async function createBlogPost(formData: BlogPostFormData) {
  try {
    // Validar dados do formulário
    const validatedData = blogPostSchema.parse(formData);

    // Gerar slug se não fornecido
    const slug =
      validatedData.slug || stringUtils.generateSlug(validatedData.title);

    // Verificar se slug já existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return { success: false, error: "Já existe um post com este slug" };
    }

    // Obter ID do usuário atual
    const userId = await getCurrentUserId();

    // Converter publishedAt se fornecido
    const publishedAt = validatedData.publishedAt
      ? new Date(validatedData.publishedAt)
      : validatedData.status === PublicationStatus.PUBLISHED
      ? new Date()
      : null;

    // Calcular tempo de leitura se não fornecido
    const readingTime =
      validatedData.readingTime || calculateReadingTime(validatedData.content);

    // Criar post
    const post = await prisma.blogPost.create({
      data: {
        title: validatedData.title,
        slug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        category: validatedData.category,
        tags: validatedData.tags,
        status: validatedData.status,
        featured: validatedData.featured,
        publishedAt,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        keywords: validatedData.keywords,
        thumbnail: validatedData.thumbnail,
        readingTime,
        createdBy: userId,
      },
      include: {
        createdByUser: {
          select: { name: true, email: true },
        },
      },
    });

    revalidatePath("/admin/blog");
    return { success: true, data: post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Dados inválidos",
        details: error.errors,
      };
    }
    console.error("Erro ao criar post:", error);
    return { success: false, error: "Erro ao criar post" };
  }
}

// Atualizar post
export async function updateBlogPost(id: string, formData: BlogPostFormData) {
  try {
    // Validar dados do formulário
    const validatedData = blogPostSchema.parse(formData);

    // Verificar se o post existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return { success: false, error: "Post não encontrado" };
    }

    // Gerar slug se necessário
    const slug =
      validatedData.slug || stringUtils.generateSlug(validatedData.title);

    // Verificar se slug já existe (exceto para o próprio post)
    const slugConflict = await prisma.blogPost.findFirst({
      where: {
        slug,
        id: { not: id },
      },
    });

    if (slugConflict) {
      return { success: false, error: "Já existe um post com este slug" };
    }

    // Obter ID do usuário atual
    const userId = await getCurrentUserId();

    // Converter publishedAt se fornecido
    const publishedAt = validatedData.publishedAt
      ? new Date(validatedData.publishedAt)
      : validatedData.status === PublicationStatus.PUBLISHED &&
        !existingPost.publishedAt
      ? new Date()
      : existingPost.publishedAt;

    // Calcular tempo de leitura se não fornecido
    const readingTime =
      validatedData.readingTime || calculateReadingTime(validatedData.content);

    // Atualizar post
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: validatedData.title,
        slug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        category: validatedData.category,
        tags: validatedData.tags,
        status: validatedData.status,
        featured: validatedData.featured,
        publishedAt,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        keywords: validatedData.keywords,
        thumbnail: validatedData.thumbnail,
        readingTime,
        updatedBy: userId,
      },
      include: {
        createdByUser: {
          select: { name: true, email: true },
        },
        updatedByUser: {
          select: { name: true, email: true },
        },
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}`);
    return { success: true, data: post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Dados inválidos",
        details: error.errors,
      };
    }
    console.error("Erro ao atualizar post:", error);
    return { success: false, error: "Erro ao atualizar post" };
  }
}

// Excluir post
export async function deleteBlogPost(id: string) {
  try {
    // Verificar se o post existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return { success: false, error: "Post não encontrado" };
    }

    // Excluir post
    await prisma.blogPost.delete({
      where: { id },
    });

    revalidatePath("/admin/blog");
    return { success: true, message: "Post excluído com sucesso" };
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    return { success: false, error: "Erro ao excluir post" };
  }
}

// Duplicar post
export async function duplicateBlogPost(id: string) {
  try {
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return { success: false, error: "Post não encontrado" };
    }

    // Gerar novo slug único
    let newSlug = `${existingPost.slug}-copia`;
    let counter = 1;

    while (await prisma.blogPost.findUnique({ where: { slug: newSlug } })) {
      newSlug = `${existingPost.slug}-copia-${counter}`;
      counter++;
    }

    // Obter ID do usuário atual
    const userId = await getCurrentUserId();

    // Criar cópia do post
    const duplicatedPost = await prisma.blogPost.create({
      data: {
        title: `${existingPost.title} (Cópia)`,
        slug: newSlug,
        excerpt: existingPost.excerpt,
        content: existingPost.content,
        category: existingPost.category,
        tags: existingPost.tags,
        status: PublicationStatus.DRAFT, // Sempre criar como rascunho
        featured: false, // Não destacar cópias
        metaTitle: existingPost.metaTitle,
        metaDescription: existingPost.metaDescription,
        keywords: existingPost.keywords,
        thumbnail: existingPost.thumbnail,
        readingTime: existingPost.readingTime,
        createdBy: userId,
      },
    });

    revalidatePath("/admin/blog");
    return { success: true, data: duplicatedPost };
  } catch (error) {
    console.error("Erro ao duplicar post:", error);
    return { success: false, error: "Erro ao duplicar post" };
  }
}

// Alternar destaque do post
export async function toggleBlogPostFeatured(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return { success: false, error: "Post não encontrado" };
    }

    const userId = await getCurrentUserId();

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        featured: !post.featured,
        updatedBy: userId,
      },
    });

    revalidatePath("/admin/blog");
    return { success: true, data: updatedPost };
  } catch (error) {
    console.error("Erro ao alternar destaque do post:", error);
    return { success: false, error: "Erro ao alternar destaque do post" };
  }
}

// Atualizar status do post
export async function updateBlogPostStatus(
  id: string,
  status: PublicationStatus
) {
  try {
    const userId = await getCurrentUserId();
    const updateData: Record<string, unknown> = {
      status,
      updatedBy: userId,
    };

    // Se está sendo publicado e não tem data de publicação, definir agora
    if (status === PublicationStatus.PUBLISHED) {
      const existingPost = await prisma.blogPost.findUnique({
        where: { id },
        select: { publishedAt: true },
      });

      if (!existingPost?.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/blog");
    return { success: true, data: updatedPost };
  } catch (error) {
    console.error("Erro ao atualizar status do post:", error);
    return { success: false, error: "Erro ao atualizar status do post" };
  }
}

// Buscar categorias únicas
export async function getBlogCategories() {
  try {
    const result = await prisma.blogPost.groupBy({
      by: ["category"],
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: "desc",
        },
      },
    });

    const categories = result.map((item) => ({
      name: item.category,
      count: item._count.category,
    }));

    return { success: true, data: categories };
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return { success: false, error: "Erro ao buscar categorias" };
  }
}

// Buscar posts em destaque
export async function getFeaturedBlogPosts(limit = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        featured: true,
        status: PublicationStatus.PUBLISHED,
      },
      include: {
        createdByUser: {
          select: { name: true, email: true },
        },
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return { success: true, data: posts };
  } catch (error) {
    console.error("Erro ao buscar posts em destaque:", error);
    return { success: false, error: "Erro ao buscar posts em destaque" };
  }
}

// Função auxiliar para calcular tempo de leitura
function calculateReadingTime(content: string): number {
  // Assumindo 200 palavras por minuto
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // Mínimo 1 minuto
}
