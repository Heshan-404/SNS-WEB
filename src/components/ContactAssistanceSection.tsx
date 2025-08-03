'use client';

import React from 'react';

const ContactAssistanceSection = () => {
  return (
    <div className="mt-12 pb-12 text-center">
      <h2 className="text-3xl font-bold text-[#121417] mb-4">Need Assistance?</h2>
      <p className="text-lg text-gray-700 mb-6">
        Looking to place an order, get pricing, or have any other questions?
      </p>
      <a
        href="tel:07620400659"
        className="inline-block bg-[#1285E8] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out shadow-lg"
      >
        Contact Us
      </a>
    </div>
  );
};

export default ContactAssistanceSection;
