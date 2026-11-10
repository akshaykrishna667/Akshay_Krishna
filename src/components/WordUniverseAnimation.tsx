import React, { useEffect, useRef, useState } from 'react';

interface SphereWord {
  id: number;
  text: string;
  category: string;
  subtext: string;
  theta: number; // latitude angle
  phi: number;   // longitude angle
  size: number;
  color: string;
  glow: string;
}

const WORDS_DATA = [
  { text: 'Generative AI', category: 'Machine Intelligence', subtext: 'Diffusion & LLMs', size: 34, color: '#F0EDFF', glow: 'rgba(189,101,255,0.7)' },
  { text: 'Neural Systems', category: 'Deep Learning', subtext: 'Transformers & Latent Spaces', size: 32, color: '#FFFFFF', glow: 'rgba(255,131,180,0.6)' },
  { text: 'Creative Code', category: 'Canvas & WebGL', subtext: 'Kinetic Particle Engines', size: 30, color: '#FF83B4', glow: 'rgba(255,131,180,0.8)' },
  { text: 'Physics', category: 'Simulation', subtext: 'Spring Dynamics & Kinematics', size: 28, color: '#E5E0FF', glow: 'rgba(189,101,255,0.5)' },
  { text: 'Shaders', category: 'Graphics GLSL', subtext: 'Raymarching & Noise Dynamics', size: 28, color: '#BD65FF', glow: 'rgba(189,101,255,0.6)' },
  { text: 'Canvas', category: 'Interactive 2D', subtext: 'High-FPS Hardware Accelerated', size: 34, color: '#54E6AB', glow: 'rgba(84,230,171,0.7)' },
  { text: 'Algorithms', category: 'CS Foundations', subtext: 'Graphs, Trees & Optimization', size: 26, color: '#F0EDFF', glow: 'rgba(255,255,255,0.5)' },
  { text: 'Three.js', category: 'WebGL Engine', subtext: 'Spatial & 3D Interactive', size: 25, color: '#FFB66D', glow: 'rgba(255,182,109,0.6)' },
  { text: 'Typography', category: 'Micro-Interactions', subtext: 'Variable Type Dynamics', size: 26, color: '#FFFFFF', glow: 'rgba(255,131,180,0.5)' },
  { text: 'Data', category: 'Analytics', subtext: 'High-Dimension Projection', size: 25, color: '#9D95E0', glow: 'rgba(157,149,224,0.5)' },
  { text: 'Cursors', category: 'Interactive UI', subtext: 'Magnetic Proximity & Trails', size: 22, color: '#FF83B4', glow: 'rgba(255,131,180,0.7)' },
  { text: 'Rust / WASM', category: 'Performance', subtext: 'Low-Level Computation', size: 26, color: '#54E6AB', glow: 'rgba(84,230,171,0.6)' },
  { text: 'Python', category: 'Core Stack', subtext: 'PyTorch & Scientific Compute', size: 24, color: '#FFB66D', glow: 'rgba(255,182,109,0.5)' },
  { text: 'TypeScript', category: 'Web Architecture', subtext: 'Modular & Type-Safe Systems', size: 26, color: '#E0DBFF', glow: 'rgba(189,101,255,0.5)' },
];

