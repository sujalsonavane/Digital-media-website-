'use client';

import React, { useRef } from 'react';
import { agencyConfig } from '@/data/agencyData';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

const STATEMENT_1_LINES = [
  'We design and build',
  'websites, brand systems,',
  'and digital products that',
  'work as hard as they look.',
];

const STATEMENT_2_LINES = [
  "Whether you're launching",
  'a product, rebuilding a',
  'brand, or replacing a tired',
  'site, one team takes it',
  'from sketch to live build.',
];

export const StatementSection: React.FC = () => {
  const { philosophy } = agencyConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
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
      if (prefersReducedMotion()) {
        gsap.set('.statement-line', { clearProps: 'all', rotationY: 0, opacity: 1 });
        return;
      }

      const isMobile = window.innerWidth < 768;
      const s1Lines = gsap.utils.toArray<HTMLElement>('.statement-1 .statement-line');
      const s2Lines = gsap.utils.toArray<HTMLElement>('.statement-2 .statement-line');

      if (!s1Lines.length || !s2Lines.length) return;

      // 3D Cylinder radius along Z-axis (exact match to Awake Agency reference)
      const zRadius = isMobile ? '-340px' : '-620px';

      // Set transformOrigin deep behind each line
      gsap.set([s1Lines, s2Lines], {
        transformOrigin: `50% 50% ${zRadius}`,
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      });

      // Statement 1 starts front and center (0deg), Statement 2 rotated 105deg to the right
      gsap.set(s1Lines, { rotationY: 0, opacity: 1 });
      gsap.set(s2Lines, { rotationY: 105, opacity: 0 });

      const scrollDistance = isMobile ? window.innerHeight * 1.0 : window.innerHeight * 1.5;

      // Pinned scroll scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: 'power2.inOut', duration: 1 },
      });

      // Subtle hold at beginning
      tl.to({}, { duration: 0.3 });

      // Rotate Statement 1 out to the left (-105deg) with line stagger
      tl.to(s1Lines, {
        rotationY: -105,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
      });

      // Simultaneously rotate Statement 2 in from the right (0deg) with line stagger
      tl.to(
        s2Lines,
        {
          rotationY: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
        },
        '<'
      );

      // Hold at end before unpinning
      tl.to({}, { duration: 0.4 });

      // Blueprint vector background smooth rotation scrub
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          rotate: 32,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
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

      {/* Studio Philosophy Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#161d25]/12 text-[11px] font-bold uppercase tracking-widest text-[#161d25] mb-8 shadow-sm backdrop-blur-sm z-20">
        <span className="w-2 h-2 rounded-full bg-[#ff003d] animate-pulse" aria-hidden="true" />
        <span>{philosophy.badge || 'Our Philosophy'}</span>
      </div>

      {/* Accessible Screen Reader Announcement */}
      <h2 className="sr-only">
        We design and build websites, brand systems, and digital products that work as hard as they look. Whether you&apos;re launching a product, rebuilding a brand, or replacing a tired site, one team takes it from sketch to live build.
      </h2>

      {/* 3D Cylindrical Carousel Stack (Exact Match to Video 2 Reference) */}
      <div
        ref={stackRef}
        style={{
          transform: `translate3d(${-mousePos.x * 12}px, ${-mousePos.y * 12}px, 0)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          perspective: '1600px',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-5xl text-center z-10 px-4"
        aria-hidden="true"
      >
        <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full">
          {/* Statement 1 (We design and build...) */}
          <div
            className="statement-block statement-1 [grid-area:1/1] w-full flex flex-col items-center justify-center text-center font-display text-[clamp(1.4rem,4.2vw,3.25rem)] font-bold tracking-tight text-[#161d25] leading-[1.2]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {STATEMENT_1_LINES.map((line, idx) => (
              <span
                key={idx}
                className={`statement-line block will-change-transform ${
                  idx === STATEMENT_1_LINES.length - 1
                    ? 'text-[#ff003d] font-black underline decoration-[#ff003d]/30 underline-offset-8'
                    : ''
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                }}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Statement 2 (Whether you're launching...) */}
          <div
            className="statement-block statement-2 [grid-area:1/1] w-full flex flex-col items-center justify-center text-center font-display text-[clamp(1.4rem,4.2vw,3.25rem)] font-bold tracking-tight text-[#161d25] leading-[1.2]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {STATEMENT_2_LINES.map((line, idx) => (
              <span
                key={idx}
                className={`statement-line block will-change-transform ${
                  idx === STATEMENT_2_LINES.length - 1
                    ? 'text-[#ff003d] font-black'
                    : ''
                }`}
                style={{
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
