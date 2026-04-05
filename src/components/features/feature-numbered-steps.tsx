// @version 2.0.0
// @category features
// @name feature-numbered-steps
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-5xl';
const SECTION_PADDING = 'px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const HEADER_MARGIN_BOTTOM = 'mb-14 lg:mb-20';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_FONT_SIZE = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const TITLE_FONT_SIZE = 'clamp(1.125rem, 1rem + 0.5vw, 1.5rem)';
const STAT_FONT_SIZE = 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)';
const STEP_NUMBER_FONT_SIZE = 'clamp(1.125rem, 1rem + 0.3vw, 1.5rem)';
const NUMBER_BOX_SIZE = 'w-14 h-14 lg:w-18 lg:h-18';
const NUMBER_BOX_RADIUS = 'rounded-2xl';
const ICON_SIZE = 'w-9 h-9';
const ICON_RADIUS = 'rounded-lg';
const STEP_GAP = 'gap-6 lg:gap-10';
const STEP_PADDING_BOTTOM = 'pb-12 lg:pb-16';
const FADE_ANIMATION_DURATION_S = 0.6;
const FADE_ANIMATION_BASE_DELAY_S = 0.15;
const FADE_ANIMATION_STAGGER_S = 0.12;
const LINE_ANIMATION_DURATION_S = 0.8;
const LINE_ANIMATION_BASE_DELAY_S = 0.3;
const LINE_ANIMATION_STAGGER_S = 0.12;
const TRANSLATE_Y_PX = 20;
const CUBIC_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StepItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  stat?: string;
}

interface FeatureNumberedStepsProps {
  headline?: string;
  subheadline?: string;
  items: StepItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatStepNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

// ---------------------------------------------------------------------------
// Keyframe styles (SSR-safe inline)
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes steps-fade-up {
  from {
    opacity: 0;
    transform: translateY(${TRANSLATE_Y_PX}px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes steps-line-grow {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes steps-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes steps-line-grow {
    from { transform: scaleY(1); }
    to   { transform: scaleY(1); }
  }

  .steps-item {
    animation-duration: 0.01ms !important;
  }

  .steps-line {
    animation-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureNumberedSteps({
  headline,
  subheadline,
  items,
  className,
}: FeatureNumberedStepsProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'How it works'}
        className={cn(
          SECTION_MAX_WIDTH,
          'mx-auto',
          SECTION_PADDING,
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
        <ol className="relative" aria-label="Steps">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={index}
                className={cn(
                  'steps-item relative flex',
                  STEP_GAP,
                  !isLast && STEP_PADDING_BOTTOM,
                )}
                style={{
                  animation: `steps-fade-up ${FADE_ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                  animationDelay: `${FADE_ANIMATION_BASE_DELAY_S + index * FADE_ANIMATION_STAGGER_S}s`,
                }}
              >
                {/* Number column */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Large number */}
                  <div
                    className={cn(
                      'relative flex items-center justify-center',
                      NUMBER_BOX_SIZE,
                      NUMBER_BOX_RADIUS,
                    )}
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-extrabold tracking-tight"
                      style={{ fontSize: STEP_NUMBER_FONT_SIZE }}
                    >
                      {formatStepNumber(index)}
                    </span>
                  </div>

                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      className="steps-line flex-1 w-px mt-3 origin-top"
                      style={{
                        backgroundColor: 'var(--border)',
                        animation: `steps-line-grow ${LINE_ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                        animationDelay: `${LINE_ANIMATION_BASE_DELAY_S + index * LINE_ANIMATION_STAGGER_S}s`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content */}
                <article className="pt-1 pb-2 flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon && (
                      <div
                        className={cn(
                          'inline-flex items-center justify-center flex-shrink-0',
                          ICON_SIZE,
                          ICON_RADIUS,
                        )}
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-foreground)',
                        }}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                    )}

                    <h3
                      className="font-bold tracking-tight"
                      style={{
                        color: 'var(--foreground)',
                        fontSize: TITLE_FONT_SIZE,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {item.stat && (
                    <p
                      className="font-extrabold tracking-tight mb-1"
                      style={{
                        color: 'var(--primary)',
                        fontSize: STAT_FONT_SIZE,
                      }}
                    >
                      {item.stat}
                    </p>
                  )}

                  <p
                    className="text-base leading-relaxed max-w-xl"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {item.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
