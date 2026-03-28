import { NextRequest, NextResponse } from 'next/server';

// Stores the custom notification email in a cookie so API routes can use it
// when sending booking/cancellation emails. No actual auth — just email memory.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });

  // Persist email in an HTTP-only cookie (30 days)
  res.cookies.set('notification_email', email, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });

  return res;
}
