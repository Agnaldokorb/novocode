import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Clock3,
  FileText,
  Filter,
  Headphones,
  History,
  LockKeyhole,
  MessageCircle,
  MessagesSquare,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import atendimentoImage from "../../../public/Atendimento.png";

const flow: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: "Filas inteligentes", description: "Organize cada conversa por tema, prioridade ou setor.", icon: Route },
  { title: "Distribuição automática", description: "Encaminhe novos atendimentos conforme as regras da operação.", icon: UsersRound },
  { title: "Transbordo configurável", description: "Redirecione demandas quando uma equipe atingir seu limite.", icon: Clock3 },
  { title: "Carteirização", description: "Mantenha clientes estratégicos com seus responsáveis.", icon: Tags },
  { title: "Equipes segmentadas", description: "Separe acessos e rotinas por área, unidade ou especialidade.", icon: ShieldCheck },
];

const tools: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: "Notas internas", description: "Compartilhe contexto sem expor mensagens ao cliente.", icon: FileText },
  { title: "Histórico completo", description: "Consulte toda a jornada antes de responder.", icon: History },
  { title: "Permissões", description: "Controle o que cada perfil pode visualizar e executar.", icon: LockKeyhole },
  { title: "Filtros e busca", description: "Encontre conversas, contatos e informações rapidamente.", icon: Search },
  { title: "Conteúdo multimídia", description: "Troque áudios, imagens e documentos em um só lugar.", icon: MessagesSquare },
  { title: "Status em tempo real", description: "Acompanhe filas, responsáveis e evolução dos atendimentos.", icon: BarChart3 },
];

const benefits = [
  ["Experiência mais ágil", "Reduza esperas e conduza cada solicitação até a equipe certa."],
  ["Equipe mais produtiva", "Centralize canais, contexto e tarefas em uma única rotina."],
  ["IA no atendimento", "Automatize triagens e respostas sem perder a continuidade humana."],
  ["Gestão transparente", "Tenha visibilidade do volume, desempenho e qualidade da operação."],
];

export default function ServiceFeaturePage() {
  return (
    <main className="overflow-hidden bg-background">
      <Hero />
      <Flow />
      <Tools />
      <Benefits />
      <Management />
      <ConnectedPlatform />
      <CallToAction />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative isolate border-b border-border" aria-labelledby="service-title">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55" />
      <div className="pointer-events-none absolute -right-28 top-12 -z-10 size-112 rounded-full bg-fern-500/16 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 dark:text-dry-sage-500">
            <Sparkles className="size-3.5" /> Central de atendimento NovoCode
          </p>
          <h1 id="service-title" className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl">
            Atendimento que une <span className="text-fern-500 dark:text-dry-sage-500">agilidade e contexto</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Centralize WhatsApp, Instagram e Messenger, distribua conversas com inteligência e dê à equipe tudo o que precisa para atender melhor.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" data-plan="Atendimento" className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-accent">
              Falar com especialista <MessageCircle className="size-4" />
            </button>
            <Link href="/precos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:bg-surface-muted">
              Conhecer os planos <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 text-sm font-semibold text-muted-foreground sm:grid-cols-2">
            {["Canais centralizados", "Histórico preservado", "Distribuição inteligente", "Gestão em tempo real"].map((item) => (
              <li key={item} className="flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-fern-900 text-fern-500"><Check className="size-3" /></span>{item}</li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-fern-500/15 blur-3xl" />
          <div className="overflow-hidden rounded-[1.75rem] border border-pine-teal-400 bg-pine-teal-100 p-2 shadow-2xl">
            <Image src={atendimentoImage} alt="Central de atendimento multicanal da NovoCode" className="h-auto w-full rounded-[1.3rem]" priority sizes="(max-width: 1024px) 100vw, 55vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">{eyebrow}</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h2><p className="mt-5 text-pretty leading-7 text-muted-foreground sm:text-lg">{text}</p></div>;
}

function Flow() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Fluxo sob controle" title="Cada conversa encontra o caminho certo" text="Configure regras que refletem sua operação e mantenha o atendimento organizado mesmo nos momentos de maior demanda." /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{flow.map(({ title, description, icon: Icon }, index) => <article key={title} className="rounded-3xl border border-border bg-card p-6 shadow-sm"><span className="flex size-11 items-center justify-center rounded-2xl bg-fern-900 text-fern-500"><Icon className="size-5" /></span><p className="mt-5 text-xs font-black text-muted-foreground">0{index + 1}</p><h3 className="mt-2 font-black text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p></article>)}</div></div></section>;
}

function Tools() {
  return <section className="border-y border-border bg-surface-muted/45 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Tudo à mão" title="Ferramentas para atender sem perder contexto" text="A equipe trabalha com informação, colaboração e segurança dentro da mesma central." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tools.map(({ title, description, icon: Icon }) => <article key={title} className="flex gap-4 rounded-3xl border border-border bg-background p-6"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-5" /></span><div><h3 className="font-black text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></div></article>)}</div></div></section>;
}

