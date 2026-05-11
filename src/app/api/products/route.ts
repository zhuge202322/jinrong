import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { PRODUCTS } from '@/data/products';

const kv = new Redis({
  url: process.env.jinrong_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.jinrong_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET() {
  try {
    const data = await kv.get('products');
    if (data) {
      return NextResponse.json(data);
    } else {
      await kv.set('products', PRODUCTS);
      return NextResponse.json(PRODUCTS);
    }
  } catch (error) {
    console.error("KV Read Error:", error);
    return NextResponse.json(PRODUCTS);
  }
}

export async function POST(request: Request) {
  try {
    const products = await request.json();
    await kv.set('products', products);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KV Write Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
