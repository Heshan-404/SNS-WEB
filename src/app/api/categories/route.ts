import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { CreateCategoryDto } from '@/types/category';
import { authMiddleware } from '../../../lib/authMiddleware';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
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
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return NextResponse.json({ error: 'Category with this name already exists' }, { status: 409 });
    }
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
