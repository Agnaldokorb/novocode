import { requirePortalUser } from "@/lib/auth/session";
import { PageHeader } from "@/components/ui/display";
import { PortalDocumentList } from "@/components/portal/document-list";
export default async function PortalInvoicesPage() { const user = await requirePortalUser(); return <><PageHeader title="Notas fiscais" description="Notas fiscais disponíveis para suas empresas." /><PortalDocumentList clientId={user.clientId!} type="NOTA_FISCAL" /></>; }