function Benefits() {
  return <section className="bg-pine-teal-100 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Impacto no dia a dia</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">Uma operação melhor para clientes, equipe e gestores</h2><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-pine-teal-400 bg-pine-teal-400 md:grid-cols-2 lg:grid-cols-4">{benefits.map(([title, text], index) => <article key={title} className="bg-pine-teal-100 p-7"><span className="text-sm font-black text-dry-sage-500">0{index + 1}</span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-dry-sage-700">{text}</p></article>)}</div></div></section>;
}

function Management() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500">Gestão de conversas</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">Visibilidade para decidir em tempo real</h2><p className="mt-5 leading-7 text-muted-foreground sm:text-lg">Monitore filas, acompanhe conversas e encontre gargalos antes que afetem a experiência do cliente.</p></div><div className="grid gap-4 sm:grid-cols-3">{[[Headphones,"Monitoramento","Acompanhe atendimentos ativos."],[ShieldCheck,"Supervisão","Apoie a equipe quando necessário."],[Filter,"Indicadores","Analise volume e desempenho."]].map(([Icon,title,text]) => { const C = Icon as LucideIcon; return <article key={title as string} className="rounded-3xl border border-border bg-card p-6"><C className="size-6 text-fern-500" /><h3 className="mt-5 font-black text-foreground">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p></article>;})}</div></div></section>;
}

function ConnectedPlatform() {
  const links = [["/funcionalidades/crm","CRM integrado","Conecte conversas ao processo comercial."],["/funcionalidades/agentes-de-ia","Agentes de IA","Automatize triagens e tarefas repetitivas."],["/funcionalidades/automacoes","Automações","Crie jornadas que mantêm a operação fluindo."]];
  return <section className="border-y border-border bg-surface-muted/45 px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Plataforma conectada" title="Atendimento integrado a toda a jornada" text="Combine relacionamento, inteligência e automação para construir uma experiência consistente." /><div className="mt-10 grid gap-4 md:grid-cols-3">{links.map(([href,title,text]) => <Link key={href} href={href} className="group rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:border-fern-500"><h3 className="font-black text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-fern-500">Conhecer <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>;
}

function CallToAction() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-5xl rounded-4xl bg-linear-to-br from-hunter-green-500 to-pine-teal-100 px-6 py-14 text-center text-white shadow-2xl sm:px-12"><Bot className="mx-auto size-9 text-dry-sage-500" /><h2 className="mt-5 text-balance text-3xl font-black sm:text-5xl">Transforme seu atendimento em uma vantagem competitiva</h2><p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-800">Descubra como a NovoCode pode organizar seus canais e acelerar a rotina da sua equipe.</p><button type="button" data-plan="Atendimento" className="h-widget-trigger mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dry-sage-500 px-7 py-3 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-white">Falar com especialista <MessageCircle className="size-4" /></button></div></section>;
}
