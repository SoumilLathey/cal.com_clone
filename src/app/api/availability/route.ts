import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbAll, dbRun, initDb } from '@/lib/db2';

export async function GET() {
  await initDb();
  const availability = await dbGet<{ id: number; name: string; timezone: string }>(
    'SELECT * FROM availability WHERE user_id = 1 AND is_default = 1'
  );
  if (!availability) return NextResponse.json({ error: 'No availability found' }, { status: 404 });

  const days = await dbAll(
    'SELECT * FROM availability_days WHERE availability_id = ? ORDER BY day_of_week',
    [availability.id]
  );
  return NextResponse.json({ ...availability, days });
}

export async function PUT(req: NextRequest) {
  await initDb();
  const body = await req.json();
  const { timezone, days } = body;

  const avail = await dbGet<{ id: number }>(
    'SELECT * FROM availability WHERE user_id = 1 AND is_default = 1'
  );
  if (!avail) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (timezone) {
    await dbRun('UPDATE availability SET timezone = ? WHERE id = ?', [timezone, avail.id]);
  }

  if (days && Array.isArray(days)) {
    for (const day of days) {
      await dbRun(
        `UPDATE availability_days SET is_enabled = ?, start_time = ?, end_time = ?
         WHERE availability_id = ? AND day_of_week = ?`,
        [day.is_enabled ? 1 : 0, day.start_time, day.end_time, avail.id, day.day_of_week]
      );
    }
  }

  const updated = await dbGet('SELECT * FROM availability WHERE id = ?', [avail.id]);
  const updatedDays = await dbAll(
    'SELECT * FROM availability_days WHERE availability_id = ? ORDER BY day_of_week',
    [avail.id]
  );
  return NextResponse.json({ ...updated, days: updatedDays });
}
