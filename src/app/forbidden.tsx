import Link from "next/link";

export default function Forbidden() {
  return <main className="grid min-h-svh place-items-center bg-surface-muted p-6"><div className="max-w-md rounded-3xl border border-border bg-background p-8 text-center shadow-lg"><p className="text-sm font-black text-red-700">403</p><h1 className="mt-2 text-2xl font-black">Acesso não autorizado</h1><p className="mt-3 text-sm text-muted-foreground">Sua conta não possui permissão para acessar este recurso.</p><Link href="/" className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Voltar ao início</Link></div></main>;
}
