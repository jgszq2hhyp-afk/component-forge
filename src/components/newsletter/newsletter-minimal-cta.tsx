// @version 1.0.0
// @category newsletter
// @name Newsletter Minimal CTA
// @source custom

"use client";

import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INPUT_PADDING_X = "px-3";
const INPUT_PADDING_Y = "py-2.5";
const SPINNER_SIZE = "h-4 w-4";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface NewsletterMinimalCtaProps {
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewsletterMinimalCta({
  placeholder = "Your email address",
  buttonText = "Subscribe",
  onSubmit,
  className,
}: NewsletterMinimalCtaProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const uid = useId();
  const inputId = `${uid}-email`;
  const errorId = `${uid}-error`;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email.trim()) {
        setStatus("error");
        setErrorMessage("Email is required.");
        return;
      }

      if (!EMAIL_REGEX.test(email)) {
        setStatus("error");
        setErrorMessage("Invalid email address.");
        return;
      }

      setStatus("submitting");
      setErrorMessage("");

      try {
        await onSubmit?.(email);
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
        setErrorMessage("Please try again.");
      }
    },
    [email, onSubmit],
  );

  const isError = status === "error" && errorMessage;

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex items-center gap-2 text-sm text-[var(--foreground)]",
          className,
        )}
      >
        <svg
          className="h-4 w-4 text-green-600 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
        <span className="font-medium">Subscribed!</span>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(
            "ml-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline rounded-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          )}
          style={{
            ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
          }}
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Newsletter signup"
      className={cn("inline-flex flex-col gap-1", className)}
    >
      <div className="flex items-stretch gap-0">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setErrorMessage("");
            }
          }}
          placeholder={placeholder}
          aria-describedby={isError ? errorId : undefined}
          aria-invalid={!!isError}
          className={cn(
            "min-w-0 flex-1 rounded-l-lg border border-r-0 text-sm transition-colors motion-reduce:transition-none",
            INPUT_PADDING_X,
            INPUT_PADDING_Y,
            "bg-[var(--background)] text-[var(--foreground)]",
            "placeholder:text-[var(--muted-foreground)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-offset-0",
            isError
              ? "border-red-500 focus-visible:ring-red-500"
              : "border-[var(--border)] focus-visible:ring-[var(--primary)]",
          )}
          style={{
            ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
          }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "shrink-0 rounded-r-lg border border-l-0 border-[var(--primary)] text-sm font-medium transition-colors motion-reduce:transition-none",
            "px-4",
            INPUT_PADDING_Y,
            "bg-[var(--primary)] text-[var(--primary-foreground,var(--background))]",
            "hover:opacity-90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          style={{
            ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
          }}
        >
          {status === "submitting" ? (
            <svg
              className={cn(SPINNER_SIZE, "motion-safe:animate-spin")}
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Subscribing"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : (
            buttonText
          )}
        </button>
      </div>
      {isError && (
        <p id={errorId} className="text-xs text-red-500" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
