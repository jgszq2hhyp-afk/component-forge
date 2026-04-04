// @version 1.0.0
// @category animations
// @name scroll-progress-bar
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScrollProgressBarProps {
  /** Stick to top or bottom of the viewport */
  position?: 'top' | 'bottom';
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes spb-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@supports (animation-timeline: scroll()) {
  .spb-bar {
    animation: spb-grow linear both;
    animation-timeline: scroll();
    will-change: transform;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spb-bar {
    animation: none !important;
    transform: scaleX(1) !important;
    opacity: 0.3;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ScrollProgressBar({
  position = 'top',
  className,
}: ScrollProgressBarProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        className={cn(
          'spb-bar pointer-events-none fixed left-0 z-50 h-[3px] w-full origin-left',
          position === 'top' ? 'top-0' : 'bottom-0',
          className,
        )}
        style={{ backgroundColor: 'var(--color-primary, oklch(0.6 0.25 260))' }}
        role="progressbar"
        aria-label="Scroll progress"
      />
    </>
  );
}
