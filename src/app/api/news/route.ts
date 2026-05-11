import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const defaultNews = [
  {
    id: 'news-001',
    title: '2026年最新公积金贷款政策解读',
    summary: '多地下调公积金贷款利率，首套房利率创历史新低，最低可至2.85%，一起来看看你是否符合申请条件。',
    date: '2026-05-06',
    category: '政策解读',
    views: 3452,
    link: ''
  },
  {
    id: 'news-002',
    title: '房抵经营贷和房抵消费贷有什么区别？',
    summary: '很多人在选择房产抵押贷款时分不清经营贷和消费贷，本文从利率、额度、用途等5个维度为您详细剖析。',
    date: '2026-05-02',
    category: '贷款知识',
    views: 8921,
    link: ''
  }
];

export async function GET() {
  try {
    const data = await kv.get('news');
    if (data) {
      return NextResponse.json(data);
    } else {
      await kv.set('news', defaultNews);
      return NextResponse.json(defaultNews);
    }
  } catch (error) {
    console.error("KV Read Error:", error);
    return NextResponse.json(defaultNews);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await kv.set('news', data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KV Write Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
