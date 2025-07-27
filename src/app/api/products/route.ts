import { NextResponse } from 'next/server';
import { productService } from '../../../services/productService';
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

    const categoryIds = categoryIdsParam ? categoryIdsParam.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id)) : undefined;
    const brandIds = brandIdsParam ? brandIdsParam.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id)) : undefined;

    const products = await productService.getProducts(page, limit, categoryIds, brandIds);
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

async function postHandler(request: Request) {
  try {
    const data: CreateProductDto = await request.json();

    // Basic validation for required fields
    if (!data.name || !data.shortName || !data.description || !data.categoryId || !data.brandId || !data.images || data.images.length === 0) {
      return NextResponse.json({ error: 'Missing required product fields or main image' }, { status: 400 });
    }
    // Ensure at least one main image is provided
    if (!data.images.some((img: UploadedImageDto) => img.isMain)) {
      return NextResponse.json({ error: 'At least one main image is required' }, { status: 400 });
    }

    const product = await productService.createProduct(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    // Handle foreign key constraint errors (category/brand not found)
    if (error.code === 'P2003') {
      return NextResponse.json({ error: 'Invalid categoryId or brandId' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
