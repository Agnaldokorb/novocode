import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader, PrimaryLink, StatusBadge, TableWrap, tableCellClass, tableHeadClass, tableRowClass, EmptyState } from "@/components/ui/display";
import { formatDate } from "@/lib/format";
import { toggleClientAction } from "@/app/actions/clients";

export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string; status?: string }> }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const take = 10;
  const where = {
    ...(params.q ? { OR: [{ name: { contains: params.q, mode: "insensitive" as const } }, { email: { contains: params.q, mode: "insensitive" as const } }, { cpfCnpj: { contains: params.q } }] } : {}),
    ...(params.status === "active" ? { active: true } : params.status === "inactive" ? { active: false } : {}),
  };
  const [clients, total] = await Promise.all([
    prisma.client.findMany({ where, skip: (page - 1) * take, take, orderBy: { createdAt: "desc" }, include: { _count: { select: { companies: true } } } }),
    prisma.client.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / take));
  return <><PageHeader title="Clientes" description={`${total} cliente(s) encontrado(s).`} action={<PrimaryLink href="/admin/clientes/novo">Novo cliente</PrimaryLink>} /><form className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-[1fr_180px_auto]"><input name="q" defaultValue={params.q} placeholder="Buscar por nome, e-mail ou documento" className="min-h-11 rounded-xl border border-border px-3" /><select name="status" defaultValue={params.status} className="min-h-11 rounded-xl border border-border bg-background px-3"><option value="">Todos os status</option><option value="active">Ativos</option><option value="inactive">Inativos</option></select><button className="rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground">Filtrar</button></form>{clients.length ? <TableWrap><thead className={tableHeadClass}><tr><th className={tableCellClass}>Cliente</th><th className={tableCellClass}>CPF/CNPJ</th><th className={tableCellClass}>Empresas</th><th className={tableCellClass}>Status</th><th className={tableCellClass}>Cadastro</th><th className={tableCellClass}>Ações</th></tr></thead><tbody>{clients.map((client) => <tr key={client.id} className={tableRowClass}><td className={tableCellClass}><p className="font-bold">{client.name}</p><p className="text-xs text-muted-foreground">{client.email}</p></td><td className={tableCellClass}>{client.cpfCnpj ?? "—"}</td><td className={tableCellClass}>{client._count.companies}</td><td className={tableCellClass}><StatusBadge active={client.active} /></td><td className={tableCellClass}>{formatDate(client.createdAt)}</td><td className={`${tableCellClass} whitespace-nowrap`}><Link href={`/admin/clientes/${client.id}`} className="mr-3 font-bold text-accent">Visualizar</Link><form action={toggleClientAction.bind(null, client.id)} className="inline"><button className="font-bold text-muted-foreground">{client.active ? "Desativar" : "Ativar"}</button></form></td></tr>)}</tbody></TableWrap> : <EmptyState title="Nenhum cliente encontrado" description="Ajuste os filtros ou cadastre o primeiro cliente." />}<nav className="flex items-center justify-end gap-3 text-sm"><Link aria-disabled={page <= 1} href={`?q=${params.q ?? ""}&status=${params.status ?? ""}&page=${Math.max(1, page - 1)}`} className="rounded-lg border border-border px-3 py-2">Anterior</Link><span>{page} de {pages}</span><Link aria-disabled={page >= pages} href={`?q=${params.q ?? ""}&status=${params.status ?? ""}&page=${Math.min(pages, page + 1)}`} className="rounded-lg border border-border px-3 py-2">Próxima</Link></nav></>;
}
