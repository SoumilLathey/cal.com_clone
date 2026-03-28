import Link from 'next/link';
import type { Metadata } from 'next';
import HomeMockup from '@/components/HomeMockup';
import LogoSlider from '@/components/LogoSlider';
import TestimonialSlider from '@/components/TestimonialSlider';

export const metadata: Metadata = {
  title: 'Cal.com - Schedulo Replica',
  description: 'A pixel-perfect replica of the Cal.com homepage.',
};

export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: '#f3f4f6', color: '#111827', minHeight: '100vh', padding: '16px 0', display: 'flex', flexDirection: 'column', zoom: 0.85, position: 'relative' }}>
      
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginLeft: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>Solutions <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg></div>
            <div style={{ cursor: 'pointer' }}>Enterprise</div>
            <div style={{ cursor: 'pointer' }}>Cal.ai</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>Developer <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>Resources <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6" /></svg></div>
            <div style={{ cursor: 'pointer' }}>Pricing</div>
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
        <div style={{ padding: '64px 48px 100px', display: 'flex', gap: '48px' }}>

          {/* LEFT COLUMN */}
          <div style={{ flex: '1.2' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f9fafb', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, color: '#4b5563', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
              Cal.com launches v6.3 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
            </div>

            <h1 style={{ fontSize: '64px', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', margin: '0 0 20px', color: '#1f2937' }}>
              The better way to<br />
              schedule your<br />
              meetings
            </h1>

            <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px', maxWidth: '420px', fontWeight: 400, letterSpacing: '-0.01em' }}>
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
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
              <HomeMockup />
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
              <div style={{ position: 'absolute', top: '-6px', right: '-4.5px', color: '#d1d5db', fontSize: '12px', lineHeight: 1 }}>+</div>
            </div>
          </div>

          {/* THREE CARDS SECTION */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1140px', width: '100%', margin: '0 auto' }}>

            {/* CARD 01 */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, width: 'fit-content', marginBottom: '24px' }}>01</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Connect your calendar</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '40px', minHeight: '63px' }}>
                We'll handle all the cross-referencing, so you don't have to worry about double bookings.
              </p>
              <div style={{ position: 'relative', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Orbits */}
                <div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid #f3f4f6' }}></div>
                <div style={{ position: 'absolute', width: '110px', height: '110px', borderRadius: '50%', border: '1px solid #f3f4f6' }}></div>
                {/* Center Cal.com logo */}
                <div style={{ background: 'white', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px', fontWeight: 700, zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  Cal.com
                </div>
                {/* Orbiting Icons */}
                <div style={{ position: 'absolute', top: '15px', right: '40px', background: 'white', padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>
                </div>
                <div style={{ position: 'absolute', bottom: '40px', left: '20px', background: 'white', padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#EA4335"><path d="M12.5 7v2h1V7h-1zm.5 10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3zm-3-8h3v6h-3V9zM21 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" /></svg>
                </div>
                <div style={{ position: 'absolute', top: '90px', right: '10px', background: 'white', padding: '6px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
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
              <div style={{ background: '#f9fafb', borderRadius: '16px 16px 0 0', border: '1px solid #e5e7eb', borderBottom: 'none', height: '170px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { d: 'Mon', t1: '8:30 am', t2: '5:00 pm' },
                  { d: 'Tue', t1: '9:00 am', t2: '6:30 pm' },
                  { d: 'Wed', t1: '10:00 am', t2: '7:00 pm' }
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '14px', background: '#d1d5db', borderRadius: '10px', position: 'relative' }}>
                      <div style={{ position: 'absolute', right: '2px', top: '2px', width: '10px', height: '10px', background: 'white', borderRadius: '50%' }}></div>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', width: '30px' }}>{row.d}</div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '10px', color: '#6b7280', background: 'white' }}>{row.t1}</div>
                      <div style={{ color: '#9ca3af' }}>-</div>
                      <div style={{ padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '10px', color: '#6b7280', background: 'white' }}>{row.t2}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', opacity: 0.4 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 03 */}
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#f3f4f6', color: '#6b7280', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, width: 'fit-content', marginBottom: '24px' }}>03</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Choose how to meet</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, marginBottom: '40px', minHeight: '63px' }}>
                It could be a video chat, phone call, or a walk in the park!
              </p>
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', height: '170px', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <div style={{ padding: '8px', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '3px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e5e7eb' }}></div>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e5e7eb' }}></div>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e5e7eb' }}></div>
                </div>
                <div style={{ flex: 1, display: 'flex', padding: '8px', gap: '8px' }}>
                  <div style={{ flex: 1, background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#111827"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div style={{ flex: 1, background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#111827"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                </div>
                <div style={{ padding: '8px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '4px 12px', display: 'flex', gap: '10px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                    <div style={{ width: '12px', height: '12px', background: '#111827', borderRadius: '3px' }}></div>
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
            {/* Calendar overlay mockup */}
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '36px', height: '18px', background: '#111827', borderRadius: '10px', position: 'relative' }}>
                      <div style={{ position: 'absolute', right: '2px', top: '2px', width: '14px', height: '14px', background: 'white', borderRadius: '50%' }}></div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Overlay my calendar</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <div style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#e0e7ff', color: '#4338ca' }}>12h</div>
                  <div style={{ padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, color: '#9ca3af' }}>24h</div>
                </div>
              </div>

              {/* Calendar grid */}
              <div style={{ padding: '0 12px 16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(6, 1fr)', gap: '0', fontSize: '11px' }}>
                  {/* Header row */}
                  <div style={{ padding: '4px 8px', color: '#9ca3af', fontWeight: 600 }}></div>
                  {['Wed 06', 'Thu 07', 'Fri 08', 'Sat 09', 'Sun 10'].map(d => (
                    <div key={d} style={{ padding: '4px 4px', color: '#9ca3af', fontWeight: 600, textAlign: 'center', fontSize: '10px' }}>{d}</div>
                  ))}
                  <div style={{ padding: '4px 4px' }}></div>

                  {/* Time rows */}
                  {['05', ''].map((time, rowIdx) => (
                    <div key={rowIdx} style={{ display: 'contents' }}>
                      <div style={{ padding: '4px 8px', color: '#9ca3af', fontSize: '10px', fontWeight: 500 }}>{time}</div>
                      <div style={{ borderTop: '1px solid #f3f4f6', minHeight: '50px', position: 'relative' }}>
                        {rowIdx === 1 && (
                          <div style={{ position: 'absolute', top: '8px', left: '2px', right: '2px', background: '#dbeafe', borderRadius: '4px', padding: '3px 4px', fontSize: '9px', fontWeight: 600, color: '#2563eb' }}>
                            <div>Lunch break</div>
                            <div style={{ fontWeight: 400, opacity: 0.8 }}>12 PM - 1 PM</div>
                          </div>
                        )}
                      </div>
                      <div style={{ borderTop: '1px solid #f3f4f6', minHeight: '50px', position: 'relative' }}>
                        {rowIdx === 0 && (
                          <div style={{ position: 'absolute', top: '4px', left: '2px', right: '2px', background: '#dcfce7', borderRadius: '4px', padding: '3px 4px', fontSize: '9px', fontWeight: 600, color: '#16a34a' }}>
                            <div>Coffee</div>
                            <div style={{ fontWeight: 400, opacity: 0.8 }}>11 AM - 12 PM</div>
                          </div>
                        )}
                        {rowIdx === 1 && (
                          <div style={{ position: 'absolute', top: '8px', left: '2px', right: '2px', background: '#f3f4f6', borderRadius: '4px', padding: '3px 4px', fontSize: '9px', fontWeight: 600, color: '#374151' }}>
                            <div>Design conference</div>
                            <div style={{ fontWeight: 400, opacity: 0.8 }}>12 PM - 2 PM</div>
                          </div>
                        )}
                      </div>
                      <div style={{ borderTop: '1px solid #f3f4f6', minHeight: '50px', position: 'relative' }}>
                        {rowIdx === 1 && (
                          <div style={{ position: 'absolute', top: '8px', left: '2px', right: '2px', background: '#fef3c7', borderLeft: '3px solid #f59e0b', borderRadius: '4px', padding: '3px 4px', fontSize: '9px', fontWeight: 600, color: '#92400e' }}>
                            <div>Hiring call</div>
                            <div style={{ fontWeight: 400, opacity: 0.8 }}>11:30 AM - 1 PM</div>
                          </div>
                        )}
                      </div>
                      <div style={{ borderTop: '1px solid #f3f4f6', minHeight: '50px', position: 'relative' }}>
                        {rowIdx === 0 && (
                          <div style={{ position: 'absolute', top: '4px', left: '2px', right: '2px', background: '#fce7f3', borderRadius: '4px', padding: '3px 4px', fontSize: '9px', fontWeight: 600, color: '#be185d' }}>
                            <div>Company meeting</div>
                            <div style={{ fontWeight: 400, opacity: 0.8 }}>11 AM - 2:30 PM</div>
                          </div>
                        )}
                      </div>
                      <div style={{ borderTop: '1px solid #f3f4f6', minHeight: '50px' }}></div>
                      <div style={{ borderTop: '1px solid #f3f4f6', minHeight: '50px' }}></div>
                    </div>
                  ))}
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
            {/* Notification mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '380px', width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'white', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>Cal</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>Meeting is starting now</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>Your meeting is starting now. Hurry up!</div>
                </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500, flexShrink: 0, alignSelf: 'flex-start' }}>Just now</p>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '1140px', width: '100%', margin: '0 auto' }}>

          {/* Accept payments */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /><circle cx="5" cy="15" r="1" fill="#1f2937" stroke="none" /><line x1="8" y1="15" x2="11" y2="15" strokeWidth="1.5" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>Accept payments</span>
          </div>

          {/* Built-in video conferencing */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect width="15" height="14" x="1" y="5" rx="2" ry="2" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>Built-in video conferencing</span>
          </div>

          {/* Short booking links */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><circle cx="12" cy="14" r="2" /><path d="M12 11v1M12 17v1M9.5 12.5l.7.7M14.4 15.4l.7.7M9 14h1M14 14h1M9.5 15.5l.7-.7M14.4 12.6l.7-.7" strokeWidth="1" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>Short booking links</span>
          </div>

          {/* Privacy first */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>Privacy first</span>
          </div>

          {/* 65+ languages */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>65+ languages</span>
          </div>

          {/* Easy embeds */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="14" height="10" rx="2" /><path d="M8 19h4" /><path d="M10 13v6" /><rect x="17" y="13" width="5" height="8" rx="1" /><path d="M19 13V9a2 2 0 0 0-2-2H9" /><line x1="19" y1="16.5" x2="19" y2="16.6" strokeWidth="2" strokeLinecap="round" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>Easy embeds</span>
          </div>

          {/* All your favorite apps */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><line x1="14" y1="6.5" x2="21" y2="6.5" /><line x1="17.5" y1="3" x2="17.5" y2="10" /><line x1="14.5" y1="14.5" x2="20.5" y2="20.5" /><line x1="20.5" y1="14.5" x2="14.5" y2="20.5" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>All your favorite apps</span>
          </div>

          {/* Simple customization */}
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '40px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '52px', height: '52px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><path d="M17 8l-5 4-5-4" /></svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4 }}>Simple customization</span>
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                App store
              </div>
              
              <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#111827', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px' }}>
                All your key tools in-sync with your meetings
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.5, marginBottom: '32px', maxWidth: '440px' }}>
                Cal.com works with all apps already in your flow ensuring everything works perfectly together.
              </p>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ background: '#111827', color: 'white', padding: '0 24px', height: '44px', borderRadius: '22px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Get started 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
                <button style={{ background: 'white', color: '#374151', padding: '0 24px', height: '44px', borderRadius: '22px', fontSize: '14px', fontWeight: 600, border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Explore apps
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
            
            {/* Right Grid */}
            <div style={{ flex: '1 1 50%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 110px)', alignSelf: 'center', maxWidth: '480px' }}>
              
              {/* App 1: MS Teams */}
              <div style={{ position: 'relative', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', bottom: '-7.5px', right: '-4.5px', color: '#d1d5db', fontSize: '14px', lineHeight: 1, zIndex: 2, background: 'white', fontWeight: 300 }}>+</div>
                <svg width="36" height="36" viewBox="0 0 36 36"><rect width="36" height="36" rx="8" fill="#5059C9"/><path d="M22 14h5v8h-5v-8z" fill="#fff" opacity="0.8"/><circle cx="15" cy="14" r="3.5" fill="#fff" /><path d="M10 24v-2c0-2.5 2.5-4 5-4h1c2.5 0 5 1.5 5 4v2H10z" fill="#fff"/></svg>
              </div>

              {/* App 2: PostHog */}
              <div style={{ position: 'relative', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', bottom: '-7.5px', right: '-4.5px', color: '#d1d5db', fontSize: '14px', lineHeight: 1, zIndex: 2, background: 'white', fontWeight: 300 }}>+</div>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M10 20l9-3-9 13z" fill="#F54E00"/><path d="M19 17l8-2-4 15H10z" fill="#111827"/><path d="M27 15l6 1-4 19h-6z" fill="#FFB020"/><circle cx="25" cy="18" r="1.5" fill="#fff"/></svg>
              </div>

              {/* App 3: Zoom */}
              <div style={{ position: 'relative', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', bottom: '-7.5px', right: '-4.5px', color: '#d1d5db', fontSize: '14px', lineHeight: 1, zIndex: 2, background: 'white', fontWeight: 300 }}>+</div>
                <svg width="40" height="40" viewBox="0 0 40 40" ><rect width="40" height="40" rx="14" fill="#2D8CFF"/><path d="M26.5 14v12l-5.5-4v-4l5.5-4zM11 16c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2h-8c-1.1 0-2-.9-2-2v-8z" fill="#fff"/></svg>
              </div>

              {/* App 4: GA */}
              <div style={{ position: 'relative', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', paddingBottom: '4px' }}>
                  <div style={{ width: '8px', height: '14px', background: '#F9AB00', borderRadius: '1.5px' }}></div>
                  <div style={{ width: '8px', height: '22px', background: '#E37400', borderRadius: '1.5px' }}></div>
                  <div style={{ width: '8px', height: '30px', background: '#D93025', borderRadius: '1.5px' }}></div>
                </div>
              </div>

              {/* App 5: Calendar */}
              <div style={{ position: 'relative', borderRight: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '38px', height: '38px', border: '1px solid #e5e7eb', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.06)' }}>
                  <div style={{ background: '#EF4444', width: '100%', padding: '2px 0', fontSize: '9px', color: 'white', fontWeight: 700, textAlign: 'center' }}>JUL</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginTop: '0px' }}>17</div>
                </div>
              </div>

              {/* App 6: Zapier */}
              <div style={{ position: 'relative', borderRight: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#111827', letterSpacing: '-0.04em', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#FF4A00', marginRight: '2px' }}>_</span>zapier
                </div>
              </div>

              {/* App 7: Stripe */}
              <div style={{ position: 'relative', borderRight: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '38px', height: '38px', background: '#635BFF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '24px', fontStyle: 'italic', paddingRight: '2px' }}>
                  S
                </div>
              </div>

              {/* App 8: HubSpot */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="17" r="2"/><circle cx="19" cy="7" r="2"/><path d="M10 14l-3 2"/><path d="M14 10l3-2"/></svg>
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
            See why our users love Schedulo
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
                  It's so well thought out. A lot of care has gone into most situations you will come across when trying to herd cats for meetings.<br/><br/>
                  <span style={{ color: '#8b5cf6' }}>Schedulo</span> is solving the problem of getting appointments organised but it goes beyond that with thoughtful and easy to use features. Workflows for pre and post meetings using email and SMS are brilliant.
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
                  Coolest domain. Check<br/>Coolest mission. Check<br/>Coolest product. Check<br/><br/>
                  <span style={{ color: '#8b5cf6' }}>schedulo.com</span>
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
                  I am new to <span style={{ color: '#8b5cf6' }}>Schedulo</span> but so far they have scored 10/10 - it has the features I need, including connecting to Apple Calendar (I withdrew from Calendly because they dropped support for iCal without giving a reason.) Also it is free; $10 a month may not seem much but when you have several apps of this kind it adds up. And <span style={{ color: '#8b5cf6' }}>schedulo.com</span> were extremely helpful and prompt in dealing with my questions.
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
                  (finally) made the move to <span style={{ color: '#8b5cf6' }}>@schedulo</span> after I couldn't find how to edit events in the calendly dashboard and I must say - dash is 10/10<br/><br/>
                  Bravo <span style={{ color: '#8b5cf6' }}>@peer_rich</span> and team (I should have moved over years ago!)<br/><br/>
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
                  for the love of me, why do people still use Calendly? Just today I have seen products reference Calendly while they know of <span style={{ color: '#8b5cf6' }}>@schedulo</span><br/><br/>
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

            <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '48px', padding: '12px 24px', position: 'relative', zIndex: 1 }}>
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
                       <div style={{ width: '40px', height: '40px', opacity: 0.4 }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg></div>
                       <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product of the day</div>
                          <div style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>1st</div>
                       </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                       <div style={{ width: '40px', height: '40px', opacity: 0.4 }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg></div>
                       <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product of the week</div>
                          <div style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>1st</div>
                       </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                       <div style={{ width: '40px', height: '40px', opacity: 0.4 }}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg></div>
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
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr repeat(4, 1fr)', gap: '48px', alignItems: 'start' }}>
          
          {/* Logo & Compliance Column */}
          <div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#111827', marginBottom: '16px' }}>Schedulo.com</div>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, marginBottom: '24px' }}>
              Schedulo.com® and Schedulo® are a registered trademark by Schedulo.com, Inc. All rights reserved.
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
                    {name: 'iPhone', color: '#000'}, {name: 'Android', color: '#3ddc84'}, {name: 'Chrome', color: '#4285f4'},
                    {name: 'Safari', color: '#00c3ff'}, {name: 'Edge', color: '#0078d7'}, {name: 'Firefox', color: '#ff7139'},
                    {name: 'MacOS', color: '#000'}, {name: 'Windows', color: '#0078d7'}, {name: 'Linux', color: '#000'}
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
              {['iOS/Android App', 'Self-hosted', 'Pricing', 'Docs', 'Schedulo.ai', 'Enterprise', 'Integrations', 'Routing', 'Platform Atoms', 'Desktop App', 'FAQ', 'Enterprise API', 'Github'].map(link => (
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
  );
}
