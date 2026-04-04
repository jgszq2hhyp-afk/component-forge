// @version 1.0.0
// @category animations
// @name text-reveal
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

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
    filter: blur(6px);
    transform: translateY(8px);
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
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tokens = useMemo(() => {
    if (mode === 'char') {
      return text.split('').map((char, i) => ({
        key: `${char}-${i}`,
        content: char === ' ' ? '\u00A0' : char,
        index: i,
      }));
    }

    // Word mode — preserve spaces between words
    return text.split(' ').map((word, i) => ({
      key: `${word}-${i}`,
      content: word,
      index: i,
    }));
  }, [text, mode]);

  const staggerMs = mode === 'char' ? 30 : 60;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <span
        ref={ref}
        className={cn('tr-container inline-flex flex-wrap', className)}
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
                ? `tr-reveal 400ms cubic-bezier(0.16,1,0.3,1) ${delay + token.index * staggerMs}ms both`
                : 'none',
            }}
          >
            {token.content}
            {mode === 'word' ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    </>
  );
}
