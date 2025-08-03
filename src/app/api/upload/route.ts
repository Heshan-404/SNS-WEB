import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { authMiddleware } from '../../../lib/authMiddleware';

async function postHandler(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      });
      return blob;
    });

    const uploadedBlobs = await Promise.all(uploadPromises);
    return NextResponse.json(uploadedBlobs);
  } catch (error: unknown) {
    console.error('Vercel Blob upload error:', error);
    let errorMessage = 'Failed to upload files';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const POST = authMiddleware(postHandler);
