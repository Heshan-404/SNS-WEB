export interface CreateContactFormSubmissionDto {
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
}

export interface ContactFormSubmissionDto {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  createdAt: Date;
}
