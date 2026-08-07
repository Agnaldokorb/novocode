import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CalendarClock,
  Check,
  CircleDollarSign,
  Clock3,
  CodeXml,
  Database,
  GitBranch,
  Headphones,
  ListChecks,
  MessageCircle,
  MessagesSquare,
  Network,
  RefreshCw,
  Route,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Tags,
  Target,
  UserRoundCheck,
  UsersRound,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const automationFeatureVariants = [
  "distribuicao-automatica",
  "agentes-de-ia",
  "chatbot",
  "sequencias",
  "automacoes",
] as const;

export type AutomationFeatureVariant = (typeof automationFeatureVariants)[number];

export function isAutomationFeatureVariant(value: string): value is AutomationFeatureVariant {
  return automationFeatureVariants.some((variant) => variant === value);
}

type Item = { title: string; text: string; icon: LucideIcon };
type FeatureContent = {
  plan: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  highlights: string[];
  mockupTitle: string;
  mockupStatus: string;
  mockupSteps: string[];
  overviewEyebrow: string;
  overviewTitle: string;
  overviewText: string;
  overviewCards: Item[];
  capabilitiesTitle: string;
  capabilitiesText: string;
  capabilities: Item[];
  journeyTitle: string;
  journeyText: string;
  journey: Item[];
  benefits: Array<{ title: string; text: string }>;
  ctaTitle: string;
  ctaText: string;
};

