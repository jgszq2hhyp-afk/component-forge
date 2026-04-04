// @version 2.0.0
// @category contact
// @name Contact Split Form
// @source custom-implementation

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_WIDTH = "80rem"; // max-w-7xl
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactInfo {
  icon?: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

interface ContactSplitFormProps {
  title?: string;
  subtitle?: string;
  contactInfo?: ContactInfo[];
  mapEmbed?: string;
  onSubmit?: (data: FormDataValues) => void | Promise<void>;
  className?: string;
}

interface FormDataValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// ---------------------------------------------------------------------------
// Focus ring
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--contact-ring,hsl(220_90%_56%))] focus-visible:ring-offset-2";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactSplitForm({
  title = "Get in Touch",
  subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  contactInfo = [
    {
      label: "Email",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    {
      label: "Phone",
      value: "+1 (555) 000-0000",
      href: "tel:+15550000000",
    },
    { label: "Address", value: "123 Main St, City, State 12345" },
  ],
  mapEmbed,
  onSubmit,
  className,
}: ContactSplitFormProps) {
  const [formData, setFormData] = useState<FormDataValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback(
    (data: FormDataValues): FormErrors => {
      const errs: FormErrors = {};
      if (!data.name.trim()) errs.name = "Name is required";
      if (!data.email.trim()) {
        errs.email = "Email is required";
      } else if (!EMAIL_REGEX.test(data.email)) {
        errs.email = "Please enter a valid email address";
      }
      if (!data.subject.trim()) errs.subject = "Subject is required";
      if (!data.message.trim()) errs.message = "Message is required";
      return errs;
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

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
      "w-full rounded-lg border px-4 py-2.5 text-sm",
      "transition-colors motion-reduce:transition-none",
      "bg-[var(--contact-input-bg,hsl(0_0%_100%))]",
      "text-[var(--contact-input-text,hsl(0_0%_9%))]",
      "placeholder:text-[var(--contact-input-placeholder,hsl(0_0%_50%))]",
      errors[field] && touched[field]
        ? "border-[var(--contact-error,hsl(0_84%_60%))]"
        : "border-[var(--contact-input-border,hsl(0_0%_0%/0.12))]",
      focusRing,
    );

  return (
    <section
      aria-label={title}
      className={cn(
        "py-16 sm:py-24 bg-[var(--contact-bg,hsl(0_0%_100%))]",
        className,
      )}
    >
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: MAX_WIDTH }}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Info */}
          <div className="flex flex-col justify-center">
            <h2
              className="font-bold tracking-tight text-[var(--contact-title,hsl(0_0%_9%))]"
              style={{
                fontSize: "clamp(1.875rem, 2.5vw + 0.5rem, 2.25rem)",
              }}
            >
              {title}
            </h2>
            <p className="mt-4 text-base text-[var(--contact-subtitle,hsl(0_0%_40%))]">
              {subtitle}
            </p>

            <address className="mt-8 space-y-6 not-italic">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-4">
                  {info.icon && (
                    <div
                      className="mt-0.5 flex-shrink-0 text-[var(--contact-icon,hsl(220_90%_56%))]"
                      aria-hidden="true"
                    >
                      {info.icon}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-[var(--contact-label,hsl(0_0%_50%))]">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className={cn(
                          "text-sm font-medium text-[var(--contact-value,hsl(0_0%_9%))]",
                          "hover:text-[var(--contact-value-hover,hsl(220_90%_56%))]",
                          "transition-colors motion-reduce:transition-none",
                          focusRing,
                          "rounded-sm",
                        )}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-[var(--contact-value,hsl(0_0%_9%))]">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </address>

            {mapEmbed && (
              <figure className="mt-8 overflow-hidden rounded-xl border border-[var(--contact-map-border,hsl(0_0%_0%/0.08))]">
                <iframe
                  src={mapEmbed}
                  className="h-48 w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Location map"
                />
              </figure>
            )}
          </div>

          {/* Right: Form */}
          <article className="rounded-2xl border p-6 sm:p-8 bg-[var(--contact-form-bg,hsl(0_0%_98%))] border-[var(--contact-form-border,hsl(0_0%_0%/0.08))]">
            {isSubmitted ? (
              <div
                className="flex flex-col items-center justify-center py-12 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]">
                  <svg
                    className="h-6 w-6 text-[var(--contact-success-icon,hsl(142_76%_36%))]"
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
                  Message sent!
                </h3>
                <p className="mt-2 text-sm text-[var(--contact-subtitle,hsl(0_0%_40%))]">
                  We'll get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrors({});
                    setTouched({});
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className={cn(
                    "mt-4 text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline",
                    focusRing,
                    "rounded-sm",
                  )}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="split-name"
                      className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]"
                    >
                      Name
                    </label>
                    <input
                      id="split-name"
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
                          ? "split-name-error"
                          : undefined
                      }
                      aria-invalid={
                        errors.name && touched.name ? "true" : undefined
                      }
                    />
                    {errors.name && touched.name && (
                      <p
                        id="split-name-error"
                        className="mt-1 text-xs text-[var(--contact-error,hsl(0_84%_60%))]"
                        role="alert"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="split-email"
                      className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]"
                    >
                      Email
                    </label>
                    <input
                      id="split-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      className={inputClasses("email")}
                      aria-describedby={
                        errors.email && touched.email
                          ? "split-email-error"
                          : undefined
                      }
                      aria-invalid={
                        errors.email && touched.email ? "true" : undefined
                      }
                    />
                    {errors.email && touched.email && (
                      <p
                        id="split-email-error"
                        className="mt-1 text-xs text-[var(--contact-error,hsl(0_84%_60%))]"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="split-subject"
                    className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]"
                  >
                    Subject
                  </label>
                  <input
                    id="split-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="How can we help?"
                    className={inputClasses("subject")}
                    aria-describedby={
                      errors.subject && touched.subject
                        ? "split-subject-error"
                        : undefined
                    }
                    aria-invalid={
                      errors.subject && touched.subject ? "true" : undefined
                    }
                  />
                  {errors.subject && touched.subject && (
                    <p
                      id="split-subject-error"
                      className="mt-1 text-xs text-[var(--contact-error,hsl(0_84%_60%))]"
                      role="alert"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="split-message"
                    className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]"
                  >
                    Message
                  </label>
                  <textarea
                    id="split-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us more about your project..."
                    className={cn(inputClasses("message"), "resize-none")}
                    aria-describedby={
                      errors.message && touched.message
                        ? "split-message-error"
                        : undefined
                    }
                    aria-invalid={
                      errors.message && touched.message ? "true" : undefined
                    }
                  />
                  {errors.message && touched.message && (
                    <p
                      id="split-message-error"
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
                    "w-full rounded-lg px-5 py-2.5 text-sm font-medium",
                    "transition-colors motion-reduce:transition-none",
                    "bg-[var(--contact-btn-bg,hsl(0_0%_9%))] text-[var(--contact-btn-text,hsl(0_0%_100%))]",
                    "hover:bg-[var(--contact-btn-hover,hsl(0_0%_20%))]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    focusRing,
                  )}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
