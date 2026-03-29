'use client';

import { useState, useEffect, useRef } from 'react';
import { showToast } from '@/components/Toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Booking {
  id: number; booker_name: string; booker_email: string;
  start_time: string; end_time: string; status: string;
  event_title: string; duration: number; color: string;
  location: string; uid: string; notes?: string;
  event_type_id: number; answers?: string;
  event_slug?: string;
}

const TABS = ['upcoming', 'past', 'canceled'] as const;
type Tab = typeof TABS[number];

function formatDate(iso: string) {
  const d = new Date(iso);
  const formatter = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const parts = formatter.formatToParts(d);
  const day = parts.find(p => p.type === 'day')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const weekday = parts.find(p => p.type === 'weekday')?.value;
  return `${weekday}, ${day} ${month}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase().replace(' ', '');
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slugMap, setSlugMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('upcoming');
  const [cancelId, setCancelId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => { fetchBookings(); }, []);

  async function fetchBookings() {
    setLoading(true);
    const [bookingsRes, etRes] = await Promise.all([
      fetch('/api/bookings'),
      fetch('/api/event-types'),
    ]);
    if (bookingsRes.ok && etRes.ok) {
      const bookingsData = await bookingsRes.json();
      const etData: Array<{ id: number; slug: string }> = await etRes.json();
      const map: Record<number, string> = {};
      for (const et of etData) map[et.id] = et.slug;
      setSlugMap(map);
      setBookings(bookingsData);
    }
    setLoading(false);
  }

  async function cancelBooking(id: number) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'cancelled' }),
    });
    if (res.ok) {
      showToast('Booking cancelled', 'success');
      setCancelId(null);
      setExpandedId(null);
      fetchBookings();
    }
  }

  const now = new Date();
  const filtered = bookings.filter(b => {
    if (tab === 'upcoming') {
      return b.status === 'upcoming' && new Date(b.start_time) >= now;
    }
    if (tab === 'past') return b.status === 'past' || (b.status === 'upcoming' && new Date(b.start_time) < now);
    return b.status === 'cancelled';
  });

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', color: 'var(--text-color, inherit)' }}>
      <div className="app-heading">
        <div className="app-heading-inner">
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: 'inherit' }}>Bookings</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>See upcoming and past events booked through your event type links.</p>
          </div>
        </div>

        {/* Filters Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    background: tab === t ? 'var(--text-primary)' : 'transparent',
                    color: tab === t ? 'var(--bg)' : 'var(--text-muted)',
                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                    padding: '6px 12px', fontSize: '14px', fontWeight: 500,
                    transition: 'all 0.15s'
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-body" style={{ paddingTop: 0 }}>
        <div style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg-card)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>
             NEXT
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
               No {tab} bookings found.
            </div>
          ) : (
            <div>
              {filtered.map(b => (
                <div key={b.id}>
                  <div style={{ padding: '20px', display: 'flex', borderBottom: '1px solid var(--border)', cursor: 'pointer', position: 'relative' }} onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}>
                    
                    {/* Left Column */}
                    <div style={{ width: 220, flexShrink: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{formatDate(b.start_time)}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{formatTime(b.start_time)} - {formatTime(b.end_time)}</div>
                      {b.location && (b.location.toLowerCase().includes('video') || b.location.toLowerCase().includes('meet') || b.location.toLowerCase().includes('zoom')) ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#3b82f6', fontSize: 13, fontWeight: 500 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg> 
                          Join Cal Video
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#3b82f6', fontSize: 13, fontWeight: 500 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg> 
                          {b.location || 'No location'}
                        </div>
                      )}
                    </div>

                    {/* Middle Column */}
                    <div style={{ flex: 1, minWidth: 0, paddingRight: 20 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                        {b.event_title} between {b.booker_name} and You
                      </div>
                      {b.notes && (
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                          "{b.notes}"
                        </div>
                      )}
                      <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>
                        You and {b.booker_name}
                      </div>
                    </div>

                    {/* Right Column / Dots menu */}
                    <div style={{ flexShrink: 0 }}>
                      <button onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === b.id ? null : b.id); }} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                      </button>
                    </div>

                  </div>
                  
                  {/* Expanded Context Actions */}
                  {expandedId === b.id && (
                    <div style={{ padding: '16px 20px', background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12 }}>
                       <Link 
                         href={`/book/${slugMap[b.event_type_id] || b.event_type_id}/reschedule?uid=${b.uid}`}
                         className="btn btn-secondary btn-sm"
                         style={{ fontSize: 13, fontWeight: 500, border: '1px solid var(--border)' }}
                       >
                         Reschedule
                       </Link>
                       {b.status !== 'cancelled' && (
                         <button 
                           onClick={() => setCancelId(b.id)} 
                           className="btn btn-ghost btn-sm"
                           style={{ color: '#ef4444', fontSize: 13, fontWeight: 500 }}
                         >
                           Cancel
                         </button>
                       )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer Pagination */}
          <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <select style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '4px 20px 4px 10px', fontSize: 13, cursor: 'pointer' }}>
                  <option value="10" style={{ background: '#111827', color: 'white' }}>10</option>
                  <option value="20" style={{ background: '#111827', color: 'white' }}>20</option>
                  <option value="50" style={{ background: '#111827', color: 'white' }}>50</option>
                </select>
                rows per page
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                1-{filtered.length} of {filtered.length}
                <div style={{ display: 'flex', gap: 4 }}>
                   <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'not-allowed', opacity: 0.5 }}>
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                   </button>
                   <button style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'not-allowed', opacity: 0.5 }}>
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>

      {cancelId !== null && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setCancelId(null)}>
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-header"><h2 className="modal-title">Cancel Booking</h2></div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                Are you sure you want to cancel this booking?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setCancelId(null)}>No, keep</button>
              <button className="btn btn-danger" onClick={() => cancelBooking(cancelId)}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
