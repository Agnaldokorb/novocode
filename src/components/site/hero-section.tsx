import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />

      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              🚀 Transformando ideias em código
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Desenvolvimento de{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Software
                </span>{" "}
                Sob Medida
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg">
                Criamos soluções digitais inovadoras que impulsionam seu
                negócio. Da ideia ao deploy, estamos com você em cada etapa.
              </p>
            </div>{" "}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/orcamento">
                  Começar Projeto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                asChild
              >
                <Link href="/portfolio">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Portfólio
                </Link>
              </Button>
            </div>
            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Código Limpo</h3>
                  <p className="text-sm text-muted-foreground">
                    Seguindo melhores práticas
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Inovação</h3>
                  <p className="text-sm text-muted-foreground">
                    Tecnologias modernas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-400 text-sm ml-4">app.tsx</span>
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="text-blue-400">
                  <span className="text-gray-500">const</span> App = () =&gt;{" "}
                  {"{"}
                </div>
                <div className="pl-4 text-green-400">
                  <span className="text-gray-500">return</span> (
                </div>{" "}
                <div className="pl-8 text-yellow-400">
                  &lt;div className=&quot;
                  <span className="text-blue-300">modern-app</span>&quot;&gt;
                </div>
                <div className="pl-12 text-pink-400">
                  &lt;h1&gt;Seu projeto aqui&lt;/h1&gt;
                </div>
                <div className="pl-8 text-yellow-400">&lt;/div&gt;</div>
                <div className="pl-4 text-green-400">);</div>
                <div className="text-blue-400">{"}"};</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
