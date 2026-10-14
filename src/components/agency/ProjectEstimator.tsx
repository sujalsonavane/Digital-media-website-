'use client';

import React, { useState } from 'react';

interface Subcategory {
  id: string;
  name: string;
  cost: number;
  extraWeeks: number;
  description: string;
}

interface ServiceCategoryDef {
  id: string;
  number: string;
  name: string;
  tagline: string;
  startingPrice: number;
  baseWeeks: number;
  icon: string;
  subcategories: Subcategory[];
}

const SERVICES_CATALOG: ServiceCategoryDef[] = [
  {
    id: 'website',
    number: '01',
    name: 'Website',
    tagline: 'Marketing websites, portfolio showcases, and headless web platforms',
    startingPrice: 120000,
    baseWeeks: 3,
    icon: '🌐',
    subcategories: [
      { id: 'web-front', name: 'Frontend Design & UI', cost: 35000, extraWeeks: 0.5, description: 'Responsive layout, modern typography, and smooth micro-interactions' },
      { id: 'web-back', name: 'Backend Architecture & APIs', cost: 45000, extraWeeks: 1, description: 'Next.js server routes, custom API endpoints, and webhooks' },
      { id: 'web-db', name: 'Database & Storage', cost: 30000, extraWeeks: 0.5, description: 'Structured database (PostgreSQL/Supabase) and file storage' },
      { id: 'web-cms', name: 'Headless CMS Integration', cost: 30000, extraWeeks: 0.5, description: 'Content management system (Sanity/Strapi) for easy client edits' },
      { id: 'web-seo', name: 'SEO & Speed Optimization', cost: 25000, extraWeeks: 0.5, description: 'Sub-second page speeds, Core Web Vitals, and meta indexing' },
      { id: 'web-ecom', name: 'E-Commerce & Payments', cost: 45000, extraWeeks: 1, description: 'Product catalog, shopping cart, and Razorpay/Stripe checkout' },
    ],
  },
  {
    id: 'app',
    number: '02',
    name: 'Full-Stack Web / Mobile App',
    tagline: 'Custom applications engineered for mobile devices and browser dashboards',
    startingPrice: 240000,
    baseWeeks: 5,
    icon: '📱',
    subcategories: [
      { id: 'app-cross', name: 'Cross-Platform (iOS & Android)', cost: 85000, extraWeeks: 2, description: 'Single React Native codebase powering both App Store & Google Play' },
      { id: 'app-ios', name: 'iOS Only (Native Apple)', cost: 65000, extraWeeks: 1.5, description: 'Tailored for iPhone & iPad touch gestures and iOS HIG standards' },
      { id: 'app-android', name: 'Android Only (Google Play)', cost: 55000, extraWeeks: 1.5, description: 'Optimized for Android device compatibility and Material design' },
      { id: 'app-dashboard', name: 'Web Dashboard & Admin Portal', cost: 60000, extraWeeks: 1, description: 'Responsive browser portal for team operations and client dashboards' },
      { id: 'app-auth', name: 'User Authentication & Database', cost: 35000, extraWeeks: 0.5, description: 'Secure sign-up, OTP login, roles, permissions, and cloud database' },
      { id: 'app-realtime', name: 'Real-Time Sync & Notifications', cost: 40000, extraWeeks: 1, description: 'Push notifications, live messaging, and WebSockets live sync' },
    ],
  },
  {
    id: 'video',
    number: '03',
    name: 'Video Editing',
    tagline: 'Commercial films, social media reels, 3D motion, and post-production',
    startingPrice: 80000,
    baseWeeks: 2,
    icon: '🎬',
    subcategories: [
      { id: 'vid-comm', name: 'Commercial Brand Film', cost: 50000, extraWeeks: 1, description: 'High-production cinematic commercial or brand launch showcase' },
      { id: 'vid-reels', name: 'Instagram Reels & Shorts', cost: 30000, extraWeeks: 0.5, description: 'Fast-paced, hook-driven vertical social video packages' },
      { id: 'vid-yt', name: 'YouTube & Long-Form Video', cost: 35000, extraWeeks: 0.5, description: 'Episodic content, documentary style, podcast, or tutorials' },
      { id: 'vid-color', name: 'Color Grading & Mastering', cost: 25000, extraWeeks: 0.5, description: 'DaVinci Resolve professional film grading and contrast balance' },
      { id: 'vid-mfx', name: 'Motion Graphics & 3D VFX', cost: 45000, extraWeeks: 1, description: 'Animated titles, 3D product visualization, and visual effects' },
      { id: 'vid-sound', name: 'Sound Design & Foley Mix', cost: 20000, extraWeeks: 0.5, description: 'Custom sound effects, voice enhancement, and background music sync' },
    ],
  },
  {
    id: 'analytics',
    number: '04',
    name: 'Data Analyst',
    tagline: 'User telemetry, conversion funnel optimization, and executive dashboards',
    startingPrice: 75000,
    baseWeeks: 2,
    icon: '📊',
    subcategories: [
      { id: 'data-tele', name: 'Telemetry & Event Tracking', cost: 35000, extraWeeks: 0.5, description: 'GA4, Mixpanel, and custom event tracking implementation' },
      { id: 'data-funnel', name: 'Funnel & Drop-Off Audit', cost: 30000, extraWeeks: 0.5, description: 'Detailed analysis identifying user drop-offs and lost conversions' },
      { id: 'data-dash', name: 'Interactive Executive Dashboard', cost: 40000, extraWeeks: 1, description: 'Live Looker/PowerBI/custom web cockpit for daily business metrics' },
      { id: 'data-sql', name: 'Database Queries & SQL Reports', cost: 30000, extraWeeks: 0.5, description: 'Automated database extraction, report schedules, and data cleaning' },
      { id: 'data-roi', name: 'Ad Spend & ROI Attribution', cost: 35000, extraWeeks: 0.5, description: 'Multi-touch marketing attribution to pinpoint top performing channels' },
      { id: 'data-ab', name: 'A/B Testing & Split Experiments', cost: 25000, extraWeeks: 0.5, description: 'Experiment setup, sample sizing, and statistical confidence review' },
    ],
  },
];