const contents: Record<AutomationFeatureVariant, FeatureContent> = {
  "distribuicao-automatica": {
    plan: "Distribuição Automática",
    eyebrow: "Atendimento sem espera",
    title: "Cada conversa com a pessoa certa,",
    accent: "na hora certa",
    description: "Distribua novos atendimentos de forma equilibrada e use o transbordo para garantir que nenhum cliente fique sem resposta.",
    highlights: ["Rodízio automático", "Tempo de resposta configurável", "Transbordo inteligente", "Carteiras respeitadas"],
    mockupTitle: "Fila Comercial",
    mockupStatus: "Distribuição ativa",
    mockupSteps: ["Nova conversa recebida", "Enviada para Ana", "Tempo limite atingido", "Redirecionada para Rafael"],
    overviewEyebrow: "Fluxo contínuo",
    overviewTitle: "Distribuição e transbordo trabalhando juntos",
    overviewText: "Enquanto o rodízio organiza quem recebe cada contato, o transbordo reage quando o atendimento não é assumido dentro do prazo.",
    overviewCards: [
      { title: "Distribuição sequencial", text: "Direcione conversas em ordem circular, equilibrando a demanda entre pessoas disponíveis.", icon: RefreshCw },
      { title: "Resposta garantida", text: "Amplie a visibilidade da conversa quando ninguém estiver disponível para assumir.", icon: ShieldCheck },
    ],
    capabilitiesTitle: "Regras que acompanham sua operação",
    capabilitiesText: "Configure disponibilidade, responsabilidades e horários sem criar gargalos.",
    capabilities: [
      { title: "Gestão de disponibilidade", text: "Considere folgas, férias e licenças no direcionamento.", icon: CalendarClock },
      { title: "Perfis de usuário", text: "Supervisores acompanham sem entrar no rodízio automático.", icon: UserRoundCheck },
      { title: "Horário de atendimento", text: "Informe clientes automaticamente fora do expediente.", icon: Clock3 },
      { title: "Carteirização integrada", text: "Respeite o responsável já vinculado ao contato.", icon: Tags },
      { title: "Filas por equipe", text: "Distribua por setor, unidade ou especialidade.", icon: UsersRound },
      { title: "Monitoramento", text: "Acompanhe filas, responsáveis e tempos em tempo real.", icon: BarChart3 },
    ],
    journeyTitle: "Um fluxo previsível, mesmo nos picos",
    journeyText: "A conversa avança automaticamente até encontrar disponibilidade.",
    journey: [
      { title: "Contato chega", text: "A fila identifica a equipe adequada.", icon: MessageCircle },
      { title: "Atendente recebe", text: "O rodízio seleciona a próxima pessoa disponível.", icon: UserRoundCheck },
      { title: "Prazo é monitorado", text: "A plataforma acompanha o tempo para aceite.", icon: Clock3 },
      { title: "Transbordo acontece", text: "A demanda segue sem depender de ação manual.", icon: Route },
    ],
    benefits: [
      { title: "Carga equilibrada", text: "Evite sobrecarga e distribua oportunidades com justiça." },
      { title: "Primeira resposta ágil", text: "Reduza o tempo que o cliente passa aguardando." },
      { title: "Processo claro", text: "Regras objetivas diminuem ruídos na equipe." },
      { title: "Escala com qualidade", text: "Cresça sem perder controle sobre o atendimento." },
    ],
    ctaTitle: "Nenhum cliente precisa ficar esperando",
    ctaText: "Configure uma distribuição compatível com sua equipe e mantenha cada conversa em movimento.",
  },
  "agentes-de-ia": {
    plan: "Agentes de IA",
    eyebrow: "Equipes inteligentes sem código",
    title: "Agentes de IA que trabalham juntos no",
    accent: "WhatsApp",
    description: "Combine especialistas virtuais em uma mesma conversa para responder, qualificar, consultar dados e executar tarefas durante toda a jornada.",
    highlights: ["Múltiplos agentes", "Supervisor inteligente", "Base de conhecimento", "APIs e MCP"],
    mockupTitle: "Equipe de IA",
    mockupStatus: "Supervisor ativo",
    mockupSteps: ["Intenção identificada", "Agente Comercial acionado", "CRM consultado", "Oportunidade criada"],
    overviewEyebrow: "Orquestração inteligente",
    overviewTitle: "Cada agente domina uma habilidade",
    overviewText: "Um supervisor interpreta a intenção, aplica regras de negócio e direciona a conversa ao especialista mais adequado.",
    overviewCards: [
      { title: "Supervisor de IA", text: "Monitore a conversa e escolha automaticamente o próximo agente ou fluxo.", icon: BrainCircuit },
      { title: "Conhecimento próprio", text: "Use documentos e dados da empresa para gerar respostas contextualizadas.", icon: Database },
    ],
    capabilitiesTitle: "Habilidades prontas para entrar em ação",
    capabilitiesText: "Configure o que cada agente pode fazer com poucos cliques.",
    capabilities: [
      { title: "Gerenciar etiquetas", text: "Adicione ou remova classificações do contato.", icon: Tags },
      { title: "Transferir atendimento", text: "Encaminhe para uma equipe ou pessoa quando necessário.", icon: Route },
      { title: "Atualizar o CRM", text: "Crie oportunidades e registre dados coletados.", icon: ListChecks },
      { title: "Acionar APIs", text: "Envie e consulte informações em sistemas externos.", icon: CodeXml },
      { title: "Consultar MCP", text: "Acesse serviços e fontes de dados em tempo real.", icon: Network },
      { title: "Concluir conversas", text: "Finalize o atendimento com contexto e mensagem adequada.", icon: Check },
    ],
    journeyTitle: "Inteligência em diferentes etapas da operação",
    journeyText: "Da primeira mensagem ao pós-venda, cada agente assume tarefas específicas.",
    journey: [
      { title: "Qualificação de leads", text: "Faça perguntas e priorize os contatos certos.", icon: Target },
      { title: "Agendamentos", text: "Consulte horários e confirme reuniões.", icon: CalendarClock },
      { title: "Cobrança inteligente", text: "Lembre, negocie e atualize o status da operação.", icon: CircleDollarSign },
      { title: "Suporte técnico", text: "Resolva dúvidas e transfira apenas casos necessários.", icon: Headphones },
    ],
    benefits: [
      { title: "Atendimento contínuo", text: "Mantenha respostas disponíveis em qualquer horário." },
      { title: "Especialização", text: "Use um agente adequado para cada intenção do cliente." },
      { title: "Dados conectados", text: "Consulte e atualize sistemas durante a conversa." },
      { title: "Escala inteligente", text: "Automatize volume sem perder contexto e precisão." },
    ],
    ctaTitle: "Monte sua equipe de agentes inteligentes",
    ctaText: "Conecte conhecimento, sistemas e atendimento em uma experiência automatizada e fluida.",
  },
  chatbot: {
    plan: "Chatbot",
    eyebrow: "Atendimento automatizado 24/7",
    title: "Um chatbot que orienta, qualifica e",
    accent: "resolve",
    description: "Crie jornadas personalizadas sem código, responda dúvidas e transfira para a equipe humana com todo o contexto preservado.",
    highlights: ["Construtor no-code", "Atendimento simultâneo", "Conteúdo multimídia", "Transbordo humano"],
    mockupTitle: "Fluxo de Atendimento",
    mockupStatus: "Chatbot online",
    mockupSteps: ["Saudação enviada", "Necessidade identificada", "Dados coletados", "Equipe correta acionada"],
    overviewEyebrow: "Jornadas envolventes",
    overviewTitle: "Respostas rápidas sem perder a experiência humana",
    overviewText: "Ofereça opções, compartilhe conteúdos e colete as informações necessárias antes de envolver sua equipe.",
    overviewCards: [
      { title: "Autonomia para resolver", text: "Crie caminhos para dúvidas frequentes, solicitações e autoatendimento.", icon: Bot },
      { title: "Contexto antes do atendimento", text: "Entenda perfil e necessidade antes de direcionar a conversa.", icon: MessagesSquare },
    ],
    capabilitiesTitle: "Componentes para construir fluxos completos",
    capabilitiesText: "Desenhe a jornada visualmente e combine ações de atendimento e negócio.",
    capabilities: [
      { title: "Mensagens e mídias", text: "Envie texto, imagem, áudio, vídeo e documentos.", icon: Send },
      { title: "Etiquetas", text: "Classifique contatos conforme suas respostas.", icon: Tags },
      { title: "Transferências", text: "Direcione para a equipe certa com contexto.", icon: Route },
      { title: "Cards no CRM", text: "Transforme dados coletados em oportunidades.", icon: ListChecks },
      { title: "Integrações", text: "Acione APIs para consultar ou atualizar informações.", icon: CodeXml },
      { title: "Agentes de IA", text: "Combine fluxos determinísticos com inteligência.", icon: BrainCircuit },
    ],
    journeyTitle: "Atenda em escala com uma jornada clara",
    journeyText: "O chatbot recebe, entende, executa e transfere quando a conversa pede uma pessoa.",
    journey: [
      { title: "Receba", text: "Responda imediatamente em qualquer horário.", icon: MessageCircle },
      { title: "Entenda", text: "Colete dados e identifique o objetivo do contato.", icon: Target },
      { title: "Resolva", text: "Entregue informações ou execute ações automáticas.", icon: Zap },
      { title: "Transfira", text: "Leve o histórico completo para o atendimento humano.", icon: UsersRound },
    ],
    benefits: [
      { title: "Disponibilidade 24/7", text: "Atenda dentro e fora do horário comercial." },
      { title: "Menos filas", text: "Conduza várias conversas simultaneamente." },
      { title: "Personalização", text: "Adapte caminhos e respostas a cada necessidade." },
      { title: "Configuração no-code", text: "Evolua o fluxo sem depender de programação." },
    ],
    ctaTitle: "Crie um atendimento que nunca para",
    ctaText: "Desenhe jornadas inteligentes e deixe sua equipe focada nas conversas que exigem atenção humana.",
  },
  sequencias: {
    plan: "Sequências",
    eyebrow: "Cadências automáticas",
    title: "Mais constância com",
    accent: "menos esforço manual",
    description: "Defina conteúdo, intervalos e condições uma única vez. A NovoCode mantém cada contato ativo no momento certo.",
    highlights: ["Intervalos configuráveis", "Horários e dias úteis", "Saída por resposta", "Métricas de entrega"],
    mockupTitle: "Cadência Comercial",
    mockupStatus: "Sequência ativa",
    mockupSteps: ["Modelo de abertura", "Aguardar 2 dias", "Follow-up de valor", "Remover ao responder"],
    overviewEyebrow: "Configure uma vez",
    overviewTitle: "A sequência cuida do acompanhamento",
    overviewText: "Monte uma régua consistente para leads e clientes sem depender de lembretes individuais da equipe.",
    overviewCards: [
      { title: "Fluxo planejado", text: "Defina ordem, conteúdo e intervalo entre cada mensagem.", icon: Workflow },
      { title: "Condições inteligentes", text: "Remova contatos automaticamente quando responderem ou cumprirem uma regra.", icon: GitBranch },
    ],
    capabilitiesTitle: "Uma cadência pronta para operar",
    capabilitiesText: "Combine modelos, contatos, horários e métricas em uma gestão centralizada.",
    capabilities: [
      { title: "Desenho do fluxo", text: "Planeje cada etapa e seu intervalo.", icon: Workflow },
      { title: "Modelos e bots", text: "Use mensagens aprovadas e chatbots na jornada.", icon: Bot },
      { title: "Agenda de disparos", text: "Escolha dias e horários adequados à operação.", icon: CalendarClock },
      { title: "Entrada de contatos", text: "Adicione manualmente, por chatbot ou API.", icon: UsersRound },
      { title: "Regras de saída", text: "Interrompa a cadência quando houver resposta.", icon: GitBranch },
      { title: "Resultados", text: "Acompanhe status, entregas e respostas.", icon: BarChart3 },
    ],
    journeyTitle: "Cadências para toda a jornada do cliente",
    journeyText: "Mantenha o relacionamento ativo em diferentes momentos do negócio.",
    journey: [
      { title: "Vendas e follow-up", text: "Reative leads até o fechamento.", icon: Target },
      { title: "Cobrança", text: "Automatize lembretes e agradecimentos.", icon: CircleDollarSign },
      { title: "Pós-venda", text: "Envie check-ins, conteúdos e pesquisas.", icon: Headphones },
      { title: "E-commerce", text: "Recupere carrinhos e lembre agendamentos.", icon: ShoppingCart },
    ],
    benefits: [
      { title: "Consistência", text: "Nenhum contato importante fica esquecido." },
      { title: "Produtividade", text: "A equipe deixa tarefas repetitivas com a plataforma." },
      { title: "Personalização", text: "Adapte mensagens e pausas a cada jornada." },
      { title: "Visibilidade", text: "Acompanhe o avanço e o retorno de cada contato." },
    ],
    ctaTitle: "Mantenha cada oportunidade em movimento",
    ctaText: "Crie uma cadência previsível para vendas, cobrança e relacionamento.",
  },
  automacoes: {
    plan: "Automações",
    eyebrow: "WhatsApp, Instagram e Messenger",
    title: "Automatize, integre e otimize",
    accent: "sua operação",
    description: "Conecte atendimento, agentes de IA, gatilhos e cadências para criar processos completos entre seus canais e sistemas.",
    highlights: ["Fluxos por gatilhos", "Agentes de IA", "Cadências", "APIs, Make e n8n"],
    mockupTitle: "Automação de Jornada",
    mockupStatus: "Fluxo publicado",
    mockupSteps: ["Lead recebeu etiqueta", "Agente de IA qualificou", "CRM atualizado", "Sequência iniciada"],
    overviewEyebrow: "Operação conectada",
    overviewTitle: "Tudo trabalha em conjunto, automaticamente",
    overviewText: "Transforme eventos do dia a dia em ações coordenadas entre atendimento, vendas, marketing e sistemas externos.",
    overviewCards: [
      { title: "Fluxos por gatilhos", text: "Inicie ações a partir de mensagens, etiquetas, etapas ou eventos externos.", icon: Zap },
      { title: "Integrações abertas", text: "Conecte APIs e ferramentas como Make e n8n aos seus processos.", icon: Network },
    ],
    capabilitiesTitle: "Os blocos para automatizar de ponta a ponta",
    capabilitiesText: "Combine recursos da NovoCode para criar uma operação rápida, conectada e mensurável.",
    capabilities: [
      { title: "Atendimento automatizado", text: "Responda, colete dados e agende compromissos.", icon: Bot },
      { title: "Agentes de IA", text: "Consulte dados, qualifique e execute tarefas.", icon: BrainCircuit },
      { title: "Gatilhos", text: "Reaja automaticamente a eventos importantes.", icon: Zap },
      { title: "Sequências", text: "Crie cadências para acompanhar cada contato.", icon: RefreshCw },
      { title: "Integrações", text: "Troque dados com sistemas e plataformas externas.", icon: CodeXml },
      { title: "Métricas", text: "Acompanhe execução, entregas e resultados.", icon: BarChart3 },
    ],
    journeyTitle: "Automação para diferentes setores",
    journeyText: "Adapte os fluxos ao processo real da sua empresa.",
    journey: [
      { title: "E-commerce", text: "Atualize pedidos e recupere carrinhos.", icon: ShoppingCart },
      { title: "Saúde e serviços", text: "Agende, confirme e lembre compromissos.", icon: CalendarClock },
      { title: "Educação", text: "Confirme inscrições e apoie alunos.", icon: MessagesSquare },
      { title: "Financeiro", text: "Envie alertas, vencimentos e suporte.", icon: CircleDollarSign },
    ],
    benefits: [
      { title: "Mais eficiência", text: "Reduza tarefas manuais e tempos de resposta." },
      { title: "Experiência consistente", text: "Entregue comunicação rápida e personalizada." },
      { title: "Dados integrados", text: "Evite silos entre canais e sistemas." },
      { title: "Crescimento sustentável", text: "Absorva mais volume com processos confiáveis." },
    ],
    ctaTitle: "Desbloqueie o potencial da sua operação",
    ctaText: "Conecte canais, dados e equipes com automações desenhadas para o seu negócio.",
  },
};

