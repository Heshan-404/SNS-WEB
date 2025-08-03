import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { UploadedImageDto } from '../../../../types/image';
import { UpdateProductDto } from '@/types/product';
import { authMiddleware } from '../../../../lib/authMiddleware';
import { del } from '@vercel/blob';

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
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
  } catch (error: any) {
    console.error('Error fetching product by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

async function putHandler(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
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

    // Basic validation for images if provided
    if (data.images !== undefined) {
      if (data.images.length === 0 || !data.images.some((img: UploadedImageDto) => img.isMain)) {
        return NextResponse.json({ error: 'If updating images, at least one main image is required' }, { status: 400 });
      }

      // Determine images to delete from Vercel Blob
      const imagesToDelete = existingProduct.images.filter(
        (existingImg) => !data.images!.some((newImg) => newImg.url === existingImg.url)
      );

      // Delete images from Vercel Blob
      await Promise.all(imagesToDelete.map((img) => del(img.url)));
    }

    const { images, categoryId, brandId, ...productData } = data;

    const updateData: any = {
      ...productData,
    };

    if (categoryId !== undefined) {
      updateData.categoryId = categoryId;
    }
    if (brandId !== undefined) {
      updateData.brandId = brandId;
    }

    if (images !== undefined) {
      updateData.images = {
        deleteMany: {},
        create: images.map(img => ({ url: img.url, isMain: img.isMain })),
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
  } catch (error: any) {
    console.error('Error updating product:', error);
    // Handle foreign key constraint errors (category/brand not found)
    if (error.code === 'P2003') {
      return NextResponse.json({ error: 'Invalid categoryId or brandId' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

async function deleteHandler(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
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
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export const PUT = authMiddleware(putHandler);
export const DELETE = authMiddleware(deleteHandler);