'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHeader } from '@/hooks/useHeader';

const Header = () => {
  const { navbarVisible, isMenuOpen, setIsMenuOpen } = useHeader();

  return (
    <header
      className={`bg-white shadow-md fixed w-full top-0 z-50 transition-transform duration-300 ${
        navbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
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
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/products?page=1"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer"
          >
            Products
          </Link>
          <Link
            href="/#about"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 whitespace-nowrap cursor-pointer"
          >
            Contact Us
          </Link>
        </nav>

        {/* Contact Info - Single Blue Container (Desktop) */}
        <div className="md:flex hidden items-center space-x-4 bg-[#1285E8] px-4 py-2 rounded-full">
          <a href="tel:+0720400659" className="text-white text-sm leading-none">
            0720400659 / 0760188505
          </a>
          <span className="text-white text-sm leading-none">|</span>
          <a href="mailto:sales@snspipes.com" className="text-white text-sm leading-none">
            sales@snspipes.com
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none font-bold"
          >
            <FontAwesomeIcon icon={faBars} className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div
          className={`fixed top-0 right-0 bottom-0 w-80 h-dvh bg-white z-50 overflow-y-auto transition-transform duration-2000 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 px-4 ps-10 pt-5 font-bold">
            <Link
              href="/"
              className="flex items-center py-2 text-gray-800 hover:text-blue-600 pr-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/images/props/navHome.png"
                alt="Home"
                width={20}
                height={20}
                className="mr-5"
              />
              Home
            </Link>
            <Link
              href="/products?page=1"
              className="flex items-center py-2 text-gray-800 hover:text-blue-600 pr-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/images/props/navProducts.png"
                alt="Products"
                width={20}
                height={20}
                className="mr-5"
              />
              Products
            </Link>
            <Link
              href="/#about"
              className="flex items-center py-2 text-gray-800 hover:text-blue-600 pr-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/images/props/navAboutUs.png"
                alt="About Us"
                width={20}
                height={20}
                className="mr-5"
              />
              About Us
            </Link>
            <Link
              href="/#contact"
              className="flex items-center py-2 text-gray-800 hover:text-blue-600 pr-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/images/props/navContact.png"
                alt="Contact Us"
                width={20}
                height={20}
                className="mr-5"
              />
              Contact Us
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="absolute bottom-4 left-4 right-4 px-4">
            <div className="bg-[#097DCA] text-white rounded-full px-4 py-2 text-center">
              <a href="tel:+0720400659" className="font-bold">
                0720400659 / 0760188505
              </a>
            </div>
            <a
              href="mailto:sales@snspipes.com"
              className="text-black/50 hover:text-blue-600 block mt-2 text-center font-bold"
            >
              sales@snspipes.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
