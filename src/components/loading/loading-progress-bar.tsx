"use client"

// @version 1.0.0 // @category loading // @name loading-progress-bar // @source custom

'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_HEIGHT = '3px';
const DEFAULT_COLOR = 'var(--primary, hsl(220 90% 56%))';
const TRANSITION_DURATION = '300ms';
const FADE_OUT_DELAY = 400;
const FADE_OUT_DURATION = '200ms';
const MIN_PROGRESS = 0;
const MAX_PROGRESS = 100;
const Z_INDEX = 9999;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LoadingProgressBarProps {
  /** Current progress value between 0 and 100 */
  progress: number;
  /** Bar color as CSS value (CSS variable recommended) */
  color?: string;
  /** Bar height as CSS value */
  height?: string;
  /** Additional class names for the outer container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LoadingProgressBar({
  progress,
  color = DEFAULT_COLOR,
  height = DEFAULT_HEIGHT,
  className,
}: LoadingProgressBarProps) {
  const clampedProgress = Math.min(MAX_PROGRESS, Math.max(MIN_PROGRESS, progress));
  const isComplete = clampedProgress >= MAX_PROGRESS;

  // Fade out after reaching 100%
  const [visible, setVisible] = useState(true);

  const handleComplete = useCallback(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, FADE_OUT_DELAY);
    return timer;
  }, []);

  useEffect(() => {
    if (isComplete) {
      const timer = handleComplete();
      return () => window.clearTimeout(timer);
    }
    setVisible(true);
    return undefined;
  }, [isComplete, handleComplete]);

  if (!visible && isComplete) {
    return null;
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={MIN_PROGRESS}
      aria-valuemax={MAX_PROGRESS}
      aria-label={`Loading: ${clampedProgress}% complete`}
      className={cn(
        'fixed inset-x-0 top-0',
        className,
      )}
      style={{
        zIndex: Z_INDEX,
        height,
        backgroundColor: 'transparent',
        opacity: isComplete ? 0 : 1,
        transition: `opacity ${FADE_OUT_DURATION} ease-out`,
      }}
    >
      {/* Progress fill */}
      <div
        className="h-full motion-safe:transition-all"
        style={{
          width: `${clampedProgress}%`,
          backgroundColor: color,
          transitionDuration: TRANSITION_DURATION,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* Glow effect at the leading edge */}
      <div
        className="absolute right-0 top-0 h-full motion-safe:animate-pulse"
        style={{
          width: '6rem',
          background: `linear-gradient(to right, transparent, ${color})`,
          opacity: isComplete ? 0 : 0.4,
          transform: `translateX(${clampedProgress >= MAX_PROGRESS ? '0' : '0'})`,
          right: `${MAX_PROGRESS - clampedProgress}%`,
          transition: `right ${TRANSITION_DURATION} cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />

      {/* Screen reader live region */}
      <span className="sr-only" aria-live="polite">
        {isComplete
          ? 'Loading complete'
          : `Loading ${clampedProgress} percent`}
      </span>
    </div>
  );
}
