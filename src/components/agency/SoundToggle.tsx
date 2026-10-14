'use client';

import React, { useState, useEffect } from 'react';
import { isAudioEnabled, setAudioEnabled, playClickSound } from '@/utils/sound';

export default function SoundToggle({ className = '' }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('luminous_sound') === 'true';
      setEnabled(stored);
      setAudioEnabled(stored);
    } catch {
      // Ignore
    }
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setAudioEnabled(next);
    if (next) {
      setTimeout(() => playClickSound(), 50);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? 'Mute sound effects' : 'Enable ambient sound effects'}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
        enabled
          ? 'bg-white/20 text-white border border-white/40 shadow-sm'
          : 'bg-white/10 text-white/70 hover:text-white border border-white/15 hover:bg-white/15'
      } ${className}`}
    >
      <span className="flex items-end gap-[2px] h-3">
        <span
          className={`w-[2px] bg-current rounded-full transition-all duration-300 ${
            enabled ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-current rounded-full transition-all duration-300 ${
            enabled ? 'h-2 animate-pulse delay-75' : 'h-1 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-current rounded-full transition-all duration-300 ${
            enabled ? 'h-3.5 animate-pulse delay-150' : 'h-2 opacity-40'
          }`}
        />
      </span>
      <span className="text-[11px] font-bold uppercase">
        {enabled ? 'Sound On' : 'Sound Off'}
      </span>
    </button>
  );
}
