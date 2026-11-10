import { useState, useEffect } from 'react';
import { ArrowUpRight, Orbit } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection = () => {
  const [hovered, setHovered]       = useState<Project | null>(null);
  const [modalProject, setModal]    = useState<Project | null>(null);
  const [mouse, setMouse]           = useState({ x: 0, y: 0 });
  const [lerp, setLerp]             = useState({ x: 0, y: 0 });
  const [listHovered, setListHov]   = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let id: number;
    const run = () => {
      setLerp((p) => ({
        x: p.x + (mouse.x - p.x) * 0.14,
        y: p.y + (mouse.y - p.y) * 0.14,
      }));
      id = requestAnimationFrame(run);
    };
    id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, [mouse]);

  return (
    <section id="work" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      {/* Ambient pink bloom */}
      <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-[#FF83B4]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-5">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#FF83B4]" />
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#FF83B4]">
                03 // Creative Explorations
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F0EDFF] tracking-tight leading-tight">
              Selected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF83B4] via-[#BD65FF] to-[#54E6AB]">
                Experiments.
              </span>
            </h2>
          </div>
          <span className="text-xs font-mono-code text-white/35 tracking-widest uppercase hidden md:block">
            Hover to preview · Click for specs
          </span>
        </div>

        {/* Project list — Reference 2 large-type rows */}
        <div
          className="flex flex-col border-b border-white/[0.07]"
          onMouseEnter={() => setListHov(true)}
          onMouseLeave={() => { setListHov(false); setHovered(null); }}
        >
          {portfolioData.projects.map((project) => {
            const isHov = hovered?.id === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setHovered(project)}
                onClick={() => setModal(project)}
                className="project-row group relative py-7 sm:py-10 border-t border-white/[0.07] cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all duration-300 select-none"
              >
                {/* Number + Title */}
                <div className="flex items-baseline gap-5 sm:gap-8 transition-transform duration-300 group-hover:translate-x-3">
                  <span className={`font-mono-code text-xs sm:text-sm w-8 shrink-0 transition-colors duration-200 ${isHov ? 'text-[#FF83B4]' : 'text-white/25 group-hover:text-[#FF83B4]'}`}>
                    {project.number}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <h3 className={`text-2xl sm:text-[2.5rem] md:text-5xl font-heading font-medium tracking-tight leading-tight transition-colors duration-200 truncate ${
                      isHov ? 'text-[#FF83B4] text-glow-pink font-semibold' : 'text-[#F0EDFF] group-hover:text-[#FF83B4]'
                    }`}>
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono-code text-white/35 mt-0.5 md:hidden">{project.category}</span>
                  </div>
                </div>

                {/* Meta + Arrow */}
                <div className="flex items-center justify-start md:justify-end gap-6 sm:gap-10 shrink-0">
                  <span className="hidden md:block text-xs font-mono-code uppercase tracking-wider text-white/35 group-hover:text-white/60 transition-colors max-w-[180px] text-right leading-snug">
                    {project.category}
                  </span>
                  <span className="text-xs sm:text-sm font-mono-code text-white/35 group-hover:text-white/80 transition-colors">
                    {project.year}
                  </span>
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isHov ? 'border-[#FF83B4] bg-[#FF83B4]/15' : 'border-white/10 group-hover:border-[#FF83B4]/60'
                  }`}>
                    <ArrowUpRight className={`w-4 h-4 transition-all duration-200 ${isHov ? 'text-[#FF83B4] translate-x-0.5 -translate-y-0.5' : 'text-white/35 group-hover:text-[#FF83B4]'}`} />
                  </div>
                </div>

                {/* Hover row gradient sweep */}
                <div className={`absolute inset-0 -z-10 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-[#FF83B4]/[0.04] via-transparent to-transparent ${isHov ? 'opacity-100' : 'opacity-0'}`} />

                {/* Left edge accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 rounded-r bg-gradient-to-b from-transparent via-[#FF83B4] to-transparent ${isHov ? 'opacity-80' : 'opacity-0'}`} />
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono-code text-white/35">
          <span>{portfolioData.projects.length} PLACEHOLDER EXPERIMENTS · EDITABLE IN portfolioData.ts</span>
          <span className="text-[#FF83B4]/70">· Click any row to view full details ·</span>
        </div>
      </div>

      {/* Floating cursor-attached preview card */}
      {listHovered && hovered && (
        <div
          className="pointer-events-none fixed z-40 hidden lg:block"
          style={{ left: lerp.x + 32, top: lerp.y - 130, transform: 'translate3d(0,0,0)' }}
        >
          <div className="w-72 rounded-2xl overflow-hidden bg-[#0C0C20]/96 border border-white/[0.15] shadow-2xl shadow-black/60 backdrop-blur-xl">
            {/* Gradient thumbnail */}
            <div className={`w-full h-36 bg-gradient-to-br ${hovered.gradient} relative flex items-center justify-center`}>
              <div className="absolute inset-0 bg-cosmic-grid opacity-20" />
              <Orbit className="w-9 h-9 text-white/70 animate-spin-slow" />
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[9px] font-mono-code text-white/75 border border-white/10">
                {hovered.year}
              </div>
              {hovered.featured && (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#FF83B4]/20 border border-[#FF83B4]/40 text-[9px] font-mono-code text-[#FF83B4]">
                  Featured
                </div>
              )}
            </div>
            {/* Info */}
            <div className="p-4 flex flex-col gap-1.5">
              <span className="font-heading font-bold text-sm text-white">{hovered.title}</span>
              <span className="font-mono-code text-[11px] text-[#54E6AB]">{hovered.category}</span>
              <p className="text-[11px] text-white/55 font-reading leading-relaxed line-clamp-2">{hovered.description}</p>
              <div className="mt-1.5 pt-2 border-t border-white/[0.07] flex justify-between text-[10px] font-mono-code text-[#FF83B4]/80">
                <span>Click to expand</span><span>↗</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProjectModal project={modalProject} onClose={() => setModal(null)} />
    </section>
  );
};
