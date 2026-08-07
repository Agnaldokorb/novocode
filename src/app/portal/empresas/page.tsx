import { requirePortalUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card, EmptyState, StatusBadge } from "@/components/ui/display";

export default async function PortalCompaniesPage() {
  const user = await requirePortalUser();
  const companies = await prisma.company.findMany({ where: { clientId: user.clientId! }, orderBy: { legalName: "asc" } });
  return <><PageHeader title="Minhas empresas" description="Informações das empresas vinculadas à sua conta." />{companies.length ? <div className="grid gap-4 md:grid-cols-2">{companies.map((company) => <Card key={company.id}><div className="flex items-start justify-between gap-3"><div><h2 className="font-black">{company.legalName}</h2><p className="text-sm text-muted-foreground">{company.tradeName}</p></div><StatusBadge active={company.active} /></div><dl className="mt-5 grid grid-cols-[110px_1fr] gap-2 text-sm"><dt className="text-muted-foreground">CNPJ</dt><dd>{company.cnpj}</dd><dt className="text-muted-foreground">E-mail</dt><dd>{company.email ?? "—"}</dd><dt className="text-muted-foreground">Telefone</dt><dd>{company.phone ?? "—"}</dd><dt className="text-muted-foreground">Endereço</dt><dd>{[company.address, company.city, company.state, company.zipCode].filter(Boolean).join(" · ") || "—"}</dd></dl></Card>)}</div> : <EmptyState title="Nenhuma empresa" description="Não há empresas vinculadas à sua conta." />}</>;
}
