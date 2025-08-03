'use client';

import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '@/services/categoryService';
import { CategoryDto } from '@/types/category';

export const useManageCategories = (initialCategories: CategoryDto[] = []) => {
  const [categories, setCategories] = useState<CategoryDto[]>(initialCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch categories.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCategories.length > 0) {
      setCategories(initialCategories);
      setLoading(false);
    } else {
      fetchCategories();
    }
  }, [fetchCategories, initialCategories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await categoryService.createCategory({ name: newCategoryName });
      setNewCategoryName('');
      fetchCategories();
    } catch (err: unknown) {
      let errorMessage = 'Failed to add category.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  const handleEditCategory = (category: CategoryDto) => {
    setEditingCategory(category);
    setEditCategoryName(category.name);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editCategoryName.trim()) return;
    try {
      await categoryService.updateCategory(editingCategory.id, { name: editCategoryName });
      setEditingCategory(null);
      setEditCategoryName('');
      fetchCategories();
    } catch (err: unknown) {
      let errorMessage = 'Failed to update category.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
    } catch (err: unknown) {
      let errorMessage = 'Failed to delete category.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      alert(errorMessage);
    }
  };

  return {
    categories,
    loading,
    error,
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
