import { z } from "zod";

export const uuidSchema = z.string().uuid("Identificador inválido.");
export const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().optional(),
);

export function optionalDate(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function brazilianPhoneForAuth(value: string | null | undefined) {
  if (!value) return null;
  const internationalInput = value.trim().startsWith("+");

  let phone = digits(value);
  if (internationalInput && !phone.startsWith("55")) return null;
  if (phone.startsWith("0") && (phone.length === 11 || phone.length === 12)) {
    phone = phone.slice(1);
  }
  if (phone.length === 10 || phone.length === 11) phone = `55${phone}`;

  return phone.startsWith("55") && (phone.length === 12 || phone.length === 13)
    ? phone
    : null;
}
