import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CirclePlay, Film } from 'lucide-react';
import { projectsData } from '@/data/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) notFound();

  const projectNumber = String(projectsData.findIndex((item) => item.slug === slug) + 1).padStart(2, '0');

  return (
    <main className="min-h-screen bg-[#f0f0ef] px-3 py-3 text-[#161d25] sm:px-5 sm:py-5">
      <div className="mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1440px] flex-col rounded-[var(--r-panel)] bg-white p-5 sm:min-h-[calc(100svh-2.5rem)] sm:p-8 md:p-12">
        <header className="flex items-center justify-between gap-4 border-b border-[#161d25]/10 pb-5">
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:text-[#ff003d]">
            <ArrowLeft size={16} aria-hidden="true" />
            All projects
          </Link>
          <Link href="/" aria-label="Luminous Digital Studio home" className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
            luminous<span className="text-[#ff003d]">.</span>
          </Link>
        </header>

        <div className="grid flex-1 content-start gap-8 py-8 sm:py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div className="flex flex-col items-start">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f0f0ef] px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#666f77]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff003d]" />
              Project {projectNumber} / {String(projectsData.length).padStart(2, '0')}
            </span>
            <h1 className="font-display text-5xl font-extrabold leading-[0.92] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-8xl">
              {project.title}<span className="text-[#ff003d]">.</span>
            </h1>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#777f85]">
              {project.category}
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#666f77] sm:text-lg">
              Project details and video will be added here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#projects" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#161d25] px-5 text-sm font-bold text-white transition-colors hover:bg-[#ff003d]">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to gallery
              </Link>
              <a href="mailto:hello@luminousdigital.studio?subject=Project%20enquiry" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#161d25]/15 px-5 text-sm font-bold transition-colors hover:border-[#ff003d] hover:text-[#ff003d]">
                Enquire <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <section aria-label={`${project.title} video`} className="w-full">
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[var(--r-card)] border border-[#161d25]/10 bg-[#111215]">
              {project.videoUrl ? (
                <video
                  className="h-full w-full object-contain"
                  src={project.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} project video`}
                >
                  Your browser does not support embedded video.
                </video>
              ) : (
                <div className="flex max-w-sm flex-col items-center px-6 py-8 text-center text-white">
                  <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#ff003d]">
                    <CirclePlay size={32} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold uppercase tracking-[0.16em]">{project.title} video</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    Video placeholder. Add a video URL in <code className="text-white/80">src/data/projects.ts</code> when your clip is ready.
                  </p>
                  <Film size={18} className="mt-5 text-white/30" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#8c9196]">
              <span>Luminous Digital Studio</span>
              <span>{project.videoUrl ? 'Ready to play' : 'Video not added yet'}</span>
            </div>
          </section>
        </div>

        <footer className="mt-auto flex flex-col justify-between gap-2 border-t border-[#161d25]/10 pt-4 text-[10px] font-mono uppercase tracking-wider text-[#8c9196] sm:flex-row">
          <span>© {new Date().getFullYear()} Luminous Digital Studio</span>
          <span>Project {projectNumber}</span>
        </footer>
      </div>
    </main>
  );
}
