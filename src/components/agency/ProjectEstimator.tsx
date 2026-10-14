'use client';

import React, { useState } from 'react';
import { agencyConfig } from '@/data/agencyData';
import { playClickSound } from '@/utils/sound';

interface DisciplineOption {
  id: string;
  name: string;
  basePrice: number;
  baseWeeks: number;
  description: string;
}

const DISCIPLINES: DisciplineOption[] = [
  {
    id: 'web',
    name: 'High-Performance Website',
    basePrice: 14000,
    baseWeeks: 4,
    description: 'Bespoke marketing flagship, headless CMS architecture, and conversion-optimized UX.',
  },
  {
    id: 'app',
    name: 'Full-Stack Web / Mobile App',
    basePrice: 24000,
    baseWeeks: 7,
    description: 'Cross-platform iOS/Android app, reactive dashboard, and secure cloud API integration.',
  },
  {
    id: 'video',
    name: 'Cinematic Video & 3D VFX',
    basePrice: 12000,
    baseWeeks: 3,
    description: 'Commercial brand film, 3D product visualization, motion reel, and color grading.',
  },
  {
    id: 'analytics',
    name: 'Digital Analytics Pipeline',
    basePrice: 9000,
    baseWeeks: 3,
    description: 'End-to-end user telemetry, executive KPI dashboard, and revenue attribution modeling.',
  },
];

const SCALES = [
  { id: 'startup', label: 'Startup / MVP Launch', multiplier: 1.0, sub: 'Lean architecture for breakout brands' },
  { id: 'growth', label: 'Scale-Up / Venture Stage', multiplier: 1.45, sub: 'Expanded multi-page & integration scope' },
  { id: 'enterprise', label: 'Enterprise Flagship', multiplier: 2.1, sub: 'Mission-critical security & SLA compliance' },
];

const ADDONS = [
  { id: 'motion', label: '3D WebGL & GSAP Motion Choreography', cost: 4500, extraWeeks: 1 },
  { id: 'cms', label: 'Headless CMS & Custom Editorial Workflows', cost: 3500, extraWeeks: 1 },
  { id: 'telemetry', label: 'Real-Time Telemetry & Drop-Off Funnels', cost: 4000, extraWeeks: 1 },
  { id: 'express', label: 'Priority Sprint Delivery (Expedited Track)', cost: 5500, extraWeeks: -1.5 },
];

