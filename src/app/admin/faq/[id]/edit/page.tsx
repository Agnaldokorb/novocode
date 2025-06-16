import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/page-container";
import { getFAQById } from "@/actions/faq";
import { FAQForm } from "../../_components/faq-form";

interface EditFAQPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditFAQPage({ params }: EditFAQPageProps) {
  const { id } = await params;
  const faq = await getFAQById(id);

  if (!faq) {
    notFound();
  }

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
            <h1 className="text-3xl font-bold">Editar FAQ</h1>
            <p className="text-muted-foreground">
              Editando: {faq.question.substring(0, 60)}
              {faq.question.length > 60 ? "..." : ""}
            </p>
          </div>
        </div>

        <FAQForm defaultValues={faq} />
      </div>
    </PageContainer>
  );
}
