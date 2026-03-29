import { NextRequest, NextResponse } from 'next/server';
import { dbGet, dbRun, initDb } from '@/lib/db2';
import { sendEmail, buildCancellationEmail, buildAdminNotificationEmail } from '@/lib/email';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  const booking = await dbGet<{
    id: number; event_title: string; location: string; duration: number;
    booker_name: string; booker_email: string; start_time: string; status: string;
  }>(`
    SELECT b.*, et.title as event_title, et.duration, et.location
    FROM bookings b JOIN event_types et ON b.event_type_id = et.id
    WHERE b.id = ? AND b.user_id = 1
  `, [Number(id)]);

  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await dbRun('UPDATE bookings SET status = ? WHERE id = ?', [status, Number(id)]);

  const updated = await dbGet(`
    SELECT b.*, et.title as event_title, et.duration, et.color, et.location
    FROM bookings b JOIN event_types et ON b.event_type_id = et.id
    WHERE b.id = ?
  `, [Number(id)]);

  // ── Send cancellation emails ──
  if (status === 'cancelled' && booking.status !== 'cancelled') {
    const emailData = {
      bookerName: booking.booker_name,
      bookerEmail: booking.booker_email,
      eventTitle: booking.event_title,
      eventLocation: booking.location,
      eventDuration: booking.duration,
      startTime: booking.start_time,
    };

    await sendEmail({
      to: booking.booker_email,
      subject: `❌ Cancelled: ${booking.event_title}`,
      html: buildCancellationEmail(emailData),
    }).catch(console.error);

    const adminEmail = process.env.ADMIN_EMAIL ||
      req.cookies.get('notification_email')?.value || '';

    if (adminEmail && adminEmail !== booking.booker_email) {
      await sendEmail({
        to: adminEmail,
        subject: `🚫 Booking cancelled: ${booking.event_title} with ${booking.booker_name}`,
        html: buildAdminNotificationEmail(emailData, 'cancellation'),
      }).catch(console.error);
    }
  }

  return NextResponse.json(updated);
}
