"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

import {
  getFAQs,
  deleteFAQ,
  toggleFAQStatus,
  getFAQCategories,
  type FAQ,
} from "@/actions/faq";
import { PublicationStatus } from "@prisma/client";
import { toast } from "sonner";

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

export function FAQList() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<PublicationStatus | "all">(
    "all"
  );

  // Carregar FAQs e categorias
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [faqsData, categoriesData] = await Promise.all([
        getFAQs(),
        getFAQCategories(),
      ]);

      // Aplicar filtros
      let filteredFaqs = faqsData;

      if (searchTerm) {
        filteredFaqs = filteredFaqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (categoryFilter !== "all") {
        filteredFaqs = filteredFaqs.filter(
          (faq) => faq.category === categoryFilter
        );
      }

      if (statusFilter !== "all") {
        filteredFaqs = filteredFaqs.filter(
          (faq) => faq.status === statusFilter
        );
      }

      setFaqs(filteredFaqs);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao carregar FAQs:", error);
      toast.error("Erro ao carregar FAQs");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoryFilter, statusFilter]);

  // Carregar na inicialização
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Excluir FAQ
  const handleDelete = async () => {
    if (!faqToDelete) return;

    try {
      const result = await deleteFAQ(faqToDelete);
      if (result.success) {
        toast.success("FAQ excluído com sucesso");
        loadData();
      } else {
        toast.error(result.error || "Erro ao excluir FAQ");
      }
    } catch (error) {
      console.error("Erro ao excluir FAQ:", error);
      toast.error("Erro ao excluir FAQ");
    } finally {
      setDeleteDialogOpen(false);
      setFaqToDelete(null);
    }
  };

  // Alterar status
  const handleToggleStatus = async (
    id: string,
    currentStatus: PublicationStatus
  ) => {
    const newStatus =
      currentStatus === PublicationStatus.PUBLISHED
        ? PublicationStatus.DRAFT
        : PublicationStatus.PUBLISHED;

    try {
      const result = await toggleFAQStatus(id, newStatus);

      if (result.success) {
        toast.success(
          `FAQ ${
            newStatus === PublicationStatus.PUBLISHED
              ? "publicado"
              : "salvo como rascunho"
          }`
        );
        loadData();
      } else {
        toast.error(result.error || "Erro ao alterar status");
      }
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      toast.error("Erro ao alterar status");
    }
  };

  if (loading) {
    return <div>Carregando FAQs...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value={PublicationStatus.PUBLISHED}>
                    Publicado
                  </SelectItem>
                  <SelectItem value={PublicationStatus.DRAFT}>
                    Rascunho
                  </SelectItem>
                  <SelectItem value={PublicationStatus.ARCHIVED}>
                    Arquivado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de FAQs */}
      {faqs.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              Nenhum FAQ encontrado com os filtros aplicados.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {faq.question}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/faq/${faq.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleToggleStatus(faq.id, faq.status)
                            }
                          >
                            {faq.status === PublicationStatus.PUBLISHED ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Despublicar
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Publicar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setFaqToDelete(faq.id);
                              setDeleteDialogOpen(true);
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-muted-foreground line-clamp-3">
                      {faq.answer}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant={STATUS_VARIANTS[faq.status]}>
                        {STATUS_LABELS[faq.status]}
                      </Badge>

                      {faq.category && (
                        <Badge variant="outline">{faq.category}</Badge>
                      )}

                      {faq.order && (
                        <Badge variant="secondary">Ordem: {faq.order}</Badge>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Criado em{" "}
                      {format(new Date(faq.createdAt), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog de confirmação para exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este FAQ? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
