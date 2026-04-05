// @version 2.0.0
// @category contact
// @name Contact Simple Centered
// @source custom-implementation

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_PADDING_Y_SM = "py-16";
const SECTION_PADDING_Y_LG = "sm:py-24";
const MAX_CONTENT_WIDTH = "max-w-xl";
const INPUT_PADDING_X = "px-4";
const INPUT_PADDING_Y = "py-3";
const TEXTAREA_ROWS = 6;
const SUCCESS_ICON_SIZE = "h-7 w-7";
const SUCCESS_CIRCLE_SIZE = "h-14 w-14";
const SPINNER_SIZE = "h-4 w-4";
const HEADING_CLAMP = "clamp(1.5rem, 4vw, 2.25rem)";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

interface ContactSimpleCenteredProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: FormData) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) errors.message = "Message is required.";
  return errors;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactSimpleCentered({
  title = "Contact Us",
  subtitle = "Have a question or want to work together? Drop us a message.",
  onSubmit,
  className,
}: ContactSimpleCenteredProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(formData);
      setErrors(validationErrors);
      setTouched({ name: true, email: true, message: true });

      if (Object.keys(validationErrors).length > 0) return;

      setIsSubmitting(true);
      try {
        await onSubmit?.(formData);
      } finally {
        setIsSubmitting(false);
      }
      setIsSubmitted(true);
    },
    [formData, onSubmit]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof FormData;
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (touched[key]) {
        const next = { ...formData, [key]: value };
        const fieldError = validate(next)[key];
        setErrors((prev) => {
          const copy = { ...prev };
          if (fieldError) {
            copy[key] = fieldError;
          } else {
            delete copy[key];
          }
          return copy;
        });
      }
    },
    [formData, touched]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const key = e.target.name as keyof FormData;
      setTouched((prev) => ({ ...prev, [key]: true }));
      const fieldError = validate(formData)[key];
      setErrors((prev) => {
        const copy = { ...prev };
        if (fieldError) {
          copy[key] = fieldError;
        } else {
          delete copy[key];
        }
        return copy;
      });
    },
    [formData]
  );

  const inputClasses = (field: keyof FormData) =>
    cn(
      "w-full rounded-lg border text-sm transition-colors",
      INPUT_PADDING_X,
      INPUT_PADDING_Y,
      "bg-[var(--background)] text-[var(--foreground)]",
      "placeholder:text-[var(--muted-foreground)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
      errors[field] && touched[field]
        ? "border-[var(--destructive)]"
        : "border-[var(--border)]"
    );

  const errorId = (field: keyof FormData) => `simple-${field}-error`;

  return (
    <section
      aria-label="Contact form"
      className={cn(SECTION_PADDING_Y_SM, SECTION_PADDING_Y_LG, "bg-[var(--background)]", className)}
    >
      <div className={cn("mx-auto px-4 sm:px-6", MAX_CONTENT_WIDTH)}>
        <header className="text-center">
          <h2
            className="font-bold tracking-tight text-[var(--foreground)]"
            style={{ fontSize: HEADING_CLAMP }}
          >
            {title}
          </h2>
          <p className="mt-3 text-base text-[var(--muted-foreground)]">
            {subtitle}
          </p>
        </header>

        <div className="mt-10">
          {isSubmitted ? (
            <div className="flex flex-col items-center py-12 text-center" role="status">
              <div className={cn("mb-4 flex items-center justify-center rounded-full bg-green-500/10", SUCCESS_CIRCLE_SIZE)}>
                <svg className={cn(SUCCESS_ICON_SIZE, "text-green-600")} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                Thank you!
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Your message has been received. We'll be in touch soon.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", message: "" });
                  setErrors({});
                  setTouched({});
                }}
                className="mt-6 text-sm font-medium text-[var(--primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Contact form fields">
              <div>
                <label htmlFor="simple-name" className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="simple-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  aria-describedby={errors.name && touched.name ? errorId("name") : undefined}
                  aria-invalid={!!(errors.name && touched.name)}
                  className={inputClasses("name")}
                />
                {errors.name && touched.name && (
                  <p id={errorId("name")} className="mt-1 text-xs text-[var(--destructive)]" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="simple-email" className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="simple-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  aria-describedby={errors.email && touched.email ? errorId("email") : undefined}
                  aria-invalid={!!(errors.email && touched.email)}
                  className={inputClasses("email")}
                />
                {errors.email && touched.email && (
                  <p id={errorId("email")} className="mt-1 text-xs text-[var(--destructive)]" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="simple-message" className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="simple-message"
                  name="message"
                  required
                  rows={TEXTAREA_ROWS}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What's on your mind?"
                  aria-describedby={errors.message && touched.message ? errorId("message") : undefined}
                  aria-invalid={!!(errors.message && touched.message)}
                  className={cn(inputClasses("message"), "resize-none")}
                />
                {errors.message && touched.message && (
                  <p id={errorId("message")} className="mt-1 text-xs text-[var(--destructive)]" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full rounded-lg px-5 text-sm font-medium transition-colors motion-reduce:transition-none",
                  INPUT_PADDING_Y,
                  "bg-[var(--primary)] text-[var(--primary-foreground,var(--background))]",
                  "hover:bg-[var(--primary)]/90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className={cn(SPINNER_SIZE, "motion-safe:animate-spin")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
