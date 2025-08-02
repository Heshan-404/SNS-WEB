import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import ContactUsSection from "@/components/ContactUsSection";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnimateOnScroll>
        <AboutUsSection />
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