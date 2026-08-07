import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  GraduationCap,
  Headphones,
  Link2,
  LockKeyhole,
  MessageCircle,
  MessagesSquare,
  Rocket,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserCog,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const steps: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Ative o recurso", text: "Conecte a operação à API Oficial do WhatsApp.", icon: Settings2 },
  { title: "Crie o grupo", text: "Defina nome, objetivo e responsáveis pelo espaço.", icon: UsersRound },
  { title: "Convide participantes", text: "Compartilhe um link seguro com clientes e equipe.", icon: Link2 },
  { title: "Configure permissões", text: "Escolha administradores e regras de participação.", icon: UserCog },
  { title: "Acompanhe a conversa", text: "Centralize mensagens, participantes e histórico.", icon: MessagesSquare },
];

const useCases: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Suporte premium", text: "Crie um canal próximo para clientes estratégicos e demandas prioritárias.", icon: Headphones },
  { title: "Implantação de software", text: "Reúna especialistas e cliente durante onboarding, migração e ativação.", icon: Rocket },
  { title: "Projetos contínuos", text: "Mantenha decisões, atualizações e próximos passos em uma conversa organizada.", icon: Clock3 },
  { title: "Treinamentos e comunidades", text: "Conduza turmas, parceiros ou grupos fechados com acesso controlado.", icon: GraduationCap },
];

export default function GroupsFeaturePage() {
  return <main className="overflow-hidden bg-background"><Hero /><HowItWorks /><UseCases /><Benefits /><Governance /><CallToAction /></main>;
}

function Hero() {
  return <section className="relative isolate border-b border-border" aria-labelledby="groups-title"><div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55" /><div className="pointer-events-none absolute -right-28 top-12 -z-10 size-112 rounded-full bg-fern-500/16 blur-3xl" /><div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28"><div><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 dark:text-dry-sage-500"><Sparkles className="size-3.5" /> WhatsApp API Oficial</p><h1 id="groups-title" className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl">Grupos profissionais, <span className="text-fern-500 dark:text-dry-sage-500">gestão centralizada</span></h1><p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Transforme grupos do WhatsApp em canais organizados para colaboração com clientes, equipes e projetos — com histórico, controle e contexto.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><button type="button" data-plan="Grupos na API Oficial" className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-accent">Falar com especialista <MessageCircle className="size-4" /></button><Link href="/precos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:bg-surface-muted">Conhecer os planos <ArrowRight className="size-4" /></Link></div></div><GroupMockup /></div></section>;
}

function GroupMockup() {
  const messages = [["NC","NovoCode","Bem-vindos! O cronograma e os responsáveis já estão disponíveis."],["AM","Ana Martins","Perfeito. Podemos validar a primeira etapa hoje?"],["RL","Rafael Lima","Sim, nossa equipe está pronta para começar."]];
  return <div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-fern-500/18 blur-3xl" /><div className="overflow-hidden rounded-[1.75rem] border border-pine-teal-400 bg-pine-teal-100 p-3 text-white shadow-2xl"><div className="flex items-center gap-3 rounded-2xl border border-pine-teal-400 bg-pine-teal-200/70 p-4"><span className="flex size-12 items-center justify-center rounded-full bg-dry-sage-500 text-pine-teal-100"><UsersRound className="size-6" /></span><div><p className="font-black">Projeto Integração</p><p className="text-xs text-dry-sage-700">12 participantes • API Oficial</p></div><ShieldCheck className="ml-auto size-5 text-dry-sage-500" /></div><div className="space-y-3 px-2 py-5">{messages.map(([initials,name,message], index) => <div key={name} className={`flex gap-3 ${index === 1 ? "ml-6" : ""}`}><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fern-700 text-xs font-black">{initials}</span><div className="rounded-2xl rounded-tl-sm border border-pine-teal-400 bg-pine-teal-200/75 p-3"><p className="text-xs font-black text-dry-sage-500">{name}</p><p className="mt-1 text-sm leading-6 text-dry-sage-800">{message}</p></div></div>)}</div><div className="flex items-center gap-3 rounded-2xl border border-pine-teal-400 bg-pine-teal-200/70 px-4 py-3 text-sm text-dry-sage-700"><MessageCircle className="size-4" /> Digite uma mensagem...</div></div></div>;
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">{eyebrow}</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h2><p className="mt-5 text-pretty leading-7 text-muted-foreground sm:text-lg">{text}</p></div>;
}

