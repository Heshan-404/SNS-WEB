import prisma from '../lib/prisma';
import { CreateContactFormSubmissionDto, ContactFormSubmissionDto } from '../types/contact';

export class ContactService {
  async createSubmission(data: CreateContactFormSubmissionDto): Promise<ContactFormSubmissionDto> {
    const submission = await prisma.contactFormSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
        message: data.message,
      },
    });
    return submission;
  }
}

export const contactService = new ContactService();
