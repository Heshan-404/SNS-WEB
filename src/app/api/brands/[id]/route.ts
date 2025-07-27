import { NextResponse } from 'next/server';
import { brandService } from '../../../../services/brandService';
import { UpdateBrandDto } from '@/types/brand';
import { authMiddleware } from '../../../../lib/authMiddleware';

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
    }
    const brand = await brandService.getBrandById(id);
    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json(brand);
  } catch (error: any) {
    console.error('Error fetching brand by ID:', error);
    return NextResponse.json({ error: 'Failed to fetch brand' }, { status: 500 });
  }
}

async function putHandler(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
    }
    const data: UpdateBrandDto = await request.json();
    if (!data.name) {
      return NextResponse.json({ error: 'Brand name is required' }, { status: 400 });
    }
    const updatedBrand = await brandService.updateBrand(id, data);
    if (!updatedBrand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBrand);
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return NextResponse.json({ error: 'Brand with this name already exists' }, { status: 409 });
    }
    console.error('Error updating brand:', error);
    return NextResponse.json({ error: 'Failed to update brand' }, { status: 500 });
  }
}

async function deleteHandler(request: Request, context: any) {
  const { params } = context;
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 });
    }
    const deletedBrand = await brandService.deleteBrand(id);
    if (!deletedBrand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Brand deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting brand:', error);
    // Specific error for deletion restriction
    if (error.message.includes('Cannot delete brand')) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to delete brand' }, { status: 500 });
  }
}

export const PUT = authMiddleware(putHandler);
export const DELETE = authMiddleware(deleteHandler);