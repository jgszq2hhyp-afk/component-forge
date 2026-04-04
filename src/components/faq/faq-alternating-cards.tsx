// @version 1.0.0 // @category faq // @name faq-alternating-cards // @source custom

import { cn } from '@/lib/utils';

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
      className={cn(
        'w-full px-4 py-16 sm:px-6 lg:px-8',
        className,
      )}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: 'var(--foreground)' }}
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
        </div>

        {/* Alternating cards */}
        <div className="flex flex-col gap-6">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={cn(
                  'flex w-full',
                  isEven ? 'justify-start' : 'justify-end',
                )}
              >
                <div
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
                    className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    {index + 1}
                  </span>

                  <h3
                    className="mb-2 text-lg font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.question}
                  </h3>

                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.answer}
                  </p>

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
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation with reduced-motion support */}
      <style>{`
        .faq-alternating-card {
          opacity: 1;
          transform: translateY(0);
          transition: box-shadow 0.2s ease;
        }

        .faq-alternating-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        @media (prefers-reduced-motion: no-preference) {
          .faq-alternating-card {
            animation: faq-card-fade-in 0.5s ease both;
          }

          .faq-alternating-card:nth-child(1) { animation-delay: 0ms; }
          .faq-alternating-card:nth-child(2) { animation-delay: 80ms; }
          .faq-alternating-card:nth-child(3) { animation-delay: 160ms; }
          .faq-alternating-card:nth-child(4) { animation-delay: 240ms; }
          .faq-alternating-card:nth-child(5) { animation-delay: 320ms; }
          .faq-alternating-card:nth-child(6) { animation-delay: 400ms; }
          .faq-alternating-card:nth-child(7) { animation-delay: 480ms; }
          .faq-alternating-card:nth-child(8) { animation-delay: 560ms; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-alternating-card {
            animation: none;
            transition: none;
          }
        }

        @keyframes faq-card-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
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
