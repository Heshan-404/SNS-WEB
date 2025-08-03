import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

declare module 'next/server' {
  interface NextRequest {
    user?: { userId: number; email: string }; // Adjust based on your JWT payload
  }
}

type HandlerFunction = (
  request: NextRequest,
  context: { params: Promise<Record<string, string | string[] | undefined>> },
) => Promise<NextResponse>;

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

console.log('DEBUG: JWT_SECRET in authMiddleware:', JWT_SECRET);

export function authMiddleware(handler: HandlerFunction) {
  return async (
    request: NextRequest,
    context: { params: Promise<Record<string, string | string[] | undefined>> },
  ) => {
    // Allow GET requests to bypass authentication
    if (request.method === 'GET') {
      return handler(request, context);
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET as string) as jwt.JwtPayload;
      if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'userId' in decoded &&
        'email' in decoded
      ) {
        request.user = { userId: decoded.userId as number, email: decoded.email as string }; // Attach user payload to request
      } else {
        return NextResponse.json({ message: 'Invalid token payload' }, { status: 403 });
      }
      return handler(request, context);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }
  };
}
