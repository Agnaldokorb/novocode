import Image from "next/image";

export default function Automation() {
  return (
    <section
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
      aria-labelledby="automation-title"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fern-700/15 blur-3xl dark:bg-dry-sage-500/5"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Automação inteligente
          </p>
          <h2
            id="automation-title"
            className="mt-4 text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Automação conversacional com agentes inteligentes
          </h2>
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-pine-teal-300 bg-pine-teal-100 p-5 shadow-2xl shadow-pine-teal-100/20 sm:rounded-3xl sm:p-7 lg:p-8 dark:border-pine-teal-300 dark:shadow-black/30">
          <div className="max-w-4xl">
            <h3 className="text-balance text-xl font-bold tracking-tight text-dust-grey-900 sm:text-2xl">
              Orquestre múltiplos agentes de IA em um único chatbot
            </h3>
            <p className="mt-4 text-sm leading-6 text-dust-grey-600 sm:text-base sm:leading-7">
              Automatize seu atendimento com um chatbot avançado, que permite
              criar fluxos personalizados, total liberdade para desenhar
              jornadas inteligentes, qualifica demandas automaticamente e
              garante suporte 24/7.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-pine-teal-300 bg-white shadow-lg sm:mt-7 sm:rounded-2xl">
            <Image
              src="/fuxo-ia.png"
              alt="Editor visual da NovoCode com um fluxo composto por múltiplos agentes de inteligência artificial"
              width={1080}
              height={573}
              sizes="(max-width: 1280px) calc(100vw - 72px), 1080px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-8 grid w-[calc(100%_-_2rem)] max-w-6xl items-center gap-8 overflow-hidden rounded-2xl border border-pine-teal-300 bg-pine-teal-100 p-5 shadow-2xl shadow-pine-teal-100/20 sm:mt-10 sm:w-[calc(100%_-_3rem)] sm:rounded-3xl sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-8 dark:border-pine-teal-300 dark:shadow-black/30">
        <div className="lg:pl-2">
          <h3 className="text-2xl font-black tracking-tight text-dust-grey-900 sm:text-3xl">
            Agente Supervisor
          </h3>

          <ul className="mt-5 space-y-3 text-sm font-medium text-dust-grey-700 sm:text-base">
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Identifica a intenção da conversa</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Aciona o agente ideal da sua equipe</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Garante efetividade durante toda a conversa</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Transfere o atendimento para outros supervisores</span>
            </li>
          </ul>

          
        </div>

        <div className="overflow-hidden rounded-xl border border-pine-teal-300 bg-white shadow-lg sm:rounded-2xl">
          <Image
            src="/agente-supervisor.png"
            alt="Fluxo da NovoCode em que um agente supervisor identifica a intenção e direciona a conversa para agentes especializados"
            width={1600}
            height={826}
            sizes="(max-width: 1024px) calc(100vw - 72px), 600px"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="relative mx-auto mt-8 grid w-[calc(100%_-_2rem)] max-w-6xl items-center gap-8 overflow-hidden rounded-2xl border border-pine-teal-300 bg-pine-teal-100 p-5 shadow-2xl shadow-pine-teal-100/20 sm:mt-10 sm:w-[calc(100%_-_3rem)] sm:rounded-3xl sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:p-8 dark:border-pine-teal-300 dark:shadow-black/30">
        <div className="lg:pl-2">
          <h3 className="max-w-md text-balance text-2xl font-black tracking-tight text-dust-grey-900 sm:text-3xl">
            Integre com qualquer plataforma do mercado
          </h3>

          <ul className="mt-6 space-y-3 text-sm font-medium text-dust-grey-700 sm:text-base">
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Atualize informações em outras soluções</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Consulte a segunda via de boletos</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Crie agendamentos automáticos</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon />
              <span>Desenvolva fluxos intuitivos e completos para o seu atendimento</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-center p-2 sm:p-4">
          <Image
            src="/fluxo-api.png"
            alt="Fluxo de integração entre o CRM, uma API REST e um agente externo de inteligência artificial"
            width={1080}
            height={1080}
            sizes="(max-width: 1024px) calc(100vw - 96px), 480px"
            className="h-auto w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      className="mt-0.5 size-4 shrink-0 text-dry-sage-500"
      aria-hidden="true"
    >
      <path d="m4 10 4 4 8-8" />
    </svg>
  );
}
