'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { archiveData } from '@/data/agencyData';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import WebMockupArt from './art/WebMockupArt';
import AppMockupArt from './art/AppMockupArt';
import VideoMockupArt from './art/VideoMockupArt';
import AnalyticsMockupArt from './art/AnalyticsMockupArt';
import { ArtDirectionType, ServiceCategory } from '@/types/agency';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHoveringList, setIsHoveringList] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Setup GSAP quickTo cursor tracking attached to viewport mouse position
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;
    const preview = previewRef.current;
    if (!preview) return;

    // Center pivot of preview card on mouse pointer
    gsap.set(preview, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 });

    const xQuick = gsap.quickTo(preview, 'x', { duration: 0.18, ease: 'power3.out' });
    const yQuick = gsap.quickTo(preview, 'y', { duration: 0.18, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xQuick(e.clientX);
      yQuick(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Smooth entrance / exit animation whenever cursor enters or leaves any client row
  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined') return;
    const preview = previewRef.current;
    if (!preview) return;

    if (isHoveringList && hoveredIndex !== null && window.innerWidth >= 1024) {
      preview.style.display = 'flex';
      gsap.to(preview, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    } else {
      gsap.to(preview, {
        opacity: 0,
        scale: 0.85,
        duration: 0.2,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          if (!isHoveringList && preview) {
            preview.style.display = 'none';
          }
        },
      });
    }
  }, [isHoveringList, hoveredIndex]);

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
    }

    if (nextIndex !== index) {
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

  const activeProject = hoveredIndex !== null ? archiveData[hoveredIndex] : archiveData[0];

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

      {/* Floating Viewport-Attached Cursor-Follow Thumbnail Preview */}
      <div
        ref={previewRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'none',
          willChange: 'transform, opacity',
        }}
        className="w-[250px] h-[300px] rounded-[1.6rem] bg-white border-4 border-white shadow-[0_25px_60px_rgba(22,29,37,0.35)] overflow-hidden flex-col items-center justify-center p-4 select-none"
      >
        <div className="w-full h-full rounded-[1.1rem] overflow-hidden bg-[#e7e7ea] flex items-center justify-center">
          {renderArtComponent(getCategoryArtType(activeProject.category))}
        </div>
        <div className="w-full mt-2.5 flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-[#161d25]">
          <span className="truncate max-w-[130px]">{activeProject.name}</span>
          <span className="text-[#ff003d] shrink-0">{activeProject.category}</span>
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-3">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#ff003d] mb-1.5 block">
            [ Verified Partnerships // 2024 — 2026 ]
          </span>
          <h2 className="section-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#161d25] leading-[0.95]">
            LIVE CLIENTS
          </h2>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-[#666f77] tracking-wider uppercase">
          COMMISSIONED RELEASES & ACTIVE PRODUCTIONS
        </span>
      </div>

      {/* Full-Width Client Rows */}
      <div
        onMouseEnter={() => setIsHoveringList(true)}
        onMouseLeave={() => {
          setIsHoveringList(false);
          setHoveredIndex(null);
        }}
        className="relative z-10 flex flex-col border-t border-[#161d25]/15"
      >
        {archiveData.map((project, idx) => {
          const isCurrent = hoveredIndex === idx;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <div
              key={project.id}
              ref={(el) => {
                rowRefs.current[idx] = el;
              }}
              tabIndex={0}
              onFocus={() => {
                setHoveredIndex(idx);
                setIsHoveringList(true);
              }}
              onBlur={() => {
                setHoveredIndex(null);
                setIsHoveringList(false);
              }}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                setIsHoveringList(true);
              }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-6 md:py-8 border-b border-[#161d25]/15 cursor-pointer transition-opacity duration-300 gap-1.5 sm:gap-4 ${
                isAnyHovered && !isCurrent ? 'opacity-35' : 'opacity-100'
              }`}
            >
              {/* Project Name */}
              <div className="flex items-center justify-between w-full sm:w-auto">
                <h3 className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#161d25] transition-transform duration-300 group-hover:translate-x-2">
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

      {/* Bottom CTA */}
      <div className="relative z-10 mt-10 sm:mt-14 flex items-center">
        <Link
          href="#projects"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold tracking-widest uppercase text-[#161d25] hover:text-[#ff003d] transition-colors"
        >
          <span>EXPLORE ALL CLIENT WORK</span>
          <span>↗</span>
        </Link>
      </div>
    </section>
  );
};
