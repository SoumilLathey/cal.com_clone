import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun, initDb } from '@/lib/db2';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const et = await dbGet('SELECT * FROM event_types WHERE id = ? AND user_id = 1', [Number(id)]);
  if (!et) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(et);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const body = await req.json();
  const { title, slug, description, duration, location, color, is_active, buffer_time, custom_questions } = body;
  const existing = await dbGet('SELECT id FROM event_types WHERE id = ? AND user_id = 1', [Number(id)]);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const slugConflict = await dbGet('SELECT id FROM event_types WHERE slug = ? AND id != ?', [slug, Number(id)]);
  if (slugConflict) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
  await dbRun(
    `UPDATE event_types SET title=?,slug=?,description=?,duration=?,location=?,color=?,is_active=?,buffer_time=?,custom_questions=? WHERE id=? AND user_id=1`,
    [title, slug, description||'', duration, location||'Google Meet', color||'#6366f1',
     is_active??1, buffer_time??0, JSON.stringify(custom_questions??[]), Number(id)]
  );
  const updated = await dbGet('SELECT * FROM event_types WHERE id = ?', [Number(id)]);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const existing = await dbGet('SELECT id FROM event_types WHERE id = ? AND user_id = 1', [Number(id)]);
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await dbRun('DELETE FROM event_types WHERE id = ?', [Number(id)]);
  return NextResponse.json({ success: true });
}
