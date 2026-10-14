import React from 'react';

export default function AnalyticsMockupArt() {
  return (
    <div className="w-[88%] h-[82%] bg-[#161d25] rounded-xl border border-[rgba(255,255,255,0.1)] shadow-[0_20px_45px_rgba(0,0,0,0.25)] p-4 flex flex-col justify-between text-white transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
      {/* Top KPI tiles */}
      <div className="flex justify-between gap-2.5">
        <div className="flex-1 bg-[rgba(255,255,255,0.06)] rounded-lg p-2 border border-[rgba(255,255,255,0.08)]">
          <div className="text-[9px] uppercase text-[#8c9196] tracking-wider">CONVERSION</div>
          <div className="font-bold text-sm md:text-base mt-0.5">
            4.82% <span className="text-[#27c93f] text-[9px]">▲ +32%</span>
          </div>
        </div>
        <div className="flex-1 bg-[rgba(255,255,255,0.06)] rounded-lg p-2 border border-[rgba(255,255,255,0.08)]">
          <div className="text-[9px] uppercase text-[#8c9196] tracking-wider">ACTIVE FLOW</div>
          <div className="font-bold text-sm md:text-base mt-0.5">128.4K</div>
        </div>
      </div>

      {/* Chart container */}
      <div className="my-2.5 h-20 flex items-end gap-2 pb-1.5 border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex-1 flex gap-[3px] items-end h-full">
          <div className="flex-1 bg-[#ff003d] rounded-t-sm h-[40%]" />
          <div className="flex-1 bg-[rgba(255,255,255,0.3)] rounded-t-sm h-[30%]" />
        </div>
        <div className="flex-1 flex gap-[3px] items-end h-full">
          <div className="flex-1 bg-[#ff003d] rounded-t-sm h-[65%]" />
          <div className="flex-1 bg-[rgba(255,255,255,0.3)] rounded-t-sm h-[45%]" />
        </div>
        <div className="flex-1 flex gap-[3px] items-end h-full">
          <div className="flex-1 bg-[#ff003d] rounded-t-sm h-[85%]" />
          <div className="flex-1 bg-[rgba(255,255,255,0.3)] rounded-t-sm h-[60%]" />
        </div>
        <div className="flex-1 flex gap-[3px] items-end h-full">
          <div className="flex-1 bg-[#ff003d] rounded-t-sm h-[100%]" />
          <div className="flex-1 bg-[rgba(255,255,255,0.3)] rounded-t-sm h-[75%]" />
        </div>
        <div className="flex-1 flex gap-[3px] items-end h-full">
          <div className="flex-1 bg-[#ff003d] rounded-t-sm h-[90%]" />
          <div className="flex-1 bg-[rgba(255,255,255,0.3)] rounded-t-sm h-[55%]" />
        </div>
      </div>

      {/* Footer */}
      <div className="text-[10px] text-[#8c9196] flex justify-between">
        <span>REAL-TIME TELEMETRY</span>
        <span className="text-[#27c93f]">● ACTIVE</span>
      </div>
    </div>
  );
}
