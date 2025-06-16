"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TechnologyIcon } from "@/components/ui/technology-icon";
import { getPublicTechnologies } from "@/actions/technologies";
import type { TechnologyWithRelations } from "@/actions/technologies";

interface PortfolioFiltersProps {
  onFilterChange?: (filters: {
    category?: string;
    technology?: string;
    status?: string;
  }) => void;
}

export function PortfolioFilters({ onFilterChange }: PortfolioFiltersProps) {
  const [technologies, setTechnologies] = useState<TechnologyWithRelations[]>(
    []
  );
  const [activeFilters, setActiveFilters] = useState({
    category: "all",
    technology: "all",
    status: "all",
  });

  useEffect(() => {
    async function loadTechnologies() {
      try {
        const data = await getPublicTechnologies();
        setTechnologies(data);
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
      }
    }
    loadTechnologies();
  }, []);

  const categories = [
    { value: "all", label: "Todos os Projetos" },
    { value: "web", label: "Desenvolvimento Web" },
    { value: "mobile", label: "Aplicativos Mobile" },
    { value: "system", label: "Sistemas Empresariais" },
    { value: "ecommerce", label: "E-commerce" },
  ];

  const projectStatuses = [
    { value: "all", label: "Todos os Status" },
    { value: "COMPLETED", label: "Concluídos" },
    { value: "IN_PROGRESS", label: "Em Andamento" },
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value,
    };
    setActiveFilters(newFilters);
    if (onFilterChange) {
      const filtersToSend = Object.entries(newFilters).reduce(
        (acc, [key, val]) => {
          if (val !== "all") {
            acc[key as keyof typeof acc] = val;
          }
          return acc;
        },
        {} as { category?: string; technology?: string; status?: string }
      );

      onFilterChange(filtersToSend);
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: "all",
      technology: "all",
      status: "all",
    };
    setActiveFilters(defaultFilters);
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value !== "all"
  );

  return (
    <div className="mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Filtrar Projetos
          </h2>
          <p className="text-gray-600">
            Encontre o projeto perfeito usando nossos filtros
          </p>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="mt-4 md:mt-0"
          >
            Limpar Filtros
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Categoria
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={
                  activeFilters.category === category.value
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => handleFilterChange("category", category.value)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Tecnologia
            </h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={
                  activeFilters.technology === "all" ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleFilterChange("technology", "all")}
                className="text-sm"
              >
                Todas as Tecnologias
              </Button>
              {technologies.slice(0, 8).map((tech) => (
                <Button
                  key={tech.id}
                  variant={
                    activeFilters.technology === tech.slug
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleFilterChange("technology", tech.slug)}
                  className="text-sm flex items-center gap-1"
                >
                  <TechnologyIcon 
                    tech={tech} 
                    size="sm" 
                    className="w-4 h-4"
                  />
                  {tech.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
          <div className="flex flex-wrap gap-2">
            {projectStatuses.map((status) => (
              <Button
                key={status.value}
                variant={
                  activeFilters.status === status.value ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleFilterChange("status", status.value)}
                className="text-sm"
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-sm font-semibold text-blue-900">
              Filtros Ativos:
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              if (value === "all") return null;

              let label = value;
              if (key === "category") {
                label =
                  categories.find((c) => c.value === value)?.label || value;
              } else if (key === "technology") {
                label =
                  technologies.find((t) => t.slug === value)?.name || value;
              } else if (key === "status") {
                label =
                  projectStatuses.find((s) => s.value === value)?.label ||
                  value;
              }

              return (
                <Badge
                  key={`${key}-${value}`}
                  variant="secondary"
                  className="text-blue-700 bg-blue-100"
                >
                  {label}
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
