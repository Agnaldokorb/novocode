import { Suspense } from "react";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTechnologiesAction } from "@/actions/technologies";
import TechnologiesList from "./_components/technologies-list";
import { TechnologyCategory } from "@prisma/client";

interface TechnologiesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

export default async function TechnologiesPage({
  searchParams,
}: TechnologiesPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const category = params.category || "";

  // Buscar tecnologias
  const result = await getTechnologiesAction({
    search,
    category:
      category &&
      Object.values(TechnologyCategory).includes(category as TechnologyCategory)
        ? (category as TechnologyCategory)
        : undefined,
    page,
    limit: 20,
  });
  const technologies = result.success ? result.data?.technologies || [] : [];
  const pagination = result.success ? result.data?.pagination || null : null;

  // Agrupar por categoria para estatísticas
  const categoryCounts = technologies.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tecnologias</h1>
            <p className="text-muted-foreground">
              Gerencie as tecnologias utilizadas nos projetos
            </p>
          </div>
          <Link href="/admin/technologies/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Tecnologia
            </Button>
          </Link>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Tecnologias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pagination?.total || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frontend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoryCounts.FRONTEND || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Backend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoryCounts.BACKEND || 0}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categoryCounts.DATABASE || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    name="search"
                    placeholder="Buscar tecnologias..."
                    defaultValue={search}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                name="category"
                defaultValue={category}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">Todas as categorias</option>
                <option value="FRONTEND">Frontend</option>
                <option value="BACKEND">Backend</option>
                <option value="DATABASE">Database</option>
                <option value="MOBILE">Mobile</option>
                <option value="CLOUD">Cloud</option>
                <option value="DEVOPS">DevOps</option>
                <option value="OTHER">Outras</option>
              </select>
              <Button type="submit" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Tecnologias */}
        <Suspense fallback={<div>Carregando...</div>}>
          <TechnologiesList
            technologies={technologies}
            pagination={pagination}
            currentPage={page}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
