"use client"

// @version 2.0.0 // @category faq // @name faq-tabs-grouped // @source custom

'use client';

import { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SECTION_MAX_WIDTH = '48rem'; // max-w-3xl
const CARD_GAP = '1rem'; // gap-4
const STAGGER_DELAY_MS = 50;
const ANIMATION_DURATION = '0.3s';
const FADE_IN_OFFSET = '8px';
const DEFAULT_CATEGORY = 'General';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

interface FaqTabsGroupedProps {
  title?: string;
  description?: string;
  items: FaqItem[];
  defaultCategory?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FaqTabsGrouped({
  title = 'Frequently Asked Questions',
  description,
  items,
  defaultCategory,
  className,
}: FaqTabsGroupedProps) {
  // Group items by category
  const groups = useMemo(() => {
    const map = new Map<string, FaqItem[]>();
    for (const item of items) {
      const cat = item.category ?? DEFAULT_CATEGORY;
      const existing = map.get(cat);
      if (existing) {
        existing.push(item);
      } else {
        map.set(cat, [item]);
      }
    }
    return map;
  }, [items]);

  const categories = useMemo(() => Array.from(groups.keys()), [groups]);
  const [activeTab, setActiveTab] = useState(defaultCategory ?? categories[0] ?? DEFAULT_CATEGORY);

  const handleTabClick = useCallback((category: string) => {
    setActiveTab(category);
  }, []);

  const activeItems = groups.get(activeTab) ?? [];

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
        <header className="mb-10 text-center">
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

        {/* Tabs */}
        <nav aria-label="FAQ categories" className="mb-8">
          <div
            role="tablist"
            aria-label="FAQ categories"
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => {
              const isActive = category === activeTab;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`faq-tabpanel-${category}`}
                  onClick={() => handleTabClick(category)}
                  className={cn(
                    'faq-tab-button rounded-full border px-4 py-2 text-sm font-medium',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--primary)' : 'var(--card)',
                    color: isActive ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                    borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                    cursor: 'pointer',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Tab panel */}
        <div
          role="tabpanel"
          id={`faq-tabpanel-${activeTab}`}
          aria-label={activeTab}
        >
          <dl className="flex flex-col" style={{ gap: CARD_GAP }}>
            {activeItems.map((item, index) => (
              <article
                key={`${activeTab}-${index}`}
                className="faq-tab-card rounded-lg border p-5"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <dt
                  className="text-base font-semibold sm:text-lg"
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.question}
                </dt>
                <dd
                  className="mt-2 text-sm leading-relaxed sm:text-base"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {item.answer}
                </dd>
              </article>
            ))}
          </dl>

          {activeItems.length === 0 && (
            <p
              className="py-8 text-center text-sm"
              role="status"
              style={{ color: 'var(--muted-foreground)' }}
            >
              No questions in this category.
            </p>
          )}
        </div>
      </div>

      {/* Animation with reduced-motion support */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .faq-tab-button {
            transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
          }

          .faq-tab-card {
            animation: faq-tab-fade-in ${ANIMATION_DURATION} ease both;
          }

          .faq-tab-card:nth-child(1) { animation-delay: 0ms; }
          .faq-tab-card:nth-child(2) { animation-delay: ${STAGGER_DELAY_MS}ms; }
          .faq-tab-card:nth-child(3) { animation-delay: ${STAGGER_DELAY_MS * 2}ms; }
          .faq-tab-card:nth-child(4) { animation-delay: ${STAGGER_DELAY_MS * 3}ms; }
          .faq-tab-card:nth-child(5) { animation-delay: ${STAGGER_DELAY_MS * 4}ms; }
          .faq-tab-card:nth-child(6) { animation-delay: ${STAGGER_DELAY_MS * 5}ms; }
          .faq-tab-card:nth-child(7) { animation-delay: ${STAGGER_DELAY_MS * 6}ms; }
          .faq-tab-card:nth-child(8) { animation-delay: ${STAGGER_DELAY_MS * 7}ms; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-tab-button,
          .faq-tab-card {
            animation: none !important;
            transition: none !important;
          }
        }

        .faq-tab-card {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes faq-tab-fade-in {
          from {
            opacity: 0;
            transform: translateY(${FADE_IN_OFFSET});
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
