// @version 1.0.0
// @category animations
// @name typewriter-text
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_SPEED = 80;
const DEFAULT_DELETE_SPEED = 40;
const DEFAULT_PAUSE_DURATION = 2000;
const CURSOR_BLINK_SPEED = '530ms';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TypewriterTextProps {
  /** Array of strings to cycle through */
  texts: string[];
  /** Typing speed in ms per character */
  speed?: number;
  /** Deletion speed in ms per character */
  deleteSpeed?: number;
  /** Pause duration between texts in ms */
  pauseDuration?: number;
  /** Loop through all texts continuously */
  loop?: boolean;
  /** Show blinking cursor */
  cursor?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Reduced motion hook
// ---------------------------------------------------------------------------

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

// ---------------------------------------------------------------------------
// Scoped CSS
// ---------------------------------------------------------------------------

const CURSOR_CSS = `
@keyframes tw-cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.tw-cursor {
  animation: tw-cursor-blink ${CURSOR_BLINK_SPEED} step-end infinite;
}
@media (prefers-reduced-motion: reduce) {
  .tw-cursor {
    animation: none !important;
    opacity: 1 !important;
  }
}`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TypewriterText({
  texts,
  speed = DEFAULT_SPEED,
  deleteSpeed = DEFAULT_DELETE_SPEED,
  pauseDuration = DEFAULT_PAUSE_DURATION,
  loop = true,
  cursor = true,
  className,
}: TypewriterTextProps) {
  const reducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const safeTexts = texts.length > 0 ? texts : [''];
  const currentFullText = safeTexts[textIndex % safeTexts.length] ?? '';

  // In reduced motion mode, show the current full text immediately
  const shownText = reducedMotion ? currentFullText : displayText;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (reducedMotion || isDone) return;

    const tick = () => {
      if (isDeleting) {
        // Deleting characters
        setDisplayText((prev) => {
          const next = prev.slice(0, -1);
          if (next.length === 0) {
            // Move to next text
            const nextIndex = textIndex + 1;
            if (!loop && nextIndex >= safeTexts.length) {
              setIsDone(true);
              return '';
            }
            setTextIndex(nextIndex % safeTexts.length);
            setIsDeleting(false);
          }
          return next;
        });
        timerRef.current = setTimeout(tick, deleteSpeed);
      } else {
        // Typing characters
        setDisplayText((prev) => {
          const target = safeTexts[textIndex % safeTexts.length] ?? '';
          if (prev.length < target.length) {
            const next = target.slice(0, prev.length + 1);
            if (next.length === target.length) {
              // Finished typing this text
              if (!loop && safeTexts.length === 1) {
                setIsDone(true);
                return next;
              }
              // Pause then delete
              timerRef.current = setTimeout(() => {
                setIsDeleting(true);
                timerRef.current = setTimeout(tick, deleteSpeed);
              }, pauseDuration);
              return next;
            }
            timerRef.current = setTimeout(tick, speed);
            return next;
          }
          return prev;
        });

        // Start typing if empty
        if (displayText.length === 0 && !isDeleting) {
          timerRef.current = setTimeout(tick, speed);
        }
      }
    };

    timerRef.current = setTimeout(tick, speed);
    return clearTimer;
  }, [
    textIndex,
    isDeleting,
    reducedMotion,
    isDone,
    speed,
    deleteSpeed,
    pauseDuration,
    loop,
    safeTexts,
    clearTimer,
    displayText.length,
  ]);

  // Reduced motion: cycle texts on an interval instead
  useEffect(() => {
    if (!reducedMotion || safeTexts.length <= 1 || !loop) return;

    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % safeTexts.length);
    }, pauseDuration + 1000);

    return () => clearInterval(interval);
  }, [reducedMotion, safeTexts.length, loop, pauseDuration]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CURSOR_CSS }} />

      <span
        className={cn('inline-flex items-baseline', className)}
        aria-label={currentFullText}
        aria-live="polite"
        role="status"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 3rem)',
        }}
      >
        <span aria-hidden="true">{shownText}</span>
        {cursor && (
          <span
            aria-hidden="true"
            className="tw-cursor ml-0.5 inline-block"
            style={{
              width: '2px',
              height: '1em',
              backgroundColor: 'var(--foreground)',
              verticalAlign: 'text-bottom',
            }}
          />
        )}
      </span>
    </>
  );
}

export default TypewriterText;
