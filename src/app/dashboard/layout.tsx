'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ToastContainer from '@/components/Toast';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout" style={{ minWidth: 0, overflowX: 'hidden' }}>
      {/* Mobile top bar */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu" style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}>
          <span style={{ width: 18, height: 2, background: 'var(--text-primary)', borderRadius: 2 }} />
          <span style={{ width: 18, height: 2, background: 'var(--text-primary)', borderRadius: 2 }} />
          <span style={{ width: 18, height: 2, background: 'var(--text-primary)', borderRadius: 2 }} />
        </button>
        <Link href="/" style={{ fontWeight: 900, fontSize: 17, color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="var(--text-primary)" />
            <path d="M8 14h12M8 9h12M8 19h7" stroke="var(--bg-card)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Cal.com
        </Link>
        <div style={{ width: 32 }} />
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}
