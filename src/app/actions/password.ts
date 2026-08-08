"use server";

import { redirect } from "next/navigation";
import { failureState, validationState, type ActionState } from "@/lib/actions/state";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updatePasswordSchema } from "@/lib/validations/auth";

export async function updateRecoveredPasswordAction(
  _: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = updatePasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationState(parsed.error);

  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return failureState("Este link expirou ou já foi utilizado. Solicite um novo e-mail de acesso.");
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return failureState(error.message);

  await supabase.auth.signOut();
  redirect("/login?passwordUpdated=1");
}
