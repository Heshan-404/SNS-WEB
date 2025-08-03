import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { CreateBrandDto } from '@/types/brand';
import { authMiddleware } from '@/lib/authMiddleware';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(brands);
  } catch (error: unknown) {
    console.error('Error fetching brands:', error);
    let errorMessage = 'Failed to fetch brands';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function postHandler(request: Request) {
  try {
    const data: CreateBrandDto = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: 'Brand name is required' }, { status: 400 });
    }
    const brand = await prisma.brand.create({
      data: { name: data.name },
    });
    return NextResponse.json(brand, { status: 201 });
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
    console.error('Error creating brand:', error);
    let errorMessage = 'Failed to create brand';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
