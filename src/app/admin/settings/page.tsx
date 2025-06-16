export const dynamic = 'force-dynamic';

import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PageContainer from "@/components/ui/page-container";
import { UserManagement } from "./_components/user-management";
import { SiteConfigForm } from "./_components/site-config-form";
import { getAllUsers } from "@/actions/users";
import { getOrCreateSiteConfig } from "@/actions/site-config";

export default async function SettingsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie usuários e configurações do sistema
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">Gerenciamento de Usuários</TabsTrigger>
            <TabsTrigger value="site">Configurações do Site</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuários do Sistema</CardTitle>
                <CardDescription>
                  Gerencie os usuários que têm acesso ao painel administrativo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[150px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                >
                  <UserManagementContent />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="site" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Site</CardTitle>
                <CardDescription>
                  Configure informações da empresa, contatos e SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className="space-y-6">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      ))}
                    </div>
                  }
                >
                  <SiteConfigContent />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}

async function UserManagementContent() {
  const result = await getAllUsers();

  if (!result.success) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">
          Erro ao carregar usuários: {result.error}
        </p>
      </div>
    );
  }

  return <UserManagement initialUsers={result.data || []} />;
}

async function SiteConfigContent() {
  try {
    const siteConfig = await getOrCreateSiteConfig();
    return <SiteConfigForm initialData={siteConfig} />;
  } catch (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">
          Erro ao carregar configurações:{" "}
          {error instanceof Error ? error.message : "Erro desconhecido"}
        </p>
      </div>
    );
  }
}
