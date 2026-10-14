'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/agencyData';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        cardsRef.current.forEach((card) => {
          if (card) gsap.set(card, { clearProps: 'all' });
        });
        return;
      }

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      if (cards.length < 2) return;

      // Cards 1, 2, 3 start off-screen below the viewport
      cards.slice(1).forEach((card) => {
        gsap.set(card, { yPercent: 125 });
      });

      // Pin the services section while user scrolls through the deck
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: '+=2400',
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Cards slide up sequentially and overlay the previous card
      cards.slice(1).forEach((card, index) => {
        tl.to(
          card,
          {
            yPercent: 0,
            ease: 'power2.out',
            duration: 1,
          },
          index * 1.1
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Agency Services & Capabilities"
      className="services-panel relative z-20 bg-[#111215] text-white rounded-[var(--r-panel)] px-[var(--inset)] pt-5 sm:pt-10 md:pt-12 pb-14 sm:pb-20 overflow-hidden select-none min-h-[100dvh] flex flex-col justify-start"
    >
      {/* Centered Section Title */}
      <div className="relative z-10 text-center mb-3 sm:mb-6 md:mb-8">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#ff003d] mb-1 inline-block">
          [ Core Disciplines // 01 — 04 ]
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
          SERVICES
        </h2>
      </div>

      {/* Stepped Overlay Card Deck Stage */}
      <div
        className="services-deck [--stack-base:0.5rem] [--stack-offset:3.5rem] sm:[--stack-base:1rem] sm:[--stack-offset:4.75rem] md:[--stack-offset:5.25rem] relative z-10 max-w-5xl w-full mx-auto flex-1 min-h-[28rem] sm:min-h-[34rem] md:min-h-[36rem]"
      >
        {servicesData.map((service, index) => {
          return (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              tabIndex={0}
              style={{
                backgroundColor: service.bgColor,
                zIndex: (index + 1) * 10,
                top: `calc(var(--stack-base) + ${index} * var(--stack-offset))`,
              }}
              className="service-stack-card group absolute left-0 right-0 rounded-[1.5rem] sm:rounded-[2.25rem] pt-3 sm:pt-5 md:pt-6 pb-3 sm:pb-6 md:pb-7 px-3.5 sm:px-7 md:px-9 text-[#161d25] shadow-[0_-12px_36px_rgba(0,0,0,0.22),0_25px_60px_rgba(0,0,0,0.4)] border border-neutral-300/80 transition-shadow duration-300 origin-top flex flex-col justify-between min-h-[20rem] sm:min-h-[25rem] md:min-h-[27rem]"
            >
              {/* TOP HEADER BAR (Always exposed & visible when cards overlay each other) */}
              <div className="flex justify-between items-center pb-2.5 sm:pb-3.5 border-b border-[#161d25]/15 select-none h-11 sm:h-13 md:h-14">
                <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5">
                  <span className="font-mono text-base sm:text-xl md:text-2xl font-black text-[#ff003d] tracking-tight">
                    {service.index}
                  </span>
                  <div className="h-4 w-[1px] bg-[#161d25]/20 hidden sm:block" />
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-extrabold text-[#161d25] tracking-tight group-hover:text-[#ff003d] transition-colors leading-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#71777f] hidden sm:inline-block">
                    Discipline {service.index}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff003d] inline-block opacity-90 group-hover:scale-125 transition-transform" />
                </div>
              </div>

              {/* CARD BODY CONTENT (Two-Column Layout matching reference video) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 my-4 sm:my-6 flex-1 items-start">
                {/* Left Column: Description & Action */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <p className="text-xs sm:text-sm md:text-[0.98rem] text-[#4a525a] leading-relaxed font-normal mb-4 sm:mb-6">
                    {service.description}
                  </p>

                  <div>
                    <Link
                      href="#cta"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#161d25] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 hover:bg-[#ff003d] hover:scale-105 active:scale-95 shadow-md"
                    >
                      <span>discuss project</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Capabilities list matching reference video */}
                <div className="md:col-span-5 bg-[#161d25]/[0.035] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 md:p-5 border border-[#161d25]/5">
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-[#8c9196] block mb-2 sm:mb-2.5">
                    Capabilities & Deliverables
                  </span>
                  <ul className="grid grid-cols-1 gap-1.5 sm:gap-2">
                    {service.capabilities?.map((cap, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[11px] sm:text-xs md:text-sm font-medium text-[#2d343c]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff003d] shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex justify-between items-center pt-2.5 sm:pt-3 border-t border-[#161d25]/10 text-[10px] sm:text-[11px] font-semibold text-[#8c9196] uppercase tracking-wider select-none">
                <span>Luminous Digital Studio</span>
                <span className="group-hover:text-[#ff003d] transition-colors">
                  Discipline 0{index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
