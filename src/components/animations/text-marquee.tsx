// @version 1.0.0
// @category animations
// @name text-marquee
// @source aura-inspired

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TextMarqueeProps {
  texts: string[];
  separator?: string;
  durationSeconds?: number;
  direction?: 'left' | 'right';
  variant?: 'filled' | 'outline';
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframes builder
// ---------------------------------------------------------------------------

function buildKeyframes(
  durationSeconds: number,
  direction: 'left' | 'right',
): string {
  const from = direction === 'left' ? '0%' : '-50%';
  const to = direction === 'left' ? '-50%' : '0%';

  return `
@keyframes tm-scroll {
  from {
    transform: translateX(${from});
  }
  to {
    transform: translateX(${to});
  }
}

.tm-track {
  animation: tm-scroll ${durationSeconds}s linear infinite;
  will-change: transform;
}

.tm-wrapper:hover .tm-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .tm-track {
    animation: none !important;
  }
}
`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildItemSequence(
  texts: string[],
  separator: string,
): React.ReactNode[] {
  const items: React.ReactNode[] = [];
  texts.forEach((text, i) => {
    if (i > 0) {
      items.push(
        <span
          key={`sep-${i}`}
          className="mx-[0.4em] select-none"
          aria-hidden="true"
          style={{ opacity: 0.4 }}
        >
          {separator}
        </span>,
      );
    }
    items.push(
      <span key={`text-${i}`} className="whitespace-nowrap">
        {text}
      </span>,
    );
  });
  // Trailing separator so the loop seam is seamless
  items.push(
    <span
      key="sep-trail"
      className="mx-[0.4em] select-none"
      aria-hidden="true"
      style={{ opacity: 0.4 }}
    >
      {separator}
    </span>,
  );
  return items;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TextMarquee({
  texts,
  separator = '\u2605',
  durationSeconds = 20,
  direction = 'left',
  variant = 'filled',
  className,
}: TextMarqueeProps) {
  const items = buildItemSequence(texts, separator);

  const isOutline = variant === 'outline';

  const textStyles: React.CSSProperties = {
    fontSize: 'clamp(4rem, 10vw, 10rem)',
    lineHeight: 1.1,
    ...(isOutline
      ? {
          WebkitTextStroke: '2px var(--foreground)',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          opacity: 0.2,
        }
      : {
          color: 'var(--foreground)',
          opacity: 0.1,
        }),
  };

  return (
    <section
      className={cn('tm-wrapper w-full select-none overflow-hidden py-8', className)}
      aria-label={`Scrolling text: ${texts.join(', ')}`}
    >
      <style dangerouslySetInnerHTML={{ __html: buildKeyframes(durationSeconds, direction) }} />

      <div
        className="tm-track flex w-max items-center font-bold uppercase"
        style={textStyles}
        aria-hidden="true"
      >
        {/* First copy */}
        <span className="flex items-center">{items}</span>
        {/* Duplicate for seamless loop */}
        <span className="flex items-center">{items}</span>
      </div>
    </section>
  );
}

export type { TextMarqueeProps };
