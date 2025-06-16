"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Save, X, Plus } from "lucide-react";
import { updateLeadAction } from "@/actions/leads";
import type { Lead, LeadStatus } from "@/types";

interface LeadFormProps {
  lead: Lead;
  onCancel: () => void;
}

const statusOptions = [
  { value: "NEW", label: "Novo" },
  { value: "CONTACTED", label: "Contatado" },
  { value: "QUALIFIED", label: "Qualificado" },
  { value: "PROPOSAL", label: "Proposta" },
  { value: "WON", label: "Ganho" },
  { value: "LOST", label: "Perdido" },
];

const sourceOptions = [
  "Website",
  "Google Ads",
  "Facebook Ads",
  "Instagram",
  "LinkedIn",
  "Indicação",
  "Email Marketing",
  "WhatsApp",
  "Telefone",
  "Outro",
];

const defaultServices = [
  "Website Institucional",
  "E-commerce",
  "Sistema Web",
  "Aplicativo Mobile",
  "Landing Page",
  "Blog",
  "Portfolio",
  "Marketplace",
  "Plataforma EAD",
  "Sistema ERP",
  "CRM",
  "Consultoria",
  "Manutenção",
];

export function LeadForm({ lead, onCancel }: LeadFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    phone: lead.phone || "",
    company: lead.company || "",
    message: lead.message,
    source: lead.source || "",
    status: lead.status,
    interestedServices: lead.interestedServices,
    budget: lead.budget || "",
    timeline: lead.timeline || "",
  });
  const [newService, setNewService] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData = {
        id: lead.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        message: formData.message,
        source: formData.source || undefined,
        status: formData.status as LeadStatus,
        interestedServices: formData.interestedServices,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
      };

      const result = await updateLeadAction(updateData);

      if (result.success) {
        toast.success("Lead atualizado com sucesso!");
        router.push(`/admin/leads/${lead.id}`);
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao atualizar lead");
      }
    } catch (error) {
      console.error("Erro ao atualizar lead:", error);
      toast.error("Erro ao atualizar lead");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interestedServices: checked
        ? [...prev.interestedServices, service]
        : prev.interestedServices.filter((s) => s !== service),
    }));
  };

  const handleAddService = () => {
    if (newService && !formData.interestedServices.includes(newService)) {
      setFormData((prev) => ({
        ...prev,
        interestedServices: [...prev.interestedServices, newService],
      }));
      setNewService("");
    }
  };

  const handleRemoveService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      interestedServices: prev.interestedServices.filter((s) => s !== service),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Origem</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => handleChange("source", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a origem" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Projeto */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                placeholder="Ex: R$ 5.000,00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Prazo</Label>
              <Input
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleChange("timeline", e.target.value)}
                placeholder="Ex: 2 meses"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem *</Label>
              <Textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Mensagem do lead..."
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Serviços de Interesse */}
      <Card>
        <CardHeader>
          <CardTitle>Serviços de Interesse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Serviços Selecionados */}
          <div className="space-y-2">
            <Label>Serviços Selecionados</Label>
            <div className="flex flex-wrap gap-2">
              {formData.interestedServices.map((service) => (
                <Badge
                  key={service}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleRemoveService(service)}
                >
                  {service} ×
                </Badge>
              ))}
              {formData.interestedServices.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhum serviço selecionado
                </p>
              )}
            </div>
          </div>

          {/* Serviços Padrão */}
          <div className="space-y-2">
            <Label>Serviços Disponíveis</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {defaultServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.interestedServices.includes(service)}
                    onCheckedChange={(checked) =>
                      handleServiceToggle(service, !!checked)
                    }
                  />
                  <Label htmlFor={service} className="text-sm">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Adicionar Serviço Personalizado */}
          <div className="space-y-2">
            <Label htmlFor="newService">Adicionar Serviço Personalizado</Label>
            <div className="flex gap-2">
              <Input
                id="newService"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Nome do serviço..."
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddService}
                disabled={!newService}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
}
