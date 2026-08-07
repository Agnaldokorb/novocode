import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CircleDollarSign,
  Clock3,
  Columns3,
  MessageCircle,
  MessagesSquare,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
  WandSparkles,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import atendimentoImage from "../../../public/Atendimento.png";
import crmIllustration from "../../../public/crm-card.png";
import funnelImage from "../../../public/funil-vendas.png";

const panelBenefits = [
  {
    number: "01",
    title: "Funis organizados por etapa",
    description:
      "Estruture processos comerciais do primeiro contato ao pós-venda e identifique rapidamente onde cada oportunidade está.",
    icon: Columns3,
  },
  {
    number: "02",
    title: "Conversas prioritárias em destaque",
    description:
      "Visualize contatos que precisam de resposta, distribua atendimentos e mantenha sua equipe focada no que exige ação.",
    icon: MessagesSquare,
  },
  {
    number: "03",
    title: "Atualizações para toda a equipe",
    description:
      "Acompanhe mudanças no funil, negociações e responsáveis em um ambiente compartilhado e sempre atualizado.",
    icon: UsersRound,
  },
];

const journey = [
  {
    title: "Pelo chatbot",
    description:
      "Qualifique contatos, colete informações e encaminhe cada oportunidade com todo o contexto da conversa.",
    href: "/funcionalidades/chatbot",
    icon: Workflow,
  },
  {
    title: "Com agentes de IA",
    description:
      "Automatize respostas, consultas e atualizações do CRM sem perder a continuidade do atendimento.",
    href: "/funcionalidades/agentes-de-ia",
    icon: Bot,
  },
  {
    title: "Dentro da conversa",
    description:
      "Crie oportunidades e consulte dados comerciais diretamente da central de atendimento da NovoCode.",
    href: "/funcionalidades/atendimento",
    icon: MessageCircle,
  },
  {
    title: "No painel do CRM",
    description:
      "Personalize etapas, responsáveis e campos para representar o processo real da sua operação.",
    href: "/funcionalidades/crm",
    icon: Columns3,
  },
];

const resources: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Etapas e campos personalizados",
    description:
      "Configure funis e informações de acordo com o contexto de cada operação comercial.",
    icon: SlidersHorizontal,
  },
  {
    title: "Oportunidades nas conversas",
    description:
      "Transforme um atendimento em negócio sem alternar entre ferramentas ou perder o histórico.",
    icon: MessageCircle,
  },
  {
    title: "Mensagens agendadas",
    description:
      "Programe retornos personalizados com data e hora para manter o relacionamento ativo.",
    icon: Clock3,
  },
  {
    title: "Jornadas conectadas por API",
    description:
      "Use movimentações do funil como gatilhos para integrações e automações avançadas.",
    icon: Webhook,
  },
  {
    title: "Ações inteligentes",
    description:
      "Permita que agentes de IA criem e atualizem oportunidades durante jornadas automatizadas.",
    icon: WandSparkles,
  },
  {
    title: "Visão comercial completa",
    description:
      "Acompanhe valores, responsáveis, prazos e evolução das negociações em um único painel.",
    icon: CircleDollarSign,
  },
];

const questions = [
  {
    question: "Preciso usar várias ferramentas para gerenciar conversas e leads?",
    answer:
      "Não. A NovoCode reúne atendimento, qualificação, CRM e automações no mesmo ambiente, reduzindo trocas de tela e informações espalhadas.",
  },
  {
    question: "Como o CRM se conecta ao atendimento pelo WhatsApp?",
    answer:
      "A oportunidade nasce vinculada à conversa. Sua equipe acessa histórico, dados do contato e etapa do negócio diretamente na central de atendimento.",
  },
  {
    question: "É possível automatizar processos sem perder o contato humano?",
    answer:
      "Sim. Chatbots e agentes de IA podem qualificar, atualizar dados e acionar fluxos. Quando necessário, o atendimento segue com uma pessoa e mantém todo o contexto.",
  },
  {
    question: "O funil pode ser adaptado ao processo da minha empresa?",
    answer:
      "Sim. Você define etapas, campos, responsáveis e automações para representar seu processo comercial, do primeiro contato ao pós-venda.",
  },
];

