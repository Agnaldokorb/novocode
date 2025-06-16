import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/page-container";
import { getServiceByIdSerialized } from "@/actions/services";
import { EditServiceForm } from "./_components/edit-service-form";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;
  const serviceData = await getServiceByIdSerialized(id);

  if (!serviceData) {
    notFound();
  }
  // Converter null para undefined para compatibilidade com o formulário
  const service = {
    ...serviceData,
    metaTitle: serviceData.metaTitle || undefined,
    metaDescription: serviceData.metaDescription || undefined,
    price: serviceData.price ? Number(serviceData.price) : undefined,
    priceDescription: serviceData.priceDescription || undefined,
    thumbnail: serviceData.thumbnail || undefined,
    order: serviceData.order || undefined,
  };

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
            <h1 className="text-3xl font-bold">Editar Serviço</h1>
            <p className="text-muted-foreground">Editando: {service.title}</p>
          </div>
        </div>

        <EditServiceForm defaultValues={service} />
      </div>
    </PageContainer>
  );
}
