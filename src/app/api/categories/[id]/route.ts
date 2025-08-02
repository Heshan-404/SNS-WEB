import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { UpdateCategoryDto } from '@/types/category';
import { authMiddleware } from '../../../../lib/authMiddleware';

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
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
  } catch (error: any) {
    console.error('Error fetching category by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

async function putHandler(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
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
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return NextResponse.json({ error: 'Category with this name already exists' }, { status: 409 });
    }
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

async function deleteHandler(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      return NextResponse.json({ error: 'Cannot delete category: It is currently used by products.' }, { status: 409 });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    // Specific error for deletion restriction
    if (error.message.includes('Cannot delete category')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}

export const PUT = authMiddleware(putHandler);
export const DELETE = authMiddleware(deleteHandler);