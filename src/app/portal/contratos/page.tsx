import { requirePortalUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card, EmptyState, StatusBadge } from "@/components/ui/display";
import { contractStatusLabel, formatDate } from "@/lib/format";

export default async function PortalContractsPage() {
  const user = await requirePortalUser();
  const contracts = await prisma.contract.findMany({ where: { clientId: user.clientId! }, orderBy: { createdAt: "desc" }, include: { company: true, document: true } });
  return <><PageHeader title="Contratos" description="Contratos vinculados à sua conta." />{contracts.length ? <div className="grid gap-4 md:grid-cols-2">{contracts.map((contract) => <Card key={contract.id}><div className="flex items-start justify-between gap-3"><div><h2 className="font-black">{contract.title}</h2><p className="text-sm text-muted-foreground">{contract.company?.legalName ?? "Geral"}</p></div><StatusBadge active={contract.status === "ACTIVE"} label={contractStatusLabel(contract.status)} /></div><p className="mt-4 text-sm">Início: {formatDate(contract.startDate)} · Vencimento: {formatDate(contract.endDate)}</p>{contract.description && <p className="mt-3 text-sm text-muted-foreground">{contract.description}</p>}{contract.document && <a href={`/api/documents/${contract.document.id}/download`} className="mt-5 inline-flex text-sm font-bold text-accent">Baixar contrato</a>}</Card>)}</div> : <EmptyState title="Nenhum contrato" description="Não há contratos cadastrados para sua conta." />}</>;
}
