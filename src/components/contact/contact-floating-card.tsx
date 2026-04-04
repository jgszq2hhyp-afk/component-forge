// @version 2.0.0
// @category contact
// @name Contact Floating Card
// @source custom-implementation

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_CARD_WIDTH = "32rem"; // max-w-lg
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormDataValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFloatingCardProps {
  title?: string;
  subtitle?: string;
  backgroundText?: string;
  onSubmit?: (data: FormDataValues) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus ring
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--contact-ring,hsl(220_90%_56%))] focus-visible:ring-offset-2";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactFloatingCard({
  title = "Drop Us a Line",
  subtitle = "We're here to help and answer any question you might have.",
  backgroundText = "CONTACT",
  onSubmit,
  className,
}: ContactFloatingCardProps) {
  const [formData, setFormData] = useState<FormDataValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback((data: FormDataValues): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!EMAIL_REGEX.test(data.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!data.message.trim()) errs.message = "Message is required";
    return errs;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
      setIsSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);

    if (touched[name]) {
      const fieldErrors = validate(next);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof FormErrors],
    }));
  };

  const inputClasses = (field: keyof FormErrors) =>
    cn(
      "w-full rounded-lg border-0 border-b-2 bg-transparent px-0 py-3 text-sm",
      "transition-colors motion-reduce:transition-none",
      "text-[var(--contact-input-text,hsl(0_0%_9%))]",
      "placeholder:text-[var(--contact-input-placeholder,hsl(0_0%_50%))]",
      errors[field] && touched[field]
        ? "border-[var(--contact-error,hsl(0_84%_60%))]"
        : "border-[var(--contact-input-border,hsl(0_0%_0%/0.12))]",
      "focus:outline-none focus:border-[var(--contact-ring-border,hsl(220_90%_56%))]",
      focusRing,
    );

  return (
    <section
      aria-label={title}
      className={cn(
        "relative py-24 sm:py-32 overflow-hidden",
        "bg-[var(--contact-section-bg,hsl(0_0%_96%))]",
        className,
      )}
    >
      {/* Background Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black tracking-tighter text-[var(--contact-bg-text,hsl(0_0%_0%/0.03))]"
          style={{
            fontSize: "clamp(8rem, 20vw, 16rem)",
          }}
        >
          {backgroundText}
        </span>
      </div>

      {/* Floating Card */}
      <div
        className="relative mx-auto px-4 sm:px-6"
        style={{ maxWidth: MAX_CARD_WIDTH }}
      >
        <article
          className={cn(
            "rounded-2xl p-8 sm:p-10 shadow-2xl",
            "bg-[var(--contact-card-bg,hsl(0_0%_100%))]",
            "ring-1 ring-[var(--contact-card-ring,hsl(0_0%_0%/0.05))]",
          )}
        >
          <div className="text-center">
            <h2
              className="font-bold tracking-tight text-[var(--contact-title,hsl(0_0%_9%))]"
              style={{
                fontSize: "clamp(1.5rem, 2vw + 0.5rem, 1.875rem)",
              }}
            >
              {title}
            </h2>
            <p className="mt-2 text-sm text-[var(--contact-subtitle,hsl(0_0%_40%))]">
              {subtitle}
            </p>
          </div>

          <div className="mt-8">
            {isSubmitted ? (
              <div
                className="flex flex-col items-center py-8 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]">
                  <svg
                    className="h-7 w-7 text-[var(--contact-success-icon,hsl(142_76%_36%))]"
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
                <h3 className="text-lg font-semibold text-[var(--contact-title,hsl(0_0%_9%))]">
                  Sent successfully!
                </h3>
                <p className="mt-2 text-sm text-[var(--contact-subtitle,hsl(0_0%_40%))]">
                  Expect a reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrors({});
                    setTouched({});
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className={cn(
                    "mt-4 text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline",
                    focusRing,
                    "rounded-sm",
                  )}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div>
                  <label htmlFor="float-name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="float-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    className={inputClasses("name")}
                    aria-describedby={
                      errors.name && touched.name
                        ? "float-name-error"
                        : undefined
                    }
                    aria-invalid={
                      errors.name && touched.name ? "true" : undefined
                    }
                  />
                  {errors.name && touched.name && (
                    <p
                      id="float-name-error"
                      className="mt-1 text-xs text-[var(--contact-error,hsl(0_84%_60%))]"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="float-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="float-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your email"
                    className={inputClasses("email")}
                    aria-describedby={
                      errors.email && touched.email
                        ? "float-email-error"
                        : undefined
                    }
                    aria-invalid={
                      errors.email && touched.email ? "true" : undefined
                    }
                  />
                  {errors.email && touched.email && (
                    <p
                      id="float-email-error"
                      className="mt-1 text-xs text-[var(--contact-error,hsl(0_84%_60%))]"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="float-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="float-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your message"
                    className={cn(inputClasses("message"), "resize-none")}
                    aria-describedby={
                      errors.message && touched.message
                        ? "float-message-error"
                        : undefined
                    }
                    aria-invalid={
                      errors.message && touched.message ? "true" : undefined
                    }
                  />
                  {errors.message && touched.message && (
                    <p
                      id="float-message-error"
                      className="mt-1 text-xs text-[var(--contact-error,hsl(0_84%_60%))]"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full rounded-full px-6 py-3 text-sm font-medium",
                    "transition-all motion-reduce:transition-none",
                    "bg-[var(--contact-btn-bg,hsl(0_0%_9%))] text-[var(--contact-btn-text,hsl(0_0%_100%))]",
                    "hover:bg-[var(--contact-btn-hover,hsl(0_0%_20%))] hover:shadow-lg",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    focusRing,
                  )}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
