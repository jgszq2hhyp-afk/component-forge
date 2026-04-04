// @version 1.1.0
// @category contact
// @name Contact With Info Cards
// @source custom-implementation

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface InfoCard {
  icon?: React.ReactNode;
  title: string;
  description: string;
  value: string;
  href?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

interface ContactWithInfoCardsProps {
  title?: string;
  subtitle?: string;
  infoCards?: InfoCard[];
  onSubmit?: (data: FormData) => void | Promise<void>;
  className?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const defaultPhoneIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const defaultEmailIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const defaultLocationIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const defaultInfoCards: InfoCard[] = [
  {
    icon: defaultPhoneIcon,
    title: "Call Us",
    description: "Mon-Fri 9am-6pm",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
  },
  {
    icon: defaultEmailIcon,
    title: "Email Us",
    description: "We reply within 24h",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: defaultLocationIcon,
    title: "Visit Us",
    description: "Come say hello",
    value: "123 Main St, City",
  },
];

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

export default function ContactWithInfoCards({
  title = "Let's Talk",
  subtitle = "Choose your preferred way to reach us or fill out the form below.",
  infoCards = defaultInfoCards,
  onSubmit,
  className,
}: ContactWithInfoCardsProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
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
      "w-full rounded-lg border px-4 py-2.5 text-sm transition-colors",
      "bg-[var(--background)] text-[var(--foreground)]",
      "placeholder:text-[var(--muted-foreground)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
      errors[field] && touched[field]
        ? "border-[var(--destructive)]"
        : "border-[var(--border)]"
    );

  const errorId = (field: keyof FormData) => `info-${field}-error`;

  return (
    <section
      className={cn("py-16 sm:py-24 bg-[var(--background)]", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            {title}
          </h2>
          <p className="mt-3 text-base text-[var(--muted-foreground)]">
            {subtitle}
          </p>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {infoCards.map((card, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border p-6 text-center transition-shadow hover:shadow-md",
                "bg-[var(--background)] border-[var(--border)]"
              )}
            >
              {card.icon && (
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                  {card.icon}
                </div>
              )}
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {card.description}
              </p>
              {card.href ? (
                <a
                  href={card.href}
                  className="mt-2 inline-block text-sm font-medium text-[var(--primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-sm"
                >
                  {card.value}
                </a>
              ) : (
                <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                  {card.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-12 mx-auto max-w-2xl rounded-2xl border p-6 sm:p-8 bg-[var(--background)] border-[var(--border)]">
          {isSubmitted ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Sent!</h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">We'll get back to you shortly.</p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", message: "" });
                  setErrors({});
                  setTouched({});
                }}
                className="mt-4 text-sm font-medium text-[var(--primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-sm"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="info-name" className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="info-name"
                    name="name"
                    type="text"
                    required
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
                  <label htmlFor="info-email" className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="info-email"
                    name="email"
                    type="email"
                    required
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
              </div>
              <div>
                <label htmlFor="info-phone" className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
                  Phone (optional)
                </label>
                <input
                  id="info-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={inputClasses("phone")}
                />
              </div>
              <div>
                <label htmlFor="info-message" className="block text-sm font-medium mb-1.5 text-[var(--foreground)]">
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="info-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="How can we help?"
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
                  "w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
                  "bg-[var(--primary)] text-[var(--primary-foreground,var(--background))]",
                  "hover:bg-[var(--primary)]/90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
