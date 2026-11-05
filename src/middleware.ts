import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercepta apenas rotas administrativas
  if (pathname.startsWith('/admin')) {
    // A rota de login é pública
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let isAuthenticated = false;

    // 1. Verifica autenticação via Supabase SSR se as chaves estiverem configuradas
    if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('seu-projeto')) {
      try {
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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
        });

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    } else {
      // 2. Fallback de verificação de cookie de sessão administrativa
      const sessionCookie = request.cookies.get('admin_session')?.value;
      if (sessionCookie === 'active') {
        isAuthenticated = true;
      }
    }

    // Se não estiver autenticado, redireciona imediatamente para a tela de login
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
