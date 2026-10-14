'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

interface ProcessStep {
  number: string;
  sprint: string;
  duration: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  checkpoint: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    sprint: 'Sprint 01',
    duration: 'Weeks 1 — 2',
    title: 'Discovery & Telemetry Audit',
    headline: 'Deconstruct requirements and establish performance baselines.',
    description:
      'We begin with a deep technical and commercial audit: analyzing legacy bottlenecks, auditing telemetry drop-offs, aligning on brand art direction, and scoping the core design tokens.',
    deliverables: [
      'Technical Architecture Blueprint',
      'Telemetry & Funnel Audit Matrix',
      'Art Direction Moodboards & Tone of Voice',
      'Core Design Tokens & Typography Spec',
    ],
    checkpoint: 'Milestone 01 Signoff: Technical Architecture & Scope Lock',
  },
  {
    number: '02',
    sprint: 'Sprint 02',
    duration: 'Weeks 3 — 4',
    title: 'Interactive Prototyping & Motion',
    headline: 'Iterate at full fidelity with interactive touch & motion.',
    description:
      'We skip static wireframes and prototype directly in high-fidelity Figma and live code sandboxes. Motion choreographies, WebGL shaders, and tactile micro-interactions are tuned for maximum responsiveness.',
    deliverables: [
      'Figma Design System & Component Library',
      'Interactive 60fps Motion Choreography',
      'Custom 3D / Asset Mockups & Art Direction',
      'Responsive Mobile & Desktop Prototype',
    ],
    checkpoint: 'Milestone 02 Signoff: Interactive Design & Motion Walkthrough',
  },
  {
    number: '03',
    sprint: 'Sprint 03',
    duration: 'Weeks 5 — 6',
    title: 'High-Velocity Edge Engineering',
    headline: 'Build with Next.js 16, TypeScript, and modern headless APIs.',
    description:
      'Production engineering begins: clean component architecture, headless CMS wiring, real-time database endpoints, and edge CDN routing. Every line of code is structured for sub-second paint speeds.',
    deliverables: [
      'Next.js 16 Production Repository (TypeScript)',
      'Headless CMS Schema & Content Migration',
      'GSAP / ScrollTrigger Motion Implementation',
      'WCAG 2.1 AA Accessibility & Contrast Passes',
    ],
    checkpoint: 'Milestone 03 Signoff: Private Staging Environment Review',
  },
  {
    number: '04',
    sprint: 'Sprint 04',
    duration: 'Weeks 7+',
    title: 'Hardening & Global Launch',
    headline: 'Telemetry verification, SLA testing, and global deployment.',
    description:
      'We perform multi-device stress testing, Core Web Vitals optimization, automated Lighthouse runs, and analytics telemetry verification before pointing production DNS to the global edge network.',
    deliverables: [
      'Sub-0.4s Global LCP Guarantee',
      'Telemetry Funnel & Executive Dashboard Handover',
      'Complete Intellectual Property & Repository Transfer',
      '30-Day Post-Launch Warranty & Support',
    ],
    checkpoint: 'Milestone 04 Signoff: Production Go-Live & Handover',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('.process-step-card', { opacity: 1, y: 0 });
        return;
      }

      // 1. Pink Spline Ribbon scrub along process
      if (pathRef.current) {
        try {
          const pathLength = pathRef.current.getTotalLength() || 2200;
          gsap.set(pathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 1.2,
            },
          });
        } catch {
          gsap.set(pathRef.current, { strokeDashoffset: 0 });
        }
      }

      // 2. Sequential card entrance reveal
      gsap.fromTo(
        '.process-step-card',
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-cards-grid',
            start: 'top 80%',
          },
        }
      );

      // 3. Dynamic countdown / stage tracker linked to scroll progress
      if (counterRef.current) {
        const dummy = { val: 1 };
        gsap.to(dummy, {
          val: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
            onUpdate: () => {
              const currentStep = Math.min(3, Math.floor(dummy.val) - 1);
              setActiveStep(Math.max(0, currentStep));
              if (counterRef.current) {
                counterRef.current.innerText = `0${Math.min(4, Math.max(1, Math.round(dummy.val)))}`;
              }
            },
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Studio Delivery Methodology and Sprint Process"
      className="process-section relative z-20 bg-[#111215] text-white rounded-[var(--r-panel)] px-[var(--inset)] py-16 sm:py-24 md:py-28 overflow-hidden select-none border-t border-white/10 shadow-xl"
    >
      {/* Background Pink Sweeping Spline Loop (Awake Reference Theme) */}
      <svg
        className="absolute top-[5%] left-[3%] w-[94%] h-[90%] pointer-events-none z-[1] hidden md:block opacity-35"
        viewBox="0 0 1100 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M 50 150 C 400 80, 950 200, 900 500 C 850 800, 200 700, 150 950 C 100 1150, 700 1100, 950 1150"
          stroke="#ffa3b8"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ff003d] animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff003d]">
                [ 03 // Sprint Methodology 01 — 04 ]
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.92]">
              HOW WE WORK.
            </h2>
          </div>

          {/* Live Scroll Counter Gauge */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/15 px-5 py-3 rounded-2xl backdrop-blur-md shrink-0">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                Active Phase
              </span>
              <span className="text-xs font-bold text-[#ffa3b8] uppercase font-mono">
                {PROCESS_STEPS[activeStep].title.split('&')[0]}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-white/20" />
            <span
              ref={counterRef}
              className="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight"
            >
              01
            </span>
            <span className="text-xs font-mono text-white/50 -ml-2">/04</span>
          </div>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="process-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <article
                key={step.number}
                className={`process-step-card relative rounded-3xl p-7 sm:p-9 transition-all duration-300 border flex flex-col justify-between overflow-hidden group ${
                  isActive
                    ? 'bg-[#181a20] border-[#ff003d]/60 shadow-[0_20px_50px_rgba(255,0,61,0.18)]'
                    : 'bg-[#14161b] border-white/10 hover:border-white/25 hover:bg-[#181a20]'
                }`}
              >
                {/* Massive Watermark Numeral */}
                <span className="absolute -top-6 -right-3 font-display text-8xl sm:text-9xl font-black text-white/[0.04] select-none pointer-events-none group-hover:text-[#ff003d]/[0.08] transition-colors duration-500">
                  {step.number}
                </span>

                {/* Top Badge Row */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#ff003d] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                      {step.sprint}
                    </span>
                    <span className="text-xs font-mono text-[#8c9196] font-semibold">
                      // {step.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-2 group-hover:text-[#ff003d] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-[#ffa3b8] mb-3 leading-relaxed">
                    {step.headline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#8c9196] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist & Checkpoint */}
                <div className="space-y-4 pt-5 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 text-xs text-white/90">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
                    <span className="font-mono text-[11px] text-white/70">
                      <strong>Signoff:</strong> {step.checkpoint}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Sprint Assurance Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase text-[#ff003d] tracking-widest block">
              Continuous Visibility
            </span>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Every sprint features private staging deployment previews, bi-weekly video walkthroughs, and direct WhatsApp / Slack engineering channels.
            </p>
          </div>
          <a
            href="#estimator"
            className="px-6 py-2.5 rounded-full bg-white text-[#111215] font-display text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 whitespace-nowrap"
          >
            Estimate Your Timeline ↓
          </a>
        </div>
      </div>
    </section>
  );
}
