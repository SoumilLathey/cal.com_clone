import { NextRequest, NextResponse } from 'next/server';
import { dbAll, dbGet, dbRun, initDb } from '@/lib/db2';
import { sendEmail, buildConfirmationEmail, buildAdminNotificationEmail } from '@/lib/email';

export async function GET() {
  try {
    await initDb();
    const bookings = await dbAll(`
      SELECT b.*, et.title as event_title, et.duration, et.color, et.location
      FROM bookings b JOIN event_types et ON b.event_type_id = et.id
      WHERE b.user_id = 1 ORDER BY b.start_time ASC
    `);
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error?.message || String(error) 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await initDb();
  const body = await req.json();
  const { event_type_id, booker_name, booker_email, start_time, end_time, notes, answers, rescheduled_from } = body;

  if (!event_type_id || !booker_name || !booker_email || !start_time || !end_time)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  const newStart = new Date(start_time).getTime();
  const newEnd = new Date(end_time).getTime();

  if (isNaN(newStart) || isNaN(newEnd) || newEnd <= newStart)
    return NextResponse.json({ error: 'Invalid time range' }, { status: 400 });

  // ── Conflict check: fetch ALL active bookings for this user ────────────────
  // Compare using getTime() to be immune to ISO format differences (Z vs no-Z, etc.)
  const allActive = await dbAll<{ id: number; start_time: string; end_time: string; uid: string }>(
    `SELECT id, start_time, end_time, uid FROM bookings
     WHERE user_id = 1 AND status != 'cancelled'`
  );

  // If rescheduling, exclude the booking being replaced from the conflict check
  const activeToCheck = rescheduled_from
    ? allActive.filter(b => b.uid !== rescheduled_from)
    : allActive;

  const conflict = activeToCheck.find(b => {
    const bs = new Date(b.start_time).getTime();
    const be = new Date(b.end_time).getTime();
    // Overlap: newStart < bookedEnd AND newEnd > bookedStart
    return newStart < be && newEnd > bs;
  });

  if (conflict) {
    return NextResponse.json(
      { error: 'This time slot is already booked. Please choose a different time.' },
      { status: 409 }
    );
  }

  // ── Create booking ─────────────────────────────────────────────────────────
  const bookingUid = Math.random().toString(36).substring(2) + Date.now().toString(36);

  const result = await dbRun(
    `INSERT INTO bookings (event_type_id, user_id, booker_name, booker_email, start_time, end_time, notes, status, uid, answers, rescheduled_from)
     VALUES (?, 1, ?, ?, ?, ?, ?, 'upcoming', ?, ?, ?)`,
    [event_type_id, booker_name, booker_email, start_time, end_time,
     notes || '', bookingUid,
     JSON.stringify(answers ?? []),
     rescheduled_from || null]
  );

  // Cancel the old booking if rescheduling
  if (rescheduled_from) {
    await dbRun(`UPDATE bookings SET status = 'cancelled' WHERE uid = ? AND user_id = 1`, [rescheduled_from]);
  }

  const booking = await dbGet<{
    event_title: string; location: string; duration: number;
    booker_name: string; booker_email: string; start_time: string; uid: string;
  }>(`SELECT b.*, et.title as event_title, et.duration, et.color, et.location
      FROM bookings b JOIN event_types et ON b.event_type_id = et.id WHERE b.id = ?`,
    [result.lastInsertRowid]);

  if (!booking) return NextResponse.json({ error: 'Booking failed' }, { status: 500 });

  // ── Send confirmation emails ───────────────────────────────────────────────
  const emailData = {
    bookerName: booking.booker_name, bookerEmail: booking.booker_email,
    eventTitle: booking.event_title, eventLocation: booking.location,
    eventDuration: booking.duration, startTime: booking.start_time,
  };
  const subject = `✅ ${rescheduled_from ? 'Rescheduled' : 'Confirmed'}: ${booking.event_title}`;
  sendEmail({ to: booker_email, subject, html: buildConfirmationEmail(emailData) }).catch(console.error);

  const adminEmail = process.env.ADMIN_EMAIL || req.cookies.get('notification_email')?.value || '';
  if (adminEmail && adminEmail !== booker_email) {
    sendEmail({
      to: adminEmail,
      subject: `📅 ${rescheduled_from ? 'Rescheduled' : 'New booking'}: ${booking.event_title} with ${booker_name}`,
      html: buildAdminNotificationEmail(emailData, 'confirmation'),
    }).catch(console.error);
  }

  return NextResponse.json(booking, { status: 201 });
}
