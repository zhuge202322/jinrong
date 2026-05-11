import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`, file, {
      access: 'public',
    });

    // Return the URL that can be used on the frontend
    return NextResponse.json({ success: true, url: blob.url });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Upload failed' }, { status: 500 });
  }
}
