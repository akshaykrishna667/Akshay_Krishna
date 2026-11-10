import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative py-10 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06]">
      {/* Top hairline gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Identity */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2 text-sm font-heading font-semibold text-white/80 tracking-wide">
            <div className="w-5 h-5 rounded-full border border-[#FF83B4]/50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#54E6AB]" />
            </div>
            {portfolioData.personal.name}
          </div>
          <p className="text-[11px] font-mono-code text-white/35">
            Designed & Developed by Akshay Krishna Ks © {year}
          </p>
        </div>

        {/* Live status */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-[11px] font-mono-code text-white/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#54E6AB] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#54E6AB]" />
          </span>
          Thrissur, Kerala · {portfolioData.personal.batch}
        </div>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] hover:border-[#FF83B4]/50 text-xs font-mono-code text-white/55 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.05] hover:shadow-[0_0_14px_rgba(255,131,180,0.25)]"
        >
          Return to Orbit
          <ArrowUp className="w-3.5 h-3.5 text-[#FF83B4] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
