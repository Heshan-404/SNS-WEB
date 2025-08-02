
import { BrandDto, CreateBrandDto, UpdateBrandDto } from '../types/brand';

export class BrandService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }
  async createBrand(data: CreateBrandDto): Promise<BrandDto> {
    // Mock data
    console.log("Mocking createBrand with data:", data);
    const newBrand: BrandDto = {
      id: Math.floor(Math.random() * 1000) + 100,
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newBrand;
  }

  async getBrands(): Promise<BrandDto[]> {
    // Mock data
    return [
      { id: 1, name: "Brand A", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Brand B", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "Brand C", createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  async getBrandById(id: number): Promise<BrandDto | null> {
    // Mock data
    const mockBrands: BrandDto[] = [
      { id: 1, name: "Brand A", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "Brand B", createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: "Brand C", createdAt: new Date(), updatedAt: new Date() },
    ];
    return mockBrands.find(brand => brand.id === id) || null;
  }

  async updateBrand(id: number, data: UpdateBrandDto): Promise<BrandDto | null> {
    // Mock data
    console.log(`Mocking updateBrand for ID ${id} with data:`, data);
    const existingBrand = await this.getBrandById(id);
    if (!existingBrand) {
      return null;
    }
    const updatedBrand: BrandDto = {
      ...existingBrand,
      name: data.name || existingBrand.name,
      updatedAt: new Date(),
    };
    return updatedBrand;
  }

  async deleteBrand(id: number): Promise<BrandDto | null> {
    // Mock data
    console.log(`Mocking deleteBrand for ID ${id}`);
    const existingBrand = await this.getBrandById(id);
    if (!existingBrand) {
      return null;
    }
    // Simulate deletion restriction
    if (id === 1) { // Example: Brand A is used by products
      throw new Error('Cannot delete brand: It is currently used by products.');
    }
    return existingBrand;
  }
}

export const brandService = new BrandService();
