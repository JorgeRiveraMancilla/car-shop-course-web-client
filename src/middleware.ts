import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  PROTECTED_ROUTES,
  AUTH_ROUTES,
  PUBLIC_ROUTES,
} from './config/auth-config';

/**
 * Verifica si una ruta está protegida
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Verifica si es una ruta de autenticación
 */
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Verifica si es una ruta pública
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    route =>
      pathname === route || (route !== '/' && pathname.startsWith(`${route}/`))
  );
}

/**
 * Maneja la redirección después del login
 */
function getRedirectUrl(request: NextRequest, defaultPath: string): string {
  const searchParams = request.nextUrl.searchParams;
  const callbackUrl = searchParams.get('callbackUrl');

  // Validar que la URL de callback es segura
  if (callbackUrl) {
    try {
      const url = new URL(callbackUrl, request.url);
      // Solo permitir URLs del mismo dominio
      if (url.origin === request.nextUrl.origin) {
        return callbackUrl;
      }
    } catch {
      // URL inválida, usar la por defecto
    }
  }

  return defaultPath;
}

/**
 * Middleware principal de autenticación
 * Compatible con NextAuth v5.0.0-beta.28
 */
async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    // Usar auth directamente desde el export
    const session = await auth();
    const isAuthenticated = !!session?.user;

    // Si es una ruta de API, dejar que las maneje el servidor
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Si es una ruta de autenticación
    if (isAuthRoute(pathname)) {
      if (isAuthenticated) {
        // Redirigir a la URL de callback o al home
        const redirectUrl = getRedirectUrl(request, '/');
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
      // Permitir acceso a rutas de auth si no está autenticado
      return NextResponse.next();
    }

    // Si es una ruta protegida
    if (isProtectedRoute(pathname)) {
      if (!isAuthenticated) {
        // Guardar la URL actual para redirección después del login
        const signInUrl = new URL('/auth/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', request.url);

        return NextResponse.redirect(signInUrl);
      }

      // Usuario autenticado, permitir acceso
      return NextResponse.next();
    }

    // Para rutas dinámicas de auction (ej: /auction/[id]/edit)
    if (pathname.startsWith('/auction/') && pathname.endsWith('/edit')) {
      if (!isAuthenticated) {
        const signInUrl = new URL('/auth/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', request.url);
        return NextResponse.redirect(signInUrl);
      }
    }

    // Si es una ruta pública, permitir acceso sin verificaciones adicionales
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // Para cualquier otra ruta no especificada, permitir acceso
    return NextResponse.next();
  } catch {
    // En caso de error, si es una ruta protegida, redirigir al login
    if (isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    // Para otras rutas, permitir el acceso
    return NextResponse.next();
  }
}

export default middleware;

export const config = {
  matcher: [
    '/((?!api|_next|_static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
