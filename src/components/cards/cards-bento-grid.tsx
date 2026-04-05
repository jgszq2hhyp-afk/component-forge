// @version 1.0.0
// @category cards
// @name cards-bento-grid
// @source custom

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADLINE_CLAMP = 'clamp(1.75rem, 3vw + 0.75rem, 2.75rem)';
const CARD_TITLE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)';
const SECTION_PADDING_CLAMP = 'clamp(3rem, 6vw, 6rem)';
const ICON_CONTAINER_SIZE = 48;
const IMAGE_ASPECT_RATIO = '16 / 9';
const CARD_BORDER_RADIUS = '0.75rem';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BentoCard {
  /** Card title */
  title: string;
  /** Card description text */
  description: string;
  /** Optional icon rendered in a container */
  icon?: ReactNode;
  /** Optional image URL displayed above content */
  image?: string;
  /** Column span: 1 (default) or 2 for wide cards */
  span?: 1 | 2;
}

interface CardsBentoGridProps {
  /** Array of card data */
  cards: BentoCard[];
  /** Optional section headline */
  headline?: string;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BentoCardItem({ card }: { card: BentoCard }) {
  const spanClass = card.span === 2 ? 'sm:col-span-2' : 'col-span-1';

  return (
    <article
      className={cn(
        spanClass,
        'group relative overflow-hidden rounded-[var(--bento-radius)]',
        'border border-[var(--border)]',
        'bg-[var(--card)]',
        'motion-safe:transition-shadow motion-safe:duration-300',
        'hover:shadow-lg',
      )}
      style={
        {
          '--bento-radius': CARD_BORDER_RADIUS,
        } as React.CSSProperties
      }
    >
      {/* Optional image */}
      {card.image && (
        <div className="overflow-hidden">
          <img
            src={card.image}
            alt=""
            role="presentation"
            className={cn(
              'w-full object-cover',
              'motion-safe:transition-transform motion-safe:duration-500',
              'group-hover:scale-[1.03]',
              'motion-reduce:transition-none',
            )}
            style={{ aspectRatio: IMAGE_ASPECT_RATIO }}
            loading="lazy"
          />
        </div>
      )}

      {/* Content area */}
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        {/* Icon */}
        {card.icon && (
          <div
            className={cn(
              'flex items-center justify-center rounded-lg',
              'bg-[var(--accent)] text-[var(--primary)]',
            )}
            style={{
              width: ICON_CONTAINER_SIZE,
              height: ICON_CONTAINER_SIZE,
            }}
            aria-hidden="true"
          >
            {card.icon}
          </div>
        )}

        {/* Title */}
        <h3
          className="font-semibold leading-tight text-[var(--foreground)]"
          style={{ fontSize: CARD_TITLE_CLAMP }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
          {card.description}
        </p>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main component (Server Component)
// ---------------------------------------------------------------------------

export default function CardsBentoGrid({
  cards,
  headline,
  className,
}: CardsBentoGridProps) {
  return (
    <section
      className={cn('w-full', className)}
      style={
        {
          paddingBlock: SECTION_PADDING_CLAMP,
          paddingInline: 'clamp(1rem, 4vw, 2rem)',
        } as React.CSSProperties
      }
      aria-label={headline ?? 'Bento grid'}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section headline */}
        {headline && (
          <h2
            className="mb-8 text-center font-bold tracking-tight text-[var(--foreground)] sm:mb-12"
            style={{ fontSize: HEADLINE_CLAMP }}
          >
            {headline}
          </h2>
        )}

        {/* Bento grid: 1 col mobile, 2 col sm, 4 col lg */}
        <div
          className={cn(
            'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6',
          )}
          role="list"
        >
          {cards.map((card, index) => (
            <div role="listitem" key={`${card.title}-${index}`}>
              <BentoCardItem card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
