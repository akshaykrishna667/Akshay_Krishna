import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number;
  r: number;
  alpha: number;
  baseAlpha: number;
  twinkleOffset: number;
  twinkleSpeed: number;
  color: string;
  px: number; py: number; // parallax factors
}

interface DustParticle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  alpha: number;
}

export const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let raf: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let stars: Star[] = [];
    let dust: DustParticle[] = [];
    const mouse = { tx: 0, ty: 0, x: 0, y: 0 };

    const STAR_COLORS = ['#FFFFFF', '#F5F3FF', '#FF83B4', '#BD65FF', '#54E6AB', '#FFB66D'];
    const DUST_COLORS = ['#FF83B4', '#BD65FF', '#54E6AB', '#FFB66D'];

    const buildStars = () => {
      stars = [];
      const count = Math.min(Math.floor((W * H) / 3600), 240);
      for (let i = 0; i < count; i++) {
        const ba = Math.random() * 0.65 + 0.15;
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.3 + 0.3,
          alpha: ba, baseAlpha: ba,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.006 + Math.random() * 0.016,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          px: Math.random() * 0.4 + 0.05,
          py: Math.random() * 0.4 + 0.05,
        });
      }
    };

    const buildDust = () => {
      dust = [];
      for (let i = 0; i < 28; i++) {
        dust.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.8 + 0.6,
          color: DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
          alpha: Math.random() * 0.3 + 0.08,
        });
      }
    };

    buildStars();
    buildDust();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildStars();
      buildDust();
    };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / W - 0.5) * 2;
      mouse.ty = (e.clientY / H - 0.5) * 2;
    };
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('mousemove', onMouse, { passive: true });

    let t = 0;

    const draw = () => {
      // Smooth mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;
      const px = mouse.x * 22;
      const py = mouse.y * 22;

      // ── Deep space background ──
      const bg = ctx.createRadialGradient(
        W * 0.5 + px * 0.3, H * 0.35 + py * 0.3, W * 0.05,
        W * 0.5, H * 0.5, Math.max(W, H) * 0.9
      );
      bg.addColorStop(0,    '#16143E');
      bg.addColorStop(0.35, '#11102F');
      bg.addColorStop(0.75, '#0B0A1C');
      bg.addColorStop(1,    '#080914');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Nebula blooms (3 zones) ──
      const blooms: [number, number, number, string, number][] = [
        [0.22, 0.18, W * 0.42, '#BD65FF', 0.11],
        [0.78, 0.44, W * 0.38, '#FF83B4', 0.08],
        [0.5,  0.88, W * 0.33, '#54E6AB', 0.06],
      ];
      for (const [bx, by, br, col, op] of blooms) {
        const sx = bx * W + px * (bx > 0.5 ? -1 : 1) * 0.9;
        const sy = by * H + py * (by > 0.5 ? -1 : 1) * 0.9;
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, br);
        g.addColorStop(0, col + Math.round(op * 255).toString(16).padStart(2, '0'));
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Stars ──
      t += 0.01;
      ctx.save();
      for (const s of stars) {
        const a = s.baseAlpha + Math.sin(t * 60 * s.twinkleSpeed + s.twinkleOffset) * 0.2;
        const sx = s.x + px * s.px;
        const sy = s.y + py * s.py;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.95, a));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ── Dust particles ──
      ctx.save();
      for (const d of dust) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = 7;
        ctx.beginPath();
        ctx.arc(d.x + px * 0.55, d.y + py * 0.55, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // ── Concentric neon orbital rings (Reference 1) ──
      const rcx = W * 0.5 + px * 0.6;
      const rcy = H * 0.42 + py * 0.6;
      const baseR = Math.min(W, H);

      const rings: { r: number; color: string; dash: number[]; spd: number; alpha: number }[] = [
        { r: baseR * 0.21, color: '#FF83B4', dash: [3, 9],  spd:  0.0028, alpha: 0.22 },
        { r: baseR * 0.34, color: '#BD65FF', dash: [6, 15], spd: -0.002,  alpha: 0.17 },
        { r: baseR * 0.47, color: '#54E6AB', dash: [2, 11], spd:  0.0015, alpha: 0.13 },
        { r: baseR * 0.61, color: '#FFB66D', dash: [8, 22], spd: -0.001,  alpha: 0.09 },
        { r: baseR * 0.76, color: '#BD65FF', dash: [4, 18], spd:  0.0007, alpha: 0.06 },
      ];

      ctx.save();
      for (let i = 0; i < rings.length; i++) {
        const rg = rings[i];
        ctx.save();
        ctx.translate(rcx, rcy);
        ctx.rotate(t * rg.spd * 20);

        // Ring arc
        ctx.beginPath();
        ctx.arc(0, 0, rg.r, 0, Math.PI * 2);
        ctx.strokeStyle = rg.color;
        ctx.lineWidth = 1;
        ctx.setLineDash(rg.dash);
        ctx.globalAlpha = rg.alpha;
        ctx.shadowColor = rg.color;
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Orbiting satellite dot
        const sa = t * (rg.spd * 50) + i * 0.9;
        const sx = Math.cos(sa) * rg.r;
        const sy = Math.sin(sa) * rg.r;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rg.color;
        ctx.globalAlpha = Math.min(rg.alpha * 3, 0.7);
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.restore();
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
};
