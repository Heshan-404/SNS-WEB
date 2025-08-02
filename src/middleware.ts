import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/admin']; // All routes under /admin are protected

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isLoginPage = pathname === '/admin/login';

  if (isProtectedRoute && !token && !isLoginPage) {
    // Redirect to login page if not authenticated and trying to access a protected route
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginPage && token) {
    // If authenticated and trying to access login page, redirect to dashboard
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all routes under /admin
};
