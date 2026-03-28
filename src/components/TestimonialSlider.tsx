'use client';

import React, { useState, useRef, useEffect } from 'react';

const TESTIMONIALS = [
  {
    author: "Kent C. Dodds",
    role: "Founder of EpicWeb.dev",
    content: "\"I just migrated from Calendly to Cal.com.\"",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kent",
    avatarBg: "#e5e7eb"
  },
  {
    author: "Aria Minaei",
    role: "CEO, Theatre.js",
    content: "\"Just gave it a go and it's definitely the easiest meeting I've ever scheduled!\"",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria",
    avatarBg: "#d1d5db"
  },
  {
    author: "Ant Wilson",
    role: "Co-Founder & CTO, Supabase",
    content: "\"I finally made the move to Cal.com after I couldn't find how to edit events in the Calendly dashboard.\"",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ant",
    avatarBg: "#fcd34d"
  },
  {
    author: "Flo Merian",
    role: "Product Marketing, Mintlify",
    content: "\"More elegant than Calendly, more open than SavvyCal, Cal.com works and it feels just right.\"",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Flo",
    avatarBg: "#93c5fd"
  },
  {
    author: "Guillermo Rauch",
    role: "CEO, Vercel",
    content: "\"I think Cal.com has a very good chance of creating a new category around being both great and well designed.\"",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guillermo",
    avatarBg: "#111827"
  }
];

export default function TestimonialSlider() {
  const duplicatedList = Array(6).fill(TESTIMONIALS).flat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Initialize scroll position to the middle to allow scrolling left and right
  useEffect(() => {
    if (scrollRef.current) {
      const startIndex = Math.floor(duplicatedList.length / 2);
      const child = scrollRef.current.children[startIndex] as HTMLElement;
      if (child) {
        const scrollTarget = child.offsetLeft - scrollRef.current.offsetWidth / 2 + child.offsetWidth / 2;
        scrollRef.current.scrollTo({ left: scrollTarget, behavior: 'auto' });
        setActiveIndex(startIndex);
      }
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const containerCenter = scrollLeft + offsetWidth / 2;

    let minDistance = Infinity;
    let newIndex = activeIndex;

    const children = Array.from(scrollRef.current.children);
    children.forEach((child: any, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        newIndex = index;
      }
    });

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    if (isHovered || isDragging) return;

    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      
      const children = Array.from(scrollRef.current.children);
      const nextIndex = activeIndex + 1;
      
      if (nextIndex < children.length) {
        const nextChild = children[nextIndex] as HTMLElement;
        const scrollTarget = nextChild.offsetLeft - scrollRef.current.offsetWidth / 2 + nextChild.offsetWidth / 2;
        scrollRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      } else {
         const resetIdx = Math.floor(TESTIMONIALS.length / 2);
         const resetChild = children[resetIdx] as HTMLElement;
         const scrollTarget = resetChild.offsetLeft - scrollRef.current.offsetWidth / 2 + resetChild.offsetWidth / 2;
         scrollRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, isHovered, isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div 
      style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '0 0' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); onMouseUpOrLeave(); }}
    >
      <style>{`
        .testimonial-track-container {
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
        }
        .testimonial-track {
          display: flex;
          align-items: stretch;
          width: 100%;
          overflow-x: auto;
          /* Handle grab snapping */
          scroll-behavior: smooth;
        }
        /* Only apply snapping when NOT dragging for smoother manual drag */
        .testimonial-track:not(.dragging) {
          scroll-snap-type: x mandatory;
        }
        .testimonial-track::-webkit-scrollbar {
          display: none;
        }
        .testimonial-cell {
          position: relative;
          padding: 24px;
          border-right: 1px solid #e5e7eb;
          width: 440px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          scroll-snap-align: center;
        }
        
        .testimonial-fade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          /* Stronger edge gradient to hide the cutoff native edges beautifully */
          background: linear-gradient(to right, #f3f4f6 0%, rgba(243,244,246,0) 15%, rgba(243,244,246,0) 85%, #f3f4f6 100%);
        }

        .crosshair {
          position: absolute;
          color: #d1d5db;
          font-size: 14px;
          line-height: 1;
          background: #f3f4f6;
          z-index: 3;
        }
        .crosshair.tr { top: -7px; right: -4.5px; }
        .crosshair.br { bottom: -7px; right: -4.5px; }
      `}</style>
      
      <div className="testimonial-fade" />
      
      <div className="testimonial-track-container">
        <div 
          className={`testimonial-track ${isDragging ? 'dragging' : ''}`}
          ref={scrollRef} 
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {duplicatedList.map((t, i) => {
            const isActive = activeIndex === i;
            return (
              <div key={i} className="testimonial-cell">
                <div className="crosshair tr">+</div>
                <div className="crosshair br">+</div>

                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '36px 32px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isActive ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none',
                  minHeight: '260px',
                  opacity: isActive ? 1 : 0.4,
                  transition: 'opacity 0.4s ease, box-shadow 0.4s ease',
                  userSelect: 'none'
                }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', lineHeight: 1.4, letterSpacing: '-0.03em', marginBottom: '32px', flex: 1 }}>
                    {t.content}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', overflow: 'hidden', background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                       <img src={t.avatar} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#374151', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t.author}</div>
                      <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{t.role}</div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
