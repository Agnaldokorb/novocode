import type {
  Service,
  Portfolio,
  Technology,
  BlogPost,
  User,
  SiteConfig,
  Lead,
  Testimonial,
  FAQ,
  PublicationStatus,
  ServiceType,
  TechnologyCategory,
  ProjectStatus,
  UserRole,
  LeadStatus,
} from "@prisma/client";

// Tipos básicos do Prisma
export type {
  Service,
  Portfolio,
  Technology,
  BlogPost,
  User,
  SiteConfig,
  Lead,
  Testimonial,
  FAQ,
  PublicationStatus,
  ServiceType,
  TechnologyCategory,
  ProjectStatus,
  UserRole,
  LeadStatus,
};

// Tipos serializados para componentes (campos Decimal convertidos para number)
export type SerializedService = Omit<Service, "price"> & {
  price?: number | null;
};

export type SerializedServiceWithTechnologies = SerializedService & {
  technologies: Technology[];
  portfolioItems: Portfolio[];
  createdByUser: User;
  updatedByUser?: User | null;
};

// Tipos com relacionamentos
export type ServiceWithTechnologies = Service & {
  technologies: Technology[];
  portfolioItems: Portfolio[];
  createdByUser: User;
  updatedByUser?: User | null;
};

export type PortfolioWithRelations = Portfolio & {
  service?: Service | null;
  technologies: Technology[];
  createdByUser: User;
  updatedByUser?: User | null;
};

// Tipo específico para portfolio público (sem dados sensíveis do service)
export type PortfolioPublic = Portfolio & {
  service?: {
    id: string;
    title: string;
    slug: string;
  } | null;
  technologies: {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
  }[];
  createdByUser: {
    id: string;
    name: string | null;
    email: string;
  };
  updatedByUser?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
};

// Tipo para tecnologia simplificada
export type TechnologySimple = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
};

export type BlogPostWithUser = BlogPost & {
  createdByUser: User;
  updatedByUser?: User | null;
};

// Tipos para formulários
export type CreateServiceInput = {
  title: string;
  shortDescription: string;
  description: string;
  type: ServiceType;
  price?: number;
  priceDescription?: string;
  features: string[];
  benefits: string[];
  deliverables: string[];
  technologyIds: string[];
  thumbnail?: string;
  gallery: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  featured: boolean;
};

export type UpdateServiceInput = Partial<CreateServiceInput> & {
  id: string;
};

export type CreatePortfolioInput = {
  title: string;
  shortDescription: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  serviceId?: string;
  status: ProjectStatus;
  startDate?: Date;
  endDate?: Date;
  clientName?: string;
  clientLogo?: string;
  clientWebsite?: string;
  testimonial?: string;
  thumbnail?: string;
  gallery: string[];
  liveUrl?: string;
  repositoryUrl?: string;
  technologyIds: string[];
  teamSize?: number;
  duration?: string;
  complexity?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  featured: boolean;
};

export type UpdatePortfolioInput = Partial<CreatePortfolioInput> & {
  id: string;
};

export type CreateTechnologyInput = {
  name: string;
  description?: string;
  category: TechnologyCategory;
  icon?: string;
  color?: string;
  website?: string;
  order?: number;
};

export type UpdateTechnologyInput = Partial<CreateTechnologyInput> & {
  id: string;
};

export type CreateBlogPostInput = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  featured: boolean;
  publishedAt?: Date;
};

export type UpdateBlogPostInput = Partial<CreateBlogPostInput> & {
  id: string;
};

export type CreateLeadInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  interestedServices: string[];
  budget?: string;
  timeline?: string;
};

export type UpdateLeadInput = Partial<CreateLeadInput> & {
  id: string;
  status?: LeadStatus;
};

export type CreateTestimonialInput = {
  clientName: string;
  clientPosition?: string;
  clientCompany?: string;
  clientAvatar?: string;
  content: string;
  rating: number;
  portfolioId?: string;
  serviceId?: string;
  featured: boolean;
  order?: number;
};

export type UpdateTestimonialInput = Partial<CreateTestimonialInput> & {
  id: string;
};

export type CreateFAQInput = {
  question: string;
  answer: string;
  category?: string;
  order?: number;
};

export type UpdateFAQInput = Partial<CreateFAQInput> & {
  id: string;
};

export type UpdateSiteConfigInput = {
  companyDescription?: string;
  companyMission?: string;
  companyVision?: string;
  companyValues?: string[];
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialGithub?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  defaultKeywords?: string[];
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  maintenanceMode?: boolean;
  allowRegistration?: boolean;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
};

// Tipos para resposta de API
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// Tipos para filtros e busca
export type ServiceFilters = {
  type?: ServiceType;
  status?: PublicationStatus;
  featured?: boolean;
  technologyId?: string;
  search?: string;
};

export type PortfolioFilters = {
  status?: ProjectStatus;
  publicationStatus?: PublicationStatus;
  featured?: boolean;
  serviceId?: string;
  technologyId?: string;
  search?: string;
};

export type BlogPostFilters = {
  status?: PublicationStatus;
  category?: string;
  featured?: boolean;
  search?: string;
  tag?: string;
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
