"use client";

import { useRouter } from "next/navigation";
import TechnologyForm from "@/components/forms/technology-form";

export default function NewTechnologyForm() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/technologies");
  };

  const handleCancel = () => {
    router.back();
  };

  return <TechnologyForm onSuccess={handleSuccess} onCancel={handleCancel} />;
}
