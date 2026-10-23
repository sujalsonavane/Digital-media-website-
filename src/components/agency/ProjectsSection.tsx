'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import WebMockupArt from './art/WebMockupArt';
import AppMockupArt from './art/AppMockupArt';
import VideoMockupArt from './art/VideoMockupArt';
import AnalyticsMockupArt from './art/AnalyticsMockupArt';
import { ArtDirectionType } from '@/types/agency';
import { gsap } from '@/utils/motion';
import { useGSAP } from '@gsap/react';
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

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      // Desktop: vertical page scrolling scrubs the project track from right to left.
      // Touch screens and reduced-motion users retain a native horizontal scroll track.
      media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const section = sectionRef.current;
        const viewport = viewportRef.current;
        const track = trackRef.current;
        if (!section || !viewport || !track) return;

        const getTravelDistance = () =>
          Math.max(0, track.scrollWidth - viewport.clientWidth);

        gsap.to(track, {
          x: () => -getTravelDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(getTravelDistance(), 1)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="projects-section relative flex min-h-[min(860px,calc(100svh-2.5rem))] flex-col justify-between overflow-hidden rounded-[var(--r-panel)] bg-white px-[var(--inset)] py-8 text-[#161d25] shadow-sm sm:py-10 md:py-12"
    >
      <div className="relative z-10 mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff003d] sm:text-xs">
            Selected work / 01—04
          </p>
          <h2
            id="projects-heading"
            className="section-title font-display text-4xl font-extrabold uppercase leading-[0.94] tracking-tight text-[#161d25] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            OUR PROJECTS<span className="text-[#ff003d]">.</span>
          </h2>
          <p className="mt-3 max-w-xl text-xs font-medium uppercase tracking-wider text-[#666f77] sm:text-sm">
            Scroll to move through the work. Open any project to view its page.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#161d25]/10 bg-[#f0f0ef] px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#161d25] sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff003d]" />
          {String(projectsData.length).padStart(2, '0')} projects
          <span aria-hidden="true">↔</span>
        </span>
      </div>

      <div
        ref={viewportRef}
        className="relative z-10 -mx-1 overflow-x-auto px-1 pb-3 no-scrollbar snap-x snap-mandatory"
        aria-label="Horizontal project gallery"
      >
        <div
          ref={trackRef}
          className="flex w-max items-stretch gap-5 pr-[var(--inset)] sm:gap-7 md:gap-9"
        >
          {projectsData.map((project, index) => (
            <article
              key={project.id}
              className="w-[min(82vw,420px)] shrink-0 snap-start md:w-[min(72vw,760px)]"
            >
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Open ${project.title}`}
                className="group block h-full rounded-[var(--r-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff003d]"
              >
                <div className="relative h-[clamp(280px,44vh,380px)] overflow-hidden rounded-[var(--r-card)] border border-[#161d25]/10 bg-[#e7e7ea] p-3 shadow-[0_12px_30px_rgba(22,29,37,0.06)] transition-[box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_44px_rgba(22,29,37,0.14)] sm:h-[clamp(320px,48vh,440px)] md:h-[clamp(340px,54vh,540px)]">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[calc(var(--r-card)-8px)]">
                    <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]">
                      <GooeyDistortionView
                        imageSrc={PROJECT_IMAGES[project.artType]}
                        alt={`${project.title} preview`}
                        fallbackComponent={renderArtComponent(project.artType)}
                        intensity={0.65}
                        chromatic={0.7}
                        radius={0.42}
                      />
                    </div>
                  </div>

                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#161d25] shadow-sm backdrop-blur">
                    {project.category}
                  </span>
                  <span className="absolute right-5 top-5 rounded-full bg-[#161d25]/90 px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-white backdrop-blur">
                    {String(index + 1).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}
                  </span>
                  <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#ff003d] text-xl text-white shadow-lg transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
                    ↗
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4 px-1 pt-4 sm:pt-5">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8c9196]">
                      Project {index + 1} · {project.category}
                    </p>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#161d25] transition-colors duration-200 group-hover:text-[#ff003d] sm:text-3xl md:text-4xl">
                      {project.title}
                    </h3>
                  </div>
                  <span className="shrink-0 pb-1 text-[10px] font-mono uppercase tracking-wider text-[#666f77] sm:text-xs">
                    Open project
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-[#161d25]/10 pt-4 text-[10px] font-mono uppercase tracking-wider text-[#8c9196] sm:mt-6 sm:pt-5">
        <span>Scroll vertically · Gallery moves horizontally</span>
        <span className="hidden sm:inline">Luminous Digital Studio / Work Index</span>
      </div>
    </section>
  );
};
