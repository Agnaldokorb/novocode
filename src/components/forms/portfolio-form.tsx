"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { type CreatePortfolioInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createPortfolioAction,
  updatePortfolioAction,
} from "@/actions/portfolio";
import { getServicesAction } from "@/actions/services";
import { getTechnologiesForSelectAction } from "@/actions/technologies";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { ProjectStatus } from "@prisma/client";
import type { PortfolioWithRelations } from "@/actions/portfolio";
import { ImageUpload } from "@/components/ui/image-upload";
import { GalleryUpload } from "@/components/ui/gallery-upload";
import { UPLOAD_CONFIGS } from "@/lib/storage";

interface PortfolioFormProps {
  portfolio?: PortfolioWithRelations;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PortfolioForm({
  portfolio,
  onSuccess,
  onCancel,
}: PortfolioFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);  const [services, setServices] = useState<
    { id: string; title: string; slug: string; price?: number | null }[]
  >([]);
  const [technologies, setTechnologies] = useState<
    {
      id: string;
      name: string;
      category: string;
      icon?: string | null;
      color?: string | null;
    }[]
  >([]);
  const [gallery, setGallery] = useState<string[]>(portfolio?.gallery || []);
  const [keywords, setKeywords] = useState<string[]>(portfolio?.keywords || []);
  const [thumbnail, setThumbnail] = useState<string | undefined>(
    portfolio?.thumbnail || undefined
  );
  const [clientLogo, setClientLogo] = useState<string | undefined>(
    portfolio?.clientLogo || undefined
  );

  const isEditing = !!portfolio;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreatePortfolioInput>({
    defaultValues: {
      title: portfolio?.title || "",
      shortDescription: portfolio?.shortDescription || "",
      description: portfolio?.description || "",
      challenge: portfolio?.challenge || "",
      solution: portfolio?.solution || "",
      results: portfolio?.results || "",
      serviceId: portfolio?.serviceId || undefined,
      status: portfolio?.status || "COMPLETED",
      startDate: portfolio?.startDate || undefined,
      endDate: portfolio?.endDate || undefined,
      clientName: portfolio?.clientName || "",
      clientLogo: portfolio?.clientLogo || "",
      clientWebsite: portfolio?.clientWebsite || "",
      testimonial: portfolio?.testimonial || "",
      thumbnail: portfolio?.thumbnail || "",
      gallery: portfolio?.gallery || [],
      liveUrl: portfolio?.liveUrl || "",
      repositoryUrl: portfolio?.repositoryUrl || "",
      technologyIds: portfolio?.technologies?.map((t) => t.id) || [],
      teamSize: portfolio?.teamSize || undefined,
      duration: portfolio?.duration || "",
      complexity: portfolio?.complexity || "",
      metaTitle: portfolio?.metaTitle || "",
      metaDescription: portfolio?.metaDescription || "",
      keywords: portfolio?.keywords || [],
      featured: portfolio?.featured || false,
    },
  });

