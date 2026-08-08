import type { User } from "@/generated/prisma/client";
import { createClientUserAction, resetClientPasswordAction } from "@/app/actions/users";
import { ActionForm } from "@/components/ui/action-form";
import { Field, FormGrid, Input } from "@/components/ui/fields";

export function CreateAccessForm({ clientId, defaultName, defaultEmail }: { clientId: string; defaultName: string; defaultEmail: string }) {
  return <ActionForm action={createClientUserAction} submitLabel="Criar acesso e enviar e-mail"><input type="hidden" name="clientId" value={clientId} /><FormGrid><Field label="Nome"><Input name="name" defaultValue={defaultName} required /></Field><Field label="E-mail"><Input name="email" type="email" defaultValue={defaultEmail} required /></Field><Field label="Senha temporária" hint="Mínimo de 12 caracteres. O cliente receberá um e-mail para criar a senha definitiva."><Input name="password" type="password" minLength={12} required /></Field></FormGrid></ActionForm>;
}

export function ResetAccessForm({ user }: { user: Pick<User, "id"> }) {
  return <ActionForm action={resetClientPasswordAction} submitLabel="Redefinir e reenviar e-mail"><input type="hidden" name="userId" value={user.id} /><Field label="Nova senha temporária" hint="O cliente receberá um novo link para definir a senha definitiva."><Input name="password" type="password" minLength={12} required /></Field></ActionForm>;
}
