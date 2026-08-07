import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  Clock3,
  CreditCard,
  FileCheck2,
  Filter,
  History,
  MessageCircle,
  PencilLine,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import scheduledMessagesImage from "../../../public/Atendimento_02.png";

const controls: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Criação simples", text: "Escolha contato, modelo, data e horário em poucos passos.", icon: CalendarCheck },
  { title: "Gestão centralizada", text: "Consulte todos os agendamentos e ajuste prazos antes do envio.", icon: PencilLine },
  { title: "Controle por equipe", text: "Cada pessoa visualiza somente os canais e equipes permitidos.", icon: UserRoundCheck },
  { title: "Envio seguro", text: "Mantenha a comunicação alinhada às regras da API Oficial.", icon: ShieldCheck },
  { title: "Histórico completo", text: "Registre envios, entregas e leituras para consulta e auditoria.", icon: History },
  { title: "Filtros inteligentes", text: "Encontre mensagens por contato, status, canal ou responsável.", icon: Filter },
];

const useCases: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Cobranças no tempo certo", text: "Programe lembretes antes e no dia do vencimento para manter o cliente informado.", icon: CreditCard },
  { title: "Follow-ups comerciais", text: "Retome propostas e orçamentos no melhor momento, sem depender da memória da equipe.", icon: Target },
  { title: "Implantação e CS", text: "Agende reuniões, checklists de onboarding e pesquisas durante toda a jornada.", icon: FileCheck2 },
];

const benefits = [
  { title: "Mais tempo produtivo", text: "A equipe acompanha resultados em vez de administrar lembretes manuais." },
  { title: "Melhor experiência", text: "Cada contato recebe a mensagem certa no momento planejado." },
  { title: "Rastreabilidade", text: "Os envios ficam documentados por contato, canal e responsável." },
  { title: "Indicadores reais", text: "Entregas, leituras e respostas viram métricas de desempenho." },
];

export default function ScheduledMessagesFeaturePage() {
  return (
    <main className="overflow-hidden bg-background">
      <Hero />
      <Predictability />
      <Controls />
      <UseCases />
      <Benefits />
      <CallToAction />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate border-b border-border" aria-labelledby="scheduled-title">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-28 top-12 -z-10 size-112 rounded-full bg-fern-500/16 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 dark:text-dry-sage-500">
            <Sparkles className="size-3.5" aria-hidden="true" /> Comunicação no momento ideal
          </p>
          <h1 id="scheduled-title" className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl">
            Mensagens agendadas, <span className="text-fern-500 dark:text-dry-sage-500">resultados previsíveis</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Programe lembretes, confirmações e follow-ups. Você escolhe contato, mensagem, data e hora; a NovoCode envia e registra tudo.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" data-plan="Mensagens Agendadas" className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Falar com especialista <MessageCircle className="size-4" aria-hidden="true" />
            </button>
            <Link href="/precos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              Conhecer os planos <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 text-sm font-semibold text-muted-foreground sm:grid-cols-2">
            {["Data e hora definidas", "Modelos aprovados", "Status de entrega", "Histórico por contato"].map((item) => (
              <li key={item} className="flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-fern-900 text-fern-500"><Check className="size-3" aria-hidden="true" /></span>{item}</li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-fern-500/15 blur-3xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-[1.75rem] border border-pine-teal-400 bg-pine-teal-100 p-2 shadow-2xl">
            <Image src={scheduledMessagesImage} alt="Painel NovoCode de mensagens agendadas" className="h-auto w-full rounded-[1.3rem]" priority sizes="(max-width: 1024px) 100vw, 58vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">{eyebrow}</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h2><p className="mt-5 text-pretty leading-7 text-muted-foreground sm:text-lg">{text}</p></div>;
}

function Predictability() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500">Mais previsibilidade</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">A comunicação deixa de depender de planilhas e memória</h2><p className="mt-5 leading-7 text-muted-foreground sm:text-lg">Mantenha propostas aquecidas, cobranças no ritmo certo e reuniões confirmadas dentro do mesmo ambiente em que sua equipe atende.</p></div><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-3xl border border-border bg-card p-7"><Clock3 className="size-7 text-fern-500" /><h3 className="mt-5 text-xl font-black text-foreground">Automação com controle</h3><p className="mt-3 leading-7 text-muted-foreground">Programe o próximo contato sem perder a liberdade de editar ou cancelar.</p></article><article className="rounded-3xl border border-border bg-card p-7"><Trash2 className="size-7 text-fern-500" /><h3 className="mt-5 text-xl font-black text-foreground">Ajustes até o envio</h3><p className="mt-3 leading-7 text-muted-foreground">Revise prazos e conteúdo antes que a mensagem seja disparada.</p></article></div></div></section>;
}

function Controls() {
  return <section className="border-y border-border bg-surface-muted/45 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Gestão completa" title="Agende com poucos cliques e acompanhe tudo" text="Uma visão única para criar, revisar e medir cada comunicação programada." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{controls.map(({ title, text, icon: Icon }) => <article key={title} className="flex gap-4 rounded-3xl border border-border bg-background p-6"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-5" aria-hidden="true" /></span><div><h3 className="font-black text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div></article>)}</div></div></section>;
}

function UseCases() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Onde gera resultado" title="Comunicações importantes nunca ficam para depois" text="Planeje pontos de contato recorrentes em vendas, financeiro e relacionamento com clientes." /><div className="mt-12 grid gap-5 md:grid-cols-3">{useCases.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-3xl border border-border bg-card p-7"><span className="flex size-12 items-center justify-center rounded-2xl bg-fern-900 text-fern-500"><Icon className="size-5" aria-hidden="true" /></span><h3 className="mt-5 text-lg font-black text-foreground">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></article>)}</div></div></section>;
}

function Benefits() {
  return <section className="bg-pine-teal-100 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Vantagem competitiva</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">Consistência para a operação e cuidado para o cliente</h2><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-pine-teal-400 bg-pine-teal-400 md:grid-cols-2 lg:grid-cols-4">{benefits.map(({ title, text }, index) => <article key={title} className="bg-pine-teal-100 p-7"><span className="text-sm font-black text-dry-sage-500">0{index + 1}</span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-dry-sage-700">{text}</p></article>)}</div></div></section>;
}

function CallToAction() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-5xl rounded-[2rem] bg-linear-to-br from-hunter-green-500 to-pine-teal-100 px-6 py-14 text-center text-white shadow-2xl sm:px-12"><BarChart3 className="mx-auto size-9 text-dry-sage-500" /><h2 className="mt-5 text-balance text-3xl font-black sm:text-5xl">Transforme lembretes em resultados</h2><p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-800">Veja como a NovoCode mantém sua comunicação pontual, rastreável e integrada ao atendimento.</p><button type="button" data-plan="Mensagens Agendadas" className="h-widget-trigger mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dry-sage-500 px-7 py-3 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Falar com especialista <MessageCircle className="size-4" aria-hidden="true" /></button></div></section>;
}