  // Carregar serviços e tecnologias
  useEffect(() => {
    const loadData = async () => {      try {
        const servicesResult = await getServicesAction();
        setServices(
          (servicesResult.services || []).map(service => ({
            id: service.id,
            title: service.title,
            slug: service.slug,
            price: service.price ? Number(service.price) : null,
          }))
        );

        // TODO: Carregar tecnologias quando implementarmos o CRUD
        const technologiesResult = await getTechnologiesForSelectAction();
        if (technologiesResult.success) {
          setTechnologies(technologiesResult.data?.technologies || []);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []);

  const onSubmit = async (data: CreatePortfolioInput) => {
    setIsSubmitting(true);

    try {
      const portfolioData = {
        ...data,
        gallery,
        keywords,
        thumbnail: thumbnail || "",
        clientLogo: clientLogo || "",
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      };

      let result;
      if (isEditing) {
        result = await updatePortfolioAction({
          id: portfolio.id,
          ...portfolioData,
        });
      } else {
        result = await createPortfolioAction(portfolioData);
      }

      if (result.success) {
        toast.success(result.data?.message || "Projeto salvo com sucesso!");
        reset();
        onSuccess?.();
      } else {
        toast.error(result.error || "Erro ao salvar projeto");
      }
    } catch (error) {
      console.error("Erro no formulário:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Dados principais do projeto para o portfólio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Título do Projeto *</Label>
              <Input
                id="title"
                placeholder="Nome do projeto"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="shortDescription">Descrição Curta *</Label>
              <Textarea
                id="shortDescription"
                placeholder="Breve descrição do projeto (máx. 300 caracteres)"
                rows={2}
                {...register("shortDescription")}
                className={errors.shortDescription ? "border-red-500" : ""}
              />
              {errors.shortDescription && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="serviceId">Serviço Relacionado</Label>
              <Select
                value={watch("serviceId")}
                onValueChange={(value) => setValue("serviceId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status do Projeto *</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as ProjectStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNING">Planejamento</SelectItem>
                  <SelectItem value="DEVELOPMENT">
                    Em Desenvolvimento
                  </SelectItem>
                  <SelectItem value="TESTING">Em Testes</SelectItem>
                  <SelectItem value="DEPLOYED">Implantado</SelectItem>
                  <SelectItem value="COMPLETED">Concluído</SelectItem>
                  <SelectItem value="PAUSED">Pausado</SelectItem>
                  <SelectItem value="CANCELLED">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Descrição Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Descrição Detalhada</CardTitle>
          <CardDescription>
            Descrição completa e detalhes do projeto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Descrição Completa *</Label>
            <Textarea
              id="description"
              placeholder="Descrição detalhada do projeto (suporte a Markdown)"
              rows={6}
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="challenge">Desafio</Label>
            <Textarea
              id="challenge"
              placeholder="Quais foram os principais desafios do projeto?"
              rows={3}
              {...register("challenge")}
            />
          </div>

          <div>
            <Label htmlFor="solution">Solução</Label>
            <Textarea
              id="solution"
              placeholder="Como foi solucionado o problema?"
              rows={3}
              {...register("solution")}
            />
          </div>

          <div>
            <Label htmlFor="results">Resultados</Label>
            <Textarea
              id="results"
              placeholder="Quais foram os resultados alcançados?"
              rows={3}
              {...register("results")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Informações do Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Cliente</CardTitle>
          <CardDescription>Dados sobre o cliente e projeto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Nome do Cliente</Label>
              <Input
                id="clientName"
                placeholder="Nome da empresa ou pessoa"
                {...register("clientName")}
              />
            </div>
            <div>
              <Label htmlFor="clientWebsite">Site do Cliente</Label>
              <Input
                id="clientWebsite"
                type="url"
                placeholder="https://cliente.com.br"
                {...register("clientWebsite")}
              />
            </div>{" "}
            <div className="md:col-span-2">
              <Label>Logo do Cliente</Label>
              <ImageUpload
                value={clientLogo}
                onChange={(url) => setClientLogo(url || undefined)}
                uploadConfig={UPLOAD_CONFIGS.portfolio}
                placeholder="Selecione o logo do cliente"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Logo da empresa ou marca do cliente
              </p>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="testimonial">Depoimento do Cliente</Label>
              <Textarea
                id="testimonial"
                placeholder="O que o cliente disse sobre o projeto?"
                rows={3}
                {...register("testimonial")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Links e Mídia */}
      <Card>
        <CardHeader>
          <CardTitle>Links e Mídia</CardTitle>
          <CardDescription>URLs do projeto e imagens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="liveUrl">URL do Projeto</Label>
              <Input
                id="liveUrl"
                type="url"
                placeholder="https://projeto.com.br"
                {...register("liveUrl")}
              />{" "}
            </div>

            <div>
              <Label htmlFor="repositoryUrl">Repositório</Label>
              <Input
                id="repositoryUrl"
                type="url"
                placeholder="https://github.com/NovoCode-Tec/projeto"
                {...register("repositoryUrl")}
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Upload de Imagem Principal */}{" "}
            <ImageUpload
              value={thumbnail}
              onChange={(url) => setThumbnail(url || undefined)}
              uploadConfig={UPLOAD_CONFIGS.portfolio}
              label="Imagem Principal do Projeto"
              placeholder="Selecione uma imagem destacada para o projeto"
              required
            />
            {/* Upload de Galeria */}
            <GalleryUpload
              value={gallery}
              onChange={setGallery}
              uploadConfig={UPLOAD_CONFIGS.portfolio}
              label="Galeria de Imagens"
              placeholder="Adicione imagens adicionais do projeto"
              maxImages={10}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detalhes Técnicos */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes Técnicos</CardTitle>
          <CardDescription>
            Informações sobre desenvolvimento e equipe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="teamSize">Tamanho da Equipe</Label>
              <Input
                id="teamSize"
                type="number"
                min="1"
                placeholder="1"
                {...register("teamSize", { valueAsNumber: true })}
              />
            </div>

            <div>
              <Label htmlFor="duration">Duração</Label>
              <Input
                id="duration"
                placeholder="Ex: 3 meses"
                {...register("duration")}
              />
            </div>

            <div>
              <Label htmlFor="complexity">Complexidade</Label>
              <Select
                value={watch("complexity")}
                onValueChange={(value) => setValue("complexity", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Data de Início</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
            </div>
            <div>
              <Label htmlFor="endDate">Data de Conclusão</Label>
              <Input id="endDate" type="date" {...register("endDate")} />
            </div>{" "}
          </div>

          {/* Tecnologias Utilizadas */}
          <div>
            <Label>Tecnologias Utilizadas</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
              {technologies.map((tech) => {
                const isSelected =
                  watch("technologyIds")?.includes(tech.id) || false;
                return (
                  <div
                    key={tech.id}
                    className={`p-2 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      const currentTechs = watch("technologyIds") || [];
                      const newTechs = isSelected
                        ? currentTechs.filter((id) => id !== tech.id)
                        : [...currentTechs, tech.id];
                      setValue("technologyIds", newTechs);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: tech.color || "#6b7280" }}
                      >
                        {" "}
                        {tech.icon && tech.icon.startsWith("http") ? (
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                            onError={(e) => {
                              const target =
                                e.currentTarget as HTMLImageElement;
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
                          className={tech.icon ? "hidden" : ""}
                          style={{ display: tech.icon ? "none" : "block" }}
                        >
                          {tech.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium truncate">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {technologies.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                Nenhuma tecnologia cadastrada.
                <Link
                  href="/admin/technologies/new"
                  className="text-primary hover:underline ml-1"
                >
                  Cadastrar tecnologias
                </Link>
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SEO e Configurações */}
      <Card>
        <CardHeader>
          <CardTitle>SEO e Configurações</CardTitle>
          <CardDescription>Otimização para mecanismos de busca</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="metaTitle">Meta Título</Label>
              <Input
                id="metaTitle"
                placeholder="Título para SEO (máx. 60 caracteres)"
                {...register("metaTitle")}
              />
            </div>

            <div>
              <Label htmlFor="metaDescription">Meta Descrição</Label>
              <Input
                id="metaDescription"
                placeholder="Descrição para SEO (máx. 160 caracteres)"
                {...register("metaDescription")}
              />
            </div>
          </div>

          {/* Palavras-chave */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Palavras-chave</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addKeyword}
              >
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {keywords.map((keyword, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder="palavra-chave"
                  value={keyword}
                  onChange={(e) => updateKeyword(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeKeyword(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={watch("featured")}
              onCheckedChange={(checked) => setValue("featured", !!checked)}
            />
            <Label htmlFor="featured">Destacar projeto na página inicial</Label>
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Atualizando..." : "Criando..."}
            </>
          ) : isEditing ? (
            "Atualizar Projeto"
          ) : (
            "Criar Projeto"
          )}
        </Button>
      </div>
    </form>
  );
}
