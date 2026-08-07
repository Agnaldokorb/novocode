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
