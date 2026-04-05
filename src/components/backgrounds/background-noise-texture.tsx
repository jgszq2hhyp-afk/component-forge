// @version 1.0.0
// @category backgrounds
// @name background-noise-texture
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_OPACITY = 0.05;

const FILTER_ID = "noiseFilter" as const;

const TURBULENCE_BASE_FREQUENCY = 0.65;

const TURBULENCE_NUM_OCTAVES = 4;

const TURBULENCE_SEED = 0;

const TURBULENCE_STITCH_TILES = "stitch" as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BackgroundNoiseTextureProps {
  opacity?: number;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

/**
 * Full-coverage SVG noise overlay.
 *
 * Place inside a `relative` parent container.
 * The overlay is pointer-events-none so it never blocks interaction.
 *
 * Uses feTurbulence to generate a procedural grain texture.
 * Respects `prefers-reduced-motion`: hides the texture entirely
 * when the user prefers reduced motion.
 */
export default function BackgroundNoiseTexture({
  opacity = DEFAULT_OPACITY,
  className,
}: BackgroundNoiseTextureProps) {
  /* Clamp opacity to a sane range */
  const safeOpacity = Math.max(0, Math.min(1, opacity));

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        /* Respect reduced motion: hide entirely */
        "motion-reduce:hidden",
        className,
      )}
      aria-hidden="true"
      style={{ opacity: safeOpacity }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={FILTER_ID}>
            {/*
              feTurbulence generates a pseudo-random noise pattern.
              - type="fractalNoise" gives a smoother, film-grain-like result.
              - baseFrequency controls grain density (higher = finer).
              - numOctaves adds detail layers.
              - stitchTiles="stitch" prevents visible seams when tiled.
            */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={TURBULENCE_BASE_FREQUENCY}
              numOctaves={TURBULENCE_NUM_OCTAVES}
              seed={TURBULENCE_SEED}
              stitchTiles={TURBULENCE_STITCH_TILES}
              result="noise"
            />
            {/*
              Transfer function to boost contrast.
              The linear slope amplifies the turbulence output
              while the intercept shifts the overall brightness.
            */}
            <feComponentTransfer>
              <feFuncR type="linear" slope={2} intercept={-0.5} />
              <feFuncG type="linear" slope={2} intercept={-0.5} />
              <feFuncB type="linear" slope={2} intercept={-0.5} />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Full-size rect with the noise filter applied */}
        <rect
          width="100%"
          height="100%"
          filter={`url(#${FILTER_ID})`}
          style={{ fill: "var(--foreground)" }}
        />
      </svg>
    </div>
  );
}
