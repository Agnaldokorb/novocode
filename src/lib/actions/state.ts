import type { ZodError } from "zod";

export type ActionState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const initialActionState: ActionState = { ok: false, message: "" };

export function validationState(error: ZodError): ActionState {
  return {
    ok: false,
    message: "Revise os campos destacados.",
    errors: error.flatten().fieldErrors as Record<string, string[]>,
  };
}

export function failureState(message = "Não foi possível concluir a operação."): ActionState {
  return { ok: false, message };
}
