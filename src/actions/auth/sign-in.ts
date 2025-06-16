"use server";

import { resetPasswordSchema } from "@/lib/schemas";
import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Action para fazer login
export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("🔐 Tentativa de login");

  try {
    const supabase = await createSupabaseServerClient();

    // Login no Supabase Auth
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("❌ Erro no Supabase Auth:", authError);
      return { error: "Credenciais inválidas" };
    }

    console.log("✅ Login no Supabase Auth bem-sucedido");

    // TEMPORÁRIO: Pular verificação da tabela users devido a problemas de permissão
    if (email === "agnaldokorb@gmail.com") {
      console.log("✅ Usuário admin autorizado temporariamente");
      return { success: true };
    }

    return {
      error: "Usuário não autorizado para acessar o painel administrativo",
    };
  } catch (error) {
    console.error("❌ Erro geral no login:", error);
    return { error: "Erro interno do servidor" };
  }
}

// Action para fazer logout
export async function signOutAction() {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: "Erro ao fazer logout",
      };
    }

    revalidatePath("/", "layout");
    return {
      success: true,
      data: {
        message: "Logout realizado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro no signOut:", error);
    return {
      success: false,
      error: "Erro interno do servidor",
    };
  }
}

// Action para resetar senha
export async function resetPasswordAction(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries()); // Validar dados
    const parsedData = resetPasswordSchema.parse({
      email: data.email as string,
    });

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      parsedData.email,
      {
        redirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/auth/reset-password`,
      }
    );

    if (error) {
      return {
        success: false,
        error: getAuthErrorMessage(error.message),
      };
    }

    return {
      success: true,
      data: {
        message:
          "Email de recuperação enviado! Verifique sua caixa de entrada.",
      },
    };
  } catch (error) {
    console.error("Erro no resetPassword:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Função auxiliar para traduzir mensagens de erro
function getAuthErrorMessage(error: string): string {
  const errorMap: Record<string, string> = {
    "Invalid login credentials": "Email ou senha incorretos",
    "Email not confirmed":
      "Email não confirmado. Verifique sua caixa de entrada",
    "User not found": "Usuário não encontrado",
    "Invalid email": "Email inválido",
    "Password should be at least 6 characters":
      "A senha deve ter pelo menos 6 caracteres",
    "User already registered": "Usuário já cadastrado",
    "Email already registered": "Email já cadastrado",
    "Email rate limit exceeded":
      "Muitas tentativas. Tente novamente em alguns minutos",
    "Invalid credentials": "Credenciais inválidas",
    "Authentication failed": "Falha na autenticação",
  };

  return errorMap[error] || "Erro de autenticação. Tente novamente";
}
