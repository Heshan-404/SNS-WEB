import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../types/category';

const API_BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api';

export const categoryService = {
  createCategory: async (data: CreateCategoryDto): Promise<CategoryDto> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create category');
    }
    return response.json();
  },

  getCategories: async (): Promise<CategoryDto[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch categories');
    }
    return response.json();
  },

  getCategoryById: async (id: number): Promise<CategoryDto> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch category');
    }
    return response.json();
  },

  updateCategory: async (id: number, data: UpdateCategoryDto): Promise<CategoryDto> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update category');
    }
    return response.json();
  },

  deleteCategory: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete category');
    }
  },
};