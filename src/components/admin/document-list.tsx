import type { DocumentType } from "@/generated/prisma/enums";
import { deleteDocumentAction, replaceDocumentAction } from "@/app/actions/documents";
import { ActionForm } from "@/components/ui/action-form";
import { ConfirmAction } from "@/components/ui/confirm-action";
import {
  EmptyState,
  TableWrap,
  tableCellClass,
  tableHeadClass,
  tableRowClass,
} from "@/components/ui/display";
import { Input } from "@/components/ui/fields";
import { documentTypeLabel, formatBytes, formatDate } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export async function AdminDocumentList({
  type,
  query,
}: {
  type?: DocumentType;
  query?: string;
}) {
  const documents = await prisma.document.findMany({
    where: {
      ...(type ? { type } : {}),
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" as const } },
              { fileName: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    take: 50,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { name: true } },
      company: { select: { legalName: true } },
    },
  });

  if (!documents.length) {
    return (
      <EmptyState
        title="Nenhum documento"
        description="Os documentos enviados aparecerão nesta listagem."
      />
    );
  }

  return (
    <TableWrap>
      <thead className={tableHeadClass}>
        <tr>
          <th className={tableCellClass}>Documento</th>
          <th className={tableCellClass}>Cliente / Empresa</th>
          <th className={tableCellClass}>Tipo</th>
          <th className={tableCellClass}>Competência</th>
          <th className={tableCellClass}>Tamanho</th>
          <th className={tableCellClass}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr key={document.id} className={tableRowClass}>
            <td className={tableCellClass}>
              <p className="font-bold">{document.title}</p>
              <p className="text-xs text-muted-foreground">{document.fileName}</p>
            </td>
            <td className={tableCellClass}>
              <p>{document.client.name}</p>
              <p className="text-xs text-muted-foreground">
                {document.company?.legalName ?? "Sem empresa"}
              </p>
            </td>
            <td className={tableCellClass}>{documentTypeLabel(document.type)}</td>
            <td className={tableCellClass}>{formatDate(document.referenceMonth)}</td>
            <td className={tableCellClass}>{formatBytes(document.fileSize)}</td>
            <td className={`${tableCellClass} min-w-64`}>
              <div className="flex items-center gap-3">
                <a
                  href={`/api/documents/${document.id}/download`}
                  className="font-bold text-accent"
                >
                  Download
                </a>
                <ConfirmAction
                  action={deleteDocumentAction.bind(null, document.id)}
                  label="Excluir"
                  confirmMessage="Tem certeza que deseja excluir este documento? O arquivo privado também será removido."
                />
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-bold text-muted-foreground">
                  Substituir arquivo
                </summary>
                <div className="mt-2">
                  <ActionForm
                    action={replaceDocumentAction}
                    submitLabel="Substituir"
                    pendingLabel="Enviando..."
                    className="space-y-2"
                  >
                    <input type="hidden" name="documentId" value={document.id} />
                    <Input name="file" type="file" accept="application/pdf,.pdf" required />
                  </ActionForm>
                </div>
              </details>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrap>
  );
}
