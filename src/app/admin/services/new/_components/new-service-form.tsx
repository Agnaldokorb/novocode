"use client";

import { useRouter } from "next/navigation";
import ServiceForm from "@/components/forms/service-form";

export function NewServiceForm() {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirecionar para lista de serviços após sucesso
    router.push("/admin/services");
    router.refresh();
  };

  return <ServiceForm onSuccess={handleSuccess} />;
}
