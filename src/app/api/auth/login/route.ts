import { NextResponse } from 'next/server';
import { authService } from '../../../../services/authService';
import { LoginUserDto } from '../../../../types/auth';

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

    // In a real application, you would generate and return a JWT or session token here.
    // For now, we just return the user data (without password).
    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
