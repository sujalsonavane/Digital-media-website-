'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { agencyConfig } from '@/data/agencyData';

export default function ServiceUnavailablePage() {
  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-[#111215] text-white p-3 sm:p-5 md:p-6 flex flex-col justify-between selection:bg-[#ff003d] selection:text-white select-none">
      {/* Outer Picture Frame Card */}
      <div className="relative flex-1 bg-[#161d25] rounded-[var(--r-panel)] border border-white/10 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Precision CAD Blueprint Corner Crosshairs */}
        <div className="absolute top-5 left-5 text-xs font-mono font-bold text-white/20 pointer-events-none select-none">+</div>
        <div className="absolute top-5 right-5 text-xs font-mono font-bold text-white/20 pointer-events-none select-none">+</div>
        <div className="absolute bottom-5 left-5 text-xs font-mono font-bold text-white/20 pointer-events-none select-none">+</div>
        <div className="absolute bottom-5 right-5 text-xs font-mono font-bold text-white/20 pointer-events-none select-none">+</div>

        {/* Ambient Amber / Red Glow in Background */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#ff003d]/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Navigation Bar */}
        <header className="relative z-10 flex items-center justify-between pb-6 sm:pb-8 border-b border-white/10">
          <Link
            href="/"
            aria-label="Luminous Digital Studio Home"
            className="flex items-center gap-3 group"
          >
            <Image
              src="/images/luminous-mark.png"
              alt="Luminous logo"
              width={34}
              height={34}
              className="w-8 h-8 rounded-lg shadow-md border border-white/15 group-hover:scale-105 transition-transform"
            />
            <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-[#ff003d] transition-colors">
              luminous<span className="text-[#ff003d]">.</span>
            </span>
          </Link>

          <Link
            href="/"
            className="text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#111215] transition-all shadow-sm"
          >
            ← Back to Home
          </Link>
        </header>

        {/* 2. Central Monumental Editorial 503 Stage */}
        <div className="relative z-10 my-auto py-12 sm:py-16 max-w-3xl">
          {/* Status Coordinate Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-400/20 text-[11px] font-mono font-bold uppercase tracking-widest text-amber-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            <span>[ STATUS 503 // SERVICE UNAVAILABLE ]</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6">
            INFRASTRUCTURE <br />
            <span className="text-amber-400">MAINTENANCE.</span>
          </h1>

          {/* Explanatory Editorial Copy */}
          <p className="text-sm sm:text-base md:text-lg text-[#8c9196] leading-relaxed max-w-xl mb-8">
            Our edge deployment cluster is undergoing scheduled maintenance, server instance re-provisioning, or cache re-synchronization. Core services will resume momentarily.
          </p>

          {/* System Telemetry Diagnostics Box */}
          <div className="mb-10 p-5 rounded-2xl bg-white/5 border border-white/10 max-w-lg space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center text-white/70">
              <span className="text-white/40">CLUSTER STATUS:</span>
              <span className="text-amber-300 font-bold">EDGE MAINTENANCE ACTIVE</span>
            </div>
            <div className="flex justify-between items-center text-white/70">
              <span className="text-white/40">EXPECTED RESOLUTION:</span>
              <span className="text-white font-medium">~10 — 15 MINUTES</span>
            </div>
            <div className="flex justify-between items-center text-white/70">
              <span className="text-white/40">REGION / TIMEZONE:</span>
              <span className="text-white font-medium">ASIA-SOUTH1 · IST</span>
            </div>
          </div>

          {/* Action Links & Recovery Route */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-amber-400 hover:bg-amber-300 text-[#111215] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-400/20 cursor-pointer whitespace-nowrap"
            >
              <span>Check Status / Reload</span>
              <span>↻</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
            >
              <span>Return to Homepage</span>
              <span>→</span>
            </Link>

            {agencyConfig.contact.whatsapp && (
              <a
                href={agencyConfig.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/15 hover:border-white/30 text-white/80 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap"
              >
                <span>WhatsApp Support</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* 3. Bottom Metadata Bar */}
        <footer className="relative z-10 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#8c9196]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span>STANDBY FAILOVER ACTIVE · LUMINOUS TELEMETRY</span>
          </div>
          <div>
            <a
              href={`mailto:${agencyConfig.contact.email}`}
              className="hover:text-white transition-colors"
            >
              OPERATIONS: {agencyConfig.contact.email.toUpperCase()}
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
