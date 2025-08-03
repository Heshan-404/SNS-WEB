// components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section id="hero" 
      className="relative h-screen md:h-[100vh] flex items-center justify-center text-center bg-cover bg-center "
      style={{ backgroundImage: 'url(/images/props/HeroBackground.png)' }} // Using the provided desktop image
    >
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Dark overlay for text readability */}
      <div className="relative z-10 text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Quality Pipes & Fittings for Every Project
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          S N S PIPES & FITTINGS is committed to providing high-quality plumbing solutions for a wide range of projects. 
          Our extensive product range ensures you'll find the perfect fit for your needs.
        </p>
        <a href="#products" className="bg-[#1285E8] hover:bg-[#0f6bbd] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out shadow-lg animate-float cursor-pointer">
          Explore Our Products
        </a>
      </div> {/* This was the missing closing div */}
    </section>
  );
};

export default HeroSection;