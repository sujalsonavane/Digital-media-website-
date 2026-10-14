import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Luminous Digital Studio',
  description: 'Our privacy policy explains how Luminous collects, utilizes, and protects information submitted by clients and site visitors.',
};

export default function PrivacyPolicyPage() {
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
            Legal & Data Governance // Updated October 2026
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#8c9196] leading-relaxed">
            Luminous Digital Studio (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to honoring your digital privacy. This policy outlines our collection, utilization, and data safeguards across our website and agency communications.
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#c4c7cc] leading-relaxed">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you knowingly submit through our project enquiry forms, direct correspondence, and consultations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#8c9196]">
              <li>Contact details (name, work email address, phone number if provided)</li>
              <li>Company or venture affiliation and project requirements</li>
              <li>Investment parameters and target production timelines</li>
              <li>Technical feedback and correspondence history</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              2. How We Use Collected Data
            </h2>
            <p className="mb-3">
              Your information is exclusively utilized to deliver high-touch digital studio services:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#8c9196]">
              <li>Formulating project proposals, capability audits, and statements of work</li>
              <li>Communicating milestone progress, delivery schedules, and technical recommendations</li>
              <li>Ensuring platform security and preventing abusive form submissions</li>
              <li>We never sell, lease, or distribute your information to external advertisers or brokers.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              3. Telemetry & Analytics
            </h2>
            <p>
              We measure non-identifying aggregate telemetry (page engagement, device viewport characteristics, and interaction velocity) to refine our animations and ensure fast Core Web Vitals. We respect &quot;Do Not Track&quot; browser signals.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">
              4. Data Retention & Your Rights
            </h2>
            <p>
              Project briefs and client correspondence are retained for the duration of prospective or ongoing engagements. You may request data inspection, modification, or deletion at any time by contacting our data controller at{' '}
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
