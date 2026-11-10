import { useEffect, useRef, useState } from 'react';

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseColor: string;
  currentColor: string;
  isAccent: boolean;
  floatAngle: number;
  floatSpeed: number;
  floatRadius: number;
}

// 5x7 dot-matrix font definition for clean pixel typography
const BITMAPS: Record<string, number[]> = {
  'A': [0x0E, 0x11, 0x11, 0x1F, 0x11, 0x11, 0x11],
  'K': [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
  'S': [0x0E, 0x11, 0x10, 0x0E, 0x01, 0x11, 0x0E],
  'H': [0x11, 0x11, 0x11, 0x1F, 0x11, 0x11, 0x11],
  'Y': [0x11, 0x11, 0x0A, 0x04, 0x04, 0x04, 0x04],
  'R': [0x1E, 0x11, 0x11, 0x1E, 0x14, 0x12, 0x11],
  'I': [0x0E, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0E],
  'N': [0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11],
  ' ': [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
};

export const PixelNameAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 100 });
  const animRef = useRef<number>(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const initParticles = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const W = rect.width || window.innerWidth || 800;
    const H = Math.max(rect.height || 260, 240);

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const isMobile = W < 640;
    const textLines = isMobile ? ['AKSHAY', 'KRISHNA KS'] : ['AKSHAY KRISHNA KS'];

    // Dot matrix sizing
    const dotSpacing = isMobile ? Math.max(4, Math.floor(W / 90)) : Math.max(6, Math.floor(W / 125));
    const dotSize = Math.max(2.4, dotSpacing * 0.65);

    const particles: Particle[] = [];
    const charWidthDots = 5;
    const charHeightDots = 7;
    const charGapDots = 2;
    const lineGapDots = 4;

    const totalLines = textLines.length;
    const totalBlockHeight = totalLines * charHeightDots * dotSpacing + (totalLines - 1) * lineGapDots * dotSpacing;
    const startY = (H - totalBlockHeight) / 2;

    const centerX = W / 2;
    const centerY = H / 2;

    textLines.forEach((line, lineIdx) => {
      const lineLen = line.length;
      const totalLineWidth = lineLen * charWidthDots * dotSpacing + (lineLen - 1) * charGapDots * dotSpacing;
      const startX = (W - totalLineWidth) / 2;

      for (let c = 0; c < line.length; c++) {
        const char = line[c];
        const bitmap = BITMAPS[char] || BITMAPS[' '];
        const charStartX = startX + c * (charWidthDots + charGapDots) * dotSpacing;
        const charStartY = startY + lineIdx * (charHeightDots + lineGapDots) * dotSpacing;

        for (let row = 0; row < 7; row++) {
          const rowVal = bitmap[row] || 0;
          for (let col = 0; col < 5; col++) {
            // Check if bit is set (from 0x10 down to 0x01)
            if ((rowVal & (0x10 >> col)) !== 0) {
              const px = charStartX + col * dotSpacing;
              const py = charStartY + row * dotSpacing;

              // Distance from center to create neon pink orbital accent particles
              const distFromCenter = Math.hypot(px - centerX, py - centerY);
              const isAccent = distFromCenter < 120 && Math.random() < 0.45;
              const baseColor = isAccent
                ? (Math.random() > 0.4 ? '#FF83B4' : '#BD65FF')
                : '#F0EDFF';

              particles.push({
                homeX: px,
                homeY: py,
                x: px + (Math.random() - 0.5) * 15,
                y: py + (Math.random() - 0.5) * 15,
                vx: 0,
                vy: 0,
                size: dotSize,
                baseColor,
                currentColor: baseColor,
                isAccent,
                floatAngle: Math.random() * Math.PI * 2,
                floatSpeed: 0.015 + Math.random() * 0.02,
                floatRadius: 0.8 + Math.random() * 1.5,
              });
            }
          }
        }
      }
    });

    particlesRef.current = particles;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    initParticles();

    // ── Mouse & Touch tracking relative to canvas ──
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      setIsInteracting(true);
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      setIsInteracting(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        setIsInteracting(true);
      }
    };

    const handleTouchEnd = () => handleMouseLeave();

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animRef.current);
      initParticles();
    });
    ro.observe(container);

    // ── Physics parameters ──
    const spring = 0.08;
    const friction = 0.82;
    const repelPower = 24;
    let time = 0;

    const getW = () => canvas.width / Math.min(window.devicePixelRatio || 1, 2);
    const getH = () => canvas.height / Math.min(window.devicePixelRatio || 1, 2);

    const render = () => {
      const W = getW();
      const H = getH();
      ctx.clearRect(0, 0, W, H);
      time += 0.02;

      // ── Central orbital ring decoration ──
      const rCx = W / 2;
      const rCy = H / 2;
      const ringR = Math.min(W, H) * 0.18;

      ctx.save();
      ctx.beginPath();
      ctx.arc(rCx, rCy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = '#FF83B4';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 8]);
      ctx.globalAlpha = isInteracting ? 0.75 : 0.45;
      ctx.shadowColor = '#FF83B4';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Orbiting satellite dot
      const satX = rCx + Math.cos(time * 1.5) * ringR;
      const satY = rCy + Math.sin(time * 1.5) * ringR;
      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#FF83B4';
      ctx.globalAlpha = 0.95;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // ── Particle physics simulation ──
      const { x: mx, y: my, radius: mr } = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Idle micro-floating
        p.floatAngle += p.floatSpeed;
        const tx = p.homeX + Math.cos(p.floatAngle) * p.floatRadius;
        const ty = p.homeY + Math.sin(p.floatAngle * 0.7) * p.floatRadius;

        // Mouse repulsion vector
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mr && dist > 0.1) {
          const force = (mr - dist) / mr;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * repelPower * (1.2 + force);
          p.vy -= Math.sin(angle) * force * repelPower * (1.2 + force);
          p.currentColor = '#FF83B4';
        } else {
          if (p.currentColor === '#FF83B4' && !p.isAccent) {
            if (Math.random() < 0.05) p.currentColor = p.baseColor;
          }
        }

        // Hooke's Spring return + friction
        p.vx += (tx - p.x) * spring;
        p.vy += (ty - p.y) * spring;
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;

        // Render dot
        ctx.fillStyle = p.currentColor;
        if (p.currentColor !== '#F0EDFF') {
          ctx.shadowColor = p.currentColor;
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }

      ctx.shadowBlur = 0;
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-crosshair select-none flex items-center justify-center my-4"
      style={{ minHeight: '260px' }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-label="Interactive pixel typography: AKSHAY KRISHNA KS"
      />

      {/* Ambient background glow */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 rounded-3xl transition-opacity duration-700 blur-3xl
          bg-[radial-gradient(ellipse_at_center,rgba(255,131,180,0.18)_0%,rgba(189,101,255,0.12)_45%,transparent_70%)]
          ${isInteracting ? 'opacity-100' : 'opacity-60'}`}
      />
    </div>
  );
};
