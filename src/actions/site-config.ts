"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth";
import {
  updateSiteConfigSchema,
  type UpdateSiteConfigInput,
} from "@/lib/schemas";
import { withDatabaseFallback, supabaseRest } from "@/lib/database-fallback";

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

// Dados padrão para configurações
const defaultSiteConfig = {
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
  logo: "https://souqjphlttbvtibwschm.supabase.co/storage/v1/object/public/uploads/site/novocode_1750117406764_boek2p.png",
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

// Buscar configurações do site (uso público)
export async function getSiteConfig(): Promise<SiteConfig | null> {
  return withDatabaseFallback(
    async () => {
      const config = await prisma.siteConfig.findFirst({
        orderBy: { updatedAt: "desc" },
      });
      return config;
    },
    async () => {
      return await supabaseRest.getSiteConfig();
    },
    null
  );
}

// Buscar ou criar configurações padrão
export async function getOrCreateSiteConfig(): Promise<SiteConfig> {
  return withDatabaseFallback(
    async () => {
      let config = await prisma.siteConfig.findFirst({
        orderBy: { updatedAt: "desc" },
      });

      if (!config) {
        // Criar configurações padrão
        config = await prisma.siteConfig.create({
          data: defaultSiteConfig,
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
          const updateData: any = {};
          if (!config.companyDescription) updateData.companyDescription = defaultSiteConfig.companyDescription;
          if (!config.companyMission) updateData.companyMission = defaultSiteConfig.companyMission;
          if (!config.companyVision) updateData.companyVision = defaultSiteConfig.companyVision;
          if (config.companyValues.length === 0) updateData.companyValues = defaultSiteConfig.companyValues;
          if (!config.email) updateData.email = defaultSiteConfig.email;
          if (!config.phone) updateData.phone = defaultSiteConfig.phone;
          if (!config.whatsapp) updateData.whatsapp = defaultSiteConfig.whatsapp;
          if (!config.address) updateData.address = defaultSiteConfig.address;
          if (!config.socialLinkedin) updateData.socialLinkedin = defaultSiteConfig.socialLinkedin;
          if (!config.socialGithub) updateData.socialGithub = defaultSiteConfig.socialGithub;
          if (!config.defaultMetaTitle) updateData.defaultMetaTitle = defaultSiteConfig.defaultMetaTitle;
          if (!config.defaultMetaDescription) updateData.defaultMetaDescription = defaultSiteConfig.defaultMetaDescription;
          if (config.defaultKeywords.length === 0) updateData.defaultKeywords = defaultSiteConfig.defaultKeywords;
          if (!config.primaryColor) updateData.primaryColor = defaultSiteConfig.primaryColor;
          if (!config.secondaryColor) updateData.secondaryColor = defaultSiteConfig.secondaryColor;

          config = await prisma.siteConfig.update({
            where: { id: config.id },
            data: updateData,
          });
        }
      }

      return config;
    },
    async () => {
      // Fallback: usar dados padrão se não conseguir acessar o banco
      const config = await supabaseRest.getSiteConfig();
      return config || {
        id: 'fallback',
        ...defaultSiteConfig,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
    {
      id: 'fallback',
      ...defaultSiteConfig,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
}

// Tipo para resultado de operações
type ActionResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Atualizar configurações do site (admin)
export async function updateSiteConfigAction(data: UpdateSiteConfigInput): Promise<ActionResult<SiteConfig>> {
  try {
    const result = await withDatabaseFallback(
      async () => {
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
      },
      async () => {
        // Fallback: tentar via API REST
        const success = await supabaseRest.updateSiteConfig(data);
        
        if (success) {
          revalidatePath("/admin");
          revalidatePath("/");
          return {
            success: true,
            data: await supabaseRest.getSiteConfig(),
          };
        }
        
        throw new Error("Falha na atualização via API REST");
      },      {
        success: false,
        data: undefined,
      }
    );

    return result;
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      data: undefined,
    };
  }
}

// Função para buscar dados da página "Sobre"
export async function getAboutPageData() {
  return withDatabaseFallback(
    async () => {
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
          yearsOfExperience: new Date().getFullYear() - 2020,
        },
        testimonials,
      };
    },
    async () => {
      const config = await getOrCreateSiteConfig();
      const testimonials = await supabaseRest.getTestimonials();
      
      return {
        config,
        stats: {
          services: 15,
          projects: 50,
          technologies: 20,
          yearsOfExperience: new Date().getFullYear() - 2020,
        },
        testimonials: testimonials.slice(0, 6),
      };
    },
    {
      config: {
        id: 'fallback',
        ...defaultSiteConfig,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      stats: {
        services: 15,
        projects: 50,
        technologies: 20,
        yearsOfExperience: new Date().getFullYear() - 2020,
      },
      testimonials: [],
    }
  );
}

// Buscar depoimentos em destaque (uso público)
export async function getFeaturedTestimonials(limit = 3) {
  return withDatabaseFallback(
    async () => {
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
    },
    async () => {      const testimonials = await supabaseRest.getTestimonials();
      return testimonials.filter((t: any) => t.featured).slice(0, limit);
    },
    []
  );
}

// Buscar todos os depoimentos publicados (uso público)
export async function getTestimonials() {
  return withDatabaseFallback(
    async () => {
      const testimonials = await prisma.testimonial.findMany({
        where: {
          status: "APPROVED",
          publicationStatus: "PUBLISHED",
        },
        orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
      });

      return testimonials;
    },
    async () => {
      return await supabaseRest.getTestimonials();
    },
    []
  );
}

// Buscar FAQs por categoria (uso público)
export async function getFAQs(category?: string) {
  return withDatabaseFallback(
    async () => {
      const faqs = await prisma.fAQ.findMany({
        where: {
          status: "PUBLISHED",
          ...(category && { category }),
        },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });

      return faqs;
    },
    async () => {
      // FAQ não implementado no fallback REST ainda
      return [];
    },
    []
  );
}

// Buscar categorias de FAQ (uso público)
export async function getFAQCategories() {
  return withDatabaseFallback(
    async () => {
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

      return categories
        .map((c) => c.category)
        .filter((c): c is string => c !== null);
    },
    async () => {
      // FAQ não implementado no fallback REST ainda
      return [];
    },
    []
  );
}
