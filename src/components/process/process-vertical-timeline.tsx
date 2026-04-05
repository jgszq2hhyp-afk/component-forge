// @version 1.0.0
// @category process
// @name process-vertical-timeline
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-5xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const SECTION_PADDING_Y = 'py-16 sm:py-20 lg:py-24';
const SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';
const HEADER_MARGIN_BOTTOM = 'mb-14 lg:mb-20';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_FONT_SIZE = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const TITLE_FONT_SIZE = 'clamp(0.9375rem, 0.875rem + 0.25vw, 1.0625rem)';
const DOT_SIZE = 'w-4 h-4';
const ICON_CONTAINER_SIZE = 'w-10 h-10';
const CARD_PADDING = 'p-5 sm:p-6';
const CARD_BORDER_RADIUS = 'rounded-xl';
const LINE_WIDTH_PX = 2;
const ITEM_SPACING = 'space-y-10 lg:space-y-14';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TimelineStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
  label?: string;
}

interface ProcessVerticalTimelineProps {
  headline?: string;
  subheadline?: string;
  steps: TimelineStep[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProcessVerticalTimeline({
  headline,
  subheadline,
  steps,
  className,
}: ProcessVerticalTimelineProps) {
  return (
    <section
      aria-label={headline ?? 'Process timeline'}
      className={cn(
        SECTION_MAX_WIDTH,
        'mx-auto',
        SECTION_PADDING_X,
        SECTION_PADDING_Y,
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Header */}
      {(headline || subheadline) && (
        <header className={cn(HEADER_MAX_WIDTH, 'mx-auto text-center', HEADER_MARGIN_BOTTOM)}>
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
                fontSize: SUBHEADING_FONT_SIZE,
              }}
            >
              {subheadline}
            </p>
          )}
        </header>
      )}

      {/* Timeline */}
      <ol className={cn('relative', ITEM_SPACING)} aria-label="Process timeline steps">
        {/* Center line */}
        <div
          className="absolute left-5 lg:left-1/2 top-0 bottom-0 -translate-x-1/2"
          style={{
            width: `${LINE_WIDTH_PX}px`,
            backgroundColor: 'var(--border)',
          }}
          aria-hidden="true"
        />

        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          const stepNumber = index + 1;

          return (
            <li
              key={index}
              className="relative flex items-start lg:items-center"
            >
              {/* Dot on the line */}
              <div
                className={cn(
                  'absolute left-5 lg:left-1/2 -translate-x-1/2 z-10 rounded-full ring-4 flex-shrink-0',
                  step.icon ? ICON_CONTAINER_SIZE : DOT_SIZE,
                  step.icon && 'flex items-center justify-center',
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-color' as string]: 'var(--background)',
                }}
                aria-hidden="true"
              >
                {step.icon && (
                  <span className="w-5 h-5" aria-hidden="true">
                    {step.icon}
                  </span>
                )}
              </div>

              {/* Label (optional) */}
              {step.label && (
                <span
                  className={cn(
                    'hidden lg:block absolute top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-widest',
                    isLeft
                      ? 'left-[calc(50%+1.5rem)]'
                      : 'right-[calc(50%+1.5rem)] text-right',
                  )}
                  style={{ color: 'var(--muted-foreground)' }}
                  aria-hidden="true"
                >
                  {step.label}
                </span>
              )}

              {/* Card */}
              <article
                className={cn(
                  'ml-14 lg:ml-0 lg:w-[calc(50%-2.5rem)]',
                  CARD_PADDING,
                  CARD_BORDER_RADIUS,
                  'border',
                  isLeft
                    ? 'lg:mr-auto lg:text-right'
                    : 'lg:ml-auto lg:text-left',
                )}
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  color: 'var(--card-foreground)',
                }}
              >
                {step.label && (
                  <span
                    className="lg:hidden inline-block text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {step.label}
                  </span>
                )}
                <h3
                  className="font-semibold tracking-tight"
                  style={{
                    color: 'var(--foreground)',
                    fontSize: TITLE_FONT_SIZE,
                  }}
                >
                  <span className="sr-only">Step {stepNumber}: </span>
                  {step.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {step.description}
                </p>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
