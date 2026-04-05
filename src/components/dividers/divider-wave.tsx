// @version 1.0.0
// @category dividers
// @name divider-wave
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_HEIGHT = 80;
const DEFAULT_COLOR = 'var(--background)';
const VIEWBOX_WIDTH = 1440;
const VIEWBOX_HEIGHT = 320;

// Wave path: smooth sine-like curve spanning the full viewbox
const WAVE_PATH =
  'M0,160 C240,240 480,80 720,160 C960,240 1200,80 1440,160 L1440,320 L0,320 Z';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DividerWaveProps {
  /** CSS variable or color value for the wave fill */
  color?: string;
  /** Height in pixels */
  height?: number;
  /** Flip vertically for bottom-of-section use */
  flip?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DividerWave({
  color = DEFAULT_COLOR,
  height = DEFAULT_HEIGHT,
  flip = false,
  className,
}: DividerWaveProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden leading-none', className)}
      style={{
        height: `${height}px`,
        ...(flip ? { transform: 'rotate(180deg)' } : {}),
      }}
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={WAVE_PATH} style={{ fill: color }} />
      </svg>
    </div>
  );
}
