// @version 2.0.0 // @category faq // @name faq-timeline // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SECTION_MAX_WIDTH = '48rem'; // max-w-3xl
const NODE_SIZE_SM = '2.5rem'; // h-10 w-10
const NODE_SIZE_LG = '3rem'; // sm:h-12 sm:w-12
const TERMINAL_DOT_SIZE = '0.75rem'; // h-3 w-3
const STAGGER_DELAY_MS = 100;
const ANIMATION_DURATION = '0.45s';
const SLIDE_IN_OFFSET = '-16px';
const ITEM_GAP = '2.5rem'; // gap-10

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqTimelineProps {
  title?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FaqTimeline({
  title = 'Frequently Asked Questions',
  description,
  items,
  className,
}: FaqTimelineProps) {
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
        <header className="mb-14 text-center">
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

        {/* Timeline */}
        <div className="relative" role="list" aria-label="FAQ timeline">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 h-full w-px sm:left-6"
            style={{ backgroundColor: 'var(--border)' }}
            aria-hidden="true"
          />

          <dl className="flex flex-col" style={{ gap: ITEM_GAP }}>
            {items.map((item, index) => (
              <div
                key={`faq-timeline-${index}`}
                className="faq-timeline-item relative pl-14 sm:pl-16"
                role="listitem"
              >
                {/* Number node */}
                <div
                  className={cn(
                    'absolute left-0 top-0 flex items-center justify-center rounded-full border-2',
                    'text-sm font-bold sm:text-base',
                  )}
                  aria-hidden="true"
                  style={{
                    width: NODE_SIZE_SM,
                    height: NODE_SIZE_SM,
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                  }}
                >
                  {index + 1}
                </div>

                {/* Content */}
                <article
                  className="rounded-lg border p-5"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <dt
                    className="text-lg font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.question}
                  </dt>

                  <dd
                    className="mt-2 text-base leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.answer}
                  </dd>

                  {item.category && (
                    <span
                      className="mt-3 inline-block rounded-full border px-3 py-1 text-xs font-medium"
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
            ))}
          </dl>

          {/* Terminal dot */}
          <div
            className="absolute bottom-0 left-3.5 rounded-full sm:left-4.5"
            style={{
              width: TERMINAL_DOT_SIZE,
              height: TERMINAL_DOT_SIZE,
              backgroundColor: 'var(--primary)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Animation with reduced-motion support */}
      <style>{`
        .faq-timeline-item {
          opacity: 1;
          transform: translateX(0);
        }

        @media (prefers-reduced-motion: no-preference) {
          .faq-timeline-item {
            animation: faq-timeline-slide-in ${ANIMATION_DURATION} ease both;
          }

          .faq-timeline-item:nth-child(1) { animation-delay: 0ms; }
          .faq-timeline-item:nth-child(2) { animation-delay: ${STAGGER_DELAY_MS}ms; }
          .faq-timeline-item:nth-child(3) { animation-delay: ${STAGGER_DELAY_MS * 2}ms; }
          .faq-timeline-item:nth-child(4) { animation-delay: ${STAGGER_DELAY_MS * 3}ms; }
          .faq-timeline-item:nth-child(5) { animation-delay: ${STAGGER_DELAY_MS * 4}ms; }
          .faq-timeline-item:nth-child(6) { animation-delay: ${STAGGER_DELAY_MS * 5}ms; }
          .faq-timeline-item:nth-child(7) { animation-delay: ${STAGGER_DELAY_MS * 6}ms; }
          .faq-timeline-item:nth-child(8) { animation-delay: ${STAGGER_DELAY_MS * 7}ms; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-timeline-item {
            animation: none !important;
            transition: none !important;
          }
        }

        @keyframes faq-timeline-slide-in {
          from {
            opacity: 0;
            transform: translateX(${SLIDE_IN_OFFSET});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
