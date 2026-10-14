"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Globe, Layers, Eye, Sparkles, Code2, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sequenceStages = [
  {
    step: "01",
    tag: "Core Engine",
    title: "Next.js 16 + React 19 App Architecture",
    description:
      "Enterprise routing, server-rendered components, dynamic layouts, metadata for high-performance SEO, and lightning fast Turbopack compilation.",
    icon: Globe,
    accent: "from-blue-500 to-indigo-500",
    borderGlow: "border-blue-500/30",
    metric: "0.2s Hot Reload",
  },
  {
    step: "02",
    tag: "Design System",
    title: "Tailwind CSS v4 Utility Precision",
    description:
      "Modern CSS design tokens, HSL palette matching, fluid container responsive breakpoints, glassmorphism, and zero-runtime style generation.",
    icon: Layers,
    accent: "from-cyan-500 to-teal-500",
    borderGlow: "border-cyan-500/30",
    metric: "Zero CSS Bloat",
  },
  {
    step: "03",
    tag: "Precision Motion",
    title: "GSAP 3.15 + ScrollTrigger Pinned Scrubbing",
    description:
      "Direct hardware compositor timeline manipulation, pixel-perfect scroll scrubbing, pinned stages, parallax choreography, and responsive timeline scaling.",
    icon: Eye,
    accent: "from-emerald-500 to-green-500",
    borderGlow: "border-emerald-500/30",
    metric: "Sub-millisecond Sync",
  },
  {
    step: "04",
    tag: "Interactive Physics",
    title: "Motion for React Spring Dynamics",
    description:
      "Interactive button responses, drag & gesture controllers, shared layout morph transitions with layoutId, and AnimatePresence exit states.",
    icon: Sparkles,
    accent: "from-fuchsia-500 to-purple-500",
    borderGlow: "border-fuchsia-500/30",
    metric: "Natural Spring Physics",
  },
];

export default function ScrollShowcaseGsap() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!pinSectionRef.current || !trackRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".stage-card");
      const totalCards = cards.length;

      // Animate progress bar as the section is scrolled
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 0.5,
        },
      });

      // Pin the section and scrub horizontal card translation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=2200",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
          },
        },
      });

      // Move track across horizontally
      tl.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 80),
        ease: "none",
      });

      // Add rotation and scale stagger on each card as it moves
      cards.forEach((card, idx) => {
        tl.fromTo(
          card,
          { filter: "brightness(0.7) blur(1px)", scale: 0.94 },
          {
            filter: "brightness(1) blur(0px)",
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          idx * 0.2
        );
      });
    },
    { scope: pinSectionRef }
  );

  return (
    <section
      id="scrolltrigger-showcase"
      ref={pinSectionRef}
      className="relative min-h-screen bg-neutral-950 text-white flex flex-col justify-center overflow-hidden border-y border-neutral-800/80"
    >
      {/* ScrollTrigger Scrub Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900 z-30">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 origin-left scale-x-0"
        />
      </div>

      {/* Header bar pinned inside the section */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl mx-auto w-full z-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>GSAP ScrollTrigger • Scrub & Pin</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Sequential Animation Architecture
          </h2>
          <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-xl">
            Scroll down to test the pinned container. Notice how ScrollTrigger locks viewport position while scrubbing timeline stages horizontally.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/80 px-4 py-2 rounded-xl border border-neutral-800">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>Scroll down to advance sequence ↓</span>
        </div>
      </div>

      {/* Horizontal Scrub Track */}
      <div className="relative w-full overflow-visible py-8">
        <div
          ref={trackRef}
          className="flex items-center gap-6 px-6 md:px-12 w-max"
        >
          {sequenceStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className={`stage-card relative w-[320px] sm:w-[420px] md:w-[460px] p-8 rounded-3xl bg-neutral-900/90 border ${stage.borderGlow} backdrop-blur-xl shadow-2xl flex flex-col justify-between h-[420px] transition-shadow duration-300`}
              >
                {/* Background gradient orb */}
                <div
                  className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${stage.accent} opacity-15 rounded-full blur-3xl pointer-events-none`}
                />

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-neutral-500/80">
                      {stage.step}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {stage.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-5 border border-neutral-700/80">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                    {stage.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Card Bottom / Metric */}
                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">Benchmark Metric</span>
                  <span className="text-emerald-400 font-semibold">{stage.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
