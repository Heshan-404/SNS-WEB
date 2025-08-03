'use client';

import { useState, useEffect } from 'react';
import { useManageProducts } from '@/hooks/useManageProducts';
import { ProductListDto } from '@/types/product';
import { CategoryDto } from '@/types/category';
import { BrandDto } from '@/types/brand';

export const useManageProductsPage = (
  initialProducts: ProductListDto[] = [],
  initialCategories: CategoryDto[] = [],
  initialBrands: BrandDto[] = [],
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(undefined);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isFeaturedFilter, setIsFeaturedFilter] = useState<boolean | undefined>(undefined);

  const { products, loading, error, handleDeleteProduct, fetchProducts, toggleProductFeatured } =
    useManageProducts(
      searchTerm,
      selectedCategoryId,
      selectedBrandId,
      isFeaturedFilter,
      initialProducts, // Pass initial products to useManageProducts
    );

  const [categories, setCategories] = useState<CategoryDto[]>(initialCategories);
  const [brands, setBrands] = useState<BrandDto[]>(initialBrands);

  useEffect(() => {
    // If initial data is provided, use it. Otherwise, fetch.
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
    } else {
      // Fetch categories if not provided (e.g., for client-side navigation)
      const fetchCats = async () => {
        const fetched = await import('@/services/categoryService');
        setCategories(await fetched.categoryService.getCategories());
      };
      fetchCats();
    }

    if (initialBrands.length > 0) {
      setBrands(initialBrands);
    } else {
      // Fetch brands if not provided
      const fetchBrandsData = async () => {
        const fetched = await import('@/services/brandService');
        setBrands(await fetched.brandService.getBrands());
      };
      fetchBrandsData();
    }
  }, [initialCategories, initialBrands]);

  const handleProductAdded = () => {
    fetchProducts();
    setIsAddProductDialogOpen(false);
  };

  const handleToggleFeatured = async (productId: number, isFeatured: boolean) => {
    await toggleProductFeatured(productId, isFeatured);
    fetchProducts();
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
    brands,
    handleProductAdded,
    isFeaturedFilter,
    setIsFeaturedFilter,
    handleToggleFeatured,
  };
};
