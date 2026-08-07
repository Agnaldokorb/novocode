import "server-only";

function required(name: string, fallback?: string) {
  const value = process.env[name] ?? (fallback ? process.env[fallback] : undefined);

  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }

  return value;
}

export function getSupabaseUrl() {
  return required("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL");
}

export function getSupabasePublishableKey() {
  return required("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "SUPABASE_ANON_KEY");
}

export function getSupabaseServiceRoleKey() {
  return required("SUPABASE_SERVICE_ROLE_KEY");
}

export function getDatabaseUrl() {
  return required("DATABASE_URL", "SUPABASE_DB_URL");
}

export function getDocumentsBucket() {
  return process.env.SUPABASE_DOCUMENTS_BUCKET ?? "client-documents";
}
