import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sns-123-secret';

export function authMiddleware(handler: Function) {
  return async (request: NextRequest, context: any) => {
    // Allow GET requests to bypass authentication
    if (request.method === 'GET') {
      return handler(request, context);
    }

    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (request as any).user = decoded; // Attach user payload to request
      return handler(request, context);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }
  };
}
