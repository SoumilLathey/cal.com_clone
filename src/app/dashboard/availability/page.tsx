'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/Toast';
import Link from 'next/link';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TIMEZONES = [
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Toronto', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Moscow',
  'Asia/Kolkata', 'Asia/Calcutta', 'Asia/Singapore', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney',
  'Pacific/Auckland',
];

const TIMES: string[] = [];
for (let h = 0; h < 24; h++) for (const m of [0, 30]) TIMES.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);

function formatTime12(t: string | null) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,'0')}${h < 12 ? 'am' : 'pm'}`;
}

interface AvailDay { id: number; day_of_week: number; is_enabled: number; start_time: string; end_time: string; }
interface Availability { id: number; name: string; timezone: string; days: AvailDay[]; }
interface DateOverride { id: number; date: string; is_blocked: number; start_time: string | null; end_time: string | null; reason: string | null; }

export default function AvailabilityPage() {
  const [avail, setAvail] = useState<Availability | null>(null);
  const [overrides, setOverrides] = useState<DateOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(false);

  // Date override form state
  const [showOverrideForm, setShowOverrideForm] = useState(false);
  const [overrideForm, setOverrideForm] = useState({
    date: '', is_blocked: true, start_time: '09:00', end_time: '17:00', reason: '',
  });

  useEffect(() => { fetchAll(); }, []);

  async function fetchAll() {
    setLoading(true);
    const [availRes, overridesRes] = await Promise.all([
      fetch('/api/availability'),
      fetch('/api/availability/overrides'),
    ]);
    if (availRes.ok) setAvail(await availRes.json());
    if (overridesRes.ok) setOverrides(await overridesRes.json());
    setLoading(false);
  }

  function toggleDay(dayIdx: number) {
    if (!avail) return;
    setAvail({ ...avail, days: avail.days.map(d => d.day_of_week === dayIdx ? { ...d, is_enabled: d.is_enabled ? 0 : 1 } : d) });
  }

  function updateTime(dayIdx: number, field: 'start_time' | 'end_time', value: string) {
    if (!avail) return;
    setAvail({ ...avail, days: avail.days.map(d => d.day_of_week === dayIdx ? { ...d, [field]: value } : d) });
  }

  async function save() {
    if (!avail) return;
    setSaving(true);
    const res = await fetch('/api/availability', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ timezone: avail.timezone, days: avail.days }) });
    showToast(res.ok ? 'Availability saved!' : 'Failed to save', res.ok ? 'success' : 'error');
    setSaving(false);
  }

  async function addOverride() {
    if (!overrideForm.date) { showToast('Please select a date', 'error'); return; }
    const res = await fetch('/api/availability/overrides', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(overrideForm),
    });
    if (res.ok) {
      showToast('Date override added!', 'success');
      setShowOverrideForm(false);
      setOverrideForm({ date: '', is_blocked: true, start_time: '09:00', end_time: '17:00', reason: '' });
      fetchAll();
    }
  }

  async function deleteOverride(id: number) {
    await fetch(`/api/availability/overrides?id=${id}`, { method: 'DELETE' });
    showToast('Override removed', 'success');
    fetchAll();
  }

  function getSummary(avail: Availability) {
    // simplified summary
    const enabled = avail.days.filter(d => d.is_enabled);
    if (enabled.length === 0) return 'No availability';
    if (enabled.length === 5 && !avail.days[0].is_enabled && !avail.days[6].is_enabled) {
      const s = formatTime12(avail.days[1].start_time).toUpperCase();
      const e = formatTime12(avail.days[1].end_time).toUpperCase();
      return `Mon - Fri, ${s} - ${e}`;
    }
    return `${enabled.length} days active`;
  }

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400 }}><div className="spinner" style={{ width: 32, height: 32 }} /></div>;
  if (!avail) return null;

  const today = new Date().toISOString().split('T')[0];

  if (editingSchedule) {
    return (
      <div style={{ paddingBottom: 60, color: 'var(--text-color, inherit)' }}>
        {/* Edit Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 32px 24px', maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <button onClick={() => setEditingSchedule(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: 4, display: 'flex' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
                Working hours 
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{getSummary(avail)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', cursor: 'pointer' }}>
              Set as default
              <div style={{ width: 36, height: 20, borderRadius: 20, background: 'var(--border)', position: 'relative', transition: '0.2s', border: '1px solid var(--border)' }}>
                 <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--text-muted)', position: 'absolute', top: 2, left: 3, transition: '0.2s' }} />
              </div>
            </label>
            <div style={{ width: 1, height: 24, background: 'var(--border)' }} />
            <button style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
            <button className="btn btn-primary" onClick={save} disabled={saving} style={{ padding: '6px 16px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontWeight: 500 }}>
              {saving ? <span className="spinner" /> : null}
              Save
            </button>
          </div>
        </div>

        {/* Edit Body */}
        <div style={{ padding: '0 32px 32px', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          
          <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Days Card */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: '24px 32px' }}>
               {avail.days.map((day, i) => (
                 <div key={day.day_of_week} style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
                    
                    <div style={{ width: 140, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => toggleDay(day.day_of_week)}>
                      
                      <div style={{ width: 36, height: 20, borderRadius: 20, background: day.is_enabled ? 'var(--text-primary)' : 'var(--bg)', border: day.is_enabled ? 'none' : '1px solid var(--border)', position: 'relative', transition: '0.2s' }}>
                         <div style={{ width: 14, height: 14, borderRadius: '50%', background: day.is_enabled ? 'var(--bg)' : 'var(--text-muted)', position: 'absolute', top: day.is_enabled ? 3 : 2, left: day.is_enabled ? 19 : 3, transition: '0.2s' }} />
                      </div>

                      <span style={{ fontSize: 13, fontWeight: 500, color: day.is_enabled ? 'var(--text-primary)' : 'var(--text-muted)' }}>{DAY_NAMES[day.day_of_week]}</span>
                    </div>

                    {day.is_enabled && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <select 
                          style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '8px 12px', fontSize: 13, cursor: 'pointer' }}
                          value={day.start_time} onChange={e => updateTime(day.day_of_week, 'start_time', e.target.value)}
                        >
                          {TIMES.map(t => <option key={'s'+t} value={t} style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>{formatTime12(t)}</option>)}
                        </select>
                        <span style={{ color: 'var(--text-muted)' }}>-</span>
                        <select 
                          style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '8px 12px', fontSize: 13, cursor: 'pointer' }}
                          value={day.end_time} onChange={e => updateTime(day.day_of_week, 'end_time', e.target.value)}
                        >
                          {TIMES.map(t => <option key={'e'+t} value={t} style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>{formatTime12(t)}</option>)}
                        </select>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: 16, display: 'flex' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                        </button>
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                      </div>
                    )}
                 </div>
               ))}
            </div>

            {/* Overrides Card */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', overflow: 'hidden' }}>
              <div style={{ padding: '24px 32px' }}>
                <div style={{ fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)' }}>
                  Date overrides 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, marginBottom: 16 }}>Add dates when your availability changes from your daily hours.</div>
                
                {overrides.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                    {overrides.map((ov, i) => (
                      <div key={ov.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                         <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                               {new Date(ov.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                               {ov.is_blocked ? 'Unavailable' : `${formatTime12(ov.start_time)} - ${formatTime12(ov.end_time)}`}
                               {ov.reason && ` · ${ov.reason}`}
                            </div>
                         </div>
                         <button onClick={() => deleteOverride(ov.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                         </button>
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={() => setShowOverrideForm(true)} style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', padding: '6px 12px', fontSize: 13, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                  Add an override
                </button>
              </div>
            </div>
          </div>

          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 24 }}>
             <div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text-primary)' }}>Timezone</div>
                <select 
                  style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '8px 12px', fontSize: 13, cursor: 'pointer' }}
                  value={avail.timezone} onChange={e => setAvail({ ...avail, timezone: e.target.value })}
                >
                  {TIMEZONES.map(tz => <option key={tz} value={tz} style={{ background: 'var(--bg)' }}>{tz.replace(/_/g, ' ')}</option>)}
                </select>
             </div>

             <div style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: '24px' }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, color: 'var(--text-primary)' }}>Something doesn't look right?</div>
                <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '6px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
                  Launch troubleshooter
                </button>
             </div>
          </div>
        </div>

        {/* Add Override Modal */}
        {showOverrideForm && (
          <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowOverrideForm(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div className="modal" style={{ maxWidth: 440, background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
              <div className="modal-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
                <h2 className="modal-title" style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Add Date Override</h2>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setShowOverrideForm(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Date *</label>
                  <input type="date" style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '8px 12px', fontSize: 14 }} min={today} value={overrideForm.date} onChange={e => setOverrideForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Override Type</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[{ val: true, label: '🚫 Block entire day' }, { val: false, label: '✏️ Custom hours' }].map(opt => (
                      <button
                        key={String(opt.val)}
                        onClick={() => setOverrideForm(f => ({ ...f, is_blocked: opt.val }))}
                        style={{
                          flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                          border: `1.5px solid ${overrideForm.is_blocked === opt.val ? 'var(--text-primary)' : 'var(--border)'}`,
                          background: overrideForm.is_blocked === opt.val ? 'var(--text-primary)' : 'transparent',
                          color: overrideForm.is_blocked === opt.val ? 'var(--bg)' : 'var(--text-primary)',
                          cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s'
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                {!overrideForm.is_blocked && (
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Custom Hours</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <select style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '8px 12px', fontSize: 14 }} value={overrideForm.start_time} onChange={e => setOverrideForm(f => ({ ...f, start_time: e.target.value }))}>
                        {TIMES.map(t => <option key={t} value={t} style={{ background: 'var(--bg)' }}>{formatTime12(t)}</option>)}
                      </select>
                      <span style={{ color: 'var(--text-muted)' }}>–</span>
                      <select style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '8px 12px', fontSize: 14 }} value={overrideForm.end_time} onChange={e => setOverrideForm(f => ({ ...f, end_time: e.target.value }))}>
                        {TIMES.map(t => <option key={t} value={t} style={{ background: 'var(--bg)' }}>{formatTime12(t)}</option>)}
                      </select>
                    </div>
                  </div>
                )}
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Reason (optional)</label>
                  <input style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: 6, padding: '8px 12px', fontSize: 14 }} placeholder="e.g. Public holiday, Vacation…" value={overrideForm.reason} onChange={e => setOverrideForm(f => ({ ...f, reason: e.target.value }))} />
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button style={{ background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-primary)', padding: '8px 16px', fontSize: 14, cursor: 'pointer', fontWeight: 500 }} onClick={() => setShowOverrideForm(false)}>Cancel</button>
                <button style={{ background: 'var(--text-primary)', border: 'none', borderRadius: 6, color: 'var(--bg)', padding: '8px 16px', fontSize: 14, cursor: 'pointer', fontWeight: 500 }} onClick={addOverride}>Add Override</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- List View (Default) --- //
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', color: 'var(--text-color, inherit)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '32px 32px 24px', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: 'inherit' }}>Availability</h1>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>Configure times when you are available for bookings.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
           <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', padding: 2, background: 'var(--bg)' }}>
              <button style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 12px', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>My availability</button>
              <button style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', padding: '4px 12px', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>Team availability</button>
           </div>
           <button style={{ padding: '6px 12px', background: 'var(--text-primary)', color: 'var(--bg)', border: 'none', borderRadius: 6, display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}><path d="M12 5v14M5 12h14"/></svg>
             New
           </button>
        </div>
      </div>

      <div style={{ padding: '0 32px' }}>
        <div 
          style={{ border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-card)', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
          onClick={() => setEditingSchedule(true)}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-muted)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
               <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>Working hours</div>
               <div style={{ background: 'var(--border)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Default</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{getSummary(avail)}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
               {avail.timezone}
            </div>
          </div>
          <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--text-muted)' }}>
           Temporarily out-of-office? <Link href="#" style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>Add a redirect</Link>
        </div>
      </div>
    </div>
  );
}
