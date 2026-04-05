// @version 1.0.0
// @category about
// @name about-company-numbers
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(2rem, 4vw + 1rem, 3.5rem)';
const STAT_VALUE_CLAMP = 'clamp(2.5rem, 5vw + 1rem, 5rem)';
const STAT_LABEL_CLAMP = 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)';
const SECTION_PADDING_Y = 'clamp(3rem, 8vw, 6rem)';
const SECTION_PADDING_X = 'clamp(1.5rem, 4vw, 5rem)';
const CONTENT_MAX_WIDTH = '72rem';
const DIVIDER_MIX_PERCENT = '40%';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface AboutCompanyNumbersProps {
  headline: string;
  stats: StatItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function AboutCompanyNumbers({
  headline,
  stats,
  className,
}: AboutCompanyNumbersProps) {
  const headingId = 'company-numbers-heading';

  return (
    <section
      aria-labelledby={headingId}
      className={cn('relative', className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
        backgroundColor: 'var(--background)',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: CONTENT_MAX_WIDTH }}
      >
        {/* Section Header */}
        <header className="text-center">
          <h2
            id={headingId}
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>
        </header>

        {/* Stats Grid */}
        <dl
          className={cn(
            'mt-12 md:mt-16 grid gap-8',
            'grid-cols-2 lg:grid-cols-4',
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'relative flex flex-col items-center text-center',
                'py-6 md:py-8',
              )}
            >
              {/* Vertical divider between items on desktop */}
              {index > 0 && (
                <div
                  className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block"
                  style={{
                    width: 1,
                    height: '60%',
                    backgroundColor: `color-mix(in srgb, var(--border) ${DIVIDER_MIX_PERCENT}, transparent)`,
                  }}
                  aria-hidden="true"
                />
              )}

              <dt
                className="order-2 mt-3 leading-relaxed"
                style={{
                  fontSize: STAT_LABEL_CLAMP,
                  color: 'var(--muted-foreground)',
                }}
              >
                {stat.label}
              </dt>

              <dd
                className="order-1 font-bold tracking-tight tabular-nums"
                style={{
                  fontSize: STAT_VALUE_CLAMP,
                  color: 'var(--foreground)',
                }}
              >
                {stat.prefix && (
                  <span style={{ color: 'var(--primary)' }}>
                    {stat.prefix}
                  </span>
                )}
                {stat.value}
                {stat.suffix && (
                  <span style={{ color: 'var(--primary)' }}>
                    {stat.suffix}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
