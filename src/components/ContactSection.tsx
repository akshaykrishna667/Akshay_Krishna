import { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Orbit, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MagneticButton } from './MagneticButton';
import { portfolioData } from '../data/portfolioData';

const GH_ICON = (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LI_ICON = (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);
const X_ICON = (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const ContactSection = () => {
  const [copied, setCopied]         = useState(false);
  const [form, setForm]             = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 90, spread: 72, origin: { y: 0.68 }, colors: ['#FF83B4', '#BD65FF', '#54E6AB', '#FFB66D', '#fff'] });
      setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }, 5500);
    }, 900);
  };

  const socials = [
    { href: portfolioData.personal.github,   icon: GH_ICON, label: 'GitHub',      ariaLabel: 'Visit GitHub profile',      hover: 'hover:border-[#FF83B4]/50 hover:text-[#FF83B4]' },
    { href: portfolioData.personal.linkedin, icon: LI_ICON, label: 'LinkedIn',    ariaLabel: 'Visit LinkedIn profile',    hover: 'hover:border-[#BD65FF]/50 hover:text-[#BD65FF]' },
    { href: portfolioData.personal.twitter,  icon: X_ICON,  label: 'Twitter / X', ariaLabel: 'Visit Twitter / X profile', hover: 'hover:border-[#54E6AB]/50 hover:text-[#54E6AB]' },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5 overflow-hidden">
      {/* Ambient orange bloom */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFB66D]/6 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#FF83B4]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl mx-auto">
        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#FFB66D]" />
          <span className="font-mono-code text-xs uppercase tracking-widest text-[#FFB66D]">
            04 // Transmission & Contact
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left column ── */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="text-4xl sm:text-6xl font-heading font-bold text-[#F0EDFF] tracking-tight leading-[1.05]">
              Let's Create{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF83B4] via-[#BD65FF] to-[#FFB66D]">
                Something.
              </span>
            </h2>

            <p className="text-lg text-white/78 font-reading leading-relaxed max-w-lg">
              Have an idea, opportunity, or interesting project? Let's connect. I'm always open to discussing computer science, artificial intelligence, and creative technology.
            </p>

            {/* Email card */}
            <div className="p-5 rounded-2xl bg-[#11102F]/60 border border-white/[0.08] backdrop-blur-md hover:border-[#FF83B4]/40 transition-all duration-300 group">
              <div className="text-[11px] uppercase font-mono-code text-white/35 tracking-widest mb-3">
                Primary Transmission Channel
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="font-mono-code text-sm sm:text-base text-white/92 font-medium break-all select-all flex-1">
                  {portfolioData.personal.email}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/25 text-white transition-all active:scale-95"
                  >
                    {copied ? <><Check className="w-3.5 h-3.5 text-[#54E6AB]" /><span className="text-[#54E6AB]">Copied!</span></> : <><Copy className="w-3.5 h-3.5 text-white/60" /><span>Copy</span></>}
                  </button>
                  <MagneticButton
                    as="a"
                    href={`mailto:${portfolioData.personal.email}`}
                    className="p-2 rounded-lg bg-[#FF83B4] text-[#080914] hover:bg-white hover:shadow-[0_0_16px_rgba(255,131,180,0.5)] transition-all"
                    aria-label="Send email"
                  >
                    <Mail className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-3 gap-3">
              {socials.map(({ href, icon, label, ariaLabel, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className={`flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/60 transition-all duration-250 group ${hover}`}
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-xs font-mono-code">{label}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>

            {/* Academic telemetry */}
            <div className="text-[11px] font-mono-code text-white/35 flex flex-col gap-1 pt-1 border-t border-white/[0.05]">
              <span>ACADEMIC BASE · {portfolioData.personal.institution}</span>
              <span>COORDINATES · {portfolioData.personal.coordinates}</span>
            </div>
          </div>

          {/* ── Right column: message form ── */}
          <div className="lg:col-span-6">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#11102F]/40 border border-white/[0.08] backdrop-blur-md overflow-hidden">
              {/* Spinning corner orbit decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-dashed border-[#FF83B4]/25 animate-spin-slow pointer-events-none" />
              <div className="absolute -top-5  -right-5  w-20 h-20 rounded-full border border-[#BD65FF]/15 animate-spin-reverse-slow pointer-events-none" />

              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#FF83B4]" />
                <h3 className="font-heading font-semibold text-lg text-white">Dispatch a Message</h3>
              </div>

              {submitted ? (
                <div className="py-14 flex flex-col items-center gap-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#54E6AB]/15 border border-[#54E6AB] flex items-center justify-center shadow-[0_0_24px_rgba(84,230,171,0.4)]">
                    <Check className="w-7 h-7 text-[#54E6AB]" />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-white">Transmission Received!</h4>
                  <p className="text-xs font-mono-code text-white/55 max-w-xs leading-relaxed">
                    Thank you for reaching out. I'll respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { label: 'Your Name',          id: 'name',    type: 'text',  placeholder: 'e.g. Ada Lovelace'   },
                    { label: 'Email Address',       id: 'email',   type: 'email', placeholder: 'ada@domain.com'      },
                  ].map(({ label, id, type, placeholder }) => (
                    <div key={id}>
                      <label className="block text-[11px] font-mono-code text-white/50 mb-1.5 uppercase tracking-wider">
                        {label}
                      </label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={form[id as 'name' | 'email']}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/18 text-sm focus:outline-none focus:border-[#FF83B4] transition-colors font-reading"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-[11px] font-mono-code text-white/50 mb-1.5 uppercase tracking-wider">
                      Message / Inquiry
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your ideas, questions, or opportunities..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/18 text-sm focus:outline-none focus:border-[#FF83B4] transition-colors font-reading resize-none"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-mono-code text-xs uppercase tracking-wider font-semibold text-[#080914] bg-[#FF83B4] hover:bg-white hover:shadow-[0_0_22px_rgba(255,131,180,0.55)] transition-all duration-300 disabled:opacity-50 mt-1"
                    strength={0.25}
                  >
                    {submitting
                      ? <><Orbit className="w-4 h-4 animate-spin" /><span>Sending…</span></>
                      : <><span>Send Transmission</span><Send className="w-3.5 h-3.5" /></>
                    }
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
