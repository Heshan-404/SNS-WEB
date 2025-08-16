// components/ProductCard.tsx
'use client'; // Add this line

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import React from 'react'; // Import React

interface ProductCardProps {
  slug: string;
  imageUrl: string;
  title: string;
  brand: string;
  category: string;
}

const ProductCard = ({ slug, imageUrl, title, brand, category }: ProductCardProps) => {
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    router.push(`/products/${slug}`); // Navigate without preserving query params
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {' '}
      {/* Make the div clickable */}
      <div className=" rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
        <div className=" flex items-center justify-center aspect-w-1 aspect-h-1">
          <Image src={imageUrl} alt={title} width={200} height={200} layout="responsive" />
        </div>
        <div className="px-2 py-2 text-left">
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-xs text-gray-600">Brand: {brand}</p>
          <p className="text-xs text-gray-600">Category: {category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
