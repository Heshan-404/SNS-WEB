// components/FeaturedProductsSection.tsx
import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProductsSection = () => {
  const featuredProducts = [
    {
      id: 1,
      imageUrl: '/images/props/products/1.png', // Placeholder image
      title: 'Green PPR 90° Elbow',
      brand: 'Brand A',
      category: 'PPR',
    },
    {
      id: 2,
      imageUrl: '/images/props/products/2.png', // Placeholder image
      title: 'Brass Compression Tee',
      brand: 'Brand A',
      category: 'Brass',
    },
    {
      id: 3,
      imageUrl: '/images/props/products/3.png', // Placeholder image
      title: 'PVC Pipe 2-inch',
      brand: 'Brand A',
      category: 'PVC',
    },
    {
      id: 4,
      imageUrl: '/images/props/products/4.png', // Placeholder image
      title: 'Galvanized Steel Nipple',
      brand: 'Brand A',
      category: 'Steel',
    },
  ];

  return (
    <section id="products" className="container mx-auto py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            brand={product.brand}
            category={product.category}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 w-full md:w-auto md:max-w-[200px] rounded-lg text-lg transition duration-300 ease-in-out shadow-lg h-10 md:h-12 md:mx-auto flex items-center justify-center">
          Explore More
        </button>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
