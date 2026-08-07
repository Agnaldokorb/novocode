import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleUserRound,
  Filter,
  Handshake,
  Headphones,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import atendimentoImage from "../../../public/Atendimento.png";

const benefits: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Distribuição de demandas",
    description:
      "Direcione cada contato para o profissional ou equipe responsável pelo relacionamento.",
    icon: UserRoundCheck,
  },
  {
    title: "Atendimento personalizado",
    description:
      "Mantenha histórico e contexto centralizados para interações mais próximas e assertivas.",
    icon: Handshake,
  },
  {
    title: "Mais eficiência comercial",
    description:
      "Dê clareza sobre responsabilidades e ajude a equipe a concentrar energia em conversão e retenção.",
    icon: TrendingUp,
  },
  {
    title: "Gestão flexível",
    description:
      "Crie, importe, reorganize ou remova carteiras conforme sua operação evolui.",
    icon: RefreshCw,
  },
];

const useCases = [
  {
    title: "Vendas",
    description:
      "Distribua oportunidades por vendedor e mantenha cada lead com seu responsável durante o ciclo comercial.",
    icon: Target,
  },
  {
    title: "Pós-venda e sucesso",
    description:
      "Permita que comercial, suporte e CS acompanhem clientes estratégicos sem perder o contexto.",
    icon: Headphones,
  },
  {
    title: "Campanhas segmentadas",
    description:
      "Combine carteiras, etiquetas e perfil do cliente para criar públicos mais relevantes.",
    icon: Filter,
  },
  {
    title: "Ajustes de equipe",
    description:
      "Redistribua clientes durante férias, afastamentos ou períodos de maior volume operacional.",
    icon: UsersRound,
  },
];

const portfolioTypes = [
  {
    title: "Carteira única",
    tag: "Comercial",
    description:
      "Cada contato possui um responsável principal. Ideal para vendas consultivas, prospecção e negociações que exigem continuidade individual.",
    highlights: [
      "Responsável definido por contato",
      "Continuidade até o fechamento",
      "Gestão clara de propriedade",
    ],
    icon: CircleUserRound,
  },
  {
    title: "Carteira múltipla",
    tag: "Pós-venda",
    description:
      "O mesmo cliente pode ser acompanhado por diferentes usuários ou equipes, conforme segmento, região ou etapa do relacionamento.",
    highlights: [
      "Acompanhamento entre áreas",
      "Segmentação por critérios",
      "Contexto compartilhado",
    ],
    icon: UsersRound,
  },
];

