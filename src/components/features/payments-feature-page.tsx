import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BellRing,
  Check,
  CircleDollarSign,
  CreditCard,
  Link2,
  MessageCircle,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import atendimentoImage from "../../../public/Atendimento.png";

const paymentMethods = [
  { label: "Pix", icon: QrCode },
  { label: "Cartão de crédito", icon: CreditCard },
  { label: "Boleto", icon: ReceiptText },
];

const securityBenefits = [
  {
    title: "Status atualizado na conversa",
    description:
      "Acompanhe a cobrança do envio à confirmação sem depender de consultas manuais ao financeiro.",
    icon: BadgeCheck,
  },
  {
    title: "Confirmação real do recebimento",
    description:
      "Notificações automáticas ajudam sua equipe a confirmar que o valor foi processado antes de concluir a venda.",
    icon: ShieldCheck,
  },
  {
    title: "Alertas onde você estiver",
    description:
      "Mantenha vendedores e gestores informados sobre mudanças importantes no status das cobranças.",
    icon: BellRing,
  },
];

const benefits: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Cobranças dentro da conversa",
    description:
      "Gere uma solicitação de pagamento no mesmo ambiente em que sua equipe atende o cliente.",
    icon: MessageCircle,
  },
  {
    title: "Experiência simples para o cliente",
    description:
      "Ofereça diferentes formas de pagamento e permita que cada pessoa escolha a mais conveniente.",
    icon: Smartphone,
  },
  {
    title: "Acompanhamento em tempo real",
    description:
      "Veja quando a cobrança foi visualizada, processada ou concluída e mantenha o histórico centralizado.",
    icon: CircleDollarSign,
  },
  {
    title: "Mais agilidade para vender",
    description:
      "Aproveite o momento da conversa para avançar a negociação e reduzir etapas até o fechamento.",
    icon: TrendingUp,
  },
];

const setupSteps = [
  {
    number: "01",
    title: "Conecte sua conta",
    description:
      "Vincule sua conta de pagamentos à NovoCode com as credenciais de integração.",
  },
  {
    number: "02",
    title: "Escolha a forma de cobrança",
    description:
      "Defina valor, vencimento e se o cliente pagará por Pix, cartão ou boleto.",
  },
  {
    number: "03",
    title: "Envie e acompanhe",
    description:
      "Compartilhe a cobrança na conversa e receba as atualizações de status automaticamente.",
  },
];

export default function PaymentsFeaturePage() {
  return (
    <main className="overflow-hidden bg-background">
      <Hero />
      <ConversationCheckout />
      <SecurePayments />
      <HowItWorks />
      <Benefits />
      <ProductIntegration />
      <CallToAction />
    </main>
  );
}

function Hero() {
  return (
    <section
      className="relative isolate border-b border-border"
      aria-labelledby="payments-title"
    >
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
            Pagamentos NovoCode
          </p>
          <h1
            id="payments-title"
            className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl"
          >
            Receba pagamentos pelo{" "}
            <span className="text-fern-500 dark:text-dry-sage-500">
              WhatsApp
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Transforme cada atendimento em uma oportunidade de venda. Gere
            cobranças por Pix, cartão ou boleto dentro da central e acompanhe o
            pagamento sem interromper a conversa.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {paymentMethods.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/75 px-3 py-2 text-xs font-bold text-foreground backdrop-blur"
              >
                <Icon className="size-4 text-fern-500 dark:text-dry-sage-500" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              data-plan="Pagamentos"
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
        </div>

        <PaymentConversationMockup />
      </div>
    </section>
  );
}

function PaymentConversationMockup() {
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
            Atendimento + pagamentos
          </span>
        </div>

        <div className="rounded-[1.35rem] border border-pine-teal-400 bg-pine-teal-200/70 p-4 sm:p-6">
          <div className="flex items-center gap-3 border-b border-pine-teal-400 pb-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-dry-sage-500 font-black text-pine-teal-100">
              MC
            </span>
            <div>
              <p className="text-sm font-black">Mariana Costa</p>
              <p className="text-xs text-dry-sage-700">WhatsApp · Em atendimento</p>
            </div>
          </div>

          <div className="space-y-3 py-6">
            <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-pine-teal-100 px-4 py-3 text-sm text-dry-sage-700">
              Perfeito! Como posso realizar o pagamento?
            </div>
            <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-dry-sage-500 px-4 py-3 text-sm font-semibold text-pine-teal-100">
              Você pode escolher Pix, cartão ou boleto. Vou enviar a cobrança por aqui.
            </div>
          </div>

          <div className="rounded-2xl border border-dry-sage-500/40 bg-pine-teal-100 p-4 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-dry-sage-600">
                  Cobrança NovoCode
                </p>
                <p className="mt-2 text-2xl font-black">R$ 497,00</p>
              </div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-fern-500/20 text-dry-sage-500">
                <Banknote className="size-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-pine-teal-400 pt-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-dry-sage-700">
                <span className="size-2 rounded-full bg-dry-sage-500" />
                Aguardando pagamento
              </span>
              <span className="rounded-full bg-dry-sage-500 px-3 py-1.5 text-xs font-black text-pine-teal-100">
                Pagar agora
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationCheckout() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="checkout-title">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Ponto de venda conversacional
          </p>
          <h2
            id="checkout-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Transforme o WhatsApp em um canal de vendas completo
          </h2>
          <p className="mt-6 text-pretty leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Aproveite o momento em que o cliente já está conversando com sua
            equipe para enviar a cobrança. Menos etapas, menos distrações e uma
            experiência mais direta até a confirmação.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Sem maquininhas ou formulários separados",
              "Cobrança vinculada ao histórico do atendimento",
              "Múltiplas formas de pagamento na mesma jornada",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ProductFrame />
      </div>
    </section>
  );
}

