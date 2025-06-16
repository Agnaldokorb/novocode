import { createSupabaseServerClient } from "@/lib/supabase";
import { User } from "@prisma/client";

export async function getCurrentUser(): Promise<User | null> {
  try {
    console.log("🔍 Buscando usuário atual...");

    const supabase = await createSupabaseServerClient();

    // Pegar usuário autenticado no Supabase Auth
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();    if (!authUser) {
      console.log("❌ Nenhum usuário autenticado no Supabase Auth");
      return null;
    }

    console.log("✅ Usuário autenticado no Supabase Auth");

    // Buscar dados do usuário na tabela
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", authUser.email)
      .single();

    if (error) {
      console.log("❌ Erro ao buscar usuário na tabela:", error);
      return null;
    }

    if (!userData) {
      console.log("❌ Usuário não encontrado na tabela users");
      return null;    }

    console.log("✅ Usuário encontrado na tabela");

    return userData as User;
  } catch (error) {
    console.error("💥 Erro ao buscar usuário atual:", error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  console.log("🔐 Verificando autenticação obrigatória...");

  const user = await getCurrentUser();

  if (!user) {
    console.log("❌ Usuário não autenticado");
    throw new Error("Usuário não autenticado");
  }

  if (!user.isActive) {
    console.log("❌ Usuário inativo");
    throw new Error("Usuário inativo");
  }

  console.log("✅ Autenticação verificada com sucesso");
  return user;
}

export async function requireAdmin(): Promise<User> {
  console.log("👑 Verificando permissões de administrador...");

  const user = await requireAuth();

  if (user.role !== "ADMIN") {
    console.log("❌ Usuário não é ADMIN. Role atual:", user.role);
    throw new Error("Acesso negado: apenas administradores");
  }

  console.log("✅ Permissões de administrador verificadas");
  return user;
}
