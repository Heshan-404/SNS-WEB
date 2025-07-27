import { NextResponse } from 'next/server';
import { authService } from '../../../../services/authService';
import { RegisterUserDto } from '../../../../types/auth';

export async function POST(request: Request) {
  try {
    const data: RegisterUserDto = await request.json();

    // Basic validation
    if (!data.email || !data.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await authService.register(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    // Handle unique email constraint violation
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
