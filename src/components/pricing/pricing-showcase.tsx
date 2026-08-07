"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Camera,
  Check,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Minus,
  Settings2,
  Sparkles,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { buildWidgetPlanContextUrl } from "@/lib/widget-plan-context";

const plans = [
  {
    name: "Essencial",
    price: 657,
    description: "Ideal para começar com automação básica.",
    users: 3,
    whatsapp: 1,
    instagram: 0,
    messenger: 0,
    chatbotAtendimento: 2,
    chatbotAutomacao: 1,
    paineis: 1,
    sequencias: 1,
    apps: ["Sequências"],
    resources: [] as string[],
  },
  {
    name: "Pro",
    price: 987,
    description: "Para equipes que precisam de CRM e automação avançada.",
    users: 5,
    whatsapp: 1,
    instagram: 0,
    messenger: 0,
    chatbotAtendimento: 3,
    chatbotAutomacao: 2,
    paineis: 2,
    sequencias: 2,
    apps: ["Campanhas", "Chat interno", "CRM", "Sequências"],
    resources: ["Campos personalizados"],
  },
  {
    name: "Plus+",
    price: 1387,
    description: "O mais completo para times em crescimento.",
    users: 10,
    whatsapp: 1,
    instagram: 1,
    messenger: 1,
    chatbotAtendimento: 5,
    chatbotAutomacao: 2,
    paineis: 5,
    sequencias: 2,
    apps: [
      "Campanhas",
      "Chat interno",
      "CRM",
      "Sequências",
      "Classificação de atendimento",
      "Distribuição de atendimentos",
      "Mensagens agendadas",
      "Tempo de segurança",
    ],
    resources: ["Campos personalizados", "Webhooks & API"],
    popular: true,
  },
  {
    name: "Advanced",
    price: 2007,
    description: "Máxima escala com todos os recursos disponíveis.",
    users: 20,
    whatsapp: 1,
    instagram: 1,
    messenger: 1,
    chatbotAtendimento: 10,
    chatbotAutomacao: 4,
    paineis: 10,
    sequencias: 4,
    apps: [
      "Campanhas",
      "Chat interno",
      "CRM",
      "Grupos",
      "Sequências",
      "Classificação de atendimento",
      "Distribuição de atendimentos",
      "Mensagens agendadas",
      "Tempo de segurança",
    ],
    resources: ["Campos personalizados", "Webhooks & API"],
  },
  {
    name: "Personalizado",
    price: null,
    description: "Tudo do Advanced mais recursos sob medida para o seu negócio.",
    users: null,
    whatsapp: null,
    instagram: null,
    messenger: null,
    chatbotAtendimento: null,
    chatbotAutomacao: null,
    paineis: null,
    sequencias: null,
    apps: ["Todos os apps disponíveis"],
    resources: ["Campos personalizados", "Webhooks & API", "Suporte dedicado"],
  },
] as const;

type Plan = (typeof plans)[number];

const capacityRows = [
  { label: "Usuários", key: "users" },
  { label: "WhatsApp", key: "whatsapp" },
  { label: "Instagram", key: "instagram" },
  { label: "Messenger", key: "messenger" },
  { label: "Chatbots de atendimento", key: "chatbotAtendimento" },
  { label: "Chatbots de automação", key: "chatbotAutomacao" },
  { label: "Painéis", key: "paineis" },
  { label: "Sequências", key: "sequencias" },
] as const;

const appRows = [
  "Campanhas",
  "Chat interno",
  "CRM",
  "Grupos",
  "Sequências",
  "Classificação de atendimento",
  "Distribuição de atendimentos",
  "Mensagens agendadas",
  "Tempo de segurança",
] as const;

const resourceRows = ["Campos personalizados", "Webhooks & API", "Suporte dedicado"] as const;

const metrics = [
  { label: "Usuários", key: "users", icon: UsersRound },
  { label: "WhatsApp", key: "whatsapp", icon: MessageCircle, suffix: "canal" },
  { label: "Instagram", key: "instagram", icon: Camera, suffix: "canal" },
  { label: "Messenger", key: "messenger", icon: Mail, suffix: "canal" },
  { label: "Chatbots atendimento", key: "chatbotAtendimento", icon: Bot },
  { label: "Chatbots automação", key: "chatbotAutomacao", icon: Settings2 },
  { label: "Painéis", key: "paineis", icon: LayoutDashboard },
  { label: "Sequências", key: "sequencias", icon: Workflow },
] as const;

