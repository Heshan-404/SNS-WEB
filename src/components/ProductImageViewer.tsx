import React from 'react';
import Image from 'next/image';
import { UploadedImageDto } from '@/types/image';
import { cn } from '@/lib/utils';
import ImageViewerClient from './ImageViewerClient';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductImageViewerProps {
  images: UploadedImageDto[];
  loading?: boolean; // Add loading prop
}

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({ images, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-3xl">
        {/* Desktop View Skeletons */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-4 items-stretch">
          <div className="md:col-span-3 relative w-full aspect-square rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="md:col-span-1 flex flex-col gap-4 h-full justify-between overflow-y-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="relative w-full aspect-square rounded-lg" />
            ))}
          </div>
        </div>

        {/* Mobile View Skeletons */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="w-full flex items-center justify-center rounded-lg overflow-hidden shadow-md aspect-square">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="relative flex-shrink-0 w-24 h-24 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No images available for this product.</div>
    );
  }

  return <ImageViewerClient images={images} />;
};

export default ProductImageViewer;
