import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import { ProductListDto } from '@/types/product';

export const useFeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProducts(1, 4, undefined, undefined, undefined, true);
        setFeaturedProducts(data.products);
      } catch (err: unknown) {
        let errorMessage = 'Failed to fetch featured products.';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return { featuredProducts, loading, error };
};