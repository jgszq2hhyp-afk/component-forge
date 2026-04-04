// @version 1.1.0
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
  /** Completely disable parallax (useful for debugging or a11y) */
  disabled?: boolean;
  /** Accessible label — when set, the container is treated as meaningful content */
  'aria-label'?: string;
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

  /* Responsive: halve parallax intensity on small screens */
  @media (max-width: 767px) {
    .plx-layer {
      --plx-distance-mobile: calc(var(--plx-distance) * 0.5);
      animation-name: var(--plx-anim);
    }

    @keyframes plx-shift-up {
      from { transform: translateY(var(--plx-distance-mobile, var(--plx-distance))); }
      to   { transform: translateY(calc(var(--plx-distance-mobile, var(--plx-distance)) * -1)); }
    }

    @keyframes plx-shift-down {
      from { transform: translateY(calc(var(--plx-distance-mobile, var(--plx-distance)) * -1)); }
      to   { transform: translateY(var(--plx-distance-mobile, var(--plx-distance))); }
    }
  }
}

/* Fallback: browsers without scroll-driven animations get no animation */
@supports not (animation-timeline: scroll()) {
  .plx-layer {
    animation: none;
    transform: none;
    will-change: auto;
  }
}

/* Reduced motion: completely static, no transforms at all */
@media (prefers-reduced-motion: reduce) {
  .plx-layer {
    animation: none !important;
    transform: none !important;
    will-change: auto !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ParallaxLayer({
  speed = 0.5,
  direction = 'up',
  disabled = false,
  'aria-label': ariaLabel,
  children,
  className,
}: ParallaxLayerProps) {
  const isDecorative = !ariaLabel;

  // When disabled, render children without any parallax wrapper overhead
  if (disabled) {
    return (
      <div
        className={className}
        aria-hidden={isDecorative || undefined}
        aria-label={ariaLabel}
      >
        {children}
      </div>
    );
  }

  const clampedSpeed = Math.min(1, Math.max(0.1, speed));
  const distance = `${clampedSpeed * 100}px`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        className={cn('plx-layer', className)}
        aria-hidden={isDecorative || undefined}
        aria-label={ariaLabel}
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
