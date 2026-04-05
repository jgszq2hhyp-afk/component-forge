// @version 1.0.0
// @category backgrounds
// @name background-particles
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTENT_Z_INDEX = 10;
const PARTICLE_Z_INDEX = 0;

/** Number of particles per density level */
const DENSITY_MAP = {
  low: 15,
  medium: 30,
  high: 50,
} as const;

/** Animation duration range (min, max) in seconds per speed level */
const SPEED_MAP = {
  slow: { min: 10, max: 18 },
  medium: { min: 6, max: 12 },
  fast: { min: 3, max: 7 },
} as const;

/** Possible dot sizes in pixels */
const DOT_SIZES = [2, 3, 4] as const;

/** Opacity range for dots */
const DOT_OPACITY_MIN = 0.2;
const DOT_OPACITY_MAX = 0.7;

/** Horizontal drift range in pixels */
const DRIFT_MIN = -40;
const DRIFT_MAX = 40;

type Density = keyof typeof DENSITY_MAP;
type Speed = keyof typeof SPEED_MAP;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BackgroundParticlesProps {
  /** Number of floating dots */
  density?: Density;
  /** Animation speed */
  speed?: Speed;
  /** Additional CSS classes on the wrapper */
  className?: string;
  /** Content rendered on top of the particles */
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Deterministic pseudo-random based on index (no Math.random for SSR)
// ---------------------------------------------------------------------------

function seededValue(index: number, offset: number): number {
  const x = Math.sin(index * 127.1 + offset * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// ---------------------------------------------------------------------------
// Particle data generation
// ---------------------------------------------------------------------------

interface ParticleData {
  key: number;
  size: number;
  opacity: number;
  left: string;
  bottom: string;
  duration: string;
  delay: string;
  drift: number;
}

function generateParticles(density: Density, speed: Speed): ParticleData[] {
  const count = DENSITY_MAP[density];
  const { min, max } = SPEED_MAP[speed];
  const particles: ParticleData[] = [];

  for (let i = 0; i < count; i++) {
    const r1 = seededValue(i, 1);
    const r2 = seededValue(i, 2);
    const r3 = seededValue(i, 3);
    const r4 = seededValue(i, 4);
    const r5 = seededValue(i, 5);

    const size = DOT_SIZES[Math.floor(r1 * DOT_SIZES.length)] ?? DOT_SIZES[0];
    const opacity = DOT_OPACITY_MIN + r2 * (DOT_OPACITY_MAX - DOT_OPACITY_MIN);
    const leftPercent = r3 * 100;
    const bottomPercent = -(r4 * 20); // start below viewport
    const duration = min + r5 * (max - min);
    const delay = seededValue(i, 6) * max;
    const drift = DRIFT_MIN + seededValue(i, 7) * (DRIFT_MAX - DRIFT_MIN);

    particles.push({
      key: i,
      size,
      opacity: Math.round(opacity * 100) / 100,
      left: `${leftPercent.toFixed(1)}%`,
      bottom: `${bottomPercent.toFixed(1)}%`,
      duration: `${duration.toFixed(1)}s`,
      delay: `${delay.toFixed(1)}s`,
      drift: Math.round(drift),
    });
  }

  return particles;
}

// ---------------------------------------------------------------------------
// CSS generation
// ---------------------------------------------------------------------------

function generateCSS(particles: ParticleData[]): string {
  // Each particle gets a unique keyframe for its horizontal drift
  const uniqueDrifts = [...new Set(particles.map((p) => p.drift))];

  const keyframes = uniqueDrifts
    .map(
      (drift) => `
@keyframes particle-float-${drift < 0 ? 'n' : 'p'}${Math.abs(drift)} {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-110vh) translateX(${drift}px);
    opacity: 0;
  }
}`,
    )
    .join('\n');

  const particleClasses = particles
    .map((p) => {
      const driftName = `particle-float-${p.drift < 0 ? 'n' : 'p'}${Math.abs(p.drift)}`;
      return `.particle-dot-${p.key} {
  animation: ${driftName} ${p.duration} ${p.delay} ease-in-out infinite;
  will-change: transform, opacity;
}`;
    })
    .join('\n');

  const reducedMotion = `
@media (prefers-reduced-motion: reduce) {
  [data-particles-container] span {
    animation: none !important;
    opacity: 0.3 !important;
  }
}`;

  return [keyframes, '', particleClasses, '', reducedMotion].join('\n');
}

// ---------------------------------------------------------------------------
// Component (Server Component - CSS-only animations)
// ---------------------------------------------------------------------------

export function BackgroundParticles({
  density = 'medium',
  speed = 'medium',
  className,
  children,
}: BackgroundParticlesProps) {
  const particles = generateParticles(density, speed);
  const css = generateCSS(particles);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        className={cn('relative min-h-screen overflow-hidden', className)}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Particle layer */}
        <div
          aria-hidden="true"
          data-particles-container=""
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: PARTICLE_Z_INDEX }}
        >
          {particles.map((p) => (
            <span
              key={p.key}
              className={`absolute rounded-full particle-dot-${p.key}`}
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: p.left,
                bottom: p.bottom,
                opacity: p.opacity,
                background:
                  'color-mix(in oklch, var(--primary) 30%, transparent)',
              }}
            />
          ))}
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

export default BackgroundParticles;
