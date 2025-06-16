import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import PageContainer from "@/components/ui/page-container";
import LoginForm from "./_components/form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default async function LoginPage() {
  // Verificar se o usuário já está logado
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // TEMPORÁRIO: Verificar apenas se é o email admin
    if (user.email === "agnaldokorb@gmail.com") {
      redirect("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <PageContainer className="w-full max-w-md">
        <div className="space-y-6">
          {/* Logo e header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">NOVOCODE</h1>
            <p className="text-sm text-slate-600">Tecnologia e Sistemas LTDA</p>
          </div>

          {/* Formulário de login */}
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
          </Suspense>

          {/* Footer */}
          <div className="text-center text-xs text-slate-500">
            <p>© 2025 NOVOCODE. Todos os direitos reservados.</p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

// Componente de loading para o formulário
function LoginFormSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </CardContent>
    </Card>
  );
}

// Metadata da página
export const metadata = {
  title: "Login - NOVOCODE Admin",
  description: "Acesso ao painel administrativo da NOVOCODE",
  robots: "noindex, nofollow", // Não indexar página de login
};
