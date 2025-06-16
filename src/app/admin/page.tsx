import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageContainer from "@/components/ui/page-container";
import { DashboardStats } from "./_components/dashboard-stats";
import { RecentActivity } from "./_components/recent-activity";
import { QuickActions } from "./_components/quick-actions";

export default function AdminPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie o conteúdo do site da NOVOCODE
          </p>
        </div>

        {/* Estatísticas principais */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          }
        >
          <DashboardStats />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Cards de módulos */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Serviços */}
              <Card>
                <CardHeader>
                  <CardTitle>Serviços</CardTitle>
                  <CardDescription>
                    Gerencie os serviços oferecidos pela empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button asChild size="sm">
                      <Link href="/admin/services">Ver Todos</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/services/new">Criar Novo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Portfólio */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfólio</CardTitle>
                  <CardDescription>
                    Gerencie os projetos e cases de sucesso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button asChild size="sm">
                      <Link href="/admin/portfolio">Ver Todos</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/portfolio/new">Criar Novo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tecnologias */}
              <Card>
                <CardHeader>
                  <CardTitle>Tecnologias</CardTitle>
                  <CardDescription>
                    Gerencie as tecnologias utilizadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button asChild size="sm">
                      <Link href="/admin/technologies">Ver Todas</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/technologies/new">Criar Nova</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Blog */}
              <Card>
                <CardHeader>
                  <CardTitle>Blog</CardTitle>
                  <CardDescription>
                    Gerencie artigos e posts do blog
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button asChild size="sm">
                      <Link href="/admin/blog">Ver Todos</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/blog/new">Criar Novo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Leads */}
              <Card>
                <CardHeader>
                  <CardTitle>Leads</CardTitle>
                  <CardDescription>
                    Gerencie contatos e propostas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button asChild size="sm">
                      <Link href="/admin/leads">Ver Todos</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Configurações */}
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>
                    Configure dados da empresa e site
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button asChild size="sm">
                      <Link href="/admin/settings">Configurar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Ações rápidas */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Atividade recente */}
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          }
        >
          <RecentActivity />
        </Suspense>
      </div>
    </PageContainer>
  );
}
