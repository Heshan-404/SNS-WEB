import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { RegisterUserDto, LoginUserDto, AuthResponseDto } from '../types/auth';

export class AuthService {
  private _adminPasswordHash: string | null = null;

  constructor() {
    console.log('AuthService constructor called.');
    console.log('process.env.ADMIN_EMAIL (in constructor):', process.env.ADMIN_EMAIL);
    console.log('process.env.ADMIN_PASSWORD (in constructor):', process.env.ADMIN_PASSWORD);
    this.initializeAdminPasswordHash();
  }

  private async initializeAdminPasswordHash() {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword) {
      this._adminPasswordHash = await bcrypt.hash(adminPassword, 10);
      console.log('Admin password hashed and stored in memory.');
    } else {
      console.log('Admin password not found in environment variables.');
    }
  }

  async register(data: RegisterUserDto): Promise<AuthResponseDto> {
    // This function is no longer used as per user's request that admin doesn't create new users.
    // However, keeping it for type compatibility if other parts of the app still reference it.
    throw new Error('User registration is not enabled.');
  }

  async login(
    credentials: LoginUserDto,
  ): Promise<{ success: boolean; message: string; user?: AuthResponseDto }> {
    console.log('AuthService login method called.');
    console.log('process.env.ADMIN_EMAIL (in login):', process.env.ADMIN_EMAIL);
    console.log('process.env.ADMIN_PASSWORD (in login):', process.env.ADMIN_PASSWORD);

    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail || !this._adminPasswordHash) {
      console.log('Admin credentials check failed: Email or hashed password missing.');
      return { success: false, message: 'Admin credentials not configured.' };
    }

    if (credentials.email === adminEmail) {
      const isPasswordValid = await bcrypt.compare(credentials.password, this._adminPasswordHash);
      if (isPasswordValid) {
        // Return a dummy user object for the admin
        return {
          success: true,
          message: 'Login successful!',
          user: { id: 1, email: adminEmail, name: 'Admin', role: 'admin' },
        };
      }
    }

    return { success: false, message: 'Invalid credentials.' };
  }
}

export const authService = new AuthService();
