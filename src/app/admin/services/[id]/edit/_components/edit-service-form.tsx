"use client";

import { useRouter } from "next/navigation";
import ServiceForm from "@/components/forms/service-form";
import { type CreateServiceInput } from "@/lib/schemas";

interface EditServiceFormProps {
  defaultValues: Partial<CreateServiceInput>;
}

export function EditServiceForm({ defaultValues }: EditServiceFormProps) {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirecionar para lista de serviços após sucesso
    router.push("/admin/services");
    router.refresh();
  };

  return (
    <ServiceForm defaultValues={defaultValues} onSuccess={handleSuccess} />
  );
}
