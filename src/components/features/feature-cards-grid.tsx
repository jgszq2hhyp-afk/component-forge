// @version 2.0.0
// @category features
// @name feature-cards-grid
// @source self-authored

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const CARD_TITLE_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const SECTION_MAX_WIDTH = '80rem';
const ICON_SIZE = 'w-12 h-12';
const ICON_BORDER_RADIUS = 'rounded-xl';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureCard {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

interface FeatureCardsGridProps {
  headline?: string;
  subheadline?: string;
  cards: FeatureCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

// ---------------------------------------------------------------------------
// Arrow icon
// ---------------------------------------------------------------------------

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FeatureCardsGrid({
  headline,
  subheadline,
  cards,
  columns = 3,
  className,
}: FeatureCardsGridProps) {
  return (
    <section
      aria-label={headline ?? 'Features'}
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
        className,
      )}
      style={{
        maxWidth: SECTION_MAX_WIDTH,
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Header */}
      {(headline || subheadline) && (
        <header className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          {headline && (
            <h2
              className="font-bold tracking-tight"
              style={{
                color: 'var(--foreground)',
                fontSize: HEADING_CLAMP,
              }}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className="mt-4 leading-relaxed"
              style={{
                color: 'var(--muted-foreground)',
                fontSize: SUBHEADING_CLAMP,
              }}
            >
              {subheadline}
            </p>
          )}
        </header>
      )}

      {/* Cards Grid */}
      <div
        className={cn(
          'grid grid-cols-1 gap-6 lg:gap-8',
          columnClasses[columns],
        )}
        role="list"
      >
        {cards.map((card, index) => {
          const isLink = Boolean(card.href);
          const Wrapper = card.href ? 'a' : 'div';
          const linkProps = card.href ? { href: card.href } : {};

          return (
            <Wrapper
              key={`${card.title}-${index}`}
              {...linkProps}
              role="listitem"
              tabIndex={isLink ? undefined : 0}
              className={cn(
                'group relative flex flex-col rounded-2xl border p-6 lg:p-8',
                'transition-all duration-300 motion-reduce:transition-none',
                'hover:shadow-lg hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                '--tw-ring-offset-color': 'var(--background)',
              } as React.CSSProperties}
            >
              {/* Icon */}
              {card.icon && (
                <div
                  className={cn(
                    'inline-flex items-center justify-center mb-5',
                    ICON_SIZE,
                    ICON_BORDER_RADIUS,
                  )}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                  }}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>
              )}

              {/* Title */}
              <h3
                className="font-semibold tracking-tight"
                style={{
                  color: 'var(--card-foreground)',
                  fontSize: CARD_TITLE_CLAMP,
                }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className="mt-2 text-sm leading-relaxed flex-1"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {card.description}
              </p>

              {/* Link arrow */}
              {card.href && (
                <div
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                  style={{ color: 'var(--primary)' }}
                  aria-hidden="true"
                >
                  Mehr erfahren
                  <ArrowIcon />
                </div>
              )}
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
