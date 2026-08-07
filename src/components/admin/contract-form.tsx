import type { Client, Company, Contract, Document } from "@/generated/prisma/client";
import { createContractAction, updateContractAction } from "@/app/actions/contracts";
import { ActionForm } from "@/components/ui/action-form";
import { Field, FormGrid, Input, Select, Textarea } from "@/components/ui/fields";

type ContractData = Contract | undefined;
const dateValue = (date?: Date | null) => date ? date.toISOString().slice(0, 10) : "";

export function ContractForm({ contract, clients, companies, documents }: { contract?: ContractData; clients: Pick<Client, "id" | "name">[]; companies: Pick<Company, "id" | "legalName">[]; documents: Pick<Document, "id" | "title">[] }) {
  return (
    <ActionForm action={contract ? updateContractAction : createContractAction} submitLabel={contract ? "Atualizar contrato" : "Cadastrar contrato"}>
      {contract && <input type="hidden" name="id" value={contract.id} />}
      <FormGrid>
        <Field label="Cliente"><Select name="clientId" defaultValue={contract?.clientId} required><option value="">Selecione</option>{clients.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Select></Field>
        <Field label="Empresa"><Select name="companyId" defaultValue={contract?.companyId ?? ""}><option value="">Sem empresa específica</option>{companies.map((item) => <option key={item.id} value={item.id}>{item.legalName}</option>)}</Select></Field>
        <Field label="Título"><Input name="title" defaultValue={contract?.title} required /></Field>
        <Field label="Status"><Select name="status" defaultValue={contract?.status ?? "PENDING"}><option value="PENDING">Pendente</option><option value="ACTIVE">Ativo</option><option value="EXPIRED">Expirado</option><option value="CANCELLED">Cancelado</option></Select></Field>
        <Field label="Início"><Input name="startDate" type="date" defaultValue={dateValue(contract?.startDate)} required /></Field>
        <Field label="Vencimento"><Input name="endDate" type="date" defaultValue={dateValue(contract?.endDate)} /></Field>
        <Field label="PDF já enviado"><Select name="documentId" defaultValue={contract?.documentId ?? ""}><option value="">Sem documento vinculado</option>{documents.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</Select></Field>
      </FormGrid>
      <Field label="Descrição"><Textarea name="description" defaultValue={contract?.description ?? ""} /></Field>
    </ActionForm>
  );
}
