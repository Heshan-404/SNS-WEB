// components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  brand: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, brand, category }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <div className="bg-gray-100 flex items-center justify-center aspect-w-1 aspect-h-1">
        <Image 
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          layout="responsive"
        />
      </div>
      <div className="px-2 py-2 text-left">
        <h3 className="text-sm md:text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-600">Brand: {brand}</p>
        <p className="text-xs text-gray-600">Category: {category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