export default function AutomationSuiteFeaturePage({ variant }: { variant: AutomationFeatureVariant }) {
  const content = contents[variant];
  return <main className="overflow-hidden bg-background"><Hero content={content} /><Overview content={content} /><Capabilities content={content} /><Journey content={content} /><Benefits content={content} /><CallToAction content={content} /></main>;
}

function Hero({ content }: { content: FeatureContent }) {
  return <section className="relative isolate border-b border-border" aria-labelledby="automation-feature-title"><div className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-dry-sage-900 via-background to-background dark:from-pine-teal-200/55" aria-hidden="true" /><div className="pointer-events-none absolute -right-28 top-12 -z-10 size-112 rounded-full bg-fern-500/16 blur-3xl" aria-hidden="true" /><div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28"><div><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-fern-700/60 bg-background/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-hunter-green-500 dark:text-dry-sage-500"><Sparkles className="size-3.5" aria-hidden="true" />{content.eyebrow}</p><h1 id="automation-feature-title" className="text-balance text-4xl font-black leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-7xl">{content.title} <span className="text-fern-500 dark:text-dry-sage-500">{content.accent}</span></h1><p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{content.description}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><button type="button" data-plan={content.plan} className="h-widget-trigger inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Falar com especialista <MessageCircle className="size-4" aria-hidden="true" /></button><Link href="/precos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/75 px-6 py-3 text-sm font-black text-foreground transition hover:-translate-y-0.5 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Conhecer os planos <ArrowRight className="size-4" aria-hidden="true" /></Link></div><ul className="mt-8 grid gap-3 text-sm font-semibold text-muted-foreground sm:grid-cols-2">{content.highlights.map((item) => <li key={item} className="flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-fern-900 text-fern-500"><Check className="size-3" aria-hidden="true" /></span>{item}</li>)}</ul></div><FlowMockup content={content} /></div></section>;
}

