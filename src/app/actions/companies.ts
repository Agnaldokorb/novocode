"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { companySchema, companyUpdateSchema } from "@/lib/validations/company";
import { failureState, validationState, type ActionState } from "@/lib/actions/state";
import { recordAudit } from "@/lib/audit";

export async function createCompanyAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = companySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);

  const client = await prisma.client.findFirst({ where: { id: parsed.data.clientId, active: true } });
  if (!client) return failureState("Cliente inexistente ou inativo.");

  try {
    const company = await prisma.company.create({ data: parsed.data });
    await recordAudit({ userId: admin.id, action: "COMPANY_CREATED", entity: "Company", entityId: company.id });
    revalidatePath("/admin/empresas");
    return { ok: true, message: "Empresa criada com sucesso." };
  } catch (error) {
    console.error("createCompanyAction", error);
    return failureState("Não foi possível criar a empresa. Verifique o CNPJ.");
  }
}

export async function updateCompanyAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = companyUpdateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);
  const { id, ...data } = parsed.data;

  const client = await prisma.client.findFirst({ where: { id: data.clientId, active: true } });
  if (!client) return failureState("Cliente inexistente ou inativo.");
  try {
    await prisma.company.update({ where: { id }, data });
    await recordAudit({ userId: admin.id, action: "COMPANY_UPDATED", entity: "Company", entityId: id });
    revalidatePath(`/admin/empresas/${id}`);
    revalidatePath("/admin/empresas");
    return { ok: true, message: "Empresa atualizada." };
  } catch (error) {
    console.error("updateCompanyAction", error);
    return failureState("Não foi possível atualizar a empresa.");
  }
}

export async function toggleCompanyAction(id: string) {
  const admin = await requireAdmin();
  const company = await prisma.company.findUnique({ where: { id }, select: { active: true } });
  if (!company) return;
  const active = !company.active;
  await prisma.company.update({ where: { id }, data: { active } });
  await recordAudit({ userId: admin.id, action: active ? "COMPANY_ENABLED" : "COMPANY_DISABLED", entity: "Company", entityId: id });
  revalidatePath("/admin/empresas");
  revalidatePath(`/admin/empresas/${id}`);
}
