import type { Client, Company } from "@/generated/prisma/client";
import { createCompanyAction, updateCompanyAction } from "@/app/actions/companies";
import { ActionForm } from "@/components/ui/action-form";
import { Field, FormGrid, Input, Select } from "@/components/ui/fields";

export function CompanyForm({
  company,
  clients,
}: {
  company?: Company;
  clients: Pick<Client, "id" | "name">[];
}) {
  return (
    <ActionForm
      action={company ? updateCompanyAction : createCompanyAction}
      submitLabel={company ? "Atualizar empresa" : "Criar empresa"}
    >
      {company && <input type="hidden" name="id" value={company.id} />}
      <FormGrid>
        <Field label="Cliente">
          <Select name="clientId" defaultValue={company?.clientId} required>
            <option value="">Selecione</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Razão social">
          <Input name="legalName" defaultValue={company?.legalName} required />
        </Field>
        <Field label="Nome fantasia">
          <Input name="tradeName" defaultValue={company?.tradeName ?? ""} />
        </Field>
        <Field label="CNPJ">
          <Input name="cnpj" defaultValue={company?.cnpj} inputMode="numeric" required />
        </Field>
        <Field label="E-mail">
          <Input name="email" type="email" defaultValue={company?.email ?? ""} />
        </Field>
        <Field label="Telefone">
          <Input name="phone" defaultValue={company?.phone ?? ""} />
        </Field>
        <Field label="Endereço">
          <Input name="address" defaultValue={company?.address ?? ""} />
        </Field>
        <Field label="Cidade">
          <Input name="city" defaultValue={company?.city ?? ""} />
        </Field>
        <Field label="UF">
          <Input name="state" defaultValue={company?.state ?? ""} maxLength={2} />
        </Field>
        <Field label="CEP">
          <Input name="zipCode" defaultValue={company?.zipCode ?? ""} inputMode="numeric" />
        </Field>
      </FormGrid>
    </ActionForm>
  );
}
