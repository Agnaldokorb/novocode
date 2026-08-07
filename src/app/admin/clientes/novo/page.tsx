import { PageHeader, Card } from "@/components/ui/display";
import { ClientForm } from "@/components/admin/client-form";

export default function NewClientPage() {
  return <><PageHeader title="Novo cliente" description="Cadastre os dados antes de criar o acesso ao portal." /><Card><ClientForm /></Card></>;
}
