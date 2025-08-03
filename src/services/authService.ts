import prisma from '../lib/prisma';
import { hashPassword, comparePassword } from '../lib/auth';
import { RegisterUserDto, LoginUserDto, AuthResponseDto } from '../types/auth';

export class AuthService {
  async register(data: RegisterUserDto): Promise<AuthResponseDto> {
    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: 'admin', // Default role for registered users via this route
      },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  }

  async login(
    credentials: LoginUserDto,
  ): Promise<{ success: boolean; message: string; user?: AuthResponseDto }> {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      return { success: false, message: 'Invalid credentials.' };
    }

    const isPasswordValid = await comparePassword(credentials.password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: 'Invalid credentials.' };
    }

    // Return user data without the password hash
    const { password, ...userWithoutPassword } = user;
    return { success: true, message: 'Login successful!', user: userWithoutPassword };
  }
}

export const authService = new AuthService();
