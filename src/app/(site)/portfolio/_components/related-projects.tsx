"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { getAllPortfolios } from "@/actions/portfolio";
import type { PortfolioPublic } from "@/types";

interface RelatedProjectsProps {
  currentProjectId: string;
}

export function RelatedProjects({ currentProjectId }: RelatedProjectsProps) {
  const [relatedProjects, setRelatedProjects] = useState<PortfolioPublic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRelatedProjects() {
      try {
        const allProjects = await getAllPortfolios();

        // Filtrar projeto atual e pegar até 3 projetos relacionados
        const filtered = allProjects
          .filter((project) => project.id !== currentProjectId)
          .slice(0, 3);

        setRelatedProjects(filtered);
      } catch (error) {
        console.error("Erro ao carregar projetos relacionados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRelatedProjects();
  }, [currentProjectId]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Outros Projetos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedProjects.length === 0) {
    return null;
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Data não informada";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Outros Projetos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça outros projetos que desenvolvemos para nossos clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProjects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Project Image */}{" "}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <ExternalLink className="w-12 h-12" />
                  </div>
                )}
              </div>
              {/* Content */}
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {project.shortDescription}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Project Info */}
                <div className="space-y-2 mb-4">
                  {project.clientName && (
                    <p className="text-sm text-gray-600">
                      Cliente: {project.clientName}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    {formatDate(project.endDate || project.startDate)}
                  </p>
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <Badge
                          key={tech.id}
                          variant="outline"
                          className="text-xs flex items-center gap-1"
                          style={{
                            borderColor: tech.color || undefined,
                            color: tech.color || undefined,
                          }}
                        >
                          <TechnologyIcon 
                            tech={tech} 
                            size="sm" 
                            className="w-3 h-3"
                          />
                          {tech.name}
                        </Badge>
                      ))}
                      {project.technologies.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button asChild size="sm" className="w-full">
                  <Link href={`/portfolio/${project.slug}`}>
                    Ver Detalhes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to see all projects */}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">
              Ver Todos os Projetos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
