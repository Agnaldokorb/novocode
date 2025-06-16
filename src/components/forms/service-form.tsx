"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { type CreateServiceInput } from "@/lib/schemas";
import { ServiceType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { ImageUpload } from "@/components/ui/image-upload";
import { GalleryUpload } from "@/components/ui/gallery-upload";
import { UPLOAD_CONFIGS } from "@/lib/storage";
import { createService } from "@/actions/services";
import { getPublicTechnologies } from "@/actions/technologies";
import type { TechnologyWithRelations } from "@/actions/technologies";

interface ServiceFormProps {
  defaultValues?: Partial<CreateServiceInput>;
  onSuccess?: () => void;
}

export default function ServiceForm({
  defaultValues,
  onSuccess,
}: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState<string[]>(
    defaultValues?.features || []
  );
  const [benefits, setBenefits] = useState<string[]>(
    defaultValues?.benefits || []
  );
  const [deliverables, setDeliverables] = useState<string[]>(
    defaultValues?.deliverables || []
  );
  const [keywords, setKeywords] = useState<string[]>(
    defaultValues?.keywords || []
  );
  const [gallery, setGallery] = useState<string[]>(
    defaultValues?.gallery || []
  );
  const [thumbnail, setThumbnail] = useState<string | undefined>(
    defaultValues?.thumbnail || undefined
  );
  const [technologies, setTechnologies] = useState<TechnologyWithRelations[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    defaultValues?.technologyIds || []
  );

  // Carregar tecnologias disponíveis
  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const techs = await getPublicTechnologies();
        setTechnologies(techs);
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
      }
    };
    loadTechnologies();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateServiceInput>({
    defaultValues: {
      ...defaultValues,
      technologyIds: selectedTechnologies,
    },
  });

  const onSubmit = async (data: CreateServiceInput) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData(); // Campos básicos
      formData.append("title", data.title);
      formData.append("shortDescription", data.shortDescription);
      formData.append("description", data.description);
      formData.append("type", data.type);

      if (data.price) formData.append("price", data.price.toString());
      if (data.priceDescription)
        formData.append("priceDescription", data.priceDescription);
      if (thumbnail) formData.append("thumbnail", thumbnail);
      if (data.metaTitle) formData.append("metaTitle", data.metaTitle);
      if (data.metaDescription)
        formData.append("metaDescription", data.metaDescription);      formData.append("featured", data.featured.toString());

      // Arrays JSON
      formData.append("features", JSON.stringify(features || []));
      formData.append("benefits", JSON.stringify(benefits || []));
      formData.append("deliverables", JSON.stringify(deliverables || []));
      formData.append("keywords", JSON.stringify(keywords || []));
      formData.append("gallery", JSON.stringify(gallery || []));
      formData.append("technologyIds", JSON.stringify(selectedTechnologies || []));

      const result = await createService(formData);

      if (result.success) {
        onSuccess?.();
      } else {
        alert(result.error || "Erro ao criar serviço");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao criar serviço");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addArrayItem = (
    array: string[],
    setArray: (items: string[]) => void,
    item: string
  ) => {
    if (item.trim() && !array.includes(item.trim())) {
      setArray([...array, item.trim()]);
    }
  };

  const removeArrayItem = (
    array: string[],
    setArray: (items: string[]) => void,
    index: number
  ) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Dados principais do serviço</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Ex: Desenvolvimento de Sistema Web"
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="shortDescription">Descrição Curta *</Label>
            <Textarea
              id="shortDescription"
              {...register("shortDescription")}
              placeholder="Descrição resumida para cards e listagens"
              rows={3}
            />
            {errors.shortDescription && (
              <p className="text-sm text-red-600 mt-1">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição Completa *</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Descrição detalhada do serviço (suporte a Markdown)"
              rows={6}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="type">Tipo de Serviço *</Label>
            <Select
              onValueChange={(value) => setValue("type", value as ServiceType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEVELOPMENT">
                  Desenvolvimento de Sistemas
                </SelectItem>
                <SelectItem value="CONSULTING">Consultoria</SelectItem>
                <SelectItem value="MAINTENANCE">Manutenção</SelectItem>
                <SelectItem value="AUTOMATION">Automação</SelectItem>
                <SelectItem value="MOBILE">Desenvolvimento Mobile</SelectItem>
                <SelectItem value="WEB">Desenvolvimento Web</SelectItem>
                <SelectItem value="API">Desenvolvimento de API</SelectItem>
                <SelectItem value="INTEGRATION">
                  Integração de Sistemas
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="priceDescription">Descrição do Preço</Label>
              <Input
                id="priceDescription"
                {...register("priceDescription")}
                placeholder="Ex: A partir de, Sob consulta"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              {...register("featured")}
              onCheckedChange={(checked) => setValue("featured", !!checked)}
            />
            <Label htmlFor="featured">Destacar serviço na página inicial</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Características</CardTitle>
          <CardDescription>
            Recursos, benefícios e entregáveis do serviço
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Features */}
          <div>
            <Label>Recursos/Funcionalidades</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="newFeature"
                placeholder="Adicionar recurso"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    addArrayItem(features, setFeatures, input.value);
                    input.value = "";
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "newFeature"
                  ) as HTMLInputElement;
                  addArrayItem(features, setFeatures, input.value);
                  input.value = "";
                }}
              >
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(features, setFeatures, index)
                    }
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <Label>Benefícios</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="newBenefit"
                placeholder="Adicionar benefício"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    addArrayItem(benefits, setBenefits, input.value);
                    input.value = "";
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "newBenefit"
                  ) as HTMLInputElement;
                  addArrayItem(benefits, setBenefits, input.value);
                  input.value = "";
                }}
              >
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {benefit}
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(benefits, setBenefits, index)
                    }
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <Label>Entregáveis</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="newDeliverable"
                placeholder="Adicionar entregável"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    addArrayItem(deliverables, setDeliverables, input.value);
                    input.value = "";
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "newDeliverable"
                  ) as HTMLInputElement;
                  addArrayItem(deliverables, setDeliverables, input.value);
                  input.value = "";
                }}
              >
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {deliverables.map((deliverable, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {deliverable}
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(deliverables, setDeliverables, index)
                    }
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              ))}            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tecnologias */}
      <Card>
        <CardHeader>
          <CardTitle>Tecnologias Utilizadas</CardTitle>
          <CardDescription>
            Selecione as tecnologias que serão utilizadas neste serviço
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {technologies.map((tech) => (
              <div key={tech.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`tech-${tech.id}`}
                  checked={selectedTechnologies.includes(tech.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTechnologies([...selectedTechnologies, tech.id]);
                    } else {
                      setSelectedTechnologies(selectedTechnologies.filter(id => id !== tech.id));
                    }
                  }}
                />
                <Label htmlFor={`tech-${tech.id}`} className="text-sm">
                  {tech.name}
                </Label>
              </div>
            ))}
          </div>
          {selectedTechnologies.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Tecnologias selecionadas:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTechnologies.map((techId) => {
                  const tech = technologies.find(t => t.id === techId);
                  return tech ? (
                    <span
                      key={techId}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO e Mídia</CardTitle>
          <CardDescription>
            Otimização para mecanismos de busca e imagens
          </CardDescription>
        </CardHeader>{" "}
        <CardContent className="space-y-4">
          {/* Upload de Imagem Principal */}{" "}
          <ImageUpload
            value={thumbnail}
            onChange={(url) => setThumbnail(url || undefined)}
            uploadConfig={UPLOAD_CONFIGS.services}
            label="Imagem Principal"
            placeholder="Selecione uma imagem para o serviço"
            required
          />
          {/* Upload de Galeria */}
          <GalleryUpload
            value={gallery}
            onChange={setGallery}
            uploadConfig={UPLOAD_CONFIGS.services}
            label="Galeria de Imagens"
            placeholder="Adicione imagens adicionais do serviço"
            maxImages={8}
          />
          <div>
            <Label htmlFor="metaTitle">Meta Título (SEO)</Label>
            <Input
              id="metaTitle"
              {...register("metaTitle")}
              placeholder="Título otimizado para SEO (máx. 60 caracteres)"
              maxLength={60}
            />
          </div>
          <div>
            <Label htmlFor="metaDescription">Meta Descrição (SEO)</Label>
            <Textarea
              id="metaDescription"
              {...register("metaDescription")}
              placeholder="Descrição otimizada para SEO (máx. 160 caracteres)"
              rows={3}
              maxLength={160}
            />          </div>
          
          {/* Keywords */}
          <div>
            <Label>Palavras-chave (SEO)</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="newKeyword"
                placeholder="Adicionar palavra-chave"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    addArrayItem(keywords, setKeywords, input.value);
                    input.value = "";
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "newKeyword"
                  ) as HTMLInputElement;
                  addArrayItem(keywords, setKeywords, input.value);
                  input.value = "";
                }}
              >
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {keyword}
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(keywords, setKeywords, index)
                    }
                    className="ml-1 text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Serviço"}
        </Button>
      </div>
    </form>
  );
}
