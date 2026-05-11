import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'data', 'news_db.json');

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

function initDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultNews, null, 2), 'utf8');
  }
}

export async function GET() {
  try {
    initDb();
    const data = fs.readFileSync(dbPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("DB Read Error:", error);
    return NextResponse.json(defaultNews);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DB Write Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
