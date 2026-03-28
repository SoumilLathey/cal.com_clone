'use client';

import { useState, useEffect } from 'react';
import { showToast } from '@/components/Toast';

interface EventType {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: number;
  location: string;
  color: string;
  is_active: number;
  booking_count: number;
  buffer_time: number;
  custom_questions: string;
}

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
];

const DURATIONS = [5, 10, 15, 20, 25, 30, 45, 60, 90, 120];

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function DashboardPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState<EventType | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: '', slug: '', description: '',
    duration: 30, location: 'Google Meet', color: '#6366f1',
    buffer_time: 0,
    custom_questions: [] as Array<{ id: string; label: string; type: string; required: boolean }>,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const res = await fetch('/api/event-types');
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  }

  function openCreate() {
    setEditEvent(null);
    setForm({ title: '', slug: '', description: '', duration: 30, location: 'Google Meet', color: '#6366f1', buffer_time: 0, custom_questions: [] });
    setShowModal(true);
  }

  function openEdit(ev: EventType) {
    setEditEvent(ev);
    let qs: Array<{ id: string; label: string; type: string; required: boolean }> = [];
    try { qs = JSON.parse(ev.custom_questions || '[]'); } catch { /* empty */ }
    setForm({ title: ev.title, slug: ev.slug, description: ev.description, duration: ev.duration, location: ev.location, color: ev.color, buffer_time: ev.buffer_time ?? 0, custom_questions: qs });
    setShowModal(true);
  }

  function handleTitleChange(val: string) {
    setForm(f => ({
      ...f,
      title: val,
      slug: editEvent ? f.slug : slugify(val),
    }));
  }

  async function handleSave() {
    if (!form.title || !form.slug) return;
    setSaving(true);
    const method = editEvent ? 'PUT' : 'POST';
    const url = editEvent ? `/api/event-types/${editEvent.id}` : '/api/event-types';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      showToast(editEvent ? 'Event type updated!' : 'Event type created!', 'success');
      setShowModal(false);
      fetchEvents();
    } else {
      const err = await res.json();
      showToast(err.error || 'Something went wrong', 'error');
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/event-types/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Event type deleted', 'success');
      setDeleteConfirm(null);
      fetchEvents();
    }
  }

  async function toggleActive(ev: EventType) {
    let qs: Array<{ id: string; label: string; type: string; required: boolean }> = [];
    try { qs = JSON.parse(ev.custom_questions || '[]'); } catch { /* empty */ }
    await fetch(`/api/event-types/${ev.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...ev, is_active: ev.is_active ? 0 : 1, buffer_time: ev.buffer_time ?? 0, custom_questions: qs }),
    });
    fetchEvents();
  }

  function addQuestion() {
    const id = Date.now().toString();
    setForm(f => ({ ...f, custom_questions: [...f.custom_questions, { id, label: '', type: 'text', required: false }] }));
  }

  function updateQuestion(id: string, field: string, value: string | boolean) {
    setForm(f => ({ ...f, custom_questions: f.custom_questions.map(q => q.id === id ? { ...q, [field]: value } : q) }));
  }

  function removeQuestion(id: string) {
    setForm(f => ({ ...f, custom_questions: f.custom_questions.filter(q => q.id !== id) }));
  }

  function copyLink(slug: string) {
    const url = `${window.location.origin}/book/${slug}`;
    navigator.clipboard.writeText(url);
    showToast('Link copied to clipboard!', 'success');
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div style={{ color: 'var(--text-color, inherit)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px', padding: '32px 32px 0 32px', maxWidth: 1200 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', color: 'inherit' }}>Event types</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '4px 0 0 0' }}>Configure different events for people to book on your calendar.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
             <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
               <svg style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
               <input placeholder="Search" style={{ background: 'transparent', border: '1px solid #374151', borderRadius: '6px', padding: '8px 12px 8px 32px', color: 'inherit', fontSize: '14px', width: '220px', outline: 'none' }} />
             </div>
             <button onClick={openCreate} style={{ padding: '8px 16px', display: 'flex', gap: '6px', alignItems: 'center', background: 'transparent', color: 'white', borderRadius: '6px', border: '1px solid white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
               New
             </button>
          </div>
        </div>
      </div>

      <div className="page-body">
        {/* No stats in new layout */}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <div className="spinner" style={{ width: 32, height: 32, margin: '0 auto' }} />
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">⚡</div>
            <div className="empty-state-title">No event types yet</div>
            <div className="empty-state-desc">Create your first event type to start accepting bookings</div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={openCreate}>
              Create Event Type
            </button>
          </div>
        ) : (
          <div style={{ border: '1px solid #374151', borderRadius: '8px', overflow: 'hidden' }}>
            {events.map((ev, i) => (
              <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: i === events.length - 1 ? 'none' : '1px solid #374151', background: 'transparent' }}>
                {/* Left Side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'inherit' }}>{ev.title}</div>
                      <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>/{ev.slug}</div>
                   </div>
                   <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1f2937', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', color: '#d1d5db', width: 'fit-content' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {ev.duration}m
                   </div>
                </div>
                {/* Right Side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {!ev.is_active && <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Hidden</span>}
                      {/* Custom inline toggle Switch */}
                      <label style={{ margin: 0, cursor: 'pointer', display: 'flex' }}>
                        <input type="checkbox" checked={!!ev.is_active} onChange={() => toggleActive(ev)} style={{ display: 'none' }} />
                        <span style={{ 
                          display: 'inline-block', width: '40px', height: '22px', 
                          background: ev.is_active ? 'var(--text-color, white)' : '#374151', 
                          borderRadius: '11px', position: 'relative', transition: '0.2s',
                          border: '1px solid #4b5563'
                        }}>
                          <span style={{ 
                            position: 'absolute', top: '2px', left: ev.is_active ? '20px' : '2px', 
                            width: '16px', height: '16px', borderRadius: '50%', background: ev.is_active ? 'var(--bg-color, black)' : '#9ca3af', 
                            transition: '0.2s' 
                          }} />
                        </span>
                      </label>
                   </div>

                   <div style={{ display: 'flex', gap: '4px' }}>
                     <a href={`${baseUrl}/book/${ev.slug}`} target="_blank" rel="noreferrer" title="Preview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', border: '1px solid #374151', borderRadius: '6px', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'none', background: 'transparent' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                     </a>
                     <button onClick={() => copyLink(ev.slug)} title="Copy link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', border: '1px solid #374151', borderRadius: '6px', cursor: 'pointer', background: 'transparent', color: 'var(--text-muted)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                     </button>
                     <button onClick={() => openEdit(ev)} title="Edit / More actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', border: '1px solid #374151', borderRadius: '6px', cursor: 'pointer', background: 'transparent', color: 'var(--text-muted)' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                     </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{editEvent ? 'Edit Event Type' : 'New Event Type'}</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l12 12M14 2L2 14"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  className="form-input"
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="e.g. 30 Minute Meeting"
                />
              </div>
              <div className="form-group">
                <label className="form-label">URL Slug *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                  <span style={{ padding: '8px 10px', background: 'var(--bg)', borderRight: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 13, whiteSpace: 'nowrap' }}>
                    schedulo.app/
                  </span>
                  <input
                    style={{ border: 'none', outline: 'none', background: 'transparent', color: 'inherit', padding: '8px 12px', flex: 1, fontSize: 13, fontFamily: 'inherit' }}
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                    placeholder="30min"
                  />
                </div>
                <div className="form-hint">Unique URL for your booking page</div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Tell your invitees what this meeting is about"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <select
                    className="form-select"
                    value={form.duration}
                    onChange={e => setForm(f => ({ ...f, duration: parseInt(e.target.value) }))}
                  >
                    {DURATIONS.map(d => (
                      <option key={d} value={d}>{d < 60 ? `${d} min` : `${d / 60} hr`}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <select
                    className="form-select"
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  >
                    <option>Google Meet</option>
                    <option>Zoom</option>
                    <option>Microsoft Teams</option>
                    <option>Phone Call</option>
                    <option>In Person</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Color</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer', outline: form.color === c ? `3px solid ${c}` : '3px solid transparent', outlineOffset: 2, transition: 'all 0.15s' }} />
                  ))}
                </div>
              </div>

              {/* Buffer Time */}
              <div className="form-group">
                <label className="form-label">Buffer Time After Meeting</label>
                <div className="form-hint" style={{ marginBottom: 6 }}>Adds a gap after each booking so back-to-back meetings aren&apos;t possible</div>
                <select className="form-select" value={form.buffer_time} onChange={e => setForm(f => ({ ...f, buffer_time: parseInt(e.target.value) }))}>
                  <option value={0}>No buffer</option>
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>

              {/* Custom Questions */}
              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div className="form-label" style={{ marginBottom: 0 }}>Custom Questions</div>
                    <div className="form-hint">Ask bookers additional questions</div>
                  </div>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={addQuestion}>+ Add Question</button>
                </div>
                {form.custom_questions.length === 0 ? (
                  <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                    No custom questions yet
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {form.custom_questions.map((q, i) => (
                      <div key={q.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, minWidth: 16 }}>Q{i+1}</span>
                          <input
                            className="form-input" style={{ flex: 1 }}
                            placeholder="Question label (e.g. What would you like to discuss?)" 
                            value={q.label}
                            onChange={e => updateQuestion(q.id, 'label', e.target.value)}
                          />
                          <button type="button" className="btn btn-ghost btn-sm" style={{ color: '#ef4444', padding: '4px 6px' }} onClick={() => removeQuestion(q.id)}>
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l12 12M14 2L2 14"/></svg>
                          </button>
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingLeft: 22 }}>
                          <select className="form-select" style={{ flex: 1 }} value={q.type} onChange={e => updateQuestion(q.id, 'type', e.target.value)}>
                            <option value="text">Short text</option>
                            <option value="textarea">Long text</option>
                            <option value="number">Number</option>
                          </select>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                            <input type="checkbox" checked={q.required} onChange={e => updateQuestion(q.id, 'required', e.target.checked)} />
                            Required
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? <span className="spinner" /> : null}
                {editEvent ? 'Save Changes' : 'Create Event Type'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm !== null && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Event Type</h2>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                Are you sure you want to delete this event type? All associated bookings will also be deleted. This cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
