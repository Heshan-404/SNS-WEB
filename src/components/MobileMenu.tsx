'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHeader } from '@/hooks/useHeader';

const MobileMenu = () => {
  const { navbarVisible, isMenuOpen, setIsMenuOpen } = useHeader();

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-600 focus:outline-none font-bold"
      >
        <FontAwesomeIcon icon={faBars} className="w-8 h-8" />
      </button>

      {isMenuOpen && (
        <div
          className={`fixed top-0 right-0 bottom-0 w-80 h-dvh bg-white z-50 overflow-y-auto transition-transform duration-2000 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
          </div>

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
    </div>
  );
};

export default MobileMenu;
