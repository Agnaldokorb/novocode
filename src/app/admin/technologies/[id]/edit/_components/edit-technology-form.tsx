"use client";

import { useRouter } from "next/navigation";
import TechnologyForm from "@/components/forms/technology-form";
import type { TechnologyWithRelations } from "@/actions/technologies";

interface EditTechnologyFormProps {
  technology: TechnologyWithRelations;
}

export default function EditTechnologyForm({
  technology,
}: EditTechnologyFormProps) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/technologies");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <TechnologyForm
      technology={technology}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
