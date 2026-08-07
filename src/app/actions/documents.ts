"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { documentMetadataSchema } from "@/lib/validations/document";
import { optionalDate } from "@/lib/validations/shared";
import { failureState, validationState, type ActionState } from "@/lib/actions/state";
import { recordAudit } from "@/lib/audit";
import {
  buildDocumentPath,
  removePrivateDocument,
  uploadPrivateDocument,
  validatePdf,
} from "@/services/documents/storage";

export async function uploadDocumentAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = documentMetadataSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);
  const file = formData.get("file");
  if (!(file instanceof File)) return failureState("Selecione um arquivo PDF.");

  try {
    await validatePdf(file);
  } catch (error) {
    return failureState(error instanceof Error ? error.message : "Arquivo inválido.");
  }

  const client = await prisma.client.findFirst({ where: { id: parsed.data.clientId, active: true } });
  if (!client) return failureState("Cliente inexistente ou inativo.");
  if (parsed.data.companyId) {
    const company = await prisma.company.findFirst({
      where: { id: parsed.data.companyId, clientId: parsed.data.clientId, active: true },
    });
    if (!company) return failureState("A empresa não pertence ao cliente selecionado.");
  }

  const path = buildDocumentPath(parsed.data);
  try {
    await uploadPrivateDocument(path, file);
    const document = await prisma.document.create({
      data: {
        ...parsed.data,
        uploadedById: admin.id,
        fileName: file.name,
        filePath: path,
        mimeType: "application/pdf",
        fileSize: file.size,
        referenceMonth: optionalDate(formData.get("referenceMonth")),
        dueDate: optionalDate(formData.get("dueDate")),
      },
    });
    await recordAudit({ userId: admin.id, action: "DOCUMENT_UPLOADED", entity: "Document", entityId: document.id, metadata: { type: document.type } });
    revalidatePath("/admin/documentos");
    revalidatePath(`/admin/clientes/${document.clientId}`);
    return { ok: true, message: "Documento enviado com segurança." };
  } catch (error) {
    console.error("uploadDocumentAction", error);
    await removePrivateDocument(path).catch(() => undefined);
    return failureState("Não foi possível enviar o documento.");
  }
}

export async function replaceDocumentAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const documentId = String(formData.get("documentId") ?? "");
  const file = formData.get("file");
  if (!(file instanceof File)) return failureState("Selecione um arquivo PDF.");
  const current = await prisma.document.findUnique({ where: { id: documentId } });
  if (!current) return failureState("Documento não encontrado.");
  try {
    await validatePdf(file);
    const path = buildDocumentPath({
      clientId: current.clientId,
      companyId: current.companyId ?? undefined,
      type: current.type,
    });
    await uploadPrivateDocument(path, file);
    await prisma.document.update({
      where: { id: documentId },
      data: { filePath: path, fileName: file.name, fileSize: file.size, uploadedById: admin.id, uploadedAt: new Date() },
    });
    await removePrivateDocument(current.filePath).catch((error) => console.error("old document cleanup", error));
    await recordAudit({ userId: admin.id, action: "DOCUMENT_REPLACED", entity: "Document", entityId: current.id });
    revalidatePath("/admin/documentos");
    return { ok: true, message: "Arquivo substituído com sucesso." };
  } catch (error) {
    console.error("replaceDocumentAction", error);
    return failureState(error instanceof Error ? error.message : "Não foi possível substituir o documento.");
  }
}

export async function deleteDocumentAction(id: string) {
  const admin = await requireAdmin();
  const document = await prisma.document.findUnique({ where: { id } });
  if (!document) return;
  await removePrivateDocument(document.filePath);
  await prisma.document.delete({ where: { id } });
  await recordAudit({ userId: admin.id, action: "DOCUMENT_DELETED", entity: "Document", entityId: id, metadata: { fileName: document.fileName } });
  revalidatePath("/admin/documentos");
  revalidatePath(`/admin/clientes/${document.clientId}`);
}
