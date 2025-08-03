'use client';

import React from 'react';
import Image from 'next/image';
import { UploadedImageDto } from '@/types/image';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useManageableImagePreview } from '@/hooks/useManageableImagePreview';

interface ManageableImagePreviewProps {
  images: UploadedImageDto[];
  onRemoveImage: (image: UploadedImageDto) => void;
}

const ManageableImagePreview: React.FC<ManageableImagePreviewProps> = ({
  images,
  onRemoveImage,
}) => {
  const { selectedMainImage, setSelectedMainImage, subImages } = useManageableImagePreview({
    images,
  });

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No images available for this product.</div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-4 items-stretch">
        {/* Main Image Column */}
        <div className="md:col-span-3 relative w-full aspect-square rounded-lg overflow-hidden group">
          {selectedMainImage && (
            <>
              <Image
                src={selectedMainImage.url}
                alt="Main product image"
                layout="fill"
                objectFit="cover"
              />
              <button
                onClick={() => onRemoveImage(selectedMainImage)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove main image"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Sub Images Column */}
        <div className="md:col-span-1 flex flex-col gap-4 h-full justify-between overflow-y-hidden">
          {subImages.map((img, index) => (
            <div
              key={img.url} // Use img.url as key for better stability
              className={cn(
                'relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer group',
                img.url === selectedMainImage?.url && 'border-2 border-blue-500',
              )}
              onClick={() => setSelectedMainImage(img)}
            >
              <Image
                src={img.url}
                alt={`Product thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from changing main image
                  onRemoveImage(img);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Main Image Row */}
        <div className="w-full flex items-center justify-center rounded-lg overflow-hidden shadow-md relative group">
          {selectedMainImage && (
            <>
              <Image
                src={selectedMainImage.url}
                alt="Main product image"
                width={600}
                height={600}
                layout="responsive"
                objectFit="contain"
              />
              <button
                onClick={() => onRemoveImage(selectedMainImage)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove main image"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Sub Images Row with horizontal scroll */}
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
          {subImages.map((img, index) => (
            <div
              key={img.url}
              className={cn(
                'relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer group',
                img.url === selectedMainImage?.url && 'border-2 border-blue-500',
              )}
              onClick={() => setSelectedMainImage(img)}
            >
              <Image
                src={img.url}
                alt={`Product thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage(img);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageableImagePreview;
