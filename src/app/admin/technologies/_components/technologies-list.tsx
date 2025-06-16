"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  ExternalLink,
  Code,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  deleteTechnologyAction,
  type TechnologyWithRelations,
} from "@/actions/technologies";

interface TechnologiesListProps {
  technologies: TechnologyWithRelations[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  currentPage: number;
}

export default function TechnologiesList({
  technologies,
  pagination,
  currentPage,
}: TechnologiesListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja deletar a tecnologia "${name}"?`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const result = await deleteTechnologyAction(id);
      if (result.success) {
        toast.success(
          result.data?.message || "Tecnologia deletada com sucesso!"
        );
        // Recarregar a página
        window.location.reload();
      } else {
        toast.error(result.error || "Erro ao deletar tecnologia");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsDeleting(null);
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap = {
      FRONTEND: { label: "Frontend", variant: "default" as const },
      BACKEND: { label: "Backend", variant: "secondary" as const },
      DATABASE: { label: "Database", variant: "outline" as const },
      MOBILE: { label: "Mobile", variant: "default" as const },
      CLOUD: { label: "Cloud", variant: "secondary" as const },
      DEVOPS: { label: "DevOps", variant: "outline" as const },
      OTHER: { label: "Outras", variant: "secondary" as const },
    };

    const config = categoryMap[category as keyof typeof categoryMap] || {
      label: category,
      variant: "outline" as const,
    };

    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (technologies.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Code className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Nenhuma tecnologia encontrada
          </h3>
          <p className="text-muted-foreground mb-4 text-center">
            Comece adicionando as tecnologias utilizadas nos seus projetos.
          </p>
          <Link href="/admin/technologies/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Tecnologia
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid de Tecnologias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {technologies.map((technology) => (
          <Card
            key={technology.id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {/* Ícone da Tecnologia */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: technology.color || "#6b7280" }}
                  >
                    {" "}
                    {technology.icon && technology.icon.startsWith("http") ? (
                      <Image
                        src={technology.icon}
                        alt={technology.name}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        onError={(e) => {
                          // Fallback para inicial se imagem falhar
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = "none";
                          const nextElement =
                            target.nextElementSibling as HTMLSpanElement;
                          if (nextElement) {
                            nextElement.style.display = "block";
                          }
                        }}
                      />
                    ) : null}
                    <span
                      className={technology.icon ? "hidden" : ""}
                      style={{ display: technology.icon ? "none" : "block" }}
                    >
                      {technology.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight truncate">
                      {technology.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {getCategoryBadge(technology.category)}
                    </CardDescription>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/technologies/${technology.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/technologies/${technology.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    {technology.website && (
                      <DropdownMenuItem asChild>
                        <a
                          href={technology.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Site Oficial
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        handleDelete(technology.id, technology.name)
                      }
                      disabled={isDeleting === technology.id}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Descrição */}
              {technology.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {technology.description}
                </p>
              )}
              {/* Uso em Projetos */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usado em:</span>
                  <div className="flex space-x-2">
                    {technology.services.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {technology.services.length} serviço
                        {technology.services.length !== 1 ? "s" : ""}
                      </Badge>
                    )}{" "}
                    {technology.portfolioItems.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {technology.portfolioItems.length} projeto
                        {technology.portfolioItems.length !== 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>{" "}
              {/* Metadados */}
              <div className="flex items-center justify-end text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(technology.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          {pagination.hasPrev && (
            <Link href={`?page=${currentPage - 1}`}>
              <Button variant="outline">Anterior</Button>
            </Link>
          )}

          <span className="text-sm text-muted-foreground">
            Página {pagination.page} de {pagination.totalPages} (
            {pagination.total} tecnologias)
          </span>

          {pagination.hasNext && (
            <Link href={`?page=${currentPage + 1}`}>
              <Button variant="outline">Próxima</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
