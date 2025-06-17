"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  createTechnologySchema,
  updateTechnologySchema,
  type CreateTechnologyInput,
  type UpdateTechnologyInput,
} from "@/lib/schemas";
import { generateSlug } from "@/lib/utils";
import { Prisma, TechnologyCategory } from "@prisma/client";

// Tipo para tecnologia com relacionamentos
export type TechnologyWithRelations = Prisma.TechnologyGetPayload<{
  include: {
    services: { select: { id: true; title: true; slug: true } };
    portfolioItems: { select: { id: true; title: true; slug: true } };
  };
}>;

// Dados mockados para fallback
const mockTechnologies: TechnologyWithRelations[] = [
  {
    id: "1",
    name: "React",
    slug: "react",
    description:
      "Biblioteca JavaScript para construção de interfaces de usuário",
    category: "FRONTEND" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    website: "https://reactjs.org",
    isActive: true,
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "2",
    name: "Next.js",
    slug: "nextjs",
    description: "Framework React para produção com SSR e SSG",
    category: "FRONTEND" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
    website: "https://nextjs.org",
    isActive: true,
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "3",
    name: "TypeScript",
    slug: "typescript",
    description: "Superset tipado do JavaScript",
    category: "FRONTEND" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    website: "https://www.typescriptlang.org",
    isActive: true,
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "4",
    name: "Node.js",
    slug: "nodejs",
    description: "Runtime JavaScript para servidor",
    category: "BACKEND" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    website: "https://nodejs.org",
    isActive: true,
    order: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "5",
    name: "PostgreSQL",
    slug: "postgresql",
    description: "Sistema de gerenciamento de banco de dados objeto-relacional",
    category: "DATABASE" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
    website: "https://www.postgresql.org",
    isActive: true,
    order: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "6",
    name: "AWS",
    slug: "aws",
    description: "Plataforma de serviços de computação em nuvem da Amazon",
    category: "CLOUD" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    color: "#FF9900",
    website: "https://aws.amazon.com",
    isActive: true,
    order: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "7",
    name: "Docker",
    slug: "docker",
    description: "Plataforma de containerização",
    category: "DEVOPS" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
    website: "https://www.docker.com",
    isActive: true,
    order: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "8",
    name: "Tailwind CSS",
    slug: "tailwind-css",
    description: "Framework CSS utility-first",
    category: "FRONTEND" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
    website: "https://tailwindcss.com",
    isActive: true,
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "9",
    name: "Prisma",
    slug: "prisma",
    description: "ORM moderno para Node.js e TypeScript",
    category: "BACKEND" as TechnologyCategory,
    icon: "https://raw.githubusercontent.com/prisma/presskit/main/Assets/Prisma-IndigoSymbol.svg",
    color: "#2D3748",
    website: "https://www.prisma.io",
    isActive: true,
    order: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
  {
    id: "10",
    name: "Supabase",
    slug: "supabase",
    description: "Alternativa open source ao Firebase",
    category: "CLOUD" as TechnologyCategory,
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    color: "#3ECF8E",
    website: "https://supabase.com",
    isActive: true,
    order: 41,
    createdAt: new Date(),
    updatedAt: new Date(),
    services: [],
    portfolioItems: [],
  },
];

// Action para criar tecnologia
export async function createTechnologyAction(data: CreateTechnologyInput) {
  try {
    await requireAdmin();

    // Validar dados
    const validatedData = createTechnologySchema.parse(data);

    // Verificar se já existe tecnologia com o mesmo nome
    const existingTechnology = await prisma.technology.findFirst({
      where: {
        name: {
          equals: validatedData.name,
          mode: "insensitive",
        },
      },
    });
    if (existingTechnology) {
      return {
        success: false,
        error: "Já existe uma tecnologia com este nome",
      };
    } // Criar tecnologia
    const technology = await prisma.technology.create({
      data: {
        ...validatedData,
        slug: generateSlug(validatedData.name),
      },
      include: {
        services: { select: { id: true, title: true, slug: true } },
        portfolioItems: { select: { id: true, title: true, slug: true } },
      },
    });

    revalidatePath("/admin/technologies");

    return {
      success: true,
      data: {
        technology,
        message: "Tecnologia criada com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao criar tecnologia:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para atualizar tecnologia
export async function updateTechnologyAction(data: UpdateTechnologyInput) {
  try {
    await requireAdmin();

    // Validar dados
    const validatedData = updateTechnologySchema.parse(data);
    const { id, ...updateData } = validatedData;

    // Verificar se tecnologia existe
    const existingTechnology = await prisma.technology.findUnique({
      where: { id },
    });

    if (!existingTechnology) {
      return {
        success: false,
        error: "Tecnologia não encontrada",
      };
    }

    // Verificar se nome já está em uso por outra tecnologia
    if (updateData.name) {
      const duplicateName = await prisma.technology.findFirst({
        where: {
          name: {
            equals: updateData.name,
            mode: "insensitive",
          },
          NOT: { id },
        },
      });
      if (duplicateName) {
        return {
          success: false,
          error: "Já existe uma tecnologia com este nome",
        };
      }
    } // Atualizar tecnologia
    const technology = await prisma.technology.update({
      where: { id },
      data: {
        ...updateData,
        ...(updateData.name && { slug: generateSlug(updateData.name) }),
      },
      include: {
        services: { select: { id: true, title: true, slug: true } },
        portfolioItems: { select: { id: true, title: true, slug: true } },
      },
    });

    revalidatePath("/admin/technologies");

    return {
      success: true,
      data: {
        technology,
        message: "Tecnologia atualizada com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar tecnologia:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para deletar tecnologia
export async function deleteTechnologyAction(id: string) {
  try {
    await requireAdmin();

    // Verificar se tecnologia existe
    const existingTechnology = await prisma.technology.findUnique({
      where: { id },
      include: {
        services: { select: { id: true } },
        portfolioItems: { select: { id: true } },
      },
    });

    if (!existingTechnology) {
      return {
        success: false,
        error: "Tecnologia não encontrada",
      };
    }

    // Verificar se a tecnologia está sendo usada
    if (
      existingTechnology.services.length > 0 ||
      existingTechnology.portfolioItems.length > 0
    ) {
      return {
        success: false,
        error:
          "Não é possível deletar uma tecnologia que está sendo usada em serviços ou projetos",
      };
    }

    // Deletar tecnologia
    await prisma.technology.delete({
      where: { id },
    });

    revalidatePath("/admin/technologies");

    return {
      success: true,
      data: {
        message: "Tecnologia deletada com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao deletar tecnologia:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar tecnologias com filtros
export async function getTechnologiesAction(
  filters: {
    category?: TechnologyCategory;
    search?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  try {
    const { category, search, page = 1, limit = 20 } = filters;

    // Construir where clause
    const where: Prisma.TechnologyWhereInput = {
      ...(category && { category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    // Contar total de registros
    const total = await prisma.technology.count({ where });

    // Buscar tecnologias
    const technologies = await prisma.technology.findMany({
      where,
      include: {
        services: { select: { id: true, title: true, slug: true } },
        portfolioItems: { select: { id: true, title: true, slug: true } },
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
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
        technologies,
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
    console.error("Erro ao buscar tecnologias:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar tecnologia por ID
export async function getTechnologyByIdAction(id: string) {
  try {
    const technology = await prisma.technology.findUnique({
      where: { id },
      include: {
        services: { select: { id: true, title: true, slug: true } },
        portfolioItems: { select: { id: true, title: true, slug: true } },
      },
    });

    if (!technology) {
      return {
        success: false,
        error: "Tecnologia não encontrada",
      };
    }

    return {
      success: true,
      data: { technology },
    };
  } catch (error) {
    console.error("Erro ao buscar tecnologia:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para reordenar tecnologias
export async function reorderTechnologiesAction(
  technologiesOrder: { id: string; order: number }[]
) {
  try {
    await requireAdmin();

    // Atualizar ordem das tecnologias em uma transação
    await prisma.$transaction(
      technologiesOrder.map(({ id, order }) =>
        prisma.technology.update({
          where: { id },
          data: { order },
        })
      )
    );

    revalidatePath("/admin/technologies");

    return {
      success: true,
      data: {
        message: "Ordem das tecnologias atualizada com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao reordenar tecnologias:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar tecnologias para seleção (sem paginação)
export async function getTechnologiesForSelectAction() {
  try {
    const technologies = await prisma.technology.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        icon: true,
        color: true,
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return {
      success: true,
      data: { technologies },
    };
  } catch (error) {
    console.error("Erro ao buscar tecnologias:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Action para buscar tecnologias para homepage
export async function getPublicTechnologies(): Promise<
  TechnologyWithRelations[]
> {
  try {
    const technologies = await prisma.technology.findMany({
      include: {
        services: { select: { id: true, title: true, slug: true } },
        portfolioItems: { select: { id: true, title: true, slug: true } },
      },
      orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
    });

    return technologies as TechnologyWithRelations[];
  } catch (error) {
    console.error("Erro ao buscar tecnologias:", error);
    console.warn("⚠️ Usando dados mockados temporários - banco não acessível");
    return mockTechnologies;
  }
}
