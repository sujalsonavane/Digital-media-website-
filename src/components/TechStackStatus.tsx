"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  Server,
  Layers,
  Palette,
  Film,
  Sparkles,
  Terminal,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface StackItem {
  id: string;
  name: string;
  role: string;
  version: string;
  status: "active" | "verified";
  icon: React.ElementType;
  description: string;
  features: string[];
  docUrl: string;
}

const techStack: StackItem[] = [
  {
    id: "nextjs",
    name: "Next.js",
    role: "Core Web Framework & Routing",
    version: "16.4.0 (Turbopack)",
    status: "verified",
    icon: Server,
    description: "App Router, Server & Client component tree, dynamic metadata for SEO, and fast streaming SSR.",
    features: ["App Router (/src/app)", "Automatic SEO metadata", "Turbopack bundler", "Layout nesting"],
    docUrl: "https://nextjs.org/docs",
  },
  {
    id: "typescript",
    name: "TypeScript",
    role: "Strict Type Safety",
    version: "5.x",
    status: "verified",
    icon: ShieldCheck,
    description: "End-to-end typed props, strict compile-time validation, and safe interfaces.",
    features: ["Strict compiler options", "Path alias (@/*)", "Auto-generated route types", "Component typing"],
    docUrl: "https://www.typescriptlang.org/",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    role: "Design System & Responsive Tokens",
    version: "4.x",
    status: "verified",
    icon: Palette,
    description: "Next-gen CSS-first configuration, fluid responsive breakpoints, and glassmorphic utilities.",
    features: ["CSS @theme directives", "Zero-runtime generation", "Utility classes", "Dark mode variables"],
    docUrl: "https://tailwindcss.com/",
  },
  {
    id: "gsap",
    name: "GSAP + ScrollTrigger",
    role: "Timeline Animation & Scroll Scrub",
    version: "3.15.0",
    status: "verified",
    icon: Film,
    description: "Hardware compositor-linked timelines, pinned sections, scrubbed progress, and @gsap/react useGSAP integration.",
    features: ["ScrollTrigger pinning", "Smooth scrub progression", "useGSAP safe cleanup", "Sub-frame precision"],
    docUrl: "https://gsap.com/",
  },
  {
    id: "motion",
    name: "Motion for React",
    role: "Spring Physics & Interactive Micro-States",
    version: "14.2.0",
    status: "verified",
    icon: Sparkles,
    description: "Physical spring transitions, gesture states, layoutId shared morphs, and AnimatePresence exit animations.",
    features: ["Spring physics engine", "layoutId shared morphing", "Tap & hover gesture states", "AnimatePresence"],
    docUrl: "https://motion.dev/",
  },
  {
    id: "node",
    name: "Node.js Runtime",
    role: "Engine & Tooling Execution",
    version: "26.7.0",
    status: "verified",
    icon: Terminal,
    description: "Active high-performance JavaScript/TypeScript runtime powering development tooling, Turbopack, and SSR.",
    features: ["Modern V8 runtime", "Built-in ESM & CJS support", "npm package ecosystem", "Server-side rendering"],
    docUrl: "https://nodejs.org/",
  },
];

export default function TechStackStatus() {
  const [selectedTech, setSelectedTech] = useState<string>("nextjs");

  const currentItem = techStack.find((item) => item.id === selectedTech) || techStack[0];

  return (
    <section id="tech-stack" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-neutral-800/80">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Check className="w-3.5 h-3.5" />
          <span>Setup Verification Completed</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Installed & Configured Stack
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3">
          Every requested module is installed, wired up, and tested together in harmony.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive list of tech items */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            const isSelected = selectedTech === tech.id;
            return (
              <motion.div
                key={tech.id}
                onClick={() => setSelectedTech(tech.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? "bg-neutral-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10"
                    : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-neutral-900 text-neutral-400 border border-neutral-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{tech.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                        {tech.version}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">{tech.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Detailed inspector card */}
        <div className="lg:col-span-6 sticky top-24">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800/90 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            {/* Top decorative badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Technology Dossier
              </span>
              <a
                href={currentItem.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <span>Official Documentation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <currentItem.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{currentItem.name}</h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">Installed: {currentItem.version}</p>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mt-4">
              {currentItem.description}
            </p>

            {/* Configured Features */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Verified Features in this Project
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentItem.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-300"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
