// @version 1.0.0 // @category faq // @name faq-timeline // @source custom

import { cn } from '@/lib/utils';

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
      className={cn(
        'w-full px-4 py-16 sm:px-6 lg:px-8',
        className,
      )}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-14 text-center">
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 h-full w-px sm:left-6"
            style={{ backgroundColor: 'var(--border)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="faq-timeline-item relative pl-14 sm:pl-16"
              >
                {/* Number node */}
                <div
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold sm:h-12 sm:w-12 sm:text-base"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                  }}
                >
                  {index + 1}
                </div>

                {/* Content */}
                <div
                  className="rounded-lg border p-5"
                  style={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {item.question}
                  </h3>

                  <p
                    className="mt-2 text-base leading-relaxed"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.answer}
                  </p>

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
                </div>
              </div>
            ))}
          </div>

          {/* Terminal dot */}
          <div
            className="absolute bottom-0 left-3.5 h-3 w-3 rounded-full sm:left-4.5"
            style={{ backgroundColor: 'var(--primary)' }}
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
            animation: faq-timeline-slide-in 0.45s ease both;
          }

          .faq-timeline-item:nth-child(1) { animation-delay: 0ms; }
          .faq-timeline-item:nth-child(2) { animation-delay: 100ms; }
          .faq-timeline-item:nth-child(3) { animation-delay: 200ms; }
          .faq-timeline-item:nth-child(4) { animation-delay: 300ms; }
          .faq-timeline-item:nth-child(5) { animation-delay: 400ms; }
          .faq-timeline-item:nth-child(6) { animation-delay: 500ms; }
          .faq-timeline-item:nth-child(7) { animation-delay: 600ms; }
          .faq-timeline-item:nth-child(8) { animation-delay: 700ms; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-timeline-item {
            animation: none;
            transition: none;
          }
        }

        @keyframes faq-timeline-slide-in {
          from {
            opacity: 0;
            transform: translateX(-16px);
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
