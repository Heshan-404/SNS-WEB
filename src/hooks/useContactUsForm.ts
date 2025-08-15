'use client';

import { useState } from 'react';
import { contactService } from '@/services/contactService';
import { toast } from 'sonner';

export const useContactUsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in all required fields (Name, Message).');
      return;
    }

    try {
      await contactService.createSubmission({
        name,
        email: email.trim() === '' ? null : email,
        phone: phone,
        message,
      });
      console.log('Phone value before sending to service:', phone);
      toast.success('Your message has been sent successfully!');
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error: unknown) {
      console.error('Error submitting contact form:', error);
      let errorMessage = 'Failed to send message. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    setMessage,
    handleSubmit,
  };
};
