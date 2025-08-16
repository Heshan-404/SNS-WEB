import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug?: string | string[] }> },
) {
  const { slug: slugParam } = await context.params;
  try {
    const slug = slugParam as string;
    if (!slug) {
      return NextResponse.json({ error: 'Invalid product slug' }, { status: 400 });
    }
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true, brand: true, images: true },
    });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: unknown) {
    console.error('Error fetching product by slug:', error);
    let errorMessage = 'Failed to fetch product';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}