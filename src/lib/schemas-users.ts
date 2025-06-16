import { z } from "zod";
import { UserRole } from "@prisma/client";

// Schema para validação de email
const emailSchema = z.string().email("Email inválido");

// Schemas para gerenciamento de usuários
export const createUserSchema = z.object({
  email: emailSchema,
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
  role: z.nativeEnum(UserRole, {
    required_error: "Função é obrigatória",
  }),
});

export const updateUserSchema = z.object({
  id: z.string().cuid("ID inválido"),
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome muito longo")
    .optional(),
  role: z.nativeEnum(UserRole).optional(),
  isActive: z.boolean().optional(),
});

export const resetPasswordSchema = z.object({
  id: z.string().cuid("ID inválido"),
  newPassword: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
