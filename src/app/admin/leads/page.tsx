import { Suspense } from "react";
import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeadsAction, getLeadsStatsAction } from "@/actions/leads";
import { LeadStatus } from "@/types";
import LeadsList from "./_components/leads-list";
import LeadsStats from "./_components/leads-stats";

interface LeadsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    source?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const status = params.status && params.status !== "all" ? params.status : "";
  const source = params.source || "";
  const startDate = params.startDate || "";
  const endDate = params.endDate || "";

  // Buscar leads e estatísticas
  const [leadsResult, statsResult] = await Promise.all([
    getLeadsAction(
      {
        search,
        status: status as LeadStatus | undefined,
        source,
        startDate,
        endDate,
      },
      {
        page,
        limit: 20,
        sortOrder: "desc",
      }
    ),
    getLeadsStatsAction(),
  ]);
  const leads = leadsResult.success ? leadsResult.data?.leads || [] : [];
  const pagination =
    leadsResult.success && leadsResult.data?.pagination
      ? {
          page: leadsResult.data.pagination.page || 1,
          limit: leadsResult.data.pagination.limit || 20,
          total: leadsResult.data.pagination.total,
          totalPages: leadsResult.data.pagination.totalPages,
          hasNext: leadsResult.data.pagination.hasNext,
          hasPrev: leadsResult.data.pagination.hasPrev,
        }
      : null;
  const stats = statsResult.success ? statsResult.data : null;

  return (
    <PageContainer>
      <div className="space-y-6">
        {" "}
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Leads</h1>
            <p className="text-muted-foreground">
              Gerencie todos os leads e contatos do seu site
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/leads/new">
              <Plus className="h-4 w-4 mr-2" />
              Novo Lead
            </Link>
          </Button>
        </div>
        {/* Estatísticas */}
        {stats && (
          <Suspense fallback={<div>Carregando estatísticas...</div>}>
            <LeadsStats stats={stats} />
          </Suspense>
        )}
        {/* Lista de Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Todos os Leads
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {pagination && `${pagination.total} leads encontrados`}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {" "}
            <Suspense fallback={<div>Carregando leads...</div>}>
              <LeadsList
                leads={leads}
                pagination={pagination}
                currentPage={page}
                filters={{
                  search,
                  status: status || "all",
                  source,
                  startDate,
                  endDate,
                }}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