export default function ProjectEstimator() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(DISCIPLINES[0].id);
  const [selectedScale, setSelectedScale] = useState<string>(SCALES[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['motion']);

  const toggleAddon = (id: string) => {
    playClickSound();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const discipline = DISCIPLINES.find((d) => d.id === selectedDiscipline) || DISCIPLINES[0];
  const scale = SCALES.find((s) => s.id === selectedScale) || SCALES[0];

  const addonsCost = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.cost : 0);
  }, 0);

  const addonsWeeks = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.extraWeeks : 0);
  }, 0);

  const rawBase = Math.round(discipline.basePrice * scale.multiplier + addonsCost);
  const lowEstimate = Math.round(rawBase * 0.9 / 500) * 500;
  const highEstimate = Math.round(rawBase * 1.15 / 500) * 500;

  const totalWeeks = Math.max(2, Math.round(discipline.baseWeeks * (scale.multiplier > 1.5 ? 1.3 : 1.0) + addonsWeeks));

  const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

  // Build direct WhatsApp message
  const waAddonNames = selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.label).filter(Boolean).join(', ');
  const waText = encodeURIComponent(
    `Hello Luminous Studio, I used your Project Estimator:\n\n• Type: ${discipline.name}\n• Scale: ${scale.label}\n• Addons: ${waAddonNames || 'None'}\n• Estimated Investment: ${formatCurrency(lowEstimate)} – ${formatCurrency(highEstimate)}\n• Target Delivery: ~${totalWeeks} Weeks\n\nCan we discuss availability for this build?`
  );
  const waEstimateUrl = `https://wa.me/919876543210?text=${waText}`;

  return (
    <section
      id="estimator"
      aria-label="Interactive Project Cost & Timeline Estimator"
      className="estimator-panel relative z-20 bg-[#16181d] text-white rounded-[var(--r-panel)] px-[var(--inset)] py-14 sm:py-20 md:py-24 overflow-hidden select-none border-t border-white/10"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff003d] block mb-2">
              [ Interactive Planning Matrix // 2026 ]
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
              PROJECT ESTIMATOR
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8c9196] max-w-md font-medium leading-relaxed">
            Configure your technical deliverables, scale, and acceleration to generate transparent investment benchmarks and delivery windows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Controls Column (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Core Discipline */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 block mb-3">
                01. Core Production Discipline
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DISCIPLINES.map((item) => {
                  const isSelected = selectedDiscipline === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedDiscipline(item.id);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#111215] border-white shadow-xl scale-[1.02]'
                          : 'bg-white/5 text-white/90 border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-sm sm:text-base tracking-tight">
                          {item.name}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-[#ff003d]' : 'text-white/60'}`}>
                          From {formatCurrency(item.basePrice)}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${isSelected ? 'text-[#666f77]' : 'text-[#8c9196]'}`}>
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Scale & Maturity */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 block mb-3">
                02. Scope & Organizational Scale
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCALES.map((item) => {
                  const isSelected = selectedScale === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedScale(item.id);
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#ff003d] text-white border-[#ff003d] shadow-lg scale-[1.02]'
                          : 'bg-white/5 text-white/90 border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm tracking-tight block mb-1">
                        {item.label}
                      </span>
                      <span className={`text-[11px] leading-snug block ${isSelected ? 'text-white/90' : 'text-[#8c9196]'}`}>
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. High-Value Addons */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 block mb-3">
                03. Optional Architecture Capabilities
              </span>
              <div className="space-y-2">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white/15 border-white/40 text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-[#ff003d] border-[#ff003d] text-white' : 'border-white/30'
                          }`}
                        >
                          {isChecked && <span className="text-[10px] font-bold">✓</span>}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold tracking-tight">
                          {addon.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-white/80 shrink-0 font-bold ml-2">
                        +{formatCurrency(addon.cost)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-Time Live Benchmark Card (Right 5 cols) */}
          <div className="lg:col-span-5 bg-[#111215] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative sticky top-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff003d]">
                Estimated Production Window
              </span>
              <span className="text-[11px] font-mono text-white/60 bg-white/10 px-2.5 py-1 rounded-full">
                Fixed-Scope Model
              </span>
            </div>

            {/* Primary Metrics */}
            <div className="space-y-6 mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8c9196] block mb-1">
                  Estimated Investment Range
                </span>
                <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  {formatCurrency(lowEstimate)} – {formatCurrency(highEstimate)}
                </div>
                <span className="text-[11px] text-[#8c9196] font-mono mt-1 block">
                  Includes complete art direction, engineering, and staging testing
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8c9196] block mb-1">
                  Target Production Timeline
                </span>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#ffa3b8]">
                  ~{totalWeeks} Weeks
                </div>
                <span className="text-[11px] text-[#8c9196] font-mono mt-1 block">
                  Iterative bi-weekly staging sprints with real-time telemetry
                </span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="bg-white/5 rounded-2xl p-4 mb-8 border border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-2">
                Included in this Engagement:
              </span>
              <ul className="space-y-1.5 text-xs text-white/90">
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Production for: <strong>{discipline.name}</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Full intellectual property transfer upon settlement</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Sub-second Core Web Vitals SLA guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Direct Slack/WhatsApp channel with principal engineers</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* WhatsApp Lock In */}
              <a
                href={waEstimateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="w-full py-4 px-6 rounded-full bg-[#25D366] text-[#111215] font-display text-base font-extrabold flex items-center justify-center gap-2.5 transition-all duration-200 hover:bg-[#34eb77] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <span>Discuss This Spec on WhatsApp</span>
                <span>↗</span>
              </a>

              {/* Scroll to Enquiry Form */}
              <a
                href="#cta"
                onClick={() => playClickSound()}
                className="w-full py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/15"
              >
                <span>Proceed to Studio Brief Form</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
