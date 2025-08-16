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
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Requested-From', // Add X-Requested-From
  );

  // Handle preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, { status: 200, headers: res.headers });
  }

  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // --- API Path Handling ---
  if (pathname.startsWith('/api/')) {
    const isFrontendRequest = request.headers.get('X-Requested-From') === 'frontend';
    if (!isFrontendRequest) {
      // If it's a direct browser access to /api, redirect to 404
      return NextResponse.rewrite(new URL('/not-found', request.url));
    }
    // Allow legitimate API requests to proceed
    return NextResponse.next();
  }
  // --- End API Path Handling ---


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
  matcher: ['/admin/:path*', '/api/:path*'], // Apply middleware to /admin and /api routes
};
