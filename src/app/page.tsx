import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import HomeMockup from '@/components/HomeMockup';
import LogoSlider from '@/components/LogoSlider';
import TestimonialSlider from '@/components/TestimonialSlider';

export const metadata: Metadata = {
  title: 'Cal.com - The scheduling infrastructure for everyone',
  description: 'A pixel-perfect replica of the Cal.com homepage.',
};
export default function LandingPage() {
  return (
    <>
      <style>{`
        .root-container {
          /* removed zoom to fix mobile viewport */
        }
        @media (max-width: 1024px) {
          .mobile-stack { flex-direction: column !important; gap: 32px !important; }
          .mobile-hide { display: none !important; }
          .mobile-padding { padding: 32px 20px !important; }
          .mobile-center { text-align: center !important; align-items: center !important; margin-left: auto !important; margin-right: auto !important; }
          .mobile-full-width { width: 100% !important; max-width: 100% !important; }
          .mobile-grid-1 { grid-template-columns: 1fr !important; }
          .mobile-grid-2 { grid-template-columns: 1fr 1fr !important; }
          .feature-icons { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .logo-slider-container { flex-direction: column !important; gap: 24px !important; text-align: center !important; }
        }
        @media (min-width: 1025px) {
          .root-container { zoom: 0.95; }
        }
        @keyframes orbit-outer {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(115px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(115px) rotate(-360deg); }
        }
        @keyframes orbit-mid {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes orbit-inner {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(45px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(45px) rotate(-360deg); }
        }
        @keyframes toggle-track {
          0%, 10%, 90%, 100% { background: #d1d5db; }
          30%, 70% { background: #111827; }
        }
        @keyframes thumb-slide-right {
          0%, 10%, 90%, 100% { transform: translateX(0); }
          30%, 70% { transform: translateX(18px); }
        }
        @keyframes thumb-slide-left {
          0%, 10%, 90%, 100% { transform: translateX(18px); }
          30%, 70% { transform: translateX(0); }
        }
        @keyframes pulse-red {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes active-speaker {
          0%, 100% { border-color: #f3f4f6; }
          50% { border-color: #f3f4f6; }
        }
        @keyframes fade-bg {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes fade-overlay {
          0%, 20%, 80%, 100% { opacity: 1; }
          40%, 60% { opacity: 0; }
        }
        @keyframes fade-text {
          0%, 45% { opacity: 1; }
          50%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-text-alt {
          0%, 45% { opacity: 0; }
          50%, 95% { opacity: 1; }
          100% { opacity: 0; }
        }
        .feature-card .detail-state { opacity: 0; transition: opacity 0.2s ease; visibility: hidden; }
        .feature-card:hover .detail-state { opacity: 1; visibility: visible; }
        .feature-card .icon-state { opacity: 1; transition: opacity 0.2s ease; }
        .feature-card:hover .icon-state { opacity: 0; visibility: hidden; }
        @keyframes slide-right-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes slide-left-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div className="root-container" style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: '#f3f4f6', color: '#111827', minHeight: '100vh', padding: '16px 0', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* GLOBAL GRID LINES */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
          <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%', height: '100%', position: 'relative' }}>
            {/* Vertical Left Line */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', borderLeft: '1px solid #e5e7eb' }}></div>
            {/* Vertical Right Line */}
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '1px', borderLeft: '1px solid #e5e7eb' }}></div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: '0 16px' }}>

          {/* NAV FLOATING CARD */}
          <nav style={{
            maxWidth: '1140px', margin: '0 auto 16px', width: '100%',
            background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px',
            padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: '14px', fontWeight: 500, color: '#4b5563',
            boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, fontSize: '20px', color: '#111827', letterSpacing: '-0.04em' }}>
                Cal.com
              </div>
            </div>
            <div>
              <Link href="/dashboard" style={{
                padding: '8px 16px', background: '#111827', color: 'white',
                borderRadius: '8px', textDecoration: 'none', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', letterSpacing: '-0.01em'
              }}>
                Go to app
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
              </Link>
            </div>
          </nav>

          {/* HERO FLOATING CARD */}
          <div style={{
            maxWidth: '1140px', margin: '0 auto', width: '100%',
            background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px',
            overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div className="mobile-stack mobile-padding" style={{ padding: '64px 48px 100px', display: 'flex', gap: '48px' }}>

              {/* LEFT COLUMN */}
              <div style={{ flex: '1.2' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f9fafb', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
                  Cal.com launches v6.3 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
                </div>

                <h1 className="hero-text mobile-center" style={{ fontSize: '64px', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 20px', color: '#1f2937' }}>
                  The better way to<br />
                  schedule your<br />
                  meetings
                </h1>

                <p className="mobile-center" style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px', maxWidth: '420px', fontWeight: 400, letterSpacing: '-0.01em' }}>
                  A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.
                </p>

                <div style={{ maxWidth: '400px' }}>
                  <Link href="/login" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: '#111827', color: 'white', padding: '12px', borderRadius: '8px',
                    fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '10px'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                    Sign up with Google
                  </Link>
                  <Link href="/login" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'linear-gradient(to bottom, #ffffff, #f9fafb)', color: '#4b5563', padding: '12px', borderRadius: '8px',
                    fontSize: '14px', fontWeight: 600, textDecoration: 'none', border: '1px solid #e5e7eb'
                  }}>
                    Sign up with email
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ opacity: 0.6 }}><path d="M9 18l6-6-6-6" /></svg>
                  </Link>

                  <div style={{ marginTop: '16px', fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>
                    No credit card required
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>

                {/* Mockup Widget */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflowX: 'auto', WebkitOverflowScrolling: 'touch', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
                  <div style={{ minWidth: '600px' }}>
                    <HomeMockup />
                  </div>
                </div>

                {/* Stars Section aligned to mockup */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>

                  {/* Trustpilot */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '20px', height: '20px', background: '#00b67a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '1px', fontSize: '12px' }}>★</div>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800, color: '#111827' }}>
                      <span style={{ color: '#00b67a', fontSize: '14px' }}>★</span> Trustpilot
                    </div>
                  </div>

                  {/* Product Hunt */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#da552f', fontSize: '18px', letterSpacing: '1px' }}>
                      ★★★★★
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#da552f' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#da552f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>P</div>
                    </div>
                  </div>

                  {/* G2 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#ff492c', fontSize: '18px', letterSpacing: '1px' }}>
                      ★★★★★
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#ff492c' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ff492c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>G</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* HERO SECTION GRID DIVIDER */}
          <div style={{ position: 'relative', height: '1px', background: '#e5e7eb', marginTop: '120px' }}>
            <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', height: '100%' }}>
              <div style={{ position: 'absolute', top: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              <div style={{ position: 'absolute', top: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>

            {/* Full-width Horizontal Grid Boundaries */}
            <div style={{ position: 'relative', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>

              {/* Faint Vertical Lines + Crosshairs Container */}
              <div style={{ position: 'absolute', inset: 0, margin: '0 auto', maxWidth: '1140px', pointerEvents: 'none' }}>
                {/* Left Vertical Line */}
                <div style={{ position: 'absolute', top: '-100vh', bottom: '-100vh', left: '0', borderLeft: '1px solid #e5e7eb' }}></div>
                {/* Right Vertical Line */}
                <div style={{ position: 'absolute', top: '-100vh', bottom: '-100vh', right: '0', borderRight: '1px solid #e5e7eb' }}></div>

                {/* the 4 Crosshairs exactly on intersections */}
                <div style={{ position: 'absolute', top: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
                <div style={{ position: 'absolute', top: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
                <div style={{ position: 'absolute', bottom: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
                <div style={{ position: 'absolute', bottom: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              </div>

              {/* Banner Content */}
              <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '48px', padding: '12px 24px', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500, lineHeight: 1.4, width: '160px', flexShrink: 0, background: '#f3f4f6', zIndex: 3, position: 'relative', paddingRight: '12px' }}>
                  Trusted by fast-growing<br />
                  companies around the world
                </div>

                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  <LogoSlider />
                </div>
              </div>
            </div>

            {/* How it works section */}
            <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px',
                padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#6b7280',
                marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                How it works
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1f2937', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                With us, appointment scheduling is easy
              </h2>
              <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '440px', lineHeight: 1.5, marginBottom: '32px', fontWeight: 500 }}>
                Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '80px' }}>
                <Link href="/login" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', color: 'white',
                  padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none'
                }}>
                  Get started <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
                </Link>
                <Link href="/login" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#374151',
                  padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                  border: '1px solid #e5e7eb'
                }}>
                  Book a demo <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ opacity: 0.5 }}><path d="M9 18l6-6-6-6" /></svg>
                </Link>
              </div>
            </div>

            {/* GRID DIVIDER */}
            <div style={{ position: 'relative', height: '1px', background: '#e5e7eb', marginTop: '120px' }}>
              <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', height: '100%' }}>
                <div style={{ position: 'absolute', top: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              </div>
            </div>

            {/* THREE CARDS SECTION */}
            <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '1140px', margin: '0 auto' }}>

              {/* CARD 01 */}
              <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, width: 'fit-content', marginBottom: '24px' }}>01</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Connect your calendar</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '40px', minHeight: '63px' }}>
                  We'll handle all the cross-referencing, so you don't have to worry about double bookings.
                </p>
                <div style={{ position: 'relative', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {/* Orbits - Three layered rings with increased spacing */}
                  <div style={{ position: 'absolute', width: '230px', height: '230px', borderRadius: '50%', border: '1px solid #f3f4f6' }}></div>
                  <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid #f3f4f6' }}></div>
                  <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '50%', border: '1px solid #f3f4f6' }}></div>
                  {/* Center Cal.com logo */}
                  <div style={{ background: 'white', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px', fontWeight: 700, zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    Cal.com
                  </div>
                  {/* Orbiting Icons - One per path, synced speed, 120 deg apart */}
                  <div style={{
                    position: 'absolute', left: '50%', top: '50%', background: 'white', padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', zIndex: 3,
                    animation: 'orbit-outer 15s linear infinite'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>
                  </div>
                  <div style={{
                    position: 'absolute', left: '50%', top: '50%', background: 'white', padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', zIndex: 3,
                    animation: 'orbit-mid 15s linear infinite', animationDelay: '-5s'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#EA4335"><path d="M12.5 7v2h1V7h-1zm.5 10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3zm-3-8h3v6h-3V9zM21 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>
                  </div>
                  <div style={{
                    position: 'absolute', left: '50%', top: '50%', background: 'white', padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', zIndex: 3,
                    animation: 'orbit-inner 15s linear infinite', animationDelay: '-10s'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#34A853"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>
                  </div>
                </div>
              </div>

              {/* CARD 02 */}
              <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, width: 'fit-content', marginBottom: '24px' }}>02</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Set your availability</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '40px', minHeight: '63px' }}>
                  Want to block off weekends? Set up any buffers? We make that easy.
                </p>
                <div style={{ position: 'relative', marginTop: 'auto' }}>
                  {/* Decorative background cards for stacked effect */}
                  <div style={{ position: 'absolute', top: '-16px', left: '20px', right: '20px', height: '40px', background: 'white', border: '1px solid #f3f4f6', borderRadius: '16px 16px 0 0', zIndex: 0 }}></div>
                  <div style={{ position: 'absolute', top: '-8px', left: '10px', right: '10px', height: '40px', background: 'white', border: '1px solid #f0f0f0', borderRadius: '16px 16px 0 0', zIndex: 1 }}></div>

                  {/* Main Widget Card */}
                  <div style={{
                    position: 'relative', zIndex: 2, background: 'white', borderRadius: '20px 20px 0 0', border: '1px solid #e5e7eb', borderBottom: 'none',
                    padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 -4px 20px rgba(0,0,0,0.03)', transform: 'scale(1.05)', transformOrigin: 'bottom'
                  }}>
                    {[
                      { d: 'Mon', t1: '8:30 am', t2: '5:00 pm' },
                      { d: 'Tue', t1: '9:00 am', t2: '6:30 pm' },
                      { d: 'Wed', t1: '10:00 am', t2: '7:00 pm' }
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px', height: '18px', background: '#d1d5db', borderRadius: '12px', position: 'relative',
                          animation: `toggle-track 6s infinite`, animationDelay: `${i * 2}s`
                        }}>
                          <div style={{
                            position: 'absolute', left: '2px', top: '2px', width: '14px', height: '14px', background: 'white', borderRadius: '50%',
                            animation: `${i % 2 === 0 ? 'thumb-slide-right' : 'thumb-slide-left'} 6s infinite`, animationDelay: `${i * 2}s`
                          }}></div>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280', width: '35px' }}>{row.d}</div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ padding: '6px 12px', border: '1px solid #f3f4f6', borderRadius: '6px', fontSize: '12px', color: '#374151', background: 'white', fontWeight: 500 }}>{row.t1}</div>
                          <div style={{ color: '#d1d5db', fontWeight: 800 }}>-</div>
                          <div style={{ padding: '6px 12px', border: '1px solid #f3f4f6', borderRadius: '6px', fontSize: '12px', color: '#374151', background: 'white', fontWeight: 500 }}>{row.t2}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', opacity: 0.3 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARD 03 */}
              <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, width: 'fit-content', marginBottom: '24px' }}>03</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Choose how to meet</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '40px', minHeight: '63px' }}>
                  It could be a video chat, phone call, or a walk in the park!
                </p>
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                  {/* Browser Header Bar */}
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '6px', background: 'white' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e5e7eb' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e5e7eb' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e5e7eb' }}></div>
                  </div>

                  {/* Meeting Interface */}
                  <div style={{ flex: 1, display: 'flex', position: 'relative', minHeight: '180px' }}>
                    {/* User 1 */}
                    <div style={{ flex: 1, borderRight: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                      {/* Pulsing Background Circle */}
                      <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '50%', background: '#e5e7eb', animation: 'fade-bg 2s infinite', zIndex: 0 }}></div>
                      <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <svg width="45" height="45" viewBox="0 0 24 24" fill="#374151"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                    </div>
                    {/* User 2 */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                      {/* Pulsing Background Circle */}
                      <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '50%', background: '#e5e7eb', animation: 'fade-bg 2s infinite', animationDelay: '1s', zIndex: 0 }}></div>
                      <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                        <svg width="45" height="45" viewBox="0 0 24 24" fill="#374151"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      </div>
                    </div>

                    {/* Controls Bar */}
                    <div style={{
                      position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px',
                      padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', zIndex: 10
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1f2937" stroke="none"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="#111827" /></svg>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                        <div style={{ position: 'absolute', width: '2px', height: '22px', background: '#374151', transform: 'rotate(45deg)', left: '7px', top: '-3px', borderRadius: '1px' }}></div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1f2937"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BENEFITS SECTION */}
        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px',
            padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#6b7280',
            marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Benefits
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1f2937', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Your all-purpose scheduling app
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '480px', lineHeight: 1.5, marginBottom: '32px', fontWeight: 500 }}>
            Discover a variety of our advanced features. Unlimited and free for individuals.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '64px' }}>
            <Link href="/login" style={{
              display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', color: 'white',
              padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none'
            }}>
              Get started <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
            </Link>
            <Link href="/login" style={{
              display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#374151',
              padding: '10px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
              border: '1px solid #e5e7eb'
            }}>
              Book a demo <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ opacity: 0.5 }}><path d="M9 18l6-6-6-6" /></svg>
            </Link>
          </div>

          {/* BENEFITS 2x2 GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '1140px', width: '100%', margin: '0 auto' }}>

            {/* CARD: Avoid meeting overload */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Avoid meeting overload</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px' }}>
                Only get booked when you want to. Set daily, weekly or <span style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>monthly limits</span> and add buffers around your events to allow you to focus or take a break.
              </p>
              {/* Notice and buffers mockup */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>Notice and buffers</h4>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Minimum notice</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#6b7280', background: 'white' }}>
                    1 hour
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Buffer before event</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#6b7280' }}>
                      15 mins
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Buffer after event</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#6b7280' }}>
                      15 mins
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Time-slot intervals</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', color: '#6b7280' }}>
                    5 mins
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD: Stand out with a custom booking link */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Stand out with a custom booking link</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px' }}>
                Customize your booking link so it&apos;s short and easy to remember for your bookers. No more long, complicated links one can easily forget.
              </p>
              {/* Booking link preview mockup */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                <div style={{ background: '#f3f4f6', borderRadius: '8px', padding: '8px 20px', fontSize: '14px', fontWeight: 600, color: '#374151', border: '1px solid #e5e7eb' }}>
                  cal.com/keith
                </div>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '380px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#d1d5db', overflow: 'hidden' }}>
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Keith" alt="Keith" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Keith Williams</div>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Engineering Deep-Dive</h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, marginBottom: '16px' }}>
                    Have technical questions or want to dive into Cal.com&apos;s architecture, infrastructure, or roadmap? Book a time for a deep technical session.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {['15m', '30m', '45m', '1h'].map(t => (
                        <span key={t} style={{
                          padding: '2px 8px', borderRadius: '4px',
                          background: t === '1h' ? 'white' : '#f8f9fa',
                          border: t === '1h' ? '1px solid #e5e7eb' : '1px solid transparent',
                          color: t === '1h' ? '#374151' : 'inherit',
                          fontSize: '12px'
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><polygon points="14 12 14 17 22 17 22 7 14 7" /></svg>
                    Cal Video
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '12px', fontWeight: 500 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    South America/Buenos Aires <span style={{ opacity: 0.5, fontSize: '9px' }}>▼</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD: Streamline your bookers' experience */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Streamline your bookers&apos; experience</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px' }}>
                Let your bookers overlay their calendar, receive booking confirmations via text or email, get events added to their calendar, and allow them to reschedule with ease.
              </p>
              {/* Calendar overlay animation */}
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', background: '#fcfcfc' }}>
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', background: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px', height: '18px', background: '#111827', borderRadius: '10px', position: 'relative',
                      animation: 'toggle-track 6s infinite reverse'
                    }}>
                      <div style={{
                        position: 'absolute', left: '2px', top: '2px', width: '14px', height: '14px', background: 'white', borderRadius: '50%',
                        animation: 'thumb-slide-right 6s infinite'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Overlay my calendar</span>
                  </div>
                  <div style={{ display: 'flex', background: '#f3f4f6', padding: '2px', borderRadius: '6px' }}>
                    <div style={{ padding: '3px 10px', background: 'white', borderRadius: '4px', fontSize: '11px', fontWeight: 800, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>12h</div>
                    <div style={{ padding: '3px 10px', color: '#9ca3af', fontSize: '11px', fontWeight: 800 }}>24h</div>
                  </div>
                </div>

                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0', fontSize: '11px', textAlign: 'center', marginBottom: '8px' }}>
                    {['Wed 06', 'Thu 07', 'Fri 08', 'Sat 09', 'Sun 10'].map(d => (
                      <div key={d} style={{ color: '#6b7280', fontWeight: 700, fontSize: '11px' }}>{d}</div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', height: '180px', position: 'relative' }}>
                    {/* WED: Lunch date */}
                    <div style={{ animation: 'fade-overlay 6s infinite' }}>
                      <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '6px', padding: '8px', height: '80px', marginTop: '40px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#7c3aed', marginBottom: '2px' }}>Lunch date</div>
                        <div style={{ fontSize: '9px', color: '#7c3aed', opacity: 0.7 }}>12 PM - 1 PM</div>
                      </div>
                    </div>
                    {/* THU: Coffee & Design conf */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', animation: 'fade-overlay 6s infinite' }}>
                      <div>
                        <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '6px', padding: '8px', height: '80px', marginTop: '10px' }}>
                          <div style={{ fontSize: '10px', fontWeight: 800, color: '#7c3aed', marginBottom: '2px' }}>Coffee</div>
                          <div style={{ fontSize: '9px', color: '#7c3aed', opacity: 0.7 }}>11 AM - 12 PM</div>
                        </div>
                      </div>
                      <div>
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px', height: '80px', marginTop: '20px' }}>
                          <div style={{ fontSize: '10px', fontWeight: 800, color: '#374151', marginBottom: '2px' }}>Design conference</div>
                          <div style={{ fontSize: '9px', color: '#6b7280' }}>12 PM - 2 PM</div>
                        </div>
                      </div>
                    </div>
                    {/* FRI: Design conference */}
                    <div style={{ animation: 'fade-overlay 6s infinite' }}>
                      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px', height: '120px', marginTop: '80px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#374151', marginBottom: '2px' }}>Design conference</div>
                        <div style={{ fontSize: '9px', color: '#6b7280' }}>12 PM - 2 PM</div>
                      </div>
                    </div>
                    {/* SAT: Hiring call */}
                    <div style={{ animation: 'fade-overlay 6s infinite' }}>
                      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '8px', height: '120px', marginTop: '20px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#e11d48', marginBottom: '2px' }}>Hiring call</div>
                        <div style={{ fontSize: '9px', color: '#e11d48', opacity: 0.7 }}>11:30 AM - 1 PM</div>
                      </div>
                    </div>
                    {/* SUN: Company meeting */}
                    <div style={{ animation: 'fade-overlay 6s infinite' }}>
                      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '8px', height: '180px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#2563eb', marginBottom: '2px' }}>Company meeting</div>
                        <div style={{ fontSize: '9px', color: '#2563eb', opacity: 0.7 }}>11 AM - 2:30 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD: Reduce no-shows */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Reduce no-shows with automated meeting reminders</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px' }}>
                Easily send sms or meeting reminder emails about bookings, and send automated follow-ups to gather any relevant information before the meeting.
              </p>
              {/* Notification mockup stack centered */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ position: 'relative', height: '100px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Background cards for stack effect */}
                  <div style={{ position: 'absolute', bottom: '0px', width: '75%', height: '60px', background: 'white', border: '1px solid #f3f4f6', borderRadius: '16px', zIndex: 1 }}></div>
                  <div style={{ position: 'absolute', bottom: '6px', width: '80%', height: '65px', background: 'white', border: '1px solid #f3f4f6', borderRadius: '16px', zIndex: 2 }}></div>
                  <div style={{ position: 'absolute', bottom: '12px', width: '85%', height: '70px', background: 'white', border: '1px solid #f3f4f6', borderRadius: '16px', zIndex: 3 }}></div>

                  {/* Main animated notification card */}
                  <div style={{
                    position: 'absolute', bottom: '18px', width: '90%', background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px',
                    padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', zIndex: 4, boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                  }}>
                    {/* Cal Icon */}
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'white' }}>Cal</span>
                    </div>

                    <div style={{ flex: 1, position: 'relative', height: '36px' }}>
                      {/* Content 1: Meeting canceled */}
                      <div style={{ position: 'absolute', inset: 0, animation: 'fade-text 6s infinite' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111827' }}>Meeting canceled</span>
                          <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>Just now</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>James Carwell has just canceled the meeting.</div>
                      </div>

                      {/* Content 2: New booking confirmed */}
                      <div style={{ position: 'absolute', inset: 0, animation: 'fade-text-alt 6s infinite' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111827' }}>New booking confirmed</span>
                          <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>Just now</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>James Oliver booked a 30min discovery call with you.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* GRID DIVIDER */}
        <div style={{ position: 'relative', height: '1px', background: '#e5e7eb', marginTop: '120px' }}>
          <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', height: '100%' }}>
            <div style={{ position: 'absolute', top: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
            <div style={{ position: 'absolute', top: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
          </div>
        </div>

        {/* AND SO MUCH MORE SECTION */}
        <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px 80px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1f2937', letterSpacing: '-0.03em', margin: '0 0 40px' }}>
            ...and so much more!
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '880px', width: '100%', margin: '0 auto' }}>

            {/* Accept payments hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {/* 4 dots on the icon container */}
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Card Icon */}
                  <div style={{ width: '44px', height: '32px', background: '#1f2937', borderRadius: '6px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: '6px', left: '6px', width: '8px', height: '4px', background: 'white', borderRadius: '1px', opacity: 0.8 }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid white' }}></div>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>Accept payments</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                {/* Dots on the card itself (stage 2) */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>

                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '12px' }}>Accept payments</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  You can monetize your bookings through our Stripe integration.
                </p>
              </div>
            </div>

            {/* Built-in video conferencing hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {/* 4 dots on the icon container */}
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Video Icon */}
                  <div style={{ width: '36px', height: '36px', background: '#111827', borderRadius: '10px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect width="15" height="14" x="1" y="5" rx="2" ry="2" /></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>Built-in video conferencing</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Built-in video conferencing</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  Our very own video conferencing for you and your bookers.
                </p>
              </div>
            </div>

            {/* Short booking links hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Link Icon */}
                  <div style={{ width: '36px', height: '36px', background: '#111827', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>Short booking links</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Short booking links</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  Each booking link can be short which makes it easy to remember.
                </p>
                {/* Dots on the card corners */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
              </div>
            </div>

            {/* Privacy first hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Shield Icon */}
                  <div style={{ width: '36px', height: '36px', background: '#111827', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>Privacy first</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Privacy first</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  Our solution has been designed to keep your information private and protected.
                </p>
                {/* Dots on the card corners */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
              </div>
            </div>

            {/* 65+ languages hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Languages Icon */}
                  <div style={{ width: '36px', height: '36px', background: '#111827', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="m22 22-5-10-5 10" /><path d="M14 18h6" /></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>65+ languages</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>65+ languages</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  Talk to anyone around the globe with support for 65+ languages.
                </p>
                {/* Dots on the card corners */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
              </div>
            </div>

            {/* Easy embeds hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Embed Icon */}
                  <div style={{ width: '36px', height: '36px', background: '#111827', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12h6" /><path d="M18 9v6" /><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>Easy embeds</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Easy embeds</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  Embed your booking page anywhere with just a few clicks.
                </p>
                {/* Dots on the card corners */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
              </div>
            </div>

            {/* All your favorite apps hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Apps Icon */}
                  <div style={{ width: '40px', height: '40px', background: '#111827', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>All your favorite apps</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>All your favorite apps</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  Effortlessly integrate with your favorite popular apps.
                </p>
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
              </div>
            </div>

            {/* Simple customization hover card */}
            <div className="feature-card" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
              {/* State 1: Icon View */}
              <div className="icon-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <div style={{ width: '80px', height: '80px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }}></div>

                  {/* Customization Icon */}
                  <div style={{ width: '36px', height: '36px', background: '#111827', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
                  </div>
                </div>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#111827', margin: 0 }}>Simple customization</h3>
              </div>

              {/* State 2: Detailed View on Hover */}
              <div className="detail-state" style={{ position: 'absolute', inset: 0, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Simple customization</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, fontWeight: 500 }}>
                  Easily customize your booking page to fit your brand.
                </p>
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '5px', height: '5px', borderRadius: '50%', background: '#d1d5db' }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* TESTIMONIALS SECTION */}
        <div style={{ marginTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingBottom: '120px', width: '100%' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px',
            padding: '4px 12px', fontSize: '12px', fontWeight: 600, color: '#1f2937',
            marginBottom: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
            Testimonials
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            Don’t just take our word for it
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280', maxWidth: '440px', lineHeight: 1.5, marginBottom: '64px', fontWeight: 500 }}>
            Our users are our best ambassadors. Discover why we're the top choice for scheduling meetings.
          </p>

          <TestimonialSlider />
        </div>


        {/* APP STORE SECTION */}
        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>

          {/* Wireframe background container */}
          <div style={{ position: 'relative', width: '100%', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'center', padding: '80px 24px' }}>

            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '64px', maxWidth: '1140px', width: '100%', display: 'flex', alignItems: 'center', gap: '64px', position: 'relative', zIndex: 1, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>

              {/* Left Content */}
              <div style={{ flex: '1 1 50%' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '20px',
                  padding: '4px 12px', fontSize: '13px', fontWeight: 600, color: '#374151',
                  marginBottom: '24px'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
                  App store
                </div>

                <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px' }}>
                  All your key tools in-sync with your meetings
                </h2>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px', maxWidth: '440px' }}>
                  Cal.com works with all apps already in your flow ensuring everything works perfectly together.
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link href="/login" style={{ background: '#111827', color: 'white', padding: '0 24px', height: '44px', borderRadius: '22px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                    Get started
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </Link>
                  <button style={{ background: 'white', color: '#374151', padding: '0 24px', height: '44px', borderRadius: '22px', fontSize: '14px', fontWeight: 600, border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Explore apps
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>

              {/* Cycling Apps Grid */}
              <div style={{
                flex: '1 1 50%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(2, 110px)',
                alignSelf: 'center',
                maxWidth: '480px',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                background: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Cell 1: HubSpot / Salesforce */}
                <div style={{ position: 'relative', borderRight: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', bottom: '-7.5px', right: '-4.5px', color: '#d1d5db', fontSize: '11px', lineHeight: 1, zIndex: 10, background: 'white', padding: '0 2px' }}>+</div>
                  <div style={{ position: 'absolute', animation: 'fade-text 8s infinite' }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2.5"><circle cx="12" cy="12" r="3" /><circle cx="5" cy="17" r="2" /><circle cx="19" cy="7" r="2" /><path d="M10 14l-3 2" /><path d="M14 10l3-2" /></svg>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 8s infinite' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#00A1E0"><path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /><path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" /></svg>
                  </div>
                </div>

                {/* Cell 2: Zoom / Teams */}
                <div style={{ position: 'relative', borderRight: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', bottom: '-7.5px', right: '-4.5px', color: '#d1d5db', fontSize: '11px', lineHeight: 1, zIndex: 10, background: 'white', padding: '0 2px' }}>+</div>
                  <div style={{ position: 'absolute', animation: 'fade-text 10s infinite' }}>
                    <div style={{ width: '40px', height: '40px', background: '#2D8CFF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M21 7l-5.5 4v-4l5.5-4zM1 16c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-8z" /></svg>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 10s infinite' }}>
                    <div style={{ width: '36px', height: '36px', background: '#5059C9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '18px' }}>T</div>
                  </div>
                </div>

                {/* Cell 3: Jul 17 / Microsoft Cal */}
                <div style={{ position: 'relative', borderRight: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', bottom: '-7.5px', right: '-4.5px', color: '#d1d5db', fontSize: '11px', lineHeight: 1, zIndex: 10, background: 'white', padding: '0 2px' }}>+</div>
                  <div style={{ position: 'absolute', animation: 'fade-text 12s infinite' }}>
                    <div style={{ width: '38px', height: '38px', border: '1px solid #e5e7eb', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div style={{ background: '#EF4444', width: '100%', padding: '2px 0', fontSize: '9px', color: 'white', fontWeight: 700, textAlign: 'center' }}>JUL</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>17</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 12s infinite' }}>
                    <div style={{ width: '38px', height: '38px', border: '1px solid #e5e7eb', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', background: 'white' }}>
                      <div style={{ background: '#0078D4', width: '100%', height: '8px' }}></div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>O</div>
                    </div>
                  </div>
                </div>

                {/* Cell 4: Zapier / Stripe */}
                <div style={{ borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', animation: 'fade-text 9s infinite' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '15px', fontWeight: 900 }}>
                      <span style={{ color: '#FF4A00' }}>_</span>zapier
                    </div>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 9s infinite' }}>
                    <div style={{ width: '38px', height: '38px', background: '#635BFF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '24px', fontStyle: 'italic' }}>S</div>
                  </div>
                </div>

                {/* Cell 5: Google Calendar 31 / Outlook */}
                <div style={{ position: 'relative', borderRight: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', animation: 'fade-text 14s infinite' }}>
                    <div style={{ width: '38px', height: '38px', border: '1px solid #e5e7eb', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', background: 'white' }}>
                      <div style={{ background: '#4285F4', width: '100%', height: '8px' }}></div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginTop: '2px' }}>31</div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 14s infinite' }}>
                    <div style={{ width: '36px', height: '36px', background: '#0078D4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '18px' }}>O</div>
                  </div>
                </div>

                {/* Cell 6: GA / PostHog */}
                <div style={{ position: 'relative', borderRight: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', animation: 'fade-text 7s infinite' }}>
                    <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', paddingBottom: '4px' }}>
                      <div style={{ width: '8px', height: '14px', background: '#F9AB00', borderRadius: '1.5px' }}></div>
                      <div style={{ width: '8px', height: '22px', background: '#E37400', borderRadius: '1.5px' }}></div>
                      <div style={{ width: '8px', height: '30px', background: '#D93025', borderRadius: '1.5px' }}></div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 7s infinite' }}>
                    <svg width="34" height="34" viewBox="0 0 40 40" fill="none"><path d="M10 20l9-3-9 13z" fill="#F54E00" /><path d="M19 17l8-2-4 15H10z" fill="#111827" /><path d="M27 15l6 1-4 19h-6z" fill="#FFB020" /><circle cx="25" cy="18" r="1.5" fill="#fff" /></svg>
                  </div>
                </div>

                {/* Cell 7: Google Meet / Circle */}
                <div style={{ position: 'relative', borderRight: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', animation: 'fade-text 11s infinite' }}>
                    <div style={{ width: '40px', height: '40px', border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '20px', height: '20px', border: '2.5px solid #0078D4', borderRadius: '50%' }}></div>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 11s infinite' }}>
                    <div style={{ width: '40px', height: '30px', background: '#E5E7EB', borderRadius: '6px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '16px', height: '10px', background: '#34A853', borderRadius: '2px' }}></div>
                      <div style={{ marginLeft: '2px', width: '0', height: '0', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid #34A853' }}></div>
                    </div>
                  </div>
                </div>

                {/* Cell 8: Outlook / Zoom */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', animation: 'fade-text 13s infinite' }}>
                    <div style={{ width: '38px', height: '38px', background: '#0078D4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '20px' }}>O</div>
                  </div>
                  <div style={{ position: 'absolute', animation: 'fade-text-alt 13s infinite' }}>
                    <div style={{ width: '38px', height: '38px', background: '#2D8CFF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M21 7l-5.5 4v-4l5.5-4zM1 16c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wall of Love Section */}
        <div style={{ padding: '0 0 120px 0', textAlign: 'center', position: 'relative', marginTop: 80, borderTop: '1px solid #e5e7eb' }}>


          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px',
            padding: '4px 12px', fontSize: '13px', fontWeight: 600, color: '#4b5563',
            marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <span role="img" aria-label="hands">🙌</span> Wall of love
          </div>
          <h2 style={{ fontSize: '48px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
            See why our users love Cal.com
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.5, fontWeight: 500 }}>
            Read the impact we've had from those who matter most - our customers.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '80px' }}>
            <Link href="/login" style={{
              display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', color: 'white',
              padding: '12px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, textDecoration: 'none'
            }}>
              Get started <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
            </Link>
            <Link href="/login" style={{
              display: 'flex', alignItems: 'center', gap: '8px', background: 'white', color: '#374151',
              padding: '12px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, textDecoration: 'none',
              border: '1px solid #e5e7eb'
            }}>
              Book a demo <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ opacity: 0.5 }}><path d="M9 18l6-6-6-6" /></svg>
            </Link>
          </div>

          {/* Masonry Grid */}
          <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'start', textAlign: 'left' }}>
            {/* Col 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=12" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>Ross Zeiger</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>@ross_zeiger</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>Great, easy to use, and beautiful interface.</p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=11" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Errol M.</div>
                    <div style={{ color: '#6b7280', fontSize: '12px' }}>Small-Business (50 or fewer emp.)</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  It's so well thought out. A lot of care has gone into most situations you will come across when trying to herd cats for meetings.<br /><br />
                  <span style={{ color: '#8b5cf6' }}>Cal.com</span> is solving the problem of getting appointments organised but it goes beyond that with thoughtful and easy to use features. Workflows for pre and post meetings using email and SMS are brilliant.
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=13" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Guillermo Rauch</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>@rauchg</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  Coolest domain. Check<br />Coolest mission. Check<br />Coolest product. Check<br /><br />
                  <span style={{ color: '#8b5cf6' }}>cal.com</span>
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>MI</div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Mickey</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  Thrilled with this scheduling app—it's a game-changer. The intuitive interface and advanced features streamline my time management. The standout, however, is the incredible support team—swift, expert responses to every query. A perfect combo for seamless scheduling and top-notch customer service.
                </p>
              </div>
            </div>

            {/* Col 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>DM</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>David Midgley</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>Producthunt Review</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  I am new to <span style={{ color: '#8b5cf6' }}>Cal.com</span> but so far they have scored 10/10 - it has the features I need, including connecting to Apple Calendar (I withdrew from Calendly because they dropped support for iCal without giving a reason.) Also it is free; $10 a month may not seem much but when you have several apps of this kind it adds up. And <span style={{ color: '#8b5cf6' }}>cal.com</span> were extremely helpful and prompt in dealing with my questions.
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=14" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Jean-Philippe Allard</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  What an amazing support experience! Identified a small bug and sent them an e-mail. The bug was fixed (Github pull request as a proof!) in under 24 hours. I've never seen such a fast and efficient support before, call me impressed!
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=15" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Clément Dutoict</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>@clement_dutoict</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  I love the minimalist style of this app.
                </p>
              </div>
            </div>

            {/* Col 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=16" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Ahmed Elnaggar</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>@ahmed_elnaggar1</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  This platform's open-source nature and flexible licensing are a developer's dream. Self-hosting and white-labeling empower personalization and seamless integration.
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=17" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Ant Wilson</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>@AntWilson</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  (finally) made the move to <span style={{ color: '#8b5cf6' }}>@calcom</span> after I couldn't find how to edit events in the calendly dashboard and I must say - dash is 10/10<br /><br />
                  Bravo <span style={{ color: '#8b5cf6' }}>@peer_rich</span> and team (I should have moved over years ago!)<br /><br />
                  OSS fam
                </p>
              </div>

              <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <img src="https://i.pravatar.cc/150?u=18" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#111827', fontSize: '15px' }}>Rotimi Best</div>
                    <div style={{ color: '#6b7280', fontSize: '13px' }}>@rotimi_best</div>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.5 }}>
                  for the love of me, why do people still use Calendly? Just today I have seen products reference Calendly while they know of <span style={{ color: '#8b5cf6' }}>@calcom</span><br /><br />
                  It's a no brainer for me to use , their brand is amazing, cool team + they even have more compelling features 🔥
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Logo Slider */}
          <div style={{ position: 'relative', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', marginTop: '120px' }}>
            {/* Faint Vertical Lines + Crosshairs Container */}
            <div style={{ position: 'absolute', inset: 0, margin: '0 auto', maxWidth: '1140px', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '0', bottom: '0', left: '0', borderLeft: '1px solid #e5e7eb' }}></div>
              <div style={{ position: 'absolute', top: '0', bottom: '0', right: '0', borderRight: '1px solid #e5e7eb' }}></div>
              <div style={{ position: 'absolute', top: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              <div style={{ position: 'absolute', top: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              <div style={{ position: 'absolute', bottom: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              <div style={{ position: 'absolute', bottom: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
            </div>

            <div className="logo-slider-container mobile-padding" style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '48px', padding: '12px 24px', position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500, lineHeight: 1.4, width: '160px', flexShrink: 0, background: '#f3f4f6', zIndex: 3, position: 'relative', paddingRight: '12px', textAlign: 'left' }}>
                Trusted by fast-growing<br />
                companies around the world
              </div>

              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <LogoSlider />
              </div>
            </div>
          </div>

          {/* Final CTA Card Section */}
          <div style={{ position: 'relative', marginTop: '0', paddingBottom: '40px' }}>
            {/* Vertical Lines + Crosshairs wrapping */}
            <div style={{ position: 'absolute', inset: 0, margin: '0 auto', maxWidth: '1140px', pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: '0', bottom: '0', left: '0', borderLeft: '1px solid #e5e7eb' }}></div>
              <div style={{ position: 'absolute', top: '0', bottom: '0', right: '0', borderRight: '1px solid #e5e7eb' }}></div>

              <div style={{ position: 'absolute', top: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              <div style={{ position: 'absolute', top: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>

              <div style={{ position: 'absolute', bottom: '-6px', left: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
              <div style={{ position: 'absolute', bottom: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
            </div>

            {/* White card container */}
            <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '80px 24px 40px', position: 'relative', zIndex: 1 }}>
              <div style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '80px 48px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
                  backgroundImage: `linear-gradient(#f9fafb 1px, transparent 1px), linear-gradient(90deg, #f9fafb 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h2 style={{ fontSize: '48px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', marginBottom: '24px' }}>
                    Smarter, simpler scheduling
                  </h2>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
                    <Link href="/login" style={{
                      display: 'flex', alignItems: 'center', gap: '8px', background: '#111827', color: 'white',
                      padding: '12px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, textDecoration: 'none'
                    }}>
                      Get started <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
                    </Link>
                    <Link href="/login" style={{
                      display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', color: '#4b5563',
                      padding: '12px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                      border: '1px solid #e5e7eb'
                    }}>
                      Talk to sales <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ opacity: 0.5 }}><path d="M9 18l6-6-6-6" /></svg>
                    </Link>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', opacity: 0.4 }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg></div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product of the day</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>1st</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', opacity: 0.4 }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg></div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product of the week</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>1st</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', opacity: 0.4 }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg></div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product of the month</div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>1st</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderLeft: '1px solid #e5e7eb', paddingLeft: '32px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '16px' }}>★★★★★</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#da552f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>P</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '16px' }}>★★★★★</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#4285F4', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>G</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#f59e0b', fontSize: '16px' }}>★★★★★</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: '#111827' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ff492c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>G2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Comprehensive Footer */}
        <footer style={{ background: '#f9fafb', padding: '60px 24px 80px', borderTop: '1px solid #e5e7eb', position: 'relative', zIndex: 10 }}>
          <div className="footer-grid mobile-padding" style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr repeat(4, 1fr)', gap: '48px', alignItems: 'start' }}>

            {/* Logo & Compliance Column */}
            <div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#111827', marginBottom: '16px' }}>Cal.com</div>
              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, marginBottom: '24px' }}>
                Cal.com® and Cal® are a registered trademark by Cal.com, Inc. All rights reserved.
              </p>

              {/* Compliance Icons */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', opacity: 0.5 }}>
                <div style={{ width: 32, height: 32, border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800 }}>ISO</div>
                <div style={{ width: 32, height: 32, border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800 }}>SOC2</div>
                <div style={{ width: 32, height: 32, border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800 }}>CCPA</div>
                <div style={{ width: 32, height: 32, border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800 }}>GDPR</div>
                <div style={{ width: 32, height: 32, border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: 800 }}>HIPAA</div>
              </div>

              <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, marginBottom: '24px' }}>
                Our mission is to connect a billion people by 2031 through calendar scheduling.
              </p>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                <div style={{ padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#4b5563', background: 'white' }}>English</div>
                <div style={{ padding: '6px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>All Systems Operational</span>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                </div>
              </div>

              {/* Downloads Grid */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>Downloads</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { name: 'iPhone', color: '#000' }, { name: 'Android', color: '#3ddc84' }, { name: 'Chrome', color: '#4285f4' },
                    { name: 'Safari', color: '#00c3ff' }, { name: 'Edge', color: '#0078d7' }, { name: 'Firefox', color: '#ff7139' },
                    { name: 'MacOS', color: '#000' }, { name: 'Windows', color: '#0078d7' }, { name: 'Linux', color: '#000' }
                  ].map((sys) => (
                    <div key={sys.name} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#111827' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: sys.color }}></div>
                      {sys.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ background: '#da552f', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, flex: 1, textAlign: 'left' }}>
                  ★★★★★<br />Read our reviews on G2
                </div>
                <div style={{ background: '#00b67a', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, flex: 1, textAlign: 'left' }}>
                  ★★★★★<br />Read our reviews on Trustpilot
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>Solutions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['iOS/Android App', 'Self-hosted', 'Pricing', 'Docs', 'Cal.ai', 'Enterprise', 'Integrations', 'Routing', 'Platform Atoms', 'Desktop App', 'FAQ', 'Enterprise API', 'Github'].map(link => (
                  <Link key={link} href="#" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>{link}</Link>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>Use Cases</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Sales', 'Marketing', 'Talent Acquisition', 'Customer Support', 'Higher Education', 'Telehealth', 'Professional Services', 'Hiring Marketplace', 'Human Resources', 'Tutoring', 'C-suite', 'Law'].map(link => (
                  <Link key={link} href="#" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>{link}</Link>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>Resources</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Affiliate Program', 'Help Docs', 'Blog', 'Fonts', 'Teams', 'Embed', 'Recurring events', 'Developers', '000', 'Workflows', 'Instant Meetings', 'App Store', 'Requires confirmation', 'Payments'].map(link => (
                  <Link key={link} href="#" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>{link}</Link>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '20px' }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Jobs', 'About', 'Open Startup', 'Support', 'Privacy', 'Terms', 'License', 'Security', 'Changelog', 'Get a demo', 'Talk to sales'].map(link => (
                  <Link key={link} href="#" style={{ textDecoration: 'none', color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>{link}</Link>
                ))}
              </div>
            </div>

          </div>
        </footer>
      </div>
    </>
  );
}