export default function PricingShowcase() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollPlans = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>("[data-plan-card]");

    if (!carousel || !firstCard) return;

    carousel.scrollBy({
      left: direction * (firstCard.offsetWidth + 12),
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="relative isolate overflow-hidden pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-120 bg-linear-to-b from-dry-sage-900 via-fern-900/45 to-transparent dark:from-hunter-green-200 dark:via-pine-teal-100/35"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 top-32 -z-10 size-96 rounded-full bg-dry-sage-500/20 blur-3xl dark:bg-fern-500/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-40 top-52 -z-10 size-96 rounded-full bg-fern-500/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent shadow-sm backdrop-blur">
              <Sparkles className="size-4" aria-hidden="true" />
              Planos flexíveis para cada fase
            </p>
            <h1 className="mt-6 text-balance text-4xl font-black tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
              Escolha a estrutura certa para{" "}
              <span className="text-fern-500 dark:text-dry-sage-500">crescer sem limites</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Centralize atendimento, CRM e automações em um plano que acompanha o ritmo da sua operação.
            </p>
          </div>

          <div className="mt-12">
            <div
              ref={carouselRef}
              className="flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto pb-5 scroll-smooth [scrollbar-color:var(--accent)_transparent] [scrollbar-width:thin]"
              aria-label="Carrossel de planos"
            >
              {plans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 xl:hidden">
              <p className="text-xs font-semibold text-muted-foreground">
                Deslize para comparar todos os planos
              </p>
              <div className="flex gap-2">
                <CarouselButton label="Planos anteriores" onClick={() => scrollPlans(-1)}>
                  <ArrowLeft className="size-5" aria-hidden="true" />
                </CarouselButton>
                <CarouselButton label="Próximos planos" onClick={() => scrollPlans(1)}>
                  <ArrowRight className="size-5" aria-hidden="true" />
                </CarouselButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ComparisonTable />
    </>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const isCustom = plan.price === null;
  const isPopular = "popular" in plan && plan.popular;

  return (
    <article
      data-plan-card
      className={
        "relative flex min-h-178 w-[86vw] max-w-88 shrink-0 snap-center flex-col overflow-hidden rounded-2xl border bg-pine-teal-100 text-dust-grey-900 shadow-xl transition sm:w-84 lg:w-[calc((100%-1.5rem)/3)] lg:max-w-none xl:w-[calc((100%-3rem)/5)] " +
        (isPopular
          ? "border-dry-sage-500 ring-2 ring-dry-sage-500/80 shadow-dry-sage-500/15"
          : "border-pine-teal-300")
      }
    >
      <div className="min-h-38 border-b border-pine-teal-300 px-5 py-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className={"text-xl font-black tracking-tight " + (isPopular ? "text-dry-sage-500" : "text-white")}>
            {plan.name}
          </h2>
          {isPopular ? (
            <span className="rounded-full bg-dry-sage-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-pine-teal-100">
              O mais recomendado
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-5 text-dust-grey-600">{plan.description}</p>
      </div>

      <div className="border-b border-pine-teal-300 px-5 py-5">
        {isCustom ? (
          <p className="text-2xl font-black text-dry-sage-500">Sob consulta</p>
        ) : (
          <div className="flex items-end gap-1.5">
            <span className="pb-1 text-sm text-dust-grey-600">R$</span>
            <span className="text-4xl font-black tracking-[-0.05em] text-white">
              {plan.price.toLocaleString("pt-BR")}
            </span>
            <span className="pb-1 text-sm text-dust-grey-600">/mês</span>
          </div>
        )}
      </div>

      {isCustom ? (
        <div className="flex flex-1 flex-col px-5 py-6">
          <FeatureColumn title="Apps inclusos" items={plan.apps} />
          <div className="mt-7">
            <FeatureColumn title="Recursos extras" items={plan.resources} />
          </div>
          <PlanButton planName={plan.name} custom className="mt-auto" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-1.5 border-b border-pine-teal-300 p-3">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.key}
                icon={metric.icon}
                label={metric.label}
                value={plan[metric.key]}
                suffix={"suffix" in metric ? metric.suffix : undefined}
              />
            ))}
          </div>

          <div className="flex flex-1 flex-col px-4 py-5">
            <div className={"grid gap-5 " + (plan.resources.length ? "grid-cols-2" : "grid-cols-1")}>
              <FeatureColumn title="Apps inclusos" items={plan.apps} />
              {plan.resources.length ? (
                <FeatureColumn title="Recursos extras" items={plan.resources} />
              ) : null}
            </div>
            <PlanButton planName={plan.name} className="mt-auto pt-7" />
          </div>
        </>
      )}
    </article>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="min-h-24 rounded-lg border border-pine-teal-300 bg-pine-teal-200/55 p-3">
      <Icon className="size-4 text-dry-sage-500" aria-hidden="true" />
      <p className="mt-2 text-[9px] font-bold uppercase leading-3 tracking-wide text-dust-grey-600">
        {label}
      </p>
      <p className="mt-1 text-lg font-black text-white">
        {value}
        {suffix ? <span className="ml-1 text-xs font-semibold text-dust-grey-600">{suffix}</span> : null}
      </p>
    </div>
  );
}

function FeatureColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="text-[10px] font-black uppercase tracking-[0.12em] text-dust-grey-600">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-xs leading-4 text-dust-grey-700">
            <Check className="mt-0.5 size-3.5 shrink-0 text-dry-sage-500" strokeWidth={3} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanButton({
  planName,
  custom = false,
  className = "",
}: {
  planName: string;
  custom?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <button
        type="button"
        data-plan={planName}
        onClickCapture={() => setWidgetPlanContext(planName)}
        className="h-widget-trigger inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-dry-sage-500 px-4 py-2.5 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-dry-sage-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dry-sage-500"
      >
        {custom ? "Falar com consultor" : "Começar agora"}
        <MessageCircle className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </button>
  );
}

function ComparisonTable() {
  return (
    <section
      className="border-y border-border bg-surface-muted py-20 sm:py-24 lg:py-28"
      aria-labelledby="comparison-title"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Compare em detalhes</p>
          <h2
            id="comparison-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Tudo o que você precisa, lado a lado
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Compare capacidades, aplicativos e recursos para encontrar o melhor encaixe para sua equipe.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-background shadow-xl shadow-pine-teal-100/10 dark:shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-255 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-pine-teal-100 text-dust-grey-900">
                  <th className="sticky left-0 z-20 min-w-52 bg-pine-teal-100 px-5 py-6 text-xs font-black uppercase tracking-[0.15em]">
                    Recursos
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="min-w-38 px-4 py-6 text-center">
                      <span className="block text-base font-black">{plan.name}</span>
                      <span className="mt-1 block text-xs font-medium text-dry-sage-600">
                        {plan.price === null
                          ? "Sob consulta"
                          : "R$ " + plan.price.toLocaleString("pt-BR") + "/mês"}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <TableGroup title="Capacidade" />
                {capacityRows.map((row) => (
                  <tr key={row.key} className="border-b border-border/70">
                    <RowLabel>{row.label}</RowLabel>
                    {plans.map((plan) => (
                      <td key={plan.name} className="px-4 py-4 text-center font-bold text-foreground">
                        {plan[row.key] === null ? "Sob medida" : plan[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}

                <TableGroup title="Aplicativos" />
                {appRows.map((app) => (
                  <tr key={app} className="border-b border-border/70">
                    <RowLabel>{app}</RowLabel>
                    {plans.map((plan) => (
                      <Availability
                        key={plan.name}
                        available={isIncluded(plan.apps, app)}
                        custom={plan.price === null}
                      />
                    ))}
                  </tr>
                ))}

                <TableGroup title="Recursos extras" />
                {resourceRows.map((resource) => (
                  <tr key={resource} className="border-b border-border/70 last:border-0">
                    <RowLabel>{resource}</RowLabel>
                    {plans.map((plan) => (
                      <Availability
                        key={plan.name}
                        available={isIncluded(plan.resources, resource)}
                        custom={plan.price === null}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-fern-700/60 bg-fern-900/70 p-6 sm:flex-row sm:p-8 dark:border-pine-teal-400 dark:bg-pine-teal-300/70">
          <div>
            <h3 className="text-xl font-black text-foreground">Ainda está em dúvida?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Nossa equipe ajuda você a dimensionar o plano ideal.
            </p>
          </div>
          <button
            type="button"
            data-plan="Ajuda para escolher um plano"
            onClickCapture={() => setWidgetPlanContext("Ajuda para escolher um plano")}
            className="h-widget-trigger inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground transition hover:-translate-y-0.5 hover:bg-accent sm:w-auto"
          >
            Conversar com especialista
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TableGroup({ title }: { title: string }) {
  return (
    <tr className="border-b border-border bg-surface">
      <th
        colSpan={plans.length + 1}
        className="px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-accent"
      >
        {title}
      </th>
    </tr>
  );
}

function RowLabel({ children }: { children: ReactNode }) {
  return (
    <th className="sticky left-0 z-10 bg-background px-5 py-4 font-semibold text-foreground shadow-[1px_0_0_var(--border)]">
      {children}
    </th>
  );
}

function Availability({ available, custom }: { available: boolean; custom: boolean }) {
  return (
    <td className="px-4 py-4 text-center">
      {available || custom ? (
        <span className="mx-auto flex size-7 items-center justify-center rounded-full bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
          <Check className="size-4" strokeWidth={3} aria-label="Incluído" />
        </span>
      ) : (
        <Minus className="mx-auto size-5 text-border" aria-label="Não incluído" />
      )}
    </td>
  );
}

function isIncluded(items: readonly string[], feature: string) {
  return items.some(
    (item) => item.toLocaleLowerCase("pt-BR") === feature.toLocaleLowerCase("pt-BR"),
  );
}

function setWidgetPlanContext(planName: string) {
  const iframe = document.getElementById("h-widget-iframe");

  if (!(iframe instanceof HTMLIFrameElement) || !iframe.src) return;

  const nextSrc = buildWidgetPlanContextUrl(
    iframe.src,
    planName,
    window.location.href,
  );

  if (iframe.src !== nextSrc) iframe.src = nextSrc;
}
