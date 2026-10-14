'use client';

import React, { useState } from 'react';
import { playClickSound } from '@/utils/sound';

interface ProcessStep {
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
  const [activeStep, setActiveStep] = useState(0);

  const step = PROCESS_STEPS[activeStep];

  const handleSelect = (idx: number) => {
    playClickSound();
    setActiveStep(idx);
  };

  return (
    <section
      id="process"
      aria-label="Studio Delivery Methodology and Sprint Process"
      className="process-section relative z-20 bg-[#111215] text-white rounded-[var(--r-panel)] px-[var(--inset)] py-14 sm:py-20 md:py-24 overflow-hidden select-none border-t border-white/10"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff003d] block mb-2">
              [ Methodology // 01 — 04 ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
              HOW WE WORK
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8c9196] max-w-md font-medium leading-relaxed">
            Our agile sprint framework guarantees rapid turnaround, zero guesswork, and predictable delivery from raw concept to live production.
          </p>
        </div>

        {/* 4 Sprint Step Navigation Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {PROCESS_STEPS.map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.sprint}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#ff003d] text-white border-[#ff003d] shadow-xl scale-[1.02]'
                    : 'bg-white/5 text-white/80 border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/70">
                    {item.sprint}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'}`}>
                    {item.duration}
                  </span>
                </div>
                <div className="font-display text-sm sm:text-base font-bold tracking-tight text-white mt-1 truncate">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Sprint Detail Card */}
        <div className="bg-[#16181d] border border-white/15 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Narrative Overview (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#ff003d]/20 text-[#ffa3b8] text-xs font-mono font-bold uppercase tracking-wider border border-[#ff003d]/30">
                  {step.sprint} // {step.duration}
                </span>
                <span className="text-xs font-mono text-[#8c9196] uppercase">
                  Sprint Milestone
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
                {step.headline}
              </h3>

              <p className="text-sm sm:text-base text-[#c4c7cc] leading-relaxed">
                {step.description}
              </p>

              {/* Client Visibility Checkpoint */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] shrink-0" />
                <span className="text-xs text-white/90 font-medium">
                  <strong>Client Checkpoint:</strong> {step.checkpoint}
                </span>
              </div>
            </div>

            {/* Right: Key Deliverables List (5 cols) */}
            <div className="lg:col-span-5 bg-[#111215] border border-white/10 rounded-2xl p-6 sm:p-7">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff003d] block mb-4">
                Sprint Deliverables
              </span>
              <ul className="space-y-3">
                {step.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/90">
                    <span className="font-mono text-[#ff003d] font-bold shrink-0">
                      0{i + 1}.
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
