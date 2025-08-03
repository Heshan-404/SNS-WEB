import React from 'react';
import { Phone } from 'lucide-react';

const FloatingContactButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="tel:07620400659"
        className="flex items-center justify-center w-16 h-16 bg-[#1285E8] hover:bg-blue-700 text-white rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 animate-ringing-phone"
        aria-label="Call us for assistance"
      >
        <Phone className="w-8 h-8" />
      </a>
    </div>
  );
};

export default FloatingContactButton;
