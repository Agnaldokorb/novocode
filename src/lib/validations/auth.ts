import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
  password: z.string().min(1, "Informe sua senha."),
});

export const clientUserSchema = z.object({
  clientId: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  password: z
    .string()
    .min(12, "A senha temporária deve ter ao menos 12 caracteres.")
    .max(72),
});

export const resetPasswordSchema = z.object({
  userId: z.string().uuid(),
  password: z.string().min(12).max(72),
});
