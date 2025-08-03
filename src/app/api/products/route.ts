import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { UploadedImageDto } from '../../../types/image';
import { CreateProductDto } from '@/types/product';
import { authMiddleware } from '../../../lib/authMiddleware';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const categoryIdsParam = searchParams.get('categoryIds');
    const brandIdsParam = searchParams.get('brandIds');

    const categoryIds = categoryIdsParam
      ? categoryIdsParam
          .split(',')
          .map((id) => parseInt(id.trim(), 10))
          .filter((id) => !isNaN(id))
      : undefined;
    const brandIds = brandIdsParam
      ? brandIdsParam
          .split(',')
          .map((id) => parseInt(id.trim(), 10))
          .filter((id) => !isNaN(id))
      : undefined;

    const products = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...(categoryIds && categoryIds.length > 0 && { categoryId: { in: categoryIds } }),
        ...(brandIds && brandIds.length > 0 && { brandId: { in: brandIds } }),
      },
      include: { category: true, brand: true, images: true },
    });

    const total = await prisma.product.count({
      where: {
        ...(categoryIds && categoryIds.length > 0 && { categoryId: { in: categoryIds } }),
        ...(brandIds && brandIds.length > 0 && { brandId: { in: brandIds } }),
      },
    });

    const productsWithMainImage = products.map((product) => ({
      ...product,
      mainImageUrl: product.images.find((image) => image.isMain)?.url || null,
    }));

    return NextResponse.json({ products: productsWithMainImage, total, page, limit });
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    let errorMessage = 'Failed to fetch products';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function postHandler(request: Request) {
  try {
    const data: CreateProductDto = await request.json();

    // Basic validation for required fields
    if (
      !data.name ||
      !data.shortName ||
      !data.description ||
      !data.categoryId ||
      !data.brandId ||
      !data.images ||
      data.images.length === 0
    ) {
      return NextResponse.json(
        { error: 'Missing required product fields or main image' },
        { status: 400 },
      );
    }
    // Ensure at least one main image is provided
    if (!data.images.some((img: UploadedImageDto) => img.isMain)) {
      return NextResponse.json({ error: 'At least one main image is required' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        images: {
          create: data.images.map((img) => ({ url: img.url, isMain: img.isMain })),
        },
      },
      include: { category: true, brand: true, images: true },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    // Handle foreign key constraint errors (category/brand not found)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return NextResponse.json({ error: 'Invalid categoryId or brandId' }, { status: 400 });
    }
    let errorMessage = 'Failed to create product';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
