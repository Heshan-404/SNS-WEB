'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu'; // New Client Component

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        // Apply after scrolling past one viewport height
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white shadow-md fixed w-full top-0 z-50 transition-all duration-300\r\n        ${scrolled ? 'md:bg-white/50 md:backdrop-blur-lg md:shadow-lg md:border-b md:border-white/20' : ''}`}
    >
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/props/logo.png"
              alt="SNS Pipes Logo"
              width={60}
              height={60}
              className="mr-2"
            />
            <span className="text-lg font-bold text-gray-800">S N S PIPES & FITTINGS</span>
          </Link>
        </div>

        {/* Navigation Links - Centered (Desktop) */}
        <nav
          className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6\r\n          ${scrolled ? 'md:text-[#1285E8]' : 'md:text-gray-600'}`} // Apply text color based on scroll
        >
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold" // Removed text-gray-600
          >
            Home
          </Link>
          <Link
            href="/products?page=1"
            className="hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold" // Removed text-gray-600
          >
            Products
          </Link>
          <Link
            href="/#about"
            className="hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold" // Removed text-gray-600
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold" // Removed text-gray-600
          >
            Contact Us
          </Link>
        </nav>

        {/* Contact Info - Single Blue Container (Desktop) */}
        <div className="md:flex hidden items-center space-x-4 bg-[#1285E8] px-4 py-2 rounded-full">
          <a href="tel:+0762040059" className="text-white text-sm leading-none font-bold">
            0762040059
          </a>
          <span className="text-white text-sm leading-none font-bold">|</span>
          <a href="mailto:contact@snspipes.com" className="text-white text-sm leading-none font-bold">
            contact@snspipes.com
          </a>
        </div>

        {/* Mobile Menu Button and Sidebar (Client Component) */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
