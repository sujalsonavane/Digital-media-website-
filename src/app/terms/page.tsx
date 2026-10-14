import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Luminous Digital Studio',
  description: 'Review the terms and conditions governing digital engagements, intellectual property, and service agreements with Luminous.',
};

export default function TermsOfServicePage() {
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
            Engagement Terms // Updated October 2026
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            Terms of Service
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8c9196] leading-relaxed">
            These Terms of Service govern your use of the Luminous Digital Studio website and form the baseline framework for our client partnerships and digital production engagements.
          </p>
        </div>

        {/* Terms Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#c4c7cc] leading-relaxed">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              1. Studio Scope & Engagements
            </h2>
            <p className="mb-3">
              Luminous provides digital strategy, website development, application engineering, video post-production, and data analytics consulting. Specific project milestones, deliverables, timelines, and payment structures are formalized in a bespoke Statement of Work (SOW) executed between the client and Luminous.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              2. Intellectual Property & Ownership
            </h2>
            <p className="mb-3">
              Upon final settlement of project fees, all bespoke code, custom visual assets, design systems, and client deliverables created specifically for the engagement transfer to the client, subject to standard open-source licenses for foundational libraries.
            </p>
            <p className="text-xs sm:text-sm text-[#8c9196]">
              Luminous retains the right to display project concepts, case studies, and prototypes within our studio portfolio, awards entries, and marketing showcases.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              3. Concept Prototypes & Demonstrations
            </h2>
            <p>
              Portions of this showcase feature proprietary architecture concepts and interactive prototypes designed to demonstrate the studio&apos;s technical and artistic capabilities. Metrics and performance benchmarks represent audited test environments or monitored staging deployments.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              4. Governing Law & Inquiries
            </h2>
            <p>
              These terms are construed under the laws of India. For commercial partnership inquiries or formal agreements, please contact our legal and studio desk at{' '}
              <a href="mailto:hello@luminousdigital.studio" className="text-[#ff003d] underline hover:opacity-80">
                hello@luminousdigital.studio
              </a>.
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
