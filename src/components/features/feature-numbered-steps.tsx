// @version 1.0.0
// @category features
// @name feature-numbered-steps
// @source custom

import { cn } from '@/lib/utils';

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
    transform: translateY(20px);
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
          'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--foreground)',
                  fontSize: 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)',
                }}
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

        {/* Steps */}
        <div className="relative">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <div
                key={index}
                className="relative flex gap-6 lg:gap-10 pb-12 lg:pb-16 last:pb-0"
                style={{
                  animation: 'steps-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: `${0.15 + index * 0.12}s`,
                }}
              >
                {/* Number column */}
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Large number */}
                  <div
                    className="relative flex items-center justify-center w-14 h-14 lg:w-18 lg:h-18 rounded-2xl"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    <span className="text-xl lg:text-2xl font-extrabold tracking-tight">
                      {formatStepNumber(index)}
                    </span>
                  </div>

                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      className="flex-1 w-px mt-3 origin-top"
                      style={{
                        backgroundColor: 'var(--border)',
                        animation: 'steps-line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                        animationDelay: `${0.3 + index * 0.12}s`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1 pb-2 flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon && (
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                        style={{
                          backgroundColor: 'var(--accent)',
                          color: 'var(--accent-foreground)',
                        }}
                      >
                        {item.icon}
                      </div>
                    )}

                    <h3
                      className="text-xl lg:text-2xl font-bold tracking-tight"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {item.stat && (
                    <p
                      className="text-2xl font-extrabold tracking-tight mb-1"
                      style={{ color: 'var(--primary)' }}
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
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
