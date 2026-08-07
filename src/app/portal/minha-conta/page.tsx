import { requirePortalUser } from "@/lib/auth/session";
import { PageHeader, Card } from "@/components/ui/display";
import { ActionForm } from "@/components/ui/action-form";
import { Field, FormGrid, Input } from "@/components/ui/fields";
import { updateMyAccountAction } from "@/app/actions/account";

export default async function MyAccountPage() {
  const user = await requirePortalUser();
  return <><PageHeader title="Minha conta" description="Você pode atualizar somente dados pessoais seguros." /><Card><ActionForm action={updateMyAccountAction} submitLabel="Atualizar dados"><FormGrid><Field label="Nome"><Input name="name" defaultValue={user.name} required /></Field><Field label="E-mail" hint="O e-mail de acesso deve ser alterado pelo suporte."><Input value={user.email} disabled /></Field><Field label="Telefone"><Input name="phone" defaultValue={user.client?.phone ?? ""} /></Field><Field label="Perfil"><Input value="Cliente" disabled /></Field></FormGrid></ActionForm></Card></>;
}
