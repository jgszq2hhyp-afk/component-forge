// @version 1.0.0
// @category dividers
// @name divider-diagonal
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_HEIGHT = 60;
const DEFAULT_COLOR = 'var(--background)';

/** Clip-path polygons for left and right diagonal directions */
const CLIP_PATHS: Record<'left' | 'right', string> = {
  left: 'polygon(0 0, 100% 100%, 0 100%)',
  right: 'polygon(0 100%, 100% 0, 100% 100%)',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DividerDiagonalProps {
  /** CSS variable or color value for the diagonal fill */
  color?: string;
  /** Height in pixels */
  height?: number;
  /** Direction of the diagonal slope */
  direction?: 'left' | 'right';
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DividerDiagonal({
  color = DEFAULT_COLOR,
  height = DEFAULT_HEIGHT,
  direction = 'right',
  className,
}: DividerDiagonalProps) {
  return (
    <div
      className={cn('relative w-full', className)}
      style={{
        height: `${height}px`,
        backgroundColor: color,
        clipPath: CLIP_PATHS[direction],
      }}
      aria-hidden="true"
    />
  );
}
