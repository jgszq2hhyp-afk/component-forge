// @version 1.0.0
// @category features
// @name feature-tabs
// @source self-authored

'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
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

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const activeTab = tabs[activeIndex];
  if (!activeTab) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
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

        {/* Tab buttons */}
        <div
          role="tablist"
          className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-14"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === activeIndex}
              onClick={() => handleTabClick(index)}
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium',
                'transition-all duration-200',
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
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          key={activeIndex}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          style={{
            animation: 'tab-content-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          {/* Text */}
          <div>
            <h3
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              style={{ color: 'var(--foreground)' }}
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
              <ul className="mt-6 space-y-3">
                {activeTab.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={activeTab.imageSrc}
                alt={activeTab.imageAlt ?? activeTab.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
