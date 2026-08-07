import type { Client, Company } from "@/generated/prisma/client";
import { uploadDocumentAction } from "@/app/actions/documents";
import { ActionForm } from "@/components/ui/action-form";
import { Field, FormGrid, Input, Select, Textarea } from "@/components/ui/fields";

export function DocumentForm({ clients, companies }: { clients: Pick<Client, "id" | "name">[]; companies: (Pick<Company, "id" | "legalName" | "clientId">)[] }) {
  return (
    <ActionForm action={uploadDocumentAction} submitLabel="Enviar documento" pendingLabel="Enviando...">
      <FormGrid>
        <Field label="Cliente"><Select name="clientId" required><option value="">Selecione</option>{clients.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select></Field>
        <Field label="Empresa" hint="A empresa selecionada deve pertencer ao cliente."><Select name="companyId"><option value="">Sem empresa específica</option>{companies.map((item) => <option key={item.id} value={item.id}>{item.legalName}</option>)}</Select></Field>
        <Field label="Tipo"><Select name="type" required><option value="BOLETO">Boleto</option><option value="NOTA_FISCAL">Nota fiscal</option><option value="CONTRATO">Contrato</option><option value="OUTRO">Outro</option></Select></Field>
        <Field label="Título"><Input name="title" required /></Field>
        <Field label="Competência"><Input name="referenceMonth" type="date" /></Field>
        <Field label="Vencimento"><Input name="dueDate" type="date" /></Field>
      </FormGrid>
      <Field label="Descrição"><Textarea name="description" /></Field>
      <Field label="Arquivo PDF" hint="Máximo de 10 MB. O conteúdo do arquivo também será validado."><Input name="file" type="file" accept="application/pdf,.pdf" required /></Field>
    </ActionForm>
  );
}
