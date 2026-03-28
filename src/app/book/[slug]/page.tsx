'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface EventType {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
  location: string;
  color: string;
  custom_questions: string; // JSON string of { id, label, type, required }[]
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatDateKey(d: Date) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }

function formatSlot(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatSelectedDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [event, setEvent] = useState<EventType | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [step, setStep] = useState<'calendar' | 'form'>('calendar');
  const [formData, setFormData] = useState({ name: '', email: '', notes: '' });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/public/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setEvent)
      .catch(() => setNotFound(true));
  }, [slug]);

  const fetchSlots = useCallback(async (date: Date) => {
    if (!event) return;
    setLoadingSlots(true);
    setSlots([]);
    const dateKey = formatDateKey(date);
    const res = await fetch(`/api/slots?slug=${slug}&date=${dateKey}`);
    const data = await res.json();
    setSlots(data.slots || []);
    setLoadingSlots(false);
  }, [event, slug]);

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  async function handleBook() {
    if (!event || !selectedDate || !selectedSlot) return;
    if (!formData.name.trim() || !formData.email.trim()) { setError('Name and email are required.'); return; }
    setError('');
    setSubmitting(true);

    const start = new Date(selectedSlot);
    const end = new Date(start.getTime() + event.duration * 60 * 1000);

    const questions: Array<{ id: string; label: string; type: string; required: boolean }> = [];
    try { questions.concat(JSON.parse(event.custom_questions || '[]')); } catch { /* empty */ }

    const answersArray = Object.entries(answers).map(([id, value]) => {
      const q = questions.find(q => q.id === id);
      return { id, label: q?.label ?? id, value };
    });

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type_id: event.id,
        booker_name: formData.name,
        booker_email: formData.email,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        notes: formData.notes,
        answers: answersArray,
      }),
    });

    if (res.ok) {
      const booking = await res.json();
      router.push(`/book/${slug}/confirm?uid=${booking.uid}&date=${formatDateKey(selectedDate)}&slot=${selectedSlot}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`);
    } else {
      const err = await res.json();
      setError(err.error || 'Failed to book. Please try again.');
    }
    setSubmitting(false);
  }

  // Calendar helpers
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  function prevMonth() {
    setCurrentDate(d => { const n = new Date(d); n.setMonth(n.getMonth() - 1); return n; });
  }
  function nextMonth() {
    setCurrentDate(d => { const n = new Date(d); n.setMonth(n.getMonth() + 1); return n; });
  }

  if (notFound) return (
    <div className="booking-layout">
      <nav className="public-nav">
        <Link href="/" className="public-nav-logo">Schedulo</Link>
      </nav>
      <div className="booking-shell" style={{ alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Page not found</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>This booking page doesn&apos;t exist or has been disabled.</p>
          <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );

  if (!event) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" style={{ width: 36, height: 36 }} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ 
        display: 'flex', 
        background: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: 12, 
        overflow: 'hidden', 
        width: '100%', 
        maxWidth: selectedDate && step === 'calendar' ? 1060 : 800,
        transition: 'max-width 0.3s ease',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* Col 1: Details */}
        <div style={{ width: 320, padding: 32, borderRight: '1px solid var(--border)', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
           <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
             S
           </div>
           <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Soumil Lathey</div>
           <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 16px 0', color: 'white' }}>{event.title}</h1>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
               {event.duration}m
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
               {event.location}
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 14, fontWeight: 600, marginTop: 12 }}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
               Asia/Kolkata
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: -4 }}><path d="M6 9l6 6 6-6"/></svg>
             </div>
           </div>
        </div>

        {/* Main Content Area */}
        {step === 'calendar' ? (
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Col 2: Calendar */}
            <div style={{ flex: 1, padding: 32, minWidth: 400 }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                 <div style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>{MONTH_NAMES[month]} {year}</div>
                 <div style={{ display: 'flex', gap: 16 }}>
                    <button onClick={prevMonth} disabled={new Date(year, month) <= new Date(today.getFullYear(), today.getMonth())} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button onClick={nextMonth} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                 </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 16 }}>
                 {DAY_NAMES_SHORT.map(d => (
                   <div key={d} style={{ fontSize: 11, fontWeight: 700, color: 'white', textAlign: 'center', letterSpacing: 0.5 }}>{d}</div>
                 ))}
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                 {cells.map((cell, i) => {
                   if (!cell) return <div key={i} />;
                   const isPast = cell < today;
                   const isSelected = selectedDate ? formatDateKey(cell) === formatDateKey(selectedDate) : false;
                   const isToday = formatDateKey(cell) === formatDateKey(today);
                   return (
                     <button
                       key={i}
                       style={{
                         aspectRatio: '1/1', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: isPast ? 'default' : 'pointer',
                         background: isSelected ? 'white' : (!isPast ? '#374151' : 'transparent'),
                         color: isSelected ? 'black' : (!isPast ? 'white' : 'var(--text-muted)'),
                         border: 'none', position: 'relative'
                       }}
                       disabled={isPast}
                       onClick={() => { setSelectedDate(cell); setSelectedSlot(null); }}
                     >
                       {cell.getDate()}
                       {isToday && !isSelected && <div style={{ position: 'absolute', bottom: 6, width: 4, height: 4, borderRadius: '50%', background: 'white' }} />}
                     </button>
                   );
                 })}
               </div>
            </div>

            {/* Col 3: Slots */}
            {selectedDate && (
              <div style={{ width: 280, borderLeft: '1px solid var(--border)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                   <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>
                     {selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                   </div>
                   <div style={{ display: 'flex', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', gap: 12 }}>
                     <span style={{ color: 'white', cursor: 'pointer' }}>12h</span> <span style={{ cursor: 'pointer' }}>24h</span>
                   </div>
                 </div>

                 {loadingSlots ? (
                    <div style={{ textAlign: 'center', padding: 24 }}><div className="spinner" style={{ width: 24, height: 24, margin: '0 auto' }} /></div>
                  ) : slots.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: 13 }}>No available slots.</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', flex: 1, paddingRight: 4 }}>
                      {slots.map(slot => (
                        <div key={slot} style={{ display: 'flex', gap: 8 }}>
                          <button
                            style={{
                              flex: 1, background: selectedSlot === slot ? '#374151' : 'transparent',
                              color: 'white',
                              border: `1px solid ${selectedSlot === slot ? 'var(--border)' : 'var(--border)'}`,
                              borderRadius: 6, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: '0.15s'
                            }}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                            {formatSlot(slot)}
                          </button>
                          {selectedSlot === slot && (
                            <button className="btn btn-primary" style={{ padding: '0 16px', background: 'white', color: 'black', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' }} onClick={() => setStep('form')}>Next</button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}
          </div>
        ) : (
          /* Col 2 Form */
          <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto', maxHeight: '80vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setStep('calendar')}
                style={{ padding: 6, color: 'var(--text-muted)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'white' }}>Enter Your Details</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Your Name *</label>
                <input
                  className="form-input"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'white', padding: '12px 16px' }}
                  value={formData.name}
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Smith"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Email Address * <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(enter your mail id to receive an actual mail at your mail id)</span></label>
                <input
                  type="email"
                  className="form-input"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'white', padding: '12px 16px' }}
                  value={formData.email}
                  onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Additional Notes</label>
                <textarea
                  className="form-textarea"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'white', padding: '12px 16px', minHeight: 100 }}
                  value={formData.notes}
                  onChange={e => setFormData(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Anything you'd like to share before the meeting..."
                />
              </div>

              {(() => {
                let questions: Array<{ id: string; label: string; type: string; required: boolean }> = [];
                try { questions = JSON.parse(event.custom_questions || '[]'); } catch { /* empty */ }
                return questions.map(q => (
                  <div className="form-group" key={q.id} style={{ margin: 0 }}>
                    <label className="form-label" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {q.label}{q.required ? ' *' : ''}
                    </label>
                    {q.type === 'textarea' ? (
                      <textarea
                        className="form-textarea"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'white', padding: '12px 16px' }}
                        value={answers[q.id] || ''}
                        onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                        placeholder="Your answer…"
                      />
                    ) : (
                      <input
                        className="form-input"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'white', padding: '12px 16px' }}
                        type={q.type === 'number' ? 'number' : 'text'}
                        value={answers[q.id] || ''}
                        onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                        placeholder="Your answer…"
                      />
                    )}
                  </div>
                ));
              })()}

              {error && (
                <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 8, color: '#fca5a5', fontSize: 14 }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                <button 
                  className="btn btn-primary btn-lg" 
                  style={{ background: 'white', color: 'black', flex: 1, border: 'none', fontWeight: 600 }} 
                  onClick={handleBook} 
                  disabled={submitting}
                >
                  {submitting ? <span className="spinner" style={{ width: 16, height: 16, borderColor: 'rgba(0,0,0,0.3)', borderTopColor: 'black', marginRight: 8 }} /> : null}
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 40, color: 'white', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', opacity: 0.9 }}>
        Cal.com
      </div>
    </div>
  );
}
