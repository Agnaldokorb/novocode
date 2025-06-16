import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Building,
  User,
  FileText,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { getLeadByIdAction } from "@/actions/leads";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LeadDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: LeadDetailsPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const result = await getLeadByIdAction(resolvedParams.id);

    if (!result.success || !result.data) {
      return {
        title: "Lead não encontrado - Admin",
      };
    }

    const lead = result.data.lead;

    return {
      title: `${lead.name} - Lead #${lead.id.slice(-8)} - Admin`,
    };
  } catch {
    return {
      title: "Lead não encontrado - Admin",
    };
  }
}

const statusColors = {
  NEW: "bg-blue-500",
  CONTACTED: "bg-orange-500",
  QUALIFIED: "bg-yellow-500",
  PROPOSAL: "bg-purple-500",
  WON: "bg-green-500",
  LOST: "bg-red-500",
};

const statusLabels = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  QUALIFIED: "Qualificado",
  PROPOSAL: "Proposta",
  WON: "Ganho",
  LOST: "Perdido",
};

export default async function LeadDetailsPage({
  params,
}: LeadDetailsPageProps) {
  try {
    const resolvedParams = await params;
    const result = await getLeadByIdAction(resolvedParams.id);

    if (!result.success || !result.data) {
      notFound();
    }

    const lead = result.data.lead;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/leads">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{lead.name}</h1>
              <p className="text-muted-foreground">Lead #{lead.id.slice(-8)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={statusColors[lead.status as keyof typeof statusColors]}
            >
              {statusLabels[lead.status as keyof typeof statusLabels]}
            </Badge>
            <Button asChild>
              <Link href={`/admin/leads/${lead.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Link>
            </Button>
          </div>
        </div>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Principais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dados de Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Nome
                    </label>
                    <p className="font-medium">{lead.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <p>{lead.email}</p>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`mailto:${lead.email}`}>
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  {lead.phone && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Telefone
                      </label>
                      <div className="flex items-center gap-2">
                        <p>{lead.phone}</p>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${lead.phone}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                  {lead.company && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Empresa
                      </label>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <p>{lead.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>{" "}
            {/* Detalhes do Lead */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Detalhes do Lead
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lead.budget && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Orçamento
                      </label>
                      <p className="font-medium">{lead.budget}</p>
                    </div>
                  )}
                  {lead.timeline && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Prazo
                      </label>
                      <p className="font-medium">{lead.timeline}</p>
                    </div>
                  )}
                </div>
                {lead.interestedServices &&
                  lead.interestedServices.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Serviços de Interesse
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {lead.interestedServices.map((service, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {lead.message && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Mensagem
                    </label>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="whitespace-pre-wrap">{lead.message}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações do Lead */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Informações do Lead
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <Badge className={statusColors[lead.status]}>
                      {statusLabels[lead.status]}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Origem
                    </span>
                    <span className="text-sm font-medium">
                      {lead.source || "Não informado"}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Criado em
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {format(new Date(lead.createdAt), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(lead.createdAt), "HH:mm", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Atualizado em
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {format(new Date(lead.updatedAt), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(lead.updatedAt), "HH:mm", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${lead.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </a>
                </Button>
                {lead.phone && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`tel:${lead.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/admin/leads/${lead.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Lead
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar lead:", error);
    notFound();
  }
}
