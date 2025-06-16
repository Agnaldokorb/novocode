import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import NewTechnologyForm from "./_components/new-technology-form";
import Link from "next/link";

export default function NewTechnologyPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/technologies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Nova Tecnologia</h1>
            <p className="text-muted-foreground">
              Adicione uma nova tecnologia ao catálogo
            </p>
          </div>
        </div>

        {/* Formulário */}
        <NewTechnologyForm />
      </div>
    </PageContainer>
  );
}
