'use client';
import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  productUrl: string; // Public product page link
  productName: string;
  description: string;
  brandName: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  productUrl,
  productName,
  description,
  brandName,
}) => {
  const messageLines = [
    "Hello, I'm interested in this product:",
    '',
    `Product Link: ${productUrl}`,
    '',
    `*Name:*
${productName}`,
    `*Description:*
${description}`,
    `*Brand:*
${brandName}`,
    '',
    'Please provide more information about this product. Thank you!',
  ];

  const message = messageLines.join('\n');
  const encodedMessage = encodeURIComponent(message);

  return (
    <div className="flex justify-center sm:justify-start w-full">
      {' '}
      {/* Centered on mobile, left-aligned on desktop */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 bg-[#128c7e] text-white rounded-full hover:bg-[#075e54] w-full sm:w-fit"
      >
        Order via WhatsApp
      </a>
    </div>
  );
};

export default WhatsAppButton;
