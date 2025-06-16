import PageContainer from "@/components/ui/page-container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { NewServiceForm } from "./_components/new-service-form";

export default function NewServicePage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/services">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Criar Novo Serviço</h1>
            <p className="text-muted-foreground">
              Adicione um novo serviço ao portfólio da NOVOCODE
            </p>
          </div>
        </div>

        <NewServiceForm />
      </div>
    </PageContainer>
  );
}
