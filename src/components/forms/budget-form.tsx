"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
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
import { Loader2, Send, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";
import { sendBudgetAction } from "@/actions/budget";
import { budgetFormSchema, type BudgetFormInput } from "@/lib/schemas";

type FormData = BudgetFormInput;

// Opções predefinidas
const PROJECT_TYPES = [
  { value: "website", label: "Website Institucional" },
  { value: "ecommerce", label: "E-commerce/Loja Virtual" },
  { value: "sistema", label: "Sistema de Gestão" },
  { value: "mobile-app", label: "Aplicativo Mobile" },
  { value: "api-integracao", label: "API/Integração" },
  { value: "consultoria", label: "Consultoria Técnica" },
  { value: "manutencao", label: "Manutenção/Suporte" },
  { value: "outro", label: "Outro" },
];

const BUDGET_RANGES = [
  { value: "ate-5k", label: "Até R$ 5.000" },
  { value: "5k-15k", label: "R$ 5.000 - R$ 15.000" },
  { value: "15k-30k", label: "R$ 15.000 - R$ 30.000" },
  { value: "30k-50k", label: "R$ 30.000 - R$ 50.000" },
  { value: "50k-100k", label: "R$ 50.000 - R$ 100.000" },
  { value: "acima-100k", label: "Acima de R$ 100.000" },
  { value: "conversar", label: "Preferir conversar sobre valores" },
];

const TIMELINES = [
  { value: "urgente", label: "Urgente (até 2 semanas)" },
  { value: "rapido", label: "Rápido (até 1 mês)" },
  { value: "normal", label: "Normal (1-3 meses)" },
  { value: "flexivel", label: "Flexível (3-6 meses)" },
  { value: "longo-prazo", label: "Longo prazo (6+ meses)" },
  { value: "conversar", label: "Conversar sobre prazo" },
];

const CONTACT_PREFERENCES = [
  { value: "email", label: "E-mail" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telefone", label: "Telefone" },
];

// Funcionalidades por tipo de projeto
const FEATURES_BY_TYPE: Record<string, string[]> = {
  website: [
    "Design responsivo",
    "SEO otimizado",
    "Formulário de contato",
    "Galeria de imagens",
    "Blog integrado",
    "Redes sociais",
    "Google Analytics",
    "Painel administrativo",
  ],
  ecommerce: [
    "Catálogo de produtos",
    "Carrinho de compras",
    "Pagamento online",
    "Gestão de estoque",
    "Cupons de desconto",
    "Avaliações de produtos",
    "Múltiplos meios de pagamento",
    "Relatórios de vendas",
  ],
  sistema: [
    "Controle de usuários",
    "Dashboard administrativo",
    "Relatórios customizados",
    "API para integrações",
    "Backup automático",
    "Controle de permissões",
    "Auditoria de ações",
    "Notificações do sistema",
  ],
  "mobile-app": [
    "Design nativo",
    "Push notifications",
    "Login social",
    "Geolocalização",
    "Câmera integrada",
    "Modo offline",
    "Sincronização em nuvem",
    "Analytics integrado",
  ],
  "api-integracao": [
    "API REST",
    "Documentação completa",
    "Autenticação segura",
    "Rate limiting",
    "Webhooks",
    "Testes automatizados",
    "Monitoramento",
    "Versionamento",
  ],
  consultoria: [
    "Análise de requisitos",
    "Arquitetura de software",
    "Code review",
    "Otimização de performance",
    "Segurança",
    "Treinamento da equipe",
    "Documentação técnica",
    "Planejamento estratégico",
  ],
  manutencao: [
    "Correção de bugs",
    "Atualizações de segurança",
    "Backup e restore",
    "Monitoramento",
    "Otimização",
    "Suporte técnico",
    "Updates de dependências",
    "Relatórios mensais",
  ],
  outro: [
    "Desenvolvimento customizado",
    "Integração de sistemas",
    "Migração de dados",
    "Automação de processos",
    "Treinamento",
    "Consultoria especializada",
    "Auditoria de código",
    "Otimização",
  ],
};

const TECH_OPTIONS = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "PHP",
  "Java",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Firebase",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "AWS",
  "Google Cloud",
  "Azure",
  "Vercel",
  "WordPress",
  "Shopify",
  "WooCommerce",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
];

export function BudgetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      features: [],
      preferredTechnologies: [],
      hasExistingWebsite: false,
      hasDesign: false,
      acceptTerms: false,
      acceptMarketing: false,
    },
  });

  const projectType = watch("projectType");
  const projectDescription = watch("projectDescription") || "";
  const additionalInfo = watch("additionalInfo") || "";

  // Atualizar funcionalidades baseado no tipo de projeto
  const availableFeatures = projectType
    ? FEATURES_BY_TYPE[projectType] || []
    : [];

  const toggleFeature = (feature: string) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];

    setSelectedFeatures(newFeatures);
    setValue("features", newFeatures);
  };

  const toggleTechnology = (tech: string) => {
    const newTechs = selectedTechnologies.includes(tech)
      ? selectedTechnologies.filter((t) => t !== tech)
      : [...selectedTechnologies, tech];

    setSelectedTechnologies(newTechs);
    setValue("preferredTechnologies", newTechs);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const result = await sendBudgetAction(data as BudgetFormInput);

      if (result.success) {
        setIsSuccess(true);
        toast.success(result.message || "Solicitação enviada com sucesso!");
        reset();
        setSelectedFeatures([]);
        setSelectedTechnologies([]);
      } else {
        toast.error(result.error || "Erro ao enviar solicitação");
      }
    } catch (error) {
      console.error("Erro no formulário:", error);
      toast.error("Erro interno. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Solicitação Enviada!
          </h3>
          <p className="text-gray-600 mb-6">
            Recebemos sua solicitação de orçamento e entraremos em contato em
            breve. Obrigado por escolher a NOVOCODE!
          </p>
          <Button onClick={() => setIsSuccess(false)}>
            Enviar Nova Solicitação
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Dados Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Pessoais</CardTitle>
          <CardDescription>Informe seus dados para contato</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
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
            </div>            <div>
              <Label htmlFor="phone">Telefone *</Label>
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
        </CardContent>
      </Card>

      {/* Detalhes do Projeto */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Projeto</CardTitle>
          <CardDescription>
            Conte-nos sobre o projeto que você tem em mente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="projectName">Nome do Projeto *</Label>
            <Input
              id="projectName"
              placeholder="Ex: Site institucional da empresa X"
              {...register("projectName")}
              className={errors.projectName ? "border-red-500" : ""}
            />
            {errors.projectName && (
              <p className="text-sm text-red-600 mt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>{" "}
          <div>
            <Label htmlFor="projectType">Tipo de Projeto *</Label>{" "}
            <Select
              value={watch("projectType") || ""}
              onValueChange={(value) => {
                if (value !== watch("projectType")) {
                  setValue(
                    "projectType",
                    value as
                      | "website"
                      | "ecommerce"
                      | "sistema"
                      | "mobile-app"
                      | "api-integracao"
                      | "consultoria"
                      | "manutencao"
                      | "outro"
                  );
                  setSelectedFeatures([]); // Reset features when type changes
                  setValue("features", []);
                }
              }}
            >
              <SelectTrigger
                className={errors.projectType ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Selecione o tipo de projeto" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.projectType && (
              <p className="text-sm text-red-600 mt-1">
                {errors.projectType.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="projectDescription">Descrição do Projeto *</Label>
            <Textarea
              id="projectDescription"
              placeholder="Descreva detalhadamente o que você precisa, objetivos, público-alvo, etc."
              rows={4}
              {...register("projectDescription")}
              className={errors.projectDescription ? "border-red-500" : ""}
            />
            <div className="flex justify-between mt-1">
              {errors.projectDescription && (
                <p className="text-sm text-red-600">
                  {errors.projectDescription.message}
                </p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {projectDescription.length}/2000
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funcionalidades */}
      {availableFeatures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades Desejadas</CardTitle>
            <CardDescription>
              Selecione as funcionalidades que você gostaria de incluir
            </CardDescription>
          </CardHeader>          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableFeatures.map((feature) => (
                <div
                  key={feature}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedFeatures.includes(feature)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleFeature(feature)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                      selectedFeatures.includes(feature)
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-300"
                    }`}>
                      {selectedFeatures.includes(feature) && (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
            {errors.features && (
              <p className="text-sm text-red-600 mt-2">
                {errors.features.message}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Orçamento e Prazo */}
      <Card>
        <CardHeader>
          <CardTitle>Orçamento e Prazo</CardTitle>
          <CardDescription>
            Informe sua faixa de orçamento e prazo desejado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            <div>
              <Label htmlFor="budgetRange">Faixa de Orçamento *</Label>
              <Select
                value={watch("budgetRange") || ""}
                onValueChange={(value) =>
                  setValue(
                    "budgetRange",
                    value as
                      | "ate-5k"
                      | "5k-15k"
                      | "15k-30k"
                      | "30k-50k"
                      | "50k-100k"
                      | "acima-100k"
                      | "conversar"
                  )
                }
              >
                <SelectTrigger
                  className={errors.budgetRange ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Selecione a faixa de orçamento" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budgetRange && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.budgetRange.message}
                </p>
              )}
            </div>{" "}
            <div>
              <Label htmlFor="timeline">Prazo Desejado *</Label>
              <Select
                value={watch("timeline") || ""}
                onValueChange={(value) =>
                  setValue(
                    "timeline",
                    value as
                      | "urgente"
                      | "rapido"
                      | "normal"
                      | "flexivel"
                      | "longo-prazo"
                      | "conversar"
                  )
                }
              >
                <SelectTrigger
                  className={errors.timeline ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Selecione o prazo" />
                </SelectTrigger>
                <SelectContent>
                  {TIMELINES.map((timeline) => (
                    <SelectItem key={timeline.value} value={timeline.value}>
                      {timeline.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeline && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.timeline.message}
                </p>
              )}
            </div>
          </div>{" "}
          <div>
            <Label htmlFor="preferredContact">
              Como prefere ser contatado? *
            </Label>
            <Select
              value={watch("preferredContact") || ""}
              onValueChange={(value) =>
                setValue(
                  "preferredContact",
                  value as "email" | "whatsapp" | "telefone"
                )
              }
            >
              <SelectTrigger
                className={errors.preferredContact ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Selecione o meio de contato" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_PREFERENCES.map((contact) => (
                  <SelectItem key={contact.value} value={contact.value}>
                    {contact.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.preferredContact && (
              <p className="text-sm text-red-600 mt-1">
                {errors.preferredContact.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tecnologias Preferidas */}
      <Card>
        <CardHeader>
          <CardTitle>Tecnologias Preferidas (Opcional)</CardTitle>
          <CardDescription>
            Possui alguma preferência de tecnologia ou ferramenta?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {TECH_OPTIONS.map((tech) => (
              <Badge
                key={tech}
                variant={
                  selectedTechnologies.includes(tech) ? "default" : "outline"
                }
                className="cursor-pointer justify-center py-2"
                onClick={() => toggleTechnology(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
          {selectedTechnologies.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">
                Tecnologias selecionadas:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTechnologies.map((tech) => (
                  <Badge key={tech} className="flex items-center gap-1">
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
          <CardDescription>
            Ajude-nos a entender melhor suas necessidades
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                id="hasExistingWebsite"
                type="checkbox"
                {...register("hasExistingWebsite")}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="hasExistingWebsite">
                Já possui um site/sistema atual
              </Label>
            </div>

            {watch("hasExistingWebsite") && (
              <div>
                <Label htmlFor="existingWebsiteUrl">
                  URL do site/sistema atual
                </Label>
                <Input
                  id="existingWebsiteUrl"
                  placeholder="https://meusite.com.br"
                  {...register("existingWebsiteUrl")}
                />
              </div>
            )}            <div className="flex items-center space-x-2">
              <input
                id="hasDesign"
                type="checkbox"
                {...register("hasDesign")}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="hasDesign">
                Já possui design/mockups prontos
              </Label>
            </div>

            {watch("hasDesign") && (
              <div>
                <Label htmlFor="designFiles">
                  Link para os arquivos de design
                </Label>
                <Input
                  id="designFiles"
                  placeholder="Link do Figma, Drive, etc."
                  {...register("designFiles")}
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="additionalInfo">Informações Adicionais</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Alguma informação adicional importante para o projeto?"
              rows={4}
              {...register("additionalInfo")}
            />
            <div className="flex justify-end mt-1">
              <p className="text-sm text-gray-500">
                {additionalInfo.length}/1500
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Termos e Condições */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">            <div className="flex items-start space-x-2">
              <input
                id="acceptTerms"
                type="checkbox"
                {...register("acceptTerms")}
                className={`w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 ${errors.acceptTerms ? "border-red-500" : ""}`}
              />
              <Label htmlFor="acceptTerms" className="text-sm">
                Eu aceito os{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  termos de uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  política de privacidade
                </a>{" "}
                da NOVOCODE *
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600">
                {errors.acceptTerms.message}
              </p>
            )}            <div className="flex items-start space-x-2">
              <input
                id="acceptMarketing"
                type="checkbox"
                {...register("acceptMarketing")}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
              />
              <Label htmlFor="acceptMarketing" className="text-sm">
                Aceito receber comunicações sobre novos serviços e conteúdos da
                NOVOCODE
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão de Envio */}
      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-auto px-12"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Solicitar Orçamento
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