export const WordUniverseAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWord, setActiveWord] = useState<typeof WORDS_DATA[0]>(WORDS_DATA[0]);

  // Rotational state around X and Y axes
  const rotationRef = useRef({ rotX: 0, rotY: 0, targetSpeedX: 0.002, targetSpeedY: 0.004, speedX: 0.002, speedY: 0.004 });
  const animRef = useRef<number>(0);
  const wordsSphereRef = useRef<SphereWord[]>([]);

  // Initialize spherical distribution using Fibonacci lattice
  const initSphere = () => {
    const N = WORDS_DATA.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    wordsSphereRef.current = WORDS_DATA.map((w, i) => {
      const y = 1 - (i / (N - 1)) * 2; // -1 to 1
      const theta = phi * i;

      return {
        id: i,
        ...w,
        theta: Math.acos(y), // polar angle
        phi: theta,          // azimuthal angle
      };
    });
  };

  useEffect(() => {
    initSphere();
    const container = containerRef.current;
    if (!container) return;

    // Track mouse velocity and offset from center to drive 3D rotation
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalized coordinates (-1 to 1)
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      // Mouse position directly influences rotational velocity!
      rotationRef.current.targetSpeedY = nx * 0.025;
      rotationRef.current.targetSpeedX = -ny * 0.025;
    };

    const onMouseLeave = () => {
      // Gently return to natural slow cosmic orbit
      rotationRef.current.targetSpeedY = 0.004;
      rotationRef.current.targetSpeedX = 0.002;
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const radius = 175; // Sphere radius in pixels

    // 3D Projection Loop
    const loop = () => {
      const rot = rotationRef.current;

      // Smoothly interpolate speed towards target
      rot.speedX += (rot.targetSpeedX - rot.speedX) * 0.08;
      rot.speedY += (rot.targetSpeedY - rot.speedY) * 0.08;

      rot.rotX += rot.speedX;
      rot.rotY += rot.speedY;

      const cosX = Math.cos(rot.rotX);
      const sinX = Math.sin(rot.rotX);
      const cosY = Math.cos(rot.rotY);
      const sinY = Math.sin(rot.rotY);

      const words = wordsSphereRef.current;

      for (let i = 0; i < words.length; i++) {
        const w = words[i];

        // Base 3D spherical coordinates
        const x0 = radius * Math.sin(w.theta) * Math.cos(w.phi);
        const y0 = radius * Math.cos(w.theta);
        const z0 = radius * Math.sin(w.theta) * Math.sin(w.phi);

        // Rotate around Y axis
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Rotate around X axis
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        // Perspective projection
        const fov = 380;
        const scale = fov / (fov + z2); // words closer to viewer are larger
        const alpha = Math.max(0.18, (z2 + radius) / (2 * radius)); // depth fade

        const el = document.getElementById(`sphere-word-${w.id}`);
        if (el) {
          el.style.transform = `translate3d(calc(-50% + ${x1}px), calc(-50% + ${y2}px), 0) scale(${scale})`;
          el.style.opacity = `${0.35 + alpha * 0.65}`;
          el.style.zIndex = `${Math.round(scale * 100)}`;
        }
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-grab rounded-3xl border border-white/[0.08] bg-[#11102F]/40 backdrop-blur-xl my-6 flex items-center justify-center"
      style={{ height: 'clamp(420px, 52vh, 560px)' }}
    >
      {/* Background celestial coordinate grid */}
      <div className="absolute inset-0 bg-cosmic-grid opacity-20 pointer-events-none" />

      {/* Concentric rotating orbital rings */}
      <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-[#FF83B4]/25 animate-spin-slow pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full border border-[#BD65FF]/15 animate-spin-reverse-slow pointer-events-none" />

      {/* 3D Sphere Center Origin */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none">
        {wordsSphereRef.current.map((word) => (
          <div
            key={word.id}
            id={`sphere-word-${word.id}`}
            onMouseEnter={() => setActiveWord(word)}
            className="absolute pointer-events-auto cursor-pointer transition-[color,transform] duration-150 group whitespace-nowrap"
            style={{ willChange: 'transform, opacity' }}
          >
            <span
              className="font-heading font-extrabold tracking-tight block group-hover:scale-125 group-hover:text-[#FF83B4] group-hover:drop-shadow-[0_0_20px_#FF83B4]"
              style={{
                fontSize: `${word.size}px`,
                color: word.color,
                textShadow: `0 0 20px ${word.glow}`,
              }}
            >
              {word.text}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom-left active telemetry card */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none transition-all duration-300">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#54E6AB] animate-ping" />
          <span className="font-mono-code text-[11px] uppercase tracking-widest text-[#54E6AB]">
            {activeWord?.category || 'Explore'}
          </span>
        </div>
        <h4 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
          {activeWord?.text || 'Akshay Krishna Ks'}
        </h4>
        <p className="font-mono-code text-xs text-white/50 mt-0.5">
          {activeWord?.subtext || 'Interactive Cosmic Developer & AI Specialist'}
        </p>
      </div>

      {/* Top-right telemetry metadata */}
      <div className="absolute top-6 right-6 font-mono-code text-[11px] text-white/40 tracking-wider text-right hidden sm:block pointer-events-none">
        <div>3D SPHERICAL KINEMATICS</div>
        <div className="text-[#FF83B4]">[ CURSOR ROTATION ACTIVE ]</div>
      </div>
    </div>
  );
};
