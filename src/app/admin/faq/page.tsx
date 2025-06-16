import { Suspense } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FAQList } from "./_components/faq-list";
import { FAQListSkeleton } from "./_components/faq-list-skeleton";

export default function FAQPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">FAQ</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as perguntas frequentes do site
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/faq/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Pergunta
          </Link>
        </Button>
      </div>

      <Suspense fallback={<FAQListSkeleton />}>
        <FAQList />
      </Suspense>
    </div>
  );
}
