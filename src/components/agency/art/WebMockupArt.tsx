import React from 'react';

export default function WebMockupArt() {
  return (
    <div className="w-[86%] h-[82%] bg-white rounded-xl shadow-[0_20px_45px_rgba(0,0,0,0.12)] border border-[rgba(22,29,37,0.08)] flex flex-col overflow-hidden transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
      {/* Browser Bar */}
      <div className="h-7 bg-[#f1f1f3] border-b border-[#e2e2e5] flex items-center px-3 gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
        <div className="ml-3 h-4 w-[55%] bg-white rounded text-[9px] text-[#8c9196] flex items-center px-2 font-mono">
          https://aetheria.studio
        </div>
      </div>
      {/* Stage */}
      <div className="flex-1 p-5 md:p-6 bg-[#fafafb] flex flex-col justify-between">
        <div className="font-extrabold text-xl md:text-2xl text-[#161d25] tracking-tight leading-tight">
          AETHERIA ARCHITECTURE
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-white border border-[#e7e7ea] rounded-md h-20 p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#ff003d]">EDITORIAL PLATFORM</span>
            <span className="text-[8px] text-[#8c9196]">Headless Next.js Experience</span>
          </div>
          <div className="bg-[#161d25] text-white border border-[#161d25] rounded-md h-20 p-2.5 flex flex-col justify-between">
            <span className="text-[10px] font-bold">CONVERSION READY</span>
            <span className="text-[8px] text-[#ffd6df]">Global CDN Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
}
