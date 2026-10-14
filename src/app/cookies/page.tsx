import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Luminous Digital Studio',
  description: 'Learn how Luminous utilizes essential cookies, local preferences, and performance measurement on our platform.',
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#111215] text-[#f7f8fa] px-4 sm:px-8 md:px-14 py-10 md:py-16 selection:bg-[#ff003d] selection:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/luminous-mark.png"
              alt="Luminous logo"
              width={34}
              height={34}
              className="w-8 h-8 rounded-lg shadow-md border border-white/10 group-hover:scale-105 transition-transform"
            />
            <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-[#ff003d] transition-colors">
              luminous.
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-[#111215] transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold text-[#ff003d] uppercase tracking-widest block mb-2">
            Platform Transparency // Updated October 2026
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            Cookie Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8c9196] leading-relaxed">
            This Cookie Policy describes how Luminous Digital Studio utilizes minimal cookies and local storage tokens to deliver high-performance browser interactions.
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#c4c7cc] leading-relaxed">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies and local browser tokens are compact text fragments stored on your device when you interact with modern web applications. They allow websites to remember session state and render fluid animations without re-fetching resources.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              2. Categories of Cookies We Deploy
            </h2>
            <div className="space-y-4 text-[#8c9196]">
              <div>
                <strong className="text-white block text-sm">Essential & Functional Tokens:</strong>
                Required for core navigation, menu curtain modal states, and enquiry form validation. Disabling these may disrupt interactive features.
              </div>
              <div>
                <strong className="text-white block text-sm">Motion & Performance Preferences:</strong>
                Stores your system preference for reduced motion (`prefers-reduced-motion`) and viewport telemetry to optimize 60fps GSAP animations.
              </div>
              <div>
                <strong className="text-white block text-sm">No Third-Party Ad Trackers:</strong>
                We do not inject third-party ad targeting pixels, cross-site profiling scripts, or social network tracking beacons.
              </div>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              3. Managing Cookie Preferences
            </h2>
            <p>
              You can adjust or revoke cookie storage through your browser settings at any time (e.g., Chrome, Safari, Edge, or Firefox). Blocking functional cookies may alter visual transitions.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8c9196]">
          <span>© 2026 LUMINOUS DIGITAL STUDIO. ALL RIGHTS RESERVED.</span>
          <Link href="/" className="hover:text-white transition-colors">
            Return to Studio Showcase ↑
          </Link>
        </div>
      </div>
    </main>
  );
}
