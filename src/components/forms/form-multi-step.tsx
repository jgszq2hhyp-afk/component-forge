// @version 1.0.0
// @category forms
// @name Form Multi Step
// @source custom

"use client";

import { useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TRANSITION_DURATION = 300;
const MIN_STEPS = 1;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Step {
  title: string;
  description?: string;
  content: ReactNode;
}

interface FormMultiStepProps {
  steps: Step[];
  onSubmit?: () => void;
  submitLabel?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus ring helper
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ringStyle = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
};

// ---------------------------------------------------------------------------
// Step Circle Sub-Component
// ---------------------------------------------------------------------------

function StepCircle({
  index,
  isActive,
  isCompleted,
  title,
}: {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        role="progressbar"
        aria-valuenow={isCompleted ? 100 : isActive ? 50 : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${index + 1}: ${title}`}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold",
          "motion-safe:transition-all motion-safe:duration-300",
          isCompleted &&
            "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]",
          isActive &&
            !isCompleted &&
            "border-[var(--primary)] bg-[var(--background)] text-[var(--primary)]",
          !isActive &&
            !isCompleted &&
            "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
        )}
      >
        {isCompleted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <span>{index + 1}</span>
        )}
      </div>
      <span
        className={cn(
          "text-xs font-medium text-center max-w-[5rem] leading-tight",
          isActive || isCompleted
            ? "text-[var(--foreground)]"
            : "text-[var(--muted-foreground)]"
        )}
      >
        {title}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Connecting Line Sub-Component
// ---------------------------------------------------------------------------

function ConnectingLine({ isCompleted }: { isCompleted: boolean }) {
  return (
    <div
      className={cn(
        "mt-5 h-0.5 flex-1 -translate-y-1/2",
        "motion-safe:transition-colors motion-safe:duration-300",
        isCompleted ? "bg-[var(--primary)]" : "bg-[var(--border)]"
      )}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function FormMultiStep({
  steps,
  onSubmit,
  submitLabel = "Submit",
  className,
}: FormMultiStepProps) {
  const totalSteps = Math.max(steps.length, MIN_STEPS);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  // -----------------------------------------------------------------------
  // Navigation handlers
  // -----------------------------------------------------------------------

  const goToStep = useCallback(
    (targetStep: number) => {
      if (isAnimating) return;
      if (targetStep < 0 || targetStep >= totalSteps) return;

      setDirection(targetStep > currentStep ? "forward" : "backward");
      setIsAnimating(true);

      // Allow animation to complete before switching content
      setTimeout(() => {
        setCurrentStep(targetStep);
        setIsAnimating(false);
      }, TRANSITION_DURATION);
    },
    [currentStep, totalSteps, isAnimating]
  );

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, goToStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const handleSubmit = useCallback(() => {
    onSubmit?.();
  }, [onSubmit]);

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <section
      className={cn(
        "w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
        className
      )}
      aria-label="Multi-step form"
    >
      <div className="mx-auto max-w-2xl">
        {/* ----- Progress Indicator ----- */}
        <nav
          aria-label="Form progress"
          className="mb-10"
        >
          <ol className="flex items-start justify-between gap-0">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "flex items-start",
                  index < steps.length - 1 ? "flex-1" : ""
                )}
                aria-current={index === currentStep ? "step" : undefined}
              >
                <StepCircle
                  index={index}
                  isActive={index === currentStep}
                  isCompleted={index < currentStep}
                  title={step.title}
                />
                {index < steps.length - 1 && (
                  <ConnectingLine isCompleted={index < currentStep} />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* ----- Step Header ----- */}
        <div className="mb-6 text-center">
          <h2
            className={cn(
              "font-bold text-[var(--foreground)]",
              "text-[clamp(1.25rem,2.5vw,1.75rem)]"
            )}
          >
            {steps[currentStep]?.title}
          </h2>
          {steps[currentStep]?.description && (
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {steps[currentStep].description}
            </p>
          )}
        </div>

        {/* ----- Step Content ----- */}
        <div
          className="relative overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            className={cn(
              "motion-safe:transition-all motion-safe:duration-300",
              "motion-reduce:transition-none",
              isAnimating && direction === "forward" &&
                "motion-safe:translate-x-[-100%] motion-safe:opacity-0",
              isAnimating && direction === "backward" &&
                "motion-safe:translate-x-[100%] motion-safe:opacity-0",
              !isAnimating &&
                "translate-x-0 opacity-100"
            )}
          >
            <div
              className={cn(
                "rounded-lg border border-[var(--border)] bg-[var(--card)] p-6",
                "min-h-[12rem]"
              )}
            >
              {steps[currentStep]?.content}
            </div>
          </div>
        </div>

        {/* ----- Step Counter ----- */}
        <p
          className="mt-4 text-center text-xs text-[var(--muted-foreground)]"
          aria-live="polite"
        >
          Step {currentStep + 1} of {totalSteps}
        </p>

        {/* ----- Navigation Buttons ----- */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={isFirstStep || isAnimating}
            aria-label="Go to previous step"
            style={ringStyle}
            className={cn(
              "rounded-md border border-[var(--border)] bg-[var(--background)]",
              "px-6 py-2.5 text-sm font-medium text-[var(--foreground)]",
              "motion-safe:transition-colors motion-safe:duration-200",
              "hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40",
              focusRing
            )}
          >
            Back
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isAnimating}
              aria-label={submitLabel}
              style={ringStyle}
              className={cn(
                "rounded-md bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold",
                "text-[var(--primary-foreground)]",
                "motion-safe:transition-colors motion-safe:duration-200",
                "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
                focusRing
              )}
            >
              {submitLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={isAnimating}
              aria-label="Go to next step"
              style={ringStyle}
              className={cn(
                "rounded-md bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold",
                "text-[var(--primary-foreground)]",
                "motion-safe:transition-colors motion-safe:duration-200",
                "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40",
                focusRing
              )}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
