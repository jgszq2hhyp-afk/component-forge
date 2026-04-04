// @version 1.0.0
// @category animations
// @name card-lift
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

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
    transform 300ms cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 300ms cubic-bezier(0.33, 1, 0.68, 1);
  will-change: transform, box-shadow;
}

.cl-card:hover {
  transform: translateY(var(--cl-lift));
  box-shadow:
    0 var(--cl-shadow-y) var(--cl-shadow-blur) -4px oklch(0 0 0 / 0.12),
    0 2px 4px -2px oklch(0 0 0 / 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .cl-card {
    transition: none !important;
  }

  .cl-card:hover {
    transform: none !important;
    /* Keep shadow for visual feedback */
    box-shadow: 0 2px 8px -2px oklch(0 0 0 / 0.1);
  }
}
`;

// ---------------------------------------------------------------------------
// Lift presets
// ---------------------------------------------------------------------------

const liftPresets: Record<
  NonNullable<CardLiftProps['liftAmount']>,
  { lift: string; shadowY: string; shadowBlur: string }
> = {
  sm: { lift: '-4px', shadowY: '8px', shadowBlur: '16px' },
  md: { lift: '-8px', shadowY: '16px', shadowBlur: '32px' },
  lg: { lift: '-12px', shadowY: '24px', shadowBlur: '48px' },
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
      <div
        className={cn('cl-card', className)}
        style={
          {
            '--cl-lift': preset.lift,
            '--cl-shadow-y': preset.shadowY,
            '--cl-shadow-blur': preset.shadowBlur,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </>
  );
}
