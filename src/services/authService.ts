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
        role: "admin", // Default role for registered users via this route
      },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  }

  async login(credentials: LoginUserDto): Promise<AuthResponseDto | null> {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      return null; // User not found
    }

    const isPasswordValid = await comparePassword(credentials.password, user.password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    // Return user data without the password hash
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const authService = new AuthService();
