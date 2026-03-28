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

  // MySQL DATETIME strict mode formatting: 'YYYY-MM-DD HH:MM:SS'
  const sqlStart = new Date(start_time).toISOString().slice(0, 19).replace('T', ' ');
  const sqlEnd = new Date(end_time).toISOString().slice(0, 19).replace('T', ' ');

  // ── Conflict check: Use SQL directly for maximum speed ────────────────
  const conflict = await dbGet('SELECT id FROM bookings WHERE user_id = 1 AND status != "cancelled" AND start_time < ? AND end_time > ? LIMIT 1', [sqlEnd, sqlStart]);

  if (conflict) {
    return NextResponse.json(
      { error: 'This time slot is already booked. Please choose a different time.' },
      { status: 409 }
    );
  }

  // ── Create booking ─────────────────────────────────────────────────────────
  const bookingUid = Math.random().toString(36).substring(2) + Date.now().toString(36);

  const result = await dbRun(
    `INSERT INTO bookings (event_type_id, booker_name, booker_email, start_time, end_time, notes, uid, answers, rescheduled_from)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [event_type_id, booker_name, booker_email, sqlStart, sqlEnd,
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

  // ── Send confirmation emails in back-end (Don't await to speed up UI) ───────
  const emailData = {
    bookerName: booking.booker_name, bookerEmail: booking.booker_email,
    eventTitle: booking.event_title, eventLocation: booking.location,
    eventDuration: booking.duration, startTime: booking.start_time,
  };
  const subject = `✅ ${rescheduled_from ? 'Rescheduled' : 'Confirmed'}: ${booking.event_title}`;

  // Start the email process but don't hold the user back - helps avoid UI hanging
  const sendNotifications = async () => {
    try {
      const emailPromises = [];
      emailPromises.push(sendEmail({ to: booker_email, subject, html: buildConfirmationEmail(emailData) }));
      const adminEmail = process.env.ADMIN_EMAIL || '';
      if (adminEmail && adminEmail !== booker_email) {
        emailPromises.push(sendEmail({
          to: adminEmail,
          subject: `📅 New booking: ${booking.event_title} with ${booker_name}`,
          html: buildAdminNotificationEmail(emailData, 'confirmation'),
        }));
      }
      await Promise.all(emailPromises);
    } catch (err) {
      console.error('[Email Notifications Failed]:', err);
    }
  };

  sendNotifications(); // Fire and forget (Vercel may terminate this early, but booking succeeds)

  return NextResponse.json(booking, { status: 201 });
}
