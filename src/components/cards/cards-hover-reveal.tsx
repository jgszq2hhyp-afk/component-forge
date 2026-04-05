'use client';

// @version 1.0.0
// @category cards
// @name cards-hover-reveal
// @source custom

import { cn } from '@/lib/utils';
import { useState, useCallback, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CARD_TITLE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)';
const SECTION_PADDING_CLAMP = 'clamp(3rem, 6vw, 6rem)';
const IMAGE_ASPECT_RATIO = '4 / 3';
const CARD_BORDER_RADIUS = '0.75rem';
const REVEAL_TRANSITION_MS = 350;
const ICON_SIZE = 40;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HoverRevealCard {
  /** Card title */
  title: string;
  /** Brief summary shown by default */
  summary: string;
  /** Detailed text revealed on hover */
  detail: string;
  /** Optional background image URL */
  image?: string;
  /** Optional icon element */
  icon?: ReactNode;
}

interface CardsHoverRevealProps {
  /** Array of card data */
  cards: HoverRevealCard[];
  /** Grid columns: 2, 3, or 4 */
  columns?: 2 | 3 | 4;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Column map
// ---------------------------------------------------------------------------

const COLUMN_MAP: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

// ---------------------------------------------------------------------------
// Single card with hover reveal
// ---------------------------------------------------------------------------

function RevealCard({ card }: { card: HoverRevealCard }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = useCallback(() => setIsRevealed(true), []);
  const handleHide = useCallback(() => setIsRevealed(false), []);

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[var(--card-radius)]',
        'border border-[var(--border)]',
        'bg-[var(--card)]',
        FOCUS_RING,
      )}
      style={
        {
          '--card-radius': CARD_BORDER_RADIUS,
          '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
        } as React.CSSProperties
      }
      tabIndex={0}
      onMouseEnter={handleReveal}
      onMouseLeave={handleHide}
      onFocus={handleReveal}
      onBlur={handleHide}
      aria-expanded={isRevealed}
    >
      {/* Image or placeholder */}
      <div
        className="relative overflow-hidden bg-[var(--accent)]"
        style={{ aspectRatio: IMAGE_ASPECT_RATIO }}
      >
        {card.image ? (
          <img
            src={card.image}
            alt=""
            role="presentation"
            className={cn(
              'h-full w-full object-cover',
              'motion-safe:transition-transform motion-safe:duration-500',
              'group-hover:scale-[1.05]',
              'motion-reduce:transition-none',
            )}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {card.icon && (
              <div
                className="text-[var(--muted-foreground)]"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
                aria-hidden="true"
              >
                {card.icon}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Static content */}
      <div className="flex flex-col gap-2 p-5">
        {/* Icon next to title when image exists */}
        {card.icon && card.image && (
          <div
            className="text-[var(--primary)]"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
            aria-hidden="true"
          >
            {card.icon}
          </div>
        )}

        <h3
          className="font-semibold text-[var(--foreground)]"
          style={{ fontSize: CARD_TITLE_CLAMP }}
        >
          {card.title}
        </h3>

        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          {card.summary}
        </p>
      </div>

      {/* Reveal overlay -- slides up from bottom */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0',
          'flex flex-col justify-end',
          'bg-gradient-to-t from-[var(--card)] via-[var(--card)] to-transparent',
          'p-5 pt-12',
          'motion-safe:transition-all motion-safe:ease-out',
          'motion-reduce:transition-none',
          isRevealed
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0 pointer-events-none',
        )}
        style={{
          transitionDuration: `${REVEAL_TRANSITION_MS}ms`,
          clipPath: isRevealed
            ? 'inset(0 0 0 0)'
            : 'inset(100% 0 0 0)',
        }}
        aria-hidden={!isRevealed}
      >
        <h3
          className="mb-2 font-semibold text-[var(--foreground)]"
          style={{ fontSize: CARD_TITLE_CLAMP }}
        >
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
          {card.detail}
        </p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main component (Client Component)
// ---------------------------------------------------------------------------

export default function CardsHoverReveal({
  cards,
  columns = 3,
  className,
}: CardsHoverRevealProps) {
  return (
    <section
      className={cn('w-full', className)}
      style={{
        paddingBlock: SECTION_PADDING_CLAMP,
        paddingInline: 'clamp(1rem, 4vw, 2rem)',
      }}
      aria-label="Card grid with hover details"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            'grid grid-cols-1 gap-5 sm:gap-6',
            COLUMN_MAP[columns],
          )}
          role="list"
        >
          {cards.map((card, index) => (
            <div role="listitem" key={`${card.title}-${index}`}>
              <RevealCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
