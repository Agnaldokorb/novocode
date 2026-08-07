import { z } from "zod";
import { digits, optionalText } from "@/lib/validations/shared";

export const companySchema = z.object({
  clientId: z.string().uuid(),
  legalName: z.string().trim().min(2).max(180),
  tradeName: optionalText.pipe(z.string().max(180).optional()),
  cnpj: z.string().transform(digits).refine((value) => value.length === 14, "CNPJ inválido."),
  email: optionalText.pipe(z.string().email().max(254).optional()),
  phone: optionalText.pipe(z.string().max(30).optional()),
  address: optionalText.pipe(z.string().max(240).optional()),
  city: optionalText.pipe(z.string().max(100).optional()),
  state: optionalText.pipe(z.string().length(2).transform((value) => value.toUpperCase()).optional()),
  zipCode: optionalText.pipe(z.string().transform(digits).refine((value) => value.length === 8).optional()),
});

export const companyUpdateSchema = companySchema.extend({ id: z.string().uuid() });
