import type { Client } from "@/generated/prisma/client";
import { createClientAction, updateClientAction } from "@/app/actions/clients";
import { ActionForm } from "@/components/ui/action-form";
import { Field, FormGrid, Input } from "@/components/ui/fields";

export function ClientForm({ client }: { client?: Client }) {
  return (
    <ActionForm action={client ? updateClientAction : createClientAction} submitLabel={client ? "Atualizar cliente" : "Criar cliente"}>
      {client && <input type="hidden" name="id" value={client.id} />}
      <FormGrid>
        <Field label="Nome"><Input name="name" defaultValue={client?.name} required /></Field>
        <Field label="E-mail"><Input name="email" type="email" defaultValue={client?.email} required /></Field>
        <Field label="Telefone"><Input name="phone" defaultValue={client?.phone ?? ""} /></Field>
        <Field label="CPF ou CNPJ"><Input name="cpfCnpj" defaultValue={client?.cpfCnpj ?? ""} /></Field>
      </FormGrid>
    </ActionForm>
  );
}
