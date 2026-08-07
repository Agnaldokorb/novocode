import { prisma } from "@/lib/prisma";
import { PageHeader, StatCard, Card, EmptyState } from "@/components/ui/display";
import { documentTypeLabel, formatDate } from "@/lib/format";

export default async function AdminDashboard() {
  const soon = new Date(); soon.setDate(soon.getDate() + 30);
  const [clients, activeClients, companies, boletos, invoices, activeContracts, expiringContracts, recent] = await Promise.all([
    prisma.client.count(), prisma.client.count({ where: { active: true } }), prisma.company.count(),
    prisma.document.count({ where: { type: "BOLETO" } }), prisma.document.count({ where: { type: "NOTA_FISCAL" } }),
    prisma.contract.count({ where: { status: "ACTIVE" } }), prisma.contract.count({ where: { status: "ACTIVE", endDate: { lte: soon, gte: new Date() } } }),
    prisma.document.findMany({ take: 6, orderBy: { createdAt: "desc" }, include: { client: { select: { name: true } }, company: { select: { legalName: true } } } }),
  ]);
  return <><PageHeader title="Dashboard administrativo" description="Visão geral segura da operação de clientes e documentos." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Total de clientes" value={clients} /><StatCard label="Clientes ativos" value={activeClients} /><StatCard label="Empresas" value={companies} /><StatCard label="Boletos" value={boletos} /><StatCard label="Notas fiscais" value={invoices} /><StatCard label="Contratos ativos" value={activeContracts} /><StatCard label="Vencem em 30 dias" value={expiringContracts} /><StatCard label="Documentos recentes" value={recent.length} /></div><Card><h2 className="text-lg font-black">Documentos recentes</h2>{recent.length ? <ul className="mt-4 divide-y divide-border">{recent.map((item) => <li key={item.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold">{item.title}</p><p className="text-xs text-muted-foreground">{item.client.name} · {item.company?.legalName ?? "Sem empresa"}</p></div><div className="text-xs text-muted-foreground">{documentTypeLabel(item.type)} · {formatDate(item.createdAt)}</div></li>)}</ul> : <EmptyState title="Nenhum documento" description="Os uploads mais recentes aparecerão aqui." />}</Card></>;
}
