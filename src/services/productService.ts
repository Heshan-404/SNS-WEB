import prisma from '../lib/prisma';
import { CreateProductDto, UpdateProductDto, ProductDto, ProductListDto, PaginatedProductsDto } from '../types/product';
import { UploadedImageDto } from '../types/image';

export class ProductService {
  async createProduct(data: CreateProductDto): Promise<ProductDto> {
    const { images, ...productData } = data;

    const product = await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images.map(img => ({ url: img.url, isMain: img.isMain })),
        },
      },
      include: { category: true, brand: true, images: true },
    });
    return product;
  }

  async getProducts(
    page: number = 1,
    limit: number = 10,
    categoryIds?: number[],
    brandIds?: number[]
  ): Promise<PaginatedProductsDto> {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (categoryIds && categoryIds.length > 0) {
      where.categoryId = { in: categoryIds };
    }
    if (brandIds && brandIds.length > 0) {
      where.brandId = { in: brandIds };
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { category: true, brand: true, images: { where: { isMain: true } } }, // Only main image for list
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    const productList: ProductListDto[] = products.map(p => ({
      id: p.id,
      name: p.name,
      shortName: p.shortName,
      brand: { id: p.brand.id, name: p.brand.name },
      category: { id: p.category.id, name: p.category.name },
      mainImageUrl: p.images.length > 0 ? p.images[0].url : undefined,
    }));

    return {
      products: productList,
      total,
      page,
      limit,
    };
  }

  async getProductById(id: number): Promise<ProductDto | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, brand: true, images: true }, // Include all images for detail view
    });
    return product;
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<ProductDto | null> {
    const { images, ...productData } = data;

    // Handle image updates: delete old images and create new ones
    if (images !== undefined) {
      await prisma.image.deleteMany({
        where: { productId: id },
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(images !== undefined && {
          images: {
            create: images.map(img => ({ url: img.url, isMain: img.isMain })),
          },
        }),
      },
      include: { category: true, brand: true, images: true },
    });
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<ProductDto | null> {
    // Images will be cascaded deleted due to onDelete: Cascade in schema
    const product = await prisma.product.delete({
      where: { id },
      include: { category: true, brand: true, images: true },
    });
    return product;
  }
}

export const productService = new ProductService();
