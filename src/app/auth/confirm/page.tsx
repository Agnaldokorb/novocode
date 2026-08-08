import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { confirmPasswordRecoveryAction } from "@/app/actions/password";
import { SubmitButton } from "@/components/ui/action-form";

export const metadata: Metadata = {
  title: "Confirmar acesso | NovoCode Portal",
  robots: { index: false, follow: false },
};

export default async function ConfirmRecoveryPage({
  searchParams,
}: {
  searchParams: Promise<{ token_hash?: string }>;
}) {
  const { token_hash: tokenHash } = await searchParams;
  if (!tokenHash || tokenHash.length < 32 || tokenHash.length > 512) {
    redirect("/login?recoveryError=1");
  }

  return (
    <main className="grid min-h-svh place-items-center bg-surface-muted px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-7 shadow-xl sm:p-9">
        <Link href="/" className="text-sm font-bold text-accent">← Voltar ao site</Link>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-accent">Área segura</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Confirme seu acesso</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Clique em continuar para validar o link e criar sua senha de acesso.
        </p>
        <form action={confirmPasswordRecoveryAction} className="mt-7">
          <input type="hidden" name="tokenHash" value={tokenHash} />
          <SubmitButton label="Continuar" pendingLabel="Validando..." />
        </form>
      </div>
    </main>
  );
}
