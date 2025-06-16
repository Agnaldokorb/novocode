"use client";

import { useState, useEffect, useCallback } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  status: PublicationStatus;
  featured: boolean;
  publishedAt: Date | string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
  thumbnail: string | null;
  views: number;
  readingTime: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  createdBy: string;
  updatedBy: string | null;
  createdByUser: {
    name: string | null;
    email: string;
  };
  updatedByUser: {
    name: string | null;
    email: string;
  } | null;
}

interface BlogCategory {
  name: string;
  count: number;
}
import Link from "next/link";
import {
  Edit,
  Trash2,
  Copy,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Globe,
  MoreHorizontal,
  Calendar,
  User,
  Clock,
  Hash,
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
  getBlogPosts,
  deleteBlogPost,
  toggleBlogPostFeatured,
  updateBlogPostStatus,
  duplicateBlogPost,
  getBlogCategories,
} from "@/actions/blog";
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

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<PublicationStatus | "all">(
    "all"
  );
  // Carregar posts e categorias
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const filters = {
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
      };

      const [postsResult, categoriesResult] = await Promise.all([
        getBlogPosts(filters),
        getBlogCategories(),
      ]);
      if (postsResult.success && postsResult.data) {
        setPosts(postsResult.data);
      }
      if (categoriesResult.success && categoriesResult.data) {
        setCategories(categoriesResult.data);
      }
    } catch {
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, statusFilter, searchTerm]);

  // Carregar na inicialização
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Excluir post
  const handleDelete = async () => {
    if (!postToDelete) return;

    try {
      const result = await deleteBlogPost(postToDelete);

      if (result.success) {
        toast.success("Post excluído com sucesso");
        loadData();
      } else {
        toast.error(result.error || "Erro ao excluir post");
      }
    } catch {
      toast.error("Erro ao excluir post");
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  // Duplicar post
  const handleDuplicate = async (id: string) => {
    try {
      const result = await duplicateBlogPost(id);

      if (result.success) {
        toast.success("Post duplicado com sucesso");
        loadData();
      } else {
        toast.error(result.error || "Erro ao duplicar post");
      }
    } catch {
      toast.error("Erro ao duplicar post");
    }
  };

  // Alternar destaque
  const handleToggleFeatured = async (id: string) => {
    try {
      const result = await toggleBlogPostFeatured(id);

      if (result.success) {
        const post = posts.find((p) => p.id === id);
        toast.success(
          `Post ${post?.featured ? "removido dos destaques" : "destacado"}`
        );
        loadData();
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
      const result = await updateBlogPostStatus(id, newStatus);

      if (result.success) {
        toast.success(
          `Post ${
            newStatus === PublicationStatus.PUBLISHED
              ? "publicado"
              : "salvo como rascunho"
          }`
        );
        loadData();
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
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name} ({category.count})
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

            <Button onClick={loadData} variant="outline">
              Filtrar
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Nenhum post encontrado</p>
              <Button asChild className="mt-4">
                <Link href="/admin/blog/new">Criar primeiro post</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      {post.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>

                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge
                        variant={
                          STATUS_VARIANTS[post.status as PublicationStatus]
                        }
                      >
                        {STATUS_LABELS[post.status as PublicationStatus]}
                      </Badge>

                      <Badge variant="outline">{post.category}</Badge>

                      {post.readingTime && (
                        <Badge variant="secondary">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readingTime} min
                        </Badge>
                      )}

                      {post.views > 0 && (
                        <Badge variant="secondary">
                          <Eye className="mr-1 h-3 w-3" />
                          {post.views} visualizações
                        </Badge>
                      )}

                      {post.tags.length > 0 && (
                        <Badge variant="outline">
                          <Hash className="mr-1 h-3 w-3" />
                          {post.tags.length} tag
                          {post.tags.length !== 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>
                          Criado em{" "}
                          {format(new Date(post.createdAt), "dd/MM/yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                        {post.createdByUser?.name && (
                          <>
                            <User className="h-3 w-3" />
                            <span>por {post.createdByUser.name}</span>
                          </>
                        )}
                      </div>

                      {post.publishedAt && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-3 w-3" />
                          <span>
                            Publicado em{" "}
                            {format(new Date(post.publishedAt), "dd/MM/yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleToggleFeatured(post.id)}
                      title={post.featured ? "Remover destaque" : "Destacar"}
                    >
                      {post.featured ? (
                        <StarOff className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleToggleStatus(post.id, post.status)}
                      title={
                        post.status === PublicationStatus.PUBLISHED
                          ? "Despublicar"
                          : "Publicar"
                      }
                    >
                      {post.status === PublicationStatus.PUBLISHED ? (
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
                          <Link href={`/admin/blog/${post.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDuplicate(post.id)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Globe className="mr-2 h-4 w-4" />
                            Ver no site
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => {
                            setPostToDelete(post.id);
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
              Tem certeza que deseja excluir este post? Esta ação não pode ser
              desfeita.
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
