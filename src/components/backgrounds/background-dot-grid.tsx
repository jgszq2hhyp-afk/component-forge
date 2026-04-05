// @version 1.0.0
// @category backgrounds
// @name background-dot-grid
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_DOT_SIZE = 1;
const DEFAULT_GAP = 24;
const CONTENT_Z_INDEX = 10;
const PATTERN_Z_INDEX = 0;
const FADE_MASK_ID = 'dot-grid-fade-mask';
const PATTERN_ID_PREFIX = 'dot-grid-pattern';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BackgroundDotGridProps {
  /** Radius of each dot in pixels */
  dotSize?: number;
  /** Spacing between dots in pixels */
  gap?: number;
  /** Apply radial gradient fade at edges */
  fade?: boolean;
  /** Additional CSS classes on the wrapper */
  className?: string;
  /** Content rendered on top of the dot grid */
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Component (Server Component - purely decorative, no interactivity)
// ---------------------------------------------------------------------------

export function BackgroundDotGrid({
  dotSize = DEFAULT_DOT_SIZE,
  gap = DEFAULT_GAP,
  fade = false,
  className,
  children,
}: BackgroundDotGridProps) {
  // Unique-ish ID to avoid SVG pattern collisions when multiple grids exist
  const patternId = `${PATTERN_ID_PREFIX}-${gap}-${dotSize}`;

  return (
    <div
      className={cn('relative min-h-screen overflow-hidden', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* SVG dot pattern layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: PATTERN_Z_INDEX }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width={gap}
              height={gap}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={gap / 2}
                cy={gap / 2}
                r={dotSize}
                fill="color-mix(in oklch, var(--foreground) 15%, transparent)"
              />
            </pattern>

            {fade && (
              <radialGradient id={FADE_MASK_ID} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            )}

            {fade && (
              <mask id={`${FADE_MASK_ID}-mask`}>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#${FADE_MASK_ID})`}
                />
              </mask>
            )}
          </defs>

          <rect
            width="100%"
            height="100%"
            fill={`url(#${patternId})`}
            mask={fade ? `url(#${FADE_MASK_ID}-mask)` : undefined}
          />
        </svg>
      </div>

      {/* Content layer */}
      {children != null && (
        <div className="relative" style={{ zIndex: CONTENT_Z_INDEX }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default BackgroundDotGrid;
