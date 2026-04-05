// @version 1.0.0
// @category features
// @name feature-interactive-bento
// @source aura-inspired

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = '80rem';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BentoCard {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  span?: 'default' | 'large' | 'wide' | 'tall';
}

interface FeatureInteractiveBentoProps {
  headline?: string;
  subheadline?: string;
  cards: BentoCard[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Span class mapping
// ---------------------------------------------------------------------------

const spanClasses: Record<NonNullable<BentoCard['span']>, string> = {
  default: 'sm:col-span-1 sm:row-span-1',
  large: 'sm:col-span-2 sm:row-span-2',
  wide: 'sm:col-span-2 sm:row-span-1',
  tall: 'sm:col-span-1 sm:row-span-2',
};

// ---------------------------------------------------------------------------
// Keyframes & hover styles (CSS-only micro-interactions)
// ---------------------------------------------------------------------------

const styles = `
/* ---- Bento card base transitions ---- */
.fib-card {
  transition:
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.fib-card:hover,
.fib-card:focus-visible {
  transform: translateY(-4px);
  box-shadow:
    0 8px 30px -8px rgba(0, 0, 0, 0.12),
    0 2px 8px -2px rgba(0, 0, 0, 0.06);
}

/* Large card gets exaggerated border-radius on hover */
.fib-card--large:hover,
.fib-card--large:focus-visible {
  border-radius: 1.5rem; /* rounded-3xl */
}

/* ---- Icon area gradient shift ---- */
.fib-icon-area {
  position: relative;
  overflow: hidden;
  transition: background 0.4s ease;
}

.fib-icon-area::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: inherit;
}

.fib-card:hover .fib-icon-area::before,
.fib-card:focus-visible .fib-icon-area::before {
  opacity: 0.12;
}

/* ---- Decorative dot pattern ---- */
.fib-dots {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 80px;
  height: 80px;
  opacity: 0.06;
  background-image: radial-gradient(
    circle,
    var(--foreground) 1px,
    transparent 1px
  );
  background-size: 8px 8px;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.fib-card:hover .fib-dots,
.fib-card:focus-visible .fib-dots {
  transform: translate(-6px, -6px);
}

/* ---- Decorative diagonal line ---- */
.fib-line {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.07;
}

.fib-line::after {
  content: '';
  position: absolute;
  top: -30px;
  right: -30px;
  width: 160px;
  height: 1px;
  background: var(--foreground);
  transform: rotate(-45deg);
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.fib-card:hover .fib-line::after,
.fib-card:focus-visible .fib-line::after {
  transform: rotate(-45deg) translateX(12px);
}

/* ---- Image zoom on hover ---- */
.fib-image {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.fib-card:hover .fib-image,
.fib-card:focus-visible .fib-image {
  transform: scale(1.04);
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .fib-card,
  .fib-card:hover,
  .fib-card:focus-visible {
    transition: none !important;
    transform: none !important;
    box-shadow: none !important;
  }

  .fib-card--large:hover,
  .fib-card--large:focus-visible {
    border-radius: 1rem !important;
  }

  .fib-icon-area::before {
    transition: none !important;
  }

  .fib-dots,
  .fib-card:hover .fib-dots {
    transition: none !important;
    transform: none !important;
  }

  .fib-line::after,
  .fib-card:hover .fib-line::after {
    transition: none !important;
    transform: rotate(-45deg) !important;
  }

  .fib-image,
  .fib-card:hover .fib-image {
    transition: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSlug(title: string, index: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return slug || `bento-card-${index}`;
}

// ---------------------------------------------------------------------------
// Component (Server Component - CSS-only interactions)
// ---------------------------------------------------------------------------

export default function FeatureInteractiveBento({
  headline,
  subheadline,
  cards,
  className,
}: FeatureInteractiveBentoProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

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

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-[minmax(180px,auto)]"
          role="list"
        >
          {cards.map((card, index) => {
            const isLarge = card.span === 'large';

            return (
              <article
                key={toSlug(card.title, index)}
                role="listitem"
                tabIndex={0}
                className={cn(
                  'fib-card',
                  isLarge && 'fib-card--large',
                  'group relative rounded-2xl overflow-hidden border',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  spanClasses[card.span ?? 'default'],
                )}
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                  '--tw-ring-offset-color': 'var(--background)',
                } as React.CSSProperties}
              >
                {/* Decorative dot pattern */}
                <div className="fib-dots" aria-hidden="true" />

                {/* Decorative diagonal line */}
                <div className="fib-line" aria-hidden="true" />

                {/* Optional image (large card) */}
                {card.imageSrc && (
                  <div className="relative w-full h-40 lg:h-52">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt ?? card.title}
                      fill
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="fib-image object-cover"
                    />
                  </div>
                )}

                {/* Content area */}
                <div className="relative z-10 p-6 lg:p-8 flex flex-col h-full">
                  {/* Icon */}
                  {card.icon && (
                    <div
                      className="fib-icon-area inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--primary)',
                      }}
                      aria-hidden="true"
                    >
                      {card.icon}
                    </div>
                  )}

                  {/* Text */}
                  <h3
                    className="font-semibold tracking-tight"
                    style={{
                      color: 'var(--card-foreground)',
                      fontSize: isLarge
                        ? 'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)'
                        : 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
