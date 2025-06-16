"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ExternalLink, Github, Building, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PortfolioWithRelations } from "@/actions/portfolio";
import { getFeaturedPortfolios } from "@/actions/portfolio";

export default function PortfolioSection() {
  const [portfolios, setPortfolios] = useState<PortfolioWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolios() {
      try {
        const data = await getFeaturedPortfolios(4);
        setPortfolios(data);
      } catch (error) {
        console.error("Erro ao carregar portfólio:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolios();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projetos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos para nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (portfolios.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projetos
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {portfolios.map((portfolio) => (
            <Card
              key={portfolio.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md"
            >
              {" "}
              {/* Thumbnail */}
              {portfolio.thumbnail && (
                <div className="aspect-video overflow-hidden relative">
                  <OptimizedImage
                    src={portfolio.thumbnail}
                    alt={portfolio.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {portfolio.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {portfolio.shortDescription}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Cliente */}
                {portfolio.clientName && (
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Building className="h-4 w-4 mr-2" />
                    {portfolio.clientName}
                  </div>
                )}

                {/* Tecnologias */}
                {portfolio.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.technologies.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech.id}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                    {portfolio.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{portfolio.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {portfolio.liveUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={portfolio.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Projeto
                        </a>
                      </Button>
                    )}
                    {portfolio.repositoryUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={portfolio.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Código
                        </a>
                      </Button>
                    )}
                  </div>

                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/portfolio/${portfolio.slug}`}>
                      Detalhes
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/portfolio">
              Ver Todos os Projetos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
