'use client';

import React, { useState } from 'react';
import { serviceCategories, agencyConfig } from '@/data/agencyData';
import { ServiceCategory } from '@/types/agency';

const BUDGET_OPTIONS = [
  '< $15,000',
  '$15,000 – $30,000',
  '$30,000 – $60,000',
  '$60,000+',
];

const TIMELINE_OPTIONS = [
  'Immediate (< 1 Month)',
  '1 – 3 Months',
  '3 – 6 Months',
  'Flexible / Exploring',
];

export const EnquirySection: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([
    'Web Development',
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [message, setMessage] = useState('');
  const [agreedConsent, setAgreedConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleService = (category: ServiceCategory) => {
    setSelectedServices((prev) =>
      prev.includes(category)
        ? prev.length > 1
          ? prev.filter((item) => item !== category)
          : prev
        : [...prev, category]
    );
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreedConsent) {
      setErrorMessage('Please accept the consent terms to submit your brief.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          services: selectedServices,
          budget,
          timeline,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Server error occurred while submitting.');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network failure. Please email us directly.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setErrorMessage(null);
    setIsSubmitted(false);
  };

  return (
    <section
      id="cta"
      aria-label="Start a Project Enquiry"
      className="cta-band relative bg-[#ff003d] text-white rounded-[var(--r-panel)] px-[var(--inset)] py-14 sm:py-20 md:py-24 min-h-[34rem] flex flex-col justify-center items-center text-center shadow-[0_20px_40px_rgba(255,0,61,0.2)] overflow-hidden select-none"
    >
      <div className="max-w-4xl w-full mx-auto px-4">
        {!isSubmitted ? (
          <div>
            {/* Header: I need [service badge] (Matching Awake Reference frame 015 & 018) */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <span className="font-display text-3xl sm:text-5xl md:text-6xl font-normal text-white">
                I need
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {serviceCategories.map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-sm sm:text-lg md:text-xl font-bold tracking-tight transition-all duration-200 cursor-pointer outline-none ${
                        isSelected
                          ? 'bg-white text-[#ff003d] shadow-lg scale-105'
                          : 'bg-transparent text-white border-2 border-white/60 hover:border-white hover:bg-white/10 active:scale-95'
                      }`}
                    >
                      {service.toLowerCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: Core Contact (Awake Reference matching) */}
            {step === 1 && (
              <form
                onSubmit={handleStep1Submit}
                noValidate
                className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto w-full animate-card-enter"
              >
                {/* Name Capsule Input */}
                <div className="relative w-full md:flex-1">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="your name"
                    aria-label="Your name"
                    required
                    className={`w-full h-16 sm:h-20 md:h-22 px-8 rounded-full bg-transparent text-white placeholder-white/60 border-2 font-display text-2xl sm:text-3xl md:text-4xl font-normal outline-none transition-all duration-200 focus:bg-white/10 focus:border-white ${
                      errorMessage && !name.trim() ? 'border-white bg-[#d80034]/40 animate-shake' : 'border-white'
                    }`}
                  />
                </div>

                {/* Email Capsule Input */}
                <div className="relative w-full md:flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="email"
                    aria-label="Work email address"
                    required
                    className={`w-full h-16 sm:h-20 md:h-22 px-8 rounded-full bg-transparent text-white placeholder-white/60 border-2 font-display text-2xl sm:text-3xl md:text-4xl font-normal outline-none transition-all duration-200 focus:bg-white/10 focus:border-white ${
                      errorMessage && !email.trim() ? 'border-white bg-[#d80034]/40 animate-shake' : 'border-white'
                    }`}
                  />
                </div>

                {/* Next Button Pill */}
                <button
                  type="submit"
                  aria-label="Proceed to project brief details"
                  className="w-full md:w-auto h-16 sm:h-20 md:h-22 px-8 sm:px-12 rounded-full bg-white text-[#ff003d] font-display text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-3 cursor-pointer shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  <span>next</span>
                  <span>→</span>
                </button>
              </form>
            )}

            {/* Direct WhatsApp Instant Consultation Prompt */}
            {step === 1 && agencyConfig.contact.whatsapp && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-white/95">
                <span>Prefer immediate conversation?</span>
                <a
                  href={agencyConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#111215] font-bold text-xs tracking-wide transition-all shadow-lg hover:bg-neutral-100 hover:scale-105 active:scale-95"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Chat on WhatsApp: {agencyConfig.contact.whatsapp} ↗</span>
                </a>
              </div>
            )}

            {/* STEP 2: Qualification & Scope Details */}
            {step === 2 && (
              <form
                onSubmit={handleFinalSubmit}
                noValidate
                className="max-w-2xl mx-auto w-full text-left bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 animate-card-enter shadow-2xl flex flex-col gap-6"
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                      Step 2 of 2 // Project Qualification
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      Tell us about your venture
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white px-3 py-1.5 rounded-full border border-white/30 hover:border-white transition-all cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company-name" className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                    Company / Organization (Optional)
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Corp / Stealth Startup"
                    className="w-full h-12 px-5 rounded-2xl bg-white/10 text-white placeholder-white/40 border border-white/30 font-medium text-sm sm:text-base outline-none focus:border-white focus:bg-white/20 transition-all"
                  />
                </div>

                {/* Budget Range Selector */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                    Target Investment Range
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGET_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(opt)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all text-center cursor-pointer ${
                          budget === opt
                            ? 'bg-white text-[#ff003d] shadow-md'
                            : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline Selector */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                    Target Timeline
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setTimeline(opt)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold tracking-tight transition-all text-center cursor-pointer ${
                          timeline === opt
                            ? 'bg-white text-[#ff003d] shadow-md'
                            : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Vision Notes */}
                <div>
                  <label htmlFor="project-message" className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-2">
                    Project Goals / Reference Notes (Optional)
                  </label>
                  <textarea
                    id="project-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your target objectives, key requirements, or existing links..."
                    className="w-full p-4 rounded-2xl bg-white/10 text-white placeholder-white/40 border border-white/30 text-sm outline-none focus:border-white focus:bg-white/20 transition-all resize-none"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={agreedConsent}
                    onChange={(e) => setAgreedConsent(e.target.checked)}
                    className="w-4 h-4 rounded accent-white cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-white/85 cursor-pointer select-none">
                    I agree to receive project correspondence from Luminous Studio regarding this inquiry.
                  </label>
                </div>

                {/* Action Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex-1 h-14 rounded-full bg-white text-[#ff003d] font-display text-lg sm:text-xl font-black flex items-center justify-center gap-3 cursor-pointer shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-[#ff003d]" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Transmitting Brief...
                      </span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                role="alert"
                className="mt-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-black/40 border border-white/30 py-3 px-6 rounded-full inline-block animate-shake"
              >
                {errorMessage}
              </div>
            )}
          </div>
        ) : (
          /* Submitted State: 4 Contact Cards with Pink Spline Looping Behind (Matching Awake Reference frame 020) */
          <div className="animate-card-enter max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest bg-white text-[#ff003d] px-4 py-1.5 rounded-full inline-block mb-3">
                ENQUIRY RECEIVED & LOGGED
              </span>
              <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
                Thank you, {name}!
              </h3>
              <p className="text-base sm:text-lg text-white/90 mt-2 max-w-2xl mx-auto">
                We have received your brief for <strong className="text-white underline">{selectedServices.join(' & ')}</strong> ({budget}, {timeline}). We will contact you at <strong className="text-white underline">{email}</strong> within 24 hours.
              </p>
            </div>

            {/* 4 Cards (Matching Awake Reference frame 020: Contact us, Representative office, Development team, Working time) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left my-8">
              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Direct Studio Contact</span>
                  <p className="font-bold text-sm text-[#161d25] break-words mb-2">{agencyConfig.contact.email}</p>
                </div>
                {agencyConfig.contact.whatsapp && (
                  <a
                    href={agencyConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:text-[#1eb855] font-bold transition-colors pt-2 border-t border-neutral-100"
                  >
                    <span>💬 WhatsApp: {agencyConfig.contact.whatsapp} ↗</span>
                  </a>
                )}
              </div>

              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl">
                <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Representative Office</span>
                <p className="font-bold text-sm text-[#161d25]">India</p>
              </div>

              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl">
                <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Development Team</span>
                <p className="font-bold text-sm text-[#161d25]">Full-Stack & Systems</p>
              </div>

              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl">
                <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Working Time</span>
                <p className="font-bold text-xs text-[#161d25]">09:30–18:30 (IST)<br />Monday–Friday</p>
              </div>
            </div>

            <button
              onClick={handleReset}
              type="button"
              className="mt-4 px-6 py-3 rounded-full bg-white text-[#ff003d] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer shadow-lg"
            >
              Submit Another Enquiry ↺
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
