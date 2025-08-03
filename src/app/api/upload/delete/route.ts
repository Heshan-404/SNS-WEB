import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/authMiddleware';

async function postHandler(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Vercel Blob deletion error:', error);
    let errorMessage = 'Failed to delete image';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
