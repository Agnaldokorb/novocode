"use client";

import { ArrowDown, Code, Lightbulb, Target } from "lucide-react";

interface PortfolioHeroProps {
  stats?: {
    projects: number;
    satisfaction: number;
    years: number;
  };
}

export function PortfolioHero({ stats }: PortfolioHeroProps) {
  const scrollToPortfolio = () => {
    const portfolioSection = document.querySelector("section");
    portfolioSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">Nossos Projetos</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Portfólio de
            <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Soluções Inovadoras
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Conheça nossos cases de sucesso e projetos que transformaram ideias
            em soluções digitais de alto impacto
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <Target className="w-8 h-8 text-blue-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stats?.projects || 50}+
              </div>
              <div className="text-blue-200">Projetos Entregues</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <Lightbulb className="w-8 h-8 text-purple-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stats?.satisfaction || 100}%
              </div>
              <div className="text-blue-200">Satisfação dos Clientes</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
                <Code className="w-8 h-8 text-green-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {stats?.years || 5}+
              </div>
              <div className="text-blue-200">Anos de Experiência</div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToPortfolio}
            className="group inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            Explorar Projetos
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
    </section>
  );
}
