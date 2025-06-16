"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, TrendingUp, Users } from "lucide-react";
import type { PortfolioPublic } from "@/types";

interface ProjectContentProps {
  project: PortfolioPublic;
}

export function ProjectContent({ project }: ProjectContentProps) {
  const formatContent = (content: string) => {
    // Converte quebras de linha em parágrafos
    return content.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="space-y-12">
      {/* Main Description */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Sobre o Projeto
        </h2>
        <div className="prose prose-lg max-w-none">
          {formatContent(project.description)}
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Challenge */}
        {project.challenge && (
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Target className="w-5 h-5" />
                Desafio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{project.challenge}</p>
            </CardContent>
          </Card>
        )}

        {/* Solution */}
        {project.solution && (
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Lightbulb className="w-5 h-5" />
                Solução
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{project.solution}</p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {project.results && (
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <TrendingUp className="w-5 h-5" />
                Resultados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{project.results}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Project Metrics */}
      {(project.teamSize || project.complexity) && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Métricas do Projeto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.teamSize && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Tamanho da Equipe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    {project.teamSize}
                  </p>
                  <p className="text-gray-600">pessoas envolvidas</p>
                </CardContent>
              </Card>
            )}

            {project.complexity && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Complexidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-purple-600 capitalize">
                    {project.complexity}
                  </p>
                  <p className="text-gray-600">nível de dificuldade</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8">
            {" "}
            <blockquote className="text-xl italic text-gray-700 mb-4">
              &ldquo;{project.testimonial}&rdquo;
            </blockquote>
            {project.clientName && (
              <cite className="text-gray-600 font-medium">
                - {project.clientName}
              </cite>
            )}
          </CardContent>
        </Card>
      )}

      {/* Service Connection */}
      {project.service && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Serviço Relacionado
          </h3>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.service.title}
                  </h4>
                  <p className="text-gray-600">
                    Este projeto foi desenvolvido como parte do nosso serviço de{" "}
                    {project.service.title.toLowerCase()}.
                  </p>
                </div>
                <div className="ml-6">
                  <a
                    href={`/services/${project.service.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Saiba mais →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
