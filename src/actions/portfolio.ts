"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  createPortfolioSchema,
  updatePortfolioSchema,
  portfolioFiltersSchema,
  paginationSchema,
  type CreatePortfolioInput,
  type UpdatePortfolioInput,
  type PortfolioFilters,
  type PaginationOptions,
} from "@/lib/schemas";
import { generateSlug } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import type { PortfolioPublic } from "@/types";

// Tipo para portfólio com relacionamentos
export type PortfolioWithRelations = Prisma.PortfolioGetPayload<{
  include: {
    service: { select: { id: true; title: true; slug: true } };
    technologies: { select: { id: true; name: true; icon: true; color: true } };
    createdByUser: { select: { id: true; name: true; email: true } };
    updatedByUser: { select: { id: true; name: true; email: true } };
  };
}>;

// Action para criar portfólio
export async function createPortfolioAction(data: CreatePortfolioInput) {
  try {
    const user = await requireAdmin();

    // Validar dados
    const validatedData = createPortfolioSchema.parse(data);

    // Gerar slug único
    let slug = generateSlug(validatedData.title);
    let counter = 0;

    while (true) {
      const existingPortfolio = await prisma.portfolio.findUnique({
        where: { slug: counter === 0 ? slug : `${slug}-${counter}` },
      });

      if (!existingPortfolio) {
        slug = counter === 0 ? slug : `${slug}-${counter}`;
        break;
      }
      counter++;
    } // Criar portfólio
    const portfolio = await prisma.portfolio.create({
      data: {
        ...validatedData,
        slug,
        createdBy: user.id,
        updatedBy: user.id,
        technologies:
          validatedData.technologyIds.length > 0
            ? {
                connect: validatedData.technologyIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
        updatedByUser: { select: { id: true, name: true, email: true } },
      },
    });

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");

    return {
      success: true,
      data: {
        portfolio,
        message: "Projeto criado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao criar portfólio:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para atualizar portfólio
export async function updatePortfolioAction(data: UpdatePortfolioInput) {
  try {
    const user = await requireAdmin();

    // Validar dados
    const validatedData = updatePortfolioSchema.parse(data);
    const { id, technologyIds, ...updateData } = validatedData;

    // Verificar se portfólio existe
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existingPortfolio) {
      return {
        success: false,
        error: "Projeto não encontrado",
      };
    }

    // Atualizar slug se título mudou
    let slug = existingPortfolio.slug;
    if (updateData.title && updateData.title !== existingPortfolio.title) {
      slug = generateSlug(updateData.title);
      let counter = 0;

      while (true) {
        const existingWithSlug = await prisma.portfolio.findUnique({
          where: { slug: counter === 0 ? slug : `${slug}-${counter}` },
        });

        if (!existingWithSlug || existingWithSlug.id === id) {
          slug = counter === 0 ? slug : `${slug}-${counter}`;
          break;
        }
        counter++;
      }
    }

    // Atualizar portfólio
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...updateData,
        slug,
        updatedBy: user.id,
        technologies: technologyIds
          ? {
              set: technologyIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
        updatedByUser: { select: { id: true, name: true, email: true } },
      },
    });

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${slug}`);

    return {
      success: true,
      data: {
        portfolio,
        message: "Projeto atualizado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar portfólio:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para deletar portfólio
export async function deletePortfolioAction(id: string) {
  try {
    await requireAdmin();

    // Verificar se portfólio existe
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!existingPortfolio) {
      return {
        success: false,
        error: "Projeto não encontrado",
      };
    }

    // Deletar portfólio
    await prisma.portfolio.delete({
      where: { id },
    });

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");

    return {
      success: true,
      data: {
        message: "Projeto deletado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao deletar portfólio:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar portfólios com filtros e paginação
export async function getPortfoliosAction(
  filters: PortfolioFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10, sortOrder: "desc" }
) {
  try {
    // Validar parâmetros
    const validatedFilters = portfolioFiltersSchema.parse(filters);
    const validatedPagination = paginationSchema.parse(pagination);

    const {
      status,
      publicationStatus,
      featured,
      serviceId,
      technologyId,
      search,
    } = validatedFilters;

    const {
      page,
      limit,
      sortBy = "createdAt",
      sortOrder,
    } = validatedPagination;

    // Construir where clause
    const where: Prisma.PortfolioWhereInput = {
      ...(status && { status }),
      ...(publicationStatus && { publicationStatus }),
      ...(featured !== undefined && { featured }),
      ...(serviceId && { serviceId }),
      ...(technologyId && {
        technologies: {
          some: { id: technologyId },
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { shortDescription: { contains: search, mode: "insensitive" } },
          { clientName: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    // Contar total de registros
    const total = await prisma.portfolio.count({ where });

    // Buscar portfólios
    const portfolios = await prisma.portfolio.findMany({
      where,
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
        updatedByUser: { select: { id: true, name: true, email: true } },
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      data: {
        portfolios,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext,
          hasPrev,
        },
      },
    };
  } catch (error) {
    console.error("Erro ao buscar portfólios:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar portfólio por ID
export async function getPortfolioByIdAction(id: string) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
        updatedByUser: { select: { id: true, name: true, email: true } },
      },
    });

    if (!portfolio) {
      return {
        success: false,
        error: "Projeto não encontrado",
      };
    }

    return {
      success: true,
      data: { portfolio },
    };
  } catch (error) {
    console.error("Erro ao buscar portfólio:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar portfólio por slug (para página pública)
export async function getPortfolioBySlugAction(slug: string) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        slug,
        publicationStatus: "PUBLISHED", // Apenas projetos publicados
      },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: {
          select: { id: true, name: true, email: true },
        },
        updatedByUser: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!portfolio) {
      return {
        success: false,
        error: "Projeto não encontrado",
      };
    }

    return {
      success: true,
      data: { portfolio },
    };
  } catch (error) {
    console.error("Erro ao buscar portfólio:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para alternar status de destaque
export async function togglePortfolioFeaturedAction(id: string) {
  try {
    await requireAdmin();

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      select: { featured: true },
    });

    if (!portfolio) {
      return {
        success: false,
        error: "Projeto não encontrado",
      };
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: { featured: !portfolio.featured },
      select: { id: true, title: true, featured: true },
    });

    revalidatePath("/admin/portfolio");
    revalidatePath("/portfolio");

    return {
      success: true,
      data: {
        portfolio: updatedPortfolio,
        message: `Projeto ${
          updatedPortfolio.featured
            ? "marcado como destaque"
            : "removido dos destaques"
        }!`,
      },
    };
  } catch (error) {
    console.error("Erro ao alterar destaque do portfólio:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para duplicar portfólio
export async function duplicatePortfolioAction(id: string) {
  try {
    const user = await requireAdmin();

    const originalPortfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        technologies: { select: { id: true } },
      },
    });

    if (!originalPortfolio) {
      return {
        success: false,
        error: "Projeto não encontrado",
      };
    }

    // Gerar novo título e slug
    const newTitle = `${originalPortfolio.title} (Cópia)`;
    let slug = generateSlug(newTitle);
    let counter = 0;

    while (true) {
      const existingPortfolio = await prisma.portfolio.findUnique({
        where: { slug: counter === 0 ? slug : `${slug}-${counter}` },
      });

      if (!existingPortfolio) {
        slug = counter === 0 ? slug : `${slug}-${counter}`;
        break;
      }
      counter++;
    } // Duplicar portfólio usando apenas campos necessários
    const {
      description,
      shortDescription,
      challenge,
      solution,
      results,
      serviceId,
      startDate,
      endDate,
      clientName,
      clientLogo,
      clientWebsite,
      testimonial,
      metaTitle,
      metaDescription,
      keywords,
      thumbnail,
      gallery,
      liveUrl,
      repositoryUrl,
      teamSize,
      duration,
      complexity,
      status,
    } = originalPortfolio;

    const duplicatedPortfolio = await prisma.portfolio.create({
      data: {
        title: newTitle,
        slug,
        description,
        shortDescription,
        challenge,
        solution,
        results,
        serviceId,
        startDate,
        endDate,
        clientName,
        clientLogo,
        clientWebsite,
        testimonial,
        metaTitle,
        metaDescription,
        keywords,
        thumbnail,
        gallery,
        liveUrl,
        repositoryUrl,
        teamSize,
        duration,
        complexity,
        status,
        publicationStatus: "DRAFT", // Sempre criar como rascunho
        featured: false, // Não destacar automaticamente
        createdBy: user.id,
        updatedBy: user.id,
        technologies: {
          connect: originalPortfolio.technologies.map((tech) => ({
            id: tech.id,
          })),
        },
      },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
        updatedByUser: { select: { id: true, name: true, email: true } },
      },
    });

    revalidatePath("/admin/portfolio");

    return {
      success: true,
      data: {
        portfolio: duplicatedPortfolio,
        message: "Projeto duplicado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao duplicar portfólio:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar portfólios em destaque
export async function getFeaturedPortfolios(
  limit = 4
): Promise<PortfolioWithRelations[]> {
  try {
    return (await prisma.portfolio.findMany({
      where: {
        featured: true,
        publicationStatus: "PUBLISHED",
      },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
        updatedByUser: { select: { id: true, name: true, email: true } },
      },
      orderBy: [{ createdAt: "desc" }],
      take: limit,
    })) as PortfolioWithRelations[];
  } catch (error) {
    console.error("Erro ao buscar portfólios em destaque:", error);
    return [];
  }
}

// Action para buscar todos os portfólios públicos
export async function getAllPortfolios(): Promise<PortfolioPublic[]> {
  try {
    return (await prisma.portfolio.findMany({
      where: {
        publicationStatus: "PUBLISHED",
      },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        technologies: {
          select: { id: true, name: true, icon: true, color: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
        updatedByUser: { select: { id: true, name: true, email: true } },
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    })) as PortfolioPublic[];
  } catch (error) {
    console.error("Erro ao buscar portfólios:", error);
    return [];
  }
}
