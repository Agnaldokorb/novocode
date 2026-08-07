import type { DocumentType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { EmptyState, TableWrap, tableCellClass, tableHeadClass, tableRowClass } from "@/components/ui/display";
import { documentTypeLabel, formatDate } from "@/lib/format";

export async function PortalDocumentList({ clientId, type, query, companyId, from, to }: { clientId: string; type?: DocumentType; query?: string; companyId?: string; from?: string; to?: string }) {
  const documents = await prisma.document.findMany({
    where: {
      clientId,
      ...(type ? { type } : {}),
      ...(companyId ? { companyId } : {}),
      ...(query ? { OR: [{ title: { contains: query, mode: "insensitive" } }, { description: { contains: query, mode: "insensitive" } }] } : {}),
      ...((from || to) ? { createdAt: { ...(from ? { gte: new Date(`${from}T00:00:00.000Z`) } : {}), ...(to ? { lte: new Date(`${to}T23:59:59.999Z`) } : {}) } } : {}),
    },
    take: 100,
    orderBy: { createdAt: "desc" },
    include: { company: { select: { legalName: true } } },
  });
  if (!documents.length) return <EmptyState title="Nenhum documento disponível" description="Quando a equipe enviar arquivos, eles aparecerão aqui." />;
  return <TableWrap><thead className={tableHeadClass}><tr><th className={tableCellClass}>Documento</th><th className={tableCellClass}>Empresa</th><th className={tableCellClass}>Tipo</th><th className={tableCellClass}>Competência</th><th className={tableCellClass}>Vencimento</th><th className={tableCellClass}>Arquivo</th></tr></thead><tbody>{documents.map((document) => <tr key={document.id} className={tableRowClass}><td className={tableCellClass}><p className="font-bold">{document.title}</p><p className="text-xs text-muted-foreground">{document.description}</p></td><td className={tableCellClass}>{document.company?.legalName ?? "Geral"}</td><td className={tableCellClass}>{documentTypeLabel(document.type)}</td><td className={tableCellClass}>{formatDate(document.referenceMonth)}</td><td className={tableCellClass}>{formatDate(document.dueDate)}</td><td className={tableCellClass}><a href={`/api/documents/${document.id}/download`} className="font-bold text-accent">Download</a></td></tr>)}</tbody></TableWrap>;
}
