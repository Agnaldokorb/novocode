import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { updateRecoveredPasswordAction } from "@/app/actions/password";
import { ActionForm } from "@/components/ui/action-form";
import { Field, Input } from "@/components/ui/fields";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Definir senha | NovoCode Portal" };

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?recoveryError=1");

  return (
    <main className="grid min-h-svh place-items-center bg-surface-muted px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-7 shadow-xl sm:p-9">
        <Link href="/" className="text-sm font-bold text-accent">← Voltar ao site</Link>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-accent">Primeiro acesso</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Crie sua senha</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Escolha uma senha definitiva com pelo menos 12 caracteres.</p>
        <ActionForm action={updateRecoveredPasswordAction} submitLabel="Salvar nova senha" className="mt-7 space-y-5">
          <Field label="Nova senha"><Input name="password" type="password" minLength={12} autoComplete="new-password" required /></Field>
          <Field label="Confirmar nova senha"><Input name="confirmPassword" type="password" minLength={12} autoComplete="new-password" required /></Field>
        </ActionForm>
      </div>
    </main>
  );
}
