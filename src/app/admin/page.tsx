'use client';

import Link from 'next/link';

const events = [
  { id: 1, slug: '15min', title: '15 Minute Meeting', description: 'Quick sync call to discuss ideas or answer questions.', duration: 15, location: 'Google Meet', color: '#6366f1' },
  { id: 2, slug: '30min', title: '30 Minute Meeting', description: 'A standard meeting to discuss topics in depth.', duration: 30, location: 'Google Meet', color: '#8b5cf6' },
  { id: 3, slug: '1hour', title: '1 Hour Deep Dive', description: 'A comprehensive session for detailed discussions and planning.', duration: 60, location: 'Zoom', color: '#ec4899' },
  { id: 4, slug: 'product-demo', title: 'Product Demo', description: 'See our product in action and get your questions answered.', duration: 45, location: 'Google Meet', color: '#f59e0b' },
];

export default function UserProfilePage() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#f9fafb' }}>
      <style>{`
        .profile-event-card { transition: box-shadow 0.15s, border-color 0.15s; }
        .profile-event-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-color: #d1d5db !important; }
      `}</style>

      {/* NAV */}
      <nav style={{
        background: 'white', borderBottom: '1px solid #e5e7eb',
        padding: '0 24px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: 16, color: '#111827', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#111827" />
            <path d="M8 14h12M8 9h12M8 19h7" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Cal.com
        </Link>
        <div style={{ fontSize: 13, color: '#9ca3af' }}>Powered by Cal.com</div>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '60px 24px' }}>
        {/* Profile header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 32,
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
          }}>A</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Admin</h1>
          <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
            Welcome to my scheduling page. Please select a meeting type below.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" /></svg>
              Mon–Fri, 9 AM – 5 PM
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6" /><path d="M3 8a5 5 0 005-5M13 8a5 5 0 01-5 5" /></svg>
              America/New_York
            </span>
          </div>
        </div>

        {/* Event type cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {events.map(ev => (
            <Link
              key={ev.id}
              href={`/book/${ev.slug}`}
              className="profile-event-card"
              style={{
                background: 'white', border: '1px solid #e5e7eb',
                borderRadius: 12, padding: '20px 24px',
                textDecoration: 'none', color: 'inherit',
                display: 'flex', alignItems: 'center', gap: 16,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Color accent bar */}
              <div style={{ width: 4, position: 'absolute', left: 0, top: 0, bottom: 0, background: ev.color, borderRadius: '12px 0 0 12px' }} />

              {/* Color dot */}
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: ev.color, flexShrink: 0, marginLeft: 8 }} />

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 3, color: '#111827' }}>{ev.title}</div>
                <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8, lineHeight: 1.5 }}>{ev.description}</div>
                <div style={{ display: 'flex', gap: 14, fontSize: 12, color: '#9ca3af' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="8" cy="8" r="6" /><path d="M8 5v3l2 2" />
                    </svg>
                    {ev.duration} min
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="8" cy="6" r="3" /><path d="M2 13a6 6 0 0112 0" />
                    </svg>
                    {ev.location}
                  </span>
                </div>
              </div>

              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center', fontSize: 12, color: '#9ca3af' }}>
          Powered by{' '}
          <Link href="/" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>Cal.com</Link>
        </div>
      </div>
    </div>
  );
}
