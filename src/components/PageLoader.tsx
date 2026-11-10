import { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const PageLoader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Initializing');

  const phases = [
    'Initializing Systems',
    'Loading Orbital Data',
    'Mapping Star Fields',
    'Rendering Universe',
    'Launching Portfolio',
  ];

  useEffect(() => {
    const duration = 1200;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);

      const phaseIdx = Math.min(phases.length - 1, Math.floor((p / 100) * phases.length));
      setText(phases[phaseIdx]);

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 300);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080914] select-none">
      {/* Concentric glowing rings */}
      <div className="relative w-56 h-56 flex items-center justify-center mb-10">
        {[1, 0.75, 0.52, 0.32].map((scale, i) => (
          <div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${scale * 100}%`,
              height: `${scale * 100}%`,
              borderColor: [
                'rgba(255,131,180,0.3)',
                'rgba(189,101,255,0.25)',
                'rgba(84,230,171,0.2)',
                'rgba(255,182,109,0.2)',
              ][i],
              borderStyle: i % 2 === 0 ? 'dashed' : 'solid',
              animation: `${i % 2 === 0 ? 'spin' : 'spinReverse'} ${20 + i * 8}s linear infinite`,
              boxShadow: `0 0 ${12 - i * 2}px ${
                ['rgba(255,131,180,0.2)', 'rgba(189,101,255,0.15)', 'rgba(84,230,171,0.1)', 'rgba(255,182,109,0.1)'][i]
              }`,
            }}
          />
        ))}

        {/* Central glowing core */}
        <div className="relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#11102F] border border-[#FF83B4]/50 shadow-[0_0_30px_rgba(255,131,180,0.4)]">
          <span className="font-mono-code text-[9px] text-[#54E6AB] tracking-widest uppercase">CS & AI</span>
          <span className="font-heading font-bold text-sm text-white">AK</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF83B4] mt-0.5 animate-ping" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 sm:w-80 flex flex-col items-center gap-3">
        <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#BD65FF] via-[#FF83B4] to-[#54E6AB] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-xs font-mono-code">
          <span className="text-white/60">{text}…</span>
          <span className="text-[#FF83B4]">{progress}%</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      `}</style>
    </div>
  );
};
