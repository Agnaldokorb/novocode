"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="grid min-h-80 place-items-center p-6"><div className="max-w-md text-center"><h2 className="text-xl font-black">Não foi possível carregar esta página.</h2><p className="mt-2 text-sm text-muted-foreground">Tente novamente. Se o problema continuar, fale com o suporte.</p><button onClick={reset} className="mt-5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Tentar novamente</button></div></main>;
}
