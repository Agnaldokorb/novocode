import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { getTechnologyByIdAction } from "@/actions/technologies";
import EditTechnologyForm from "./_components/edit-technology-form";
import Link from "next/link";

interface EditTechnologyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTechnologyPage({
  params,
}: EditTechnologyPageProps) {
  const { id } = await params;
  const result = await getTechnologyByIdAction(id);

  if (!result.success || !result.data?.technology) {
    notFound();
  }

  const technology = result.data.technology;

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
            <h1 className="text-2xl font-bold">Editar Tecnologia</h1>
            <p className="text-muted-foreground">Editando: {technology.name}</p>
          </div>
        </div>

        {/* Formulário */}
        <EditTechnologyForm technology={technology} />
      </div>
    </PageContainer>
  );
}
