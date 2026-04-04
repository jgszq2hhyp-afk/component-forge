// @version 1.0.0 // @category faq // @name faq-tabs-grouped // @source custom

'use client';

import { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

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
      const cat = item.category ?? 'General';
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
  const [activeTab, setActiveTab] = useState(defaultCategory ?? categories[0] ?? 'General');

  const handleTabClick = useCallback((category: string) => {
    setActiveTab(category);
  }, []);

  const activeItems = groups.get(activeTab) ?? [];

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
        <div className="mb-10 text-center">
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

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="FAQ categories"
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => {
            const isActive = category === activeTab;
            return (
              <button
                key={category}
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
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Tab panel */}
        <div
          role="tabpanel"
          id={`faq-tabpanel-${activeTab}`}
          aria-label={activeTab}
          className="flex flex-col gap-4"
        >
          {activeItems.map((item, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="faq-tab-card rounded-lg border p-5"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
              }}
            >
              <h3
                className="text-base font-semibold sm:text-lg"
                style={{ color: 'var(--foreground)' }}
              >
                {item.question}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed sm:text-base"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {item.answer}
              </p>
            </div>
          ))}

          {activeItems.length === 0 && (
            <p
              className="py-8 text-center text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              No questions in this category.
            </p>
          )}
        </div>
      </div>

      {/* Animation with reduced-motion support */}
      <style>{`
        .faq-tab-button {
          transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
        }

        .faq-tab-card {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: no-preference) {
          .faq-tab-card {
            animation: faq-tab-fade-in 0.3s ease both;
          }

          .faq-tab-card:nth-child(1) { animation-delay: 0ms; }
          .faq-tab-card:nth-child(2) { animation-delay: 50ms; }
          .faq-tab-card:nth-child(3) { animation-delay: 100ms; }
          .faq-tab-card:nth-child(4) { animation-delay: 150ms; }
          .faq-tab-card:nth-child(5) { animation-delay: 200ms; }
          .faq-tab-card:nth-child(6) { animation-delay: 250ms; }
          .faq-tab-card:nth-child(7) { animation-delay: 300ms; }
          .faq-tab-card:nth-child(8) { animation-delay: 350ms; }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-tab-button,
          .faq-tab-card {
            animation: none;
            transition: none;
          }
        }

        @keyframes faq-tab-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
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
