import React, { useEffect } from 'react';
import { X, ExternalLink, Orbit, Tag } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key - must be before any conditional returns
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0E0E24] border border-white/15 p-6 sm:p-8 shadow-2xl shadow-purple-950/50 flex flex-col gap-6 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${project.gradient} opacity-25 blur-2xl pointer-events-none`} />

        {/* Modal Header */}
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-[#FF83B4]">
              <span>EXPERIMENT {project.number}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm font-mono-code text-white/60 mt-1">
              {project.category}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 hover:border-[#FF83B4] text-white/60 hover:text-white transition-colors bg-white/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abstract Visual Gradient Preview Banner */}
        <div className={`w-full h-44 rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10 relative overflow-hidden flex items-center justify-center`}>
          <div className="absolute inset-0 bg-cosmic-grid opacity-20 pointer-events-none" />
          
          <div className="relative flex flex-col items-center gap-2">
            <Orbit className="w-10 h-10 text-[#F0EDFF] animate-spin-slow opacity-80" />
            <span className="font-mono-code text-xs text-white/80 tracking-widest uppercase">
              {project.highlight}
            </span>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs uppercase font-mono-code text-white/40 tracking-wider">
            Overview & Context
          </h4>
          <p className="text-sm sm:text-base text-white/85 font-reading leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Tags / Stack */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs uppercase font-mono-code text-white/40 tracking-wider flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#54E6AB]" />
            <span>Technologies & Keywords</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-mono-code bg-white/[0.04] border border-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions / Links */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium font-mono-code bg-[#FF83B4] text-[#080914] hover:bg-white hover:shadow-[0_0_20px_rgba(255,131,180,0.5)] transition-all font-semibold"
          >
            <span>Live Experiment</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium font-mono-code bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>View Source (Placeholder)</span>
          </a>

          <span className="text-[11px] font-mono-code text-white/40 ml-auto">
            Easily editable in portfolioData.ts
          </span>
        </div>
      </div>
    </div>
  );
};
