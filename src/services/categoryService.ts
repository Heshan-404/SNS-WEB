import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../types/category';

export class CategoryService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async createCategory(data: CreateCategoryDto): Promise<CategoryDto> {
    // Mock data
    console.log("Mocking createCategory with data:", data);
    const newCategory: CategoryDto = {
      id: Math.floor(Math.random() * 1000) + 100,
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newCategory;
  }

  async getCategories(): Promise<CategoryDto[]> {
    // Mock data
    return [
      { id: 1, name: "Category X", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Category Y", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "Category Z", createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  async getCategoryById(id: number): Promise<CategoryDto | null> {
    // Mock data
    const mockCategories: CategoryDto[] = [
      { id: 1, name: "Category X", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Category Y", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "Category Z", createdAt: new Date(), updatedAt: new Date() },
    ];
    return mockCategories.find(cat => cat.id === id) || null;
  }

  async updateCategory(id: number, data: UpdateCategoryDto): Promise<CategoryDto | null> {
    // Mock data
    console.log(`Mocking updateCategory for ID ${id} with data:`, data);
    const existingCategory = await this.getCategoryById(id);
    if (!existingCategory) {
      return null;
    }
    const updatedCategory: CategoryDto = {
      ...existingCategory,
      name: data.name || existingCategory.name,
      updatedAt: new Date(),
    };
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<CategoryDto | null> {
    // Mock data
    console.log(`Mocking deleteCategory for ID ${id}`);
    const existingCategory = await this.getCategoryById(id);
    if (!existingCategory) {
      return null;
    }
    // Simulate deletion restriction
    if (id === 1) { // Example: Category X is used by products
      throw new Error('Cannot delete category: It is currently used by products.');
    }
    return existingCategory;
  }
}

export const categoryService = new CategoryService();