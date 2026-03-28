'use client';

import React from 'react';

const LOGOS = [
  { name: 'Vercel', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L24 22H0L12 1Z"/></svg> },
  { name: 'supabase', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/></svg> },
  { name: 'ûdemy', isText: true, font: 'serif', weight: 800 },
  { name: 'Rho', isText: true, font: 'serif', weight: 600 },
  { name: 'deel.', isText: true, weight: 800 },
  { name: 'Framer', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0h12v12H12l-6-6 6-6zM0 12h12v12l-6-6-6 6V12z"/></svg> },
  { name: 'ramp', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg> },
  { name: 'PlanetScale', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> },
  { name: 'coinbase', isText: true, weight: 800 },
  { name: 'storyblok', icon: <span style={{ display: 'inline-flex', padding: '2px 5px', background: '#111827', color: 'white', borderRadius: '3px', fontSize: '11px', fontWeight: 800, lineHeight: 1 }}>B</span> },
  { name: 'AngelList', isText: true, weight: 700 },
  { name: 'Raycast', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 4l6 6-6 6-6-6 6-6z"/></svg> },
];

export default function LogoSlider() {
  const doubledLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      overflow: 'hidden', 
      padding: '20px 0',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
    }}>
      <style>{`
        @keyframes endlessScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .scrolling-logos {
          display: flex;
          align-items: center;
          gap: 64px;
          width: max-content;
          animation: endlessScroll 40s linear infinite;
        }
      `}</style>

      <div className="scrolling-logos">
        {doubledLogos.map((logo, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#111827', 
            fontSize: '18px', 
            fontWeight: logo.weight || 700,
            fontFamily: logo.font === 'serif' ? 'serif' : 'inherit',
            whiteSpace: 'nowrap'
          }}>
            {logo.icon}
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
