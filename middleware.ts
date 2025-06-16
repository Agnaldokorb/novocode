import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseMiddlewareClient(request, response);

  console.log("🛡️ Middleware executando para:", request.nextUrl.pathname);

  // Verificar modo de manutenção primeiro
  let isMaintenanceMode = false;
  try {
    const { data: siteConfig, error } = await supabase
      .from("site_config")
      .select("maintenanceMode")
      .single();

    if (error) {
      console.log("⚠️ Erro ao verificar modo manutenção:", error.message);
      // Em caso de erro, não ativar modo manutenção por segurança
      isMaintenanceMode = false;
    } else {
      isMaintenanceMode = siteConfig?.maintenanceMode || false;
    }
  } catch (error) {
    console.log("⚠️ Erro na conexão para verificar manutenção:", error);
    // Em caso de erro de conexão, não ativar modo manutenção
    isMaintenanceMode = false;
  }

  // Rotas que ficam acessíveis durante manutenção
  const maintenanceAllowedRoutes = [
    "/admin",
    "/login", 
    "/maintenance",
    "/api",
    "/_next",
    "/favicon.ico"
  ];

  const isMaintenanceAllowed = maintenanceAllowedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Se está em modo manutenção e tentando acessar rota não permitida
  if (isMaintenanceMode && !isMaintenanceAllowed) {
    console.log("🚧 Redirecionando para página de manutenção");
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Rotas que precisam de autenticação
  const protectedRoutes = ["/admin"];
  const authRoutes = ["/login"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  console.log("🔍 Tipo de rota:", { isProtectedRoute, isAuthRoute });

  // Verificar se o usuário está autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👤 Usuário autenticado:", user ? user.email : "Nenhum");

  // Se está tentando acessar rota protegida sem estar logado
  if (isProtectedRoute && !user) {
    console.log("❌ Acesso negado: rota protegida sem autenticação");
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Se está logado e tentando acessar página de login, redirecionar para admin
  if (isAuthRoute && user) {
    console.log(
      "🔍 Usuário logado tentando acessar página de login - verificando permissões"
    );

    // Verificar se o usuário está ativo na tabela users e é admin
    const { data: userData, error } = await supabase
      .from("users")
      .select("id, isActive, role")
      .eq("email", user.email)
      .single();

    console.log("📊 Dados do usuário na tabela:", { userData, error });

    if (userData && userData.isActive && userData.role === "ADMIN") {
      console.log("✅ Redirecionando usuário admin para /admin");
      return NextResponse.redirect(new URL("/admin", request.url));
    } else {
      console.log("❌ Usuário não tem permissões de admin");
    }
  }

  // Se está em rota protegida e está logado, verificar se tem permissão
  if (isProtectedRoute && user) {
    console.log("🔍 Verificando permissões para rota protegida");

    const { data: userData, error } = await supabase
      .from("users")
      .select("id, isActive, role")
      .eq("email", user.email)
      .single();

    console.log("📊 Verificação de permissões:", { userData, error });

    // Se usuário não existe na tabela, está inativo ou não é admin
    if (!userData || !userData.isActive || userData.role !== "ADMIN") {
      console.log(
        "❌ Permissões insuficientes - fazendo logout e redirecionando"
      );
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL("/login", request.url));
    }

    console.log("✅ Permissões verificadas - acesso autorizado");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
