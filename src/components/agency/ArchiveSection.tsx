'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { archiveData } from '@/data/agencyData';
import WebMockupArt from './art/WebMockupArt';
import AppMockupArt from './art/AppMockupArt';
import VideoMockupArt from './art/VideoMockupArt';
import AnalyticsMockupArt from './art/AnalyticsMockupArt';
import { ArtDirectionType, ServiceCategory } from '@/types/agency';
import GooeyDistortionView from './GooeyDistortionView';

const PROJECT_IMAGES: Record<ArtDirectionType, string> = {
  web: '/images/projects/web-aetheria.svg',
  app: '/images/projects/app-orbital.svg',
  video: '/images/projects/video-lumina.svg',
  analytics: '/images/projects/analytics-synthesis.svg',
};

const renderArtComponent = (type: ArtDirectionType) => {
  switch (type) {
    case 'web':
      return <WebMockupArt />;
    case 'app':
      return <AppMockupArt />;
    case 'video':
      return <VideoMockupArt />;
    case 'analytics':
      return <AnalyticsMockupArt />;
    default:
      return null;
  }
};

export const ArchiveSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % archiveData.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + archiveData.length) % archiveData.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = archiveData.length - 1;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (nextIndex !== index) {
      setActiveIndex(nextIndex);
      setHoveredIndex(nextIndex);
      rowRefs.current[nextIndex]?.focus();
    }
  };

  const getCategoryArtType = (cat: ServiceCategory): ArtDirectionType => {
    switch (cat) {
      case 'Web Development':
        return 'web';
      case 'Web/App Development':
        return 'app';
      case 'Video Editing':
        return 'video';
      case 'Digital Analytics':
        return 'analytics';
      default:
        return 'web';
    }
  };

  const currentIdx = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const activeProject = archiveData[currentIdx] || archiveData[0];

  return (
    <section
      ref={containerRef}
      id="clients"
      aria-label="Live Clients"
      className="archive-panel relative bg-[#f1f1f3] text-[#161d25] rounded-[var(--r-panel)] px-[var(--inset)] py-14 sm:py-20 md:py-24 overflow-hidden select-none"
    >
      {/* Anchor alias for backwards-compatibility */}
      <span id="archive" className="sr-only" aria-hidden="true" />

      {/* Background Pink Spline Ribbon */}
      <svg
        className="pink-spline-archive absolute inset-0 w-full h-full pointer-events-none z-[1] hidden md:block"
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 650 40 C 950 40, 1050 160, 850 240 C 550 340, 150 280, 250 440 C 350 600, 1100 520, 950 700 C 850 820, 180 720, 140 760 C 100 800, 80 840, 120 860 C 160 880, 200 840, 180 800 C 160 760, 120 760, 100 800"
          stroke="#ffa3b8"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />
      </svg>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-3">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#ff003d] mb-1.5 block">
            [ Concept Engagements // 2024 — 2026 ]
          </span>
          <h2 className="section-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight [word-spacing:0.25em] text-[#161d25] leading-[0.95]">
            CLIENT INDEX
          </h2>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-[#666f77] tracking-wider uppercase">
          Representative Concept Builds & Production Architectures
        </span>
      </div>

      {/* Coordinated Layout: Synchronized 3D Card Deck (Left) + Interactive Rows (Right) */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start gap-8 xl:gap-14">
        {/* Desktop Synchronized 3D Card Deck (Exact Awake Reference Architecture) */}
        <div className="hidden lg:block w-[320px] xl:w-[360px] shrink-0 sticky top-28 self-start">
          <div
            className="relative w-full h-[390px] xl:h-[420px]"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {archiveData.map((project, idx) => {
              const diff = (idx - currentIdx + archiveData.length) % archiveData.length;
              const isFront = diff === 0;
              const isLayer1 = diff === 1;
              const isLayer2 = diff === 2;

              let transform = 'translate3d(0, 36px, -120px) scale(0.82)';
              let opacity = 0;
              let zIndex = 0;

              if (isFront) {
                transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
                opacity = 1;
                zIndex = 30;
              } else if (isLayer1) {
                transform = 'translate3d(10px, 14px, -40px) scale(0.94) rotate(-3deg)';
                opacity = 0.65;
                zIndex = 20;
              } else if (isLayer2) {
                transform = 'translate3d(20px, 26px, -80px) scale(0.88) rotate(3deg)';
                opacity = 0.35;
                zIndex = 10;
              }

              return (
                <div
                  key={project.id}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    pointerEvents: isFront ? 'auto' : 'none',
                    transition:
                      'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="absolute inset-0 w-full h-full rounded-[1.6rem] bg-white border border-[#161d25]/10 shadow-[0_22px_45px_rgba(22,29,37,0.18)] p-4 flex flex-col justify-between select-none"
                >
                  <div className="w-full flex-1 rounded-[1.1rem] overflow-hidden bg-[#e7e7ea] flex items-center justify-center relative min-h-[220px]">
                    {isFront ? (
                      <GooeyDistortionView
                        imageSrc={PROJECT_IMAGES[getCategoryArtType(project.category)]}
                        alt={`${project.name} - ${project.category} preview`}
                        fallbackComponent={renderArtComponent(getCategoryArtType(project.category))}
                        intensity={0.85}
                        chromatic={1.1}
                        radius={0.42}
                      />
                    ) : (
                      renderArtComponent(getCategoryArtType(project.category))
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#161d25]/10 flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-wider uppercase">
                      <span className="text-[#ff003d]">{project.category}</span>
                      <span className="text-[#8c9196]">{project.year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-display font-extrabold text-base text-[#161d25] truncate">
                        {project.name}
                      </h4>
                      <Link
                        href="#projects"
                        className="text-xs font-bold text-[#ff003d] hover:underline shrink-0"
                      >
                        Explore ↗
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Featured Card Preview (< 1024px) */}
        <div className="lg:hidden w-full mb-6">
          <div className="w-full rounded-[1.4rem] bg-white border border-[#161d25]/10 shadow-lg p-3.5 flex flex-col gap-3">
            <div className="w-full h-48 rounded-[1rem] overflow-hidden bg-[#e7e7ea] flex items-center justify-center relative">
              <GooeyDistortionView
                imageSrc={PROJECT_IMAGES[getCategoryArtType(activeProject.category)]}
                alt={`${activeProject.name} - ${activeProject.category} preview`}
                fallbackComponent={renderArtComponent(getCategoryArtType(activeProject.category))}
                intensity={0.8}
                chromatic={1.0}
                radius={0.4}
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <div>
                <span className="text-[#ff003d] font-mono font-bold uppercase tracking-wider block text-[10px]">
                  {activeProject.category} · {activeProject.year}
                </span>
                <span className="font-display font-bold text-base text-[#161d25]">
                  {activeProject.name}
                </span>
              </div>
              <Link
                href="#projects"
                className="px-3.5 py-1.5 rounded-full bg-[#161d25] text-white text-[11px] font-bold uppercase tracking-wider"
              >
                View ↗
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Client Rows */}
        <div
          role="listbox"
          aria-label="Client archive list"
          onMouseLeave={() => {
            setHoveredIndex(null);
          }}
          className="relative z-10 flex-1 w-full flex flex-col border-t border-[#161d25]/15"
        >
          {archiveData.map((project, idx) => {
            const isCurrent = currentIdx === idx;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                role="option"
                aria-selected={isCurrent}
                tabIndex={0}
                onFocus={() => {
                  setHoveredIndex(idx);
                  setActiveIndex(idx);
                }}
                onBlur={() => {
                  setHoveredIndex(null);
                }}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setActiveIndex(idx);
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onClick={() => {
                  setActiveIndex(idx);
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 md:py-6 border-b border-[#161d25]/15 cursor-pointer transition-all duration-300 gap-1.5 sm:gap-4 px-2 rounded-xl ${
                  isCurrent
                    ? 'bg-white/50 opacity-100 pl-4'
                    : isAnyHovered
                    ? 'opacity-35 hover:opacity-100'
                    : 'opacity-100'
                }`}
              >
                {/* Project Name */}
                <div className="flex items-center justify-between w-full sm:w-auto">
                  <h3 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#161d25] transition-transform duration-300 group-hover:translate-x-2">
                    {project.name}
                  </h3>
                  <span className="sm:hidden text-lg font-bold text-[#ff003d] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>

                {/* Discipline & Year */}
                <div className="flex items-center gap-2 sm:gap-6 text-xs sm:text-base md:text-lg font-medium text-[#5a626a] whitespace-nowrap">
                  <span>{project.category}</span>
                  <span className="text-[#a0a5ad] font-bold">·</span>
                  <span
                    className={`font-mono font-bold transition-colors duration-200 ${
                      isCurrent ? 'text-[#ff003d]' : 'text-[#8c9196]'
                    }`}
                  >
                    {project.year}
                  </span>
                  <span className="hidden sm:inline text-sm sm:text-xl font-bold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 mt-10 sm:mt-14 flex items-center">
        <Link
          href="#projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-widest [word-spacing:0.18em] uppercase text-[#161d25] hover:text-[#ff003d] transition-colors"
        >
          <span>EXPLORE ALL CLIENT WORK</span>
          <span>↗</span>
        </Link>
      </div>
    </section>
  );
};
