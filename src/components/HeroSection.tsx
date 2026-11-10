import { ArrowDownRight, Sparkles, Orbit, Compass, Move } from 'lucide-react';
import { WordUniverseAnimation } from './WordUniverseAnimation';
import { MagneticButton } from './MagneticButton';
import { portfolioData } from '../data/portfolioData';

export const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background dot matrix */}
      <div className="absolute inset-0 bg-dot-matrix opacity-15 pointer-events-none" />

      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-[#FF83B4]/15 via-[#BD65FF]/10 to-[#54E6AB]/10 rounded-full blur-[110px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -left-20 w-72 h-72 bg-[#BD65FF]/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#FF83B4]/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '-3s' }} />

      {/* ── Live status badge ── */}
      <div
        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-7 hover:border-[#FF83B4]/50 hover:shadow-[0_0_20px_rgba(255,131,180,0.2)] transition-all duration-300 cursor-default group"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#54E6AB] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#54E6AB]" />
        </span>
        <span className="font-mono-code text-[11px] sm:text-xs text-white/80 tracking-wider uppercase group-hover:text-white transition-colors">
          {portfolioData.personal.learningStatus}
        </span>
        <span className="text-white/20">•</span>
        <span className="font-mono-code text-[11px] sm:text-xs text-[#FF83B4] tracking-wide">
          Cohort 01 — CS&nbsp;&amp;&nbsp;AI
        </span>
      </div>

      {/* ── Interactive Pixel Typography canvas + Headline ── */}
      <div className="w-full max-w-6xl relative my-3 flex flex-col items-center">
        {/* Large Prominent Display Text with Shimmer Gradient */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-center text-white select-none transition-transform duration-300 hover:scale-[1.01] animate-float">
          AKSHAY{' '}
          <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-[#FF83B4] via-[#BD65FF] to-[#54E6AB] animate-shimmer">
            KRISHNA
          </span>{' '}
          KS
        </h1>
        <div className="flex items-center gap-2 mt-3 mb-4 animate-pulse-glow">
          <span className="h-px w-8 bg-[#FF83B4]/60" />
          <p className="font-mono-code text-xs sm:text-sm text-[#FF83B4] tracking-widest uppercase text-glow-pink">
            [ CREATIVE DEVELOPER &amp; AI SPECIALIST ]
          </p>
          <span className="h-px w-8 bg-[#FF83B4]/60" />
        </div>

        {/* ── 3 Interactive Feature Boxes ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl my-4 px-2">
          {/* Box 1 */}
          <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF83B4]/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,131,180,0.18)] overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF83B4]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#FF83B4]/20 transition-all" />
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-[#FF83B4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF83B4] animate-ping" />
              <span>01 // ARTIFICIAL INTELLIGENCE</span>
            </div>
            <h3 className="font-heading font-bold text-white text-base mb-1 group-hover:text-[#FF83B4] transition-colors">
              Neural Systems &amp; ML
            </h3>
            <p className="text-xs text-white/60 font-reading leading-relaxed">
              Studying foundational deep learning architectures, intelligent agents, and algorithmic models.
            </p>
          </div>

          {/* Box 2 */}
          <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#BD65FF]/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(189,101,255,0.18)] overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#BD65FF]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#BD65FF]/20 transition-all" />
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-[#BD65FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BD65FF] animate-ping" />
              <span>02 // CREATIVE CODING</span>
            </div>
            <h3 className="font-heading font-bold text-white text-base mb-1 group-hover:text-[#BD65FF] transition-colors">
              Interactive Web &amp; 3D
            </h3>
            <p className="text-xs text-white/60 font-reading leading-relaxed">
              Crafting fluid particle simulations, micro-interactions, and canvas experiences for modern browsers.
            </p>
          </div>

          {/* Box 3 */}
          <div className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#54E6AB]/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(84,230,171,0.18)] overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#54E6AB]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#54E6AB]/20 transition-all" />
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-[#54E6AB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#54E6AB] animate-ping" />
              <span>03 // CS FOUNDATIONS</span>
            </div>
            <h3 className="font-heading font-bold text-white text-base mb-1 group-hover:text-[#54E6AB] transition-colors">
              First Batch · Thejus
            </h3>
            <p className="text-xs text-white/60 font-reading leading-relaxed">
              Founding batch student at Thejus Engineering College exploring data structures, logic, and systems.
            </p>
          </div>
        </div>

        <div className="w-full relative mt-2">
          <WordUniverseAnimation />
        </div>
      </div>

      {/* ── Cursor interaction hint ── */}
      <div
        className="flex items-center gap-2 mt-2 mb-7 text-xs sm:text-sm font-mono-code text-white/40 tracking-wide"
      >
        <Move className="w-3.5 h-3.5 text-[#FF83B4] animate-pulse" />
        <span>Move your cursor through the universe.</span>
      </div>

      {/* ── Bio tagline ── */}
      <div className="max-w-2xl text-center px-4 mb-10">
        <p className="text-base sm:text-lg md:text-xl lg:text-[1.35rem] text-[#F0EDFF]/88 font-reading font-normal leading-relaxed tracking-tight">
          Computer Science &amp; AI Student exploring the intersection of{' '}
          <span className="text-[#FF83B4] font-medium">code</span>,{' '}
          <span className="text-[#BD65FF] font-medium">intelligence</span>, and{' '}
          <span className="text-[#54E6AB] font-medium">creative technology</span>.
        </p>
      </div>

      {/* ── CTA Buttons with Magnetic Effect ── */}
      <div
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 z-10"
      >
        {/* Primary: Explore Work */}
        <MagneticButton
          className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-[#080914] bg-[#F0EDFF] hover:bg-white hover:shadow-[0_0_30px_rgba(255,131,180,0.6)] transition-colors duration-300 active:scale-95"
          onClick={() => scrollTo('work')}
        >
          <Orbit className="w-4 h-4 text-[#BD65FF] group-hover:rotate-90 transition-transform duration-500" />
          <span className="tracking-wide">Explore My Work</span>
          <ArrowDownRight className="w-4 h-4 text-black/55 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
        </MagneticButton>

        {/* Secondary: Let's Connect */}
        <MagneticButton
          className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium text-[#F0EDFF] bg-[#11102F]/80 hover:bg-[#11102F] border border-[#FF83B4]/40 hover:border-[#FF83B4] hover:shadow-[0_0_28px_rgba(255,131,180,0.3)] transition-colors duration-300 active:scale-95 backdrop-blur-md"
          onClick={() => scrollTo('contact')}
        >
          <Sparkles className="w-4 h-4 text-[#FF83B4]" />
          <span className="tracking-wide">Let's Connect</span>
        </MagneticButton>
      </div>

      {/* ── Stats Row ── */}
      <div
        className="w-full max-w-4xl mt-14 sm:mt-20 pt-6 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
      >
        {portfolioData.stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5 group cursor-default">
            <span className="text-[10px] uppercase font-mono-code text-white/35 tracking-widest mb-0.5">
              {stat.label}
            </span>
            <span className="text-sm font-heading font-semibold text-[#F0EDFF] tracking-wide group-hover:text-[#FF83B4] transition-colors duration-300">
              {stat.value}
            </span>
            <span className="text-[11px] text-white/40 font-reading">{stat.detail}</span>
          </div>
        ))}
      </div>

      {/* ── Scroll down nudge ── */}
      <div
        onClick={() => scrollTo('about')}
        className="mt-10 p-2 cursor-pointer rounded-full border border-white/10 hover:border-[#FF83B4]/60 text-white/35 hover:text-[#FF83B4] transition-all animate-bounce"
        aria-label="Scroll to About section"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollTo('about')}
      >
        <Compass className="w-4 h-4" />
      </div>
    </section>
  );
};
