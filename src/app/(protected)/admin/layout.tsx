import React from 'react';
import '../../globals.css'; // Import global styles
import AdminLayoutClient from '@/components/AdminLayoutClient';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = (await headersList).get('x-invoke-path');

  if (pathname === '/admin') {
    redirect('/admin/products');
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
