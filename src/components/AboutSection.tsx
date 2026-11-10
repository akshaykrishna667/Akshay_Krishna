import { Sparkles, MapPin, GraduationCap, Cpu, Layers, Terminal } from 'lucide-react';
import { OrbitalGraphic } from './OrbitalGraphic';
import { portfolioData } from '../data/portfolioData';

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5">
      {/* Faint dot pattern */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#FF83B4]" />
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#FF83B4]">
            01 // Biography
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left: Editorial bio ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#F0EDFF] tracking-tight leading-[1.1]">
              Beyond the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF83B4] via-[#BD65FF] to-[#54E6AB]">
                Code.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-white/85 font-reading font-normal leading-relaxed">
              {portfolioData.personal.bioLong}
            </p>

            {/* Live status pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#11102F]/60 border border-white/10 self-start hover:border-[#54E6AB]/40 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#54E6AB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#54E6AB]" />
              </span>
              <span className="font-mono-code text-xs text-white/80">
                {portfolioData.personal.learningStatus}
              </span>
            </div>

            {/* Three conceptual pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.07] mt-2 stagger-children">
              {[
                {
                  Icon: Cpu,
                  color: '#FF83B4',
                  title: 'AI & Intelligence',
                  desc: 'Studying machine learning foundations, models, and neural dynamics.',
                  hover: 'hover:border-[#FF83B4]/40 hover:shadow-[0_0_20px_rgba(255,131,180,0.12)]',
                },
                {
                  Icon: Terminal,
                  color: '#BD65FF',
                  title: 'Core Foundations',
                  desc: 'Algorithmic logic, data structures, and CS fundamentals.',
                  hover: 'hover:border-[#BD65FF]/40 hover:shadow-[0_0_20px_rgba(189,101,255,0.12)]',
                },
                {
                  Icon: Layers,
                  color: '#54E6AB',
                  title: 'Creative Web',
                  desc: 'Crafting interactive interfaces with fluid animations.',
                  hover: 'hover:border-[#54E6AB]/40 hover:shadow-[0_0_20px_rgba(84,230,171,0.12)]',
                },
              ].map(({ Icon, color, title, desc, hover }) => (
                <div
                  key={title}
                  className={`p-4 rounded-2xl bg-white/[0.02] border border-white/5 ${hover} transition-all duration-300 group`}
                >
                  <Icon
                    className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform"
                    style={{ color }}
                  />
                  <h3 className="text-sm font-heading font-semibold text-white mb-1">{title}</h3>
                  <p className="text-xs text-white/50 font-reading leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Academic metadata tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                { Icon: GraduationCap, color: '#FF83B4', label: 'Thejus Engineering College' },
                { Icon: Sparkles,      color: '#BD65FF', label: 'First Batch CS & AI' },
                { Icon: MapPin,        color: '#54E6AB', label: 'Thrissur, Kerala' },
              ].map(({ Icon, color, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code bg-white/[0.03] border border-white/10 text-white/70 hover:border-white/25 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Profile Image & Animated Orbital Radar ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#11102F]/40 border border-white/10 backdrop-blur-md relative overflow-hidden hover:border-[#FF83B4]/30 transition-all duration-500 group">
              {/* Faint grid */}
              <div className="absolute inset-0 bg-cosmic-grid opacity-25 pointer-events-none" />

              {/* Corner accent glow */}
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#BD65FF]/20 blur-2xl pointer-events-none group-hover:bg-[#BD65FF]/30 transition-colors" />

              {/* Profile Image Card */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-6 rounded-3xl p-1 bg-gradient-to-tr from-[#FF83B4] via-[#BD65FF] to-[#54E6AB] shadow-[0_0_35px_rgba(255,131,180,0.25)] group-hover:shadow-[0_0_50px_rgba(255,131,180,0.4)] transition-all duration-500">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#080914] relative flex items-center justify-center">
                  <img
                    src="/profile.jpg"
                    alt="Akshay Krishna Ks"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080914]/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Small badge */}
                  <div className="absolute bottom-2 inset-x-2 text-center py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono-code text-[10px] text-white/90">
                    AKSHAY KRISHNA KS
                  </div>
                </div>
              </div>

              <OrbitalGraphic />

              {/* Telemetry footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono-code text-white/45">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#54E6AB] animate-ping" />
                  COORDINATES
                </span>
                <span className="text-white/75">{portfolioData.personal.coordinates}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
