import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-12 py-3 sm:py-4 ${
        isScrolled
          ? 'bg-[#080914]/85 backdrop-blur-md border-b border-white/5 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="group flex items-center gap-2.5 text-decoration-none"
        >
          {/* Orbital mini logo */}
          <div className="relative w-7 h-7 rounded-full border border-[#FF83B4]/60 flex items-center justify-center group-hover:border-[#FF83B4] group-hover:shadow-[0_0_12px_rgba(255,131,180,0.5)] transition-all duration-300">
            <div className="w-2 h-2 rounded-full bg-[#54E6AB] group-hover:scale-125 transition-transform" />
            <div className="absolute inset-0 rounded-full border border-dashed border-[#BD65FF]/40 animate-spin-slow pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <span className="font-heading font-semibold text-sm sm:text-base tracking-wider text-[#F0EDFF] group-hover:text-[#FF83B4] transition-colors">
              {portfolioData.personal.name}
            </span>
            <span className="text-[10px] text-white/40 tracking-widest uppercase font-mono-code -mt-0.5 hidden sm:block">
              CS & AI • Cohort 01
            </span>
          </div>
        </a>

        {/* Right Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {portfolioData.navigation.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium tracking-wide transition-all rounded-full ${
                  isActive
                    ? 'text-[#FF83B4] bg-[#FF83B4]/10 shadow-[0_0_15px_rgba(255,131,180,0.2)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#FF83B4] rounded-full shadow-[0_0_8px_#FF83B4]" />
                )}
              </a>
            );
          })}

          <div className="w-px h-4 bg-white/10 mx-2" />

          {/* Quick Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono-code font-medium text-[#F0EDFF] bg-gradient-to-r from-[#BD65FF]/20 to-[#FF83B4]/20 border border-[#FF83B4]/40 hover:border-[#FF83B4] rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,131,180,0.4)] hover:scale-105"
          >
            <Sparkles className="w-3 h-3 text-[#FF83B4] animate-pulse" />
            <span>Connect</span>
            <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-[#FF83B4]/50 focus:outline-none transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-16 mt-2 p-6 rounded-2xl bg-[#11102F]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {portfolioData.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FF83B4]/15 text-[#FF83B4] border border-[#FF83B4]/30'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#FF83B4]" />}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono-code">
            <span>{portfolioData.personal.learningStatus}</span>
            <span className="w-2 h-2 rounded-full bg-[#54E6AB] animate-ping" />
          </div>
        </div>
      )}
    </header>
  );
};

