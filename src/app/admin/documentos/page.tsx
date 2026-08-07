import { prisma } from "@/lib/prisma";
import { PageHeader, Card } from "@/components/ui/display";
import { DocumentForm } from "@/components/admin/document-form";
import { AdminDocumentList } from "@/components/admin/document-list";

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const [clients, companies] = await Promise.all([prisma.client.findMany({ where: { active: true }, orderBy: { name: "asc" }, select: { id: true, name: true } }), prisma.company.findMany({ where: { active: true }, orderBy: { legalName: "asc" }, select: { id: true, legalName: true, clientId: true } })]);
  return <><PageHeader title="Documentos" description="Upload privado e gestão centralizada de arquivos financeiros." /><Card><h2 className="mb-5 text-lg font-black">Enviar documento</h2><DocumentForm clients={clients} companies={companies} /></Card><form className="flex gap-3"><input name="q" defaultValue={q} placeholder="Buscar por título ou arquivo" className="min-h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3" /><button className="rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground">Buscar</button></form><AdminDocumentList query={q} /></>;
}
