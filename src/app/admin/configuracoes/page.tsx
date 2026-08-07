import { prisma } from "@/lib/prisma";
import { PageHeader, Card, EmptyState } from "@/components/ui/display";
import { formatDate } from "@/lib/format";

export default async function SettingsPage() {
  const logs = await prisma.auditLog.findMany({ take: 50, orderBy: { createdAt: "desc" }, include: { user: { select: { name: true, email: true } } } });
  return <><PageHeader title="Configurações e auditoria" description="Registro das ações administrativas e operacionais mais recentes." /><Card><h2 className="text-lg font-black">Auditoria</h2>{logs.length ? <ul className="mt-4 divide-y divide-border">{logs.map((log) => <li key={log.id} className="py-3"><div className="flex flex-col justify-between gap-1 sm:flex-row"><p className="font-bold">{log.action}</p><time className="text-xs text-muted-foreground">{formatDate(log.createdAt)}</time></div><p className="text-xs text-muted-foreground">{log.user?.name ?? "Sistema"} · {log.entity}{log.entityId ? ` · ${log.entityId}` : ""}</p></li>)}</ul> : <EmptyState title="Sem eventos" description="As ações importantes aparecerão aqui." />}</Card></>;
}
