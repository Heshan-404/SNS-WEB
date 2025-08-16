import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';
import ContactAssistanceSection from '@/components/ContactAssistanceSection';
import FloatingContactButton from '@/components/FloatingContactButton';
import PageLoader from '@/components/PageLoader';
import { LoadingProvider } from '@/context/LoadingContext';
import LoadingOverlay from '@/components/LoadingOverlay';
import ScrollToTopButton from '@/components/ScrollToTopButton'; // Import ScrollToTopButton

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
      <Header />
      <main className="pt-10">
        <PageLoader>{children}</PageLoader>
      </main>
      <ContactAssistanceSection />
      <Footer />
      <Toaster />
      <FloatingContactButton />
      <ScrollToTopButton /> {/* Add ScrollToTopButton here */}
      <LoadingOverlay />
    </LoadingProvider>
  );
}
