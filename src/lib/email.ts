// Email utility — Gmail via Nodemailer (sole provider)

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_PASS;

  if (gmailUser && gmailPass) {
    await sendViaGmail(payload, gmailUser, gmailPass);
  } else {
    // No credentials configured — log to console (useful for local dev)
    console.log('\n📧 ─────────────── EMAIL (Gmail not configured) ─────────────────');
    console.log(`To:      ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log('─────────────────────────────────────────────────────────────────\n');
  }
}

async function sendViaGmail(payload: EmailPayload, user: string, pass: string) {
  const nodemailer = (await import('nodemailer')).default;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Schedulo" <${user}>`,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  });

  console.log(`[Gmail ✓] Email sent to ${payload.to}`);
}

// ─── Email Templates ──────────────────────────────────────────────────────────

function baseTemplate(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f3f4f6; color: #111827; }
  .wrapper { max-width: 600px; margin: 32px auto; }
  .header { background: #111827; padding: 24px 32px; border-radius: 12px 12px 0 0; display: flex; align-items: center; gap: 10px; }
  .header-logo { font-size: 18px; font-weight: 900; color: white; letter-spacing: -0.02em; }
  .body { background: white; padding: 32px; }
  .footer { background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; padding: 16px 32px; border-radius: 0 0 12px 12px; text-align: center; color: #9ca3af; font-size: 12px; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
  .badge-green { background: #dcfce7; color: #15803d; }
  .badge-red { background: #fee2e2; color: #b91c1c; }
  .detail-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin: 20px 0; }
  .detail-row { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 14px; }
  .detail-row:last-child { margin-bottom: 0; }
  .detail-label { font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px; }
  .detail-value { font-size: 14px; font-weight: 600; color: #111827; }
  .detail-sub { font-size: 13px; color: #374151; }
  .btn { display: inline-block; padding: 12px 24px; background: #111827; color: white; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; margin-top: 20px; }
  h1 { font-size: 24px; font-weight: 800; margin-bottom: 8px; color: #111827; }
  p { font-size: 14px; color: #6b7280; line-height: 1.6; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <span class="header-logo">📅 Schedulo</span>
  </div>
  <div class="body">
    ${content}
  </div>
  <div class="footer">
    © 2026 Schedulo · You received this email because a meeting was booked via Schedulo.
  </div>
</div>
</body>
</html>`;
}

export interface BookingEmailData {
  bookerName: string;
  bookerEmail: string;
  eventTitle: string;
  eventLocation: string;
  eventDuration: number;
  startTime: string;
  hostName?: string;
}

export function buildConfirmationEmail(data: BookingEmailData): string {
  const start = new Date(data.startTime);
  const dateStr = start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return baseTemplate(`
    <span class="badge badge-green">✓ Booking Confirmed</span>
    <h1>You're scheduled!</h1>
    <p>Hi <strong>${data.bookerName}</strong>, your meeting has been confirmed. Here are the details:</p>

    <div class="detail-box">
      <div class="detail-row">
        <div>
          <div class="detail-label">Event</div>
          <div class="detail-value">${data.eventTitle}</div>
          <div class="detail-sub">${data.eventDuration} min · ${data.eventLocation}</div>
        </div>
      </div>
      <div class="detail-row">
        <div>
          <div class="detail-label">Date &amp; Time</div>
          <div class="detail-value">${timeStr}</div>
          <div class="detail-sub">${dateStr}</div>
        </div>
      </div>
      <div class="detail-row">
        <div>
          <div class="detail-label">With</div>
          <div class="detail-value">${data.hostName || 'Admin'}</div>
        </div>
      </div>
    </div>

    <p>Add this to your calendar and we'll see you then!</p>
  `);
}

export function buildCancellationEmail(data: BookingEmailData): string {
  const start = new Date(data.startTime);
  const dateStr = start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return baseTemplate(`
    <span class="badge badge-red">✕ Booking Cancelled</span>
    <h1>Your meeting has been cancelled</h1>
    <p>Hi <strong>${data.bookerName}</strong>, the following booking has been cancelled:</p>

    <div class="detail-box">
      <div class="detail-row">
        <div>
          <div class="detail-label">Event</div>
          <div class="detail-value">${data.eventTitle}</div>
          <div class="detail-sub">${data.eventDuration} min · ${data.eventLocation}</div>
        </div>
      </div>
      <div class="detail-row">
        <div>
          <div class="detail-label">Was Scheduled For</div>
          <div class="detail-value">${timeStr}</div>
          <div class="detail-sub">${dateStr}</div>
        </div>
      </div>
    </div>

    <p>If you'd like to reschedule, you can book a new time at any moment.</p>
  `);
}

export function buildAdminNotificationEmail(data: BookingEmailData, type: 'confirmation' | 'cancellation'): string {
  const start = new Date(data.startTime);
  const dateStr = start.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const isCancel = type === 'cancellation';

  return baseTemplate(`
    <span class="badge ${isCancel ? 'badge-red' : 'badge-green'}">${isCancel ? '✕ Booking Cancelled' : '✓ New Booking'}</span>
    <h1>${isCancel ? 'A booking was cancelled' : 'You have a new booking!'}</h1>
    <p>Here are the details of the ${isCancel ? 'cancelled' : 'new'} booking:</p>

    <div class="detail-box">
      <div class="detail-row">
        <div>
          <div class="detail-label">Guest</div>
          <div class="detail-value">${data.bookerName}</div>
          <div class="detail-sub">${data.bookerEmail}</div>
        </div>
      </div>
      <div class="detail-row">
        <div>
          <div class="detail-label">Event</div>
          <div class="detail-value">${data.eventTitle}</div>
          <div class="detail-sub">${data.eventDuration} min · ${data.eventLocation}</div>
        </div>
      </div>
      <div class="detail-row">
        <div>
          <div class="detail-label">Date &amp; Time</div>
          <div class="detail-value">${timeStr}</div>
          <div class="detail-sub">${dateStr}</div>
        </div>
      </div>
    </div>
  `);
}
