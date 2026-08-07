import Link from "next/link";
import { toggleCompanyAction } from "@/app/actions/companies";
import {
  EmptyState,
  PageHeader,
  PrimaryLink,
  StatusBadge,
  TableWrap,
  tableCellClass,
  tableHeadClass,
  tableRowClass,
} from "@/components/ui/display";
import { prisma } from "@/lib/prisma";

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const take = 10;
  const where = params.q
    ? {
        OR: [
          { legalName: { contains: params.q, mode: "insensitive" as const } },
          { tradeName: { contains: params.q, mode: "insensitive" as const } },
          { cnpj: { contains: params.q } },
        ],
      }
    : {};

  const [companies, total] = await Promise.all([
    prisma.company.findMany({
      where,
      skip: (page - 1) * take,
      take,
      orderBy: { legalName: "asc" },
      include: {
        client: { select: { name: true } },
        _count: { select: { documents: true } },
      },
    }),
    prisma.company.count({ where }),
  ]);
  const pages = Math.max(1, Math.ceil(total / take));

  return (
    <>
      <PageHeader
        title="Empresas"
        description={`${total} empresa(s) encontrada(s).`}
        action={<PrimaryLink href="/admin/empresas/nova">Nova empresa</PrimaryLink>}
      />
      <form className="flex gap-3 rounded-2xl border border-border bg-background p-4">
        <input
          name="q"
          defaultValue={params.q}
          placeholder="Buscar por razão social, nome fantasia ou CNPJ"
          className="min-h-11 flex-1 rounded-xl border border-border px-3"
        />
        <button className="rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground">
          Buscar
        </button>
      </form>
      {companies.length ? (
        <TableWrap>
          <thead className={tableHeadClass}>
            <tr>
              <th className={tableCellClass}>Empresa</th>
              <th className={tableCellClass}>Cliente</th>
              <th className={tableCellClass}>CNPJ</th>
              <th className={tableCellClass}>Documentos</th>
              <th className={tableCellClass}>Status</th>
              <th className={tableCellClass}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className={tableRowClass}>
                <td className={tableCellClass}>
                  <p className="font-bold">{company.legalName}</p>
                  <p className="text-xs text-muted-foreground">{company.tradeName ?? "—"}</p>
                </td>
                <td className={tableCellClass}>{company.client.name}</td>
                <td className={tableCellClass}>{company.cnpj}</td>
                <td className={tableCellClass}>{company._count.documents}</td>
                <td className={tableCellClass}>
                  <StatusBadge active={company.active} />
                </td>
                <td className={`${tableCellClass} whitespace-nowrap`}>
                  <Link href={`/admin/empresas/${company.id}`} className="mr-3 font-bold text-accent">
                    Editar
                  </Link>
                  <form action={toggleCompanyAction.bind(null, company.id)} className="inline">
                    <button className="font-bold text-muted-foreground">
                      {company.active ? "Desativar" : "Ativar"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      ) : (
        <EmptyState title="Nenhuma empresa encontrada" description="Ajuste a busca ou cadastre a primeira empresa." />
      )}
      <nav className="flex items-center justify-end gap-3 text-sm">
        <Link
          aria-disabled={page <= 1}
          href={`?q=${params.q ?? ""}&page=${Math.max(1, page - 1)}`}
          className="rounded-lg border border-border px-3 py-2"
        >
          Anterior
        </Link>
        <span>{page} de {pages}</span>
        <Link
          aria-disabled={page >= pages}
          href={`?q=${params.q ?? ""}&page=${Math.min(pages, page + 1)}`}
          className="rounded-lg border border-border px-3 py-2"
        >
          Próxima
        </Link>
      </nav>
    </>
  );
}
