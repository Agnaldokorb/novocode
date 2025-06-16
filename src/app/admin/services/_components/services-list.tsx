"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Globe,
  MoreHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getServicesSerialized,
  deleteService,
  toggleServiceFeatured,
  toggleServiceStatus,
} from "@/actions/services";
import { ServiceType, PublicationStatus } from "@prisma/client";
import type { SerializedServiceWithTechnologies } from "@/types";
import { toast } from "sonner";

const SERVICE_TYPE_LABELS = {
  [ServiceType.DEVELOPMENT]: "Desenvolvimento",
  [ServiceType.CONSULTING]: "Consultoria",
  [ServiceType.MAINTENANCE]: "Manutenção",
  [ServiceType.AUTOMATION]: "Automação",
  [ServiceType.MOBILE]: "Mobile",
  [ServiceType.WEB]: "Web",
  [ServiceType.API]: "API",
  [ServiceType.INTEGRATION]: "Integração",
};

const STATUS_LABELS = {
  [PublicationStatus.DRAFT]: "Rascunho",
  [PublicationStatus.PUBLISHED]: "Publicado",
  [PublicationStatus.ARCHIVED]: "Arquivado",
};

const STATUS_VARIANTS = {
  [PublicationStatus.DRAFT]: "secondary",
  [PublicationStatus.PUBLISHED]: "default",
  [PublicationStatus.ARCHIVED]: "outline",
} as const;

export function ServicesList() {
  const [services, setServices] = useState<SerializedServiceWithTechnologies[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<ServiceType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<PublicationStatus | "all">(
    "all"
  );

  // Carregar serviços
  const loadServices = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {
        ...(typeFilter !== "all" && { type: typeFilter }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
      };

      const result = await getServicesSerialized(filters);
      setServices(result.services);
    } catch {
      toast.error("Erro ao carregar serviços");
    } finally {
      setLoading(false);
    }
  }, [typeFilter, statusFilter, searchTerm]);

  // Carregar na inicialização
  useEffect(() => {
    loadServices();
  }, [loadServices]);

  // Excluir serviço
  const handleDelete = async () => {
    if (!serviceToDelete) return;

    try {
      const result = await deleteService(serviceToDelete);
      if (result.success) {
        toast.success("Serviço excluído com sucesso");
        loadServices();
      } else {
        toast.error(result.error || "Erro ao excluir serviço");
      }
    } catch {
      toast.error("Erro ao excluir serviço");
    } finally {
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  // Alternar destaque
  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const result = await toggleServiceFeatured(id, !featured);
      if (result.success) {
        toast.success(
          `Serviço ${!featured ? "destacado" : "removido dos destaques"}`
        );
        loadServices();
      } else {
        toast.error(result.error || "Erro ao alterar destaque");
      }
    } catch {
      toast.error("Erro ao alterar destaque");
    }
  };

  // Alternar status
  const handleToggleStatus = async (
    id: string,
    currentStatus: PublicationStatus
  ) => {
    const newStatus =
      currentStatus === PublicationStatus.PUBLISHED
        ? PublicationStatus.DRAFT
        : PublicationStatus.PUBLISHED;

    try {
      const result = await toggleServiceStatus(id, newStatus);

      if (result.success) {
        toast.success(
          `Serviço ${
            newStatus === PublicationStatus.PUBLISHED
              ? "publicado"
              : "salvo como rascunho"
          }`
        );
        loadServices();
      } else {
        toast.error(result.error || "Erro ao alterar status");
      }
    } catch {
      toast.error("Erro ao alterar status");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />

            <Select
              value={typeFilter}
              onValueChange={(value) =>
                setTypeFilter(value as ServiceType | "all")
              }
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                {Object.entries(SERVICE_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as PublicationStatus | "all")
              }
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={loadServices} variant="outline">
              Filtrar
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de serviços */}
      <div className="space-y-4">
        {services.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Nenhum serviço encontrado</p>
              <Button asChild className="mt-4">
                <Link href="/admin/services/new">Criar primeiro serviço</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      {service.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>

                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant={
                          STATUS_VARIANTS[service.status as PublicationStatus]
                        }
                      >
                        {STATUS_LABELS[service.status as PublicationStatus]}
                      </Badge>

                      <Badge variant="outline">
                        {SERVICE_TYPE_LABELS[service.type as ServiceType]}
                      </Badge>

                      {service.price && (
                        <Badge variant="secondary">
                          R${" "}
                          {service.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </Badge>
                      )}

                      {service.technologies.length > 0 && (
                        <Badge variant="outline">
                          {service.technologies.length} tecnologia
                          {service.technologies.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Criado em{" "}
                      {format(new Date(service.createdAt), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                      {service.createdByUser?.name &&
                        ` por ${service.createdByUser.name}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleToggleFeatured(service.id, service.featured)
                      }
                      title={service.featured ? "Remover destaque" : "Destacar"}
                    >
                      {service.featured ? (
                        <StarOff className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleToggleStatus(service.id, service.status)
                      }
                      title={
                        service.status === PublicationStatus.PUBLISHED
                          ? "Despublicar"
                          : "Publicar"
                      }
                    >
                      {service.status === PublicationStatus.PUBLISHED ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/services/${service.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link
                            href={`/services/${service.slug}`}
                            target="_blank"
                          >
                            <Globe className="mr-2 h-4 w-4" />
                            Ver no site
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => {
                            setServiceToDelete(service.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este serviço? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
