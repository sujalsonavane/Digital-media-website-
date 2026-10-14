'use client';

import React, { useRef } from 'react';
import { agencyConfig } from '@/data/agencyData';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

export const StatementSection: React.FC = () => {
  const { philosophy } = agencyConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<SVGSVGElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Desktop 3D Perspective Scrub (Matching Awake Reference)
        gsap.fromTo(
          textRef.current,
          {
            rotateX: -24,
            z: -60,
            opacity: 0.25,
            transformPerspective: 1600,
            transformOrigin: '50% 50%',
          },
          {
            rotateX: 0,
            z: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              end: 'center 45%',
              scrub: 1,
            },
          }
        );

        // Technical CAD Vector Background Rotation Scrub
        gsap.to(bgRef.current, {
          rotate: 18,
          scale: 1.06,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      } else {
        // Mobile 2D Smooth Scroll Fade & Slide
        gsap.fromTo(
          textRef.current,
          { opacity: 0.35, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'center 50%',
              scrub: 0.8,
            },
          }
        );
      }

      // Secondary statement smooth entrance
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0.25, y: 18 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center 40%',
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="Agency Philosophy"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="statement-panel relative bg-[#f1f1f3] text-[#161d25] rounded-[var(--r-panel)] px-[var(--inset)] py-20 sm:py-28 md:py-36 min-h-[36rem] sm:min-h-[44rem] flex flex-col justify-center items-center overflow-hidden select-none"
    >
      {/* Precision CAD Blueprint Vector Background with Mouse Parallax (Matching Awake Reference) */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, 0)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <svg
          ref={bgRef}
          className="cad-blueprint-bg w-[110%] h-[110%] max-w-none opacity-30 origin-center"
          viewBox="0 0 1400 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer Dashed Orbit */}
          <circle cx="700" cy="350" r="320" stroke="#161d25" strokeWidth="0.75" strokeDasharray="4 6" className="animate-[spin_120s_linear_infinite]" />
          {/* Main Concentric Solid Circle */}
          <circle cx="700" cy="350" r="220" stroke="#161d25" strokeWidth="1" />
          {/* Inner Counter-Rotating Dashed Orbit */}
          <circle cx="700" cy="350" r="140" stroke="#ff003d" strokeWidth="0.85" strokeDasharray="3 5" opacity="0.4" className="animate-[spin_90s_linear_infinite_reverse]" />
          <circle cx="700" cy="350" r="60" stroke="#161d25" strokeWidth="0.75" strokeDasharray="2 4" />
          
          {/* Precision Center Crosshairs */}
          <line x1="80" y1="350" x2="1320" y2="350" stroke="#161d25" strokeWidth="0.75" strokeDasharray="4 4" />
          <line x1="700" y1="20" x2="700" y2="680" stroke="#161d25" strokeWidth="0.75" strokeDasharray="4 4" />

          {/* Diagonal Architectural Guide Lines */}
          <line x1="200" y1="100" x2="1200" y2="600" stroke="#161d25" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.5" />
          <line x1="200" y1="600" x2="1200" y2="100" stroke="#161d25" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.5" />

          {/* Architect drafting box and control nodes */}
          <rect x="560" y="220" width="280" height="260" stroke="#161d25" strokeWidth="0.75" />
          <rect x="556" y="216" width="8" height="8" fill="#ff003d" />
          <rect x="836" y="216" width="8" height="8" fill="#161d25" />
          <rect x="556" y="476" width="8" height="8" fill="#161d25" />
          <rect x="836" y="476" width="8" height="8" fill="#ff003d" />

          {/* Compass Drafting Arc & Anchor Points */}
          <path d="M 460 480 A 280 280 0 0 1 940 220" stroke="#ff003d" strokeWidth="1.25" opacity="0.6" />
          <circle cx="460" cy="480" r="5" fill="#ff003d" />
          <circle cx="940" cy="220" r="5" fill="#ff003d" />
          
          {/* Engineering Coordinates Text */}
          <text x="570" y="206" fill="#161d25" fontSize="10" fontFamily="monospace" letterSpacing="0.1em" opacity="0.7">[ SPEC 01 // ARCHITECTURAL DIRECTIVE ]</text>
          <text x="570" y="504" fill="#161d25" fontSize="10" fontFamily="monospace" letterSpacing="0.1em" opacity="0.7">[ 28°36&apos;N  77°12&apos;E // LIVE BUILD ]</text>
        </svg>
      </div>

      {/* Corner Precision Plus Markers */}
      <div className="absolute top-6 left-6 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none">+</div>
      <div className="absolute top-6 right-6 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none">+</div>
      <div className="absolute bottom-6 left-6 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none">+</div>
      <div className="absolute bottom-6 right-6 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none">+</div>

      {/* Editorial Content (Pure Typography matching Awake Reference) */}
      <div
        style={{
          transform: `translate3d(${-mousePos.x * 12}px, ${-mousePos.y * 12}px, 0)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative max-w-4xl text-center z-10 px-4 flex flex-col items-center"
      >
        {/* Studio Philosophy Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#161d25]/12 text-[11px] font-bold uppercase tracking-widest text-[#161d25] mb-8 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#ff003d] animate-pulse" aria-hidden="true" />
          <span>Our Philosophy</span>
        </div>

        <h2
          ref={textRef}
          style={{ willChange: 'transform, opacity' }}
          className="statement-text font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#161d25] leading-[1.16] mb-8"
        >
          <span>We design and build websites,</span>{' '}
          <span className="block sm:inline">apps, and digital media that</span>{' '}
          <span className="text-[#ff003d] font-black underline decoration-[#ff003d]/30 underline-offset-8 block sm:inline">
            work as hard as they look.
          </span>
        </h2>

        <p
          ref={subtextRef}
          className="statement-subtext max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#5a626a] font-normal leading-relaxed"
        >
          {philosophy.subtext}
        </p>
      </div>
    </section>
  );
};
