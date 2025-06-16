"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTechnologySchema,
  type CreateTechnologyInput,
} from "@/lib/schemas";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createTechnologyAction,
  updateTechnologyAction,
} from "@/actions/technologies";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { TechnologyCategory } from "@prisma/client";
import type { TechnologyWithRelations } from "@/actions/technologies";
import { ImageUpload } from "@/components/ui/image-upload";
import { UPLOAD_CONFIGS } from "@/lib/storage";

interface TechnologyFormProps {
  technology?: TechnologyWithRelations;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const colorPresets = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
  "#EC4899", // Pink
  "#6B7280", // Gray
];

export default function TechnologyForm({
  technology,
  onSuccess,
  onCancel,
}: TechnologyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    technology?.color || colorPresets[0]
  );
  const [iconUrl, setIconUrl] = useState<string | undefined>(
    technology?.icon || undefined
  );

  const isEditing = !!technology;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateTechnologyInput>({
    resolver: zodResolver(createTechnologySchema),
    defaultValues: {
      name: technology?.name || "",
      description: technology?.description || "",
      category: technology?.category || "OTHER",
      icon: technology?.icon || "",
      color: technology?.color || colorPresets[0],
      website: technology?.website || "",
      order: technology?.order || undefined,
    },
  });
  const onSubmit = async (data: CreateTechnologyInput) => {
    setIsSubmitting(true);

    try {
      const technologyData = {
        ...data,
        color: selectedColor,
        icon: iconUrl,
      };

      let result;
      if (isEditing) {
        result = await updateTechnologyAction({
          id: technology.id,
          ...technologyData,
        });
      } else {
        result = await createTechnologyAction(technologyData);
      }

      if (result.success) {
        toast.success(result.data?.message || "Tecnologia salva com sucesso!");
        reset();
        onSuccess?.();
      } else {
        toast.error(result.error || "Erro ao salvar tecnologia");
      }
    } catch (error) {
      console.error("Erro no formulário:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Dados principais da tecnologia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome da Tecnologia *</Label>
              <Input
                id="name"
                placeholder="Ex: React, Node.js, PostgreSQL"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={watch("category")}
                onValueChange={(value) =>
                  setValue("category", value as TechnologyCategory)
                }
              >
                <SelectTrigger
                  className={errors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FRONTEND">Frontend</SelectItem>
                  <SelectItem value="BACKEND">Backend</SelectItem>
                  <SelectItem value="DATABASE">Database</SelectItem>
                  <SelectItem value="MOBILE">Mobile</SelectItem>
                  <SelectItem value="CLOUD">Cloud</SelectItem>
                  <SelectItem value="DEVOPS">DevOps</SelectItem>
                  <SelectItem value="NOCODE">No-Code</SelectItem>
                  <SelectItem value="AI">Inteligência Artificial</SelectItem>
                  <SelectItem value="BLOCKCHAIN">Blockchain</SelectItem>
                  <SelectItem value="IOT">Internet das Coisas (IoT)</SelectItem>
                  <SelectItem value="SECURITY">Segurança</SelectItem>
                  <SelectItem value="DESIGN">Design</SelectItem>
                  <SelectItem value="MARKETING">Marketing</SelectItem>
                  <SelectItem value="ANALYTICS">Analytics</SelectItem>
                  <SelectItem value="CRM">CRM</SelectItem>
                  <SelectItem value="ERP">ERP</SelectItem>
                  <SelectItem value="ECOMMERCE">E-commerce</SelectItem>
                  <SelectItem value="OTHER">Outras</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Breve descrição da tecnologia e seu uso"
                rows={3}
                {...register("description")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aparência */}
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Configure a cor e ícone da tecnologia
          </CardDescription>
        </CardHeader>{" "}
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Ícone da Tecnologia</Label>{" "}
              <ImageUpload
                value={iconUrl}
                onChange={(url) => setIconUrl(url || undefined)}
                uploadConfig={UPLOAD_CONFIGS.technologies}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Faça upload do ícone da tecnologia (SVG ou PNG recomendado)
              </p>
            </div>

            <div>
              <Label htmlFor="website">Site Oficial</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://tecnologia.com"
                {...register("website")}
              />
            </div>
          </div>

          {/* Seletor de Cor */}
          <div>
            <Label>Cor da Tecnologia</Label>
            <div className="mt-2">
              <div className="flex flex-wrap gap-2 mb-3">
                {colorPresets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? "border-gray-900 scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setSelectedColor(color);
                      setValue("color", color);
                    }}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => {
                    setSelectedColor(e.target.value);
                    setValue("color", e.target.value);
                  }}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => {
                    setSelectedColor(e.target.value);
                    setValue("color", e.target.value);
                  }}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <Label>Preview</Label>
            <div className="mt-2 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3">
                {" "}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: selectedColor }}
                >
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt="Preview"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                      onError={(e) => {
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
                    className={iconUrl ? "hidden" : ""}
                    style={{ display: iconUrl ? "none" : "block" }}
                  >
                    {watch("name")?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
                <div>
                  <div className="font-medium">
                    {watch("name") || "Nome da Tecnologia"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {watch("category") || "Categoria"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações Avançadas */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Avançadas</CardTitle>
          <CardDescription>
            Configurações opcionais para organização
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="order">Ordem de Exibição</Label>
            <Input
              id="order"
              type="number"
              min="0"
              placeholder="0"
              {...register("order", { valueAsNumber: true })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Número para definir a ordem de exibição (menor = primeiro)
            </p>
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
            "Atualizar Tecnologia"
          ) : (
            "Criar Tecnologia"
          )}
        </Button>
      </div>
    </form>
  );
}
