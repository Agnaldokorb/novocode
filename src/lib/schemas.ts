import { z } from "zod";
import {
  ServiceType,
  TechnologyCategory,
  ProjectStatus,
  PublicationStatus,
  LeadStatus,
} from "@prisma/client";

// Schema para validação de email
const emailSchema = z.string().email("Email inválido");

// Schema para validação de telefone brasileiro
const phoneSchema = z
  .string()
  .optional()
  .refine((val) => {
    if (!val) return true;
    // Remove caracteres especiais para validação
    const cleanPhone = val.replace(/[^\d]/g, "");
    // Telefone brasileiro: deve ter 10 ou 11 dígitos (DDD + número)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }, "Telefone deve ter formato válido brasileiro");

// Schema para validação de URL
const urlSchema = z
  .string()
  .optional()
  .transform((val) => {
    if (!val || val.trim() === "") return undefined;
    return val;
  })
  .refine((val) => {
    if (!val) return true;
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, "URL inválida");

// Schema para Serviços
export const createServiceSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(200, "Título muito longo"),
  shortDescription: z
    .string()
    .min(1, "Descrição curta é obrigatória")
    .max(300, "Descrição curta muito longa"),
  description: z.string().min(1, "Descrição é obrigatória"),
  type: z.nativeEnum(ServiceType, {
    required_error: "Tipo de serviço é obrigatório",
  }),
  price: z.number().positive("Preço deve ser positivo").optional(),
  priceDescription: z.string().optional(),
  features: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),  technologyIds: z.array(z.string()).default([]),
  thumbnail: urlSchema,
  gallery: z.array(z.string()).default([]),
  metaTitle: z.string().max(60, "Meta título muito longo").optional(),
  metaDescription: z.string().max(160, "Meta descrição muito longa").optional(),
  keywords: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

// Schema para Portfólio
export const createPortfolioSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(200, "Título muito longo"),
  shortDescription: z
    .string()
    .min(1, "Descrição curta é obrigatória")
    .max(300, "Descrição curta muito longa"),
  description: z.string().min(1, "Descrição é obrigatória"),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  serviceId: z.string().cuid("ID de serviço inválido").optional(),
  status: z.nativeEnum(ProjectStatus).default("COMPLETED"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  clientName: z.string().optional(),
  clientLogo: urlSchema,
  clientWebsite: urlSchema,  testimonial: z.string().optional(),
  thumbnail: urlSchema,
  gallery: z.array(z.string()).default([]),
  liveUrl: urlSchema,
  repositoryUrl: urlSchema,
  technologyIds: z.array(z.string()).default([]),
  teamSize: z
    .number()
    .int()
    .positive("Tamanho da equipe deve ser positivo")
    .optional(),
  duration: z.string().optional(),
  complexity: z.string().optional(),
  metaTitle: z.string().max(60, "Meta título muito longo").optional(),
  metaDescription: z.string().max(160, "Meta descrição muito longa").optional(),
  keywords: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const updatePortfolioSchema = createPortfolioSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

// Schema para Tecnologias
export const createTechnologySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  description: z.string().optional(),
  category: z.nativeEnum(TechnologyCategory, {
    required_error: "Categoria é obrigatória",
  }),
  icon: urlSchema,
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Cor deve estar no formato hexadecimal (#RRGGBB)")
    .optional(),
  website: urlSchema,
  order: z.number().int().optional(),
});

export const updateTechnologySchema = createTechnologySchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

// Schema para Blog Posts
export const createBlogPostSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(200, "Título muito longo"),
  slug: z.string().optional(),
  excerpt: z
    .string()
    .min(1, "Resumo é obrigatório")
    .max(500, "Resumo muito longo"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  tags: z.array(z.string()).default([]),
  status: z.nativeEnum(PublicationStatus),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  readingTime: z.number().optional(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

// Alias para compatibilidade com formulários
export const blogPostSchema = createBlogPostSchema;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// Schema para Leads
export const createLeadSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(100, "Nome da empresa muito longo").optional(),
  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .max(1000, "Mensagem muito longa"),
  source: z.string().optional(),
  interestedServices: z.array(z.string()).default([]),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export const updateLeadSchema = createLeadSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
  status: z.nativeEnum(LeadStatus).optional(),
});

// Schema para Depoimentos
export const createTestimonialSchema = z.object({
  clientName: z
    .string()
    .min(1, "Nome do cliente é obrigatório")
    .max(100, "Nome muito longo"),
  clientPosition: z.string().max(100, "Cargo muito longo").optional(),
  clientCompany: z.string().max(100, "Nome da empresa muito longo").optional(),
  clientAvatar: urlSchema,
  content: z
    .string()
    .min(1, "Depoimento é obrigatório")
    .max(1000, "Depoimento muito longo"),
  rating: z
    .number()
    .int()
    .min(1, "Avaliação mínima é 1")
    .max(5, "Avaliação máxima é 5")
    .default(5),
  portfolioId: z.string().cuid("ID de portfólio inválido").optional(),
  serviceId: z.string().cuid("ID de serviço inválido").optional(),
  featured: z.boolean().default(false),
  order: z.number().int().optional(),
});

export const updateTestimonialSchema = createTestimonialSchema
  .partial()
  .extend({
    id: z.string().cuid("ID inválido"),
  });

// Schema para FAQ
export const createFAQSchema = z.object({
  question: z
    .string()
    .min(1, "Pergunta é obrigatória")
    .max(300, "Pergunta muito longa"),
  answer: z.string().min(1, "Resposta é obrigatória"),
  category: z.string().optional(),
  order: z.number().int().optional(),
  status: z.nativeEnum(PublicationStatus).optional(),
});

export const updateFAQSchema = createFAQSchema.partial().extend({
  id: z.string().cuid("ID inválido"),
});

// Schema para Configurações do Site
export const updateSiteConfigSchema = z.object({
  companyDescription: z.string().optional(),
  companyMission: z.string().optional(),
  companyVision: z.string().optional(),
  companyValues: z.array(z.string()).optional(),
  email: emailSchema.optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  socialFacebook: urlSchema,
  socialInstagram: urlSchema,
  socialLinkedin: urlSchema,
  socialTwitter: urlSchema,
  socialGithub: urlSchema,
  defaultMetaTitle: z.string().max(60, "Meta título muito longo").optional(),
  defaultMetaDescription: z
    .string()
    .max(160, "Meta descrição muito longa")
    .optional(),
  defaultKeywords: z.array(z.string()).optional(),
  logo: urlSchema,
  favicon: urlSchema,
  primaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Cor deve estar no formato hexadecimal (#RRGGBB)")
    .optional(),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Cor deve estar no formato hexadecimal (#RRGGBB)")
    .optional(),
  maintenanceMode: z.boolean().optional(),
  allowRegistration: z.boolean().optional(),
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
});

// Schema para Filtros
export const serviceFiltersSchema = z.object({
  type: z.nativeEnum(ServiceType).optional(),
  status: z.nativeEnum(PublicationStatus).optional(),
  featured: z.boolean().optional(),
  technologyId: z.string().cuid().optional(),
  search: z.string().optional(),
});

export const portfolioFiltersSchema = z.object({
  status: z.nativeEnum(ProjectStatus).optional(),
  publicationStatus: z.nativeEnum(PublicationStatus).optional(),
  featured: z.boolean().optional(),
  serviceId: z.string().cuid().optional(),
  technologyId: z.string().cuid().optional(),
  search: z.string().optional(),
});

export const blogPostFiltersSchema = z.object({
  status: z.nativeEnum(PublicationStatus).optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  search: z.string().optional(),
  tag: z.string().optional(),
});

// Schema para Paginação
export const paginationSchema = z.object({
  page: z.number().int().positive("Página deve ser positiva").default(1),
  limit: z
    .number()
    .int()
    .positive("Limite deve ser positivo")
    .max(100, "Limite máximo é 100")
    .default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Schema para Formulário de Contato
export const contactFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(100, "Nome da empresa muito longo").optional(),
  subject: z
    .string()
    .min(1, "Assunto é obrigatório")
    .max(200, "Assunto muito longo"),
  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .max(1000, "Mensagem muito longa"),
  interestedServices: z.array(z.string()).default([]),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos de uso"),
});

// Schema para Formulário de Orçamento/Budget
export const budgetFormSchema = z.object({
  // Dados pessoais
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços")
    .trim(),
  email: emailSchema,
  phone: phoneSchema.refine((val) => {
    if (!val) return false; // Para formulário de orçamento, telefone é obrigatório
    return true;
  }, "Telefone é obrigatório"),
  company: z
    .string()
    .max(100, "Nome da empresa muito longo")
    .optional()
    .or(z.literal("")),
  // Detalhes do projeto
  projectName: z
    .string()
    .min(2, "Nome do projeto deve ter pelo menos 2 caracteres")
    .max(200, "Nome muito longo")
    .trim(),
  projectType: z.enum(
    [
      "website",
      "ecommerce",
      "sistema",
      "mobile-app",
      "api-integracao",
      "consultoria",
      "manutencao",
      "outro",
    ],
    {
      required_error: "Tipo de projeto é obrigatório",
    }
  ),
  projectDescription: z
    .string()
    .min(20, "Descrição deve ter pelo menos 20 caracteres")
    .max(2000, "Descrição muito longa")
    .trim(),

  // Funcionalidades
  features: z
    .array(z.string())
    .min(1, "Selecione pelo menos uma funcionalidade"),

  // Orçamento e prazo
  budgetRange: z.enum(
    [
      "ate-5k",
      "5k-15k",
      "15k-30k",
      "30k-50k",
      "50k-100k",
      "acima-100k",
      "conversar",
    ],
    {
      required_error: "Faixa de orçamento é obrigatória",
    }
  ),
  timeline: z.enum(
    [
      "urgente", // até 2 semanas
      "rapido", // até 1 mês
      "normal", // 1-3 meses
      "flexivel", // 3-6 meses
      "longo-prazo", // 6+ meses
      "conversar",
    ],
    {
      required_error: "Prazo é obrigatório",
    }
  ),

  // Tecnologias preferidas (opcional)
  preferredTechnologies: z.array(z.string()).default([]),

  // Informações adicionais
  hasExistingWebsite: z.boolean().default(false),
  existingWebsiteUrl: z
    .string()
    .url("URL inválida")
    .optional()
    .or(z.literal("")),
  hasDesign: z.boolean().default(false),
  designFiles: z.string().optional(),
  additionalInfo: z
    .string()
    .max(1500, "Informações adicionais muito longas")
    .optional(),

  // Preferências de contato
  preferredContact: z.enum(["email", "whatsapp", "telefone"], {
    required_error: "Meio de contato preferido é obrigatório",
  }),

  // Aceite de termos
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos de uso"),
  acceptMarketing: z.boolean().default(false),
});

// Schema para Newsletter
export const newsletterSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .optional(),
});

// Schema para Autenticação
export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha muito longa"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
    email: emailSchema,
    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .max(100, "Senha muito longa"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z.object({
  email: emailSchema,
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres")
      .max(100, "Senha muito longa"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

// Tipos derivados dos schemas
export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type CreatePortfolioInput = z.infer<typeof createPortfolioSchema>;
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>;
export type CreateTechnologyInput = z.infer<typeof createTechnologySchema>;
export type UpdateTechnologyInput = z.infer<typeof updateTechnologySchema>;
export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type CreateFAQInput = z.infer<typeof createFAQSchema>;
export type UpdateFAQInput = z.infer<typeof updateFAQSchema>;
export type UpdateSiteConfigInput = z.infer<typeof updateSiteConfigSchema>;
export type ServiceFilters = z.infer<typeof serviceFiltersSchema>;
export type PortfolioFilters = z.infer<typeof portfolioFiltersSchema>;
export type BlogPostFilters = z.infer<typeof blogPostFiltersSchema>;
export type PaginationOptions = z.infer<typeof paginationSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type BudgetFormInput = z.infer<typeof budgetFormSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

// Tipos para Autenticação
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
