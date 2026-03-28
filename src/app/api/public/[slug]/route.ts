import { NextRequest, NextResponse } from 'next/server';
import { dbGet, initDb } from '@/lib/db2';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  await initDb();
  const { slug } = await params;
  const eventType = await dbGet('SELECT * FROM event_types WHERE slug = ? AND is_active = 1', [slug]);
  if (!eventType) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(eventType);
}
