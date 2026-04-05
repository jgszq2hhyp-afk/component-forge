// @version 1.0.0
// @category forms
// @name Form Survey Section
// @source custom

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_RATING = 5;
const MAX_TEXT_LENGTH = 500;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SurveyQuestion {
  id: string;
  type: "rating" | "choice" | "text";
  question: string;
  options?: string[];
}

interface FormSurveySectionProps {
  questions: SurveyQuestion[];
  headline?: string;
  description?: string;
  submitLabel?: string;
  onSubmit?: (answers: Record<string, string | number>) => void;
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
// Star Rating
// ---------------------------------------------------------------------------

function StarRating({
  questionId,
  value,
  onChange,
}: {
  questionId: string;
  value: number;
  onChange: (val: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      className="flex gap-1"
    >
      {Array.from({ length: MAX_RATING }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hovered || value);

        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" && starValue < MAX_RATING) {
                onChange(starValue + 1);
              } else if (e.key === "ArrowLeft" && starValue > 1) {
                onChange(starValue - 1);
              }
            }}
            style={ringStyle}
            className={cn(
              "rounded-sm p-0.5",
              "motion-safe:transition-transform motion-safe:duration-150",
              "hover:scale-110",
              focusRing
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={isFilled ? "var(--primary)" : "none"}
              stroke={isFilled ? "var(--primary)" : "var(--border)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="motion-safe:transition-colors motion-safe:duration-150"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
      <span className="ml-2 self-center text-sm text-[var(--muted-foreground)]">
        {value > 0 ? `${value}/${MAX_RATING}` : ""}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Multiple Choice
// ---------------------------------------------------------------------------

function MultipleChoice({
  questionId,
  options,
  value,
  onChange,
}: {
  questionId: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Choose an option</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value === option;
          const inputId = `${questionId}-${option}`;

          return (
            <label
              key={option}
              htmlFor={inputId}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm",
                "motion-safe:transition-all motion-safe:duration-200",
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--primary)]"
              )}
            >
              <input
                id={inputId}
                type="radio"
                name={questionId}
                value={option}
                checked={isSelected}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// Text Input
// ---------------------------------------------------------------------------

function TextInput({
  questionId,
  value,
  onChange,
}: {
  questionId: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <textarea
        id={`${questionId}-text`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={MAX_TEXT_LENGTH}
        rows={3}
        placeholder="Type your answer..."
        aria-label="Your answer"
        style={ringStyle}
        className={cn(
          "w-full resize-none rounded-md border border-[var(--border)]",
          "bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)]",
          "placeholder:text-[var(--muted-foreground)]",
          "motion-safe:transition-colors motion-safe:duration-200",
          "hover:border-[var(--primary)]",
          focusRing
        )}
      />
      <span className="mt-1 block text-right text-xs text-[var(--muted-foreground)]">
        {value.length}/{MAX_TEXT_LENGTH}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Question Card
// ---------------------------------------------------------------------------

function QuestionCard({
  question,
  index,
  total,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  index: number;
  total: number;
  value: string | number;
  onChange: (val: string | number) => void;
}) {
  return (
    <article
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--card)] p-6",
        "motion-safe:transition-shadow motion-safe:duration-200",
        "hover:shadow-md"
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-[clamp(0.95rem,1.5vw,1.125rem)] font-semibold text-[var(--foreground)]">
          {question.question}
        </h3>
        <span
          className="shrink-0 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted-foreground)]"
          aria-label={`Question ${index + 1} of ${total}`}
        >
          {index + 1}/{total}
        </span>
      </div>

      {question.type === "rating" && (
        <StarRating
          questionId={question.id}
          value={typeof value === "number" ? value : 0}
          onChange={onChange}
        />
      )}

      {question.type === "choice" && question.options && (
        <MultipleChoice
          questionId={question.id}
          options={question.options}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      )}

      {question.type === "text" && (
        <TextInput
          questionId={question.id}
          value={typeof value === "string" ? value : ""}
          onChange={onChange}
        />
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function FormSurveySection({
  questions,
  headline = "Quick Survey",
  description,
  submitLabel = "Submit Answers",
  onSubmit,
  className,
}: FormSurveySectionProps) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // -----------------------------------------------------------------------
  // Progress calculation
  // -----------------------------------------------------------------------

  const answeredCount = questions.filter((q) => {
    const val = answers[q.id];
    if (val === undefined || val === "") return false;
    if (typeof val === "number" && val === 0) return false;
    return true;
  }).length;

  const progressPercent =
    questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------

  const handleChange = useCallback((questionId: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(answers);
      setIsSubmitted(true);
    },
    [answers, onSubmit]
  );

  // -----------------------------------------------------------------------
  // Success state
  // -----------------------------------------------------------------------

  if (isSubmitted) {
    return (
      <section
        className={cn(
          "w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
          className
        )}
        aria-label="Survey submitted"
      >
        <div className="mx-auto max-w-2xl text-center">
          <div
            className={cn(
              "mx-auto mb-4 flex h-16 w-16 items-center justify-center",
              "rounded-full bg-[var(--primary)]"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary-foreground)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[var(--foreground)]">
            Thank you for your feedback!
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Your answers have been recorded.
          </p>
        </div>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <section
      className={cn(
        "w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
        className
      )}
      aria-label="Survey section"
    >
      <div className="mx-auto max-w-2xl">
        {/* ----- Header ----- */}
        <header className="mb-8 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--foreground)]">
            {headline}
          </h2>
          {description && (
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {description}
            </p>
          )}
        </header>

        {/* ----- Progress Bar ----- */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>
              {answeredCount} of {questions.length} answered
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Survey progress"
          >
            <div
              className={cn(
                "h-full rounded-full bg-[var(--primary)]",
                "motion-safe:transition-all motion-safe:duration-500"
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ----- Questions ----- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={i}
              total={questions.length}
              value={answers[q.id] ?? (q.type === "rating" ? 0 : "")}
              onChange={(val) => handleChange(q.id, val)}
            />
          ))}

          {/* ----- Submit ----- */}
          <button
            type="submit"
            style={ringStyle}
            className={cn(
              "w-full rounded-md bg-[var(--primary)] py-3 text-sm font-semibold",
              "text-[var(--primary-foreground)]",
              "motion-safe:transition-opacity motion-safe:duration-200",
              "hover:opacity-90",
              focusRing
            )}
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
