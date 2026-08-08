import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/auth/session";
import { getPostLoginRedirect } from "@/lib/auth/redirect";

export const metadata: Metadata = { title: "Entrar | NovoCode Portal" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; passwordUpdated?: string; recoveryError?: string }>;
}) {
  const [{ next, passwordUpdated, recoveryError }, user] = await Promise.all([searchParams, getCurrentUser()]);

  if (user?.active && (user.role === "ADMIN" || user.client?.active)) {
    redirect(getPostLoginRedirect(next ?? null, user.role));
  }

  return (
    <main className="grid min-h-svh place-items-center bg-surface-muted px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-7 shadow-xl sm:p-9">
        <Link href="/" className="text-sm font-bold text-accent">← Voltar ao site</Link>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-accent">Área segura</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Acesse sua conta</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Use o acesso fornecido pela equipe NovoCode. Não há cadastro público.</p>
        {passwordUpdated === "1" && (
          <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Senha definida com sucesso. Entre com sua nova senha.
          </p>
        )}
        {recoveryError === "1" && (
          <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            O link de definição de senha expirou ou já foi utilizado. Solicite um novo e-mail à equipe NovoCode.
          </p>
        )}
        <LoginForm nextPath={next} />
      </div>
    </main>
  );
}
