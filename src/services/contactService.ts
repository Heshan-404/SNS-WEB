import { CreateContactFormSubmissionDto, ContactFormSubmissionDto } from '@/types/contact';

export class ContactService {
  async createSubmission(data: CreateContactFormSubmissionDto): Promise<ContactFormSubmissionDto> {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-From': 'frontend',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit contact form');
    }

    return response.json();
  }
}

export const contactService = new ContactService();
