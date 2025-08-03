import { useState, useEffect, useCallback } from 'react';
import { ProductListDto } from '@/types/product';
import { productService } from '@/services/productService';

export const useManageProducts = (
  searchTerm?: string,
  categoryId?: number,
  brandId?: number,
  isFeatured?: boolean,
) => {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProducts = await productService.getProducts(
        1,
        10,
        categoryId ? [categoryId] : undefined,
        brandId ? [brandId] : undefined,
        searchTerm,
        isFeatured, // Pass isFeatured to the service
      );
      setProducts(fetchedProducts.products);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch products.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoryId, brandId, isFeatured]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.deleteProduct(id);
      fetchProducts();
    } catch (err: unknown) {
      let errorMessage = 'Failed to delete product.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  const toggleProductFeatured = async (productId: number, isFeatured: boolean) => {
    try {
      await productService.updateProduct(productId, { isFeatured });
      fetchProducts(); // Refresh products after update
    } catch (err: unknown) {
      let errorMessage = 'Failed to update featured status.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    handleDeleteProduct,
    toggleProductFeatured,
  };
};
