"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicTechnologies } from "@/actions/technologies";
import type { TechnologyWithRelations } from "@/actions/technologies";
import { TechnologyCategory } from "@prisma/client";
import { TechnologyIcon } from "@/components/ui/technology-icon";

// Mapeamento de categorias para exibição
const categoryNames = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  MOBILE: "Mobile",
  CLOUD: "Cloud & DevOps",
  DEVOPS: "DevOps",
  DATABASE: "Banco de Dados",
  TESTING: "Testes",
  DESIGN: "Design",
  OTHER: "Outras",
} as const;

export function TechnologiesSection() {
  const [technologies, setTechnologies] = useState<TechnologyWithRelations[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTechnologies() {
      try {
        const data = await getPublicTechnologies();
        setTechnologies(data);
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTechnologies();
  }, []);

  // Agrupar tecnologias por categoria
  const technologiesByCategory = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<TechnologyCategory, TechnologyWithRelations[]>);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossas{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tecnologias
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Utilizamos as mais modernas tecnologias do mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Se não há tecnologias, não renderiza a seção
  if (technologies.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossas{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tecnologias
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Utilizamos as mais modernas tecnologias do mercado para criar
            soluções eficientes e escaláveis
          </p>
        </div>{" "}
        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(technologiesByCategory).map(([category, techs]) => (
            <Card
              key={category}
              className="group hover:shadow-xl transition-all duration-300 border-l-4 hover:border-l-blue-500"
              style={{
                borderLeftColor: techs[0]?.color || "#e5e7eb",
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {categoryNames[category as keyof typeof categoryNames] ||
                    category}
                </h3>
                <div className="space-y-3">
                  {techs.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group/tech"
                    >
                      <div className="flex-shrink-0 group-hover/tech:scale-110 transition-transform">
                        <TechnologyIcon tech={tech} size="sm" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-semibold text-gray-900 group-hover/tech:text-blue-600 transition-colors">
                          {tech.name}
                        </div>
                        {tech.description && (
                          <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {tech.description}
                          </div>
                        )}
                      </div>
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: tech.color || "#e5e7eb",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Skills info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">
            Estamos sempre atualizados com as últimas tendências e melhores
            práticas do desenvolvimento
          </p>
        </div>
      </div>
    </section>
  );
}
