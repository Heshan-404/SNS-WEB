import { NextResponse } from 'next/server';
import { contactService } from '../../../services/contactService';
import { CreateContactFormSubmissionDto } from '@/types/contact';

export async function POST(request: Request) {
  try {
    const data: CreateContactFormSubmissionDto = await request.json();

    // Basic validation
    if (!data.name || !data.phoneNo || !data.message) {
      return NextResponse.json(
        { error: 'Name, Phone Number, and Message are required' },
        { status: 400 },
      );
    }

    const submission = await contactService.createSubmission(data);
    // In a real application, you would also send an email to the shop owner here.
    return NextResponse.json(submission, { status: 201 });
  } catch (error: unknown) {
    console.error('Error submitting contact form:', error);
    let errorMessage = 'Failed to submit contact form';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
