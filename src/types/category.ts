export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
