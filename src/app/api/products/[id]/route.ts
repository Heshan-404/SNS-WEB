import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { UploadedImageDto } from '@/types/image';
import { UpdateProductDto } from '@/types/product';
import { authMiddleware } from '@/lib/authMiddleware';
import { del } from '@vercel/blob';
import { Product } from '@prisma/client'; // Import Product type from Prisma Client
import { generateUniqueSlug } from '../../../../lib/slug';

export async function GET(
  request: Request,
  context: { params: Promise<{ id?: string | string[] }> },
) {
  const { id: idParam } = await context.params;
  try {
    const id = parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, brand: true, images: true },
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error('Error fetching product by ID:', error);
    let errorMessage = 'Failed to fetch product';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function putHandler(
  request: Request,
  context: { params: Promise<{ id?: string | string[] }> },
) {
  const { id: idParam } = await context.params;
  try {
    const id = parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    const data: UpdateProductDto = await request.json();

    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Handle isFeatured logic
    if (data.isFeatured !== undefined && data.isFeatured) {
      const featuredProductsCount = await prisma.product.count({
        where: { isFeatured: true, id: { not: id } }, // Exclude current product if it's already featured
      });

      if (featuredProductsCount >= 4) {
        return NextResponse.json(
          { error: 'Cannot feature more than 4 products.' },
          { status: 400 },
        );
      }
    }

    // Basic validation for images if provided
    if (data.images !== undefined) {
      if (data.images.length === 0 || !data.images.some((img: UploadedImageDto) => img.isMain)) {
        return NextResponse.json(
          { error: 'If updating images, at least one main image is required' },
          { status: 400 },
        );
      }

      // Determine images to delete from Vercel Blob
      const imagesToDelete = existingProduct.images.filter(
        (existingImg) => !data.images!.some((newImg) => newImg.url === existingImg.url),
      );

      // Delete images from Vercel Blob
      await Promise.all(imagesToDelete.map((img) => del(img.url)));
    }

    const { images, categoryId, brandId, ...productData } = data;

    const updateData: Partial<Product> & {
      images?: { deleteMany: Record<string, never>; create: { url: string; isMain: boolean }[] };
      slug?: string; // Add slug to updateData type
    } = {
      ...productData,
    };

    if (data.name && data.name !== existingProduct.name) {
      updateData.slug = await generateUniqueSlug(data.name);
    }

    if (categoryId !== undefined) {
      updateData.categoryId = categoryId;
    }
    if (brandId !== undefined) {
      updateData.brandId = brandId;
    }

    if (images !== undefined) {
      updateData.images = {
        deleteMany: {},
        create: images.map((img) => ({ url: img.url, isMain: img.isMain })),
      };
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true, brand: true, images: true },
    });
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProduct);
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    // Handle foreign key constraint errors (category/brand not found)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return NextResponse.json({ error: 'Invalid categoryId or brandId' }, { status: 400 });
    }
    let errorMessage = 'Failed to update product';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function deleteHandler(
  request: Request,
  context: { params: Promise<{ id?: string | string[] }> },
) {
  const { id: idParam } = await context.params;
  try {
    const id = parseInt(idParam as string, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    const deletedProduct = await prisma.product.delete({
      where: { id },
      include: { images: true }, // Include images to delete from blob
    });

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete associated images from Vercel Blob
    await Promise.all(deletedProduct.images.map((img) => del(img.url)));
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    let errorMessage = 'Failed to delete product';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const PUT = authMiddleware(putHandler);
export const DELETE = authMiddleware(deleteHandler);
