import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/config/auth';
import { AuthService } from '@/services';

async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const session = await auth();
    const isAuthenticated = !!session?.user;

    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    if (AuthService.isProtectedRoute(pathname)) {
      if (!isAuthenticated) {
        const signInUrl = new URL('/auth/sign-in', request.url);
        const redirectUrl = AuthService.buildRedirectUrl(
          request.url,
          request.url
        );
        signInUrl.searchParams.set('callbackUrl', redirectUrl);
        return NextResponse.redirect(signInUrl);
      }
    }

    return NextResponse.next();
  } catch {
    if (AuthService.isProtectedRoute(pathname)) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
    return NextResponse.next();
  }
}

export default middleware;

export const config = {
  matcher: [
    '/((?!api|_next|_static|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
