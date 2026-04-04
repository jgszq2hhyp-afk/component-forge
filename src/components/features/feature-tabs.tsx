// @version 2.0.0
// @category features
// @name feature-tabs
// @source self-authored

'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANIMATION_DURATION_S = 0.4;
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const CONTENT_TITLE_CLAMP = 'clamp(1.5rem, 1.2rem + 1vw, 1.875rem)';
const SECTION_MAX_WIDTH = '80rem';
const CUBIC_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const BULLET_DOT_SIZE = 'w-1.5 h-1.5';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureTab {
  label: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  bullets?: string[];
}

interface FeatureTabsProps {
  headline?: string;
  subheadline?: string;
  tabs: FeatureTab[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes tab-content-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes tab-content-in {
    from { opacity: 1; }
    to   { opacity: 1; }
  }

  [role="tabpanel"] {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureTabs({
  headline,
  subheadline,
  tabs,
  className,
}: FeatureTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newIndex = activeIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (activeIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
        buttons?.[newIndex]?.focus();
      }
    },
    [activeIndex, tabs.length],
  );

  const activeTab = tabs[activeIndex];
  if (!activeTab) return null;

  const tabPanelId = `tab-panel-${activeIndex}`;
  const tabId = (index: number) => `tab-${index}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Features'}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{
          maxWidth: SECTION_MAX_WIDTH,
          backgroundColor: 'var(--background)',
        }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
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

        {/* Tab buttons */}
        <nav aria-label="Feature tabs">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Feature categories"
            className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-14"
            onKeyDown={handleKeyDown}
          >
            {tabs.map((tab, index) => (
              <button
                key={index}
                id={tabId(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={tabPanelId}
                tabIndex={index === activeIndex ? 0 : -1}
                onClick={() => handleTabClick(index)}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium',
                  'transition-all duration-200 motion-reduce:transition-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  backgroundColor:
                    index === activeIndex ? 'var(--primary)' : 'var(--accent)',
                  color:
                    index === activeIndex
                      ? 'var(--primary-foreground)'
                      : 'var(--accent-foreground)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {tab.icon && (
                  <span className="w-4 h-4" aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab content */}
        <div
          id={tabPanelId}
          key={activeIndex}
          role="tabpanel"
          aria-labelledby={tabId(activeIndex)}
          tabIndex={0}
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-2xl',
          )}
          style={{
            animation: `tab-content-in ${ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
            '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
            '--tw-ring-offset-color': 'var(--background)',
          } as React.CSSProperties}
        >
          {/* Text */}
          <div>
            <h3
              className="font-bold tracking-tight"
              style={{
                color: 'var(--foreground)',
                fontSize: CONTENT_TITLE_CLAMP,
              }}
            >
              {activeTab.title}
            </h3>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {activeTab.description}
            </p>
            {activeTab.bullets && activeTab.bullets.length > 0 && (
              <ul className="mt-6 space-y-3" aria-label={`${activeTab.title} details`}>
                {activeTab.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <span
                      className={cn('mt-1.5 rounded-full flex-shrink-0', BULLET_DOT_SIZE)}
                      style={{ backgroundColor: 'var(--primary)' }}
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image */}
          {activeTab.imageSrc && (
            <figure className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={activeTab.imageSrc}
                alt={activeTab.imageAlt ?? activeTab.title}
                fill
                className="object-cover"
              />
            </figure>
          )}
        </div>
      </section>
    </>
  );
}
