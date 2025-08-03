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

  const { products, loading, error, handleDeleteProduct, fetchProducts } = useManageProducts(
    searchTerm,
    selectedCategoryId,
    selectedBrandId,
  );
  const { categories, loading: categoriesLoading } = useCategories();
  const { brands, loading: brandsLoading } = useBrands();

  const handleProductAdded = () => {
    fetchProducts(); // Refresh the product list
    setIsAddProductDialogOpen(false); // Close the dialog
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
  };
};
