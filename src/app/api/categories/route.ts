import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { CreateCategoryDto } from '@/types/category';
import { authMiddleware } from '@/lib/authMiddleware';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error: unknown) {
    console.error('Error fetching categories:', error);
    let errorMessage = 'Failed to fetch categories';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function postHandler(request: Request) {
  try {
    const data: CreateCategoryDto = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }
    const category = await prisma.category.create({
      data: { name: data.name },
    });
    return NextResponse.json(category, { status: 201 });
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
    console.error('Error creating category:', error);
    let errorMessage = 'Failed to create category';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
