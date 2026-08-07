import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleUserRound,
  Headphones,
  LockKeyhole,
  MessageCircle,
  MessagesSquare,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";

const capabilities: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Conversas em tempo real", text: "Fale com colegas e gestores sem sair da plataforma.", icon: MessagesSquare },
  { title: "Ambiente protegido", text: "Mantenha o histórico registrado e a comunicação centralizada.", icon: LockKeyhole },
  { title: "Contexto do cliente", text: "Discuta uma demanda enquanto acompanha o atendimento relacionado.", icon: CircleUserRound },
  { title: "Colaboração entre setores", text: "Aproxime vendas, suporte e sucesso do cliente na mesma rotina.", icon: UsersRound },
];

const outcomes: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Suporte em tempo real", text: "Um atendente pede apoio sem pausar ou transferir a conversa com o cliente.", icon: Headphones },
  { title: "Equipes conectadas", text: "Comercial, CS e suporte tomam decisões com a mesma visão do relacionamento.", icon: UsersRound },
  { title: "Acesso organizado", text: "Usuários veem somente seus canais e equipes; gestores mantêm a visão completa.", icon: ShieldCheck },
];

export default function InternalChatFeaturePage() {
  return <main className="overflow-hidden bg-background"><Hero /><Focus /><Capabilities /><Outcomes /><ConnectedFlow /><CallToAction /></main>;
}

function Hero() {
  return <section className="relative isolate border-b border-border" aria-labelledby="chat-title"><div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55" aria-hidden="true" /><div className="pointer-events-none absolute -right-28 top-12 -z-10 size-112 rounded-full bg-fern-500/16 blur-3xl" aria-hidden="true" /><div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28"><div><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 dark:text-dry-sage-500"><Sparkles className="size-3.5" aria-hidden="true" /> Colaboração dentro da NovoCode</p><h1 id="chat-title" className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl">Centralize sua <span className="text-fern-500 dark:text-dry-sage-500">comunicação interna</span></h1><p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Troque informações, esclareça dúvidas e tome decisões em tempo real, dentro do mesmo ambiente em que sua equipe atende clientes.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><button type="button" data-plan="Chat Interno" className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Falar com especialista <MessageCircle className="size-4" aria-hidden="true" /></button><Link href="/precos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Conhecer os planos <ArrowRight className="size-4" aria-hidden="true" /></Link></div></div><ChatMockup /></div></section>;
}

function ChatMockup() {
  const messages = [{ name: "Marina", text: "O cliente confirmou a condição da proposta?", mine: false },{ name: "Você", text: "Sim. Vou atualizar o CRM e seguir com a ativação.", mine: true },{ name: "Rafael", text: "Ótimo! Já deixei o onboarding preparado.", mine: false }];
  return <div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-fern-500/18 blur-3xl" aria-hidden="true" /><div className="overflow-hidden rounded-[1.75rem] border border-pine-teal-400 bg-pine-teal-100 p-3 text-white shadow-2xl"><div className="flex items-center gap-3 rounded-2xl border border-pine-teal-400 bg-pine-teal-200/70 p-4"><span className="flex size-11 items-center justify-center rounded-full bg-dry-sage-500 text-pine-teal-100"><UsersRound className="size-5" aria-hidden="true" /></span><div><p className="font-black">Comercial + CS</p><p className="text-xs text-dry-sage-700">8 pessoas • 5 online</p></div><span className="ml-auto size-2.5 rounded-full bg-fern-500" /></div><div className="space-y-3 px-2 py-6">{messages.map(({ name, text, mine }) => <div key={text} className={`flex ${mine ? "justify-end" : "justify-start"}`}><div className={`max-w-[84%] rounded-2xl p-3 ${mine ? "rounded-tr-sm bg-fern-700" : "rounded-tl-sm border border-pine-teal-400 bg-pine-teal-200/75"}`}><p className="text-xs font-black text-dry-sage-500">{name}</p><p className="mt-1 text-sm leading-6 text-dry-sage-800">{text}</p></div></div>)}</div><div className="flex items-center gap-3 rounded-2xl border border-pine-teal-400 bg-pine-teal-200/70 px-4 py-3 text-sm text-dry-sage-700"><span className="flex-1">Escreva para a equipe...</span><span className="flex size-9 items-center justify-center rounded-full bg-dry-sage-500 text-pine-teal-100"><Send className="size-4" aria-hidden="true" /></span></div></div></div>;
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">{eyebrow}</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h2><p className="mt-5 text-pretty leading-7 text-muted-foreground sm:text-lg">{text}</p></div>;
}

