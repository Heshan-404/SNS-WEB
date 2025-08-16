import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();
    console.log('Phone value received in API route:', phone);
    console.log('Phone value received in API route:', phone);

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const newSubmission = await prisma.contactFormSubmission.create({
      data: {
        name,
        email,
        phone: phone,
        message,
      },
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL_RECIPIENT,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1285E8;">New Contact Form Submission</h2>
          <p>You have received a new message from your website contact form.</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p style="border: 1px solid #eee; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">${message}</p>
          <p style="font-size: 0.9em; color: #777;">This email was sent from your contact form at SNS Pipes & Fittings.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact form or sending email:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form or send email' },
      { status: 500 },
    );
  }
}
