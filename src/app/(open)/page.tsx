import HeroSection from '@/components/HeroSection';
import AboutUsSection from '@/components/AboutUsSection';
import FeaturedProductsSection from '@/components/FeaturedProductsSection';
import ContactUsSection from '@/components/ContactUsSection';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import OurBrandsSection from '@/components/OurBrandsSection';

import { Metadata } from 'next'; // Import Metadata type

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnimateOnScroll>
        <AboutUsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <OurBrandsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FeaturedProductsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <ContactUsSection />
      </AnimateOnScroll>
    </>
  );
}