function Focus() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500">Mais foco, menos dispersão</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">Sua equipe conversa onde o trabalho acontece</h2><p className="mt-5 leading-7 text-muted-foreground sm:text-lg">Elimine trocas em aplicativos externos e mantenha dúvidas, decisões e contexto próximos ao atendimento.</p></div><div className="grid gap-4 sm:grid-cols-2"><article className="rounded-3xl border border-border bg-card p-7"><Zap className="size-7 text-fern-500" aria-hidden="true" /><h3 className="mt-5 text-xl font-black text-foreground">Respostas mais rápidas</h3><p className="mt-3 leading-7 text-muted-foreground">Peça ajuda e direcione demandas sem interromper o fluxo de trabalho.</p></article><article className="rounded-3xl border border-border bg-card p-7"><MessageCircle className="size-7 text-fern-500" aria-hidden="true" /><h3 className="mt-5 text-xl font-black text-foreground">Menos distrações</h3><p className="mt-3 leading-7 text-muted-foreground">Concentre a colaboração no ambiente usado pela operação.</p></article></div></div></section>;
}

function Capabilities() {
  return <section className="border-y border-border bg-surface-muted/45 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Comunicação integrada" title="Mais do que um chat entre colegas" text="Colabore com agilidade sem perder informações, segurança ou o contexto de cada cliente." /><div className="mt-12 grid gap-5 md:grid-cols-2">{capabilities.map(({ title, text, icon: Icon }) => <article key={title} className="flex gap-5 rounded-3xl border border-border bg-background p-7"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-5" aria-hidden="true" /></span><div><h3 className="text-lg font-black text-foreground">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div></article>)}</div></div></section>;
}

function Outcomes() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Menos ruído" title="Colaboração que acelera o atendimento" text="Conecte pessoas, reduza retrabalho e resolva demandas sem perder o fio da conversa." /><div className="mt-12 grid gap-5 md:grid-cols-3">{outcomes.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-3xl border border-border bg-card p-7"><span className="flex size-12 items-center justify-center rounded-2xl bg-fern-900 text-fern-500"><Icon className="size-5" aria-hidden="true" /></span><h3 className="mt-5 text-lg font-black text-foreground">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></article>)}</div></div></section>;
}

function ConnectedFlow() {
  const items = ["Conversa interna vinculada ao contexto", "Decisões preservadas no histórico", "Equipes alinhadas sobre o próximo passo", "Cliente atendido sem interrupções"];
  return <section className="bg-pine-teal-100 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Fluxo conectado</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">A equipe se alinha sem tirar o cliente da conversa</h2><p className="mt-5 max-w-2xl leading-7 text-dry-sage-700 sm:text-lg">O apoio interno acontece em paralelo ao atendimento, preservando velocidade e uma experiência profissional.</p></div><ul className="grid gap-3">{items.map((item) => <li key={item} className="flex items-center gap-3 rounded-2xl border border-pine-teal-400 bg-pine-teal-200/60 p-4 font-semibold text-dry-sage-800"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-dry-sage-500 text-pine-teal-100"><Check className="size-4" aria-hidden="true" /></span>{item}</li>)}</ul></div></section>;
}

function CallToAction() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-5xl rounded-[2rem] bg-linear-to-br from-hunter-green-500 to-pine-teal-100 px-6 py-14 text-center text-white shadow-2xl sm:px-12"><MessagesSquare className="mx-auto size-9 text-dry-sage-500" aria-hidden="true" /><h2 className="mt-5 text-balance text-3xl font-black sm:text-5xl">Conecte sua equipe dentro da operação</h2><p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-800">Descubra como o Chat Interno da NovoCode reduz ruídos e acelera decisões.</p><button type="button" data-plan="Chat Interno" className="h-widget-trigger mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dry-sage-500 px-7 py-3 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Falar com especialista <MessageCircle className="size-4" aria-hidden="true" /></button></div></section>;
}
