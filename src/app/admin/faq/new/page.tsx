import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/page-container";
import { FAQForm } from "../_components/faq-form";

export default function NewFAQPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/faq">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Nova Pergunta</h1>
            <p className="text-muted-foreground">
              Adicione uma nova pergunta frequente ao site
            </p>
          </div>
        </div>

        <FAQForm />
      </div>
    </PageContainer>
  );
}
