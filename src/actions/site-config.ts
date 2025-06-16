"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import {
  updateSiteConfigSchema,
  type UpdateSiteConfigInput,
} from "@/lib/schemas";

// Tipo para configurações do site
export type SiteConfig = {
  id: string;
  companyName: string;
  companyDescription?: string | null;
  companyMission?: string | null;
  companyVision?: string | null;
  companyValues: string[];
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  socialFacebook?: string | null;
  socialInstagram?: string | null;
  socialLinkedin?: string | null;
  socialTwitter?: string | null;
  socialGithub?: string | null;
  defaultMetaTitle?: string | null;
  defaultMetaDescription?: string | null;
  defaultKeywords: string[];
  logo?: string | null;
  favicon?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  googleAnalyticsId?: string | null;
  facebookPixelId?: string | null;
  updatedAt: Date;
  createdAt: Date;
};

// Buscar configurações do site (uso público)
export async function getSiteConfig(): Promise<SiteConfig | null> {
  try {
    const config = await prisma.siteConfig.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    return config;
  } catch (error) {
    console.error("Erro ao buscar configurações do site:", error);
    return null;
  }
}

// Buscar ou criar configurações padrão
export async function getOrCreateSiteConfig(): Promise<SiteConfig> {
  try {
    let config = await prisma.siteConfig.findFirst({
      orderBy: { updatedAt: "desc" },
    });    const defaultData = {
      companyName: "NOVOCODE",
      companyDescription: "Tecnologia e Inovação para o seu negócio",
      companyMission:
        "Transformar ideias em soluções digitais inovadoras que impulsionam o crescimento dos nossos clientes.",
      companyVision:
        "Ser referência em desenvolvimento de software e consultoria tecnológica, criando soluções que fazem a diferença.",
      companyValues: [
        "Inovação",
        "Qualidade",
        "Transparência",
        "Compromisso",
        "Excelência",
      ],
      email: "novocode.tec@gmail.com",
      phone: "(47) 98881-5799",
      whatsapp: "5547988815799",
      address: "Brusque, Santa Catarina, Brasil",
      socialLinkedin: "https://linkedin.com/company/novocode",
      socialGithub: "https://github.com/NovoCode-Tec",
      logo: "https://gdgidcaflispcxwbqnjf.supabase.co/storage/v1/object/public/uploads/logo/novocode-logo.png",
      defaultMetaTitle: "NOVOCODE - Tecnologia e Inovação",
      defaultMetaDescription:
        "Desenvolvimento de sistemas web, aplicações mobile e soluções tecnológicas personalizadas para empresas de todos os portes.",
      defaultKeywords: [
        "desenvolvimento web",
        "sistemas web",
        "aplicativos mobile",
        "consultoria tecnológica",
        "desenvolvimento de software",
        "React",
        "Next.js",
        "Node.js",
        "Brusque",
        "Santa Catarina",
      ],
      primaryColor: "#3b82f6",
      secondaryColor: "#8b5cf6",
      maintenanceMode: false,
      allowRegistration: false,
    };

    if (!config) {
      // Criar configurações padrão
      config = await prisma.siteConfig.create({
        data: defaultData,
      });
    } else {
      // Verificar se a configuração existente precisa ser atualizada com valores padrão
      const needsUpdate = 
        !config.companyDescription ||
        !config.email ||
        !config.phone ||
        !config.defaultMetaTitle ||
        config.companyValues.length === 0 ||
        config.defaultKeywords.length === 0;

      if (needsUpdate) {
        // Atualizar campos vazios com valores padrão, mantendo valores existentes
        const updateData: any = {};
        
        if (!config.companyDescription) updateData.companyDescription = defaultData.companyDescription;
        if (!config.companyMission) updateData.companyMission = defaultData.companyMission;
        if (!config.companyVision) updateData.companyVision = defaultData.companyVision;
        if (config.companyValues.length === 0) updateData.companyValues = defaultData.companyValues;
        if (!config.email) updateData.email = defaultData.email;
        if (!config.phone) updateData.phone = defaultData.phone;
        if (!config.whatsapp) updateData.whatsapp = defaultData.whatsapp;
        if (!config.address) updateData.address = defaultData.address;
        if (!config.socialLinkedin) updateData.socialLinkedin = defaultData.socialLinkedin;
        if (!config.socialGithub) updateData.socialGithub = defaultData.socialGithub;
        if (!config.defaultMetaTitle) updateData.defaultMetaTitle = defaultData.defaultMetaTitle;
        if (!config.defaultMetaDescription) updateData.defaultMetaDescription = defaultData.defaultMetaDescription;
        if (config.defaultKeywords.length === 0) updateData.defaultKeywords = defaultData.defaultKeywords;
        if (!config.primaryColor) updateData.primaryColor = defaultData.primaryColor;
        if (!config.secondaryColor) updateData.secondaryColor = defaultData.secondaryColor;

        config = await prisma.siteConfig.update({
          where: { id: config.id },
          data: updateData,
        });
      }    }

    return config;
  } catch (error) {
    console.error("Erro ao buscar/criar configurações do site:", error);
    throw new Error("Erro ao carregar configurações do site");
  }
}

