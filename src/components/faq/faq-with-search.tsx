// @version 2.0.0 // @category faq // @name faq-with-search // @source custom

'use client';

import { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const PANEL_MAX_HEIGHT = '500px';
const ICON_SIZE_SEARCH = 18;
const ICON_SIZE_CHEVRON = 20;
const SECTION_MAX_WIDTH = '48rem'; // max-w-3xl

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqWithSearchProps {
  headline?: string;
  description?: string;
  items: FaqItem[];
  searchPlaceholder?: string;
  noResultsText?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <svg
      width={ICON_SIZE_SEARCH}
      height={ICON_SIZE_SEARCH}
      viewBox={`0 0 ${ICON_SIZE_SEARCH} ${ICON_SIZE_SEARCH}`}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.5 12.5L16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={ICON_SIZE_CHEVRON}
      height={ICON_SIZE_CHEVRON}
      viewBox={`0 0 ${ICON_SIZE_CHEVRON} ${ICON_SIZE_CHEVRON}`}
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

export default function FaqWithSearch({
  headline = 'How can we help?',
  description,
  items,
  searchPlaceholder = 'Search questions...',
  noResultsText = 'No matching questions found. Try a different search term.',
  className,
}: FaqWithSearchProps) {
  const [query, setQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery),
    );
  }, [items, query]);

  const toggle = useCallback((index: number) => {
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

  return (
    <section
      aria-label={headline}
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto" style={{ maxWidth: SECTION_MAX_WIDTH }}>
        {/* Header */}
        <header className="mb-10 text-center">
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

        {/* Search bar */}
        <search className="relative mb-10">
          <label htmlFor="faq-search" className="sr-only">
            Search FAQ
          </label>
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <SearchIcon />
          </span>
          <input
            id="faq-search"
            type="search"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenIndices(new Set());
            }}
            className={cn(
              'w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm',
              'motion-safe:transition-colors motion-safe:duration-200',
              'placeholder:opacity-60',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              borderColor: 'var(--border)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          />
        </search>

        {/* Results */}
        {filteredItems.length === 0 ? (
          <p
            className="py-8 text-center text-sm"
            role="status"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {noResultsText}
          </p>
        ) : (
          <dl className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {filteredItems.map((item, index) => {
              const isOpen = openIndices.has(index);
              const panelId = `faq-search-panel-${index}`;
              const triggerId = `faq-search-trigger-${index}`;

              return (
                <div key={item.question}>
                  <dt>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(index)}
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
