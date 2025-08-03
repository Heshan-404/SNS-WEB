import { useState } from 'react';
import { useManageBrands } from '@/hooks/useManageBrands';
import { useManageCategories } from '@/hooks/useManageCategories';
import { BrandDto } from '@/types/brand';
import { CategoryDto } from '@/types/category';

export const useManageBrandsCategoriesPage = () => {
  const {
    brands,
    loading: brandsLoading,
    error: brandsError,
    fetchBrands,
    handleAddBrand,
    handleEditBrand,
    handleUpdateBrand,
    handleDeleteBrand,
    newBrandName,
    setNewBrandName,
    editingBrand,
    setEditingBrand,
    editBrandName,
    setEditBrandName,
  } = useManageBrands();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
    handleAddCategory,
    handleEditCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    newCategoryName,
    setNewCategoryName,
    editingCategory,
    setEditingCategory,
    editCategoryName,
    setEditCategoryName,
  } = useManageCategories();

  return {
    // Brands
    brands,
    brandsLoading,
    brandsError,
    newBrandName,
    setNewBrandName,
    editingBrand,
    setEditingBrand,
    editBrandName,
    setEditBrandName,
    handleAddBrand,
    handleEditBrand,
    handleUpdateBrand,
    handleDeleteBrand,
    fetchBrands,

    // Categories
    categories,
    categoriesLoading,
    categoriesError,
    newCategoryName,
    setNewCategoryName,
    editingCategory,
    setEditingCategory,
    editCategoryName,
    setEditCategoryName,
    handleAddCategory,
    handleEditCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    fetchCategories,
  };
};