function FlowMockup({ content }: { content: FeatureContent }) {
  return <div className="relative mx-auto w-full max-w-xl"><div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-fern-500/18 blur-3xl" aria-hidden="true" /><div className="overflow-hidden rounded-[1.75rem] border border-pine-teal-400 bg-pine-teal-100 p-3 text-white shadow-2xl"><div className="flex items-center gap-3 rounded-2xl border border-pine-teal-400 bg-pine-teal-200/70 p-4"><span className="flex size-11 items-center justify-center rounded-2xl bg-dry-sage-500 text-pine-teal-100"><Workflow className="size-5" aria-hidden="true" /></span><div><p className="font-black">{content.mockupTitle}</p><p className="text-xs text-dry-sage-700">{content.mockupStatus}</p></div><span className="ml-auto flex items-center gap-2 rounded-full bg-fern-900 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-fern-500"><span className="size-1.5 rounded-full bg-fern-500" />Online</span></div><div className="space-y-3 px-3 py-6">{content.mockupSteps.map((step, index) => <div key={step} className="grid grid-cols-[auto_1fr_auto] items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full border border-pine-teal-400 bg-pine-teal-200 text-xs font-black text-dry-sage-500">{index + 1}</span><div className="h-px bg-pine-teal-400" /><div className="min-w-44 rounded-2xl border border-pine-teal-400 bg-pine-teal-200/75 px-4 py-3"><p className="text-sm font-bold text-dry-sage-800">{step}</p><p className="mt-1 text-[10px] uppercase tracking-wider text-dry-sage-700">Etapa concluída</p></div></div>)}</div></div></div>;
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500 dark:text-dry-sage-500">{eyebrow}</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h2><p className="mt-5 text-pretty leading-7 text-muted-foreground sm:text-lg">{text}</p></div>;
}

