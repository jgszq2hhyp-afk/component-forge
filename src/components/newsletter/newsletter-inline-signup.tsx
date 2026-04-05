// @version 1.0.0
// @category newsletter
// @name Newsletter Inline Signup
// @source custom

"use client";

import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = "clamp(1.5rem, 3vw, 2.5rem)";
const SECTION_PADDING = "py-[clamp(3rem,8vw,6rem)]";
const INPUT_PADDING_X = "px-4";
const INPUT_PADDING_Y = "py-3";
const SPINNER_SIZE = "h-4 w-4";
const SUCCESS_ICON_SIZE = "h-6 w-6";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface NewsletterInlineSignupProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NewsletterInlineSignup({
  headline = "Stay in the loop",
  description = "Get the latest updates, tips, and insights delivered straight to your inbox. No spam, unsubscribe anytime.",
  buttonText = "Subscribe",
  placeholder = "Enter your email",
  onSubmit,
  className,
}: NewsletterInlineSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const uid = useId();
  const headingId = `${uid}-heading`;
  const inputId = `${uid}-email`;
  const errorId = `${uid}-error`;
  const statusId = `${uid}-status`;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email.trim()) {
        setStatus("error");
        setErrorMessage("Please enter your email address.");
        return;
      }

      if (!EMAIL_REGEX.test(email)) {
        setStatus("error");
        setErrorMessage("Please enter a valid email address.");
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
        setErrorMessage("Something went wrong. Please try again.");
      }
    },
    [email, onSubmit],
  );

  const isError = status === "error" && errorMessage;

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        SECTION_PADDING,
        "bg-[var(--card)] text-[var(--foreground)]",
        className,
      )}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <header>
          <h2
            id={headingId}
            className="font-bold tracking-tight text-[var(--foreground)]"
            style={{ fontSize: HEADING_CLAMP }}
          >
            {headline}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted-foreground)]">
            {description}
          </p>
        </header>

        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <svg
                className={cn(SUCCESS_ICON_SIZE, "text-green-600")}
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
            </div>
            <p className="text-sm font-medium text-[var(--foreground)]">
              You&apos;re subscribed!
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              Check your inbox for a confirmation email.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className={cn(
                "mt-2 text-sm font-medium text-[var(--primary)] hover:underline rounded-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              )}
              style={{
                ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
              }}
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter signup"
            className="mt-8"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-center">
              <div className="flex-1 sm:max-w-sm">
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
                    "w-full rounded-lg border text-sm transition-colors motion-reduce:transition-none",
                    INPUT_PADDING_X,
                    INPUT_PADDING_Y,
                    "bg-[var(--background)] text-[var(--foreground)]",
                    "placeholder:text-[var(--muted-foreground)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                    isError
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-[var(--border)] focus-visible:ring-[var(--primary)]",
                  )}
                  style={{
                    ["--tw-ring-color" as string]:
                      "var(--ring, hsl(215 20% 65%))",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className={cn(
                  "shrink-0 rounded-lg text-sm font-medium transition-colors motion-reduce:transition-none",
                  INPUT_PADDING_X,
                  INPUT_PADDING_Y,
                  "bg-[var(--primary)] text-[var(--primary-foreground,var(--background))]",
                  "hover:opacity-90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
                style={{
                  ["--tw-ring-color" as string]:
                    "var(--ring, hsl(215 20% 65%))",
                }}
              >
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className={cn(SPINNER_SIZE, "motion-safe:animate-spin")}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
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
                    Subscribing...
                  </span>
                ) : (
                  buttonText
                )}
              </button>
            </div>

            <div
              id={statusId}
              aria-live="polite"
              className="mt-2 min-h-[1.25rem]"
            >
              {isError && (
                <p
                  id={errorId}
                  className="text-xs text-red-500"
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
