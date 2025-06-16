"use client";

import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/forms/blog-form";

export function NewBlogForm() {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirecionar para lista de posts após sucesso
    router.push("/admin/blog");
    router.refresh();
  };

  return <BlogForm onSuccess={handleSuccess} />;
}