function Overview({ content }: { content: FeatureContent }) {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-fern-500">{content.overviewEyebrow}</p><h2 className="mt-4 text-balance text-3xl font-black tracking-[-0.04em] text-foreground sm:text-5xl">{content.overviewTitle}</h2><p className="mt-5 leading-7 text-muted-foreground sm:text-lg">{content.overviewText}</p></div><div className="grid gap-4 sm:grid-cols-2">{content.overviewCards.map(({ title, text, icon: Icon }) => <article key={title} className="rounded-3xl border border-border bg-card p-7"><Icon className="size-7 text-fern-500" aria-hidden="true" /><h3 className="mt-5 text-xl font-black text-foreground">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{text}</p></article>)}</div></div></section>;
}

function Capabilities({ content }: { content: FeatureContent }) {
  return <section className="border-y border-border bg-surface-muted/45 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Recursos" title={content.capabilitiesTitle} text={content.capabilitiesText} /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{content.capabilities.map(({ title, text, icon: Icon }) => <article key={title} className="flex gap-4 rounded-3xl border border-border bg-background p-6"><span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Icon className="size-5" aria-hidden="true" /></span><div><h3 className="font-black text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div></article>)}</div></div></section>;
}

function Journey({ content }: { content: FeatureContent }) {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><Heading eyebrow="Na prática" title={content.journeyTitle} text={content.journeyText} /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{content.journey.map(({ title, text, icon: Icon }, index) => <article key={title} className="rounded-3xl border border-border bg-card p-7"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-2xl bg-fern-900 text-fern-500"><Icon className="size-5" aria-hidden="true" /></span><span className="text-xs font-black text-muted-foreground">0{index + 1}</span></div><h3 className="mt-5 text-lg font-black text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>;
}

function Benefits({ content }: { content: FeatureContent }) {
  return <section className="bg-pine-teal-100 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-dry-sage-500">Resultados</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">Mais inteligência para uma operação que cresce</h2><div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-pine-teal-400 bg-pine-teal-400 md:grid-cols-2 lg:grid-cols-4">{content.benefits.map(({ title, text }, index) => <article key={title} className="bg-pine-teal-100 p-7"><span className="text-sm font-black text-dry-sage-500">0{index + 1}</span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-dry-sage-700">{text}</p></article>)}</div></div></section>;
}

function CallToAction({ content }: { content: FeatureContent }) {
  return <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto max-w-5xl rounded-[2rem] bg-linear-to-br from-hunter-green-500 to-pine-teal-100 px-6 py-14 text-center text-white shadow-2xl sm:px-12"><Zap className="mx-auto size-9 text-dry-sage-500" aria-hidden="true" /><h2 className="mt-5 text-balance text-3xl font-black sm:text-5xl">{content.ctaTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-pretty leading-7 text-dry-sage-800">{content.ctaText}</p><button type="button" data-plan={content.plan} className="h-widget-trigger mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-dry-sage-500 px-7 py-3 text-sm font-black text-pine-teal-100 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Falar com especialista <MessageCircle className="size-4" aria-hidden="true" /></button></div></section>;
}
