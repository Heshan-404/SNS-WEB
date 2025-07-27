import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { authMiddleware } from '../../../lib/authMiddleware';

async function postHandler(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
    const blob = await put(filename, request.body!, {
      access: 'public',
    });
    return NextResponse.json(blob);
  } catch (error: any) {
    console.error('Vercel Blob upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
