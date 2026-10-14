'use client';

import React, { useState, useEffect, useRef } from 'react';
import HeaderNav from './HeaderNav';
import { agencyConfig } from '@/data/agencyData';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isLoaderFinished, setIsLoaderFinished] = useState<boolean>(false);
  const [istTime, setIstTime] = useState<string>('');
  const containerRef = useRef<HTMLElement>(null);

  // Live India Standard Time (IST) Clock
  useEffect(() => {
    const updateIST = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setIstTime(formatter.format(new Date()));
      } catch {
        setIstTime('19:46');
      }
    };
    updateIST();
    const interval = setInterval(updateIST, 10000);
    return () => clearInterval(interval);
  }, []);

  // Numeric Preloader Counter (0% -> 100%)
  useEffect(() => {
    let current = 0;
    const updateCounter = () => {
      const step = Math.max(1, Math.floor((100 - current) * 0.12));
      current += step;
      if (current >= 100) {
        setLoadPercent(100);
        setTimeout(() => setIsLoaderFinished(true), 180);
      } else {
        setLoadPercent(current);
        requestAnimationFrame(updateCounter);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Coordinated GSAP Headline, Copy & Meta Entrance
  useGSAP(
    () => {
      if (!isLoaderFinished) return;

      if (prefersReducedMotion()) {
        gsap.set(
          ['.headline-line', '.hero-kicker-text', '.hero-meta-rule', '.hero-meta-content'],
          { clearProps: 'all', opacity: 1, y: 0, scaleX: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Masked Headline Reveal
      tl.fromTo(
        '.headline-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }
      );

      // 2. Studio Kicker Fade & Float
      tl.fromTo(
        '.hero-kicker-text',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.45'
      );

      // 3. Meta Bar Rule Draw & Content Fade
      tl.fromTo(
        '.hero-meta-rule',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.5, ease: 'power2.inOut' },
        '-=0.3'
      );

      tl.fromTo(
        '.hero-meta-content',
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        '-=0.25'
      );
    },
    { scope: containerRef, dependencies: [isLoaderFinished] }
  );

  return (
    <header
      ref={containerRef}
      className="relative bg-[#ff003d] text-white rounded-[var(--r-panel)] min-h-[calc(100dvh-var(--frame)*2)] h-auto sm:h-[calc(100dvh-var(--frame)*2)] sm:min-h-[38rem] sm:max-h-[50rem] lg:min-h-[42rem] lg:h-[calc(100vh-2.5rem)] lg:max-h-[54rem] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between overflow-hidden shadow-[0_20px_40px_rgba(255,0,61,0.2)] select-none"
    >
      {/* 0. Numeric Loading Counter Overlay */}
      {!isLoaderFinished && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 z-50 bg-[#ff003d] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
        >
          <div className="font-mono text-5xl sm:text-7xl font-black tracking-tight text-white select-none">
            {loadPercent.toString().padStart(2, '0')}%
          </div>
          <div className="mt-3 text-xs uppercase tracking-widest font-bold text-white/80">
            Initializing {agencyConfig.name}
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <HeaderNav />

      {/* Monumental Headline & Studio Kicker Lockup (Exact Awake Reference Layout) */}
      <div className="my-auto py-4 sm:py-6 z-[5] flex flex-col justify-center">
        {/* Desktop & Tablet Layout (>= 640px) */}
        <div className="hidden sm:block font-extrabold uppercase select-none text-[clamp(3.1rem,6.6vw,6.4rem)] leading-[0.93]">
          {/* Row 1: WE (left) ... BUILD (right) */}
          <div className="overflow-hidden py-1">
            <div className="headline-line flex justify-between items-baseline w-full tracking-[-0.03em]">
              <span>WE</span>
              <span>BUILD</span>
            </div>
          </div>

          {/* Row 2: WEBSITES (left) ... PEOPLE (right) */}
          <div className="overflow-hidden py-1">
            <div className="headline-line flex justify-between items-baseline w-full tracking-[-0.03em]">
              <span>WEBSITES</span>
              <span>PEOPLE</span>
            </div>
          </div>

          {/* Row 3: REMEMBER. (left) ... [Studio Kicker Paragraph] (right) */}
          <div className="overflow-hidden py-1">
            <div className="headline-line flex justify-between items-end w-full gap-8">
              <span className="tracking-[-0.015em]">REMEMBER.</span>

              {/* Studio Kicker Copy directly in Row 3 Right */}
              <div className="hero-kicker-text w-full sm:w-[19rem] md:w-[22rem] lg:w-[25rem] pb-1.5 font-normal normal-case tracking-normal">
                <p className="text-xs sm:text-[13px] md:text-sm lg:text-[0.925rem] text-white/95 leading-relaxed text-left font-normal">
                  {agencyConfig.kicker}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout (< 640px) */}
        <div className="sm:hidden font-extrabold uppercase select-none text-[clamp(2.1rem,9.2vw,3.1rem)] leading-[0.94] py-2">
          {/* Row 1: WE ... BUILD */}
          <div className="overflow-hidden py-1">
            <div className="headline-line flex justify-between items-baseline w-full tracking-[-0.035em]">
              <span>WE</span>
              <span>BUILD</span>
            </div>
          </div>

          {/* Row 2: WEBSITES ... PEOPLE */}
          <div className="overflow-hidden py-1">
            <div className="headline-line flex justify-between items-baseline w-full tracking-[-0.035em]">
              <span>WEBSITES</span>
              <span>PEOPLE</span>
            </div>
          </div>

          {/* Row 3: REMEMBER. */}
          <div className="overflow-hidden py-1">
            <div className="headline-line flex justify-start items-baseline w-full tracking-[-0.02em]">
              <span>REMEMBER.</span>
            </div>
          </div>

          {/* Studio Kicker on Mobile (cleanly positioned under REMEMBER.) */}
          <div className="hero-kicker-text mt-4 pt-2 max-w-sm">
            <p className="text-xs text-white/95 leading-relaxed font-normal normal-case tracking-normal text-left">
              {agencyConfig.kicker}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Bar with Animated Scaled Rule (Exact Awake Reference Match) */}
      <div className="relative pt-3 sm:pt-4 z-10 pb-1 sm:pb-0">
        <div className="hero-meta-rule absolute top-0 left-0 w-full h-[1px] bg-white/25 sm:bg-white/30" />
        <div className="hero-meta-content flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-4 text-[0.72rem] sm:text-[0.8125rem] font-semibold tracking-wider uppercase">
          <div className="flex items-center gap-2 text-white/95">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>
              <span className="text-white/70">BASED IN:</span> INDIA {istTime || '19:46'} · IST
            </span>
          </div>
          <div className="w-full sm:w-auto">
            <a
              href={`mailto:${agencyConfig.contact.email}`}
              className="text-white hover:text-white/90 inline-block transition-opacity break-all sm:break-normal text-[0.7rem] sm:text-[0.8125rem]"
            >
              <span className="text-white/70">SAY HELLO:</span> {agencyConfig.contact.email.toUpperCase()}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
