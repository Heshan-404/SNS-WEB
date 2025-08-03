import { useState, useEffect, useCallback } from "react";
import { ProductListDto } from "@/types/product";
import { productService } from "@/services/productService";

export const useManageProducts = (searchTerm?: string, categoryId?: number, brandId?: number) => {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProducts = await productService.getProducts(1, 10, categoryId ? [categoryId] : undefined, brandId ? [brandId] : undefined, searchTerm);
      setProducts(fetchedProducts.products);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, categoryId, brandId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productService.deleteProduct(id);
      fetchProducts();
    } catch (err: any) {
      alert(err.message || "Failed to delete product.");
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    handleDeleteProduct,
  };
};
