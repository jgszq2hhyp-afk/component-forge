// @version 1.0.0 // @category faq // @name faq-expandable-grid // @source custom

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqExpandableGridProps {
  title?: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Horizontal line (always visible) */}
      <line
        x1="4"
        y1="10"
        x2="16"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Vertical line (hidden when open) */}
      <line
        x1="10"
        y1="4"
        x2="10"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="faq-grid-plus-vertical"
        style={{
          opacity: open ? 0 : 1,
          transform: open ? 'scaleY(0)' : 'scaleY(1)',
          transformOrigin: 'center',
        }}
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FaqExpandableGrid({
  title = 'Frequently Asked Questions',
  description,
  items,
  className,
}: FaqExpandableGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      className={cn(
        'w-full px-4 py-16 sm:px-6 lg:px-8',
        className,
      )}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto max-w-5xl">
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

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="faq-grid-card rounded-xl border"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: isOpen ? 'var(--primary)' : 'var(--border)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className={cn(
                    'flex w-full items-start justify-between gap-3 p-5 text-left',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'rounded-xl',
                  )}
                  style={{
                    cursor: 'pointer',
                    color: 'var(--card-foreground)',
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                >
                  <span className="text-base font-semibold leading-snug">
                    {item.question}
                  </span>
                  <PlusMinusIcon open={isOpen} />
                </button>

                {/* Answer - collapsible */}
                <div
                  className="faq-grid-answer"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    overflow: 'hidden',
                  }}
                >
                  <div className="px-5 pb-5">
                    <p
                      className="text-sm leading-relaxed sm:text-base"
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation with reduced-motion support */}
      <style>{`
        .faq-grid-card {
          transition: border-color 0.2s ease;
        }

        .faq-grid-answer {
          transition: max-height 0.3s ease;
        }

        .faq-grid-plus-vertical {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        @media (prefers-reduced-motion: no-preference) {
          .faq-grid-card {
            animation: faq-grid-fade-in 0.4s ease both;
          }

          .faq-grid-card:nth-child(1) { animation-delay: 0ms; }
          .faq-grid-card:nth-child(2) { animation-delay: 60ms; }
          .faq-grid-card:nth-child(3) { animation-delay: 120ms; }
          .faq-grid-card:nth-child(4) { animation-delay: 180ms; }
          .faq-grid-card:nth-child(5) { animation-delay: 240ms; }
          .faq-grid-card:nth-child(6) { animation-delay: 300ms; }
          .faq-grid-card:nth-child(7) { animation-delay: 360ms; }
          .faq-grid-card:nth-child(8) { animation-delay: 420ms; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-grid-card,
          .faq-grid-answer,
          .faq-grid-plus-vertical {
            animation: none !important;
            transition: none !important;
          }
        }

        @keyframes faq-grid-fade-in {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
