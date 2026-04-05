// @version 2.0.0
// @category animations
// @name text-marquee
// @source aura-inspired

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_DURATION_SECONDS = 20;
const DEFAULT_SEPARATOR = '\u2605';
const SEPARATOR_OPACITY = 0.4;
const SEPARATOR_MARGIN = '0.4em';
const FILLED_OPACITY = 0.1;
const OUTLINE_OPACITY = 0.2;
const OUTLINE_STROKE_WIDTH = '2px';
const FONT_SIZE_CLAMP = 'clamp(4rem, 10vw, 10rem)';
const LINE_HEIGHT = 1.1;
const VERTICAL_PADDING_REM = 2;

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

.tm-wrapper:hover .tm-track,
.tm-wrapper:focus-within .tm-track {
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
          className="select-none"
          aria-hidden="true"
          style={{ opacity: SEPARATOR_OPACITY, marginInline: SEPARATOR_MARGIN }}
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
      className="select-none"
      aria-hidden="true"
      style={{ opacity: SEPARATOR_OPACITY, marginInline: SEPARATOR_MARGIN }}
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
  separator = DEFAULT_SEPARATOR,
  durationSeconds = DEFAULT_DURATION_SECONDS,
  direction = 'left',
  variant = 'filled',
  className,
}: TextMarqueeProps) {
  const items = buildItemSequence(texts, separator);

  const isOutline = variant === 'outline';

  const textStyles: React.CSSProperties = {
    fontSize: FONT_SIZE_CLAMP,
    lineHeight: LINE_HEIGHT,
    ...(isOutline
      ? {
          WebkitTextStroke: `${OUTLINE_STROKE_WIDTH} var(--foreground)`,
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          opacity: OUTLINE_OPACITY,
        }
      : {
          color: 'var(--foreground)',
          opacity: FILLED_OPACITY,
        }),
  };

  return (
    <section
      className={cn(
        'tm-wrapper w-full select-none overflow-hidden',
        className,
      )}
      style={{ paddingBlock: `${VERTICAL_PADDING_REM}rem` }}
      aria-label={`Scrolling text: ${texts.join(', ')}`}
      tabIndex={0}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: buildKeyframes(durationSeconds, direction),
        }}
      />

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
