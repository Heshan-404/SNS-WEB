import prisma from '../lib/prisma';
import { BrandDto, CreateBrandDto, UpdateBrandDto } from '../types/brand';

export class BrandService {
  async createBrand(data: CreateBrandDto): Promise<BrandDto> {
    const brand = await prisma.brand.create({
      data: { name: data.name },
    });
    return brand;
  }

  async getBrands(): Promise<BrandDto[]> {
    const brands = await prisma.brand.findMany({
      orderBy: { name: 'asc' },
    });
    return brands;
  }

  async getBrandById(id: number): Promise<BrandDto | null> {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });
    return brand;
  }

  async updateBrand(id: number, data: UpdateBrandDto): Promise<BrandDto | null> {
    const brand = await prisma.brand.update({
      where: { id },
      data: { name: data.name },
    });
    return brand;
  }

  async deleteBrand(id: number): Promise<BrandDto | null> {
    // Check if the brand is used by any products
    const productsCount = await prisma.product.count({
      where: { brandId: id },
    });

    if (productsCount > 0) {
      throw new Error('Cannot delete brand: It is currently used by products.');
    }

    const brand = await prisma.brand.delete({
      where: { id },
    });
    return brand;
  }
}

export const brandService = new BrandService();
