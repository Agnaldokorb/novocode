import "server-only";

import { randomUUID } from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getDocumentsBucket } from "@/lib/env";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function documentFolder(type: string) {
  return {
    BOLETO: "boletos",
    NOTA_FISCAL: "notas-fiscais",
    CONTRATO: "contratos",
    OUTRO: "outros",
  }[type] ?? "outros";
}

export async function validatePdf(file: File) {
  if (!file.name.toLowerCase().endsWith(".pdf")) throw new Error("Apenas arquivos PDF são aceitos.");
  if (file.type !== "application/pdf") throw new Error("O tipo do arquivo deve ser PDF.");
  if (file.size <= 0 || file.size > MAX_FILE_SIZE) throw new Error("O arquivo deve ter no máximo 10 MB.");

  const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  if (new TextDecoder().decode(header) !== "%PDF-") {
    throw new Error("O conteúdo enviado não corresponde a um PDF válido.");
  }
}

export function buildDocumentPath(input: {
  clientId: string;
  companyId?: string;
  type: string;
}) {
  const company = input.companyId ?? "sem-empresa";
  return `clients/${input.clientId}/companies/${company}/${documentFolder(input.type)}/${randomUUID()}.pdf`;
}

export async function uploadPrivateDocument(path: string, file: File) {
  await validatePdf(file);
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage
    .from(getDocumentsBucket())
    .upload(path, await file.arrayBuffer(), { contentType: "application/pdf", upsert: false });
  if (error) throw new Error(`Falha no armazenamento: ${error.message}`);
}

export async function removePrivateDocument(path: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.storage.from(getDocumentsBucket()).remove([path]);
  if (error) throw new Error(`Falha ao remover arquivo: ${error.message}`);
}

export async function createDocumentSignedUrl(path: string, fileName: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.storage
    .from(getDocumentsBucket())
    .createSignedUrl(path, 60, { download: fileName });
  if (error || !data.signedUrl) throw new Error("Não foi possível gerar o download.");
  return data.signedUrl;
}
