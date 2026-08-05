import Image from "next/image";
import atendimentoImage from "../../../../public/Atendimento_02.png";
import atendimentoCardImage from "../../../../public/Atendimento-card.png";
import crmCardImage from "../../../../public/crm-card.png";
import inteligenciaCardImage from "../../../../public/inteligencia-card.png";
import funilVendasImage from "../../../../public/funil-vendas.png";

const cardsSolutions = [
  {
    title: "Atendimento",
    description:
      "Ganhe agilidade e mantenha o controle. Com todos os canais em um só lugar, sua equipe reduz o tempo de resposta, mantém o histórico do cliente, mesmo com alto volume de mensagens.",
    image: atendimentoCardImage,
  },
  {
    title: "CRM",
    description:
      "Acompanhe o funil de vendas em tempo real, veja o que está travando o avanço dos leads e use informações precisas para tomar decisões que aumentam conversões e retenção.",
    image: crmCardImage,
  },
  {
    title: "Inteligência Artificial",
    description:
      "Atendimento inteligente, 24h por dia. Crie agentes que executam rotinas de atendimento, vendas e suporte e ajudam você a manter a qualidade do serviço.",
    image: inteligenciaCardImage,
  },
] as const;

const serviceFeatures = [
  "Acesso em tempo real a todas as conversas.",
  "Filas de atendimento, com controle total da distribuição entre equipes e operadores.",
  "Suporte aos canais de atendimento da Meta: WhatsApp, Instagram e Messenger.",
  "Atenda de onde estiver: Acesse tudo via web ou App, com agilidade e organização.",
];

const crmFeatures = [
  "Conecte seu funil de vendas aos canais de mensagens, centralizando todas as conversas.",
  "Acompanhamento completo de cada etapa da jornada, da prospecção ao fechamento.",
  "Histórico unificado: acesse interações, registros e atividades em um só lugar.",
  "WhatsApp, Instagram e Messenger integrados ao seu processo comercial.",
];

export default function Solutions() {
  return (
    <div id="functionality" className="bg-background">
      <section
        className="relative overflow-hidden border-y border-border bg-surface-muted pb-32 pt-20 sm:pb-36 sm:pt-24 lg:pb-40 lg:pt-28"
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

          <div className="mt-12 grid gap-x-5 gap-y-20 md:grid-cols-3 lg:mt-16 lg:gap-x-6">
            {cardsSolutions.map((card) => (
              <article
                key={card.title}
                className="group relative flex min-h-80 flex-col overflow-visible rounded-2xl border border-border/70 bg-background px-6 pb-0 pt-7 shadow-[0_18px_60px_-24px_rgba(52,78,65,0.28)] transition duration-300 hover:-translate-y-1 hover:border-fern-700 hover:shadow-[0_24px_70px_-24px_rgba(52,78,65,0.4)] sm:px-7 dark:hover:border-pine-teal-400"
              >
                <h3 className="text-2xl font-black tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {card.description}
                </p>

                <div className="mx-auto mt-auto w-[82%] translate-y-12 overflow-hidden rounded-xl border border-border bg-white shadow-lg transition duration-300 group-hover:translate-y-11 group-hover:shadow-xl">
                  <Image
                    src={card.image}
                    alt={`Ilustração da solução de ${card.title} da NovoCode`}
                    sizes="(max-width: 767px) calc(82vw - 48px), (max-width: 1279px) 25vw, 290px"
                    className="h-auto w-full"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32" aria-labelledby="service-title">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <ProductVisual label="Inbox multicanal" />
          <div className="lg:pl-4">
            <SectionEyebrow number="01">Atendimento</SectionEyebrow>
            <h2
              id="service-title"
              className="mt-5 text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl"
            >
              Todas as conversas centralizadas e organizadas
            </h2>
            <FeatureList items={serviceFeatures} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted py-20 sm:py-24 lg:py-32" aria-labelledby="crm-title">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="lg:pr-4">
            <SectionEyebrow number="02">CRM</SectionEyebrow>
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
            <ProductVisual label="Funil de vendas" />
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
          src={label === "Funil de vendas" ? funilVendasImage : atendimentoImage}
          alt={`Interface NovoCode: ${label}`}
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

