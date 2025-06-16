"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { TechnologyWithRelations } from "@/actions/technologies";
import { TechnologyCategory } from "@prisma/client";
import { TechnologyIcon } from "@/components/ui/technology-icon";

interface TechnologiesGridProps {
  technologies: TechnologyWithRelations[];
  technologiesByCategory: Record<TechnologyCategory, TechnologyWithRelations[]>;
  categoryConfig: Record<
    string,
    {
      icon?: React.ComponentType<{ className?: string }>;
      color?: string;
      label?: string;
      description?: string;
    }
  >;
  categories: { value: string; label: string }[];
}

export function TechnologiesGrid({
  technologies,
  technologiesByCategory,
  categoryConfig,
  categories,
}: TechnologiesGridProps) {
  return (
    <div className="space-y-16">
      {/* Technologies by Category */}
      {categories.map((category) => {
        const categoryTechnologies =
          technologiesByCategory[category.value as TechnologyCategory] || [];

        if (categoryTechnologies.length === 0) return null;

        const config = categoryConfig[category.value];
        const IconComponent = config?.icon;

        return (
          <div key={category.value} className="space-y-8">
            {/* Category Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                {IconComponent && (
                  <div
                    className={`w-12 h-12 ${config.color} rounded-full flex items-center justify-center`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {config?.label || category.label}
                  </h3>
                  <p className="text-gray-600">{config?.description}</p>
                </div>
              </div>
            </div>

            {/* Technologies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTechnologies.map((tech) => (
                <Card
                  key={tech.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    {/* Icon & Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: tech.color
                            ? `${tech.color}20`
                            : "#f3f4f6",
                        }}
                      >
                        <TechnologyIcon tech={tech} size="sm" />
                      </div>

                      {/* Name */}
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {tech.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {config?.label || tech.category}
                        </Badge>
                      </div>
                    </div>
                    {/* Description */}
                    {tech.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {tech.description}
                      </p>
                    )}{" "}
                    {/* Usage Count */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {tech.services.length + tech.portfolioItems.length}{" "}
                        projetos
                      </span>
                      {tech.website && (
                        <Link
                          href={tech.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Docs
                        </Link>
                      )}
                    </div>
                    {/* Related Services/Portfolio */}
                    {(tech.services.length > 0 ||
                      tech.portfolioItems.length > 0) && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Usado em:</p>
                        <div className="flex flex-wrap gap-1">
                          {tech.services.slice(0, 2).map((service) => (
                            <Link
                              key={service.id}
                              href={`/servicos/${service.slug}`}
                              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100"
                            >
                              {service.title}
                            </Link>
                          ))}
                          {tech.portfolioItems.slice(0, 2).map((item) => (
                            <Link
                              key={item.id}
                              href={`/portfolio/${item.slug}`}
                              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100"
                            >
                              {item.title}
                            </Link>
                          ))}
                          {tech.services.length + tech.portfolioItems.length >
                            4 && (
                            <span className="text-xs text-gray-500 px-2 py-1">
                              +
                              {tech.services.length +
                                tech.portfolioItems.length -
                                4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* Technologies sem categoria definida */}
      {technologies.filter(
        (tech) =>
          !Object.values(TechnologyCategory).includes(
            tech.category as TechnologyCategory
          )
      ).length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Outras Tecnologias
            </h3>
            <p className="text-gray-600">Ferramentas e tecnologias diversas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies
              .filter(
                (tech) =>
                  !Object.values(TechnologyCategory).includes(
                    tech.category as TechnologyCategory
                  )
              )
              .map((tech) => (
                <Card
                  key={tech.id}
                  className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <TechnologyIcon tech={tech} size="sm" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {tech.name}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {tech.category}
                        </Badge>
                      </div>
                    </div>
                    {tech.description && (
                      <p className="text-gray-600 text-sm mb-4">
                        {tech.description}
                      </p>
                    )}{" "}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {tech.services.length + tech.portfolioItems.length}{" "}
                        projetos
                      </span>
                      {tech.website && (
                        <Link
                          href={tech.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Docs
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
