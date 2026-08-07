import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CircleDot,
  Gauge,
  HeartHandshake,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  WandSparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const stats = [
  { value: "+50", label: "clientes ativos" },
  { value: "+450", label: "usuários na plataforma" },
  { value: "+130 mi", label: "mensagens por ano" },
  { value: "+1 ano", label: "de trajetória" },
];

const values: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  index: string;
}> = [
  {
    title: "Foco no cliente",
    description:
      "Cada decisão é guiada pelo impacto real que gera para quem usa nossa plataforma todos os dias.",
    icon: Target,
    index: "01",
  },
  {
    title: "Simplicidade",
    description:
      "Tecnologia poderosa não precisa ser complexa. Criamos experiências intuitivas para qualquer equipe.",
    icon: WandSparkles,
    index: "02",
  },
  {
    title: "Confiabilidade",
    description:
      "Infraestrutura robusta, segurança e compromisso com a estabilidade em cada interação.",
    icon: ShieldCheck,
    index: "03",
  },
  {
    title: "Inovação contínua",
    description:
      "Evoluímos com IA, automação e novas integrações para acompanhar o crescimento dos nossos clientes.",
    icon: Rocket,
    index: "04",
  },
];

const capabilities = [
  { label: "Atendimento humano", icon: HeartHandshake },
  { label: "Agentes de IA", icon: Bot },
  { label: "Automações inteligentes", icon: Workflow },
];

export default function AboutShowcase() {
  return (
    <div className="overflow-hidden bg-background">
      <Hero />
      <Stats />
      <Purpose />
      <Values />
      <CallToAction />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative isolate border-b border-border"
      aria-labelledby="about-title"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-48 top-10 -z-10 size-128 rounded-full bg-fern-500/15 blur-3xl dark:bg-dry-sage-500/8"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-8 -z-10 size-80 rounded-full bg-dry-sage-500/20 blur-3xl dark:bg-fern-500/10"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 shadow-sm backdrop-blur dark:border-pine-teal-400 dark:text-dry-sage-500">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Sobre a NovoCode
          </p>

          <h1
            id="about-title"
            className="max-w-4xl text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl"
          >
            Tecnologia que simplifica.{" "}
            <span className="text-fern-500 dark:text-dry-sage-500">
              Resultados que transformam.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Somos uma empresa brasileira de tecnologia especializada em
            soluções digitais para atendimento, automação e gestão de
            relacionamento com o cliente.
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-base font-semibold leading-7 text-foreground sm:text-lg">
            Acreditamos que tecnologia só tem valor quando resolve problemas
            reais — com simplicidade, eficiência e qualidade.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/precos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg shadow-hunter-green-500/20 transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Conhecer os planos
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              data-plan="Conhecer a NovoCode"
              className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground backdrop-blur transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Conversar com especialista
              <MessageCircle className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <OperationsPanel />
      </div>
    </section>
  );
}

