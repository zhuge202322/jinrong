import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'data', 'contact.json');

const defaultContact = {
  wechat: "bandao-jinrong",
  qrCode: "",
  avatarUrl: ""
};

function initDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultContact, null, 2), 'utf8');
  }
}

export async function GET() {
  try {
    initDb();
    const data = fs.readFileSync(dbPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("DB Read Error:", error);
    return NextResponse.json(defaultContact);
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
