import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card, StatusBadge } from "@/components/ui/display";
import { CompanyForm } from "@/components/admin/company-form";

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [company, clients] = await Promise.all([prisma.company.findUnique({ where: { id } }), prisma.client.findMany({ where: { active: true }, orderBy: { name: "asc" }, select: { id: true, name: true } })]);
  if (!company) notFound();
  return <><PageHeader title={company.legalName} description="Edite os dados e o vínculo com o cliente." action={<StatusBadge active={company.active} />} /><Card><CompanyForm company={company} clients={clients} /></Card></>;
}
