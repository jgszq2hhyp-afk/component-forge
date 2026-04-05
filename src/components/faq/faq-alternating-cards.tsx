// @version 2.0.0 // @category faq // @name faq-alternating-cards // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SECTION_MAX_WIDTH = '56rem'; // max-w-4xl
const CARD_GAP = '1.5rem'; // gap-6
const BADGE_SIZE = '2rem'; // h-8 w-8
const STAGGER_DELAY_MS = 80;
const ANIMATION_DURATION = '0.5s';
const FADE_IN_OFFSET = '12px';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqAlternatingCardsProps {
  title?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FaqAlternatingCards({
  title = 'Frequently Asked Questions',
  description,
  items,
  className,
}: FaqAlternatingCardsProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        'w-full px-4 py-16 sm:px-6 lg:px-8',
        className,
      )}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto" style={{ maxWidth: SECTION_MAX_WIDTH }}>
        {/* Header */}
        <header className="mb-12 text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              className="mt-4 text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {description}
            </p>
          )}
        </header>

        {/* Alternating cards */}
        <dl className="flex flex-col" style={{ gap: CARD_GAP }}>
          {items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={`faq-card-${index}`}
                className={cn(
                  'flex w-full',
                  isEven ? 'justify-start' : 'justify-end',
                )}
              >
                <article
                  className={cn(
                    'w-full rounded-xl border p-6 sm:w-4/5 lg:w-3/5',
                    'faq-alternating-card',
                  )}
                  style={{
                    backgroundColor: 'var(--card)',
                    color: 'var(--card-foreground)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {/* Number badge */}
                  <span
                    className="mb-3 inline-flex items-center justify-center rounded-full text-sm font-semibold"
                    aria-hidden="true"
                    style={{
                      width: BADGE_SIZE,
                      height: BADGE_SIZE,
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    {index + 1}
                  </span>

                  <dt
                    className="mb-2 text-lg font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.question}
                  </dt>

                  <dd
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.answer}
                  </dd>

                  {item.category && (
                    <span
                      className="mt-4 inline-block rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: 'var(--border)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                </article>
              </div>
            );
          })}
        </dl>
      </div>

      {/* Animation with reduced-motion support */}
      <style>{`
        .faq-alternating-card {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: no-preference) {
          .faq-alternating-card {
            animation: faq-card-fade-in ${ANIMATION_DURATION} ease both;
            transition: box-shadow 0.2s ease;
          }

          .faq-alternating-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          }

          .faq-alternating-card:nth-child(1) { animation-delay: 0ms; }
          .faq-alternating-card:nth-child(2) { animation-delay: ${STAGGER_DELAY_MS}ms; }
          .faq-alternating-card:nth-child(3) { animation-delay: ${STAGGER_DELAY_MS * 2}ms; }
          .faq-alternating-card:nth-child(4) { animation-delay: ${STAGGER_DELAY_MS * 3}ms; }
          .faq-alternating-card:nth-child(5) { animation-delay: ${STAGGER_DELAY_MS * 4}ms; }
          .faq-alternating-card:nth-child(6) { animation-delay: ${STAGGER_DELAY_MS * 5}ms; }
          .faq-alternating-card:nth-child(7) { animation-delay: ${STAGGER_DELAY_MS * 6}ms; }
          .faq-alternating-card:nth-child(8) { animation-delay: ${STAGGER_DELAY_MS * 7}ms; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-alternating-card {
            animation: none !important;
            transition: none !important;
          }
        }

        @keyframes faq-card-fade-in {
          from {
            opacity: 0;
            transform: translateY(${FADE_IN_OFFSET});
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
