'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { agencyConfig } from '@/data/agencyData';

interface MenuCurtainProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { index: '00', name: 'HOME', url: '#' },
  { index: '01', name: 'SERVICES', url: '#services' },
  { index: '02', name: 'PROJECTS', url: '#projects' },
  { index: '03', name: 'LIVE CLIENTS', url: '#clients' },
  { index: '04', name: 'CONTACTS', url: '#cta' },
];

export default function MenuCurtain({ isOpen, onClose }: MenuCurtainProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Lock body scrolling and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  return (
    <div
      id="menuCurtain"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      aria-hidden={!isOpen}
      className={`fixed inset-[var(--frame)] bg-[#ff003d] text-white rounded-[var(--r-panel)] z-[1000] flex flex-col justify-between p-6 sm:p-10 md:p-14 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none overflow-hidden ${
        isOpen
          ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
          : 'opacity-0 pointer-events-none -translate-y-full scale-[0.98]'
      }`}
    >
      {/* Background Faint Pink Spline Loop (Matching Awake Reference frame 022) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M -100 200 C 400 100, 1000 0, 950 400 C 900 800, 300 700, 200 900"
          stroke="#ffa3b8"
          strokeWidth="48"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Header: Brandmark on left, Action pills on right (Matching Awake Reference frame 022) */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/images/luminous-mark.png"
            alt="Luminous logo"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-md border border-white/20"
          />
          <span className="font-extrabold text-2xl sm:text-3xl tracking-tight">
            {agencyConfig.brandmark}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="#cta"
            onClick={onClose}
            className="hidden sm:inline-block px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm tracking-wide transition-colors"
          >
            get in touch.
          </Link>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close navigation menu"
            className="bg-white text-[#ff003d] font-bold text-xs sm:text-sm px-5 py-2 rounded-full cursor-pointer hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>close.</span>
            <span>✕</span>
          </button>
        </div>
      </div>

      {/* Main Section: Brand Banner Card on Left (Desktop), Nav Links on Right */}
      <div className="relative z-10 my-auto py-6 sm:py-8 flex flex-col lg:flex-row items-center justify-between gap-10 w-full">
        <div className="hidden lg:flex flex-col gap-4 max-w-sm">
          <div className="relative w-full aspect-[3.1/1] rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-[#161d25]">
            <Image
              src="/images/luminous-brand-banner.png"
              alt="Luminous Digital Studio"
              fill
              sizes="384px"
              className="object-cover"
            />
          </div>
          <p className="text-white/80 text-xs font-medium leading-relaxed">
            Full-service digital media production studio partnering with ambitious brands across Web, App, Video, and Analytics.
          </p>
        </div>

        <nav className="w-full lg:max-w-2xl">
          <ul className="list-none flex flex-col gap-4 sm:gap-6 md:gap-7 items-end">
          {menuItems.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <li
                key={item.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transitionDelay: isOpen ? `${idx * 40 + 100}ms` : '0ms',
                }}
                className={`transform transition-all duration-500 ease-out flex items-center justify-end w-full ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
              >
                <a
                  href={item.url}
                  onClick={onClose}
                  className="group flex items-center gap-4 sm:gap-6 cursor-pointer"
                >
                  {/* Rotated Index Number (00, 01, 02, 03) */}
                  <span className="text-xs sm:text-sm font-mono tracking-widest text-white/70 rotate-[-90deg] origin-center select-none">
                    {item.index}
                  </span>

                  {/* Horizontal Connector Line (Expands on Hover, matching Awake frame 022) */}
                  <span
                    className={`h-[2px] bg-white transition-all duration-300 origin-right ${
                      isHovered ? 'w-12 sm:w-24 md:w-32 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />

                  {/* Main Link Text in Display Font */}
                  <span className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2">
                    {item.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      </div>

      {/* Bottom Row: Contact on Left, Social on Right (Matching Awake Reference frame 022 & 024) */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs sm:text-sm pt-4 border-t border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <a
            href={`mailto:${agencyConfig.contact.email}`}
            className="text-white hover:opacity-80 transition-opacity uppercase tracking-wider font-semibold"
          >
            SAY HELLO: {agencyConfig.contact.email.toUpperCase()}
          </a>
          <span className="text-white/80 font-mono text-[11px] sm:text-xs tracking-wider">
            BASED IN: INDIA · IST
          </span>
        </div>

        <div className="flex items-center gap-6 text-white uppercase tracking-widest font-bold text-xs">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            LINKEDIN
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            TWITTER
          </a>
        </div>
      </div>
    </div>
  );
}
