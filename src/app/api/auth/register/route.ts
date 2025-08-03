import { NextResponse } from 'next/server';
import { authService } from '@/services/authService';
import { RegisterUserDto } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const data: RegisterUserDto = await request.json();

    // Basic validation
    if (!data.email || !data.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await authService.register(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    // Handle unique email constraint violation
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002' &&
      'meta' in error &&
      typeof error.meta === 'object' &&
      error.meta &&
      'target' in error.meta &&
      Array.isArray(error.meta.target) &&
      error.meta.target.includes('email')
    ) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    console.error('Registration error:', error);
    let errorMessage = 'Failed to register user';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
