import { NextResponse } from 'next/server';
import { brandService } from '../../../services/brandService';
import { CreateBrandDto } from '@/types/brand';
import { authMiddleware } from '../../../lib/authMiddleware';

export async function GET() {
  try {
    const brands = await brandService.getBrands();
    return NextResponse.json(brands);
  } catch (error: any) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 });
  }
}

async function postHandler(request: Request) {
  try {
    const data: CreateBrandDto = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: 'Brand name is required' }, { status: 400 });
    }
    const brand = await brandService.createBrand(data);
    return NextResponse.json(brand, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return NextResponse.json({ error: 'Brand with this name already exists' }, { status: 409 });
    }
    console.error('Error creating brand:', error);
    return NextResponse.json({ error: 'Failed to create brand' }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
