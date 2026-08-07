import { z } from "zod";
import { digits, optionalText } from "@/lib/validations/shared";

export const clientSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome.").max(160),
  email: z.string().trim().email("Informe um e-mail válido.").max(254),
  phone: optionalText.pipe(z.string().max(30).optional()),
  cpfCnpj: optionalText.pipe(
    z
      .string()
      .transform(digits)
      .refine((value) => value.length === 11 || value.length === 14, "CPF/CNPJ inválido.")
      .optional(),
  ),
});

export const clientUpdateSchema = clientSchema.extend({
  id: z.string().uuid(),
  active: z.coerce.boolean().optional(),
});
