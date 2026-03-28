'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Event Types', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4h12M2 8h12M2 12h8"/></svg> },
  { href: '/dashboard/bookings', label: 'Bookings', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="13" rx="1.5"/><path d="M5 1v2M11 1v2M2 6h12"/></svg> },
  { href: '/dashboard/availability', label: 'Availability', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg> },
];

const accountItems = [
  { href: '/dashboard/settings', label: 'Settings', icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.2 3.2l1.4 1.4M11.4 11.4l1.4 1.4M3.2 12.8l1.4-1.4M11.4 4.6l1.4-1.4"/></svg> },
  { href: '/alex', label: 'My Public Page', external: true, icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="6" r="3"/><path d="M2 13a6 6 0 0112 0"/></svg> },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [notifEmail, setNotifEmail] = useState('alex@schedulo.app');

  useEffect(() => {
    const e = localStorage.getItem('notification_email');
    if (e) setNotifEmail(e);
  }, []);

  function copyLink() {
    const url = `${window.location.origin}/alex`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const sidebarClass = `sidebar${isOpen ? ' open' : ''}`;

  return (
    <>
      {/* Overlay for mobile */}
      <div className={`sidebar-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />

      <aside className={sidebarClass}>
        <Link href="/" className="sidebar-logo">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#111827"/>
            <path d="M8 14h12M8 9h12M8 19h7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Schedulo</span>
        </Link>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                onClick={onClose}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="nav-section" style={{ marginTop: 16 }}>
            <div className="nav-section-title">Account</div>
            {accountItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                onClick={onClose}
              >
                {item.icon}
                {item.label}
                {item.external && (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginLeft: 'auto', width: 12, height: 12 }}>
                    <path d="M6 2H2v12h12v-4M9 2h5v5M14 2l-7 7"/>
                  </svg>
                )}
              </Link>
            ))}
          </div>


          {/* Share link box */}
          <div style={{ margin: '10px 4px 0', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your booking link
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 500, marginBottom: 8, wordBreak: 'break-all' }}>
              schedulo.app/<span style={{ color: '#6366f1' }}>alex</span>
            </div>
            <button
              onClick={copyLink}
              style={{
                width: '100%', padding: '6px 0',
                background: copied ? '#10b981' : 'white',
                border: '1px solid var(--border)', borderRadius: 6,
                fontSize: 11, fontWeight: 600,
                color: copied ? 'white' : '#374151',
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                fontFamily: 'inherit',
              }}
            >
              {copied ? '✓ Copied!' : (
                <><svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M2 11V2h9"/></svg>Copy link</>
              )}
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <Link href="/dashboard/settings" className="user-pill" style={{ textDecoration: 'none' }}>
            <div className="user-avatar">A</div>
            <div className="user-info">
              <div className="user-name">Alex Johnson</div>
              <div className="user-email" style={{ fontSize: 10 }}>{notifEmail}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M6 4l4 4-4 4"/></svg>
          </Link>
        </div>
      </aside>
    </>
  );
}
