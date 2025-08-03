import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { authMiddleware } from '../../../../lib/authMiddleware';

async function postHandler(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Vercel Blob deletion error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
