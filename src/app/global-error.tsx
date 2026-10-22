'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Next.js Global Root Layout Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#111215] text-white p-3 sm:p-6 flex flex-col justify-between font-sans selection:bg-[#ff003d] selection:text-white">
        <div className="relative flex-1 bg-[#161d25] rounded-[24px] border border-white/10 p-6 sm:p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <span className="font-extrabold text-2xl tracking-tight text-white">
              luminous<span className="text-[#ff003d]">.</span>
            </span>
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-[#111215] transition-all"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Main Content */}
          <div className="my-auto py-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[11px] font-mono font-bold uppercase tracking-widest text-[#ff003d] mb-4">
              <span>[ STATUS 500 // CRITICAL ROOT EXCEPTION ]</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              APPLICATION ROOT ERROR.
            </h1>
            <p className="text-sm sm:text-base text-[#8c9196] leading-relaxed mb-8">
              A critical root-level error interrupted application layout rendering. Please reset the instance or return to the homepage.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="h-11 px-6 rounded-full bg-[#ff003d] hover:bg-[#d80034] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Reload Application ↻
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                Return to Homepage →
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-white/10 text-xs font-mono text-[#8c9196]">
            LUMINOUS DIGITAL STUDIO · CRITICAL FAULT BOUNDARY
          </div>
        </div>
      </body>
    </html>
  );
}
