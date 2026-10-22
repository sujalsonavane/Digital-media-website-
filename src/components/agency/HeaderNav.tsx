'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { agencyConfig } from '@/data/agencyData';
import MenuCurtain from './MenuCurtain';

export default function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky nav when scrolling past 380px
      if (window.scrollY > 380) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. In-Hero Top Navbar */}
      <nav className="flex items-center justify-between w-full z-10" aria-label="Hero Navigation">
        <a
          href="#"
          className="font-extrabold text-2xl tracking-tighter text-white hover:opacity-90 transition-opacity flex items-center gap-2.5 group"
        >
          <Image
            src="/images/luminous-mark.png"
            alt="Luminous logo"
            width={32}
            height={32}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-sm group-hover:scale-105 transition-transform"
          />
          <span>{agencyConfig.brandmark}</span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-medium text-white bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-200"
          >
            get in touch.
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="menuCurtain"
            aria-label="Open navigation menu"
            className="group inline-flex items-center justify-center gap-2.5 h-10 px-5 rounded-full text-sm font-bold text-[#ff003d] bg-white hover:bg-neutral-100 hover:-translate-y-0.5 shadow-sm transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <span>menu.</span>
            {/* Awake Reference 3-Bar Staggered Sweep */}
            <span className="flex flex-col gap-[3.5px] w-4.5 py-0.5 overflow-hidden" aria-hidden="true">
              <span className="block w-[11px] h-[2px] bg-[#ff003d] rounded-full burger-sweep-1 origin-left transition-transform duration-300" />
              <span className="block w-[18px] h-[2px] bg-[#ff003d] rounded-full burger-sweep-2 origin-left transition-transform duration-300" />
              <span className="block w-[11px] h-[2px] bg-[#ff003d] rounded-full burger-sweep-3 origin-left transition-transform duration-300" />
            </span>
          </button>
        </div>
      </nav>

      {/* 2. Floating Sticky Navbar (Slides down when scrolling past hero) */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[900] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSticky && !isMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isSticky || isMenuOpen}
      >
        <div className="flex items-center gap-3 sm:gap-6 px-3.5 sm:px-6 py-2 rounded-full bg-[#161d25]/90 backdrop-blur-md border border-white/15 shadow-2xl text-white max-w-[calc(100vw-2rem)]">
          <a
            href="#"
            className="font-extrabold text-sm sm:text-base md:text-lg tracking-tighter text-white hover:text-[#ff003d] transition-colors shrink-0 flex items-center gap-2 group"
          >
            <Image
              src="/images/luminous-mark.png"
              alt="Luminous logo"
              width={22}
              height={22}
              className="w-5 h-5 rounded-md shadow-sm group-hover:scale-105 transition-transform"
            />
            <span>{agencyConfig.brandmark}</span>
          </a>

          <div className="hidden lg:flex items-center gap-5 text-xs font-semibold text-white/80">
            <a href="#team" className="hover:text-white transition-colors">Team</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="#cta"
              className="group inline-flex items-center justify-center gap-1.5 h-7 sm:h-8 px-3 sm:px-4 rounded-full text-[11px] sm:text-xs font-bold text-white bg-[#ff003d] hover:bg-[#d80034] transition-colors whitespace-nowrap shrink-0 flex-nowrap"
            >
              <span className="whitespace-nowrap">enquire</span>
              <svg
                className="w-3 h-3 shrink-0 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M2.5 8h11M8.5 3.5l4.5 4.5-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="menuCurtain"
              aria-label="Open navigation menu"
              className="group inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0 overflow-hidden"
            >
              <span className="flex flex-col gap-[2.5px] w-3.5 py-0.5 overflow-hidden" aria-hidden="true">
                <span className="block w-[9px] h-[1.75px] bg-white rounded-full burger-sweep-1 origin-left transition-transform duration-300" />
                <span className="block w-[15px] h-[1.75px] bg-white rounded-full burger-sweep-2 origin-left transition-transform duration-300" />
                <span className="block w-[9px] h-[1.75px] bg-white rounded-full burger-sweep-3 origin-left transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Fullscreen Curtain */}
      <MenuCurtain isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
