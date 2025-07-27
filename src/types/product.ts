import { UploadedImageDto } from './image';

export interface CreateProductDto {
  name: string;
  shortName: string;
  description: string;
  categoryId: number;
  brandId: number;
  images: UploadedImageDto[]; // Array of image URLs and isMain flag
  availableSizes?: string[];
  voltages?: string[];
  colors?: string[];
}

export interface UpdateProductDto {
  name?: string;
  shortName?: string;
  description?: string;
  categoryId?: number;
  brandId?: number;
  images?: UploadedImageDto[]; // Array of image URLs and isMain flag
  availableSizes?: string[];
  voltages?: string[];
  colors?: string[];
}

export interface ProductDto {
  id: number;
  name: string;
  shortName: string;
  description: string;
  categoryId: number;
  brandId: number;
  category: { id: number; name: string };
  brand: { id: number; name: string };
  images: { id: number; url: string; isMain: boolean }[];
  availableSizes: string[];
  voltages: string[];
  colors: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListDto {
  id: number;
  name: string;
  shortName: string;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  mainImageUrl?: string; // Only main image for list view
}

export interface PaginatedProductsDto {
  products: ProductListDto[];
  total: number;
  page: number;
  limit: number;
}
