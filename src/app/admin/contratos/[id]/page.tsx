import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui/display";
import { ContractForm } from "@/components/admin/contract-form";

export default async function ContractDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [contract, clients, companies, documents] = await Promise.all([prisma.contract.findUnique({ where: { id } }), prisma.client.findMany({ select: { id: true, name: true } }), prisma.company.findMany({ select: { id: true, legalName: true } }), prisma.document.findMany({ where: { type: "CONTRATO", OR: [{ contract: null }, { contract: { id } }] }, select: { id: true, title: true } })]);
  if (!contract) notFound();
  return <><PageHeader title={contract.title} description="Atualize os dados contratuais." /><Card><ContractForm contract={contract} clients={clients} companies={companies} documents={documents} /></Card></>;
}
