import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-based
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or parent has interactive class/tag
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, [role="button"], .interactive-cursor, .project-row');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp for trailing ring
  useEffect(() => {
    if (isTouchDevice) return;

    let animationFrameId: number;
    const lerpFactor = 0.22;

    const animateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * lerpFactor,
        y: prev.y + (position.y - prev.y) * lerpFactor,
      }));
      animationFrameId = requestAnimationFrame(animateTrailing);
    };

    animationFrameId = requestAnimationFrame(animateTrailing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-[#FF83B4] transition-opacity duration-200"
        style={{
          width: '6px',
          height: '6px',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
          opacity: isHovered ? 0.3 : 0.9,
        }}
      />

      {/* Futuristic glowing pink ring (matches Reference 2 cursor) */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-[#FF83B4] transition-all duration-150 ease-out"
        style={{
          width: isHovered ? '48px' : isClicking ? '26px' : '34px',
          height: isHovered ? '48px' : isClicking ? '26px' : '34px',
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : isClicking ? 13 : 17)}px, ${
            trailingPos.y - (isHovered ? 24 : isClicking ? 13 : 17)
          }px, 0) scale(${isClicking ? 0.9 : 1})`,
          boxShadow: isHovered
            ? '0 0 20px rgba(255, 131, 180, 0.6), inset 0 0 10px rgba(255, 131, 180, 0.3)'
            : '0 0 12px rgba(255, 131, 180, 0.4)',
          backgroundColor: isHovered ? 'rgba(255, 131, 180, 0.08)' : 'transparent',
        }}
      />
    </>
  );
};

