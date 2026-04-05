// @version 2.0.0
// @category contact
// @name Contact Full Page
// @source custom-implementation

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_FORM_WIDTH = "max-w-lg";
const INPUT_PADDING_X = "px-4";
const INPUT_PADDING_Y = "py-3";
const TEXTAREA_ROWS = 6;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;
const SUCCESS_ICON_SIZE = "h-8 w-8";
const SUCCESS_CIRCLE_SIZE = "h-16 w-16";
const HEADING_CLAMP_PANEL = "clamp(1.5rem, 5vw, 3rem)";
const HEADING_CLAMP_SUCCESS = "clamp(1.25rem, 3vw, 1.5rem)";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SocialLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactFullPageProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  socialLinks?: SocialLink[];
  onSubmit?: (data: FormData) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const budgetOptions = [
  { label: "Select a budget range", value: "" },
  { label: "Under $5,000", value: "under-5k" },
  { label: "$5,000 - $10,000", value: "5k-10k" },
  { label: "$10,000 - $25,000", value: "10k-25k" },
  { label: "$25,000+", value: "25k-plus" },
];

function validateForm(data: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = `Name must be at least ${MIN_NAME_LENGTH} characters.`;
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactFullPage({
  title = "Let's Build Something Great",
  subtitle = "Tell us about your project and we'll get back to you within 24 hours.",
  email = "hello@example.com",
  phone = "+1 (555) 000-0000",
  address = "123 Main Street, Suite 100\nSan Francisco, CA 94102",
  hours = "Monday - Friday, 9am - 6pm PST",
  socialLinks = [
    { label: "Twitter", href: "#twitter" },
    { label: "LinkedIn", href: "#linkedin" },
    { label: "GitHub", href: "#github" },
  ],
  onSubmit,
  className,
}: ContactFullPageProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationErrors = validateForm(formData);
      setErrors(validationErrors);
      setTouched({ name: true, email: true, message: true });

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

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
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        const next = { ...prev, [name]: value };
        if (touched[name]) {
          setErrors(validateForm(next));
        }
        return next;
      });
    },
    [touched]
  );

  const handleBlur = useCallback(
    (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors(validateForm(formData));
    },
    [formData]
  );

  const hasError = (field: keyof FieldErrors) =>
    touched[field] && errors[field];

  const inputClasses = (field?: keyof FieldErrors) =>
    cn(
      "w-full rounded-lg border text-sm transition-colors motion-reduce:transition-none",
      INPUT_PADDING_X,
      INPUT_PADDING_Y,
      "bg-[var(--contact-input-bg,var(--background,hsl(0_0%_100%)))]",
      "text-[var(--contact-input-text,var(--foreground,hsl(0_0%_9%)))]",
      "placeholder:text-[var(--contact-input-placeholder,var(--muted-foreground,hsl(0_0%_50%)))]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      field && hasError(field)
        ? "border-[var(--destructive,hsl(0_84%_60%))] focus-visible:ring-[var(--destructive,hsl(0_84%_60%/0.3))]"
        : cn(
            "border-[var(--contact-input-border,var(--border,hsl(0_0%_0%/0.12)))]",
            "focus-visible:ring-[var(--contact-ring,var(--primary,hsl(220_90%_56%/0.3)))]",
            "focus-visible:border-[var(--contact-ring-border,var(--primary,hsl(220_90%_56%)))]"
          )
    );

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--contact-ring,var(--primary,hsl(220_90%_56%/0.3)))]";

  return (
    <section
      aria-label="Full page contact"
      className={cn(
        "min-h-screen bg-[var(--contact-bg,var(--background,hsl(0_0%_100%)))]",
        className
      )}
    >
      <div className="grid min-h-screen lg:grid-cols-5">
        {/* Left Panel - Info */}
        <aside className="lg:col-span-2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[var(--contact-panel-bg,var(--foreground,hsl(0_0%_4%)))] text-[var(--contact-panel-text,var(--background,hsl(0_0%_100%)))]">
          <div>
            <h1
              className="font-bold tracking-tight"
              style={{ fontSize: HEADING_CLAMP_PANEL }}
            >
              {title}
            </h1>
            <p className="mt-4 text-base text-[var(--contact-panel-muted,var(--muted-foreground,hsl(0_0%_100%/0.6)))]">
              {subtitle}
            </p>
          </div>

          <address className="mt-12 space-y-8 not-italic">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,var(--muted-foreground,hsl(0_0%_100%/0.4)))]">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className={cn(
                  "mt-1 block text-sm hover:underline text-[var(--contact-panel-text,var(--background,hsl(0_0%_100%)))]",
                  focusRing
                )}
              >
                {email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,var(--muted-foreground,hsl(0_0%_100%/0.4)))]">
                Phone
              </p>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={cn(
                  "mt-1 block text-sm hover:underline text-[var(--contact-panel-text,var(--background,hsl(0_0%_100%)))]",
                  focusRing
                )}
              >
                {phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,var(--muted-foreground,hsl(0_0%_100%/0.4)))]">
                Address
              </p>
              <p className="mt-1 text-sm whitespace-pre-line text-[var(--contact-panel-text,var(--background,hsl(0_0%_100%)))]">
                {address}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,var(--muted-foreground,hsl(0_0%_100%/0.4)))]">
                Hours
              </p>
              <p className="mt-1 text-sm text-[var(--contact-panel-text,var(--background,hsl(0_0%_100%)))]">
                {hours}
              </p>
            </div>
          </address>

          {/* Social Links */}
          <nav aria-label="Social links" className="mt-12 flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  "text-sm font-medium text-[var(--contact-panel-muted,var(--muted-foreground,hsl(0_0%_100%/0.6)))] hover:text-[var(--contact-panel-text,var(--background,hsl(0_0%_100%)))] transition-colors motion-reduce:transition-none",
                  focusRing
                )}
              >
                {link.icon ?? link.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Right Panel - Form */}
        <div className="lg:col-span-3 flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className={cn("w-full", MAX_FORM_WIDTH)}>
            {isSubmitted ? (
              <div className="flex flex-col items-center py-16 text-center" role="status">
                <div className={cn("mb-6 flex items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]", SUCCESS_CIRCLE_SIZE)}>
                  <svg
                    className={cn(SUCCESS_ICON_SIZE, "text-[var(--contact-success-icon,hsl(142_76%_36%))]")}
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
                <h2
                  className="font-bold text-[var(--contact-title,var(--foreground,hsl(0_0%_9%)))]"
                  style={{ fontSize: HEADING_CLAMP_SUCCESS }}
                >
                  Message received!
                </h2>
                <p className="mt-3 text-sm text-[var(--contact-subtitle,var(--muted-foreground,hsl(0_0%_40%)))]">
                  We'll review your message and get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrors({});
                    setTouched({});
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      budget: "",
                      message: "",
                    });
                  }}
                  className={cn(
                    "mt-6 text-sm font-medium text-[var(--contact-link,var(--primary,hsl(220_90%_56%)))] hover:underline",
                    focusRing
                  )}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-label="Project inquiry form">
                <fieldset className="grid gap-6 sm:grid-cols-2 border-none p-0 m-0">
                  <legend className="sr-only">Your details</legend>
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium mb-1.5 text-[var(--contact-label,var(--muted-foreground,hsl(0_0%_30%)))]"
                    >
                      Full Name
                      <span className="text-[var(--destructive,hsl(0_84%_60%))] ml-0.5" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="full-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      minLength={MIN_NAME_LENGTH}
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      aria-invalid={hasError("name") ? "true" : undefined}
                      aria-describedby={
                        hasError("name") ? "name-error" : undefined
                      }
                      className={inputClasses("name")}
                    />
                    {hasError("name") && (
                      <p
                        id="name-error"
                        role="alert"
                        className="mt-1.5 text-xs text-[var(--destructive,hsl(0_84%_60%))]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="full-email"
                      className="block text-sm font-medium mb-1.5 text-[var(--contact-label,var(--muted-foreground,hsl(0_0%_30%)))]"
                    >
                      Email
                      <span className="text-[var(--destructive,hsl(0_84%_60%))] ml-0.5" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="full-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@company.com"
                      aria-invalid={hasError("email") ? "true" : undefined}
                      aria-describedby={
                        hasError("email") ? "email-error" : undefined
                      }
                      className={inputClasses("email")}
                    />
                    {hasError("email") && (
                      <p
                        id="email-error"
                        role="alert"
                        className="mt-1.5 text-xs text-[var(--destructive,hsl(0_84%_60%))]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </fieldset>
                <fieldset className="grid gap-6 sm:grid-cols-2 border-none p-0 m-0">
                  <legend className="sr-only">Project details</legend>
                  <div>
                    <label
                      htmlFor="full-company"
                      className="block text-sm font-medium mb-1.5 text-[var(--contact-label,var(--muted-foreground,hsl(0_0%_30%)))]"
                    >
                      Company
                    </label>
                    <input
                      id="full-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your company"
                      className={inputClasses()}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="full-budget"
                      className="block text-sm font-medium mb-1.5 text-[var(--contact-label,var(--muted-foreground,hsl(0_0%_30%)))]"
                    >
                      Budget
                    </label>
                    <select
                      id="full-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-label="Select a budget range"
                      className={inputClasses()}
                    >
                      {budgetOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.value === ""}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset>
                <div>
                  <label
                    htmlFor="full-message"
                    className="block text-sm font-medium mb-1.5 text-[var(--contact-label,var(--muted-foreground,hsl(0_0%_30%)))]"
                  >
                    Tell us about your project
                    <span className="text-[var(--destructive,hsl(0_84%_60%))] ml-0.5" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="full-message"
                    name="message"
                    required
                    minLength={MIN_MESSAGE_LENGTH}
                    rows={TEXTAREA_ROWS}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Describe your project, goals, and timeline..."
                    aria-invalid={hasError("message") ? "true" : undefined}
                    aria-describedby={
                      hasError("message") ? "message-error" : undefined
                    }
                    className={cn(inputClasses("message"), "resize-none")}
                  />
                  {hasError("message") && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1.5 text-xs text-[var(--destructive,hsl(0_84%_60%))]"
                    >
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
                    "bg-[var(--contact-btn-bg,var(--foreground,hsl(0_0%_9%)))] text-[var(--contact-btn-text,var(--background,hsl(0_0%_100%)))]",
                    "hover:bg-[var(--contact-btn-hover,hsl(0_0%_20%))]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--contact-ring,var(--primary,hsl(220_90%_56%/0.3)))]"
                  )}
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
