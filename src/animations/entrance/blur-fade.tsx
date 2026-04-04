// @version 2.0.0
// @category animations
// @name blur-fade
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, useMemo, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default IntersectionObserver threshold (0 = any pixel, 1 = fully visible) */
const DEFAULT_THRESHOLD = 0.15;

/** Default animation duration in ms */
const DEFAULT_DURATION = 700;

/** Default blur amount in pixels */
const DEFAULT_BLUR = 12;

/** Default vertical translate distance in pixels */
const DEFAULT_TRANSLATE_Y = 12;

/** Animation easing curve */
const EASING = 'cubic-bezier(0.16,1,0.3,1)';

/** Breakpoint below which mobile optimization applies */
const MOBILE_BREAKPOINT = 768;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlurFadeProps {
  /** Delay before animation starts (ms). Default: 0 */
  delay?: number;
  /** Animation duration in ms. Default: 700 */
  duration?: number;
  /** Blur amount in pixels. Default: 12 */
  blur?: number;
  /** Vertical translate distance in pixels. Default: 12 */
  translateY?: number;
  /** IntersectionObserver threshold (0-1). Default: 0.15 */
  threshold?: number;
  /** Disable blur/transform on mobile, only fade opacity. Default: false */
  disableOnMobile?: boolean;
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped keyframes factory
// ---------------------------------------------------------------------------

function buildKeyframes(blur: number, translateY: number): string {
  return `
@keyframes bf-reveal {
  from {
    opacity: 0;
    filter: blur(${blur}px);
    transform: translateY(${translateY}px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes bf-reveal {
    from { opacity: 0; filter: none; transform: none; }
    to   { opacity: 1; filter: none; transform: none; }
  }

  .bf-wrapper {
    filter: none !important;
    transform: none !important;
    animation-duration: 0.01ms !important;
  }
}
`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BlurFade({
  delay = 0,
  duration = DEFAULT_DURATION,
  blur = DEFAULT_BLUR,
  translateY = DEFAULT_TRANSLATE_Y,
  threshold = DEFAULT_THRESHOLD,
  disableOnMobile = false,
  children,
  className,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobileSimple, setIsMobileSimple] = useState(false);

  // Memoize keyframes so they don't re-generate on every render
  const keyframes = useMemo(() => buildKeyframes(blur, translateY), [blur, translateY]);

  // Memoize animation string
  const animationValue = useMemo(
    () => `bf-reveal ${duration}ms ${EASING} ${delay}ms both`,
    [duration, delay],
  );

  // Check mobile preference once on mount
  useEffect(() => {
    if (disableOnMobile && window.innerWidth < MOBILE_BREAKPOINT) {
      setIsMobileSimple(true);
    }
  }, [disableOnMobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is preferred, show immediately
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // On mobile with disableOnMobile, skip blur/transform, only fade
  const hiddenStyle = isMobileSimple
    ? { opacity: 0 }
    : { opacity: 0, filter: `blur(${blur}px)` };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        ref={ref}
        className={cn('bf-wrapper', className)}
        style={{
          ...(visible ? {} : hiddenStyle),
          animation: visible ? animationValue : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
}
