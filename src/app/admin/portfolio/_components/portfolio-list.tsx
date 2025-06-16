"use client";

import { useState } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Star,
  Copy,
  ExternalLink,
  Calendar,
  User,
  Building,
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
  deletePortfolioAction,
  togglePortfolioFeaturedAction,
  duplicatePortfolioAction,
  type PortfolioWithRelations,
} from "@/actions/portfolio";

interface PortfolioListProps {
  portfolios: PortfolioWithRelations[];
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

export default function PortfolioList({
  portfolios,
  pagination,
  currentPage,
}: PortfolioListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);
  const [isDuplicating, setIsDuplicating] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja deletar o projeto "${title}"?`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const result = await deletePortfolioAction(id);
      if (result.success) {
        toast.success(result.data?.message || "Projeto deletado com sucesso!");
        // Recarregar a página
        window.location.reload();
      } else {
        toast.error(result.error || "Erro ao deletar projeto");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsDeleting(null);
    }
  };
  const handleToggleFeatured = async (id: string) => {
    setIsToggling(id);
    try {
      const result = await togglePortfolioFeaturedAction(id);
      if (result.success) {
        toast.success(result.data?.message || "Status atualizado!");
        // Recarregar a página
        window.location.reload();
      } else {
        toast.error(result.error || "Erro ao atualizar status");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsToggling(null);
    }
  };
  const handleDuplicate = async (id: string) => {
    setIsDuplicating(id);
    try {
      const result = await duplicatePortfolioAction(id);
      if (result.success) {
        toast.success(result.data?.message || "Projeto duplicado com sucesso!");
        // Recarregar a página
        window.location.reload();
      } else {
        toast.error(result.error || "Erro ao duplicar projeto");
      }
    } catch (error) {
      console.error("Erro ao duplicar:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsDuplicating(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PLANNING: { label: "Planejamento", variant: "secondary" as const },
      DEVELOPMENT: { label: "Desenvolvimento", variant: "default" as const },
      TESTING: { label: "Testes", variant: "outline" as const },
      DEPLOYED: { label: "Implantado", variant: "default" as const },
      COMPLETED: { label: "Concluído", variant: "default" as const },
      PAUSED: { label: "Pausado", variant: "secondary" as const },
      CANCELLED: { label: "Cancelado", variant: "destructive" as const },
    };

    const config = statusMap[status as keyof typeof statusMap] || {
      label: status,
      variant: "outline" as const,
    };

    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPublicationStatusBadge = (status: string) => {
    const statusMap = {
      DRAFT: { label: "Rascunho", variant: "secondary" as const },
      PUBLISHED: { label: "Publicado", variant: "default" as const },
      ARCHIVED: { label: "Arquivado", variant: "outline" as const },
    };

    const config = statusMap[status as keyof typeof statusMap] || {
      label: status,
      variant: "outline" as const,
    };

    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (portfolios.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Building className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Nenhum projeto encontrado
          </h3>
          <p className="text-muted-foreground mb-4 text-center">
            Comece criando seu primeiro projeto para o portfólio.
          </p>
          <Link href="/admin/portfolio/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} className="overflow-hidden">
            {" "}
            {/* Imagem do Projeto */}
            {portfolio.thumbnail && (
              <div className="aspect-video relative">
                <OptimizedImage
                  src={portfolio.thumbnail}
                  alt={portfolio.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                {portfolio.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="bg-yellow-500">
                      <Star className="h-3 w-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                )}
              </div>
            )}
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight truncate">
                    {portfolio.title}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {portfolio.shortDescription}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/portfolio/${portfolio.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/portfolio/${portfolio.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    {portfolio.liveUrl && (
                      <DropdownMenuItem asChild>
                        <a
                          href={portfolio.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Online
                        </a>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />{" "}
                    <DropdownMenuItem
                      onClick={() => handleToggleFeatured(portfolio.id)}
                      disabled={isToggling === portfolio.id}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      {portfolio.featured ? "Remover Destaque" : "Destacar"}
                    </DropdownMenuItem>{" "}
                    <DropdownMenuItem
                      onClick={() => handleDuplicate(portfolio.id)}
                      disabled={isDuplicating === portfolio.id}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        handleDelete(portfolio.id, portfolio.title)
                      }
                      disabled={isDeleting === portfolio.id}
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
              {/* Status e Publicação */}
              <div className="flex gap-2 mb-3">
                {getStatusBadge(portfolio.status)}
                {getPublicationStatusBadge(portfolio.publicationStatus)}
              </div>

              {/* Cliente */}
              {portfolio.clientName && (
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Building className="h-4 w-4 mr-1" />
                  {portfolio.clientName}
                </div>
              )}

              {/* Serviço Relacionado */}
              {portfolio.service && (
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Serviço:</span>{" "}
                  {portfolio.service.title}
                </div>
              )}

              {/* Tecnologias */}
              {portfolio.technologies.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {portfolio.technologies.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech.id}
                        variant="outline"
                        className="text-xs"
                      >
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

              {/* Metadados */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {portfolio.createdByUser.name}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(portfolio.createdAt), {
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
            {pagination.total} projetos)
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
