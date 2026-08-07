import { Card, EmptyState, PageHeader, StatCard } from "@/components/ui/display";
import { documentTypeLabel, formatDate } from "@/lib/format";
import { requirePortalUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function PortalDashboardPage() {
  const user = await requirePortalUser();
  const clientId = user.clientId!;
  const [companies, documents, contracts, recentDocuments] = await Promise.all([
    prisma.company.count({ where: { clientId, active: true } }),
    prisma.document.count({ where: { clientId } }),
    prisma.contract.count({ where: { clientId } }),
    prisma.document.findMany({
      where: { clientId },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { company: { select: { legalName: true } } },
    }),
  ]);

  return (
    <>
      <PageHeader
        title={`Olá, ${user.name}`}
        description="Acompanhe suas empresas, documentos e contratos em um único lugar."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Empresas ativas" value={companies} />
        <StatCard label="Documentos" value={documents} />
        <StatCard label="Contratos" value={contracts} />
      </div>
      <Card>
        <h2 className="text-lg font-black">Documentos recentes</h2>
        {recentDocuments.length ? (
          <div className="mt-4 divide-y divide-border">
            {recentDocuments.map((document) => (
              <div key={document.id} className="flex flex-col gap-3 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold">{document.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {documentTypeLabel(document.type)} · {document.company?.legalName ?? "Geral"} · {formatDate(document.createdAt)}
                  </p>
                </div>
                <a href={`/api/documents/${document.id}/download`} className="text-sm font-bold text-accent">
                  Baixar PDF
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState title="Nenhum documento" description="Seus documentos aparecerão aqui quando forem publicados." />
          </div>
        )}
      </Card>
    </>
  );
}
