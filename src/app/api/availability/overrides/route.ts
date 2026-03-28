import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbAll, dbRun, initDb } from '@/lib/db2';

export async function GET() {
  await initDb();
  const overrides = await dbAll(
    `SELECT * FROM date_overrides WHERE user_id = 1 ORDER BY date ASC`
  );
  return NextResponse.json(overrides);
}

export async function POST(req: NextRequest) {
  await initDb();
  const body = await req.json();
  const { date, is_blocked, start_time, end_time, reason } = body;

  if (!date) return NextResponse.json({ error: 'Date is required' }, { status: 400 });

  // Remove existing override for same date first
  await dbRun('DELETE FROM date_overrides WHERE user_id = 1 AND date = ?', [date]);

  const result = await dbRun(
    `INSERT INTO date_overrides (user_id, date, is_blocked, start_time, end_time, reason)
     VALUES (1, ?, ?, ?, ?, ?)`,
    [date, is_blocked ? 1 : 0, start_time || null, end_time || null, reason || null]
  );

  const override = await dbGet('SELECT * FROM date_overrides WHERE id = ?', [result.lastInsertRowid]);
  return NextResponse.json(override, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  await initDb();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  await dbRun('DELETE FROM date_overrides WHERE id = ? AND user_id = 1', [Number(id)]);
  return NextResponse.json({ success: true });
}
