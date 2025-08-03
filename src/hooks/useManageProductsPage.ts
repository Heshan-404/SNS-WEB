'use client';

import { useState } from 'react';
import { useManageProducts } from '@/hooks/useManageProducts';
import { useCategories } from '@/hooks/useCategories';
import { useBrands } from '@/hooks/useBrands';

export const useManageProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(undefined);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isFeaturedFilter, setIsFeaturedFilter] = useState<boolean | undefined>(undefined); // New state

  const { products, loading, error, handleDeleteProduct, fetchProducts, toggleProductFeatured } = useManageProducts(
    searchTerm,
    selectedCategoryId,
    selectedBrandId,
    isFeaturedFilter, // Pass new filter to useManageProducts
  );
  const { categories, loading: categoriesLoading } = useCategories();
  const { brands, loading: brandsLoading } = useBrands();

  const handleProductAdded = () => {
    fetchProducts(); // Refresh the product list
    setIsAddProductDialogOpen(false); // Close the dialog
  };

  const handleToggleFeatured = async (productId: number, isFeatured: boolean) => {
    await toggleProductFeatured(productId, isFeatured);
    fetchProducts(); // Refresh products after toggling featured status
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedBrandId,
    setSelectedBrandId,
    isAddProductDialogOpen,
    setIsAddProductDialogOpen,
    products,
    loading,
    error,
    handleDeleteProduct,
    fetchProducts,
    categories,
    categoriesLoading,
    brands,
    brandsLoading,
    handleProductAdded,
    isFeaturedFilter,
    setIsFeaturedFilter,
    handleToggleFeatured,
  };
};
