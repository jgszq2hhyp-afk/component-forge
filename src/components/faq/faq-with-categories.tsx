// @version 1.0.0 // @category faq // @name faq-with-categories // @source custom

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

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
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200"
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
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)',
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
        </div>

        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
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
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              style={{
                backgroundColor:
                  index === activeCategory
                    ? 'var(--primary)'
                    : 'color-mix(in oklch, var(--foreground) 6%, transparent)',
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

        {/* FAQ items for active category */}
        {currentCategory && (
          <div
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
                  <h3>
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
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="overflow-hidden transition-all duration-200"
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      className="pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
