'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { productService } from '@/services/productService';
import { ProductDto } from '@/types/product';

export const useProductPage = (id: string) => {
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const productId = parseInt(id, 10);

      if (isNaN(productId)) {
        notFound();
        return;
      }

      try {
        setLoading(true);
        const fetchedProduct = await productService.getProductById(productId);
        setProduct(fetchedProduct);
      } catch (err: unknown) {
        console.error('Failed to fetch product:', err);
        let errorMessage = 'Failed to fetch product.';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        notFound(); // Or handle error display differently
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};
