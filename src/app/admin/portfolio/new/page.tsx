"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import PortfolioForm from "@/components/forms/portfolio-form";

export default function NewPortfolioPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/portfolio");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Novo Projeto</h1>
            <p className="text-muted-foreground">
              Adicione um novo projeto ao portfólio da empresa
            </p>
          </div>
        </div>

        {/* Formulário */}
        <PortfolioForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </PageContainer>
  );
}
