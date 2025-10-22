import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/recommendations', '/jobs', '/analytics', '/users'];
const AUTH_ROUTES = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('firebase-session');

  // If the user is authenticated
  if (sessionToken) {
    // and tries to access login/signup, redirect to dashboard
    if (AUTH_ROUTES.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If the user is not authenticated
  else {
    // and tries to access a protected route, redirect to login
    if (PROTECTED_ROUTES.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - stats.png (stats.png file)
     */
    '/((?!api|_next/static|_next/image|stats.png).*)',
  ],
};
