'use client';

import React, { useState, useEffect } from 'react';
import { agencyConfig } from '@/data/agencyData';

export default function WhatsAppButton() {
  const [isDismissed, setIsDismissed] = useState(false);
  const { whatsappUrl, whatsapp } = agencyConfig.contact;

  const targetUrl =
    whatsappUrl ||
    (whatsapp
      ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Luminous%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project.`
      : 'https://wa.me/?text=Hello%20Luminous%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project.');

  // WCAG 1.4.13: Allow dismissing popup message via Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDismissed(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-center select-none group"
      onMouseEnter={() => setIsDismissed(false)}
    >
      {/* Interactive Popup Message Speech Bubble */}
      <div
        role="tooltip"
        id="whatsapp-message-popup"
        className={`absolute bottom-full right-0 mb-3.5 origin-bottom-right transition-all duration-300 ease-out ${
          isDismissed
            ? 'opacity-0 scale-95 pointer-events-none'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:pointer-events-auto'
        }`}
      >
        <div className="bg-[#161d25] text-white border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.45)] rounded-2xl p-3.5 sm:p-4 min-w-[210px] sm:min-w-[240px] relative">
          {/* Header Row: Online Status Badge */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#25D366]">
                Luminous Studio
              </span>
            </div>
            <span className="text-[9px] font-mono text-white/50">
              Online
            </span>
          </div>

          {/* User Requested Message */}
          <p className="text-xs sm:text-sm font-bold text-white leading-snug">
            Need help? Just message us
          </p>

          {/* Micro details */}
          <p className="text-[10px] text-white/60 mt-1 flex items-center gap-1 font-medium">
            <span>⚡ Direct chat with our team</span>
          </p>

          {/* Speech Bubble Tail pointing down towards the WhatsApp button */}
          <div
            className="absolute -bottom-2 right-5 sm:right-6 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#161d25]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Floating Circular WhatsApp Logo Button */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Need help? Just message us on WhatsApp"
        aria-describedby="whatsapp-message-popup"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 group-hover:rotate-6 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        {/* Radar Pulse Glow Ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Official WhatsApp Vector Icon */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Notification indicator dot */}
        <span
          className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#ff003d] border-2 border-white shadow-sm flex items-center justify-center text-[7px] font-black text-white"
          aria-hidden="true"
        >
          1
        </span>
      </a>
    </div>
  );
}
