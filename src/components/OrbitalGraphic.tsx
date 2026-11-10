import React from 'react';

export const OrbitalGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none mx-auto">
      {/* Outer ambient glow halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#BD65FF]/20 via-[#FF83B4]/15 to-[#54E6AB]/15 blur-2xl animate-pulse-glow" />

      {/* Ring 1 - Outermost Orbit */}
      <div className="absolute w-[94%] h-[94%] rounded-full border border-dashed border-[#54E6AB]/25 animate-spin-slow">
        <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full bg-[#54E6AB] shadow-[0_0_8px_#54E6AB]" />
      </div>

      {/* Ring 2 - Electric Purple Orbit */}
      <div className="absolute w-[78%] h-[78%] rounded-full border border-[#BD65FF]/30 animate-spin-reverse-slow">
        <div className="absolute bottom-4 right-1/4 w-2.5 h-2.5 rounded-full bg-[#BD65FF] shadow-[0_0_10px_#BD65FF]" />
        <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 rounded-full bg-white/60" />
      </div>

      {/* Ring 3 - Neon Pink Orbit with tick marks */}
      <div className="absolute w-[62%] h-[62%] rounded-full border border-dotted border-[#FF83B4]/40 animate-spin-slow">
        <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[#FF83B4] shadow-[0_0_12px_#FF83B4]" />
      </div>

      {/* Ring 4 - Warm Orange Inner Orbit */}
      <div className="absolute w-[44%] h-[44%] rounded-full border border-[#FFB66D]/35 animate-spin-reverse-slow">
        <div className="absolute bottom-1 left-1/3 w-1.5 h-1.5 rounded-full bg-[#FFB66D] shadow-[0_0_6px_#FFB66D]" />
      </div>

      {/* Central Core Pulse */}
      <div className="relative w-20 h-20 rounded-full bg-[#11102F] border border-[#FF83B4]/60 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,131,180,0.35)]">
        <span className="font-mono-code text-[9px] text-[#54E6AB] tracking-wider uppercase font-semibold">
          CS & AI
        </span>
        <span className="font-mono-code text-[11px] text-[#F0EDFF] font-bold">
          01
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF83B4] mt-0.5 animate-ping" />
      </div>

      {/* HUD Telemetry Crosshair markers */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[9px] font-mono-code text-white/30 tracking-widest">
        00°N [THEJUS]
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[9px] font-mono-code text-white/30 tracking-widest">
        10.5276°N • 76.2144°E
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[9px] font-mono-code text-white/30 tracking-widest -rotate-90">
        ORBITAL-AI
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[9px] font-mono-code text-white/30 tracking-widest rotate-90">
        SYS.ACTIVE
      </div>
    </div>
  );
};

