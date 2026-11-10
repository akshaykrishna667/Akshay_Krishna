import { useRef, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const MagneticButton = ({
  children,
  className = '',
  onClick,
  strength = 0.4,
  as: Tag = 'button',
  href,
  target,
  rel,
  type,
  disabled,
  'aria-label': ariaLabel,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      (el as HTMLElement).style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };

    const handleMouseLeave = () => {
      (el as HTMLElement).style.transform = 'translate3d(0, 0, 0)';
      (el as HTMLElement).style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };

    const handleMouseEnter = () => {
      (el as HTMLElement).style.transition = 'transform 0.1s ease-out';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  if (Tag === 'a') {
    return <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target={target} rel={rel} className={className} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} aria-label={ariaLabel} style={{ willChange: 'transform' }}>{children}</a>;
  }
  return <button ref={ref as React.Ref<HTMLButtonElement>} type={type ?? 'button'} disabled={disabled} className={className} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} aria-label={ariaLabel} style={{ willChange: 'transform' }}>{children}</button>;
};
