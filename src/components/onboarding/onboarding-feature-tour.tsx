// @version 1.0.0
// @category onboarding
// @name onboarding-feature-tour
// @source custom

'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADLINE_CLAMP = 'clamp(1.125rem, 2vw + 0.5rem, 1.5rem)';
const TITLE_CLAMP = 'clamp(1.25rem, 2.5vw + 0.5rem, 1.875rem)';
const DESCRIPTION_CLAMP = 'clamp(0.875rem, 1vw + 0.5rem, 1.0625rem)';
const SECTION_PADDING = 'clamp(1.5rem, 3vw, 3rem)';
const CARD_PADDING = 'clamp(1.25rem, 2.5vw, 2rem)';
const CONTENT_MAX_WIDTH = '42rem';
const IMAGE_ASPECT_RATIO = '16 / 9';
const TRANSITION_DURATION_MS = 350;
const TRANSITION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const PROGRESS_BAR_HEIGHT = '4px';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const BUTTON_BASE = cn(
  'inline-flex items-center justify-center rounded-lg px-5 py-2.5',
  'text-sm font-medium transition-colors duration-200',
  FOCUS_RING
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Feature {
  title: string;
  description: string;
  image?: string;
}

interface OnboardingFeatureTourProps {
  features: Feature[];
  headline?: string;
  onComplete?: () => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Sub-component: Progress Bar
// ---------------------------------------------------------------------------

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const progressPercent = ((current + 1) / total) * 100;

  return (
    <div
      className="w-full rounded-full overflow-hidden bg-[var(--tour-progress-track,var(--muted,hsl(210_40%_96%)))]"
      style={{ height: PROGRESS_BAR_HEIGHT }}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Feature tour progress: step ${current + 1} of ${total}`}
    >
      <div
        className={cn(
          'h-full rounded-full',
          'bg-[var(--tour-progress-fill,var(--primary,hsl(222_47%_11%)))]',
          'motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out',
          'motion-reduce:transition-none'
        )}
        style={{ width: `${progressPercent}%` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Step Counter
// ---------------------------------------------------------------------------

function StepCounter({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <p
      className={cn(
        'text-sm font-medium',
        'text-[var(--tour-counter,var(--muted-foreground,hsl(215_16%_47%)))]'
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="text-[var(--tour-counter-active,var(--foreground,hsl(222_47%_11%)))]">
        Step {current + 1}
      </span>
      {' '}of {total}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Feature Card
// ---------------------------------------------------------------------------

function FeatureCard({
  feature,
  isAnimating,
}: {
  feature: Feature;
  isAnimating: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        'bg-[var(--tour-card-bg,var(--card,hsl(0_0%_100%)))]',
        'border border-[var(--tour-card-border,var(--border,hsl(214_32%_91%)))]',
        'shadow-sm',
        'motion-safe:transition-all motion-reduce:transition-none'
      )}
      style={{
        padding: CARD_PADDING,
        transitionDuration: `${TRANSITION_DURATION_MS}ms`,
        transitionTimingFunction: TRANSITION_EASING,
        opacity: isAnimating ? 0.2 : 1,
        transform: isAnimating ? 'scale(0.98) translateY(4px)' : 'scale(1) translateY(0)',
      }}
    >
      {/* Feature image */}
      {feature.image && (
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-lg mb-5',
            'bg-[var(--tour-image-bg,var(--muted,hsl(210_40%_96%)))]'
          )}
          style={{ aspectRatio: IMAGE_ASPECT_RATIO }}
        >
          <Image
            src={feature.image}
            alt={`Illustration for ${feature.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 42rem"
          />
        </div>
      )}

      {/* Title */}
      <h3
        className={cn(
          'font-bold leading-tight',
          'text-[var(--tour-title,var(--foreground,hsl(222_47%_11%)))]'
        )}
        style={{ fontSize: TITLE_CLAMP }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          'mt-2 leading-relaxed',
          'text-[var(--tour-desc,var(--muted-foreground,hsl(215_16%_47%)))]'
        )}
        style={{ fontSize: DESCRIPTION_CLAMP }}
      >
        {feature.description}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Navigation
// ---------------------------------------------------------------------------

function TourNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between gap-3 mt-6">
      {/* Previous */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        className={cn(
          BUTTON_BASE,
          'border border-[var(--tour-btn-border,var(--border,hsl(214_32%_91%)))]',
          'bg-[var(--tour-btn-secondary-bg,var(--background,hsl(0_0%_100%)))]',
          'text-[var(--tour-btn-secondary-text,var(--foreground,hsl(222_47%_11%)))]',
          'hover:bg-[var(--tour-btn-secondary-hover,var(--muted,hsl(210_40%_96%)))]',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        )}
        style={{
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
        aria-label="Go to previous feature"
      >
        {/* Left arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1.5"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Next / Finish */}
      <button
        type="button"
        onClick={onNext}
        className={cn(
          BUTTON_BASE,
          'bg-[var(--tour-btn-primary-bg,var(--primary,hsl(222_47%_11%)))]',
          'text-[var(--tour-btn-primary-text,var(--primary-foreground,hsl(210_40%_98%)))]',
          'hover:opacity-90'
        )}
        style={{
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
        aria-label={isLast ? 'Finish feature tour' : 'Go to next feature'}
      >
        {isLast ? 'Finish' : 'Next'}
        {/* Right arrow icon */}
        {!isLast && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1.5"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function OnboardingFeatureTour({
  features,
  headline,
  onComplete,
  className,
}: OnboardingFeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSteps = features.length;
  const feature = features[currentStep];

  // Animation lock
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), TRANSITION_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    if (currentStep === totalSteps - 1) {
      onComplete?.();
      return;
    }
    setIsAnimating(true);
    setCurrentStep((prev) => prev + 1);
  }, [currentStep, totalSteps, onComplete, isAnimating]);

  const handlePrevious = useCallback(() => {
    if (isAnimating || currentStep === 0) return;
    setIsAnimating(true);
    setCurrentStep((prev) => prev - 1);
  }, [currentStep, isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  return (
    <section
      className={cn(
        'mx-auto flex flex-col',
        'bg-[var(--tour-bg,var(--background,hsl(0_0%_100%)))]',
        'rounded-2xl',
        className
      )}
      style={{ padding: SECTION_PADDING, maxWidth: CONTENT_MAX_WIDTH }}
      role="region"
      aria-label={headline ?? 'Feature tour'}
      aria-roledescription="carousel"
    >
      {/* Header row: headline + step counter */}
      <div className="flex items-center justify-between mb-5">
        {headline && (
          <h2
            className={cn(
              'font-bold',
              'text-[var(--tour-headline,var(--foreground,hsl(222_47%_11%)))]'
            )}
            style={{ fontSize: HEADLINE_CLAMP }}
          >
            {headline}
          </h2>
        )}
        <StepCounter current={currentStep} total={totalSteps} />
      </div>

      {/* Progress bar */}
      <ProgressBar current={currentStep} total={totalSteps} />

      {/* Feature card */}
      <div className="mt-5">
        {feature && (
          <FeatureCard feature={feature} isAnimating={isAnimating} />
        )}
      </div>

      {/* Navigation */}
      <TourNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </section>
  );
}
