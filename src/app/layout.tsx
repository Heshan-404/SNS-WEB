import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SNS Pipes & Fittings - Quality Pipes for Every Project",
  description: "Discover high-quality pipes and fittings for all your projects. We offer a wide range of products including PPR, brass fittings, and more. Contact us today!",
  keywords: "pipes, fittings, PPR, brass fittings, plumbing, hardware, construction, pipe supplier, pipe shop",
  openGraph: {
    title: "SNS Pipes & Fittings - Quality Pipes for Every Project",
    description: "Discover high-quality pipes and fittings for all your projects. We offer a wide range of products including PPR, brass fittings, and more. Contact us today!",
    url: "https://yourwebsite.com", // Replace with your actual website URL
    siteName: "SNS Pipes & Fittings",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "SNS Pipes & Fittings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SNS Pipes & Fittings - Quality Pipes for Every Project",
    description: "Discover high-quality pipes and fittings for all your projects. We offer a wide range of products including PPR, brass fittings, and more. Contact us today!",
    images: ["https://yourwebsite.com/twitter-image.jpg"], // Replace with your actual Twitter image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}