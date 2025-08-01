import React from 'react';
import Link from 'next/link';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faTwitter, faInstagram, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Top Contact Bar */}
            <div
                className="bg-[#097DCA] py-4 px-4 flex flex-col md:flex-row justify-start md:justify-center items-center text-xs md:text-base text-white w-full space-y-2 md:space-y-0">
                <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 items-start md:items-center md:gap-x-8 md:w-full">
                    <div className="flex items-center justify-center flex-grow px-4 md:w-1/3">
                        <FontAwesomeIcon icon={faPhone} className="mr-1" />
                        <a href="tel:+07620400659" className="hover:underline">07620400659</a> / <a
                        href="tel:+0760188505" className="hover:underline">0760188505</a>
                    </div>
                    <div className="flex items-center justify-center flex-grow px-4 md:w-1/3">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                        <a href="mailto:sales@snspipes.com" className="hover:underline">sales@snspipes.com</a>
                    </div>
                    <div className="flex items-center justify-center flex-grow px-4 md:w-1/3">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                        <span>No 380/03, Paragasthota, Bandaragama</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-4 flex flex-col items-center ps-5 pe-5 pt-10">
                {/* Navigation Links */}
                {/* Mobile Navigation */}
                <nav className="flex flex-col md:hidden w-full mb-4 space-y-2">
                    <div className="flex justify-between w-full">
                        <Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
                        <Link href="/products" className="hover:text-blue-400 transition-colors duration-200">Products</Link>
                    </div>
                    <div className="flex justify-between w-full">
                        <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About Us</Link>
                        <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact Us</Link>
                    </div>
                </nav>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex justify-center space-x-6 mb-4">
                    <Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
                    <Link href="/products" className="hover:text-blue-400 transition-colors duration-200">Products</Link>
                    <Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About Us</Link>
                    <Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact Us</Link>
                </nav>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="#" className="text-white hover:text-blue-400"><FontAwesomeIcon icon={faFacebookF} size="lg"/></a>
                    <a href="#" className="text-white hover:text-blue-400"><FontAwesomeIcon icon={faTwitter} size="lg"/></a>
                    <a href="#" className="text-white hover:text-blue-400"><FontAwesomeIcon icon={faInstagram} size="lg"/></a>
                    <a href="#" className="text-white hover:text-blue-400"><FontAwesomeIcon icon={faLinkedinIn} size="lg"/></a>
                </div>

                {/* Copyright */}
                <p className="text-gray-400 text-xs text-center">&copy; {new Date().getFullYear()} S N S PIPES & FITTINGS. All
                    rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
