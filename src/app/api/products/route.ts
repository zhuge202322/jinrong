import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PRODUCTS } from '@/data/products';

const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

function initDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(PRODUCTS, null, 2), 'utf8');
  }
}

export async function GET() {
  try {
    initDb();
    const data = fs.readFileSync(dbPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("DB Read Error:", error);
    return NextResponse.json(PRODUCTS);
  }
}

export async function POST(request: Request) {
  try {
    const products = await request.json();
    fs.writeFileSync(dbPath, JSON.stringify(products, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DB Write Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
  }
}
