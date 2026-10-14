import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).gsap = gsap;
  (window as unknown as { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Verified Easing & Timing Constants from docs/animation-spec.md
export const MOTION = {
  ease: {
    expoOut: 'power3.out',
    expoInOut: 'power4.inOut',
    textMask: 'cubic-bezier(0.22, 1, 0.36, 1)',
    land: 'back.out(1.5)',
    landSoft: 'back.out(1.2)',
  },
  duration: {
    fast: 0.2,
    base: 0.4,
    hover: 0.6,
    slow: 0.8,
    entrance: 1.2,
  },
};

export { gsap, ScrollTrigger };
