import Image from "next/image";

const cardsSolutions = [
  {
    title: "Atendimento centralizado",
    description:
      "Reúna todas as conversas em um único lugar para sua equipe responder com contexto, agilidade e organização.",
    icon: "inbox",
  },
  {
    title: "Automação de mensagens",
    description:
      "Crie respostas automáticas e fluxos inteligentes que agilizam o atendimento sem perder a proximidade com o cliente.",
    icon: "automation",
  },
  {
    title: "Relatórios e análises",
    description:
      "Acompanhe o desempenho da operação e transforme dados de atendimento em decisões mais rápidas e estratégicas.",
    icon: "analytics",
  },
] as const;

const serviceFeatures = [
  "Acesso em tempo real a todas as conversas.",
  "Filas de atendimento com controle da distribuição entre equipes e operadores.",
  "Suporte a WhatsApp, Instagram e Messenger.",
  "Acesso via web ou aplicativo para atender de qualquer lugar.",
];

const crmFeatures = [
  "Funil de vendas conectado aos seus canais de mensagens.",
  "Acompanhamento completo da prospecção ao fechamento.",
  "Histórico unificado de interações, registros e atividades.",
  "WhatsApp, Instagram e Messenger integrados ao processo comercial.",
];

export default function Solutions() {
  return (
    <div id="functionality" className="bg-background">
      <section
        className="relative overflow-hidden border-y border-border bg-surface-muted py-20 sm:py-24 lg:py-28"
        aria-labelledby="solutions-title"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 -translate-y-2/3 rounded-full bg-dry-sage-500/20 blur-3xl dark:bg-fern-500/10"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Tudo em uma só plataforma
            </p>
            <h2
              id="solutions-title"
              className="mt-4 text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl"
            >
              Soluções para construir e escalar o seu negócio
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Tecnologia para transformar cada conversa em uma oportunidade de
              atendimento e venda.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
            {cardsSolutions.map((card, index) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-fern-700 hover:shadow-xl hover:shadow-pine-teal-100/5 sm:p-7 dark:hover:border-pine-teal-400"
              >
                <span
                  className="absolute right-5 top-4 text-5xl font-black tracking-tighter text-fern-900/60 dark:text-pine-teal-400/30"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>

                <div className="flex size-12 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 transition-colors group-hover:bg-fern-500 group-hover:text-white dark:bg-pine-teal-300 dark:text-dry-sage-500 dark:group-hover:bg-dry-sage-500 dark:group-hover:text-pine-teal-100">
                  <SolutionIcon type={card.icon} />
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  {card.description}
                </p>

                <div className="mt-6 h-0.5 w-10 rounded-full bg-fern-700 transition-all duration-300 group-hover:w-20 group-hover:bg-fern-500 dark:bg-pine-teal-600 dark:group-hover:bg-dry-sage-500" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32" aria-labelledby="service-title">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <ProductVisual label="Inbox multicanal" />

          <div className="lg:pl-4">
            <SectionEyebrow number="01">Atendimento humano</SectionEyebrow>
            <h2
              id="service-title"
              className="mt-5 text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl"
            >
              Inbox e CRM multicanal para toda a equipe
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-hunter-green-500 dark:text-dry-sage-600">
              Todas as conversas centralizadas e organizadas.
            </p>
            <FeatureList items={serviceFeatures} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted py-20 sm:py-24 lg:py-32" aria-labelledby="crm-title">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="lg:pr-4">
            <SectionEyebrow number="02">Gestão comercial</SectionEyebrow>
            <h2
              id="crm-title"
              className="mt-5 text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl"
            >
              CRM com funil de vendas conversacional
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-hunter-green-500 dark:text-dry-sage-600">
              Transforme conversas em oportunidades que você e sua equipe conseguem acompanhar.
            </p>
            <FeatureList items={crmFeatures} />
          </div>

          <div className="lg:order-last">
            <ProductVisual label="Funil de vendas integrado" />
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductVisual({ label }: { label: string }) {
  return (
    <div className="relative">
      <div
        className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-linear-to-br from-dry-sage-500/25 via-fern-500/10 to-transparent blur-2xl dark:from-fern-500/10"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-pine-teal-100/10 sm:rounded-3xl sm:p-3 dark:shadow-black/25">
        <div className="flex items-center justify-between gap-4 px-2 pb-2 sm:px-3 sm:pb-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-fern-700" />
            <span className="size-2.5 rounded-full bg-dry-sage-500" />
            <span className="size-2.5 rounded-full bg-hunter-green-500" />
          </div>
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
            {label}
          </span>
        </div>
        <Image
          src="/Atendimento_02.png"
          alt={`Interface NovoCode: ${label}`}
          width={2732}
          height={1758}
          sizes="(max-width: 1024px) calc(100vw - 32px), 50vw"
          className="h-auto w-full rounded-xl border border-border sm:rounded-2xl"
        />
      </div>
    </div>
  );
}

function SectionEyebrow({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
      <span className="flex size-9 items-center justify-center rounded-full border border-fern-700 bg-fern-900 text-xs font-black text-fern-500 dark:border-pine-teal-400 dark:bg-pine-teal-300 dark:text-dry-sage-500">
        {number}
      </span>
      {children}
    </p>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground sm:text-base">
          <span
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500"
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" className="size-3.5">
              <path d="m5 10 3 3 7-7" />
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SolutionIcon({ type }: { type: (typeof cardsSolutions)[number]["icon"] }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    className: "size-6",
    "aria-hidden": true,
  } as const;

  if (type === "automation") {
    return (
      <svg {...commonProps}>
        <path d="m13 2-1.6 5.4a2 2 0 0 1-1.3 1.3L5 10l5.1 1.3a2 2 0 0 1 1.3 1.3L13 18l1.6-5.4a2 2 0 0 1 1.3-1.3L21 10l-5.1-1.3a2 2 0 0 1-1.3-1.3L13 2Z" />
        <path d="m5 16-.7 2.3L2 19l2.3.7L5 22l.7-2.3L8 19l-2.3-.7L5 16Z" />
      </svg>
    );
  }

  if (type === "analytics") {
    return (
      <svg {...commonProps}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M4 5h16v12H7l-3 3V5Z" />
      <path d="M8 9h8M8 13h5" />
    </svg>
  );
}
