'use client';

import React, { useRef, useState, useEffect } from 'react';
import { projectsData } from '@/data/agencyData';
import WebMockupArt from './art/WebMockupArt';
import AppMockupArt from './art/AppMockupArt';
import VideoMockupArt from './art/VideoMockupArt';
import AnalyticsMockupArt from './art/AnalyticsMockupArt';
import { ArtDirectionType, ProjectItem } from '@/types/agency';
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
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Keyboard escape listener and scroll lock for case study modal
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActiveProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeProject]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        if (pathRef.current) {
          gsap.set(pathRef.current, { strokeDashoffset: 0 });
        }
        gsap.set('.case-card', { opacity: 1, y: 0 });
        return;
      }

      // 1. Thick Pink Spline Ribbon Progressive Stroke Drawing
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
      {/* Wide Pink Continuous Spline Ribbon */}
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
        <div>
          <h2 className="section-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#161d25] leading-[0.95]">
            OUR PROJECTS
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#666f77] tracking-wider uppercase mt-2">
            Selected Work & Architecture Prototypes (2025–2026)
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#ff003d] tracking-widest uppercase bg-[#ff003d]/10 px-3 py-1 rounded-full">
          Click Card for Case Study ↗
        </span>
      </div>

      {/* Asymmetric Case Grid */}
      <div className="case-grid relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
        {projectsData.map((project) => (
          <article
            key={project.id}
            onClick={() => setActiveProject(project)}
            className={`case-card group flex flex-col gap-4 cursor-pointer ${
              project.stagger ? 'md:mt-24' : ''
            }`}
          >
            <div className="block relative w-full aspect-[380/440] rounded-[var(--r-card)] overflow-hidden bg-[#e7e7ea] shadow-[0_15px_35px_rgba(22,29,37,0.07)] transition-all duration-400 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_rgba(22,29,37,0.14)] flex items-center justify-center p-4 sm:p-6">
              <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1.5 bg-[#161d25]/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase rounded-full z-20 pointer-events-none">
                {project.category}
              </span>

              {project.conceptType && (
                <span className="absolute top-4 right-4 sm:top-5 sm:right-5 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#161d25] text-[10px] font-mono font-bold tracking-wider uppercase rounded-full z-20 shadow-sm pointer-events-none">
                  {project.conceptType.includes('Prototype') ? 'Prototype' : 'Case Study'}
                </span>
              )}

              <div className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                {renderArtComponent(project.artType)}
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <div>
                <span className="text-xs font-bold text-[#8c9196] uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#161d25] tracking-tight group-hover:text-[#ff003d] transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#8c9196]">
                {project.discipline}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Case Study Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} Case Study`}
          className="fixed inset-0 z-[1200] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-[#111215] text-white rounded-3xl border border-white/15 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative select-text"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-6 border-b border-white/10 gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#ff003d] text-white text-[11px] font-bold uppercase tracking-wider">
                    {activeProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-[11px] font-mono uppercase tracking-wider">
                    {activeProject.conceptType || 'Interactive Concept Prototype'}
                  </span>
                  {activeProject.year && (
                    <span className="text-xs text-[#8c9196] font-mono">
                      // {activeProject.year}
                    </span>
                  )}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  {activeProject.title}
                </h2>
                {activeProject.client && (
                  <p className="text-xs sm:text-sm text-[#8c9196] mt-1 font-semibold uppercase tracking-wider">
                    Client Partner: {activeProject.client}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close Case Study"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              {/* Executive Overview */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff003d] mb-2">
                  [ 01 // Executive Overview ]
                </h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                  {activeProject.overview}
                </p>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/70 block mb-2">
                    The Challenge
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff003d] block mb-2">
                    Engineered Solution
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Measured Impact Results */}
              {activeProject.results && activeProject.results.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#ff003d] mb-3">
                    [ 02 // Measured Outcomes & Benchmarks ]
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeProject.results.map((res, i) => (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
                      >
                        <span className="text-xs font-bold text-white tracking-wide">
                          {res}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              {activeProject.techStack && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                    Production Architecture
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#8c9196] font-mono">
                LUMINOUS CASE STUDY ARCHIVE
              </span>
              <a
                href="#cta"
                onClick={() => setActiveProject(null)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#ff003d] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#e00036] hover:scale-105 active:scale-95 transition-all text-center shadow-lg"
              >
                Discuss a Similar Build →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
