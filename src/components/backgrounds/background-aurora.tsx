// @version 1.0.0
// @category backgrounds
// @name background-aurora
// @description Aurora/Northern lights animated background with CSS-only animations

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const AURORA_Z_INDEX = 0;
const CONTENT_Z_INDEX = 10;
const NOISE_OPACITY = 0.04;
const NOISE_BASE_FREQUENCY = 0.65;
const NOISE_OCTAVES = 4;

const BLOB_BLUR_BASE = 120;
const BLOB_BLUR_STEP = 15;

/** Animation durations for organic, non-repeating feel */
const ANIMATION_DURATIONS = {
  blob1: '15s',
  blob2: '20s',
  blob3: '25s',
  blob4: '18s',
  blob5: '22s',
} as const;

/** Opacity per intensity level per blob */
const INTENSITY_MAP = {
  subtle: { blob1: 0.12, blob2: 0.10, blob3: 0.08, blob4: 0.11, blob5: 0.09 },
  medium: { blob1: 0.25, blob2: 0.20, blob3: 0.18, blob4: 0.22, blob5: 0.17 },
  vivid:  { blob1: 0.40, blob2: 0.35, blob3: 0.30, blob4: 0.38, blob5: 0.28 },
} as const;

type Intensity = keyof typeof INTENSITY_MAP;
type BlobKey = keyof typeof ANIMATION_DURATIONS;

/** Blob configuration: position, size, movement range, CSS color variable */
const BLOBS: ReadonlyArray<{
  key: BlobKey;
  cx: string;
  cy: string;
  width: string;
  height: string;
  colorVar: string;
  /** Secondary color for color-mix blending */
  colorVar2: string;
  /** Horizontal movement range in px */
  dx: number;
  /** Vertical movement range in px */
  dy: number;
}> = [
  { key: 'blob1', cx: '10%',  cy: '15%',  width: '55%', height: '45%', colorVar: '--primary',    colorVar2: '--accent',   dx: 80,  dy: 50 },
  { key: 'blob2', cx: '65%',  cy: '10%',  width: '45%', height: '50%', colorVar: '--accent',     colorVar2: '--primary',  dx: -60, dy: 70 },
  { key: 'blob3', cx: '40%',  cy: '60%',  width: '50%', height: '40%', colorVar: '--primary',    colorVar2: '--muted',    dx: -45, dy: -55 },
  { key: 'blob4', cx: '80%',  cy: '65%',  width: '40%', height: '45%', colorVar: '--muted',      colorVar2: '--primary',  dx: 55,  dy: -40 },
  { key: 'blob5', cx: '25%',  cy: '80%',  width: '48%', height: '35%', colorVar: '--accent',     colorVar2: '--muted',    dx: -70, dy: 35 },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BackgroundAuroraProps {
  /** Animation intensity level */
  intensity?: Intensity;
  /** Additional CSS classes on the wrapper */
  className?: string;
  /** Content rendered on top of the aurora */
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Keyframe generation
// ---------------------------------------------------------------------------

function generateKeyframes(): string {
  const keyframeBlocks = BLOBS.map((blob, i) => {
    const blur = BLOB_BLUR_BASE + i * BLOB_BLUR_STEP;
    // Each blob has a unique multi-point path for organic movement
    return `
@keyframes aurora-drift-${blob.key} {
  0%, 100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    filter: blur(${blur}px);
  }
  20% {
    transform: translate(${blob.dx * 0.6}px, ${blob.dy}px) scale(1.05) rotate(2deg);
    filter: blur(${blur + 10}px);
  }
  40% {
    transform: translate(${blob.dx}px, ${blob.dy * 0.3}px) scale(0.95) rotate(-1deg);
    filter: blur(${blur - 5}px);
  }
  60% {
    transform: translate(${blob.dx * 0.2}px, ${-blob.dy * 0.8}px) scale(1.08) rotate(3deg);
    filter: blur(${blur + 15}px);
  }
  80% {
    transform: translate(${-blob.dx * 0.5}px, ${blob.dy * 0.5}px) scale(0.98) rotate(-2deg);
    filter: blur(${blur}px);
  }
}`;
  });

  const animationClasses = BLOBS.map(
    (blob) =>
      `.aurora-${blob.key} { animation: aurora-drift-${blob.key} ${ANIMATION_DURATIONS[blob.key]} ease-in-out infinite; will-change: transform, filter; }`,
  );

  const reducedMotion = `
@media (prefers-reduced-motion: reduce) {
  ${BLOBS.map((blob) => `.aurora-${blob.key}`).join(',\n  ')} {
    animation: none !important;
    filter: blur(${BLOB_BLUR_BASE + 20}px) !important;
  }
}`;

  return [...keyframeBlocks, '', ...animationClasses, '', reducedMotion].join('\n');
}

const AURORA_CSS = generateKeyframes();

// ---------------------------------------------------------------------------
// Component (Server Component - CSS-only animations, no 'use client')
// ---------------------------------------------------------------------------

export function BackgroundAurora({
  intensity = 'medium',
  className,
  children,
}: BackgroundAuroraProps) {
  const opacities = INTENSITY_MAP[intensity];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AURORA_CSS }} />

      <div
        className={cn('relative min-h-screen overflow-hidden', className)}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Aurora blob layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: AURORA_Z_INDEX }}
        >
          {BLOBS.map((blob) => (
            <div
              key={blob.key}
              className={cn('absolute rounded-full', `aurora-${blob.key}`)}
              style={{
                left: blob.cx,
                top: blob.cy,
                width: blob.width,
                height: blob.height,
                background: `color-mix(in oklch, var(${blob.colorVar}) 65%, var(${blob.colorVar2}) 35%)`,
                opacity: opacities[blob.key],
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* SVG noise texture overlay for film grain effect */}
          <svg
            className="absolute inset-0 h-full w-full"
            style={{ opacity: NOISE_OPACITY }}
            aria-hidden="true"
          >
            <filter id="aurora-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={NOISE_BASE_FREQUENCY}
                numOctaves={NOISE_OCTAVES}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#aurora-noise)" />
          </svg>

          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, var(--background) 100%)',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Content layer */}
        {children != null && (
          <div className="relative" style={{ zIndex: CONTENT_Z_INDEX }}>
            {children}
          </div>
        )}
      </div>
    </>
  );
}

export default BackgroundAurora;
