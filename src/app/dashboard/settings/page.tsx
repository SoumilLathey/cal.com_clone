'use client';

import { useState } from 'react';
import { showToast } from '@/components/Toast';
import Link from 'next/link';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'Admin',
    username: 'alex',
    email: 'admin@cal.com',
    bio: 'Software engineer and tech enthusiast. Book a meeting to chat!',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
  });

  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    showToast('Settings saved!', 'success');
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <button className="btn btn-primary" onClick={save}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="page-body" style={{ maxWidth: 720 }}>
        {/* Profile section */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header" style={{ paddingBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Profile</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                This is your public profile information visible to bookers
              </div>
            </div>
          </div>
          <div className="card-body">
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #f3f4f6' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: 24, flexShrink: 0,
              }}>A</div>
              <div>
                <h3 style={{ fontWeight: 600, marginBottom: 4, fontSize: 15 }}>Profile Photo</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                  Your photo is shown on your public booking page
                </p>
                <button className="btn btn-secondary btn-sm">Upload Photo</button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Username</label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                  <span style={{ padding: '8px 10px', background: 'var(--bg)', borderRight: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 13, whiteSpace: 'nowrap' }}>cal.com/</span>
                  <input
                    style={{ border: 'none', outline: 'none', background: 'transparent', color: 'inherit', padding: '8px 12px', flex: 1, fontSize: 13, fontFamily: 'inherit' }}
                    value={profile.username}
                    onChange={e => setProfile(p => ({ ...p, username: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" value={profile.email}
                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="form-textarea" value={profile.bio}
                onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                placeholder="Tell your bookers a bit about yourself..." />
              <div className="form-hint">This will appear on your public booking page</div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header" style={{ paddingBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Preferences</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Customize your scheduling experience</div>
            </div>
          </div>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Time Format</label>
                <select className="form-select" value={profile.timeFormat}
                  onChange={e => setProfile(p => ({ ...p, timeFormat: e.target.value }))}>
                  <option value="12h">12 hours (1:00 PM)</option>
                  <option value="24h">24 hours (13:00)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date Format</label>
                <select className="form-select" value={profile.dateFormat}
                  onChange={e => setProfile(p => ({ ...p, dateFormat: e.target.value }))}>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Timezone</label>
              <select className="form-select" value={profile.timezone}
                onChange={e => setProfile(p => ({ ...p, timezone: e.target.value }))}>
                {['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
                  'Europe/London', 'Europe/Paris', 'Asia/Kolkata', 'Asia/Tokyo', 'Australia/Sydney']
                  .map(tz => <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Booking link */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Your Booking Link</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Share this link so others can book time with you
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{
                flex: 1, padding: '9px 14px', background: 'var(--bg)',
                border: '1px solid var(--border)', borderRadius: 8,
                fontSize: 13, fontWeight: 500, color: 'var(--text-primary)',
              }}>
                {typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/alex
              </div>
              <Link href="/admin" target="_blank" className="btn btn-secondary">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2H2v12h12v-4M9 2h5v5M14 2l-7 7" />
                </svg>
                View Page
              </Link>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="card" style={{ border: '1px solid #fee2e2' }}>
          <div className="card-body">
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#ef4444' }}>Danger Zone</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              These actions are permanent and cannot be undone.
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn btn-secondary btn-sm" style={{ borderColor: '#fca5a5', color: '#ef4444' }}
                onClick={() => showToast('This is a demo — data reset not available', 'error')}>
                Reset all data
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="btn btn-secondary">Discard changes</button>
          <button className="btn btn-primary btn-lg" onClick={save}>
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
}
