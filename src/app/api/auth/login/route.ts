import { NextResponse } from 'next/server';
import { authService } from '@/services/authService';
import { LoginUserDto } from '@/types/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

console.log('DEBUG: JWT_SECRET from env:', JWT_SECRET);

export async function POST(request: Request) {
  try {
    const credentials: LoginUserDto = await request.json();

    // Basic validation
    if (!credentials.email || !credentials.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const authResult = await authService.login(credentials);

    if (!authResult.success) {
      return NextResponse.json({ error: authResult.message }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: authResult.user?.id, email: authResult.user?.email },
      JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    );

    const response = NextResponse.json({ user: authResult.user });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    console.error('Login error:', error);
    let errorMessage = 'Failed to login';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
