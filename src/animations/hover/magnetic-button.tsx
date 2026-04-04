// @version 1.0.0
// @category animations
// @name magnetic-button
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MagneticButtonProps {
  /** Magnetic pull strength — 1 (subtle) to 10 (strong) */
  strength?: number;
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped styles
// ---------------------------------------------------------------------------

const styles = `
.mb-magnetic {
  transition: transform 200ms cubic-bezier(0.33, 1, 0.68, 1);
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
  strength = 5,
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

  const clampedStrength = Math.min(10, Math.max(1, strength));
  const multiplier = clampedStrength * 0.4;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion.current) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setOffset({
        x: (e.clientX - centerX) * (multiplier / 10),
        y: (e.clientY - centerY) * (multiplier / 10),
      });
    },
    [multiplier],
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        ref={ref}
        className={cn('mb-magnetic inline-block', className)}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </>
  );
}
