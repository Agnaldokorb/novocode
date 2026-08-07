import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  Check,
  CheckCheck,
  Clock3,
  Filter,
  Gauge,
  MessageCircle,
  MessagesSquare,
  MousePointerClick,
  Send,
  Sparkles,
  Tags,
  Target,
  UsersRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import atendimentoImage from "../../../public/Atendimento.png";

const campaignPillars = [
  {
    number: "01",
    title: "Campanhas para públicos segmentados",
    description:
      "Combine etiquetas, campos personalizados e informações do CRM para falar com as pessoas certas em cada campanha.",
    icon: Filter,
  },
  {
    number: "02",
    title: "Modelos e automações",
    description:
      "Use mensagens aprovadas, conteúdos personalizados e chatbots para iniciar jornadas que continuam depois do envio.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Controle sobre cada disparo",
    description:
      "Defina data, horário, ritmo de envio, equipe responsável e regras para contatos que já estão em atendimento.",
    icon: CalendarClock,
  },
];

const strategyTips = [
  {
    title: "Comece com um objetivo claro",
    description:
      "Determine se a campanha deve gerar vendas, reativar clientes, divulgar uma novidade ou conduzir para outra etapa da jornada.",
    icon: Target,
  },
  {
    title: "Segmente sua base",
    description:
      "Agrupe contatos por perfil, interesse, etapa do funil ou histórico para aumentar a relevância de cada mensagem.",
    icon: Tags,
  },
  {
    title: "Entregue conteúdo relevante",
    description:
      "Crie mensagens úteis e objetivas, com contexto, benefício evidente e uma ação simples para o contato realizar.",
    icon: WandSparkles,
  },
];

const campaignSteps = [
  {
    number: "01",
    title: "Prepare a mensagem",
    description: "Escolha um modelo e personalize o conteúdo da campanha.",
  },
  {
    number: "02",
    title: "Selecione o público",
    description: "Aplique filtros e defina exatamente quem deve receber.",
  },
  {
    number: "03",
    title: "Programe o envio",
    description: "Envie imediatamente ou escolha data, horário e ritmo.",
  },
  {
    number: "04",
    title: "Acompanhe o resultado",
    description: "Monitore entregas, leituras, respostas e conversões.",
  },
];

const metrics: Array<{
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
}> = [
  { label: "Enviadas", value: "4.820", helper: "Base selecionada", icon: Send },
  { label: "Entregues", value: "4.706", helper: "97,6% da campanha", icon: Check },
  { label: "Lidas", value: "4.134", helper: "87,8% das entregues", icon: CheckCheck },
  { label: "Respostas", value: "836", helper: "20,2% das leituras", icon: MessagesSquare },
];

export default function CampaignsFeaturePage() {
  return (
    <main className="overflow-hidden bg-background">
      <Hero />
      <ConversionPillars />
      <Strategy />
      <BuildCampaign />
      <Results />
      <ProductIntegration />
      <CallToAction />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate border-b border-border" aria-labelledby="campaigns-title">
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
            Campanhas NovoCode
          </p>
          <h1
            id="campaigns-title"
            className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl"
          >
            Disparo de mensagens pelo{" "}
            <span className="text-fern-500 dark:text-dry-sage-500">WhatsApp</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Crie campanhas personalizadas com base em interesses, comportamento,
            etapas do funil e histórico de relacionamento. Envie com controle e
            acompanhe as métricas em um só lugar.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              data-plan="Disparo de Campanhas"
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
              "Segmentação avançada",
              "Envio programado",
              "Modelos personalizados",
              "Métricas em tempo real",
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

        <CampaignMockup />
      </div>
    </section>
  );
}

