'use client';

import React, { useState, useEffect } from 'react';
import { playClickSound } from '@/utils/sound';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAPTERS = [
  { time: '00:00', title: 'Fluid Web Experiences', client: 'Aetheria Systems' },
  { time: '00:22', title: 'Cross-Platform Telemetry', client: 'Orbital Mobile' },
  { time: '00:45', title: 'Cinematic 3D VFX', client: 'Lumina Studios' },
  { time: '01:02', title: 'Executive Data Cockpits', client: 'Synthesis Engine' },
];

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(28); // Simulated timeline progress
  const [activeChapter, setActiveChapter] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Simulate progress playback
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev >= 100 ? 0 : prev + 1;
        if (next < 25) setActiveChapter(0);
        else if (next < 55) setActiveChapter(1);
        else if (next < 80) setActiveChapter(2);
        else setActiveChapter(3);
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Luminous Studio 2026 Showreel"
      className="fixed inset-0 z-[1300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-10 select-none animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#111215] text-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16181d]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff003d] animate-ping" />
            <span className="font-display text-sm sm:text-base font-extrabold uppercase tracking-tight text-white">
              LUMINOUS // 2026 PRODUCTION REEL [01:15]
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] font-mono text-white/60 uppercase">
              ProRes 4K Master // 60 FPS
            </span>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              aria-label="Close Showreel"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Player Cinema Stage */}
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#161d25] via-[#0f1115] to-[#1c1218] flex items-center justify-center overflow-hidden">
          {/* Animated Waveform Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
            <div className="flex items-end gap-1.5 h-32">
              {[40, 65, 85, 30, 95, 70, 50, 100, 60, 45, 80, 55, 90, 35, 75, 45, 85, 60].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${isPlaying ? h : 20}%` }}
                  className="w-1.5 sm:w-2 bg-[#ff003d] rounded-full transition-all duration-300 ease-in-out"
                />
              ))}
            </div>
          </div>

          {/* Center Stage Info Overlay */}
          <div className="relative z-10 text-center px-4 max-w-xl">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#ffa3b8] px-3 py-1 rounded-full bg-black/40 border border-white/10 inline-block mb-3">
              Now Playing: Chapter 0{activeChapter + 1}
            </span>
            <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              {CHAPTERS[activeChapter].title}
            </h3>
            <p className="text-xs sm:text-sm text-white/75 mt-2 font-mono">
              Commissioned for {CHAPTERS[activeChapter].client}
            </p>

            {/* Play/Pause Button in Center */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsPlaying(!isPlaying);
              }}
              className="mt-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ff003d] hover:bg-[#e00036] hover:scale-110 active:scale-95 text-white flex items-center justify-center text-xl font-bold shadow-2xl transition-all cursor-pointer mx-auto"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>

        {/* Video Scrubber & Controls Bar */}
        <div className="p-4 sm:p-6 bg-[#16181d] border-t border-white/10 space-y-4">
          {/* Progress Timeline Scrubber */}
          <div className="space-y-1">
            <div
              className="w-full h-2 bg-white/15 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.round((clickX / rect.width) * 100);
                setProgress(newProgress);
              }}
            >
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[#ff003d] rounded-full transition-all duration-200 relative"
              />
            </div>

            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-white/60">
              <span>00:{progress < 10 ? `0${progress}` : progress}</span>
              <span>01:15</span>
            </div>
          </div>

          {/* Chapter Buttons & Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveChapter(idx);
                    setProgress(idx * 28);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                    activeChapter === idx
                      ? 'bg-white text-[#111215] font-bold shadow-sm'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {ch.time} // {ch.title.split(' ')[0]}
                </button>
              ))}
            </div>

            <a
              href="#cta"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-[#ff003d] hover:bg-[#e00036] text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md whitespace-nowrap"
            >
              Commission a Project →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
