// @version 1.0.0
// @category animations
// @name ripple-effect
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useRef, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RippleEffectProps {
  /** CSS color value or variable reference, e.g. "var(--color-primary)" */
  color?: string;
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes re-ripple {
  from {
    opacity: 0.35;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(4);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes re-ripple {
    from { opacity: 0.2; transform: scale(2); }
    to   { opacity: 0; transform: scale(2); }
  }

  .re-wrapper .re-circle {
    animation-duration: 200ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RippleEffect({
  color = 'var(--color-primary, oklch(0.6 0.25 260))',
  children,
  className,
}: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    // Lazily check on first interaction
    if (!prefersReducedMotion.current) {
      prefersReducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
    }

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const circle = document.createElement('span');
    circle.className = 're-circle';
    circle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      pointer-events: none;
      background: ${color};
      animation: re-ripple 600ms ease-out forwards;
    `;

    el.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  }, [color]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        ref={containerRef}
        className={cn('re-wrapper relative overflow-hidden', className)}
        onClick={handleClick}
      >
        {children}
      </div>
    </>
  );
}
