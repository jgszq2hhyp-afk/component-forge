// @version 1.0.0
// @category features
// @name feature-accordion
// @source self-authored

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

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
    max-height: 200px;
    padding-top: 0;
    padding-bottom: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes accordion-open {
    from { opacity: 0; max-height: 0; }
    to   { opacity: 1; max-height: 200px; }
  }
}
`;

// ---------------------------------------------------------------------------
// Chevron icon
// ---------------------------------------------------------------------------

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn(
        'transition-transform duration-300 flex-shrink-0',
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="text-center mb-12 lg:mb-16">
            {headline && (
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--foreground)' }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subheadline}
              </p>
            )}
          </div>
        )}

        {/* Accordion */}
        <div
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
              <div key={index}>
                <button
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className={cn(
                    'w-full flex items-center gap-4 px-6 py-5 text-left',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
                  )}
                  style={{
                    color: 'var(--card-foreground)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                  }}
                >
                  {item.icon && (
                    <div
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                      }}
                    >
                      {item.icon}
                    </div>
                  )}
                  <span className="flex-1 text-base font-semibold">
                    {item.title}
                  </span>
                  <ChevronIcon isOpen={isOpen} />
                </button>

                {isOpen && (
                  <div
                    className="px-6 pb-5"
                    style={{
                      animation:
                        'accordion-open 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
                    }}
                  >
                    <p
                      className={cn(
                        'text-sm leading-relaxed',
                        item.icon ? 'pl-13' : '',
                      )}
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
