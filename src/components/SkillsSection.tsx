import { useState } from 'react';
import { Code2, Globe, Brain, Wrench, Edit3 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { SkillCategory } from '../data/portfolioData';

const ICONS: Record<string, React.ReactNode> = {
  programming: <Code2 className="w-4 h-4" />,
  'web-dev':   <Globe className="w-4 h-4" />,
  'ai-ml':     <Brain className="w-4 h-4" />,
  tools:       <Wrench className="w-4 h-4" />,
};

const ACCENT_COLORS: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  pink:   { text: 'text-[#FF83B4]', bg: 'bg-[#FF83B4]/10',  border: 'border-[#FF83B4]/30', glow: 'group-hover:border-[#FF83B4]/50 group-hover:shadow-[0_0_22px_rgba(255,131,180,0.18)]' },
  mint:   { text: 'text-[#54E6AB]', bg: 'bg-[#54E6AB]/10',  border: 'border-[#54E6AB]/30', glow: 'group-hover:border-[#54E6AB]/50 group-hover:shadow-[0_0_22px_rgba(84,230,171,0.18)]'  },
  purple: { text: 'text-[#BD65FF]', bg: 'bg-[#BD65FF]/10',  border: 'border-[#BD65FF]/30', glow: 'group-hover:border-[#BD65FF]/50 group-hover:shadow-[0_0_22px_rgba(189,101,255,0.18)]' },
  orange: { text: 'text-[#FFB66D]', bg: 'bg-[#FFB66D]/10',  border: 'border-[#FFB66D]/30', glow: 'group-hover:border-[#FFB66D]/50 group-hover:shadow-[0_0_22px_rgba(255,182,109,0.18)]' },
};

export const SkillsSection = () => {
  const [active, setActive] = useState<string>('all');
  const categories = portfolioData.skills;

  const filtered: SkillCategory[] =
    active === 'all' ? categories : categories.filter((c) => c.id === active);

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      {/* Ambient purple bloom */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#BD65FF]/8 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#54E6AB]/6 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#54E6AB]" />
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#54E6AB]">
                02 // Tech Stack & Competencies
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F0EDFF] tracking-tight leading-tight">
              The Things I Work{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#54E6AB] via-[#FF83B4] to-[#BD65FF]">
                With.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono-code text-white/45 max-w-sm">
            <Edit3 className="w-3.5 h-3.5 text-[#54E6AB] shrink-0" />
            <span>Placeholders — update in <code className="text-white/70">portfolioData.ts</code></span>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono-code transition-all duration-250 ${
              active === 'all'
                ? 'bg-[#F0EDFF] text-[#080914] font-semibold shadow-[0_0_16px_rgba(240,237,255,0.4)]'
                : 'bg-white/[0.04] text-white/65 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const ac = ACCENT_COLORS[cat.accentColor];
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono-code transition-all duration-250 ${
                  isActive
                    ? `${ac.text} ${ac.bg} border ${ac.border} shadow-sm`
                    : 'bg-white/[0.04] text-white/65 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
                }`}
              >
                <span className={isActive ? ac.text : 'text-white/50'}>
                  {ICONS[cat.id]}
                </span>
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Skill categories */}
        <div className="flex flex-col gap-10">
          {filtered.map((cat) => {
            const ac = ACCENT_COLORS[cat.accentColor];
            return (
              <div key={cat.id}>
                {/* Category row header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
                  <div className={`flex items-center gap-2.5 ${ac.text}`}>
                    {ICONS[cat.id]}
                    <span className="font-heading font-semibold text-lg text-white">{cat.title}</span>
                  </div>
                  <span className="hidden sm:block text-xs font-mono-code text-white/35 italic">
                    {cat.description}
                  </span>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className={`group relative flex flex-col p-5 rounded-2xl bg-[#11102F]/40 border border-white/[0.06] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 ${ac.glow}`}
                    >
                      {/* Skill name + badge */}
                      <div className="flex items-start justify-between mb-2.5">
                        <span className="text-[0.95rem] font-heading font-semibold text-white leading-tight pr-2">
                          {skill.name}
                        </span>
                        <span className={`shrink-0 text-[10px] font-mono-code px-2 py-0.5 rounded-full border ${ac.text} ${ac.bg} ${ac.border}`}>
                          {skill.badge}
                        </span>
                      </div>

                      {/* Level */}
                      <div className={`text-[11px] font-mono-code mb-2 ${ac.text} opacity-80`}>
                        {skill.level}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-white/55 font-reading leading-relaxed flex-1">
                        {skill.description}
                      </p>

                      {/* Bottom hover line */}
                      <div className={`absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-current to-transparent ${ac.text}`} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
