import { PageHeader, PrimaryLink } from "@/components/ui/display";
import { AdminDocumentList } from "@/components/admin/document-list";
export default function AdminInvoicesPage() { return <><PageHeader title="Notas fiscais" description="Todas as notas fiscais cadastradas." action={<PrimaryLink href="/admin/documentos">Enviar nota fiscal</PrimaryLink>} /><AdminDocumentList type="NOTA_FISCAL" /></>; }
