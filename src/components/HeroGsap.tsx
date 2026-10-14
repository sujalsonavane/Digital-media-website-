"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Play, Sparkles, Zap, ShieldCheck, Gauge, ArrowRight } from "lucide-react";

export default function HeroGsap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      // Create master timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      timelineRef.current = tl;

      // Subtle ambient orb float
      gsap.to(".ambient-orb-1", {
        x: "random(-40, 40)",
        y: "random(-30, 30)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".ambient-orb-2", {
        x: "random(-50, 50)",
        y: "random(-40, 40)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Staggered reveal
      tl.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-title-line",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          ".metric-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  const handleReplay = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  };

  return (
    <section
      id="gsap-hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden"
    >
      {/* Dynamic Background Glow Orbs */}
      <div className="ambient-orb-1 absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="ambient-orb-2 absolute bottom-24 right-1/4 w-[420px] h-[420px] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10 opacity-70" />

      {/* Hero Badge */}
      <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/60 shadow-lg mb-8 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-medium text-neutral-300">
          Next.js 16 + GSAP 3.15 + Motion for React Active
        </span>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-4xl mx-auto space-y-2">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          <span className="hero-title-line block">Cinematic Web Motion</span>
          <span className="hero-title-line block bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Engineered For Precision
          </span>
        </h1>
        <p className="hero-desc text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto pt-4 leading-relaxed font-normal">
          A turnkey full-stack architecture harmonizing Next.js App Router, TypeScript strict typing, Tailwind CSS styling tokens, GSAP scroll timelines, and Motion interactive micro-physics.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="hero-cta flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href="#scrolltrigger-showcase"
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>View ScrollTrigger Demo</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <button
          onClick={handleReplay}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 transition-all hover:border-neutral-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          <span>Replay GSAP Timeline</span>
        </button>
      </div>

      {/* Performance & Feature Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full mt-16">
        <div className="metric-card p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">GSAP Engine</span>
          </div>
          <div className="text-2xl font-bold text-white">60+ FPS</div>
          <p className="text-xs text-neutral-400 mt-1">Direct GPU compositor timeline execution</p>
        </div>

        <div className="metric-card p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Motion React</span>
          </div>
          <div className="text-2xl font-bold text-white">Spring Physics</div>
          <p className="text-xs text-neutral-400 mt-1">Gestures, layout shifts & micro-states</p>
        </div>

        <div className="metric-card p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Gauge className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Turbopack</span>
          </div>
          <div className="text-2xl font-bold text-white">Next.js 16</div>
          <p className="text-xs text-neutral-400 mt-1">React 19 Server & Client components</p>
        </div>

        <div className="metric-card p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md hover:border-neutral-700 transition-colors">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">TypeScript</span>
          </div>
          <div className="text-2xl font-bold text-white">Strict v5</div>
          <p className="text-xs text-neutral-400 mt-1">Full compile-time type validation</p>
        </div>
      </div>
    </section>
  );
}
