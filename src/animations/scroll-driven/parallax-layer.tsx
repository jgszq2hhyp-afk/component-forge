// @version 1.0.0
// @category animations
// @name parallax-layer
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ParallaxLayerProps {
  /** Parallax intensity — 0.1 (subtle) to 1.0 (strong) */
  speed?: number;
  /** Scroll direction of the parallax offset */
  direction?: 'up' | 'down';
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@supports (animation-timeline: scroll()) {
  @keyframes plx-shift-up {
    from { transform: translateY(var(--plx-distance)); }
    to   { transform: translateY(calc(var(--plx-distance) * -1)); }
  }

  @keyframes plx-shift-down {
    from { transform: translateY(calc(var(--plx-distance) * -1)); }
    to   { transform: translateY(var(--plx-distance)); }
  }

  .plx-layer {
    animation-name: var(--plx-anim);
    animation-timeline: scroll();
    animation-timing-function: linear;
    animation-fill-mode: both;
    will-change: transform;
  }
}

@media (prefers-reduced-motion: reduce) {
  .plx-layer {
    animation: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ParallaxLayer({
  speed = 0.5,
  direction = 'up',
  children,
  className,
}: ParallaxLayerProps) {
  const clampedSpeed = Math.min(1, Math.max(0.1, speed));
  const distance = `${clampedSpeed * 100}px`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        className={cn('plx-layer', className)}
        style={
          {
            '--plx-distance': distance,
            '--plx-anim': direction === 'up' ? 'plx-shift-up' : 'plx-shift-down',
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </>
  );
}
