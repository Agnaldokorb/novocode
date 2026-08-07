"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { clientSchema, clientUpdateSchema } from "@/lib/validations/client";
import { failureState, validationState, type ActionState } from "@/lib/actions/state";
import { recordAudit } from "@/lib/audit";

export async function createClientAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = clientSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);

  try {
    const client = await prisma.client.create({ data: parsed.data });
    await recordAudit({ userId: admin.id, action: "CLIENT_CREATED", entity: "Client", entityId: client.id });
    revalidatePath("/admin/clientes");
    return { ok: true, message: "Cliente criado com sucesso." };
  } catch (error) {
    console.error("createClientAction", error);
    return failureState("Não foi possível criar o cliente. Verifique CPF/CNPJ e e-mail.");
  }
}

export async function updateClientAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = clientUpdateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);

  const { id, ...data } = parsed.data;
  delete data.active;
  try {
    await prisma.client.update({ where: { id }, data });
    await recordAudit({ userId: admin.id, action: "CLIENT_UPDATED", entity: "Client", entityId: id });
    revalidatePath(`/admin/clientes/${id}`);
    revalidatePath("/admin/clientes");
    return { ok: true, message: "Cliente atualizado." };
  } catch (error) {
    console.error("updateClientAction", error);
    return failureState("Não foi possível atualizar o cliente.");
  }
}

export async function toggleClientAction(id: string) {
  const admin = await requireAdmin();
  const current = await prisma.client.findUnique({ where: { id }, select: { active: true } });
  if (!current) return;
  const active = !current.active;
  await prisma.$transaction([
    prisma.client.update({ where: { id }, data: { active } }),
    prisma.user.updateMany({ where: { clientId: id }, data: { active } }),
  ]);
  await recordAudit({
    userId: admin.id,
    action: active ? "CLIENT_ENABLED" : "CLIENT_DISABLED",
    entity: "Client",
    entityId: id,
  });
  revalidatePath("/admin/clientes");
  revalidatePath(`/admin/clientes/${id}`);
}
