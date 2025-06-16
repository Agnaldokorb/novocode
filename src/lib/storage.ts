import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente específico para upload (browser)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  path?: string;
}

export interface UploadOptions {
  bucket: string;
  folder?: string;
  maxSizeInMB?: number;
  allowedTypes?: readonly string[];
}

// Configurações padrão por tipo de conteúdo
export const UPLOAD_CONFIGS = {
  services: {
    bucket: "uploads",
    folder: "services",
    maxSizeInMB: 5,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
  portfolio: {
    bucket: "uploads",
    folder: "portfolio",
    maxSizeInMB: 10,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
  technologies: {
    bucket: "uploads",
    folder: "technologies",
    maxSizeInMB: 2,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  },
  blog: {
    bucket: "uploads",
    folder: "blog",
    maxSizeInMB: 5,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
  site: {
    bucket: "uploads",
    folder: "site",
    maxSizeInMB: 3,
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  },
} as const;

/**
 * Valida se o arquivo atende aos critérios especificados
 */
function validateFile(file: File, options: UploadOptions): string | null {
  // Verificar tamanho
  const maxSize = (options.maxSizeInMB || 5) * 1024 * 1024; // Converter MB para bytes
  if (file.size > maxSize) {
    return `Arquivo muito grande. Tamanho máximo: ${
      options.maxSizeInMB || 5
    }MB`;
  }

  // Verificar tipo
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    return `Tipo de arquivo não permitido. Tipos aceitos: ${options.allowedTypes.join(
      ", "
    )}`;
  }

  return null;
}

/**
 * Gera um nome único para o arquivo
 */
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  const nameWithoutExtension = originalName.split(".").slice(0, -1).join(".");

  // Sanitizar nome do arquivo
  const sanitizedName = nameWithoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, "_")
    .substring(0, 20);

  return `${sanitizedName}_${timestamp}_${randomString}.${extension}`;
}

/**
 * Faz upload de um arquivo para o Supabase Storage
 */
export async function uploadFile(
  file: File,
  options: UploadOptions
): Promise<UploadResult> {
  try {
    // Validar arquivo
    const validationError = validateFile(file, options);
    if (validationError) {
      return { success: false, error: validationError };
    }

    // Gerar nome único
    const fileName = generateFileName(file.name);
    const filePath = options.folder
      ? `${options.folder}/${fileName}`
      : fileName;

    // Fazer upload
    const { data, error } = await supabase.storage
      .from(options.bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Erro no upload:", error);
      return { success: false, error: error.message };
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from(options.bucket)
      .getPublicUrl(data.path);

    return {
      success: true,
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    console.error("Erro inesperado no upload:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Deleta um arquivo do Supabase Storage
 */
export async function deleteFile(
  filePath: string,
  bucket: string = "uploads"
): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Erro ao deletar arquivo:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erro inesperado ao deletar:", error);
    return false;
  }
}

/**
 * Lista arquivos em uma pasta específica
 */
export async function listFiles(folder: string, bucket: string = "uploads") {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(folder);

    if (error) {
      console.error("Erro ao listar arquivos:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Erro inesperado ao listar:", error);
    return [];
  }
}

/**
 * Extrai o path do arquivo a partir de uma URL do Supabase Storage
 */
export function extractFilePathFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const bucketIndex = pathParts.findIndex((part) => part === "uploads");

    if (bucketIndex !== -1 && pathParts.length > bucketIndex + 1) {
      return pathParts.slice(bucketIndex + 1).join("/");
    }

    return null;
  } catch {
    return null;
  }
}

export { supabase as supabaseClient };
