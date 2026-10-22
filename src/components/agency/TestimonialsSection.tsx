'use client';

import React, { useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  metric: string;
  metricTarget: number;
  metricPrefix?: string;
  metricSuffix: string;
  metricLabel: string;
  year: string;
  avatarText: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'Luminous re-engineered our platform architecture from the ground up. Global LCP dropped from 3.2s to 0.38s, directly driving an immediate 142% lift in enterprise conversion velocity.',
    author: 'Marcus Thorne',
    title: 'Head of Engineering',
    company: 'Aetheria Systems',
    metric: '+142%',
    metricTarget: 142,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'Enterprise Conversion Lift',
    year: '2026',
    avatarText: 'MT',
  },
  {
    id: 't-2',
    quote:
      'The cross-platform interface feels indistinguishable from pure native Swift. The tactile feedback, encrypted synchronization, and fluid 60fps telemetry established immediate trust among our healthcare partners.',
    author: 'Elena Rostova',
    title: 'VP of Product',
    company: 'Orbital Health',
    metric: '4.9★',
    metricTarget: 4.9,
    metricPrefix: '',
    metricSuffix: '★',
    metricLabel: 'App Store Rating',
    year: '2025',
    avatarText: 'ER',
  },
  {
    id: 't-3',
    quote:
      'Their motion design and audio mastering elevated our commercial campaign into an editorial cinematic piece that generated over 3 million organic impressions in its opening fortnight.',
    author: 'Julian Sterling',
    title: 'Creative Director',
    company: 'Lumina Media Group',
    metric: '3.2M+',
    metricTarget: 3.2,
    metricPrefix: '',
    metricSuffix: 'M+',
    metricLabel: 'Organic Reel Impressions',
    year: '2025',
    avatarText: 'JS',
  },
  {
    id: 't-4',
    quote:
      'Luminous unified our disparate marketing data into a real-time executive cockpit. We eliminated 40% in wasted ad spend within 45 days of deployment.',
    author: 'David Lin',
    title: 'Co-Founder & COO',
    company: 'Vector Enterprise',
    metric: '-40%',
    metricTarget: 40,
    metricPrefix: '-',
    metricSuffix: '%',
    metricLabel: 'Ad Spend Reduction',
    year: '2024–2026',
    avatarText: 'DL',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const activeItem = TESTIMONIALS[activeIdx];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // 1. Entrance reveal on scroll
      gsap.fromTo(
        '.testimonial-hero-card',
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      // 2. Animated Counter for the active metric
      const counterEl = document.querySelector('.metric-animated-value');
      if (counterEl) {
        const target = activeItem.metricTarget;
        const prefix = activeItem.metricPrefix || '';
        const suffix = activeItem.metricSuffix || '';
        const isDecimal = target % 1 !== 0;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          onUpdate: () => {
            if (counterEl) {
              const displayVal = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
              counterEl.textContent = `${prefix}${displayVal}${suffix}`;
            }
          },
        });
      }

      // 3. Staggered tab strip entrance
      gsap.fromTo(
        '.testimonial-tab-btn',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.testimonial-tabs-row',
            start: 'top 85%',
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [activeIdx] }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Concept Testimonials and Representative Portfolio Outcomes"
      className="testimonials-section relative z-20 bg-white text-[#161d25] rounded-[var(--r-panel)] px-[var(--inset)] py-16 sm:py-24 md:py-28 overflow-hidden shadow-sm"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-3">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff003d] block mb-2">
              [ 05 // Concept Benchmarks & Demonstration Reviews ]
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#161d25] leading-none">
              CLIENT TESTIMONIALS.
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-[#8c9196] tracking-wider uppercase">
            Representative Demonstration Feedback & Concept Project Metrics
          </span>
        </div>

        {/* Honest Demo Content Disclaimer Notice Banner */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#f4f5f8] border border-[#e2e4e9] text-xs text-[#555d65] flex items-start sm:items-center gap-3 shadow-xs">
          <span className="text-sm font-bold text-[#ff003d] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true">ⓘ</span>
          <p className="leading-relaxed">
            <strong>Portfolio Demonstration Notice:</strong> The testimonials, partner names, and quantitative metrics below represent illustrative concept models designed to showcase our architecture and quality standards. Verified commercial client references and case metrics are provided upon enterprise inquiry.
          </p>
        </div>

        {/* Featured Quote Stage with Scroll Animation */}
        <div className="testimonial-hero-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f7f8fa] border border-[#e7e7ea] rounded-3xl p-6 sm:p-10 md:p-14 shadow-md transition-all duration-300">
          {/* Main Quote Column (Left 8) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Quote Marks & Category */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif text-5xl sm:text-6xl leading-none text-[#ff003d] select-none">
                “
              </span>
          <span className="text-xs font-mono font-bold uppercase text-[#8c9196] tracking-wider">
            {activeItem.company} {'// '}Concept Case Partner
          </span>
        </div>

        {/* Quote Text */}
        <blockquote className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#161d25] leading-snug tracking-tight mb-8">
          {activeItem.quote}
        </blockquote>

        {/* Author Byline */}
        <div className="flex items-center gap-4 pt-6 border-t border-[#161d25]/10">
          <div className="w-12 h-12 rounded-full bg-[#161d25] text-white flex items-center justify-center font-bold text-sm tracking-wide shrink-0 shadow-sm">
            {activeItem.avatarText}
          </div>
          <div>
            <div className="font-bold text-base text-[#161d25] tracking-tight">
              {activeItem.author}
            </div>
            <div className="text-xs text-[#8c9196] font-medium">
              {activeItem.title}, <span className="font-semibold text-[#161d25]">{activeItem.company}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Highlight Card (Right 4) with Live Number Animation */}
      <div className="lg:col-span-4 bg-[#161d25] text-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffa3b8] mb-2 block">
          Benchmark Target
        </span>
        <div className="metric-animated-value font-display text-5xl sm:text-6xl font-black text-white tracking-tight my-2">
          {activeItem.metric}
        </div>
        <span className="text-xs font-bold text-white/90 uppercase tracking-wider block">
          {activeItem.metricLabel}
        </span>
        <span className="text-[10px] font-mono text-white/60 mt-3 pt-3 border-t border-white/10 w-full block">
          Demonstration benchmark for {activeItem.year} sprint
        </span>
      </div>
    </div>

        {/* Tab Selector Strip */ }
  <div className="testimonial-tabs-row grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
    {TESTIMONIALS.map((item, idx) => {
      const isSelected = activeIdx === idx;
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => setActiveIdx(idx)}
          className={`testimonial-tab-btn p-4 rounded-2xl border text-left transition-all cursor-pointer ${isSelected
            ? 'bg-[#ff003d] text-white border-[#ff003d] shadow-md scale-[1.02]'
            : 'bg-white text-[#161d25] border-[#e7e7ea] hover:bg-[#f7f8fa]'
            }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs sm:text-sm tracking-tight truncate">
              {item.company}
            </span>
            <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-white' : 'text-[#ff003d]'}`}>
              {item.metric}
            </span>
          </div>
          <span className={`text-[11px] truncate block ${isSelected ? 'text-white/80' : 'text-[#8c9196]'}`}>
            {item.author}
          </span>
        </button>
      );
    })}
  </div>
      </div >
    </section >
  );
}
