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
  isFeatured?: boolean;
}

export interface ProductDto {
  id: number;
  name: string;
  slug: string;
  shortName: string;
  description: string;
  categoryId: number;
  brandId: number;
  category: { id: number; name: string; createdAt: Date; updatedAt: Date };
  brand: { id: number; name: string; createdAt: Date; updatedAt: Date };
  images: {
    id: number;
    url: string;
    isMain: boolean;
    productId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  availableSizes: string[];
  voltages: string[];
  colors: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListDto {
  id: number;
  name: string;
  slug: string;
  shortName: string;
  description?: string; // Added description property
  brand: { id: number; name: string };
  category: { id: number; name: string };
  mainImageUrl?: string | null; // Only main image for list view
  isFeatured?: boolean;
  updatedAt: Date;
}

export interface PaginatedProductsDto {
  products: ProductListDto[];
  total: number;
  page: number;
  limit: number;
}
