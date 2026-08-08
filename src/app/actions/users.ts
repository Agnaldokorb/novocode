"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { clientUserSchema, resetPasswordSchema } from "@/lib/validations/auth";
import { brazilianPhoneForAuth } from "@/lib/validations/shared";
import { failureState, validationState, type ActionState } from "@/lib/actions/state";
import { recordAudit } from "@/lib/audit";

async function sendPasswordSetupEmail(email: string) {
  try {
    const { error } = await createSupabaseAdminClient().auth.resetPasswordForEmail(email);
    if (error) {
      console.error("sendPasswordSetupEmail", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("sendPasswordSetupEmail", error);
    return false;
  }
}

export async function createClientUserAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = clientUserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);

  const client = await prisma.client.findFirst({
    where: { id: parsed.data.clientId, active: true },
    select: { id: true, phone: true },
  });
  if (!client) return failureState("Cliente inexistente ou inativo.");
  const phone = brazilianPhoneForAuth(client.phone);
  if (!phone) {
    return failureState("Cadastre um telefone brasileiro válido no cliente antes de criar o acesso.");
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.createUser({
    email: parsed.data.email,
    phone,
    password: parsed.data.password,
    email_confirm: true,
    user_metadata: {
      display_name: parsed.data.name,
      full_name: parsed.data.name,
      name: parsed.data.name,
    },
    app_metadata: { role: "CLIENT" },
  });
  if (error || !data.user) return failureState(error?.message ?? "Não foi possível criar o acesso.");

  try {
    const user = await prisma.user.create({
      data: {
        supabaseUserId: data.user.id,
        clientId: parsed.data.clientId,
        email: parsed.data.email,
        name: parsed.data.name,
        role: "CLIENT",
      },
    });
    await recordAudit({ userId: admin.id, action: "USER_CREATED", entity: "User", entityId: user.id });
  } catch (dbError) {
    await supabase.auth.admin.deleteUser(data.user.id);
    console.error("createClientUserAction", dbError);
    return failureState("Não foi possível vincular o acesso ao cliente.");
  }

  revalidatePath(`/admin/clientes/${parsed.data.clientId}`);
  if (!(await sendPasswordSetupEmail(parsed.data.email))) {
    return {
      ok: false,
      message: "O acesso foi criado, mas o Supabase não conseguiu enviar o e-mail de definição de senha. Verifique o SMTP e tente reenviar pelo formulário de redefinição.",
    };
  }
  return { ok: true, message: "Acesso criado e e-mail para definição de senha enviado ao cliente." };
}

export async function resetClientPasswordAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const admin = await requireAdmin();
  const parsed = resetPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);
  const user = await prisma.user.findUnique({ where: { id: parsed.data.userId } });
  if (!user || user.role !== "CLIENT") return failureState("Usuário cliente não encontrado.");
  const { error } = await createSupabaseAdminClient().auth.admin.updateUserById(user.supabaseUserId, {
    password: parsed.data.password,
  });
  if (error) return failureState("Não foi possível redefinir a senha.");
  await recordAudit({ userId: admin.id, action: "USER_PASSWORD_RESET", entity: "User", entityId: user.id });
  if (!(await sendPasswordSetupEmail(user.email))) {
    return failureState("A senha temporária foi atualizada, mas o Supabase não conseguiu enviar o e-mail de definição de senha.");
  }
  return { ok: true, message: "Senha temporária atualizada e e-mail de definição de senha reenviado." };
}

export async function toggleClientUserAction(id: string) {
  const admin = await requireAdmin();
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.role !== "CLIENT") return;
  const active = !user.active;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.auth.admin.updateUserById(user.supabaseUserId, {
    ban_duration: active ? "none" : "876000h",
  });
  if (error) throw new Error("Não foi possível alterar o acesso no provedor de autenticação.");
  await prisma.user.update({ where: { id }, data: { active } });
  await recordAudit({ userId: admin.id, action: active ? "USER_ENABLED" : "USER_DISABLED", entity: "User", entityId: id });
  if (user.clientId) revalidatePath(`/admin/clientes/${user.clientId}`);
}
