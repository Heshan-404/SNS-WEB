import {
  CreateProductDto,
  ProductDto,
  PaginatedProductsDto,
  UpdateProductDto,
} from '@/types/product';
import { UploadedImageDto } from '@/types/image';
import { getAuthHeaders } from '../lib/api';

const API_BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') + '/api';

export const productService = {
  uploadImages: async (files: File[]): Promise<UploadedImageDto[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload images');
    }

    const uploadedBlobs: {
      url: string;
      pathname: string;
      contentType: string;
      contentDisposition: string;
    }[] = await response.json();
    return uploadedBlobs.map((blob) => ({
      url: blob.url,
      isMain: false, // This will be set by the client component logic
      name: blob.pathname.split('/').pop() || '',
      size: 0, // Size is not returned by Vercel Blob put, can be fetched later if needed
      type: blob.contentType,
    }));
  },

  createProduct: async (productData: CreateProductDto): Promise<ProductDto> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create product');
    }

    return response.json();
  },

  getProducts: async (
    page: number = 1,
    limit: number = 10,
    categoryIds?: number[],
    brandIds?: number[],
    searchTerm?: string,
    isFeatured?: boolean, // New parameter
  ): Promise<PaginatedProductsDto> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (categoryIds && categoryIds.length > 0) {
      params.append('categoryIds', categoryIds.join(','));
    }
    if (brandIds && brandIds.length > 0) {
      params.append('brandIds', brandIds.join(','));
    }
    if (searchTerm) {
      params.append('searchTerm', searchTerm);
    }
    if (isFeatured !== undefined) {
      params.append('isFeatured', isFeatured.toString());
    }

    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch products');
    }
    return response.json();
  },

  getProductById: async (id: number): Promise<ProductDto> => {
    
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch product');
    }
    return response.json();
  },

  updateProduct: async (id: number, productData: UpdateProductDto): Promise<ProductDto> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update product');
    }
    return response.json();
  },

  deleteProduct: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete product');
    }
  },

  deleteImage: async (url: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/upload/delete`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete image');
    }
  },
};
