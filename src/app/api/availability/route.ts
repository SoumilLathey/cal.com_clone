import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbAll, dbRun, initDb } from '@/lib/db2';

export async function GET() {
  await initDb();
  const availabilities = await dbAll<{ id: number; name: string; timezone: string; is_default: number }>(
    'SELECT * FROM availability WHERE user_id = 1 ORDER BY is_default DESC, id DESC'
  );

  const results = [];
  for (const avail of availabilities) {
    const days = await dbAll(
      'SELECT * FROM availability_days WHERE availability_id = ? ORDER BY day_of_week',
      [avail.id]
    );
    results.push({ ...avail, days });
  }

  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  await initDb();
  const { name } = await req.json();

  const res = await dbRun(
    'INSERT INTO availability (user_id, name, timezone, is_default) VALUES (1, ?, ?, 0)',
    [name || 'New Schedule', 'America/New_York']
  );

  const aid = res.lastInsertRowid!;

  // Create 7 default days
  for (let i = 0; i < 7; i++) {
    const isEn = (i >= 1 && i <= 5) ? 1 : 0;
    await dbRun(
      'INSERT INTO availability_days (availability_id, day_of_week, is_enabled, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
      [aid, i, isEn, '09:00', '17:00']
    );
  }

  return NextResponse.json({ id: aid, name, success: true });
}

export async function PUT(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    const { id, timezone, days, name } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    if (timezone) {
      await dbRun('UPDATE availability SET timezone = ? WHERE id = ?', [timezone, id]);
    }
    if (name) {
      await dbRun('UPDATE availability SET name = ? WHERE id = ?', [name, id]);
    }

    if (days && Array.isArray(days)) {
      for (const day of days) {
        await dbRun(
          `UPDATE availability_days SET is_enabled = ?, start_time = ?, end_time = ?
           WHERE availability_id = ? AND day_of_week = ?`,
          [day.is_enabled ? 1 : 0, day.start_time, day.end_time, id, day.day_of_week]
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Update availability error:', err);
    return NextResponse.json({ error: err.message || 'Failed to update' }, { status: 500 });
  }
}
