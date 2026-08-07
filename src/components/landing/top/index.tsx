import Image from "next/image";
import Link from "next/link";
import atendimentoImage from "../../../../public/Atendimento.png";

const highlights = [
  "Atendimento centralizado",
  "Agentes de IA",
  "Chatbots inteligentes",
  "Gestão de leads",
  "Relatórios e métricas",
];

export default function Top() {
  return (
    <section
      className="relative isolate overflow-hidden bg-background"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-b from-dry-sage-900 via-fern-900/35 to-transparent dark:from-hunter-green-200 dark:via-pine-teal-100/30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-24 -z-10 size-96 rounded-full bg-dry-sage-500/20 blur-3xl dark:bg-fern-500/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-48 top-56 -z-10 size-112 rounded-full bg-fern-600/15 blur-3xl dark:bg-dry-sage-500/10"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-hunter-green-500 shadow-sm backdrop-blur dark:border-pine-teal-400 dark:text-dry-sage-500">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-fern-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-fern-500" />
            </span>
            CRM para WhatsApp
          </p>

          <h1
            id="hero-title"
            className="text-balance text-4xl font-black leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-7xl"
          >
            O CRM para WhatsApp que{" "}
            <span className="text-fern-500 dark:text-dry-sage-500">
              automatiza e vende mais
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-7 text-hunter-green-500 dark:text-dry-sage-600 sm:text-xl">
            A plataforma para desenvolver o seu negócio.
          </p>

          <p className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Conecte equipes, clientes e leads em uma única plataforma que
            combina agentes de IA, atendimento humano e inteligência
            conversacional para acelerar o crescimento da sua empresa.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="https://novocode.tec.br/"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-hunter-green-500/20 transition hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto"
            >
              Acessar plataforma
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a
              className="h-widget-trigger inline-flex min-h-12 w-full items-center justify-center rounded-full border border-border bg-background/70 px-6 py-3 text-sm font-bold text-foreground backdrop-blur transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto"
            >
              Conhecer a plataforma
            </a>
          </div>

          <ul className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground sm:flex-row">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2">
                <span
                  className="flex size-5 items-center justify-center rounded-full bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    className="size-3"
                  >
                    <path d="m5 10 3 3 7-7" />
                  </svg>
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-12 max-w-6xl sm:mt-16 lg:mt-20">
          <div
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-r from-dry-sage-500/25 via-fern-500/15 to-hunter-green-500/25 blur-2xl dark:from-dry-sage-500/10 dark:via-fern-500/10 dark:to-pine-teal-500/20"
            aria-hidden="true"
          />

          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-2xl shadow-pine-teal-100/15 sm:rounded-[1.75rem] sm:p-2.5 dark:shadow-black/30">
            <div className="flex items-center gap-1.5 px-2 pb-2 pt-0.5 sm:px-3 sm:pb-3">
              <span className="size-2.5 rounded-full bg-fern-700 sm:size-3" />
              <span className="size-2.5 rounded-full bg-dry-sage-500 sm:size-3" />
              <span className="size-2.5 rounded-full bg-hunter-green-500 sm:size-3" />
              <span className="ml-2 truncate text-[10px] font-medium text-muted-foreground sm:text-xs">
                Central de atendimento NovoCode.Tec
              </span>
            </div>

            <Image
              src={atendimentoImage}
              alt="Central de atendimento NovoCode exibindo conversas, clientes e automações do WhatsApp"
              sizes="(max-width: 1280px) calc(100vw - 32px), 1152px"
              priority
              className="h-auto w-full rounded-xl border border-border sm:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
