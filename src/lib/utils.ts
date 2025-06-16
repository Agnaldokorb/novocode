import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

// Configurar dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utilitários de data/hora
export const dateUtils = {
  // Converter UTC para horário local (UTC-3)
  toLocal: (date: Date | string) => {
    return dayjs.utc(date).tz("America/Sao_Paulo");
  },

  // Converter horário local para UTC
  toUTC: (date: Date | string) => {
    return dayjs.tz(date, "America/Sao_Paulo").utc();
  },

  // Formatar data para exibição
  format: (date: Date | string, format = "DD/MM/YYYY HH:mm") => {
    return dayjs.utc(date).tz("America/Sao_Paulo").format(format);
  },

  // Formatar data relativa
  fromNow: (date: Date | string) => {
    return dayjs.utc(date).tz("America/Sao_Paulo").fromNow();
  },

  // Verificar se uma data é hoje
  isToday: (date: Date | string) => {
    return dayjs.utc(date).tz("America/Sao_Paulo").isSame(dayjs(), "day");
  },

  // Verificar se uma data é esta semana
  isThisWeek: (date: Date | string) => {
    return dayjs.utc(date).tz("America/Sao_Paulo").isSame(dayjs(), "week");
  },
};

// Utilitários de string
export const stringUtils = {
  // Gerar slug a partir de string
  generateSlug: (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .trim()
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/-+/g, "-"); // Remove hífens duplicados
  },

  // Truncar texto
  truncate: (text: string, length: number, suffix = "..."): string => {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + suffix;
  },

  // Capitalizar primeira letra
  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  // Capitalizar cada palavra
  titleCase: (text: string): string => {
    return text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  // Remover HTML tags
  stripHtml: (html: string): string => {
    return html.replace(/<[^>]*>/g, "");
  },

  // Calcular tempo de leitura
  readingTime: (text: string): number => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  },
};

// Utilitários de formatação
export const formatUtils = {
  // Formatar moeda brasileira
  currency: (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  },

  // Formatar número
  number: (value: number): string => {
    return new Intl.NumberFormat("pt-BR").format(value);
  },

  // Formatar telefone brasileiro
  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  },

  // Formatar CEP
  cep: (cep: string): string => {
    const cleaned = cep.replace(/\D/g, "");
    return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
  },

  // Formatar CNPJ
  cnpj: (cnpj: string): string => {
    const cleaned = cnpj.replace(/\D/g, "");
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  },
};

// Utilitários de validação
export const validationUtils = {
  // Validar email
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar telefone brasileiro
  isValidPhone: (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 10 || cleaned.length === 11;
  },

  // Validar URL
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Validar CNPJ
  isValidCNPJ: (cnpj: string): boolean => {
    const cleaned = cnpj.replace(/\D/g, "");
    if (cleaned.length !== 14) return false;

    // Verificação básica (implementação simplificada)
    if (/^(\d)\1{13}$/.test(cleaned)) return false;

    return true;
  },
};

// Utilitários de arquivo
export const fileUtils = {
  // Obter extensão do arquivo
  getExtension: (filename: string): string => {
    return filename.split(".").pop()?.toLowerCase() || "";
  },

  // Verificar se é imagem
  isImage: (filename: string): boolean => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    return imageExtensions.includes(fileUtils.getExtension(filename));
  },

  // Formattar tamanho do arquivo
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },
};

// Utilitários de SEO
export const seoUtils = {
  // Gerar meta tags
  generateMetaTags: (data: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
  }) => {
    const { title, description, keywords, image, url } = data;

    return {
      title: title || "NOVOCODE - Tecnologia e Sistemas",
      description:
        description ||
        "Desenvolvimento de sistemas e soluções tecnológicas inovadoras",
      keywords:
        keywords?.join(", ") ||
        "desenvolvimento, sistemas, tecnologia, software",
      openGraph: {
        title: title || "NOVOCODE - Tecnologia e Sistemas",
        description:
          description ||
          "Desenvolvimento de sistemas e soluções tecnológicas inovadoras",
        image: image || "/og-image.jpg",
        url: url || "https://novocode.com.br",
      },
      twitter: {
        card: "summary_large_image",
        title: title || "NOVOCODE - Tecnologia e Sistemas",
        description:
          description ||
          "Desenvolvimento de sistemas e soluções tecnológicas inovadoras",
        image: image || "/og-image.jpg",
      },
    };
  },
};

// Utilitários de array
export const arrayUtils = {
  // Remover duplicatas
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },

  // Agrupar por propriedade
  groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce((groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  // Embaralhar array
  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Paginar array
  paginate: <T>(array: T[], page: number, limit: number): T[] => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return array.slice(startIndex, endIndex);
  },
};

// Função para gerar slugs
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .replace(/^-|-$/g, ""); // Remove hífens do início e fim
}
