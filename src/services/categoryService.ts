import prisma from '../lib/prisma';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../types/category';

export class CategoryService {
  async createCategory(data: CreateCategoryDto): Promise<CategoryDto> {
    const category = await prisma.category.create({
      data: { name: data.name },
    });
    return category;
  }

  async getCategories(): Promise<CategoryDto[]> {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return categories;
  }

  async getCategoryById(id: number): Promise<CategoryDto | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  }

  async updateCategory(id: number, data: UpdateCategoryDto): Promise<CategoryDto | null> {
    const category = await prisma.category.update({
      where: { id },
      data: { name: data.name },
    });
    return category;
  }

  async deleteCategory(id: number): Promise<CategoryDto | null> {
    // Check if the category is used by any products
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      throw new Error('Cannot delete category: It is currently used by products.');
    }

    const category = await prisma.category.delete({
      where: { id },
    });
    return category;
  }
}

export const categoryService = new CategoryService();
