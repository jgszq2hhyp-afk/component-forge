// @version 1.0.0
// @category dividers
// @name divider-curved
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_HEIGHT = 100;
const DEFAULT_COLOR = 'var(--background)';
const VIEWBOX_WIDTH = 1440;
const VIEWBOX_HEIGHT = 320;

/**
 * Convex curve: smooth S-curve bulging downward.
 * The path starts top-left, curves down via a bezier, then fills the bottom.
 */
const CURVE_PATH_CONVEX =
  'M0,0 C360,320 1080,320 1440,0 L1440,320 L0,320 Z';

/**
 * Concave curve: smooth S-curve bulging upward (inverted).
 * The path starts bottom-left, curves up via a bezier, fills the bottom.
 */
const CURVE_PATH_CONCAVE =
  'M0,320 C360,0 1080,0 1440,320 L1440,320 L0,320 Z';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DividerCurvedProps {
  /** CSS variable or color value for the curve fill */
  color?: string;
  /** Height in pixels */
  height?: number;
  /** Invert the curve (concave instead of convex) */
  invert?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DividerCurved({
  color = DEFAULT_COLOR,
  height = DEFAULT_HEIGHT,
  invert = false,
  className,
}: DividerCurvedProps) {
  const curvePath = invert ? CURVE_PATH_CONCAVE : CURVE_PATH_CONVEX;

  return (
    <div
      className={cn('relative w-full overflow-hidden leading-none', className)}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={curvePath} style={{ fill: color }} />
      </svg>
    </div>
  );
}
