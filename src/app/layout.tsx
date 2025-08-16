'use client';

import './globals.css';

import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const metadata = {
  title: {
    template: '%s | SNS Pipes & Fittings',
    default: 'SNS Pipes & Fittings',
  },
  description: 'Your trusted source for high-quality plumbing pipes and fittings.',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <html lang="en" className={`${poppins.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
