import { BrandDto, CreateBrandDto, UpdateBrandDto } from '../types/brand';
import { getAuthHeaders } from '../lib/api';

const API_BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api';

export const brandService = {
  createBrand: async (data: CreateBrandDto): Promise<BrandDto> => {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create brand');
    }
    return response.json();
  },

  getBrands: async (): Promise<BrandDto[]> => {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch brands');
    }
    return response.json();
  },

  getBrandById: async (id: number): Promise<BrandDto> => {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch brand');
    }
    return response.json();
  },

  updateBrand: async (id: number, data: UpdateBrandDto): Promise<BrandDto> => {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update brand');
    }
    return response.json();
  },

  deleteBrand: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete brand');
    }
  },
};
