import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // Add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*'); // Replace with your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { status: 200, headers: res.headers });
  }

  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/admin/login';
  const isAdminRoot = pathname === '/admin';

  if (isLoginPage) {
    if (token) {
      // If authenticated and trying to access login page, redirect to dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    // Allow access to login page if not authenticated
    return NextResponse.next();
  }

  // For all other /admin routes (protected routes)
  if (!token) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If authenticated and trying to access /admin, redirect to /admin/products
  if (isAdminRoot) {
    return NextResponse.redirect(new URL('/admin/products', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to all routes under /admin
};
