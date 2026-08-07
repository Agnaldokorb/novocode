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
  searchParams: Promise<{ next?: string }>;
}) {
  const [{ next }, user] = await Promise.all([searchParams, getCurrentUser()]);

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
        <LoginForm nextPath={next} />
      </div>
    </main>
  );
}
