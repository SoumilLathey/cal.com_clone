'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES_SHORT = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
function pad(n: number) { return String(n).padStart(2,'0'); }
function formatDateKey(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function formatSlot(iso: string) { return new Date(iso).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true}); }
function formatSelectedDate(d: Date) { return d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}); }

interface Booking {
  uid: string; booker_name: string; booker_email: string;
  start_time: string; event_title: string; duration: number; location: string;
  event_type_id: number;
}

export default function ReschedulePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params.slug as string;
  const bookingUid = searchParams.get('uid') || '';

  const [booking, setBooking] = useState<Booking | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [currentDate, setCurrentDate] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingUid) { setNotFound(true); return; }
    fetch('/api/bookings')
      .then(r => r.json())
      .then((bookings: Booking[]) => {
        const b = bookings.find(b => b.uid === bookingUid);
        if (!b) { setNotFound(true); return; }
        setBooking(b);
      }).catch(() => setNotFound(true));
  }, [bookingUid]);

  const fetchSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true); setSlots([]);
    const dateKey = formatDateKey(date);
    const res = await fetch(`/api/slots?slug=${slug}&date=${dateKey}`);
    const data = await res.json();
    setSlots(data.slots || []);
    setLoadingSlots(false);
  }, [slug]);

  useEffect(() => { if (selectedDate) fetchSlots(selectedDate); }, [selectedDate, fetchSlots]);

  async function handleReschedule() {
    if (!booking || !selectedDate || !selectedSlot) return;
    setSubmitting(true); setError('');
    const start = new Date(selectedSlot);
    const end = new Date(start.getTime() + booking.duration * 60000);
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type_id: booking.event_type_id,
        booker_name: booking.booker_name,
        booker_email: booking.booker_email,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        rescheduled_from: bookingUid,
      }),
    });
    if (res.ok) {
      const newBooking = await res.json();
      router.push(`/book/${slug}/confirm?uid=${newBooking.uid}&date=${formatDateKey(selectedDate)}&slot=${selectedSlot}&name=${encodeURIComponent(booking.booker_name)}&email=${encodeURIComponent(booking.booker_email)}&rescheduled=1`);
    } else {
      const err = await res.json();
      setError(err.error || 'Failed to reschedule.');
    }
    setSubmitting(false);
  }

  const today = new Date(); today.setHours(0,0,0,0);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  if (notFound) return (
    <div className="booking-layout">
      <nav className="public-nav"><Link href="/" className="public-nav-logo">Schedulo</Link></nav>
      <div className="booking-shell" style={{ alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Booking not found</h2>
          <p style={{ color: '#6b7280', fontSize: 14 }}>This booking link is invalid or has already been rescheduled.</p>
          <Link href="/dashboard/bookings" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>View Bookings</Link>
        </div>
      </div>
    </div>
  );

  if (!booking) return (
    <div className="booking-layout">
      <nav className="public-nav"><Link href="/" className="public-nav-logo">Schedulo</Link></nav>
      <div className="booking-shell"><div style={{ textAlign: 'center', padding: 80 }}><div className="spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div></div>
    </div>
  );

  return (
    <div className="booking-layout">
      <nav className="public-nav">
        <Link href="/" className="public-nav-logo">Schedulo</Link>
        <div style={{ fontSize: 13, color: '#6b7280' }}>Rescheduling</div>
      </nav>
      <div className="booking-shell">
        <div className="booking-card">
          <div className="booking-info-panel">
            <div className="booking-host-avatar">A</div>
            <div className="booking-host-name">Admin</div>
            <h1 className="booking-event-name">{booking.event_title}</h1>
            <div className="booking-detail-item">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
              {booking.duration} minutes
            </div>
            <div className="booking-detail-item">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1.5a4 4 0 100 8 4 4 0 000-8zM3.5 8A7.5 7.5 0 0114.5 12"/></svg>
              {booking.location}
            </div>
            <div style={{ marginTop: 16, padding: '12px 14px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 8, fontSize: 12, color: '#92400e' }}>
              ⚠️ <strong>Current booking:</strong><br/>
              {new Date(booking.start_time).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})} at {formatSlot(booking.start_time)}<br/>
              Will be cancelled when you confirm new time.
            </div>
          </div>
          <div className="booking-main-panel">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Choose a New Time</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>For {booking.booker_name} ({booking.booker_email})</p>

            <div className="cal-nav">
              <button className="btn btn-ghost btn-sm" onClick={() => setCurrentDate(d => { const n = new Date(d); n.setMonth(n.getMonth()-1); return n; })} disabled={new Date(year,month) <= new Date(today.getFullYear(),today.getMonth())}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 3L6 8l4 5"/></svg>
              </button>
              <span className="cal-nav-title">{MONTH_NAMES[month]} {year}</span>
              <button className="btn btn-ghost btn-sm" onClick={() => setCurrentDate(d => { const n = new Date(d); n.setMonth(n.getMonth()+1); return n; })}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3l4 5-4 5"/></svg>
              </button>
            </div>

            <div className="cal-grid" style={{ marginBottom: 24 }}>
              {DAY_NAMES_SHORT.map(d => <div key={d} className="cal-header-cell">{d}</div>)}
              {cells.map((cell, i) => {
                if (!cell) return <div key={i} />;
                const isPast = cell < today;
                const isSelected = selectedDate ? formatDateKey(cell) === formatDateKey(selectedDate) : false;
                const isToday = formatDateKey(cell) === formatDateKey(today);
                return (
                  <div key={i} className={`cal-day ${isPast ? 'cal-day-disabled' : ''} ${isSelected ? 'cal-day-selected' : ''} ${isToday && !isSelected ? 'cal-day-today' : ''}`}
                    onClick={() => { if (!isPast) { setSelectedDate(cell); setSelectedSlot(null); } }}>
                    {cell.getDate()}
                  </div>
                );
              })}
            </div>

            {selectedDate && (
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#374151' }}>{formatSelectedDate(selectedDate)}</h3>
                {loadingSlots ? (
                  <div style={{ textAlign: 'center', padding: 24 }}><div className="spinner" style={{ width: 24, height: 24, margin: '0 auto' }} /></div>
                ) : slots.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 24, color: '#9ca3af', fontSize: 13 }}>No available slots for this day.</div>
                ) : (
                  <div className="slot-grid">
                    {slots.map(slot => (
                      <button key={slot} className={`slot ${selectedSlot === slot ? 'selected' : ''}`} onClick={() => setSelectedSlot(slot)}>
                        {formatSlot(slot)}
                      </button>
                    ))}
                  </div>
                )}
                {selectedSlot && (
                  <div style={{ marginTop: 20 }}>
                    {error && <div style={{ padding: '10px 14px', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, color: '#991b1b', fontSize: 13, marginBottom: 12 }}>{error}</div>}
                    <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleReschedule} disabled={submitting}>
                      {submitting ? <span className="spinner" style={{ width: 16, height: 16, borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} /> : null}
                      Confirm Reschedule to {formatSlot(selectedSlot)}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
