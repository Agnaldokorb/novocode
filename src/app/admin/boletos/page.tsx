import { PageHeader, PrimaryLink } from "@/components/ui/display";
import { AdminDocumentList } from "@/components/admin/document-list";
export default function AdminBoletosPage() { return <><PageHeader title="Boletos" description="Todos os boletos cadastrados." action={<PrimaryLink href="/admin/documentos">Enviar boleto</PrimaryLink>} /><AdminDocumentList type="BOLETO" /></>; }
