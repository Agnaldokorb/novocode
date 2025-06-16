import { ReactNode } from "react";
import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/header";
import AdminSidebar from "@/components/admin/sidebar";
import { MaintenanceBanner } from "@/components/maintenance-banner";
import { Toaster } from "@/components/ui/sonner";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  console.log("🏗️ Verificando acesso ao painel admin...");

  // Verificar autenticação no servidor
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log(
      "❌ Usuário não autenticado no Supabase Auth - redirecionando para login"
    );
    redirect("/login");
  }

  console.log("✅ Usuário autenticado no Supabase Auth:", user.email);

  // Buscar dados do usuário na tabela
  const { data: userData, error } = await supabase
    .from("users")
    .select("id, email, name, role, isActive")
    .eq("email", user.email)
    .single();

  console.log("🔍 Resultado da busca na tabela users:", { userData, error });

  if (error) {
    console.log(
      "❌ Erro ao buscar usuário na tabela - redirecionando para login"
    );
    redirect("/login");
  }

  if (!userData) {
    console.log(
      "❌ Usuário não encontrado na tabela users - redirecionando para login"
    );
    redirect("/login");
  }

  if (!userData.isActive) {
    console.log("❌ Usuário inativo - redirecionando para login");
    redirect("/login");
  }

  if (userData.role !== "ADMIN") {
    console.log(
      "❌ Usuário não é ADMIN. Role atual:",
      userData.role,
      "- redirecionando para login"
    );
    redirect("/login");
  }
  console.log("🎉 Acesso ao painel admin autorizado para:", userData.email);
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="md:pl-64">
        <AdminHeader
          userEmail={userData.email}
          userName={userData.name || undefined}
        />
        {/* Banner de manutenção */}
        <div className="p-4 pb-0">
          <MaintenanceBanner />
        </div>
        <main className="flex-1">{children}</main>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}
