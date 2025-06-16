"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import {
  createFAQ,
  updateFAQ,
  type FAQ,
  type CreateFAQInput,
} from "@/actions/faq";
import { createFAQSchema } from "@/lib/schemas";
import { PublicationStatus } from "@prisma/client";
import { toast } from "sonner";

type FAQFormData = z.infer<typeof createFAQSchema>;

interface FAQFormProps {
  defaultValues?: FAQ;
}

export function FAQForm({ defaultValues }: FAQFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,  } = useForm<FAQFormData>({
    resolver: zodResolver(createFAQSchema),
    defaultValues: {
      question: defaultValues?.question || "",
      answer: defaultValues?.answer || "",
      category: defaultValues?.category || "",
      order: defaultValues?.order || undefined,
      status: defaultValues?.status || PublicationStatus.PUBLISHED,
    },
  });

  const onSubmit = async (data: FAQFormData) => {
    setIsSubmitting(true);

    try {
      const faqData: CreateFAQInput = {
        question: data.question,
        answer: data.answer,
        category: data.category || undefined,
        order: data.order || undefined,
        status: data.status,
      };

      let result;
      if (isEditing) {
        result = await updateFAQ({
          id: defaultValues.id,
          ...faqData,
        });
      } else {
        result = await createFAQ(faqData);
      }

      if (result.success) {
        toast.success(
          `FAQ ${isEditing ? "atualizado" : "criado"} com sucesso!`
        );
        router.push("/admin/faq");
        router.refresh();
      } else {
        toast.error(
          result.error || `Erro ao ${isEditing ? "atualizar" : "criar"} FAQ`
        );
      }
    } catch (error) {
      console.error("Erro no formulário:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações da Pergunta</CardTitle>
          <CardDescription>
            Complete os dados da pergunta frequente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="question">Pergunta *</Label>
            <Input
              id="question"
              placeholder="Digite a pergunta..."
              {...register("question")}
              className={errors.question ? "border-red-500" : ""}
            />
            {errors.question && (
              <p className="text-sm text-red-600 mt-1">
                {errors.question.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="answer">Resposta *</Label>
            <Textarea
              id="answer"
              placeholder="Digite a resposta completa..."
              rows={6}
              {...register("answer")}
              className={errors.answer ? "border-red-500" : ""}
            />
            {errors.answer && (
              <p className="text-sm text-red-600 mt-1">
                {errors.answer.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                placeholder="Ex: Geral, Serviços, Técnico..."
                {...register("category")}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Categoria opcional para organizar os FAQs
              </p>
            </div>

            <div>
              <Label htmlFor="order">Ordem</Label>
              <Input
                id="order"
                type="number"
                placeholder="1"
                {...register("order", { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ordem de exibição (opcional)
              </p>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) =>
                  setValue("status", value as PublicationStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
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
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoadingSpinner className="mr-2" />
              {isEditing ? "Atualizando..." : "Criando..."}
            </>
          ) : (
            `${isEditing ? "Atualizar" : "Criar"} FAQ`
          )}
        </Button>
      </div>
    </form>
  );
}
