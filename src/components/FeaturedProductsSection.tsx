import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { productService } from '@/services/productService';
import { ProductListDto } from '@/types/product';

const FeaturedProductsSection = async () => {
  const featuredProducts = await productService.getFeaturedProducts();

  return (
    <section id="products" className="container mx-auto py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
        Featured Products
      </h2>
      {featuredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No featured products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product: ProductListDto) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              imageUrl={product.mainImageUrl || '/placeholder.png'}
              title={product.name}
              brand={product.brand?.name || 'N/A'}
              category={product.category?.name || 'N/A'}
            />
          ))}
        </div>
      )}
      <div className="text-center mt-12">
        <Link href="/products" scroll={true}>
          {' '}
          {/* Explicitly set scroll to true */}
          <button className="bg-[#1285E8] hover:bg-[#0f6bbd] text-white font-bold py-3 px-8 w-full md:w-auto rounded-full text-lg transition duration-300 ease-in-out shadow-lg cursor-pointer">
            Explore Our Products
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
