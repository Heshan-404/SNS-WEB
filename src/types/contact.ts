export interface CreateContactFormSubmissionDto {
  name: string;
  email: string | null;
  phoneNo: string;
  message: string;
}

export interface ContactFormSubmissionDto {
  id: number;
  name: string;
  email: string | null;
  phoneNo: string;
  message: string;
  createdAt: Date;
}
