'use client';

import React, { useState } from 'react';
import { serviceCategories } from '@/data/agencyData';
import { ServiceCategory } from '@/types/agency';

export const EnquirySection: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([
    'Web Development',
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const toggleService = (category: ServiceCategory) => {
    setSelectedServices((prev) =>
      prev.includes(category)
        ? prev.length > 1
          ? prev.filter((item) => item !== category)
          : prev
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false);

    if (!name.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setHasError(true);
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setIsSubmitted(false);
    setHasError(false);
  };

  return (
    <section
      id="cta"
      aria-label="Start a Project Enquiry"
      className="cta-band relative bg-[#ff003d] text-white rounded-[var(--r-panel)] px-[var(--inset)] py-16 sm:py-24 md:py-28 min-h-[34rem] flex flex-col justify-center items-center text-center shadow-[0_20px_40px_rgba(255,0,61,0.2)] overflow-hidden select-none"
    >
      <div className="max-w-5xl w-full mx-auto px-4">
        {!isSubmitted ? (
          <div>
            {/* Header: I need [service badge] (Matching Awake Reference frame 015 & 018) */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
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

            {/* Giant Capsule Input Row: [ your name ] [ email ] [ next -> ] (Matching Awake Reference frame 015 & 018) */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto w-full"
            >
              {/* Name Capsule Input */}
              <div className="relative w-full md:flex-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (hasError) setHasError(false);
                  }}
                  placeholder="your name"
                  aria-label="Your name"
                  required
                  className={`w-full h-16 sm:h-20 md:h-22 px-8 rounded-full bg-transparent text-white placeholder-white/60 border-2 font-display text-2xl sm:text-3xl md:text-4xl font-normal outline-none transition-all duration-200 focus:bg-white/10 focus:border-white ${
                    hasError && !name.trim() ? 'border-white bg-[#d80034]/40 animate-shake' : 'border-white'
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
                    if (hasError) setHasError(false);
                  }}
                  placeholder="email"
                  aria-label="Work email address"
                  required
                  className={`w-full h-16 sm:h-20 md:h-22 px-8 rounded-full bg-transparent text-white placeholder-white/60 border-2 font-display text-2xl sm:text-3xl md:text-4xl font-normal outline-none transition-all duration-200 focus:bg-white/10 focus:border-white ${
                    hasError && (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
                      ? 'border-white bg-[#d80034]/40 animate-shake'
                      : 'border-white'
                  }`}
                />
              </div>

              {/* Next Button Pill */}
              <button
                type="submit"
                aria-label="Proceed to contact dispatch"
                className="w-full md:w-auto h-16 sm:h-20 md:h-22 px-8 sm:px-12 rounded-full bg-white text-[#ff003d] font-display text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-3 cursor-pointer shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                <span>next</span>
                <span>→</span>
              </button>
            </form>

            {hasError && (
              <p className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-black/20 py-2 px-4 rounded-full inline-block animate-shake">
                Please enter your name and a valid email address
              </p>
            )}
          </div>
        ) : (
          /* Submitted State: 4 Contact Cards with Pink Spline Looping Behind (Matching Awake Reference frame 020) */
          <div className="animate-card-enter max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest bg-white text-[#ff003d] px-4 py-1.5 rounded-full inline-block mb-3">
                ENQUIRY RECEIVED
              </span>
              <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
                Thank you, {name}!
              </h3>
              <p className="text-base sm:text-lg text-white/90 mt-2">
                We will contact you at <strong className="text-white underline">{email}</strong> regarding your {selectedServices.join(' & ')} project within 24 hours.
              </p>
            </div>

            {/* 4 Cards (Matching Awake Reference frame 020: Contact us, Representative office, Development team, Working time) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left my-8">
              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl">
                <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Contact us</span>
                <p className="font-bold text-sm text-[#161d25] break-words">hello@luminousdigital.studio</p>
              </div>

              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl">
                <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Representative office</span>
                <p className="font-bold text-sm text-[#161d25]">India</p>
              </div>

              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl">
                <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Development team</span>
                <p className="font-bold text-sm text-[#161d25]">Remote, Global</p>
              </div>

              <div className="bg-white text-[#161d25] rounded-[1.25rem] p-6 shadow-xl">
                <span className="text-xs font-bold uppercase text-[#8c9196] block mb-2">Working time</span>
                <p className="font-bold text-xs text-[#161d25]">09:30–18:30 (IST)<br />Monday–Friday</p>
              </div>
            </div>

            <button
              onClick={handleReset}
              type="button"
              className="mt-4 px-6 py-3 rounded-full bg-white text-[#ff003d] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Submit Another Enquiry ↺
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
