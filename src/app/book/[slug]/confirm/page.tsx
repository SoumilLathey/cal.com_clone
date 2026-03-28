'use client';

import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function formatSlot(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function ConfirmContent() {
  const params = useSearchParams();
  const routeParams = useParams();
  const slug = routeParams.slug as string;
  const name = params.get('name') || '';
  const email = params.get('email') || '';
  const date = params.get('date') || '';
  const slot = params.get('slot') || '';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      
      <div style={{ 
        width: '100%', 
        maxWidth: 520, 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: 16, 
        padding: '48px 40px', 
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: 'white', letterSpacing: '-0.02em' }}>
          You're scheduled!
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.6 }}>
          A calendar invitation has been sent to <strong style={{ color: 'white' }}>{email}</strong>
        </p>

        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '24px 28px',
          textAlign: 'left',
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Date & Time */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ marginTop: 2 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 4 }}>Date & Time</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 2 }}>
                  {formatSlot(slot)}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                  {date ? formatDate(date) : ''}
                </div>
              </div>
            </div>

            {/* Attendee */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ marginTop: 2 }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 4 }}>Attendee</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 2 }}>{name}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{email}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href={`/book/${slug}`} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'white', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}>
            Book Another
          </Link>
          <Link href="/dashboard" style={{ background: 'white', border: 'none', color: 'black', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
        <div className="spinner" style={{ width: 36, height: 36 }} />
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  );
}
