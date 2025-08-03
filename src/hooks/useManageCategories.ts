import { useState, useEffect, useCallback } from "react";
import { categoryService } from "@/services/categoryService";
import { CategoryDto } from "@/types/category";

export const useManageCategories = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    } catch (err: any) {
      setError(err.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await categoryService.createCategory({ name: newCategoryName });
      setNewCategoryName("");
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "Failed to add category.");
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
      setEditCategoryName("");
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "Failed to update category.");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
    } catch (err: any) {
      alert(err.message || "Failed to delete category.");
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