const SCALES = [
  { id: 'startup', label: 'Startup / MVP', multiplier: 1.0, sub: 'Essential features for rapid launch' },
  { id: 'growth', label: 'Growth Stage', multiplier: 1.35, sub: 'Expanded scope & scale-ready integrations' },
  { id: 'enterprise', label: 'Enterprise Flagship', multiplier: 1.85, sub: 'Multi-team workflows & SLA guarantees' },
];

export default function ProjectEstimator() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('website');
  const [selectedScaleId, setSelectedScaleId] = useState<string>('startup');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([
    'web-front',
    'web-back',
    'web-seo',
  ]);
  const [isExpedited, setIsExpedited] = useState(false);

  const activeService =
    SERVICES_CATALOG.find((s) => s.id === selectedServiceId) || SERVICES_CATALOG[0];
  const activeScale = SCALES.find((s) => s.id === selectedScaleId) || SCALES[0];

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const newService = SERVICES_CATALOG.find((s) => s.id === serviceId);
    if (newService && newService.subcategories.length > 0) {
      // Pick first two subcategories by default
      setSelectedSubcategories(newService.subcategories.slice(0, 2).map((sub) => sub.id));
    } else {
      setSelectedSubcategories([]);
    }
  };

  const toggleSubcategory = (subId: string) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subId)) {
        return prev.filter((id) => id !== subId);
      }
      return [...prev, subId];
    });
  };

  // Calculations
  const chosenSubDefs = activeService.subcategories.filter((sub) =>
    selectedSubcategories.includes(sub.id)
  );

  const subcategoriesCost = chosenSubDefs.reduce((sum, sub) => sum + sub.cost, 0);
  const subcategoriesExtraWeeks = chosenSubDefs.reduce((sum, sub) => sum + sub.extraWeeks, 0);

  const baseAndSubs = activeService.startingPrice + subcategoriesCost;
  const expeditedCost = isExpedited ? 45000 : 0;
  const rawTotal = Math.round(baseAndSubs * activeScale.multiplier + expeditedCost);

  // Round to nearest ₹5,000 for realistic Indian agency quotation bands
  const lowEstimate = Math.round((rawTotal * 0.9) / 5000) * 5000;
  const highEstimate = Math.round((rawTotal * 1.15) / 5000) * 5000;

  const calculatedWeeks = Math.max(
    2,
    Math.round(
      (activeService.baseWeeks + subcategoriesExtraWeeks) *
        (activeScale.multiplier > 1.4 ? 1.25 : 1.0) -
        (isExpedited ? 1.5 : 0)
    )
  );

  // Indian Rupee Currency Formatter (e.g. ₹1,80,000)
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Pre-configured WhatsApp Link
  const chosenSubNames = chosenSubDefs.map((sub) => sub.name).join(', ') || 'Core Baseline';
  const waMessage = encodeURIComponent(
    `Hello Luminous Studio, I used your online Project Estimator:\n\n• Service: ${activeService.name}\n• Requirements: ${chosenSubNames}\n• Scale: ${activeScale.label}\n• Speed: ${isExpedited ? 'Priority Fast-Track' : 'Standard Sprint'}\n• Estimated Investment: ${formatINR(lowEstimate)} – ${formatINR(highEstimate)}\n• Estimated Timeline: ~${calculatedWeeks} Weeks\n\nCan we discuss starting this project?`
  );
  const waUrl = `https://wa.me/919876543210?text=${waMessage}`;

  return (
    <section
      id="estimator"
      aria-label="Interactive Project Cost & Timeline Estimator"
      className="estimator-panel relative z-20 bg-[#FBF8F3] text-[#1A1917] rounded-[var(--r-panel)] px-[var(--inset)] py-16 sm:py-24 md:py-28 overflow-hidden select-none border-2 border-[#EADBCC] shadow-xl my-4 sm:my-6"
    >
      {/* Warm Ambient Radial Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFEBE6] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFF2DE] rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Warm Header Lockup */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4 border-b border-[#EADBCC] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF003D]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF003D]">
                [ Interactive Cost & Scope Calculator // INR ]
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#14171A] leading-none">
              PROJECT ESTIMATOR.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666056] max-w-md font-medium leading-relaxed">
            Select what you need below to calculate instant transparent investment benchmarks and delivery schedules in Indian Rupees (₹).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Controls & Subpoints (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: WHAT DO YOU NEED? */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#14171A]">
                  01. What do you need?
                </span>
                <span className="text-xs font-semibold text-[#8C8275]">
                  Select 1 Core Service
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_CATALOG.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceChange(service.id)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#14171A] text-white border-[#14171A] shadow-xl scale-[1.02]'
                          : 'bg-white text-[#14171A] border-[#EADBCC] hover:border-[#14171A]/40 hover:bg-[#FFFDFB]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl sm:text-2xl" aria-hidden="true">
                          {service.icon}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-[#FF003D] text-white'
                              : 'bg-[#F2ECE4] text-[#666056]'
                          }`}
                        >
                          From {formatINR(service.startingPrice)}
                        </span>
                      </div>

                      <div className="font-display text-base sm:text-lg font-black tracking-tight leading-snug">
                        {service.name}
                      </div>

                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isSelected ? 'text-white/80' : 'text-[#666056]'
                        }`}
                      >
                        {service.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: SUBCATEGORIES FOR SELECTED SERVICE */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADBCC] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#14171A]">
                  02. Choose specific deliverables ({activeService.name}):
                </span>
                <span className="text-xs font-semibold text-[#FF003D]">
                  Tap to add or remove
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeService.subcategories.map((sub) => {
                  const isChecked = selectedSubcategories.includes(sub.id);
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => toggleSubcategory(sub.id)}
                      className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#FFF2F4] border-[#FF003D] text-[#14171A] shadow-sm'
                          : 'bg-[#FAF7F2] border-[#EADBCC] text-[#4A453E] hover:border-[#D0C2B2]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-[#FF003D] border-[#FF003D] text-white'
                            : 'border-[#B8ABA0] bg-white'
                        }`}
                      >
                        {isChecked && (
                          <span className="text-[10px] font-bold leading-none">✓</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-xs sm:text-sm tracking-tight text-[#14171A] truncate">
                            {sub.name}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-[#FF003D] shrink-0">
                            +{formatINR(sub.cost)}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#666056] leading-tight mt-0.5">
                          {sub.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: SCALE & SPEED */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SCALES.map((scale) => {
                const isSelected = selectedScaleId === scale.id;
                return (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => setSelectedScaleId(scale.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#14171A] text-white border-[#14171A] shadow-md'
                        : 'bg-white text-[#14171A] border-[#EADBCC] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span className="font-bold text-xs sm:text-sm block mb-0.5">
                      {scale.label}
                    </span>
                    <span
                      className={`text-[11px] leading-snug block ${
                        isSelected ? 'text-white/80' : 'text-[#666056]'
                      }`}
                    >
                      {scale.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Priority Fast-Track Toggle */}
            <div
              onClick={() => setIsExpedited(!isExpedited)}
              className={`p-4 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                isExpedited
                  ? 'bg-[#FFF0F3] border-[#FF003D] text-[#14171A]'
                  : 'bg-white border-[#EADBCC] text-[#4A453E] hover:border-[#14171A]/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isExpedited
                      ? 'bg-[#FF003D] border-[#FF003D] text-white'
                      : 'border-[#B8ABA0] bg-white'
                  }`}
                >
                  {isExpedited && <span className="text-xs font-bold">✓</span>}
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#14171A] block">
                    Expedited Priority Track (30% Faster Turnaround)
                  </span>
                  <span className="text-[11px] text-[#666056]">
                    Dedicated engineering sprint for time-sensitive launches
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#FF003D] shrink-0 ml-2">
                +{formatINR(45000)}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Calculation Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#EADBCC] rounded-3xl p-6 sm:p-8 shadow-xl relative sticky top-6">
            <div className="flex items-center justify-between border-b border-[#EADBCC] pb-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF003D]">
                [ Estimated Quotation ]
              </span>
              <span className="text-[11px] font-mono text-[#666056] bg-[#F2ECE4] px-2.5 py-1 rounded-full font-semibold">
                INR (₹) Standard
              </span>
            </div>

            {/* Primary Numbers */}
            <div className="space-y-5 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#666056] block mb-1">
                  Estimated Investment Range
                </span>
                <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#14171A] tracking-tight">
                  {formatINR(lowEstimate)} – {formatINR(highEstimate)}
                </div>
                <span className="text-[11px] text-[#8C8275] font-mono mt-1 block">
                  *Standard agency market rates. Custom quotation finalized after brief.
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADBCC]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666056] block mb-1">
                  Target Delivery Window
                </span>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#FF003D]">
                  ~{calculatedWeeks} Weeks
                </div>
                <span className="text-[11px] text-[#8C8275] font-mono mt-0.5 block">
                  Iterative bi-weekly staging reviews & milestone approvals
                </span>
              </div>
            </div>

            {/* Included Subpoints Checklist */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#666056] font-bold block mb-2.5">
                Included Deliverables:
              </span>
              <ul className="space-y-1.5 text-xs text-[#14171A]">
                <li className="flex items-center gap-2">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Primary: <strong>{activeService.name}</strong></span>
                </li>
                {chosenSubDefs.map((sub) => (
                  <li key={sub.id} className="flex items-center gap-2">
                    <span className="text-[#25D366] font-bold">✓</span>
                    <span>{sub.name}</span>
                  </li>
                ))}
                {isExpedited && (
                  <li className="flex items-center gap-2 text-[#FF003D] font-semibold">
                    <span>⚡</span>
                    <span>Expedited Sprint Turnaround</span>
                  </li>
                )}
                <li className="flex items-center gap-2 text-[#666056]">
                  <span className="text-[#25D366] font-bold">✓</span>
                  <span>Full intellectual property transfer on settlement</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#EADBCC]">
              {/* WhatsApp Lock In */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-display text-base font-extrabold flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
              >
                <span>Discuss This Spec on WhatsApp</span>
                <span>↗</span>
              </a>

              {/* Scroll Up to Inquiry Form */}
              <a
                href="#cta"
                className="w-full py-3.5 px-6 rounded-full bg-[#14171A] hover:bg-[#2C2E33] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Submit Inquiry With This Spec</span>
                <span>↑</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
