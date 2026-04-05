// @version 2.0.0
// @category animations
// @name magnetic-button
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MIN_STRENGTH = 1;
const MAX_STRENGTH = 10;
const DEFAULT_STRENGTH = 5;
const STRENGTH_MULTIPLIER = 0.4;
const OFFSET_DIVISOR = 10;
const TRANSITION_DURATION_MS = 200;
const CENTER_DIVISOR = 2;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MagneticButtonProps {
  /** Magnetic pull strength -- 1 (subtle) to 10 (strong) */
  strength?: number;
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped styles
// ---------------------------------------------------------------------------

const styles = `
.mb-magnetic {
  transition: transform ${TRANSITION_DURATION_MS}ms cubic-bezier(0.33, 1, 0.68, 1);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .mb-magnetic {
    transition: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MagneticButton({
  strength = DEFAULT_STRENGTH,
  children,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
  }, []);

  const clampedStrength = Math.min(MAX_STRENGTH, Math.max(MIN_STRENGTH, strength));
  const multiplier = clampedStrength * STRENGTH_MULTIPLIER;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion.current) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / CENTER_DIVISOR;
      const centerY = rect.top + rect.height / CENTER_DIVISOR;

      setOffset({
        x: (e.clientX - centerX) * (multiplier / OFFSET_DIVISOR),
        y: (e.clientY - centerY) * (multiplier / OFFSET_DIVISOR),
      });
    },
    [multiplier],
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const el = ref.current;
      if (!el) return;
      const focusable = el.querySelector<HTMLElement>(
        'button, a, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.click();
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        ref={ref}
        role="group"
        aria-label="Magnetic hover effect wrapper"
        className={cn(
          'mb-magnetic inline-block',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className,
        )}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </>
  );
}
