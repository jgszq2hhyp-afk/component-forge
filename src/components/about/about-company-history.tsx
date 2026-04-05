// @version 1.0.0
// @category about
// @name about-company-history
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(2rem, 4vw + 1rem, 3.5rem)';
const YEAR_CLAMP = 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)';
const MILESTONE_TITLE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)';
const SECTION_PADDING_Y = 'clamp(3rem, 8vw, 6rem)';
const SECTION_PADDING_X = 'clamp(1.5rem, 4vw, 5rem)';
const CONTENT_MAX_WIDTH = '72rem';
const TIMELINE_DOT_SIZE = 14;
const TIMELINE_LINE_WIDTH = 2;
const YEAR_BG_MIX_PERCENT = '12%';
const CARD_BORDER_MIX_PERCENT = '30%';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface AboutCompanyHistoryProps {
  headline: string;
  milestones: Milestone[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function AboutCompanyHistory({
  headline,
  milestones,
  className,
}: AboutCompanyHistoryProps) {
  const headingId = 'company-history-heading';

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

        {/* Timeline */}
        <ol
          className="relative mt-12 md:mt-16 list-none p-0"
          aria-label="Company milestones"
        >
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === milestones.length - 1;

            return (
              <li
                key={`${milestone.year}-${milestone.title}`}
                className={cn(
                  'relative pb-10 md:pb-16',
                  isLast && 'pb-0',
                  /* Mobile: single column with left line */
                  'pl-10 md:pl-0',
                  /* Desktop: alternating layout */
                  'md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8',
                )}
              >
                {/* Vertical line - mobile */}
                {!isLast && (
                  <div
                    className="absolute left-[6px] top-[20px] bottom-0 md:hidden"
                    style={{
                      width: TIMELINE_LINE_WIDTH,
                      backgroundColor: 'var(--border)',
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Left column (desktop) */}
                <div
                  className={cn(
                    'hidden md:flex',
                    isEven ? 'justify-end' : 'order-3',
                  )}
                >
                  {isEven && (
                    <TimelineCard
                      milestone={milestone}
                      align="right"
                    />
                  )}
                </div>

                {/* Center dot + line (desktop) */}
                <div className="relative hidden md:flex md:flex-col md:items-center order-2">
                  {/* Dot */}
                  <div
                    className="relative z-10 shrink-0 rounded-full mt-1"
                    style={{
                      width: TIMELINE_DOT_SIZE,
                      height: TIMELINE_DOT_SIZE,
                      backgroundColor: 'var(--primary)',
                      boxShadow: `0 0 0 4px color-mix(in srgb, var(--primary) ${YEAR_BG_MIX_PERCENT}, transparent)`,
                    }}
                    aria-hidden="true"
                  />
                  {/* Line */}
                  {!isLast && (
                    <div
                      className="flex-1"
                      style={{
                        width: TIMELINE_LINE_WIDTH,
                        backgroundColor: 'var(--border)',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Right column (desktop) */}
                <div
                  className={cn(
                    'hidden md:flex',
                    isEven ? 'order-3' : 'justify-end',
                  )}
                >
                  {!isEven && (
                    <TimelineCard
                      milestone={milestone}
                      align="left"
                    />
                  )}
                </div>

                {/* Mobile dot */}
                <div
                  className="absolute left-0 top-[6px] z-10 rounded-full md:hidden"
                  style={{
                    width: TIMELINE_DOT_SIZE,
                    height: TIMELINE_DOT_SIZE,
                    backgroundColor: 'var(--primary)',
                    boxShadow: `0 0 0 4px color-mix(in srgb, var(--primary) ${YEAR_BG_MIX_PERCENT}, transparent)`,
                  }}
                  aria-hidden="true"
                />

                {/* Mobile card */}
                <div className="md:hidden">
                  <TimelineCard
                    milestone={milestone}
                    align="left"
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Timeline Card
// ---------------------------------------------------------------------------

function TimelineCard({
  milestone,
  align,
}: {
  milestone: Milestone;
  align: 'left' | 'right';
}) {
  return (
    <article
      className={cn(
        'max-w-md rounded-2xl p-5 md:p-6',
        align === 'right' ? 'md:text-right' : 'md:text-left',
      )}
      style={{
        backgroundColor: 'var(--card)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: `color-mix(in srgb, var(--border) ${CARD_BORDER_MIX_PERCENT}, transparent)`,
      }}
    >
      <span
        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase"
        style={{
          backgroundColor: `color-mix(in srgb, var(--primary) ${YEAR_BG_MIX_PERCENT}, transparent)`,
          color: 'var(--primary)',
        }}
      >
        {milestone.year}
      </span>

      <h3
        className="mt-3 font-semibold tracking-tight"
        style={{
          fontSize: MILESTONE_TITLE_CLAMP,
          color: 'var(--foreground)',
        }}
      >
        {milestone.title}
      </h3>

      <p
        className="mt-2 text-sm leading-relaxed md:text-base"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {milestone.description}
      </p>
    </article>
  );
}
