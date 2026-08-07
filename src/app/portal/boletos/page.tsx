import { requirePortalUser } from "@/lib/auth/session";
import { PageHeader } from "@/components/ui/display";
import { PortalDocumentList } from "@/components/portal/document-list";
export default async function PortalBoletosPage() { const user = await requirePortalUser(); return <><PageHeader title="Boletos" description="Boletos disponíveis para suas empresas." /><PortalDocumentList clientId={user.clientId!} type="BOLETO" /></>; }
