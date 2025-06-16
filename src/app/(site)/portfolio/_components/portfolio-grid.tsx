"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Calendar, ExternalLink, User, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { getAllPortfolios } from "@/actions/portfolio";
import type { PortfolioPublic } from "@/types";

interface PortfolioGridProps {
  filters?: {
    category?: string;
    technology?: string;
    status?: string;
  };
}

export function PortfolioGrid({ filters = {} }: PortfolioGridProps) {
  const [portfolios, setPortfolios] = useState<PortfolioPublic[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<
    PortfolioPublic[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolios() {
      try {
        setLoading(true);
        const data = await getAllPortfolios();
        setPortfolios(data);
        setFilteredPortfolios(data);
      } catch (error) {
        console.error("Erro ao carregar portfólio:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolios();
  }, []);
  useEffect(() => {
    if (portfolios.length === 0) return;

    let filtered = [...portfolios];

    // Filtro por categoria (baseado no tipo de projeto)
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((portfolio) => {
        const title = portfolio.title.toLowerCase();
        switch (filters.category) {
          case "web":
            return (
              title.includes("site") ||
              title.includes("web") ||
              title.includes("sistema")
            );
          case "mobile":
            return title.includes("app") || title.includes("mobile");
          case "system":
            return (
              title.includes("sistema") ||
              title.includes("gestão") ||
              title.includes("erp")
            );
          case "ecommerce":
            return (
              title.includes("ecommerce") ||
              title.includes("e-commerce") ||
              title.includes("loja")
            );
          default:
            return true;
        }
      });
    }

    // Filtro por tecnologia
    if (filters.technology && filters.technology !== "all") {
      filtered = filtered.filter((portfolio) =>
        portfolio.technologies?.some(
          (tech) =>
            tech.id === filters.technology || tech.name === filters.technology
        )
      );
    }

    // Filtro por status
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(
        (portfolio) => portfolio.status === filters.status
      );
    }

    setFilteredPortfolios(filtered);
  }, [portfolios, filters.category, filters.technology, filters.status]);

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Data não informada";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
      case "IN_PROGRESS":
        return (
          <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>
        );
      case "PLANNING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Planejamento</Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredPortfolios.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Nenhum projeto encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Não encontramos projetos com os filtros selecionados. Tente ajustar
            os filtros ou remover algumas opções.
          </p>
          <Button variant="outline">Limpar Filtros</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results Count */}
      <div className="mb-8">
        <p className="text-gray-600">
          Mostrando{" "}
          <span className="font-semibold">{filteredPortfolios.length}</span>{" "}
          projeto{filteredPortfolios.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPortfolios.map((portfolio) => (
          <Card
            key={portfolio.id}
            className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Project Image */}{" "}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
              {portfolio.thumbnail ? (
                <OptimizedImage
                  src={portfolio.thumbnail}
                  alt={portfolio.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <ExternalLink className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">Projeto</p>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {getStatusBadge(portfolio.status)}
              </div>

              {/* Featured Badge */}
              {portfolio.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 text-yellow-900">
                    Destaque
                  </Badge>
                </div>
              )}
            </div>
            {/* Content */}
            <CardHeader className="pb-3">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {portfolio.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {portfolio.shortDescription}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Project Info */}
              <div className="space-y-3 mb-4">
                {portfolio.clientName && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{portfolio.clientName}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(portfolio.endDate || portfolio.startDate)}
                  </span>
                </div>

                {portfolio.duration && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{portfolio.duration}</span>
                  </div>
                )}
              </div>

              {/* Technologies */}
              {portfolio.technologies && portfolio.technologies.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {portfolio.technologies.slice(0, 3).map((tech) => (
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
                    {portfolio.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{portfolio.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button asChild className="flex-1" size="sm">
                  <Link href={`/portfolio/${portfolio.slug}`}>
                    Ver Detalhes
                  </Link>
                </Button>

                {portfolio.liveUrl && (
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={portfolio.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
