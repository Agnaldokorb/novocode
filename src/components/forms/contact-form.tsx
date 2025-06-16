"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { sendContactAction, type ContactFormInput } from "@/actions/contact";

// Schema de validação local - mais específico que o global
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),
  email: z
    .string()
    .email("Email inválido")
    .max(255, "Email muito longo")
    .toLowerCase(),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const cleanPhone = val.replace(/[^\d]/g, "");
      return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }, "Telefone deve ter formato válido brasileiro"),
  company: z
    .string()
    .max(100, "Nome da empresa muito longo")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(5, "Assunto deve ter pelo menos 5 caracteres")
    .max(200, "Assunto muito longo")
    .trim(),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(2000, "Mensagem muito longa")
    .trim(),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
  });

  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);

    try {
      const result = await sendContactAction(data);

      if (result.success) {
        setIsSuccess(true);
        reset();
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Mensagem Enviada!
          </h3>
          <p className="text-gray-600 mb-6">
            Recebemos sua mensagem e entraremos em contato em breve. Normalmente
            respondemos em até 24 horas.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            Enviar Nova Mensagem
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Entre em Contato</CardTitle>
        <CardDescription>
          Preencha o formulário abaixo e nossa equipe entrará em contato com
          você
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome e Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                placeholder="Seu nome completo"
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
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Telefone e Empresa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="phone"
                    placeholder="(11) 99999-9999"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                placeholder="Nome da sua empresa"
                {...register("company")}
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          {/* Assunto */}
          <div>
            <Label htmlFor="subject">Assunto *</Label>
            <Input
              id="subject"
              placeholder="Sobre o que você gostaria de falar?"
              {...register("subject")}
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-sm text-red-600 mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Mensagem */}
          <div>
            <Label htmlFor="message">Mensagem *</Label>
            <Textarea
              id="message"
              placeholder="Descreva seu projeto, dúvida ou como podemos ajudá-lo..."
              rows={6}
              {...register("message")}
              className={errors.message ? "border-red-500" : ""}
            />
            <div className="flex justify-between mt-1">
              {errors.message ? (
                <p className="text-sm text-red-600">{errors.message.message}</p>
              ) : (
                <div />
              )}
              <p
                className={`text-xs ${
                  messageLength > 1800 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {messageLength}/2000
              </p>
            </div>
          </div>

          {/* Botão de envio */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Ao enviar este formulário, você concorda com nossa política de
            privacidade. Seus dados serão utilizados apenas para entrarmos em
            contato.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
