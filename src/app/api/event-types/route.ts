import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbGet, dbRun, initDb } from '@/lib/db2';

export async function GET() {
  await initDb();
  const eventTypes = await dbAll(`
    SELECT et.*,
      (SELECT COUNT(*) FROM bookings b WHERE b.event_type_id = et.id AND b.status != 'cancelled') as booking_count
    FROM event_types et WHERE et.user_id = 1 ORDER BY et.created_at DESC
  `);
  return NextResponse.json(eventTypes);
}

export async function POST(req: NextRequest) {
  await initDb();
  const body = await req.json();
  const { title, slug, description, duration, location, color, buffer_time, custom_questions } = body;
  if (!title || !slug || !duration) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const existing = await dbGet('SELECT id FROM event_types WHERE slug = ?', [slug]);
  if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
  const result = await dbRun(
    `INSERT INTO event_types (user_id,title,slug,description,duration,location,color,buffer_time,custom_questions) VALUES (1,?,?,?,?,?,?,?,?)`,
    [title, slug, description || '', duration, location || 'Google Meet', color || '#6366f1',
     buffer_time ?? 0, JSON.stringify(custom_questions ?? [])]
  );
  const newEvent = await dbGet('SELECT * FROM event_types WHERE id = ?', [result.lastInsertRowid]);
  return NextResponse.json(newEvent, { status: 201 });
}