function HowItWorks() {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Como funciona" title="Da configuração à conversa em cinco passos" text="Crie um ambiente de colaboração profissional sem abandonar a familiaridade do WhatsApp." /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{steps.map(({ title, text, icon: Icon }, index) => <article key={title} className="rounded-3xl border border-border bg-card p-6 shadow-sm"><div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-2xl bg-fern-900 text-fern-500"><Icon className="size-5" /></span><span className="text-xs font-black text-muted-foreground">0{index + 1}</span></div><h3 className="mt-5 font-black text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>;
}

function UseCases() {
  return <section className="border-y border-border bg-surface-muted/45 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Possibilidades" title="Um grupo para cada relação que importa" text="Aproxime as pessoas certas e mantenha conhecimento, decisões e acompanhamento em um só canal." /><div className="mt-12 grid gap-5 md:grid-cols-2">{useCases.map(({ title, text, icon: Icon }) => <article key={title} className="flex gap-5 rounded-3xl border border-border bg-background p-7"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-5" /></span><div><h3 className="text-lg font-black text-foreground">{title}</h3><p className="mt-2 leading-7 text-muted-foreground">{text}</p></div></article>)}</div></div></section>;
}

function Benefits() {
  const items = [["Mais tempo para o time","Reduza trocas dispersas e reúna todos no mesmo contexto."],["Experiência próxima","Ofereça um canal direto, familiar e organizado ao cliente."],["Histórico acessível","Preserve mensagens e decisões para consultas futuras."],["Gestão simplificada","Administre participantes, permissões e conversas pela plataforma."]];
  return <section className="bg-pine-teal-100 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Benefícios</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">Colaboração com menos ruído e mais continuidade</h2><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-pine-teal-400 bg-pine-teal-400 md:grid-cols-2 lg:grid-cols-4">{items.map(([title,text], index) => <article key={title} className="bg-pine-teal-100 p-7"><span className="text-sm font-black text-dry-sage-500">0{index + 1}</span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-dry-sage-700">{text}</p></article>)}</div></div></section>;
}

function Governance() {
  const items = [[UsersRound,"Participantes internos e externos","Reúna sua equipe e convidados no mesmo espaço."],[Link2,"Entrada por convite","Controle o acesso por meio de links compartilháveis."],[UserCog,"Papéis de administração","Defina quem pode administrar o grupo e seus participantes."],[MessagesSquare,"Regras de conversa","Mantenha a comunicação alinhada às políticas do WhatsApp."],[Clock3,"Janelas de atendimento","Conduza interações respeitando as regras da API Oficial."],[LockKeyhole,"Governança centralizada","Gerencie grupos e acessos a partir da operação NovoCode."]];
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Governança" title="Controle para usar grupos em escala profissional" text="A estrutura certa para equilibrar proximidade, organização e segurança em cada conversa." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(([Icon,title,text]) => { const C = Icon as LucideIcon; return <article key={title as string} className="rounded-3xl border border-border bg-card p-7"><C className="size-6 text-fern-500" /><h3 className="mt-5 font-black text-foreground">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p></article>;})}</div><p className="mt-6 text-center text-xs leading-5 text-muted-foreground">A disponibilidade e as regras do recurso seguem os critérios vigentes da API Oficial do WhatsApp.</p></div></section>;
}

function CallToAction() {
  return <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-5xl rounded-[2rem] bg-linear-to-br from-hunter-green-500 to-pine-teal-100 px-6 py-14 text-center text-white shadow-2xl sm:px-12"><Check className="mx-auto size-9 text-dry-sage-500" /><h2 className="mt-5 text-balance text-3xl font-black sm:text-5xl">Leve seus grupos para uma operação profissional</h2><p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-800">Converse com a NovoCode e descubra como usar grupos da API Oficial com organização e controle.</p><button type="button" data-plan="Grupos na API Oficial" className="h-widget-trigger mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dry-sage-500 px-7 py-3 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-white">Falar com especialista <MessageCircle className="size-4" /></button></div></section>;
}
