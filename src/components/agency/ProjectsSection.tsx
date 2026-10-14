'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { projectsData } from '@/data/agencyData';
import WebMockupArt from './art/WebMockupArt';
import AppMockupArt from './art/AppMockupArt';
import VideoMockupArt from './art/VideoMockupArt';
import AnalyticsMockupArt from './art/AnalyticsMockupArt';
import { ArtDirectionType } from '@/types/agency';
import { gsap, prefersReducedMotion } from '@/utils/motion';
import { useGSAP } from '@gsap/react';

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

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        if (pathRef.current) {
          gsap.set(pathRef.current, { strokeDashoffset: 0 });
        }
        gsap.set('.case-card', { opacity: 1, y: 0 });
        return;
      }

      // 1. Thick Pink Spline Ribbon Progressive Stroke Drawing (Matching Awake Reference)
      if (pathRef.current) {
        try {
          const pathLength = pathRef.current.getTotalLength() || 2400;
          gsap.set(pathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'bottom 80%',
              scrub: 1.2,
            },
          });
        } catch {
          gsap.set(pathRef.current, { strokeDashoffset: 0 });
        }
      }

      // 2. Project Card Reveal as They Enter View
      gsap.fromTo(
        '.case-card',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.case-grid',
            start: 'top 82%',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Featured Client Projects"
      className="projects-section relative bg-white text-[#161d25] rounded-[var(--r-panel)] px-[var(--inset)] py-14 sm:py-18 md:py-24 overflow-hidden shadow-sm"
    >
      {/* Wide Pink Continuous Spline Ribbon (Matching Awake Reference: 32px stroke, sweeping loops) */}
      <svg
        className="pink-spline-svg absolute top-[8%] left-[2%] w-[96%] h-[85%] pointer-events-none z-[1] hidden md:block"
        viewBox="0 0 1000 1300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M 120 80 C 450 120, 850 160, 820 440 C 790 680, 220 580, 180 840 C 140 1080, 720 1020, 760 1280"
          stroke="#ffa3b8"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />
      </svg>

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-3">
        <h2 className="section-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#161d25] leading-[0.95]">
          OUR PROJECTS
        </h2>
        <span className="text-xs sm:text-sm font-semibold text-[#666f77] tracking-wider uppercase">
          SELECTED CLIENT ARCHIVE (2025–2026)
        </span>
      </div>

      {/* Asymmetric Case Grid */}
      <div className="case-grid relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
        {projectsData.map((project) => (
          <article
            key={project.id}
            className={`case-card group flex flex-col gap-4 cursor-pointer ${
              project.stagger ? 'md:mt-24' : ''
            }`}
          >
            <Link
              href="#cta"
              className="block relative w-full aspect-[380/440] rounded-[var(--r-card)] overflow-hidden bg-[#e7e7ea] shadow-[0_15px_35px_rgba(22,29,37,0.07)] transition-all duration-400 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_rgba(22,29,37,0.14)] flex items-center justify-center p-4 sm:p-6"
            >
              <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1.5 bg-[#161d25]/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase rounded-full z-20 pointer-events-none">
                {project.category}
              </span>

              <div className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                {renderArtComponent(project.artType)}
              </div>
            </Link>

            <div className="flex justify-between items-baseline pt-2">
              <div>
                <span className="text-xs font-bold text-[#8c9196] uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#161d25] tracking-tight group-hover:text-[#ff003d] transition-colors">
                  {project.title}
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#8c9196]">
                {project.discipline}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
