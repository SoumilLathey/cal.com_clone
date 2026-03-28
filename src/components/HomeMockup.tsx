'use client';

import { useState, useEffect } from 'react';

const MOCKUPS = [
  {
    name: "Michael Oliver",
    title: "Legal Consultation",
    desc: "Discuss your legal matters with our experienced attorneys in a private consultation.",
    duration: "30m",
    locationIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <polygon points="14 12 14 17 22 17 22 7 14 7" />
      </svg>
    ),
    locationText: "Zoom",
    timezone: "Europe/London",
    sel: 9,
    dots: [6, 15]
  },
  {
    name: "Emma Brown",
    title: "Office Hours",
    desc: "Join a virtual meeting to discuss your child's academic progress and development plan.",
    duration: "15m",
    locationIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    locationText: "MS Teams",
    timezone: "America/New York",
    sel: 16,
    dots: [6]
  },
  {
    name: "Isabella Valce",
    title: "Photoshoot",
    desc: "Capture your special moments with our professional photography services today.",
    duration: "1h",
    locationIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    locationText: "Rock Wall Woods",
    timezone: "South America/Rio de Janeiro",
    sel: 7,
    dots: [1, 9]
  }
];

export default function HomeMockup() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % MOCKUPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = MOCKUPS[idx];

  // Map dates 1-30 to specific grid slots to match the visual
  const emptySlots = [0, 1, 2]; // For May 2025 starting on Thursday! (Wait, screenshot shows May 2025 starting on Thursday)

  return (
    <div key={idx} style={{ display: 'flex', height: '100%', animation: 'fadeIn 0.3s ease-in-out' }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0.8; transform: scale(0.99); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Left Mockup Panel */}
      <div style={{ width: '250px', borderRight: '1px solid #f3f4f6', padding: '32px 24px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#d1d5db', marginBottom: '10px', overflow: 'hidden' }}>
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} alt="Avatar" style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500, marginBottom: '2px', transition: 'all 0.3s' }}>{data.name}</div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#374151', marginBottom: '12px', transition: 'all 0.3s' }}>{data.title}</div>
        <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.4, marginBottom: '24px', fontWeight: 500, minHeight: '54px' }}>
          {data.desc}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['15m', '30m', '45m', '1h'].map(t => (
              <span key={t} style={{
                padding: '1px 6px', borderRadius: '4px', transition: 'all 0.3s',
                background: data.duration === t ? 'white' : '#f8f9fa',
                border: data.duration === t ? '1px solid #e5e7eb' : '1px solid transparent',
                color: data.duration === t ? '#374151' : 'inherit'
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
          {data.locationIcon}
          {data.locationText}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '11px', fontWeight: 500 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          {data.timezone} <span style={{ opacity: 0.5, fontSize: '9px' }}>▼</span>
        </div>
      </div>

      {/* Right Mockup Panel (Calendar) */}
      <div style={{ flex: 1, padding: '32px 24px' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#374151', marginBottom: '16px' }}>
          May <span style={{ color: '#9ca3af', fontWeight: 500 }}>2025</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', textAlign: 'center' }}>
          {['SUN', 'MON', 'TUE', 'WED', 'THU'].map(d => (
            <div key={d} style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', marginBottom: '8px' }}>{d}</div>
          ))}

          {/* Empty slots for May 2025 starts on Thu */}
          <div style={{ visibility: 'hidden' }}></div>
          <div style={{ visibility: 'hidden' }}></div>
          <div style={{ visibility: 'hidden' }}></div>

          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const isSel = day === data.sel;
            const hasDot = data.dots.includes(day);

            let bg = 'white';
            let color = '#9ca3af';

            if (isSel) {
              bg = '#1f2937';
              color = 'white';
            } else if ([1,2,6,7,8,15,16,20,21,22,23,27,28,29,30].includes(day)) {
              // Simulating standard clickable days based on screenshot
              bg = '#f3f4f6';
              color = '#111827';
            }

            return (
              <div key={day} style={{
                background: bg, color: color, borderRadius: '6px', padding: '10px 0', fontSize: '13px', fontWeight: 600,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', transition: 'all 0.3s'
              }}>
                {day}
                {hasDot && <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: isSel ? 'white' : '#4b5563' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
