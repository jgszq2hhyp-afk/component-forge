// @version 2.0.0
// @category animations
// @name ripple-effect
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useRef, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_RIPPLE_COLOR = 'var(--color-primary, oklch(0.6 0.25 260))';
const RIPPLE_SCALE_END = 4;
const RIPPLE_OPACITY_START = 0.35;
const RIPPLE_DURATION_MS = 600;
const REDUCED_MOTION_DURATION_MS = 200;
const REDUCED_MOTION_SCALE = 2;
const REDUCED_MOTION_OPACITY = 0.2;
const CENTER_DIVISOR = 2;

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
    opacity: ${RIPPLE_OPACITY_START};
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(${RIPPLE_SCALE_END});
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes re-ripple {
    from { opacity: ${REDUCED_MOTION_OPACITY}; transform: scale(${REDUCED_MOTION_SCALE}); }
    to   { opacity: 0; transform: scale(${REDUCED_MOTION_SCALE}); }
  }

  .re-wrapper .re-circle {
    animation-duration: ${REDUCED_MOTION_DURATION_MS}ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RippleEffect({
  color = DEFAULT_RIPPLE_COLOR,
  children,
  className,
}: RippleEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  const spawnRipple = useCallback(
    (clientX: number, clientY: number) => {
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
      const x = clientX - rect.left - size / CENTER_DIVISOR;
      const y = clientY - rect.top - size / CENTER_DIVISOR;

      const circle = document.createElement('span');
      circle.className = 're-circle';
      circle.setAttribute('aria-hidden', 'true');
      circle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        pointer-events: none;
        background: ${color};
        animation: re-ripple ${RIPPLE_DURATION_MS}ms ease-out forwards;
      `;

      el.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove());
    },
    [color],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      spawnRipple(e.clientX, e.clientY);
    },
    [spawnRipple],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        spawnRipple(
          rect.left + rect.width / CENTER_DIVISOR,
          rect.top + rect.height / CENTER_DIVISOR,
        );
      }
    },
    [spawnRipple],
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        ref={containerRef}
        role="presentation"
        aria-label="Ripple effect container"
        className={cn(
          're-wrapper relative overflow-hidden',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className,
        )}
        style={{
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </>
  );
}
