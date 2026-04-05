// @version 2.0.0
// @category faq
// @name faq-expandable-grid
// @source custom

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const SECTION_MAX_WIDTH = '64rem';
const ICON_SIZE = 20;
const ICON_STROKE_WIDTH = 1.5;
const ANSWER_MAX_HEIGHT_PX = '500px';
const ANSWER_MIN_HEIGHT_PX = '0px';
const STAGGER_DELAY_MS = 60;
const MAX_STAGGER_ITEMS = 8;

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
      width={ICON_SIZE}
      height={ICON_SIZE}
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
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
      />
      {/* Vertical line (hidden when open) */}
      <line
        x1="10"
        y1="4"
        x2="10"
        y2="16"
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
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
      aria-label={title}
      className={cn('w-full px-4 py-16 sm:px-6 lg:px-8', className)}
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
              className="mt-4 leading-relaxed"
              style={{
                color: 'var(--muted-foreground)',
                fontSize: SUBHEADING_CLAMP,
              }}
            >
              {description}
            </p>
          )}
        </header>

        {/* Grid */}
        <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <dt>
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
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
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--card)',
                    }}
                  >
                    <span className="text-base font-semibold leading-snug">
                      {item.question}
                    </span>
                    <PlusMinusIcon open={isOpen} />
                  </button>
                </dt>

                {/* Answer - collapsible */}
                <dd
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className="faq-grid-answer"
                  style={{
                    maxHeight: isOpen ? ANSWER_MAX_HEIGHT_PX : ANSWER_MIN_HEIGHT_PX,
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
                </dd>
              </div>
            );
          })}
        </dl>
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

          ${Array.from({ length: MAX_STAGGER_ITEMS }, (_, i) =>
            `.faq-grid-card:nth-child(${i + 1}) { animation-delay: ${i * STAGGER_DELAY_MS}ms; }`
          ).join('\n          ')}
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
