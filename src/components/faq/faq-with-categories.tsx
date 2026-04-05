// @version 2.0.0 // @category faq // @name faq-with-categories // @source custom

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const PANEL_MAX_HEIGHT = '500px';
const ICON_SIZE = 20;
const SECTION_MAX_WIDTH = '56rem'; // max-w-4xl
const INACTIVE_BG = 'color-mix(in oklch, var(--foreground) 6%, transparent)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  name: string;
  items: FaqItem[];
}

interface FaqWithCategoriesProps {
  headline?: string;
  description?: string;
  categories: FaqCategory[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Chevron icon
// ---------------------------------------------------------------------------

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox={`0 0 ${ICON_SIZE} ${ICON_SIZE}`}
      fill="none"
      aria-hidden="true"
      className="shrink-0 motion-safe:transition-transform motion-safe:duration-200"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
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

export default function FaqWithCategories({
  headline = 'Frequently asked questions',
  description,
  categories,
  className,
}: FaqWithCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleItem = useCallback((index: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const switchCategory = useCallback((index: number) => {
    setActiveCategory(index);
    setOpenIndices(new Set());
  }, []);

  const currentCategory = categories[activeCategory];

  return (
    <section
      aria-label={headline}
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
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
            {headline}
          </h2>
          {description && (
            <p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {description}
            </p>
          )}
        </header>

        {/* Category tabs */}
        <nav aria-label="FAQ categories" className="mb-10 flex flex-wrap justify-center gap-2">
          <div role="tablist">
            {categories.map((category, index) => (
              <button
                key={category.name}
                type="button"
                role="tab"
                aria-selected={index === activeCategory}
                aria-controls={`faq-category-panel-${index}`}
                onClick={() => switchCategory(index)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-medium',
                  'motion-safe:transition-all motion-safe:duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  backgroundColor:
                    index === activeCategory
                      ? 'var(--primary)'
                      : INACTIVE_BG,
                  color:
                    index === activeCategory
                      ? 'var(--primary-foreground)'
                      : 'var(--muted-foreground)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </nav>

        {/* FAQ items for active category */}
        {currentCategory && (
          <dl
            id={`faq-category-panel-${activeCategory}`}
            role="tabpanel"
            className="divide-y"
            style={{ borderColor: 'var(--border)' }}
          >
            {currentCategory.items.map((item, index) => {
              const isOpen = openIndices.has(index);
              const panelId = `faq-cat-panel-${activeCategory}-${index}`;
              const triggerId = `faq-cat-trigger-${activeCategory}-${index}`;

              return (
                <div key={triggerId}>
                  <dt>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(index)}
                      className={cn(
                        'flex w-full items-center justify-between gap-4 py-5 text-left',
                        'text-base font-medium',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                      )}
                      style={{
                        color: 'var(--foreground)',
                        ['--tw-ring-color' as string]: 'var(--primary)',
                        ['--tw-ring-offset-color' as string]: 'var(--background)',
                      }}
                    >
                      <span>{item.question}</span>
                      <ChevronIcon open={isOpen} />
                    </button>
                  </dt>
                  <dd
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="overflow-hidden motion-safe:transition-all motion-safe:duration-200"
                    style={{
                      maxHeight: isOpen ? PANEL_MAX_HEIGHT : '0',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      className="pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {item.answer}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>
    </section>
  );
}
