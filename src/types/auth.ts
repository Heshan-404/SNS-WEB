export interface RegisterUserDto {
  email: string;
  password: string;
  name: string | null;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  id: number;
  email: string;
  name: string | null;
  role: string;
}