function SecurePayments() {
  return (
    <section className="border-y border-border bg-surface/55 py-20 sm:py-24" aria-labelledby="security-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Segurança e agilidade
          </p>
          <h2
            id="security-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Controle para sua equipe. Confiança para seus clientes.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty leading-7 text-muted-foreground sm:text-lg">
            Acompanhe cada atualização da cobrança e mantenha o processo de venda visível do início ao fim.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {securityBenefits.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-fern-700 hover:shadow-xl sm:p-8"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-fern-900 text-fern-500 dark:bg-pine-teal-300 dark:text-dry-sage-500">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-8 text-xl font-black text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="steps-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
              Configuração simples
            </p>
            <h2
              id="steps-title"
              className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
            >
              Comece a receber em três passos
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground sm:text-lg">
              Conecte sua conta de pagamentos e deixe a NovoCode centralizar o envio e o acompanhamento das cobranças.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border">
            {setupSteps.map(({ number, title, description }) => (
              <article key={number} className="grid gap-4 bg-background p-6 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-8">
                <span className="font-mono text-3xl font-black text-fern-700 dark:text-dry-sage-700">{number}</span>
                <div>
                  <h3 className="text-xl font-black text-foreground">{title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="border-y border-pine-teal-400 bg-pine-teal-100 py-20 text-white sm:py-24" aria-labelledby="benefits-title">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">
            Benefícios da integração
          </p>
          <h2 id="benefits-title" className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Da conversa ao pagamento, sem perder o ritmo
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-pine-teal-400 bg-pine-teal-400 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
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

function ProductIntegration() {
  return (
    <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="product-title">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">
            Integrado à central NovoCode
          </p>
          <h2
            id="product-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl"
          >
            Solicite pagamentos sem sair do atendimento
          </h2>
          <p className="mt-6 text-pretty leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            A ação de pagamento fica disponível no mesmo menu usado para enviar
            imagens, documentos, mensagens rápidas e iniciar automações. Sua
            equipe trabalha com uma experiência única e familiar.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-black text-foreground">
            <Link2 className="size-5 text-fern-500 dark:text-dry-sage-500" aria-hidden="true" />
            Pagamento conectado à conversa
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
            <CircleDollarSign className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-6 text-balance text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Comece a vender e receber na mesma conversa
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-700 sm:text-lg">
            Converse com nosso time e veja como integrar pagamentos à sua operação na NovoCode.
          </p>
          <button
            type="button"
            data-plan="Pagamentos"
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
          <span className="ml-2 truncate text-[10px] font-medium text-muted-foreground sm:text-xs">
            Central de atendimento NovoCode
          </span>
        </div>
        <Image
          src={atendimentoImage}
          alt="Central de atendimento NovoCode com a opção de solicitar pagamento dentro da conversa"
          sizes="(max-width: 1024px) calc(100vw - 32px), 760px"
          className="h-auto w-full rounded-xl border border-border bg-white sm:rounded-2xl"
        />
      </div>
    </div>
  );
}
