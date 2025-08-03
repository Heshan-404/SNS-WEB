import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 pt-6 pb-5">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Product Name Skeleton */}
      <Skeleton className="h-8 w-2/3 mb-4" />

      <div className="flex flex-col gap-8">
        {/* ProductImageViewer Skeleton */}
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

        {/* Product Details Skeletons */}
        <div className="mt-8">
          <Skeleton className="h-6 w-1/4 mb-4" />
          {/* Name */}
          <div className="mb-6">
            <Skeleton className="h-4 w-1/6 mb-2 mt-4" />
            <Skeleton className="h-1 w-full mb-2" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          {/* Brand */}
          <div className="mb-6">
            <Skeleton className="h-4 w-1/6 mb-2 mt-4" />
            <Skeleton className="h-1 w-full mb-2" />
            <Skeleton className="h-5 w-1/2" />
          </div>
          {/* Description */}
          <div className="mb-6">
            <Skeleton className="h-4 w-1/6 mb-2 mt-4" />
            <Skeleton className="h-1 w-full mb-2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
          {/* Sizes, Voltages, Colors (example) */}
          <div className="mb-6">
            <Skeleton className="h-4 w-1/6 mb-2 mt-4" />
            <Skeleton className="h-1 w-full mb-2" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
