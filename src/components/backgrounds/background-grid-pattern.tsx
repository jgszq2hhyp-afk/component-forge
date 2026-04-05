// @version 1.0.0
// @category backgrounds
// @name background-grid-pattern
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_GRID_SIZE = 40;

const PATTERN_ID = "gridPattern" as const;

const MASK_ID = "gridRadialMask" as const;

const LINE_STROKE_WIDTH = 1;

const RADIAL_GRADIENT_INNER_STOP = 0;

const RADIAL_GRADIENT_OUTER_STOP = 0.7;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BackgroundGridPatternProps {
  gridSize?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

/**
 * SVG grid line pattern with a radial gradient mask.
 *
 * Place inside a `relative` parent container.
 * The grid lines fade out toward the edges via a radial-gradient mask,
 * creating a spotlight/vignette effect.
 *
 * Fully non-interactive (pointer-events-none) and hidden from screen readers.
 * Respects prefers-reduced-motion by disabling any subtle animations.
 */
export default function BackgroundGridPattern({
  gridSize = DEFAULT_GRID_SIZE,
  className,
}: BackgroundGridPatternProps) {
  /* Ensure grid size is at least 10px */
  const safeGridSize = Math.max(10, gridSize);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        "motion-reduce:opacity-50",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Grid line pattern */}
          <pattern
            id={PATTERN_ID}
            width={safeGridSize}
            height={safeGridSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical line */}
            <line
              x1={safeGridSize}
              y1={0}
              x2={safeGridSize}
              y2={safeGridSize}
              strokeWidth={LINE_STROKE_WIDTH}
              style={{ stroke: "var(--border, hsl(0 0% 90%))" }}
            />
            {/* Horizontal line */}
            <line
              x1={0}
              y1={safeGridSize}
              x2={safeGridSize}
              y2={safeGridSize}
              strokeWidth={LINE_STROKE_WIDTH}
              style={{ stroke: "var(--border, hsl(0 0% 90%))" }}
            />
          </pattern>

          {/* Radial gradient mask: visible at center, fading to edges */}
          <radialGradient id={MASK_ID} cx="50%" cy="50%" r="50%">
            <stop
              offset={`${RADIAL_GRADIENT_INNER_STOP * 100}%`}
              stopColor="white"
              stopOpacity={1}
            />
            <stop
              offset={`${RADIAL_GRADIENT_OUTER_STOP * 100}%`}
              stopColor="white"
              stopOpacity={0}
            />
          </radialGradient>

          {/* Mask definition using the radial gradient */}
          <mask id={`${MASK_ID}-mask`}>
            <rect
              width="100%"
              height="100%"
              fill={`url(#${MASK_ID})`}
            />
          </mask>
        </defs>

        {/* Grid rectangle with mask applied */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#${PATTERN_ID})`}
          mask={`url(#${MASK_ID}-mask)`}
          className={cn(
            "motion-safe:transition-opacity motion-safe:duration-500",
            "motion-reduce:transition-none",
          )}
        />
      </svg>
    </div>
  );
}
