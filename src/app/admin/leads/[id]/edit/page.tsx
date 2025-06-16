"use client";

import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLeadByIdAction } from "@/actions/leads";
import { LeadForm } from "../../_components/lead-form";
import type { Lead } from "@/types";

interface EditLeadPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditLeadPage({ params }: EditLeadPageProps) {
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadLead() {
      try {
        const resolvedParams = await params;
        const leadData = await getLeadByIdAction(resolvedParams.id);

        if (!leadData) {
          notFound();
        }

        if (leadData.success && leadData.data) {
          setLead(leadData.data.lead);
        }
      } catch (error) {
        console.error("Erro ao carregar lead:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadLead();
  }, [params]);
  const handleCancel = async () => {
    const resolvedParams = await params;
    router.push(`/admin/leads/${resolvedParams.id}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/leads">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Carregando...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/leads/${lead.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Editar Lead</h1>
          <p className="text-muted-foreground">
            {lead.name} - Lead #{lead.id.slice(-8)}
          </p>
        </div>
      </div>

      {/* Formulário */}
      <LeadForm lead={lead} onCancel={handleCancel} />
    </div>
  );
}
