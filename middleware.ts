import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // Criar response inicial
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    }
  });

  // Configurar Supabase para middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { pathname } = request.nextUrl;

  // Rotas que sempre podem ser acessadas durante manutenção
  const allowedDuringMaintenance = [
    '/maintenance',
    '/api/maintenance-status',
    '/admin',
    '/auth',
    '/_next',
    '/favicon',
    '/public'
  ];

  // Verificar se a rota é permitida durante manutenção
  const isAllowedPath = allowedDuringMaintenance.some(path => 
    pathname.startsWith(path)
  );

  if (isAllowedPath) {
    return response;
  }

  try {
    // Verificar modo de manutenção
    const { data: siteConfig, error } = await supabase
      .from('site_config')
      .select('maintenanceMode')
      .single();

    // Se erro ou não está em manutenção, continuar normalmente
    if (error || !siteConfig?.maintenanceMode) {
      return response;
    }

    // Verificar se usuário é admin
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('role, isActive')
        .eq('email', user.email)
        .single();

      // Se é admin ativo, permitir acesso
      if (userData?.role === 'ADMIN' && userData?.isActive) {
        return response;
      }
    }

    // Redirecionar para página de manutenção
    const maintenanceUrl = new URL('/maintenance', request.url);
    return NextResponse.redirect(maintenanceUrl);

  } catch (error) {
    console.error('Erro no middleware de manutenção:', error);
    // Em caso de erro, permitir acesso
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Verificar manutenção em todas as rotas exceto:
     * - api (handled by route handlers)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
