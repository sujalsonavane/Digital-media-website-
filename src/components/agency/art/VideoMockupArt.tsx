import React from 'react';

export default function VideoMockupArt() {
  return (
    <div className="w-[90%] h-[80%] bg-[#0d1117] rounded-xl overflow-hidden flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.3)] relative border border-[rgba(255,255,255,0.12)] transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,0,61,0.35)_0%,rgba(22,29,37,0.95)_70%)] z-[1]" />
      
      {/* HUD Top */}
      <div className="relative z-[2] p-3 flex justify-between font-mono text-[10px] text-[rgba(255,255,255,0.85)] tracking-wider">
        <span className="inline-flex items-center gap-1.5 text-[#ff003d] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#ff003d] animate-pulse" /> REC ●
        </span>
        <span>4K RAW 24FPS</span>
        <span>TC 00:04:18:12</span>
      </div>

      {/* Reticle / Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 border border-[rgba(255,255,255,0.3)] rounded-full z-[2] flex items-center justify-center">
        <div className="w-1 h-1 bg-[#ff003d] rounded-full" />
      </div>

      {/* HUD Bottom */}
      <div className="relative z-[2] p-3 flex justify-between items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
        <span className="text-[10px] text-white font-mono">CHRONO LUXE REEL</span>
        <div className="flex gap-[3px] items-end h-4">
          <div className="w-[3px] h-1.5 bg-[#27c93f] rounded-sm" />
          <div className="w-[3px] h-3 bg-[#27c93f] rounded-sm" />
          <div className="w-[3px] h-4 bg-[#ff003d] rounded-sm" />
          <div className="w-[3px] h-2 bg-[#27c93f] rounded-sm" />
        </div>
      </div>
    </div>
  );
}
