import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui/display";
import { CompanyForm } from "@/components/admin/company-form";

export default async function NewCompanyPage() {
  const clients = await prisma.client.findMany({ where: { active: true }, orderBy: { name: "asc" }, select: { id: true, name: true } });
  return <><PageHeader title="Nova empresa" description="Toda empresa deve pertencer a um cliente ativo." /><Card><CompanyForm clients={clients} /></Card></>;
}