function OperationsPanel() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:mx-0">
      <div
        className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-linear-to-br from-dry-sage-500/30 via-fern-500/12 to-hunter-green-500/20 blur-2xl"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-pine-teal-400 bg-pine-teal-100 p-3 text-dust-grey-900 shadow-2xl shadow-pine-teal-100/25 dark:border-pine-teal-300 dark:bg-pine-teal-100">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-fern-600" />
            <span className="size-2.5 rounded-full bg-dry-sage-500" />
            <span className="size-2.5 rounded-full bg-hunter-green-500" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-dry-sage-600">
            Operação conectada
          </span>
        </div>

        <div className="rounded-[1.35rem] border border-pine-teal-400 bg-pine-teal-200/70 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-dry-sage-600">
                Central NovoCode
              </p>
              <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Pessoas e tecnologia no mesmo fluxo
              </h2>
            </div>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100 shadow-lg">
              <Gauge className="size-5" aria-hidden="true" />
            </span>
          </div>

          <div className="relative my-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="rounded-2xl border border-pine-teal-400 bg-pine-teal-100/80 p-4">
              <UsersRound className="size-5 text-dry-sage-500" aria-hidden="true" />
              <p className="mt-5 text-xs text-dry-sage-700">Sua equipe</p>
              <p className="mt-1 text-sm font-black text-white">Mais produtiva</p>
            </div>
            <div className="relative flex size-12 items-center justify-center rounded-full border border-dry-sage-500/40 bg-dry-sage-500/15 text-dry-sage-500">
              <CircleDot className="size-5" aria-hidden="true" />
              <span className="absolute inset-x-full h-px bg-pine-teal-400" />
              <span className="absolute right-full h-px w-3 bg-pine-teal-400" />
            </div>
            <div className="rounded-2xl border border-pine-teal-400 bg-pine-teal-100/80 p-4">
              <MessageCircle className="size-5 text-dry-sage-500" aria-hidden="true" />
              <p className="mt-5 text-xs text-dry-sage-700">Seus clientes</p>
              <p className="mt-1 text-sm font-black text-white">Mais próximos</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {capabilities.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border border-pine-teal-400 bg-pine-teal-100/60 px-3 py-3 text-xs font-bold text-dust-grey-700"
              >
                <Icon className="size-4 shrink-0 text-dry-sage-500" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="border-b border-border bg-surface/60" aria-label="NovoCode em números">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`py-8 sm:py-10 lg:px-8 ${index % 2 === 1 ? "border-l border-border" : ""} ${index > 1 ? "border-t border-border lg:border-t-0" : ""} ${index > 0 ? "lg:border-l lg:border-border" : "lg:border-l-0"}`}
          >
            <p className="text-3xl font-black tracking-[-0.04em] text-fern-500 dark:text-dry-sage-500 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32" aria-labelledby="purpose-title">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Nosso propósito
          </p>
          <h2
            id="purpose-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Tirar a complexidade do caminho de quem quer crescer.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
              <Target className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-8 text-xl font-black text-foreground">Por que existimos</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              Para tornar operações de atendimento mais ágeis, inteligentes e
              humanas, dando às equipes clareza para cuidar de cada conversa.
            </p>
          </article>

          <article className="rounded-3xl border border-pine-teal-400 bg-pine-teal-200 p-6 text-white shadow-xl shadow-pine-teal-100/15 sm:p-8 dark:bg-pine-teal-200">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100">
              <Workflow className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-8 text-xl font-black">Como fazemos</h3>
            <p className="mt-3 leading-7 text-dry-sage-700">
              Unimos atendimento, CRM, automação e inteligência artificial em
              uma experiência simples, integrada e pronta para escalar.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="border-y border-border bg-surface/55 py-20 sm:py-24" aria-labelledby="values-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            O que nos orienta
          </p>
          <h2
            id="values-title"
            className="mt-4 text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Valores que aparecem no produto e no relacionamento.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {values.map(({ title, description, icon: Icon, index }) => (
            <article
              key={title}
              className="group relative min-h-72 overflow-hidden rounded-3xl border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-fern-700 hover:shadow-xl sm:p-7"
            >
              <span className="absolute right-5 top-4 font-mono text-5xl font-black text-surface-muted transition-colors group-hover:text-fern-900 dark:group-hover:text-pine-teal-300">
                {index}
              </span>
              <span className="relative flex size-12 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="relative mt-16 text-xl font-black text-foreground">{title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-pine-teal-400 bg-pine-teal-100 px-6 py-12 text-center text-white shadow-2xl shadow-pine-teal-100/20 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-fern-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-12 size-80 rounded-full bg-dry-sage-500/18 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Pronto para transformar o seu atendimento?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-700 sm:text-lg">
            Descubra como a NovoCode pode conectar sua equipe, organizar suas
            conversas e impulsionar o crescimento do seu negócio.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/precos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dry-sage-500 px-6 py-3 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-dry-sage-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Ver planos e preços
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              data-plan="Conhecer a NovoCode"
              className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-pine-teal-500 bg-pine-teal-200/60 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-pine-teal-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Falar com consultor
              <MessageCircle className="size-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-dry-sage-600">
            <Check className="size-4" aria-hidden="true" />
            Atendimento personalizado para sua operação
          </p>
        </div>
      </div>
    </section>
  );
}