export default function CrmFeaturePage() {
  return (
    <main className="overflow-hidden bg-background">
      <Hero />
      <AdaptivePanels />
      <CustomerJourney />
      <IntegratedExperience />
      <Resources />
      <Faq />
      <CallToAction />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate border-b border-border" aria-labelledby="crm-title">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-16 -z-10 size-112 rounded-full bg-fern-500/16 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 shadow-sm backdrop-blur dark:border-pine-teal-400 dark:text-dry-sage-500">
            <Sparkles className="size-3.5" aria-hidden="true" />
            CRM conversacional NovoCode
          </p>
          <h1
            id="crm-title"
            className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl"
          >
            CRM integrado ao{" "}
            <span className="text-fern-500 dark:text-dry-sage-500">WhatsApp</span>
          </h1>
          <p className="mt-6 text-xl font-black text-foreground sm:text-2xl">
            Transforme conversas em oportunidades reais.
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Conecte contatos, negociações e histórico em uma única plataforma.
            Do primeiro “olá” à fidelização, sua equipe acompanha toda a jornada
            sem sair do atendimento.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              data-plan="CRM"
              className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg shadow-hunter-green-500/20 transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Falar com especialista
              <MessageCircle className="size-4" aria-hidden="true" />
            </button>
            <Link
              href="/precos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground backdrop-blur transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Ver planos
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 text-sm font-semibold text-muted-foreground sm:grid-cols-2">
            {["Funil personalizável", "Histórico centralizado", "Automação integrada", "Gestão em tempo real"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <ProductFrame
          image={funnelImage}
          alt="Painel de CRM da NovoCode com etapas do funil e oportunidades comerciais"
          preload
        />
      </div>
    </section>
  );
}

function AdaptivePanels() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="panels-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Seu processo, sua visão
          </p>
          <h2
            id="panels-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Painéis que se adaptam ao seu negócio
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty leading-7 text-muted-foreground sm:text-lg">
            Organize pré-venda, vendas e pós-venda em funis personalizados.
            Tudo visível para que a equipe saiba exatamente qual é o próximo passo.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {panelBenefits.map(({ number, title, description, icon: Icon }) => (
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

        <div className="mt-8">
          <ProductFrame
            image={funnelImage}
            alt="Funil comercial da NovoCode organizado em colunas personalizadas"
          />
        </div>
      </div>
    </section>
  );
}

function CustomerJourney() {
  return (
    <section className="border-y border-border bg-surface/55 py-20 sm:py-24" aria-labelledby="journey-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Tudo conectado
          </p>
          <h2
            id="journey-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Um CRM presente em toda a jornada
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground sm:text-lg">
            Cada oportunidade permanece ligada à conversa que deu origem ao relacionamento.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {journey.map(({ title, description, href, icon: Icon }) => (
            <article key={title} className="flex min-h-72 flex-col rounded-3xl border border-border bg-background p-6 sm:p-7">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-8 text-xl font-black text-foreground">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-fern-500 transition hover:gap-3 dark:text-dry-sage-500"
              >
                Saiba mais
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegratedExperience() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="integration-title">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Conversas e leads integrados
          </p>
          <h2
            id="integration-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Cada conversa pode se transformar em uma oportunidade.
          </h2>
          <p className="mt-6 text-pretty leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Crie negócios, registre informações e acompanhe cada contato direto
            da central de atendimento. Sua equipe trabalha no mesmo fluxo, com
            contexto completo e sem alternar entre sistemas.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-start gap-4">
              <Image src={crmIllustration} alt="" className="size-20 shrink-0 object-contain" />
              <div>
                <p className="font-black text-foreground">Informação pronta para agir</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Histórico, responsável, etapa e próximos passos disponíveis em um único lugar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ProductFrame
          image={atendimentoImage}
          alt="Central de atendimento NovoCode integrada ao CRM e às conversas do WhatsApp"
        />
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section className="border-y border-border bg-pine-teal-100 py-20 text-white sm:py-24" aria-labelledby="resources-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Recursos principais</p>
          <h2 id="resources-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Ferramentas para organizar e acelerar vendas
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-pine-teal-400 bg-pine-teal-400 md:grid-cols-2 lg:grid-cols-3">
          {resources.map(({ title, description, icon: Icon }) => (
            <article key={title} className="bg-pine-teal-100 p-6 sm:p-8">
              <Icon className="size-6 text-dry-sage-500" aria-hidden="true" />
              <h3 className="mt-8 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-dry-sage-700">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">Dúvidas frequentes</p>
          <h2 id="faq-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">
            Antes de escolher seu CRM
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {questions.map(({ question, answer }, index) => (
            <details key={question} className="group py-1" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-black text-foreground marker:hidden">
                {question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-xl font-medium text-muted-foreground transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-3xl pb-6 pr-12 leading-7 text-muted-foreground">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl border border-pine-teal-400 bg-pine-teal-200 px-6 py-12 text-center text-white shadow-2xl shadow-pine-teal-100/20 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-fern-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Transforme seu WhatsApp em uma operação comercial completa
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-700 sm:text-lg">
            Converse com nosso time e descubra como o CRM da NovoCode se adapta ao seu processo.
          </p>
          <button
            type="button"
            data-plan="CRM"
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

function ProductFrame({
  image,
  alt,
  preload = false,
}: {
  image: typeof funnelImage;
  alt: string;
  preload?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full">
      <div className="absolute -inset-4 -z-10 rounded-4xl bg-linear-to-r from-dry-sage-500/25 via-fern-500/12 to-hunter-green-500/20 blur-2xl" aria-hidden="true" />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-2xl shadow-pine-teal-100/15 sm:rounded-[1.75rem] sm:p-2.5 dark:shadow-black/30">
        <div className="flex items-center gap-1.5 px-2 pb-2 pt-0.5 sm:px-3 sm:pb-3">
          <span className="size-2.5 rounded-full bg-fern-700 sm:size-3" />
          <span className="size-2.5 rounded-full bg-dry-sage-500 sm:size-3" />
          <span className="size-2.5 rounded-full bg-hunter-green-500 sm:size-3" />
          <span className="ml-2 truncate text-[10px] font-medium text-muted-foreground sm:text-xs">NovoCode CRM</span>
        </div>
        <Image
          src={image}
          alt={alt}
          sizes="(max-width: 1024px) calc(100vw - 32px), 720px"
          preload={preload}
          className="h-auto w-full rounded-xl border border-border bg-white sm:rounded-2xl"
        />
      </div>
    </div>
  );
}
