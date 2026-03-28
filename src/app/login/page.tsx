'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Tab = 'admin' | 'custom';

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('admin');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_EMAIL = 'alex@schedulo.app';

  async function handleAdminLogin() {
    setLoading(true);
    // Save admin email as notification address via cookie
    await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL }),
    }).catch(() => null);
    // Also keep in localStorage for client-side display
    localStorage.setItem('notification_email', ADMIN_EMAIL);
    setLoading(false);
    router.push('/dashboard');
  }

  async function handleCustomLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError('Please enter a valid email address.'); return; }
    setError('');
    setLoading(true);

    // Save email in HTTP-only cookie for server-side notification use
    await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => null);

    // Also store in localStorage for client-side display
    localStorage.setItem('notification_email', email);

    setLoading(false);
    // Direct redirect — no "check inbox" step
    router.push('/dashboard');
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #fafafa 50%, #fdf4ff 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '24px',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 40, height: 40, background: '#111827', borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path d="M8 14h12M8 9h12M8 19h7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontSize: 20, fontWeight: 900, color: '#111827', letterSpacing: '-0.03em' }}>Schedulo</span>
      </Link>

      {/* Card */}
      <div style={{
        background: 'white',
        borderRadius: 18,
        border: '1px solid #e5e7eb',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        width: '100%', maxWidth: 420,
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '28px 32px 0' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 6, letterSpacing: '-0.03em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
            Sign in to access your Schedulo dashboard
          </p>

          {/* Tabs */}
          <div style={{
            display: 'flex', gap: 4,
            background: '#f3f4f6', borderRadius: 10, padding: 4,
          }}>
            {([
              { key: 'admin' as Tab, label: '⚡ Admin', desc: 'Default account' },
              { key: 'custom' as Tab, label: '✉️ Custom', desc: 'Your email' },
            ]).map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setError(''); setEmail(''); }}
                style={{
                  flex: 1, padding: '8px 12px',
                  background: tab === t.key ? 'white' : 'transparent',
                  border: 'none', borderRadius: 7,
                  cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: tab === t.key ? '#111827' : '#6b7280' }}>
                  {t.label}
                </div>
                <div style={{ fontSize: 11, color: tab === t.key ? '#6b7280' : '#9ca3af', marginTop: 1 }}>
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 32px 28px' }}>
          {tab === 'admin' ? (
            /* ── Admin Tab ── */
            <div>
              <div style={{
                background: '#f9fafb', border: '1px solid #e5e7eb',
                borderRadius: 12, padding: '16px 18px', marginBottom: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: 16, flexShrink: 0,
                  }}>A</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Alex Johnson</div>
                    <div style={{ fontSize: 12, color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ADMIN_EMAIL}</div>
                  </div>
                  <div style={{
                    background: '#dcfce7', color: '#15803d',
                    fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, flexShrink: 0,
                  }}>Admin</div>
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
                  Full access to dashboard, event types, bookings, and settings. Booking notifications sent to <strong>{ADMIN_EMAIL}</strong>.
                </div>
              </div>

              <button
                onClick={handleAdminLogin}
                disabled={loading}
                style={{
                  width: '100%', padding: '12px',
                  background: loading ? '#9ca3af' : '#111827',
                  color: 'white', border: 'none', borderRadius: 10,
                  fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, transition: 'background 0.15s',
                }}
              >
                {loading ? (
                  <span style={{
                    width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', display: 'inline-block',
                  }} />
                ) : (
                  <>
                    Sign in as Admin
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* ── Custom Tab ── */
            <form onSubmit={handleCustomLogin}>
              <label style={{
                display: 'block', fontSize: 13, fontWeight: 600,
                color: '#374151', marginBottom: 4,
              }}>
                Email address
              </label>
              <p style={{ fontSize: 12, color: '#6b7280', marginBottom: 10, lineHeight: 1.5 }}>
                Enter your email to receive booking notifications. You'll be taken directly to the dashboard.
              </p>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                autoFocus
                style={{
                  width: '100%', padding: '10px 14px',
                  border: `1.5px solid ${error ? '#ef4444' : '#d1d5db'}`,
                  borderRadius: 9, fontSize: 14, fontFamily: 'inherit',
                  outline: 'none', color: '#111827',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => { if (!error) e.currentTarget.style.borderColor = '#6366f1'; }}
                onBlur={e => { if (!error) e.currentTarget.style.borderColor = '#d1d5db'; }}
              />
              {error && (
                <div style={{ marginTop: 6, fontSize: 12, color: '#ef4444' }}>{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '12px',
                  background: loading ? '#9ca3af' : '#6366f1',
                  color: 'white', border: 'none', borderRadius: 10,
                  fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, transition: 'background 0.15s',
                  marginTop: 14,
                }}
              >
                {loading ? (
                  <span style={{
                    width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', display: 'inline-block',
                  }} />
                ) : (
                  <>
                    Go to Dashboard
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <p style={{ marginTop: 20, fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
        New to Schedulo?{' '}
        <Link href="/dashboard" style={{ color: '#6366f1', fontWeight: 600, textDecoration: 'none' }}>
          Get started free →
        </Link>
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