function CampaignMockup() {
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
            Campanha ativa
          </span>
        </div>

        <div className="rounded-[1.35rem] border border-pine-teal-400 bg-pine-teal-200/70 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-dry-sage-600">
                Reativação de clientes
              </p>
              <h2 className="mt-2 text-xl font-black sm:text-2xl">Campanha de agosto</h2>
            </div>
            <span className="rounded-full bg-dry-sage-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-pine-teal-100">
              Enviando
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-pine-teal-400 bg-pine-teal-100/75 p-4">
            <div className="flex items-center justify-between text-xs text-dry-sage-700">
              <span>Progresso do envio</span>
              <span className="font-black text-white">72%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-pine-teal-400">
              <div className="h-full w-[72%] rounded-full bg-dry-sage-500" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-pine-teal-200/80 p-3">
                <UsersRound className="size-4 text-dry-sage-500" aria-hidden="true" />
                <p className="mt-3 text-2xl font-black">4.820</p>
                <p className="text-xs text-dry-sage-700">Contatos</p>
              </div>
              <div className="rounded-xl bg-pine-teal-200/80 p-3">
                <Clock3 className="size-4 text-dry-sage-500" aria-hidden="true" />
                <p className="mt-3 text-2xl font-black">14:30</p>
                <p className="text-xs text-dry-sage-700">Conclusão estimada</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["Entregues", "3.414"],
              ["Lidas", "3.002"],
              ["Respostas", "584"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-pine-teal-400 bg-pine-teal-100/55 p-3">
                <p className="text-lg font-black">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-dry-sage-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversionPillars() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="conversion-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Campanhas com estratégia
          </p>
          <h2
            id="conversion-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Faça do WhatsApp um canal de conversão
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty leading-7 text-muted-foreground sm:text-lg">
            Planeje cada envio com público, conteúdo e ritmo definidos para sua operação.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {campaignPillars.map(({ number, title, description, icon: Icon }) => (
            <article
              key={number}
              className="group rounded-3xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-fern-700 hover:shadow-xl sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-3xl font-black text-border">{number}</span>
              </div>
              <h3 className="mt-10 text-xl font-black text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strategy() {
  return (
    <section className="border-y border-border bg-surface/55 py-20 sm:py-24" aria-labelledby="strategy-title">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Campanhas que geram resultado
          </p>
          <h2
            id="strategy-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Relevância antes de volume
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground sm:text-lg">
            Uma boa campanha começa muito antes do disparo. Construa mensagens úteis para públicos bem definidos.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border">
          {strategyTips.map(({ title, description, icon: Icon }) => (
            <article key={title} className="grid gap-4 bg-background p-6 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8">
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

function BuildCampaign() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="build-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Fluxo simples
          </p>
          <h2 id="build-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            Monte e envie campanhas em minutos
          </h2>
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {campaignSteps.map(({ number, title, description }) => (
            <article key={number} className="rounded-3xl border border-border bg-surface p-6 sm:p-7">
              <span className="font-mono text-3xl font-black text-fern-700 dark:text-dry-sage-700">{number}</span>
              <h3 className="mt-10 text-xl font-black text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="border-y border-pine-teal-400 bg-pine-teal-100 py-20 text-white sm:py-24" aria-labelledby="results-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Métricas da campanha</p>
            <h2 id="results-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">
              Acompanhe o resultado enquanto acontece
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-pine-teal-400 bg-pine-teal-200/65 px-4 py-2 text-xs font-bold text-dry-sage-600 lg:self-auto">
            <span className="size-2 rounded-full bg-dry-sage-500" />
            Dados atualizados em tempo real
          </span>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-pine-teal-400 bg-pine-teal-400 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ label, value, helper, icon: Icon }) => (
            <article key={label} className="bg-pine-teal-100 p-6 sm:p-8">
              <Icon className="size-5 text-dry-sage-500" aria-hidden="true" />
              <p className="mt-8 text-4xl font-black tracking-[-0.04em]">{value}</p>
              <h3 className="mt-2 font-black">{label}</h3>
              <p className="mt-2 text-xs text-dry-sage-700">{helper}</p>
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
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">Campanha e atendimento</p>
          <h2 id="integration-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            Continue a conversa depois do disparo
          </h2>
          <p className="mt-6 text-pretty leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Quando um contato responde, sua equipe recebe o atendimento com o histórico da campanha, os dados do CRM e o contexto necessário para avançar.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-black text-foreground">
            <Gauge className="size-5 text-fern-500 dark:text-dry-sage-500" aria-hidden="true" />
            Marketing e atendimento no mesmo fluxo
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
            <MousePointerClick className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Crie campanhas mais relevantes e mensuráveis
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-700 sm:text-lg">
            Converse com nosso time e descubra como ativar sua base com a NovoCode.
          </p>
          <button
            type="button"
            data-plan="Disparo de Campanhas"
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
          alt="Central de atendimento NovoCode recebendo respostas de campanhas do WhatsApp"
          sizes="(max-width: 1024px) calc(100vw - 32px), 760px"
          className="h-auto w-full rounded-xl border border-border bg-white sm:rounded-2xl"
        />
      </div>
    </div>
  );
}
