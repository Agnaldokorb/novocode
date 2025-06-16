"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { User, UserRole } from "@prisma/client";
import {
  createUserSchema,
  updateUserSchema,
  resetPasswordSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type ResetPasswordInput,
} from "@/lib/schemas-users";

// Configuração do Supabase Admin
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

// Buscar todos os usuários (admin apenas)
export async function getAllUsers(): Promise<{
  success: boolean;
  data?: SafeUser[];
  error?: string;
}> {
  try {
    await requireAdmin();

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Converter datas para string para serialização
    const serializedUsers = users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return {
      success: true,
      data: serializedUsers,
    };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

// Criar novo usuário admin
export async function createUserAction(data: CreateUserInput): Promise<{
  success: boolean;
  data?: { user: SafeUser; message: string };
  error?: string;
}> {
  try {
    await requireAdmin();

    // Validar dados
    const validatedData = createUserSchema.parse(data);

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Já existe um usuário com este email",
      };
    }

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: validatedData.email,
        password: validatedData.password,
        email_confirm: true,
      });

    if (authError) {
      return {
        success: false,
        error: `Erro no Supabase Auth: ${authError.message}`,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: "Usuário não foi criado no Supabase",
      };
    } // Criar usuário na tabela local
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email: validatedData.email,
        name: validatedData.name,
        role: validatedData.role as UserRole,
        isActive: true,
      },
    });

    revalidatePath("/admin/settings");

    return {
      success: true,
      data: {
        user: {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        message: "Usuário criado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Atualizar usuário
export async function updateUserAction(data: UpdateUserInput): Promise<{
  success: boolean;
  data?: { user: SafeUser; message: string };
  error?: string;
}> {
  try {
    const currentUser = await requireAdmin();

    // Validar dados
    const validatedData = updateUserSchema.parse(data);

    // Não permitir que admin se desative
    if (
      validatedData.id === currentUser.id &&
      validatedData.isActive === false
    ) {
      return {
        success: false,
        error: "Você não pode desativar sua própria conta",
      };
    }

    // Verificar se usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id: validatedData.id },
    });

    if (!existingUser) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    } // Atualizar usuário
    const user = await prisma.user.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        role: validatedData.role as UserRole | undefined,
        isActive: validatedData.isActive,
      },
    });

    revalidatePath("/admin/settings");

    return {
      success: true,
      data: {
        user: {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        },
        message: "Usuário atualizado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Deletar usuário
export async function deleteUserAction(id: string): Promise<{
  success: boolean;
  data?: { message: string };
  error?: string;
}> {
  try {
    const currentUser = await requireAdmin();

    // Não permitir que admin se delete
    if (id === currentUser.id) {
      return {
        success: false,
        error: "Você não pode deletar sua própria conta",
      };
    }

    // Verificar se usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Deletar do Supabase Auth primeiro
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      console.warn("Erro ao deletar do Supabase Auth:", authError.message);
      // Continuar mesmo com erro no Supabase, pois o usuário pode não existir lá
    }

    // Deletar da tabela local
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/settings");

    return {
      success: true,
      data: {
        message: "Usuário deletado com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}

// Resetar senha do usuário
export async function resetUserPasswordAction(
  data: ResetPasswordInput
): Promise<{
  success: boolean;
  data?: { message: string };
  error?: string;
}> {
  try {
    await requireAdmin();

    // Validar dados
    const validatedData = resetPasswordSchema.parse(data);

    // Verificar se usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id: validatedData.id },
    });

    if (!existingUser) {
      return {
        success: false,
        error: "Usuário não encontrado",
      };
    }

    // Atualizar senha no Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      validatedData.id,
      { password: validatedData.newPassword }
    );

    if (authError) {
      return {
        success: false,
        error: `Erro ao atualizar senha: ${authError.message}`,
      };
    }

    return {
      success: true,
      data: {
        message: "Senha resetada com sucesso!",
      },
    };
  } catch (error) {
    console.error("Erro ao resetar senha:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
    };
  }
}
