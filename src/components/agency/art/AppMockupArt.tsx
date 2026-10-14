import React from 'react';

export default function AppMockupArt() {
  return (
    <div className="w-[58%] h-[88%] bg-[#161d25] rounded-[28px] border-4 border-[#2d3742] shadow-[0_25px_50px_rgba(0,0,0,0.25)] p-3 flex flex-col justify-between text-white transition-transform duration-500 group-hover:scale-[1.04] group-hover:-rotate-1">
      {/* Dynamic Island */}
      <div className="w-[60px] h-3.5 bg-black rounded-[10px] mx-auto mb-3" />
      {/* Content */}
      <div>
        <span className="text-[10px] text-[#8c9196] uppercase tracking-wider">PORTFOLIO VALUE</span>
        <div className="text-xl md:text-2xl font-extrabold my-1 tracking-tight">$84,290.00</div>
        <span className="text-[9px] text-[#27c93f] font-bold">▲ +18.4% THIS MONTH</span>
      </div>
      {/* Card Dark with sparkline */}
      <div className="bg-[rgba(255,255,255,0.08)] rounded-xl p-3 my-2 border border-[rgba(255,255,255,0.1)]">
        <svg className="w-full h-10 stroke-[#ff003d] stroke-[2.5] fill-none" viewBox="0 0 100 30">
          <path d="M 0 25 Q 25 5, 50 20 T 100 5" />
        </svg>
      </div>
      {/* Dock */}
      <div className="h-9 bg-[rgba(255,255,255,0.12)] rounded-full flex justify-around items-center px-2.5">
        <div className="w-2 h-2 rounded-full bg-[#ff003d]" />
        <div className="w-2 h-2 rounded-full bg-white" />
        <div className="w-2 h-2 rounded-full bg-white" />
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
    </div>
  );
}
