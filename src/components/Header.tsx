import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import MobileMenu from './MobileMenu'; // New Client Component

const Header = () => {
  return (
    <header
      className={`bg-white shadow-md fixed w-full top-0 z-50 transition-transform duration-300`}
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
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold"
          >
            Home
          </Link>
          <Link
            href="/products?page=1"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold"
          >
            Products
          </Link>
          <Link
            href="/#about"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer font-bold"
          >
            Contact Us
          </Link>
        </nav>

        {/* Contact Info - Single Blue Container (Desktop) */}
        <div className="md:flex hidden items-center space-x-4 bg-[#1285E8] px-4 py-2 rounded-full">
          <a href="tel:+0720400659" className="text-white text-sm leading-none font-bold">
            0720400659 / 0760188505
          </a>
          <span className="text-white text-sm leading-none font-bold">|</span>
          <a href="mailto:sales@snspipes.com" className="text-white text-sm leading-none font-bold">
            sales@snspipes.com
          </a>
        </div>

        {/* Mobile Menu Button and Sidebar (Client Component) */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
