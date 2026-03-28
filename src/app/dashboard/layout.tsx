'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ToastContainer from '@/components/Toast';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Mobile top bar */}
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
        <Link href="/" style={{ fontWeight: 900, fontSize: 17, color: '#111827', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#111827"/>
            <path d="M8 14h12M8 9h12M8 19h7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Schedulo
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
