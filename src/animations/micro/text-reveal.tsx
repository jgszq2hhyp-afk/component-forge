// @version 2.0.0
// @category animations
// @name text-reveal
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INTERSECTION_THRESHOLD = 0.2;
const CHAR_STAGGER_MS = 30;
const WORD_STAGGER_MS = 60;
const REVEAL_DURATION_MS = 400;
const BLUR_PX = 6;
const TRANSLATE_Y_PX = 8;
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const NBSP = '\u00A0';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TextRevealProps {
  /** The text to reveal */
  text: string;
  /** Reveal per character or per word */
  mode?: 'char' | 'word';
  /** Base delay before reveal starts (ms) */
  delay?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes tr-reveal {
  from {
    opacity: 0;
    filter: blur(${BLUR_PX}px);
    transform: translateY(${TRANSLATE_Y_PX}px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes tr-reveal {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .tr-token {
    filter: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TextReveal({
  text,
  mode = 'word',
  delay = 0,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tokens = useMemo(() => {
    if (mode === 'char') {
      return text.split('').map((char, i) => ({
        key: `${char}-${i}`,
        content: char === ' ' ? NBSP : char,
        index: i,
      }));
    }

    // Word mode -- preserve spaces between words
    return text.split(' ').map((word, i) => ({
      key: `${word}-${i}`,
      content: word,
      index: i,
    }));
  }, [text, mode]);

  const staggerMs = mode === 'char' ? CHAR_STAGGER_MS : WORD_STAGGER_MS;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <span
        ref={ref}
        className={cn('tr-container inline-flex flex-wrap', className)}
        role="text"
        aria-label={text}
      >
        {tokens.map((token) => (
          <span
            key={token.key}
            className="tr-token inline-block"
            aria-hidden="true"
            style={{
              opacity: visible ? undefined : 0,
              animation: visible
                ? `tr-reveal ${REVEAL_DURATION_MS}ms ${EASING} ${delay + token.index * staggerMs}ms both`
                : 'none',
            }}
          >
            {token.content}
            {mode === 'word' ? NBSP : ''}
          </span>
        ))}
      </span>
    </>
  );
}
