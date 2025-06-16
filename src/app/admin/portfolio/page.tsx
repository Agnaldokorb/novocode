import { Suspense } from "react";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPortfoliosAction } from "@/actions/portfolio";
import PortfolioList from "./_components/portfolio-list";

interface PortfolioPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    featured?: string;
  }>;
}

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const status = params.status || "";
  const featured = params.featured ? params.featured === "true" : undefined;
  // Buscar portfólios
  const result = await getPortfoliosAction(
    {
      search,
      publicationStatus: (status as "DRAFT" | "PUBLISHED") || undefined,
      featured,
    },
    {
      page,
      limit: 12,
      sortBy: "createdAt",
      sortOrder: "desc",
    }
  );
  const portfolios = result.success ? result.data?.portfolios || [] : [];
  const pagination = result.success ? result.data?.pagination || null : null;

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Portfólio</h1>
            <p className="text-muted-foreground">
              Gerencie os projetos do portfólio da empresa
            </p>
          </div>
          <Link href="/admin/portfolio/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          </Link>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Projetos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pagination?.total || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projetos Publicados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  portfolios.filter((p) => p.publicationStatus === "PUBLISHED")
                    .length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projetos em Destaque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolios.filter((p) => p.featured).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projetos Concluídos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolios.filter((p) => p.status === "COMPLETED").length}
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
                    placeholder="Buscar projetos..."
                    defaultValue={search}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                name="status"
                defaultValue={status}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">Todos os status</option>
                <option value="DRAFT">Rascunho</option>
                <option value="PUBLISHED">Publicado</option>
                <option value="ARCHIVED">Arquivado</option>
              </select>
              <select
                name="featured"
                defaultValue={featured?.toString() || ""}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">Todos</option>
                <option value="true">Em destaque</option>
                <option value="false">Não destacados</option>
              </select>
              <Button type="submit" variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de Portfólios */}
        <Suspense fallback={<div>Carregando...</div>}>
          <PortfolioList
            portfolios={portfolios}
            pagination={pagination}
            currentPage={page}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
