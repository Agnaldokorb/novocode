"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

import { createBlogPost, updateBlogPost } from "@/actions/blog";
import { type BlogPostFormData } from "@/lib/schemas";
import { PublicationStatus } from "@prisma/client";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { UPLOAD_CONFIGS } from "@/lib/storage";

type FormData = BlogPostFormData;

interface BlogFormProps {
  defaultValues?: Partial<BlogPostFormData>;
  onSuccess?: () => void;
  isEditing?: boolean;
  postId?: string;
}

const COMMON_CATEGORIES = [
  "Tecnologia",
  "Desenvolvimento Web",
  "Mobile",
  "Inteligência Artificial",
  "DevOps",
  "Design",
  "Gestão de Projetos",
  "Carreira",
  "Tutoriais",
  "Notícias",
];

export function BlogForm({
  defaultValues,
  onSuccess,
  isEditing = false,
  postId,
}: BlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<string | undefined>(
    defaultValues?.thumbnail || undefined
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      status: PublicationStatus.DRAFT,
      featured: false,
      ...defaultValues,
    },
  });

  const watchedValues = watch();

  // Função para adicionar tag
  const addTag = () => {
    if (newTag.trim() && !watchedValues.tags?.includes(newTag.trim())) {
      const currentTags = watchedValues.tags || [];
      setValue("tags", [...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Função para remover tag
  const removeTag = (tagToRemove: string) => {
    const currentTags = watchedValues.tags || [];
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  // Função para adicionar palavra-chave
  const addKeyword = () => {
    if (
      newKeyword.trim() &&
      !watchedValues.keywords?.includes(newKeyword.trim())
    ) {
      const currentKeywords = watchedValues.keywords || [];
      setValue("keywords", [...currentKeywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  // Função para remover palavra-chave
  const removeKeyword = (keywordToRemove: string) => {
    const currentKeywords = watchedValues.keywords || [];
    setValue(
      "keywords",
      currentKeywords.filter((keyword) => keyword !== keywordToRemove)
    );
  };

  // Função para gerar slug automaticamente
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Atualizar slug quando o título mudar
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!isEditing || !watchedValues.slug) {
      setValue("slug", generateSlug(title));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const formData: BlogPostFormData = {
        ...data,
        thumbnail,
        readingTime: data.readingTime || undefined,
      };

      let result;
      if (isEditing && postId) {
        result = await updateBlogPost(postId, formData);
      } else {
        result = await createBlogPost(formData);
      }

      if (result.success) {
        toast.success(
          `Post ${isEditing ? "atualizado" : "criado"} com sucesso!`
        );
        onSuccess?.();
      } else {
        toast.error(
          result.error || `Erro ao ${isEditing ? "atualizar" : "criar"} post`
        );
      }
    } catch {
      toast.error(`Erro ao ${isEditing ? "atualizar" : "criar"} post`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Defina o título, slug e conteúdo do post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="Digite o título do post"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  placeholder="slug-do-post"
                />
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo *</Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt")}
                  placeholder="Breve descrição do post (será exibida na listagem)"
                  rows={3}
                />
                {errors.excerpt && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.excerpt.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  {...register("content")}
                  placeholder="Escreva o conteúdo do post em Markdown..."
                  rows={15}
                  className="font-mono"
                />
                {errors.content && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.content.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO e Metadados</CardTitle>
              <CardDescription>
                Otimize o post para motores de busca
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input
                  id="metaTitle"
                  {...register("metaTitle")}
                  placeholder="Título para SEO (deixe vazio para usar o título do post)"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Descrição</Label>
                <Textarea
                  id="metaDescription"
                  {...register("metaDescription")}
                  placeholder="Descrição para SEO"
                  rows={2}
                />
              </div>

              {/* Palavras-chave */}
              <div>
                <Label>Palavras-chave</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Adicionar palavra-chave"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                  />
                  <Button type="button" onClick={addKeyword} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.keywords?.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral */}
        <div className="space-y-6">
          {/* Publicação */}
          <Card>
            <CardHeader>
              <CardTitle>Publicação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={watchedValues.status || PublicationStatus.DRAFT}
                  onValueChange={(value) =>
                    setValue("status", value as PublicationStatus)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PublicationStatus.DRAFT}>
                      Rascunho
                    </SelectItem>
                    <SelectItem value={PublicationStatus.PUBLISHED}>
                      Publicado
                    </SelectItem>
                    <SelectItem value={PublicationStatus.ARCHIVED}>
                      Arquivado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={watchedValues.featured || false}
                  onCheckedChange={(checked) => setValue("featured", !!checked)}
                />
                <Label htmlFor="featured">Post em destaque</Label>
              </div>

              {watchedValues.status === PublicationStatus.PUBLISHED && (
                <div>
                  <Label htmlFor="publishedAt">Data de publicação</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    {...register("publishedAt")}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          {/* Categorização */}
          <Card>
            <CardHeader>
              <CardTitle>Categorização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={watchedValues.category || ""}
                  onValueChange={(value) => {
                    if (value === "custom") {
                      setValue("category", customCategory);
                    } else {
                      setValue("category", value);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMMON_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">
                      Categoria personalizada...
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {watchedValues.category === "custom" && (
                <div>
                  <Label htmlFor="customCategory">
                    Categoria personalizada
                  </Label>
                  <Input
                    id="customCategory"
                    value={customCategory}
                    onChange={(e) => {
                      setCustomCategory(e.target.value);
                      setValue("category", e.target.value);
                    }}
                    placeholder="Digite a categoria"
                  />
                </div>
              )}

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Adicionar tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.tags?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>{" "}
          {/* Mídia */}
          <Card>
            <CardHeader>
              <CardTitle>Mídia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {" "}
              <ImageUpload
                value={thumbnail}
                onChange={(url) => setThumbnail(url || undefined)}
                uploadConfig={UPLOAD_CONFIGS.blog}
                label="Imagem de Capa"
                placeholder="Selecione uma imagem para o post"
              />
              <p className="text-xs text-muted-foreground">
                A imagem de capa será exibida na listagem de posts e nas redes
                sociais
              </p>
            </CardContent>
          </Card>
          {/* Configurações */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="readingTime">Tempo de leitura (minutos)</Label>
                <Input
                  id="readingTime"
                  type="number"
                  min="1"
                  {...register("readingTime", { valueAsNumber: true })}
                  placeholder="Calculado automaticamente se vazio"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botões de ação */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}{" "}
              Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
