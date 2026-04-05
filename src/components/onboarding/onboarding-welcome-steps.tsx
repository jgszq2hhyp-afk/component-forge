// @version 1.0.0
// @category onboarding
// @name onboarding-welcome-steps
// @source custom

'use client';

import { type ReactNode, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TITLE_CLAMP = 'clamp(1.5rem, 3vw + 0.75rem, 2.25rem)';
const DESCRIPTION_CLAMP = 'clamp(0.9375rem, 1vw + 0.5rem, 1.125rem)';
const SECTION_PADDING = 'clamp(2rem, 4vw, 4rem)';
const CONTENT_MAX_WIDTH = '32rem';
const ILLUSTRATION_MAX_HEIGHT = '16rem';
const TRANSITION_DURATION_MS = 400;
const TRANSITION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const BUTTON_BASE = cn(
  'inline-flex items-center justify-center rounded-lg px-6 py-2.5',
  'text-sm font-medium transition-colors duration-200',
  FOCUS_RING
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Step {
  title: string;
  description: string;
  illustration?: ReactNode;
}

interface OnboardingWelcomeStepsProps {
  steps: Step[];
  onComplete?: () => void;
  onSkip?: () => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Sub-component: Progress Dots
// ---------------------------------------------------------------------------

function ProgressDots({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <nav aria-label="Onboarding progress" className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onDotClick(i)}
          aria-label={`Go to step ${i + 1}`}
          aria-current={i === current ? 'step' : undefined}
          className={cn(
            'rounded-full transition-all duration-300',
            'motion-reduce:transition-none',
            FOCUS_RING,
            i === current
              ? 'w-8 h-2.5 bg-[var(--onboarding-dot-active,var(--primary,hsl(222_47%_11%)))]'
              : 'w-2.5 h-2.5 bg-[var(--onboarding-dot,var(--muted,hsl(210_40%_96%)))] hover:bg-[var(--onboarding-dot-hover,var(--muted-foreground,hsl(215_16%_47%)))]'
          )}
          style={{
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
          }}
        />
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Navigation Buttons
// ---------------------------------------------------------------------------

function NavigationButtons({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSkip,
}: {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
}) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between gap-3 mt-8">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        className={cn(
          BUTTON_BASE,
          'border border-[var(--onboarding-btn-border,var(--border,hsl(214_32%_91%)))]',
          'bg-[var(--onboarding-btn-secondary-bg,var(--background,hsl(0_0%_100%)))]',
          'text-[var(--onboarding-btn-secondary-text,var(--foreground,hsl(222_47%_11%)))]',
          'hover:bg-[var(--onboarding-btn-secondary-hover,var(--muted,hsl(210_40%_96%)))]',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        )}
        style={{
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
        aria-label="Go to previous step"
      >
        Back
      </button>

      {/* Skip (optional) */}
      {onSkip && !isLast && (
        <button
          type="button"
          onClick={onSkip}
          className={cn(
            BUTTON_BASE,
            'bg-transparent',
            'text-[var(--onboarding-skip-text,var(--muted-foreground,hsl(215_16%_47%)))]',
            'hover:text-[var(--onboarding-skip-hover,var(--foreground,hsl(222_47%_11%)))]',
            'underline-offset-4 hover:underline'
          )}
          style={{
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
          }}
        >
          Skip
        </button>
      )}

      {/* Next / Complete */}
      <button
        type="button"
        onClick={onNext}
        className={cn(
          BUTTON_BASE,
          'bg-[var(--onboarding-btn-primary-bg,var(--primary,hsl(222_47%_11%)))]',
          'text-[var(--onboarding-btn-primary-text,var(--primary-foreground,hsl(210_40%_98%)))]',
          'hover:opacity-90'
        )}
        style={{
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
        aria-label={isLast ? 'Complete onboarding' : 'Go to next step'}
      >
        {isLast ? 'Get Started' : 'Next'}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function OnboardingWelcomeSteps({
  steps,
  onComplete,
  onSkip,
  className,
}: OnboardingWelcomeStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep];
  const totalSteps = steps.length;

  // Handle animation lock
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), TRANSITION_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const goToStep = useCallback(
    (index: number) => {
      if (isAnimating || index === currentStep) return;
      setDirection(index > currentStep ? 'right' : 'left');
      setIsAnimating(true);
      setCurrentStep(index);
    },
    [currentStep, isAnimating]
  );

  const handleNext = useCallback(() => {
    if (currentStep === totalSteps - 1) {
      onComplete?.();
      return;
    }
    goToStep(currentStep + 1);
  }, [currentStep, totalSteps, onComplete, goToStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const handleSkip = useCallback(() => {
    onSkip?.();
  }, [onSkip]);

  // Slide animation styles
  const slideTransform = direction === 'right'
    ? 'translateX(0)'
    : 'translateX(0)';

  return (
    <section
      className={cn(
        'mx-auto flex flex-col items-center',
        'bg-[var(--onboarding-bg,var(--background,hsl(0_0%_100%)))]',
        'rounded-2xl',
        className
      )}
      style={{ padding: SECTION_PADDING, maxWidth: '40rem' }}
      role="region"
      aria-label="Onboarding wizard"
      aria-roledescription="carousel"
    >
      {/* Step counter (sr-only) */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Step {currentStep + 1} of {totalSteps}
      </p>

      {/* Content area with slide transition */}
      <div
        ref={contentRef}
        className={cn(
          'w-full text-center',
          'motion-safe:transition-all motion-reduce:transition-none'
        )}
        style={{
          maxWidth: CONTENT_MAX_WIDTH,
          transitionDuration: `${TRANSITION_DURATION_MS}ms`,
          transitionTimingFunction: TRANSITION_EASING,
          opacity: isAnimating ? 0.3 : 1,
          transform: isAnimating
            ? `translateX(${direction === 'right' ? '-12px' : '12px'})`
            : 'translateX(0)',
        }}
        aria-live="polite"
      >
        {/* Illustration */}
        {step?.illustration && (
          <div
            className="mx-auto mb-6 flex items-center justify-center"
            style={{ maxHeight: ILLUSTRATION_MAX_HEIGHT }}
            aria-hidden="true"
          >
            {step.illustration}
          </div>
        )}

        {/* Title */}
        <h2
          className={cn(
            'font-bold leading-tight',
            'text-[var(--onboarding-title,var(--foreground,hsl(222_47%_11%)))]'
          )}
          style={{ fontSize: TITLE_CLAMP }}
        >
          {step?.title}
        </h2>

        {/* Description */}
        <p
          className={cn(
            'mt-3 leading-relaxed',
            'text-[var(--onboarding-desc,var(--muted-foreground,hsl(215_16%_47%)))]'
          )}
          style={{ fontSize: DESCRIPTION_CLAMP }}
        >
          {step?.description}
        </p>
      </div>

      {/* Navigation buttons */}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
        onNext={handleNext}
        onSkip={onSkip ? handleSkip : undefined}
      />

      {/* Progress dots */}
      <ProgressDots total={totalSteps} current={currentStep} onDotClick={goToStep} />
    </section>
  );
}
