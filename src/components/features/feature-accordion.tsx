"use client"

// @version 2.0.0
// @category features
// @name feature-accordion
// @source self-authored

'use client';

import { useState, useCallback, useId } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANIMATION_DURATION_S = 0.3;
const MAX_CONTENT_HEIGHT_PX = 200;
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const SECTION_MAX_WIDTH = '48rem';
const ICON_SIZE = 'w-9 h-9';
const CHEVRON_SIZE = 20;
const CUBIC_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const CONTENT_PADDING_BOTTOM_PX = 16;
const SECTION_PADDING = 'px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24';
const HEADER_MARGIN_BOTTOM = 'mb-12 lg:mb-16';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const ICON_INDENT = 'pl-13';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AccordionItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureAccordionProps {
  headline?: string;
  subheadline?: string;
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes accordion-open {
  from {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  to {
    opacity: 1;
    max-height: ${MAX_CONTENT_HEIGHT_PX}px;
    padding-top: 0;
    padding-bottom: ${CONTENT_PADDING_BOTTOM_PX}px;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes accordion-open {
    from { opacity: 1; max-height: ${MAX_CONTENT_HEIGHT_PX}px; }
    to   { opacity: 1; max-height: ${MAX_CONTENT_HEIGHT_PX}px; }
  }

  .accordion-chevron {
    transition: none !important;
    transform: none !important;
  }

  .accordion-content {
    animation: none !important;
    transition: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Chevron icon
// ---------------------------------------------------------------------------

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width={CHEVRON_SIZE}
      height={CHEVRON_SIZE}
      viewBox={`0 0 ${CHEVRON_SIZE} ${CHEVRON_SIZE}`}
      fill="none"
      aria-hidden="true"
      className={cn(
        'accordion-chevron transition-transform duration-300 flex-shrink-0',
        'motion-reduce:transition-none',
        isOpen && 'rotate-180',
      )}
    >
      <path
        d="M5 8L10 13L15 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureAccordion({
  headline,
  subheadline,
  items,
  allowMultiple = false,
  className,
}: FeatureAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const baseId = useId();

  const toggleItem = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (index + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (index - 1 + items.length) % items.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = items.length - 1;
      }

      if (nextIndex !== null) {
        const target = document.getElementById(triggerId(nextIndex));
        target?.focus();
      }
    },
    [items.length],
  );

  const triggerId = (index: number) => `${baseId}-trigger-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Features'}
        className={cn(
          'mx-auto',
          SECTION_PADDING,
          className,
        )}
        style={{
          maxWidth: SECTION_MAX_WIDTH,
          backgroundColor: 'var(--background)',
        }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={cn('text-center', HEADER_MARGIN_BOTTOM)}>
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

        {/* Accordion */}
        <dl
          className="rounded-2xl border divide-y overflow-hidden"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            ['--tw-divide-color' as string]: 'var(--border)',
          }}
        >
          {items.map((item, index) => {
            const isOpen = openIndices.has(index);
            return (
              <div key={`${item.title}-${index}`} className="group">
                <dt>
                  <button
                    id={triggerId(index)}
                    onClick={() => toggleItem(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId(index)}
                    className={cn(
                      'w-full flex items-center gap-4 px-6 py-5 text-left',
                      'transition-colors duration-200 motion-reduce:transition-none',
                      FOCUS_RING,
                    )}
                    style={{
                      color: 'var(--card-foreground)',
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    {item.icon && (
                      <div
                        className={cn(
                          'inline-flex items-center justify-center rounded-lg flex-shrink-0',
                          ICON_SIZE,
                        )}
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-foreground)',
                        }}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                    )}
                    <span className="flex-1 text-base font-semibold">
                      {item.title}
                    </span>
                    <ChevronIcon isOpen={isOpen} />
                  </button>
                </dt>

                {isOpen && (
                  <dd
                    id={panelId(index)}
                    role="region"
                    aria-labelledby={triggerId(index)}
                    className="accordion-content px-6 pb-5"
                    style={{
                      animation: `accordion-open ${ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                    }}
                  >
                    <p
                      className={cn(
                        'text-sm leading-relaxed',
                        item.icon ? ICON_INDENT : '',
                      )}
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {item.description}
                    </p>
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </section>
    </>
  );
}
