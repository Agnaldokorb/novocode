"use server";

import { prisma } from "@/lib/prisma";
import { createServiceSchema, updateServiceSchema } from "@/lib/schemas";
import { stringUtils } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import type {
  ServiceWithTechnologies,
  SerializedServiceWithTechnologies,
  ServiceFilters,
  PaginationOptions,
} from "@/types";
import { PublicationStatus, ServiceType, Prisma } from "@prisma/client";

// Função auxiliar para obter ID do usuário atual
async function getCurrentUserId(): Promise<string> {
  const user = await requireAuth();
  return user.id;
}

// Criar serviço
export async function createService(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    
    // Parse dos dados com tratamento seguro
    const parsedData = createServiceSchema.parse({
      title: data.title as string,
      shortDescription: data.shortDescription as string,
      description: data.description as string,
      type: data.type as ServiceType,
      price: data.price ? parseFloat(data.price as string) : undefined,
      priceDescription: (data.priceDescription as string) || undefined,
      features: data.features ? JSON.parse(data.features as string) : [],
      benefits: data.benefits ? JSON.parse(data.benefits as string) : [],
      deliverables: data.deliverables
        ? JSON.parse(data.deliverables as string)
        : [],
      technologyIds: data.technologyIds
        ? JSON.parse(data.technologyIds as string)
        : [],
      thumbnail: (data.thumbnail as string) && (data.thumbnail as string).trim() !== "" 
        ? (data.thumbnail as string) 
        : undefined,
      gallery: data.gallery ? JSON.parse(data.gallery as string) : [],
      metaTitle: (data.metaTitle as string) && (data.metaTitle as string).trim() !== ""
        ? (data.metaTitle as string)
        : undefined,
      metaDescription: (data.metaDescription as string) && (data.metaDescription as string).trim() !== ""
        ? (data.metaDescription as string)
        : undefined,
      keywords: data.keywords ? JSON.parse(data.keywords as string) : [],
      featured: data.featured === "true",
    });

    const userId = await getCurrentUserId();
    const slug = stringUtils.generateSlug(parsedData.title);

    // Verificar se o slug já existe
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });

    if (existingService) {
      throw new Error("Já existe um serviço com este título");
    }    const service = await prisma.service.create({
      data: {
        title: parsedData.title,
        shortDescription: parsedData.shortDescription,
        description: parsedData.description,
        type: parsedData.type,
        price: parsedData.price,
        priceDescription: parsedData.priceDescription,
        features: parsedData.features,
        benefits: parsedData.benefits,
        deliverables: parsedData.deliverables,
        thumbnail: parsedData.thumbnail,
        gallery: parsedData.gallery,
        metaTitle: parsedData.metaTitle,
        metaDescription: parsedData.metaDescription,
        keywords: parsedData.keywords,
        featured: parsedData.featured,
        slug,
        createdBy: userId,
        technologies: {
          connect: parsedData.technologyIds.map((id) => ({ id })),
        },
      },
      include: {
        technologies: true,
        portfolioItems: true,
        createdByUser: true,
        updatedByUser: true,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");    return { success: true, data: service };
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Atualizar serviço
export async function updateService(id: string, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());

    // Parse dos dados (todos opcionais para update)
    const parsedData = updateServiceSchema.parse({
      id,
      title: data.title ? (data.title as string) : undefined,
      shortDescription: data.shortDescription
        ? (data.shortDescription as string)
        : undefined,
      description: data.description ? (data.description as string) : undefined,
      type: data.type ? (data.type as ServiceType) : undefined,
      price: data.price ? parseFloat(data.price as string) : undefined,
      priceDescription: data.priceDescription
        ? (data.priceDescription as string)
        : undefined,
      features: data.features ? JSON.parse(data.features as string) : undefined,
      benefits: data.benefits ? JSON.parse(data.benefits as string) : undefined,
      deliverables: data.deliverables
        ? JSON.parse(data.deliverables as string)
        : undefined,
      technologyIds: data.technologyIds
        ? JSON.parse(data.technologyIds as string)
        : undefined,
      thumbnail: data.thumbnail ? (data.thumbnail as string) : undefined,
      gallery: data.gallery ? JSON.parse(data.gallery as string) : undefined,
      metaTitle: data.metaTitle ? (data.metaTitle as string) : undefined,
      metaDescription: data.metaDescription
        ? (data.metaDescription as string)
        : undefined,
      keywords: data.keywords ? JSON.parse(data.keywords as string) : undefined,
      featured:
        data.featured !== undefined ? data.featured === "true" : undefined,
    });

    const userId = await getCurrentUserId();
    const { technologyIds, ...updateData } = parsedData;

    // Se o título foi alterado, gerar novo slug
    let slug;
    if (updateData.title) {
      slug = stringUtils.generateSlug(updateData.title);

      // Verificar se o novo slug já existe (exceto para o próprio serviço)
      const existingService = await prisma.service.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (existingService) {
        throw new Error("Já existe um serviço com este título");
      }
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...updateData,
        ...(slug && { slug }),
        updatedBy: userId,
        ...(technologyIds && {
          technologies: {
            set: technologyIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        technologies: true,
        portfolioItems: true,
        createdByUser: true,
        updatedByUser: true,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    revalidatePath("/");

    return { success: true, data: service };
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Excluir serviço
export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Alterar status do serviço
export async function toggleServiceStatus(
  id: string,
  status: PublicationStatus
) {
  try {
    const userId = await getCurrentUserId();

    const service = await prisma.service.update({
      where: { id },
      data: {
        status,
        updatedBy: userId,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, data: service };
  } catch (error) {
    console.error("Erro ao alterar status do serviço:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Destacar/remover destaque do serviço
export async function toggleServiceFeatured(id: string, featured: boolean) {
  try {
    const userId = await getCurrentUserId();

    const service = await prisma.service.update({
      where: { id },
      data: {
        featured,
        updatedBy: userId,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath("/");

    return { success: true, data: service };
  } catch (error) {
    console.error("Erro ao alterar destaque do serviço:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Buscar serviços (com filtros e paginação)
export async function getServices(
  filters: ServiceFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10, sortOrder: "desc" }
): Promise<{
  services: ServiceWithTechnologies[];
  total: number;
  totalPages: number;
}> {
  try {
    const { type, status, featured, technologyId, search } = filters;
    const { page, limit, sortBy = "createdAt", sortOrder } = pagination;

    const where: Prisma.ServiceWhereInput = {
      ...(type && { type }),
      ...(status && { status }),
      ...(featured !== undefined && { featured }),
      ...(technologyId && {
        technologies: {
          some: { id: technologyId },
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          {
            shortDescription: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          technologies: true,
          portfolioItems: true,
          createdByUser: true,
          updatedByUser: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip: ((page || 1) - 1) * (limit || 10),
        take: limit || 10,
      }),
      prisma.service.count({ where }),
    ]);

    return {
      services: services as ServiceWithTechnologies[],
      total,
      totalPages: Math.ceil(total / (limit || 10)),
    };
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    throw new Error(
      `Erro ao buscar serviços: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

// Alias para compatibilidade
export const getServicesAction = getServices;

// Versão serializada para uso em Client Components
export async function getServicesSerialized(
  filters: ServiceFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10, sortOrder: "desc" }
): Promise<{
  services: SerializedServiceWithTechnologies[];
  total: number;
  totalPages: number;
}> {
  try {
    const result = await getServices(filters, pagination);

    return {
      ...result,
      services: result.services.map((service) => ({
        ...service,
        price: service.price ? Number(service.price) : null,
      })) as SerializedServiceWithTechnologies[],
    };
  } catch (error) {
    console.error("Erro ao buscar serviços serializados:", error);
    throw new Error(
      `Erro ao buscar serviços: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

// Buscar serviço por ID
export async function getServiceById(
  id: string
): Promise<ServiceWithTechnologies | null> {
  try {
    return (await prisma.service.findUnique({
      where: { id },
      include: {
        technologies: true,
        portfolioItems: true,
        createdByUser: true,
        updatedByUser: true,
      },
    })) as ServiceWithTechnologies | null;
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return null;
  }
}

// Buscar serviço por slug
export async function getServiceBySlug(
  slug: string
): Promise<ServiceWithTechnologies | null> {
  try {
    return (await prisma.service.findUnique({
      where: { slug },
      include: {
        technologies: true,
        portfolioItems: true,
        createdByUser: true,
        updatedByUser: true,
      },
    })) as ServiceWithTechnologies | null;
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return null;
  }
}

// Versões serializadas para uso em componentes client-side
export async function getServiceByIdSerialized(
  id: string
): Promise<SerializedServiceWithTechnologies | null> {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        technologies: true,
        portfolioItems: true,
        createdByUser: true,
        updatedByUser: true,
      },
    });

    if (!service) return null;

    return {
      ...service,
      price: service.price ? Number(service.price) : null,
    } as SerializedServiceWithTechnologies;
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return null;
  }
}

export async function getServiceBySlugSerialized(
  slug: string
): Promise<SerializedServiceWithTechnologies | null> {
  try {
    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        technologies: true,
        portfolioItems: true,
        createdByUser: true,
        updatedByUser: true,
      },
    });

    if (!service) return null;

    return {
      ...service,
      price: service.price ? Number(service.price) : null,
    } as SerializedServiceWithTechnologies;
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    return null;
  }
}

// Buscar serviços em destaque
export async function getFeaturedServices(
  limit = 3
): Promise<SerializedServiceWithTechnologies[]> {
  try {
    const services = await prisma.service.findMany({
      where: {
        featured: true,
        status: "PUBLISHED",
      },
      include: {
        technologies: true,
        portfolioItems: true,
        createdByUser: true,
        updatedByUser: true,
      },
      orderBy: { order: "asc" },
      take: limit,
    });

    // Converter campos Decimal para number para serialização
    return services.map((service) => ({
      ...service,
      price: service.price ? Number(service.price) : null,
    })) as SerializedServiceWithTechnologies[];
  } catch (error) {
    console.error("Erro ao buscar serviços em destaque:", error);
    return [];
  }
}

// Função para buscar serviços publicados (para uso público)
export async function getPublishedServices(): Promise<
  SerializedServiceWithTechnologies[]
> {
  try {
    const services = await prisma.service.findMany({
      where: {
        status: "PUBLISHED",
      },
      include: {
        technologies: true,
        portfolioItems: {
          where: {
            publicationStatus: "PUBLISHED",
          },
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
          },
          take: 3,
        },
        createdByUser: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    // Converter campos Decimal para number para serialização
    return services.map((service) => ({
      ...service,
      price: service.price ? Number(service.price) : null,
    })) as SerializedServiceWithTechnologies[];
  } catch (error) {
    console.error("Erro ao buscar serviços publicados:", error);
    return [];
  }
}

// Função para buscar serviços por categoria
export async function getServicesByType(
  type: ServiceType
): Promise<SerializedServiceWithTechnologies[]> {
  try {
    const services = await prisma.service.findMany({
      where: {
        status: "PUBLISHED",
        type,
      },
      include: {
        technologies: true,
        portfolioItems: {
          where: {
            publicationStatus: "PUBLISHED",
          },
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
          },
          take: 3,
        },
        createdByUser: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    return services.map((service) => ({
      ...service,
      price: service.price ? Number(service.price) : null,
    })) as SerializedServiceWithTechnologies[];
  } catch (error) {
    console.error(`Erro ao buscar serviços do tipo ${type}:`, error);
    return [];
  }
}

// Função para buscar serviço por slug (público)
export async function getPublishedServiceBySlug(
  slug: string
): Promise<SerializedServiceWithTechnologies | null> {
  try {
    const service = await prisma.service.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
      include: {
        technologies: true,
        portfolioItems: {
          where: {
            publicationStatus: "PUBLISHED",
          },
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            shortDescription: true,
          },
        },
        createdByUser: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedByUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!service) return null;

    return {
      ...service,
      price: service.price ? Number(service.price) : null,
    } as SerializedServiceWithTechnologies;
  } catch (error) {
    console.error(`Erro ao buscar serviço ${slug}:`, error);
    return null;
  }
}
