import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { UpdateBrandDto } from '@/types/brand';
import { authMiddleware } from '@/lib/authMiddleware';

export async function GET(
  request: Request,
  context: { params: Promise<Record<string, string | string[] | undefined>> },
) {
  const params = await context.params;
  try {
    const id = parseInt(params?.id as string, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
    }
    const brand = await prisma.brand.findUnique({
      where: { id },
    });
    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json(brand);
  } catch (error: unknown) {
    console.error('Error fetching brand by ID:', error);
    let errorMessage = 'Failed to fetch brand';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function putHandler(
  request: Request,
  context: { params: Promise<Record<string, string | string[] | undefined>> },
) {
  const params = await context.params;
  try {
    const id = parseInt(params?.id as string, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
    }
    const data: UpdateBrandDto = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: 'Brand name is required' }, { status: 400 });
    }
    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: { name: data.name },
    });
    if (!updatedBrand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBrand);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'P2002' &&
      'meta' in error &&
      typeof error.meta === 'object' &&
      error.meta &&
      'target' in error.meta &&
      Array.isArray(error.meta.target) &&
      error.meta.target.includes('name')
    ) {
      return NextResponse.json({ error: 'Brand with this name already exists' }, { status: 409 });
    }
    console.error('Error updating brand:', error);
    let errorMessage = 'Failed to update brand';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function deleteHandler(
  request: Request,
  context: { params: Promise<Record<string, string | string[] | undefined>> },
) {
  const params = await context.params;
  try {
    const id = parseInt(params?.id as string, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
    }
    const productsCount = await prisma.product.count({
      where: { brandId: id },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete brand: It is currently used by products.' },
        { status: 409 },
      );
    }

    const deletedBrand = await prisma.brand.delete({
      where: { id },
    });
    if (!deletedBrand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Brand deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting brand:', error);
    let errorMessage = 'Failed to delete brand';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string' &&
      error.message.includes('Cannot delete brand')
    ) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const PUT = authMiddleware(putHandler);
export const DELETE = authMiddleware(deleteHandler);