// Atualizar configurações do site (admin)
export async function updateSiteConfigAction(data: UpdateSiteConfigInput) {
  try {
    await requireAuth();

    const validatedData = updateSiteConfigSchema.parse(data);

    let config = await prisma.siteConfig.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    if (!config) {
      // Criar se não existir
      config = await prisma.siteConfig.create({
        data: {
          companyName: "NOVOCODE",
          ...validatedData,
        },
      });
    } else {
      // Atualizar existente
      config = await prisma.siteConfig.update({
        where: { id: config.id },
        data: validatedData,
      });
    }

    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      data: config,
    };
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Função para buscar dados da página "Sobre"
export async function getAboutPageData() {
  try {
    const config = await getOrCreateSiteConfig();

    // Buscar alguns dados estatísticos
    const [servicesCount, portfolioCount, technologiesCount] =
      await Promise.all([
        prisma.service.count({ where: { status: "PUBLISHED" } }),
        prisma.portfolio.count({ where: { publicationStatus: "PUBLISHED" } }),
        prisma.technology.count({ where: { isActive: true } }),
      ]);

    // Buscar depoimentos
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "APPROVED",
        publicationStatus: "PUBLISHED",
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
      take: 6,
    });

    return {
      config,
      stats: {
        services: servicesCount,
        projects: portfolioCount,
        technologies: technologiesCount,
        yearsOfExperience: new Date().getFullYear() - 2020, // Assumindo que a empresa foi fundada em 2020
      },
      testimonials,
    };
  } catch (error) {
    console.error("Erro ao buscar dados da página sobre:", error);
    throw new Error("Erro ao carregar dados da página");
  }
}

// Buscar depoimentos em destaque (uso público)
export async function getFeaturedTestimonials(limit = 3) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        featured: true,
        status: "APPROVED",
        publicationStatus: "PUBLISHED",
      },
      orderBy: { order: "asc" },
      take: limit,
    });

    return testimonials;
  } catch (error) {
    console.error("Erro ao buscar depoimentos em destaque:", error);
    return [];
  }
}

// Buscar todos os depoimentos publicados (uso público)
export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "APPROVED",
        publicationStatus: "PUBLISHED",
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    return testimonials;
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);
    return [];
  }
}

// Buscar FAQs por categoria (uso público)
export async function getFAQs(category?: string) {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: {
        status: "PUBLISHED",
        ...(category && { category }),
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return faqs;
  } catch (error) {
    console.error("Erro ao buscar FAQs:", error);
    return [];
  }
}

// Buscar categorias de FAQ (uso público)
export async function getFAQCategories() {
  try {
    const categories = await prisma.fAQ.findMany({
      where: {
        status: "PUBLISHED",
        category: { not: null },
      },
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    return categories.map((item) => item.category).filter(Boolean) as string[];
  } catch (error) {
    console.error("Erro ao buscar categorias de FAQ:", error);
    return [];
  }
}
