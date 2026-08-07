"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validations/auth";
import { validationState, failureState, type ActionState } from "@/lib/actions/state";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getPostLoginRedirect } from "@/lib/auth/redirect";

export async function loginAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return validationState(parsed.error);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return failureState("E-mail ou senha inválidos.");

  const user = await prisma.user.findUnique({
    where: { supabaseUserId: data.user.id },
    include: { client: true },
  });

  if (!user || !user.active || (user.role === "CLIENT" && !user.client?.active)) {
    await supabase.auth.signOut();
    return failureState("Sua conta não está ativa. Entre em contato com o suporte.");
  }

  redirect(getPostLoginRedirect(formData.get("next"), user.role));
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
