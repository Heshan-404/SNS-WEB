import './globals.css';

import { Poppins } from 'next/font/google';
import ScrollToTopOnNavigate from '@/components/ScrollToTopOnNavigate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'),
  title: {
    template: '%s | SNS Pipes & Fittings',
    default: 'SNS Pipes & Fittings | Quality Plumbing Solutions',
  },
  description: 'Your trusted source for high-quality plumbing pipes and fittings.',
  twitter: {
    card: 'summary_large_image',
  },
};

// Add JSON-LD Schema Markup
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#website`,
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com',
      name: 'SNS Pipes & Fittings',
      description: 'Your trusted source for high-quality plumbing pipes and fittings.',
      publisher: {
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#organization`,
      name: 'SNS Pipes & Fittings',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/images/props/logo.png`,
        width: 150,
        height: 150,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+94762040059',
        contactType: 'customer service',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#webpage`,
      url: process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com',
      name: 'SNS Pipes & Fittings | Quality Plumbing Solutions',
      isPartOf: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#website` },
      about: {
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#organization`,
      },
      description: 'Your trusted source for high-quality plumbing pipes and fittings.',
      inLanguage: 'en-US',
      breadcrumb: {
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#breadcrumb`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com'}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_BASE_URL || 'https://snspipes.com',
        },
      ],
    },
  ],
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* Add JSON-LD script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <ScrollToTopOnNavigate />
      </body>
    </html>
  );
}
