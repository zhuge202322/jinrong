import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const kv = new Redis({
  url: process.env.jinrong_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.jinrong_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const defaultContact = {
  wechat: "bandao-jinrong",
  qrCode: "",
  avatarUrl: ""
};

export async function GET() {
  try {
    const data = await kv.get('contact');
    if (data) {
      return NextResponse.json(data);
    } else {
      await kv.set('contact', defaultContact);
      return NextResponse.json(defaultContact);
    }
  } catch (error) {
    console.error("KV Read Error:", error);
    return NextResponse.json(defaultContact);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await kv.set('contact', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KV Write Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
