// @version 1.0.0
// @category process
// @name process-horizontal-steps
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
const CIRCLE_SIZE = 'w-12 h-12';
const CIRCLE_SIZE_MOBILE = 'w-10 h-10';
const ICON_SIZE = 'w-5 h-5';
const LINE_HEIGHT_PX = 2;
const VERTICAL_LINE_WIDTH_PX = 2;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Step {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProcessHorizontalStepsProps {
  headline?: string;
  subheadline?: string;
  steps: Step[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProcessHorizontalSteps({
  headline,
  subheadline,
  steps,
  className,
}: ProcessHorizontalStepsProps) {
  return (
    <section
      aria-label={headline ?? 'Process steps'}
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

      {/* Steps */}
      <ol
        className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0"
        aria-label="Process steps"
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const stepNumber = index + 1;

          return (
            <li
              key={index}
              className="relative flex items-start gap-4 lg:flex-1 lg:flex-col lg:items-center lg:text-center"
            >
              {/* Mobile: vertical line */}
              {!isLast && (
                <div
                  className="absolute left-5 top-10 bottom-0 lg:hidden -translate-x-1/2"
                  style={{
                    width: `${VERTICAL_LINE_WIDTH_PX}px`,
                    backgroundColor: 'var(--border)',
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Desktop: horizontal connector line */}
              {!isLast && (
                <div
                  className="hidden lg:block absolute top-6 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)]"
                  style={{
                    height: `${LINE_HEIGHT_PX}px`,
                    backgroundColor: 'var(--border)',
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Number circle */}
              <div
                className={cn(
                  'relative z-10 flex-shrink-0 flex items-center justify-center rounded-full font-semibold text-sm',
                  CIRCLE_SIZE_MOBILE,
                  `lg:${CIRCLE_SIZE}`,
                  'lg:w-12 lg:h-12',
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
                aria-hidden="true"
              >
                {step.icon ? (
                  <span className={cn(ICON_SIZE)} aria-hidden="true">
                    {step.icon}
                  </span>
                ) : (
                  stepNumber
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2 lg:mt-4 lg:px-3">
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
                  className="mt-1.5 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
