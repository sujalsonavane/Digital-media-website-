'use client';

import React, { useRef, useState } from 'react';
import { teamMembers } from '@/data/agencyData';
import { TeamMember } from '@/types/agency';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mentors = teamMembers.filter((m) => m.tier === 'mentor');
  const coreTeam = teamMembers.filter((m) => m.tier === 'core');

  // GSAP Entrance Stagger
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set('.team-card-unit', { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        '.team-card-unit',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="team"
      aria-label="The People Behind The Work - Mentors, Guides, and Core Team"
      className="team-section relative z-20 bg-[#f1f1f3] text-[#161d25] rounded-[var(--r-panel)] px-[var(--inset)] py-12 sm:py-16 md:py-20 overflow-hidden select-none border border-[#161d25]/5 shadow-xs"
    >
      {/* Corner Precision Plus Markers */}
      <div className="absolute top-5 left-5 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none" aria-hidden="true">+</div>
      <div className="absolute top-5 right-5 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none" aria-hidden="true">+</div>
      <div className="absolute bottom-5 left-5 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none" aria-hidden="true">+</div>
      <div className="absolute bottom-5 right-5 text-xs font-mono font-bold text-[#161d25]/30 select-none pointer-events-none" aria-hidden="true">+</div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Section Header (Matching Screenshot Layout) */}
        <div className="mb-10 sm:mb-12">
          {/* Eyebrow: THE PEOPLE — */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#666f77]">
              THE PEOPLE
            </span>
            <span className="w-8 h-[2px] bg-[#ff003d] rounded-full inline-block" />
          </div>

          {/* Subtitle Eyebrow: MENTORS & GUIDES */}
          <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#8c9196] mb-2">
            MENTORS &amp; GUIDES
          </div>

          {/* Main Title: The people behind the work */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-[#161d25] tracking-tight leading-[1.05] mb-3">
            The people behind the work
          </h2>

          {/* Intro Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#666f77] max-w-2xl leading-relaxed">
            Strategic leadership, creative execution and a shared vision for measurable growth.
            <br className="hidden sm:inline" />
            {' '}Our mentors and core team work together to turn ideas into impactful digital experiences.
          </p>
        </div>

        {/* --------------------------------------------------------- */}
        {/* ROW 1: MENTORS & GUIDES (2 Cards with Connecting Bridge) */}
        {/* --------------------------------------------------------- */}
        <div className="relative mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Mentor Card: Tarun Sethi (5 cols on lg) */}
            <div className="lg:col-span-5">
              {mentors[0] && <TeamCard member={mentors[0]} />}
            </div>

            {/* Central Animated Connector Line (2 cols on lg) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative py-4">
              {/* Horizontal Connecting Wire */}
              <div className="w-full h-[1px] bg-gradient-to-r from-[#161d25]/10 via-[#ff003d]/40 to-[#161d25]/10 relative overflow-hidden">
                {/* Luminous Animated Light Particle */}
                <span className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#ff003d] shadow-[0_0_8px_#ff003d] animate-wirePulse" />
              </div>

              {/* Central Badge */}
              <div className="my-2 px-3 py-1 bg-white border border-[#161d25]/10 rounded-full shadow-2xs text-[9px] font-mono font-bold uppercase tracking-wider text-[#666f77] text-center leading-tight whitespace-nowrap">
                GUIDANCE<br />&amp; MENTORSHIP
              </div>

              {/* Lower Connecting Wire */}
              <div className="w-full h-[1px] bg-gradient-to-r from-[#161d25]/10 via-[#ff003d]/40 to-[#161d25]/10" />
            </div>

            {/* Mobile / Tablet Connector Strip */}
            <div className="flex lg:hidden items-center justify-center gap-3 py-1">
              <span className="h-[1px] w-12 bg-[#161d25]/15" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8c9196] bg-white/80 px-3 py-1 rounded-full border border-[#161d25]/10">
                GUIDANCE &amp; MENTORSHIP
              </span>
              <span className="h-[1px] w-12 bg-[#161d25]/15" />
            </div>

            {/* Right Mentor Card: Munna Khan (5 cols on lg) */}
            <div className="lg:col-span-5">
              {mentors[1] && <TeamCard member={mentors[1]} />}
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* ROW 2: CORE TEAM (3 Cards Grid) */}
        {/* --------------------------------------------------------- */}
        <div>
          {/* Eyebrow: CORE TEAM — */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#666f77]">
              CORE TEAM
            </span>
            <span className="w-8 h-[2px] bg-[#ff003d] rounded-full inline-block" />
          </div>

          {/* 3 Core Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {coreTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Bottom Consultation Strip */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#161d25]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-[#666f77] font-medium">
            Looking to collaborate with our leadership mentors and core engineering team?
          </p>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-[#161d25] hover:text-[#ff003d] transition-colors group shrink-0"
          >
            <span>Book studio consultation</span>
            <span className="transition-transform group-hover:translate-x-1 text-[#ff003d]">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// Interactive Card Component with Cursor Aura Glow & 3D Tilt
// ---------------------------------------------------------
interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showFullStatement, setShowFullStatement] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion()) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 2.2;
    const rotateX = -((y - centerY) / centerY) * 2.2;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease-out',
      }}
      className="team-card-unit team-stagger-card relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 bg-white border border-[#161d25]/10 hover:border-[#ff003d]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-default"
    >
      {/* Interactive Cursor-Following Luminous Aura Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block z-0"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 0, 61, 0.08), transparent 75%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Top Header Row: Avatar, Title, Role, and Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3.5">
            {/* Squircle Dark Avatar Monogram with Aura Glow Ring */}
            <div className="relative shrink-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#161d25] text-white font-display font-black text-lg sm:text-xl flex items-center justify-center shadow-xs border border-white/10 group-hover:scale-105 group-hover:border-[#ff003d]/50 group-hover:shadow-[0_0_20px_rgba(255,0,61,0.25)] transition-all duration-300">
                {member.initials}
              </div>
            </div>

            {/* Member Identity & Titles */}
            <div className="min-w-0">
              <h3 className="font-display text-xl sm:text-2xl font-black text-[#161d25] tracking-tight group-hover:text-[#ff003d] transition-colors leading-tight">
                {member.name}
              </h3>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ff003d] mt-0.5 leading-tight">
                {member.subtitleRole}
              </p>

              {/* Sub-pill (e.g. Director • HS Digital Media / The Chef Cafe) */}
              {member.companyPill && (
                <div className="inline-block text-[11px] font-mono font-semibold text-[#666f77] bg-[#f1f1f3] px-2.5 py-0.5 rounded-full mt-1.5 border border-[#161d25]/5">
                  {member.companyPill}
                </div>
              )}
            </div>
          </div>

          {/* Right Status Pill Badge (● Mentor & Guide / ● Core Team) */}
          <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="whitespace-nowrap">{member.badgeLabel}</span>
          </div>
        </div>

        {/* Member Description Paragraph */}
        <p className="text-xs sm:text-sm text-[#555d65] leading-relaxed mb-5 font-normal">
          {member.bio}
        </p>

        {/* Tarun Sethi Special Expandable Dossier (Full 20+ Years Director Statement) */}
        {member.fullBio && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowFullStatement(!showFullStatement)}
              className="text-[11px] font-mono font-bold text-[#ff003d] hover:text-[#161d25] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{showFullStatement ? 'Close Full Bio' : 'Read Full Director Statement'}</span>
              <span className="text-xs transition-transform">{showFullStatement ? '↑' : '↓'}</span>
            </button>

            {showFullStatement && (
              <div className="mt-3 p-3.5 bg-[#f8f9fa] border border-[#161d25]/8 rounded-xl text-xs text-[#555d65] leading-relaxed space-y-2 animate-fadeIn">
                <p className="font-semibold text-[#161d25]">
                  &ldquo;Having established over two decades of expertise in the marketing and media industry, I have built a career around driving business growth and brand success through strategic leadership and data-driven marketing solutions. As Director at HS Digital Media, I lead integrated campaigns focused on digital marketing, brand communication, and performance media planning.&rdquo;
                </p>
                <p>
                  My expertise lies in designing and executing ROI-focused strategies that deliver measurable impact across industries such as retail, real estate, FMCG, and hospitality. I specialize in aligning business objectives with innovative marketing solutions that enhance brand positioning and ROI.
                </p>
                <p className="font-medium text-[#161d25]">
                  I am committed to fostering innovation, ensuring operational efficiency, and delivering long-term value for clients and stakeholders management.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Capabilities Tags Row */}
      <div className="relative z-10 pt-4 border-t border-[#161d25]/8 mt-auto">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {member.capabilities.map((tag) => (
            <span
              key={tag}
              className="text-[11px] sm:text-xs font-medium px-3 py-1 rounded-full bg-[#f1f1f3] text-[#555d65] hover:bg-[#161d25] hover:text-white hover:scale-105 transition-all duration-200 cursor-default border border-[#161d25]/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
