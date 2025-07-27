export interface CreateBrandDto {
  name: string;
}

export interface UpdateBrandDto {
  name: string;
}

export interface BrandDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
