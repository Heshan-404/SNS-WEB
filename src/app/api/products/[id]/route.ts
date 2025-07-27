import { NextResponse } from 'next/server';
import { productService } from '../../../../services/productService';
import { UploadedImageDto } from '../../../../types/image';
import { UpdateProductDto } from '@/types/product';
import { authMiddleware } from '../../../../lib/authMiddleware';

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    const product = await productService.getProductById(id);
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

    // Basic validation for images if provided
    if (data.images !== undefined) {
      if (data.images.length === 0 || !data.images.some((img: UploadedImageDto) => img.isMain)) {
        return NextResponse.json({ error: 'If updating images, at least one main image is required' }, { status: 400 });
      }
    }

    const updatedProduct = await productService.updateProduct(id, data);
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
    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export const PUT = authMiddleware(putHandler);
export const DELETE = authMiddleware(deleteHandler);