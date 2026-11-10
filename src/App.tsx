import { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'work', 'contact'];
      const scrollY = window.scrollY + 260;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-triggered section reveals via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="min-h-screen bg-[#080914] text-[#F0EDFF] relative p-2 sm:p-3 md:p-5 lg:p-7"
      >
        {/* Global scroll-progress bar */}
        <ScrollProgress />

        {/* Full-viewport cosmic canvas */}
        <CosmicBackground />

        {/* Custom neon ring cursor */}
        <CustomCursor />

        {/* ── Rounded editorial container ── */}
        <div className="relative w-full max-w-[1560px] mx-auto rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#11102F]/50 backdrop-blur-2xl shadow-[0_0_100px_rgba(17,16,47,0.9)] overflow-hidden">
          {/* Top hairline glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF83B4]/55 to-transparent pointer-events-none z-10" />
          {/* Bottom hairline glow */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#BD65FF]/30 to-transparent pointer-events-none z-10" />
          {/* Left edge accent */}
          <div className="absolute left-0 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-[#FF83B4]/15 to-transparent pointer-events-none" />
          {/* Right edge accent */}
          <div className="absolute right-0 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-[#BD65FF]/15 to-transparent pointer-events-none" />

          <Navbar activeSection={activeSection} />

          <main className="relative z-10 flex flex-col">
            <HeroSection />

            <div className="section-reveal"><AboutSection /></div>
            <div className="section-reveal"><SkillsSection /></div>
            <div className="section-reveal"><ProjectsSection /></div>
            <div className="section-reveal"><ContactSection /></div>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
