'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';

const FeaturedProductsSection = () => {
  const { featuredProducts, loading, error } = useFeaturedProducts();

  return (
    <section id="products" className="container mx-auto py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
        Featured Products
      </h2>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2 rounded-lg overflow-hidden">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <div className="px-2 py-2 space-y-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : featuredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No featured products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              imageUrl={product.mainImageUrl || '/placeholder.png'}
              title={product.name}
              brand={product.brand?.name || 'N/A'}
              category={product.category?.name || 'N/A'}
            />
          ))}
        </div>
      )}
      <div className="text-center mt-12">
        <Link href="/products">
          <button className="bg-[#1285E8] hover:bg-[#0f6bbd] text-white font-bold py-3 px-8 w-full md:w-auto rounded-lg text-lg transition duration-300 ease-in-out shadow-lg h-10 md:h-12 md:mx-auto flex items-center justify-center cursor-pointer">
            Explore More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
