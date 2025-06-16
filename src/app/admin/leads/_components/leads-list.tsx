"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  MessageSquare,
  Filter,
  Search,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  deleteLeadAction,
  updateLeadStatusAction,
  type LeadWithRelations,
} from "@/actions/leads";
import { LeadStatus } from "@prisma/client";

interface LeadsListProps {
  leads: LeadWithRelations[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
  currentPage: number;
  filters: {
    search: string;
    status: string;
    source: string;
    startDate: string;
    endDate: string;
  };
}

const statusConfig = {
  NEW: { label: "Novo", variant: "default" as const, color: "bg-blue-500" },
  CONTACTED: {
    label: "Contatado",
    variant: "secondary" as const,
    color: "bg-yellow-500",
  },
  QUALIFIED: {
    label: "Qualificado",
    variant: "default" as const,
    color: "bg-purple-500",
  },
  PROPOSAL: {
    label: "Proposta",
    variant: "secondary" as const,
    color: "bg-orange-500",
  },
  WON: { label: "Ganho", variant: "default" as const, color: "bg-green-500" },
  LOST: {
    label: "Perdido",
    variant: "destructive" as const,
    color: "bg-red-500",
  },
};

export default function LeadsList({
  leads,
  pagination,
  currentPage,
  filters,
}: LeadsListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja deletar o lead "${name}"?`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const result = await deleteLeadAction(id);
      if (result.success) {
        toast.success(result.data?.message || "Lead deletado com sucesso!");
        // Recarregar a página
        window.location.reload();
      } else {
        toast.error(result.error || "Erro ao deletar lead");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      const result = await updateLeadStatusAction(id, status);
      if (result.success) {
        toast.success(result.data?.message || "Status atualizado com sucesso!");
        // Recarregar a página
        window.location.reload();
      } else {
        toast.error(result.error || "Erro ao atualizar status");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro interno. Tente novamente.");
    }
  };

  if (leads.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nenhum lead encontrado</h3>
          <p className="text-muted-foreground mb-4 text-center">
            {filters.search || filters.status || filters.source
              ? "Tente ajustar os filtros para encontrar leads."
              : "Aguarde os primeiros contatos através do seu site."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="GET" className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                name="search"
                placeholder="Buscar por nome, email, empresa..."
                defaultValue={filters.search}
                className="pl-10"
              />
            </div>{" "}
            <Select name="status" defaultValue={filters.status || "all"}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {Object.entries(statusConfig).map(([value, config]) => (
                  <SelectItem key={value} value={value}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="source"
              placeholder="Origem"
              defaultValue={filters.source}
              className="w-full sm:w-[150px]"
            />
            <Input
              name="startDate"
              type="date"
              defaultValue={filters.startDate}
              className="w-full sm:w-[150px]"
            />
            <Input
              name="endDate"
              type="date"
              defaultValue={filters.endDate}
              className="w-full sm:w-[150px]"
            />
            <Button type="submit" variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight truncate">
                    {lead.name}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {lead.email}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusConfig[lead.status].variant}>
                    {statusConfig[lead.status].label}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/leads/${lead.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/leads/${lead.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a href={`mailto:${lead.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Email
                        </a>
                      </DropdownMenuItem>
                      {lead.phone && (
                        <DropdownMenuItem asChild>
                          <a href={`tel:${lead.phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            Ligar
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(lead.id, lead.name)}
                        disabled={isDeleting === lead.id}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              {/* Informações de Contato */}
              <div className="space-y-2">
                {lead.phone && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {lead.phone}
                  </div>
                )}
                {lead.company && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building className="h-4 w-4 mr-2" />
                    {lead.company}
                  </div>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {lead.message}
                </p>
              </div>

              {/* Informações Adicionais */}
              <div className="space-y-2">
                {lead.budget && (
                  <div className="text-xs">
                    <span className="font-medium">Orçamento:</span>{" "}
                    {lead.budget}
                  </div>
                )}
                {lead.timeline && (
                  <div className="text-xs">
                    <span className="font-medium">Prazo:</span> {lead.timeline}
                  </div>
                )}
                {lead.source && (
                  <div className="text-xs">
                    <span className="font-medium">Origem:</span> {lead.source}
                  </div>
                )}
              </div>

              {/* Serviços de Interesse */}
              {lead.interestedServices.length > 0 && (
                <div>
                  <div className="text-xs font-medium mb-1">
                    Serviços de interesse:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lead.interestedServices
                      .slice(0, 2)
                      .map((service, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {service}
                        </Badge>
                      ))}
                    {lead.interestedServices.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{lead.interestedServices.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Atualizar Status */}
              <div>
                <Select
                  value={lead.status}
                  onValueChange={(value: LeadStatus) =>
                    handleStatusChange(lead.id, value)
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([value, config]) => (
                      <SelectItem key={value} value={value}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Metadados */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(new Date(lead.createdAt), {
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
            {pagination.total} leads)
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
