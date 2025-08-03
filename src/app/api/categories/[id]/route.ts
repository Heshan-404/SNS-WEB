import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { UpdateCategoryDto } from '@/types/category';
import { authMiddleware } from '@/lib/authMiddleware';

export async function GET(
  request: Request,
  context: { params: Promise<Record<string, string | string[] | undefined>> },
) {
  const params = await context.params;
  try {
    const id = parseInt(params?.id as string, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error: unknown) {
    console.error('Error fetching category by ID:', error);
    let errorMessage = 'Failed to fetch category';
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
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }
    const data: UpdateCategoryDto = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name: data.name },
    });
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(updatedCategory);
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
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 },
      );
    }
    console.error('Error updating category:', error);
    let errorMessage = 'Failed to update category';
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
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category: It is currently used by products.' },
        { status: 409 },
      );
    }

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting category:', error);
    let errorMessage = 'Failed to delete category';
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string' &&
      error.message.includes('Cannot delete category')
    ) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const PUT = authMiddleware(putHandler);
export const DELETE = authMiddleware(deleteHandler);
