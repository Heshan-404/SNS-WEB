"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { UploadedImageDto } from '@/types/image';
import { cn } from '@/lib/utils';

interface ProductImageViewerProps {
  images: UploadedImageDto[];
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({ images }) => {
  const mainImage = images.find(img => img.isMain) || images[0];
  const subImages = images.filter(img => img.url !== mainImage?.url).slice(0, 3);

  const [selectedMainImage, setSelectedMainImage] = useState<UploadedImageDto | undefined>(mainImage);

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500 py-10">No images available for this product.</div>;
  }

  return (
    <div className="w-full max-w-3xl">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-4 items-stretch">
        {/* Main Image Column */}
        <div className="md:col-span-3 relative w-full aspect-square rounded-lg overflow-hidden">
          {selectedMainImage && (
            <Image
              src={selectedMainImage.url}
              alt="Main product image"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>

        {/* Sub Images Column */}
        <div className="md:col-span-1 flex flex-col gap-4 h-full justify-between overflow-y-hidden">
          {subImages.map((img, index) => (
            <div
              key={index}
              className={cn(
                "relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer"
              )}
              onClick={() => setSelectedMainImage(img)}
            >
              <Image
                src={img.url}
                alt={`Product thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Main Image Row */}
        <div className="w-full flex items-center justify-center rounded-lg overflow-hidden shadow-md">
          {selectedMainImage && (
            <Image
              src={selectedMainImage.url}
              alt="Main product image"
              width={600}
              height={600}
              layout="responsive"
              objectFit="contain"
            />
          )}
        </div>

        {/* Sub Images Row with horizontal scroll */}
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
          {subImages.map((img, index) => (
            <div
              key={index}
              className={cn(
                "relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer",
              )}
              onClick={() => setSelectedMainImage(img)}
            >
              <Image
                src={img.url}
                alt={`Product thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageViewer;
