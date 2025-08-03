import { NextResponse } from 'next/server';
import { authService } from '../../../../services/authService';
import { LoginUserDto } from '../../../../types/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sns-123-secret';

export async function POST(request: Request) {
  try {
    const credentials: LoginUserDto = await request.json();

    // Basic validation
    if (!credentials.email || !credentials.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await authService.login(credentials);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user?.id, email: user.user?.email }, JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ user });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