export default function CustomerPortfolioFeaturePage() {
  return (
    <main className="overflow-hidden bg-background">
      <Hero />
      <WhatIsPortfolio />
      <Benefits />
      <UseCases />
      <PortfolioTypes />
      <ProductIntegration />
      <CallToAction />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate border-b border-border" aria-labelledby="portfolio-title">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-36 top-12 -z-10 size-112 rounded-full bg-fern-500/16 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 shadow-sm backdrop-blur dark:border-pine-teal-400 dark:text-dry-sage-500">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Carteiras NovoCode
          </p>
          <h1
            id="portfolio-title"
            className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl"
          >
            Carteirização de{" "}
            <span className="text-fern-500 dark:text-dry-sage-500">clientes</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Vincule contatos a profissionais ou equipes e garanta continuidade,
            contexto e prioridade em toda a jornada — do comercial ao pós-venda.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              data-plan="Carteirização"
              className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg shadow-hunter-green-500/20 transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Falar com especialista
              <MessageCircle className="size-4" aria-hidden="true" />
            </button>
            <Link
              href="/precos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground backdrop-blur transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Conhecer os planos
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-sm font-semibold text-muted-foreground sm:grid-cols-2">
            {[
              "Responsáveis definidos",
              "Histórico preservado",
              "Distribuição flexível",
              "Relacionamento contínuo",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <PortfolioMockup />
      </div>
    </section>
  );
}

function PortfolioMockup() {
  const owners = [
    { initials: "AC", name: "Ana Costa", role: "Executiva comercial", clients: 48 },
    { initials: "RL", name: "Rafael Lima", role: "Customer Success", clients: 36 },
    { initials: "MS", name: "Marina Souza", role: "Suporte", clients: 29 },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-linear-to-br from-dry-sage-500/30 via-fern-500/12 to-hunter-green-500/20 blur-2xl"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-pine-teal-400 bg-pine-teal-100 p-3 text-white shadow-2xl shadow-pine-teal-100/25">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-fern-600" />
            <span className="size-2.5 rounded-full bg-dry-sage-500" />
            <span className="size-2.5 rounded-full bg-hunter-green-500" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-dry-sage-600">
            Gestão de carteiras
          </span>
        </div>

        <div className="rounded-[1.35rem] border border-pine-teal-400 bg-pine-teal-200/70 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-dry-sage-600">
                Carteira relacionamento
              </p>
              <h2 className="mt-2 text-xl font-black sm:text-2xl">Clientes ativos</h2>
            </div>
            <span className="flex size-11 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100">
              <BriefcaseBusiness className="size-5" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {owners.map((owner, index) => (
              <div
                key={owner.name}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-pine-teal-400 bg-pine-teal-100/75 p-3.5"
              >
                <span className={`flex size-10 items-center justify-center rounded-full text-xs font-black text-pine-teal-100 ${index === 0 ? "bg-dry-sage-500" : index === 1 ? "bg-fern-600" : "bg-fern-700"}`}>
                  {owner.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">{owner.name}</p>
                  <p className="truncate text-xs text-dry-sage-700">{owner.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black">{owner.clients}</p>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-dry-sage-700">clientes</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-pine-teal-400 bg-pine-teal-100/55 p-3">
              <p className="text-2xl font-black">113</p>
              <p className="mt-1 text-xs text-dry-sage-700">Contatos distribuídos</p>
            </div>
            <div className="rounded-xl border border-pine-teal-400 bg-pine-teal-100/55 p-3">
              <p className="text-2xl font-black">100%</p>
              <p className="mt-1 text-xs text-dry-sage-700">Com responsável</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatIsPortfolio() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="what-is-title">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-20 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Organização estratégica
          </p>
          <h2
            id="what-is-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            O que é carteirização?
          </h2>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
          <p className="text-pretty text-lg font-semibold leading-8 text-foreground sm:text-xl">
            É a forma de organizar e distribuir contatos estrategicamente entre os membros da sua equipe.
          </p>
          <p className="mt-5 leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Na NovoCode, você cria carteiras personalizadas e atribui clientes a
            usuários ou equipes. Assim, cada relacionamento tem responsáveis
            claros, histórico disponível e acompanhamento consistente.
          </p>
          <button
            type="button"
            data-plan="Carteirização"
            className="h-widget-trigger mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Entender para minha operação
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="border-y border-border bg-surface/55 py-20 sm:py-24" aria-labelledby="benefits-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Benefícios na rotina
          </p>
          <h2 id="benefits-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            Mais foco, clareza e produtividade
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-fern-700 hover:shadow-xl sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-10 text-xl font-black text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="cases-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">Aplicações práticas</p>
          <h2 id="cases-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            Uma estrutura que acompanha diferentes operações
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {useCases.map(({ title, description, icon: Icon }) => (
            <article key={title} className="grid gap-5 bg-background p-6 sm:grid-cols-[auto_1fr] sm:p-8">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-black text-foreground">{title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioTypes() {
  return (
    <section className="border-y border-pine-teal-400 bg-pine-teal-100 py-20 text-white sm:py-24" aria-labelledby="types-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Tipos de carteira</p>
          <h2 id="types-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Escolha como cada cliente será acompanhado
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {portfolioTypes.map(({ title, tag, description, highlights, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-pine-teal-400 bg-pine-teal-200/70 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-pine-teal-400 bg-pine-teal-100/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-dry-sage-600">
                  {tag}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-7 text-dry-sage-700">{description}</p>
              <ul className="mt-7 space-y-3 border-t border-pine-teal-400 pt-6">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-sm font-semibold text-dry-sage-700">
                    <Check className="size-4 text-dry-sage-500" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductIntegration() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="integration-title">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">Contexto preservado</p>
          <h2 id="integration-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            O responsável certo em cada conversa
          </h2>
          <p className="mt-6 text-pretty leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            A carteirização trabalha junto da central de atendimento. Sua equipe identifica clientes, responsáveis, etiquetas e histórico antes mesmo de responder.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-black text-foreground">
            <ShieldCheck className="size-5 text-fern-500 dark:text-dry-sage-500" aria-hidden="true" />
            Continuidade sem perder informações
          </div>
        </div>

        <ProductFrame />
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-pine-teal-400 bg-pine-teal-200 px-6 py-12 text-center text-white shadow-2xl shadow-pine-teal-100/20 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-fern-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100">
            <BriefcaseBusiness className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Dê continuidade a cada relacionamento
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-700 sm:text-lg">
            Converse com nosso time e descubra como organizar suas carteiras na NovoCode.
          </p>
          <button
            type="button"
            data-plan="Carteirização"
            className="h-widget-trigger mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dry-sage-500 px-7 py-3 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-dry-sage-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Falar com especialista
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductFrame() {
  return (
    <div className="relative mx-auto w-full">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-linear-to-r from-dry-sage-500/25 via-fern-500/12 to-hunter-green-500/20 blur-2xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-2xl shadow-pine-teal-100/15 sm:rounded-[1.75rem] sm:p-2.5 dark:shadow-black/30">
        <div className="flex items-center gap-1.5 px-2 pb-2 pt-0.5 sm:px-3 sm:pb-3">
          <span className="size-2.5 rounded-full bg-fern-700 sm:size-3" />
          <span className="size-2.5 rounded-full bg-dry-sage-500 sm:size-3" />
          <span className="size-2.5 rounded-full bg-hunter-green-500 sm:size-3" />
          <span className="ml-2 truncate text-[10px] font-medium text-muted-foreground sm:text-xs">Central de atendimento NovoCode</span>
        </div>
        <Image
          src={atendimentoImage}
          alt="Central de atendimento NovoCode com contatos, responsáveis e etiquetas de relacionamento"
          sizes="(max-width: 1024px) calc(100vw - 32px), 760px"
          className="h-auto w-full rounded-xl border border-border bg-white sm:rounded-2xl"
        />
      </div>
    </div>
  );
}
