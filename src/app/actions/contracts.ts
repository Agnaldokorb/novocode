"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { contractSchema, contractUpdateSchema } from "@/lib/validations/contract";
import { failureState, validationState, type ActionState } from "@/lib/actions/state";
import { recordAudit } from "@/lib/audit";

async function validateContractRelations(data: { clientId: string; companyId?: string; documentId?: string }) {
  const client = await prisma.client.findFirst({ where: { id: data.clientId, active: true } });
  if (!client) return "Cliente inexistente ou inativo.";
  if (data.companyId) {
    const company = await prisma.company.findFirst({ where: { id: data.companyId, clientId: data.clientId } });
    if (!company) return "A empresa não pertence ao cliente.";
  }
  if (data.documentId) {
    const document = await prisma.document.findFirst({ where: { id: data.documentId, clientId: data.clientId, type: "CONTRATO" } });
    if (!document) return "O documento de contrato não pertence ao cliente.";
  }
}

export async function createContractAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = contractSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);
  const relationError = await validateContractRelations(parsed.data);
  if (relationError) return failureState(relationError);
  try {
    const contract = await prisma.contract.create({ data: parsed.data });
    await recordAudit({ userId: admin.id, action: "CONTRACT_CREATED", entity: "Contract", entityId: contract.id });
    revalidatePath("/admin/contratos");
    return { ok: true, message: "Contrato cadastrado." };
  } catch (error) {
    console.error("createContractAction", error);
    return failureState("Não foi possível cadastrar o contrato.");
  }
}

export async function updateContractAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = contractUpdateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);
  const { id, ...data } = parsed.data;
  const relationError = await validateContractRelations(data);
  if (relationError) return failureState(relationError);
  try {
    await prisma.contract.update({ where: { id }, data });
    await recordAudit({ userId: admin.id, action: "CONTRACT_UPDATED", entity: "Contract", entityId: id });
    revalidatePath("/admin/contratos");
    return { ok: true, message: "Contrato atualizado." };
  } catch (error) {
    console.error("updateContractAction", error);
    return failureState("Não foi possível atualizar o contrato.");
  }
}
