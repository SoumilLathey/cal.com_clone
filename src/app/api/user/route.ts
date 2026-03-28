import { NextResponse } from 'next/server';
import { dbGet, dbAll, initDb } from '@/lib/db2';

export async function GET() {
  await initDb();
  const user = await dbGet('SELECT * FROM users WHERE id = 1');
  return NextResponse.json(user);
}
