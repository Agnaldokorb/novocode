"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2, X, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  updateSiteConfigSchema,
  type UpdateSiteConfigInput,
} from "@/lib/schemas";
import { updateSiteConfigAction, type SiteConfig } from "@/actions/site-config";
import { UPLOAD_CONFIGS } from "@/lib/storage";

interface SiteConfigFormProps {
  initialData: SiteConfig;
}

export function SiteConfigForm({ initialData }: SiteConfigFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyValues, setCompanyValues] = useState<string[]>(
    initialData.companyValues || []
  );
  const [keywords, setKeywords] = useState<string[]>(
    initialData.defaultKeywords || []
  );
  const [newValue, setNewValue] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [logo, setLogo] = useState<string>(initialData.logo || "");
  const [favicon, setFavicon] = useState<string>(initialData.favicon || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateSiteConfigInput>({
    resolver: zodResolver(updateSiteConfigSchema),
    defaultValues: {
      companyDescription: initialData.companyDescription || "",
      companyMission: initialData.companyMission || "",
      companyVision: initialData.companyVision || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      whatsapp: initialData.whatsapp || "",
      address: initialData.address || "",
      socialFacebook: initialData.socialFacebook || "",
      socialInstagram: initialData.socialInstagram || "",
      socialLinkedin: initialData.socialLinkedin || "",
      socialTwitter: initialData.socialTwitter || "",
      socialGithub: initialData.socialGithub || "",
      defaultMetaTitle: initialData.defaultMetaTitle || "",
      defaultMetaDescription: initialData.defaultMetaDescription || "",
      logo: initialData.logo || "",
      favicon: initialData.favicon || "",
      primaryColor: initialData.primaryColor || "",
      secondaryColor: initialData.secondaryColor || "",
      maintenanceMode: initialData.maintenanceMode || false,
      allowRegistration: initialData.allowRegistration || false,
    },
  });

  const maintenanceMode = watch("maintenanceMode");
  const allowRegistration = watch("allowRegistration");
  const handleFormSubmit = async (data: UpdateSiteConfigInput) => {
    setIsSubmitting(true);
    try {
      const result = await updateSiteConfigAction({
        ...data,
        companyValues,
        defaultKeywords: keywords,
        logo,
        favicon,
      });

      if (result.success) {
        toast.success("Configurações atualizadas com sucesso!");
      } else {
        toast.error(result.error || "Erro ao atualizar configurações");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addValue = () => {
    if (newValue.trim() && !companyValues.includes(newValue.trim())) {
      setCompanyValues([...companyValues, newValue.trim()]);
      setNewValue("");
    }
  };

  const removeValue = (valueToRemove: string) => {
    setCompanyValues(companyValues.filter((value) => value !== valueToRemove));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Informações da Empresa */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>
            Configure as informações básicas da empresa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Descrição da Empresa</Label>
            <Textarea
              id="companyDescription"
              placeholder="Descrição completa da empresa..."
              {...register("companyDescription")}
              className={errors.companyDescription ? "border-red-500" : ""}
            />
            {errors.companyDescription && (
              <p className="text-sm text-red-600">
                {errors.companyDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyMission">Missão</Label>
            <Textarea
              id="companyMission"
              placeholder="Nossa missão é..."
              {...register("companyMission")}
              className={errors.companyMission ? "border-red-500" : ""}
            />
            {errors.companyMission && (
              <p className="text-sm text-red-600">
                {errors.companyMission.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyVision">Visão</Label>
            <Textarea
              id="companyVision"
              placeholder="Nossa visão é..."
              {...register("companyVision")}
              className={errors.companyVision ? "border-red-500" : ""}
            />
            {errors.companyVision && (
              <p className="text-sm text-red-600">
                {errors.companyVision.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Valores da Empresa</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Adicionar valor..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addValue())
                }
              />
              <Button type="button" size="sm" onClick={addValue}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {companyValues.map((value, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {value}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeValue(value)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Informações de Contato */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Contato</CardTitle>
          <CardDescription>
            Configure os meios de contato da empresa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contato@empresa.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(47) 99999-9999"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                placeholder="5547999999999"
                {...register("whatsapp")}
                className={errors.whatsapp ? "border-red-500" : ""}
              />
              {errors.whatsapp && (
                <p className="text-sm text-red-600">
                  {errors.whatsapp.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Cidade, Estado, País"
                {...register("address")}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Redes Sociais */}
      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais</CardTitle>
          <CardDescription>
            Configure os links das redes sociais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="socialFacebook">Facebook</Label>
              <Input
                id="socialFacebook"
                placeholder="https://facebook.com/empresa"
                {...register("socialFacebook")}
                className={errors.socialFacebook ? "border-red-500" : ""}
              />
              {errors.socialFacebook && (
                <p className="text-sm text-red-600">
                  {errors.socialFacebook.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialInstagram">Instagram</Label>
              <Input
                id="socialInstagram"
                placeholder="https://instagram.com/empresa"
                {...register("socialInstagram")}
                className={errors.socialInstagram ? "border-red-500" : ""}
              />
              {errors.socialInstagram && (
                <p className="text-sm text-red-600">
                  {errors.socialInstagram.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialLinkedin">LinkedIn</Label>
              <Input
                id="socialLinkedin"
                placeholder="https://linkedin.com/company/empresa"
                {...register("socialLinkedin")}
                className={errors.socialLinkedin ? "border-red-500" : ""}
              />
              {errors.socialLinkedin && (
                <p className="text-sm text-red-600">
                  {errors.socialLinkedin.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialGithub">GitHub</Label>{" "}
              <Input
                id="socialGithub"
                placeholder="https://github.com/NovoCode-Tec"
                {...register("socialGithub")}
                className={errors.socialGithub ? "border-red-500" : ""}
              />
              {errors.socialGithub && (
                <p className="text-sm text-red-600">
                  {errors.socialGithub.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* SEO */}
      <Card>
        <CardHeader>
          <CardTitle>SEO e Metadados</CardTitle>
          <CardDescription>
            Configure as informações de SEO padrão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultMetaTitle">Meta Título Padrão</Label>
            <Input
              id="defaultMetaTitle"
              placeholder="Título que aparece no Google"
              {...register("defaultMetaTitle")}
              className={errors.defaultMetaTitle ? "border-red-500" : ""}
            />
            {errors.defaultMetaTitle && (
              <p className="text-sm text-red-600">
                {errors.defaultMetaTitle.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultMetaDescription">
              Meta Descrição Padrão
            </Label>
            <Textarea
              id="defaultMetaDescription"
              placeholder="Descrição que aparece no Google (max. 160 caracteres)"
              {...register("defaultMetaDescription")}
              className={errors.defaultMetaDescription ? "border-red-500" : ""}
            />
            {errors.defaultMetaDescription && (
              <p className="text-sm text-red-600">
                {errors.defaultMetaDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Palavras-chave Padrão</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Adicionar palavra-chave..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword())
                }
              />
              <Button type="button" size="sm" onClick={addKeyword}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {keyword}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeKeyword(keyword)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>{" "}
      {/* Aparência */}
      <Card>
        <CardHeader>
          <CardTitle>Aparência</CardTitle>
          <CardDescription>
            Configure a aparência visual do site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Logo da Empresa</Label>{" "}
              <ImageUpload
                value={logo}
                onChange={(url) => setLogo(url || "")}
                uploadConfig={UPLOAD_CONFIGS.site}
                placeholder="Selecione o logo da empresa"
                className="max-w-md"
              />
              <p className="text-xs text-muted-foreground">
                Logo principal que aparecerá no cabeçalho do site
              </p>
            </div>

            <div className="space-y-2">
              <Label>Favicon</Label>{" "}
              <ImageUpload
                value={favicon}
                onChange={(url) => setFavicon(url || "")}
                uploadConfig={UPLOAD_CONFIGS.site}
                placeholder="Selecione o favicon do site"
                className="max-w-md"
              />
              <p className="text-xs text-muted-foreground">
                Ícone que aparece na aba do navegador (recomendado: 32x32px ou
                16x16px)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex space-x-2">
                <Input
                  id="primaryColor"
                  placeholder="#3b82f6"
                  {...register("primaryColor")}
                  className={errors.primaryColor ? "border-red-500" : ""}
                />
                <input
                  type="color"
                  className="w-12 h-10 border rounded"
                  onChange={(e) => setValue("primaryColor", e.target.value)}
                />
              </div>
              {errors.primaryColor && (
                <p className="text-sm text-red-600">
                  {errors.primaryColor.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex space-x-2">
                <Input
                  id="secondaryColor"
                  placeholder="#8b5cf6"
                  {...register("secondaryColor")}
                  className={errors.secondaryColor ? "border-red-500" : ""}
                />
                <input
                  type="color"
                  className="w-12 h-10 border rounded"
                  onChange={(e) => setValue("secondaryColor", e.target.value)}
                />
              </div>
              {errors.secondaryColor && (
                <p className="text-sm text-red-600">
                  {errors.secondaryColor.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Configurações Avançadas */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Avançadas</CardTitle>
          <CardDescription>
            Configure opções avançadas do sistema
          </CardDescription>
        </CardHeader>        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenanceMode"
                checked={maintenanceMode}
                onCheckedChange={(checked) =>
                  setValue("maintenanceMode", !!checked)
                }
              />
              <Label htmlFor="maintenanceMode" className="text-sm font-medium">
                Modo de manutenção
              </Label>
            </div>
            {maintenanceMode && (
              <div className="ml-6 p-3 bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 mt-0.5 text-orange-500">
                    ⚠️
                  </div>
                  <div className="text-sm text-orange-700">
                    <p className="font-medium mb-1">Site em modo de manutenção</p>
                    <p>
                      Quando ativo, apenas administradores podem acessar o site. 
                      Visitantes verão uma página de manutenção.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 ml-6">
              Ative para realizar manutenções no site sem interromper o acesso administrativo
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowRegistration"
                checked={allowRegistration}
                onCheckedChange={(checked) =>
                  setValue("allowRegistration", !!checked)
                }
              />
              <Label htmlFor="allowRegistration" className="text-sm font-medium">
                Permitir registro de novos usuários
              </Label>
            </div>
            <p className="text-xs text-gray-500 ml-6">
              Permitir que novos usuários se registrem no sistema
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar Configurações"
          )}
        </Button>
      </div>
    </form>
  );
}
