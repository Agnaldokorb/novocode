"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requirePortalUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { failureState, validationState, type ActionState } from "@/lib/actions/state";
import { recordAudit } from "@/lib/audit";

const accountSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(30).optional(),
});

export async function updateMyAccountAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requirePortalUser();
  const parsed = accountSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);
  try {
    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { name: parsed.data.name } }),
      prisma.client.update({ where: { id: user.clientId! }, data: { phone: parsed.data.phone || null } }),
    ]);
    await recordAudit({ userId: user.id, action: "ACCOUNT_UPDATED", entity: "User", entityId: user.id });
    revalidatePath("/portal/minha-conta");
    return { ok: true, message: "Dados atualizados." };
  } catch (error) {
    console.error("updateMyAccountAction", error);
    return failureState("Não foi possível atualizar sua conta.");
  }
}
