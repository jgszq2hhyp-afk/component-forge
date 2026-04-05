// @version 2.0.0
// @category animations
// @name card-lift
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TRANSITION_DURATION_MS = 300;
const EASING = 'cubic-bezier(0.33, 1, 0.68, 1)';
const SHADOW_INSET_PX = '-4px';
const REDUCED_MOTION_SHADOW = '0 2px 8px -2px oklch(0 0 0 / 0.1)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CardLiftProps {
  /** How far the card lifts on hover */
  liftAmount?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped styles
// ---------------------------------------------------------------------------

const styles = `
.cl-card {
  transition:
    transform ${TRANSITION_DURATION_MS}ms ${EASING},
    box-shadow ${TRANSITION_DURATION_MS}ms ${EASING};
  will-change: transform, box-shadow;
}

.cl-card:hover {
  transform: translateY(var(--cl-lift));
  box-shadow:
    0 var(--cl-shadow-y) var(--cl-shadow-blur) ${SHADOW_INSET_PX} oklch(0 0 0 / 0.12),
    0 2px 4px -2px oklch(0 0 0 / 0.06);
}

.cl-card:focus-within {
  transform: translateY(var(--cl-lift));
  box-shadow:
    0 var(--cl-shadow-y) var(--cl-shadow-blur) ${SHADOW_INSET_PX} oklch(0 0 0 / 0.12),
    0 2px 4px -2px oklch(0 0 0 / 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .cl-card {
    transition: none !important;
  }

  .cl-card:hover,
  .cl-card:focus-within {
    transform: none !important;
    box-shadow: ${REDUCED_MOTION_SHADOW};
  }
}
`;

// ---------------------------------------------------------------------------
// Lift presets
// ---------------------------------------------------------------------------

const LIFT_SM_PX = '-4px';
const LIFT_MD_PX = '-8px';
const LIFT_LG_PX = '-12px';

const SHADOW_SM_Y = '8px';
const SHADOW_SM_BLUR = '16px';
const SHADOW_MD_Y = '16px';
const SHADOW_MD_BLUR = '32px';
const SHADOW_LG_Y = '24px';
const SHADOW_LG_BLUR = '48px';

const liftPresets: Record<
  NonNullable<CardLiftProps['liftAmount']>,
  { lift: string; shadowY: string; shadowBlur: string }
> = {
  sm: { lift: LIFT_SM_PX, shadowY: SHADOW_SM_Y, shadowBlur: SHADOW_SM_BLUR },
  md: { lift: LIFT_MD_PX, shadowY: SHADOW_MD_Y, shadowBlur: SHADOW_MD_BLUR },
  lg: { lift: LIFT_LG_PX, shadowY: SHADOW_LG_Y, shadowBlur: SHADOW_LG_BLUR },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CardLift({
  liftAmount = 'md',
  children,
  className,
}: CardLiftProps) {
  const preset = liftPresets[liftAmount];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <article
        aria-label="Lift card"
        className={cn(
          'cl-card',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          className,
        )}
        style={
          {
            '--cl-lift': preset.lift,
            '--cl-shadow-y': preset.shadowY,
            '--cl-shadow-blur': preset.shadowBlur,
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
          } as React.CSSProperties
        }
      >
        {children}
      </article>
    </>
  );
}
