import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/ui/page-container";
import { NewBlogForm } from "./_components/new-blog-form";

export default function NewBlogPostPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Criar Novo Post</h1>
            <p className="text-muted-foreground">
              Adicione um novo artigo ao blog da NOVOCODE
            </p>
          </div>
        </div>

        <NewBlogForm />
      </div>
    </PageContainer>
  );
}
