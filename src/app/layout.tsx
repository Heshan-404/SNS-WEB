import './globals.css';

import {Poppins} from 'next/font/google';
import ScrollToTopOnNavigate from '@/components/ScrollToTopOnNavigate';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | SNS Pipes & Fittings',
        default: 'SNS Pipes & Fittings',
    },
    description: 'Your trusted source for high-quality plumbing pipes and fittings.',
    twitter: {
        card: 'summary_large_image',
    },
};

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
});

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${poppins.variable}`} data-scroll-behavior="smooth">
        <body>
        {children}
        <ScrollToTopOnNavigate/>
        </body>
        </html>
    );
}
