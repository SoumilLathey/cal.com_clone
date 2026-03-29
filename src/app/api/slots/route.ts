import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbAll, initDb } from '@/lib/db2';

// Normalize any datetime string to milliseconds for reliable comparison
function toMs(dt: string): number {
  return new Date(dt).getTime();
}

export async function GET(req: NextRequest) {
  await initDb();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const date = searchParams.get('date'); // YYYY-MM-DD

  if (!slug || !date) return NextResponse.json({ error: 'Missing slug or date' }, { status: 400 });

  const eventType = await dbGet<{ id: number; duration: number; buffer_time: number }>(
    'SELECT * FROM event_types WHERE slug = ? AND is_active = 1', [slug]
  );
  if (!eventType) return NextResponse.json({ error: 'Event type not found' }, { status: 404 });

  // ── Check date override ────────────────────────────────────────────────────
  const override = await dbGet<{ is_blocked: number; start_time: string | null; end_time: string | null }>(
    'SELECT * FROM date_overrides WHERE user_id = 1 AND date = ?', [date]
  ).catch(() => undefined); // gracefully handle if table doesn't exist yet

  if (override?.is_blocked) return NextResponse.json({ slots: [] });

  // ── Get base availability ──────────────────────────────────────────────────
  const availability = await dbGet<{ id: number }>(
    'SELECT * FROM availability WHERE user_id = 1 AND is_default = 1'
  );
  if (!availability) return NextResponse.json({ slots: [] });

  const dateObj = new Date(date + 'T00:00:00');
  const dayOfWeek = dateObj.getDay();

  const dayAvail = await dbGet<{ start_time: string; end_time: string }>(
    'SELECT * FROM availability_days WHERE availability_id = ? AND day_of_week = ? AND is_enabled = 1',
    [availability.id, dayOfWeek]
  );
  
  // If the day is completely disabled and there is no date override granting custom hours, return no slots.
  if (!dayAvail && !override) return NextResponse.json({ slots: [] });

  const startStr = (override?.start_time) ?? dayAvail?.start_time;
  const endStr = (override?.end_time) ?? dayAvail?.end_time;
  
  if (!startStr || !endStr) return NextResponse.json({ slots: [] });

  const [startH, startM] = startStr.split(':').map(Number);
  const [endH, endM] = endStr.split(':').map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  const duration = eventType.duration;
  const buffer = Number(eventType.buffer_time) || 0;
  const slotStep = duration + buffer;

  // Generate all candidate slot start times  
  const allSlots: string[] = [];
  for (let m = startMinutes; m + duration <= endMinutes; m += slotStep) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    // Build a local-time ISO string for this slot
    allSlots.push(`${date}T${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`);
  }

  // ── Fetch all active bookings for this user for the given date ─────────────
  // We use a wide window (the whole day) to catch all possible overlaps
  // Note: start_time is stored as ISO — may be UTC or local depending on how it was inserted
  // We fetch any booking whose start or end falls on this date in UTC or within ±1 day window
  const dateStart = new Date(date + 'T00:00:00');
  const dateEnd = new Date(date + 'T23:59:59');
  
  // Format dates for MySQL: 'YYYY-MM-DD HH:MM:SS'
  const mysqlWindowStart = new Date(dateStart.getTime() - 24 * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  const mysqlWindowEnd = new Date(dateEnd.getTime() + 24 * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  const existingBookings = await dbAll<{ start_time: string; end_time: string; buffer_time: number }>(
    `SELECT b.start_time, b.end_time, COALESCE(et.buffer_time, 0) as buffer_time
     FROM bookings b
     JOIN event_types et ON b.event_type_id = et.id
     WHERE b.user_id = 1 AND b.status != 'cancelled'
     AND b.start_time >= ? AND b.start_time <= ?`,
    [mysqlWindowStart, mysqlWindowEnd]
  );

  // ── Map: mark slots as available or busy ──
  const slotsWithStatus = allSlots.map(slotStr => {
    const slotStartMs = toMs(slotStr);
    const slotEndMs = slotStartMs + duration * 60000;

    const isBusy = existingBookings.some(booked => {
      const bookedStartMs = toMs(booked.start_time);
      const bookedEndMs = toMs(booked.end_time);
      const bufMs = (Number(booked.buffer_time) || 0) * 60000;

      // NEW slot [slotStart, slotEnd] overlaps existing [bookedStart, bookedEnd + buffer]
      return slotStartMs < (bookedEndMs + bufMs) && slotEndMs > bookedStartMs;
    });

    return {
      time: slotStr,
      status: isBusy ? 'busy' : 'available'
    };
  });

  return NextResponse.json({ slots: slotsWithStatus });
}
