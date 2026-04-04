// @version 1.0.0
// @category contact
// @name Contact Split Form
// @source custom-implementation

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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
  onSubmit?: (data: FormData) => void;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSplitForm({
  title = "Get in Touch",
  subtitle = "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  contactInfo = [
    { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
    { label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
    { label: "Address", value: "123 Main St, City, State 12345" },
  ],
  mapEmbed,
  onSubmit,
  className,
}: ContactSplitFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit?.(formData);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = cn(
    "w-full rounded-lg border px-4 py-2.5 text-sm transition-colors",
    "bg-[var(--contact-input-bg,hsl(0_0%_100%))]",
    "border-[var(--contact-input-border,hsl(0_0%_0%/0.12))]",
    "text-[var(--contact-input-text,hsl(0_0%_9%))]",
    "placeholder:text-[var(--contact-input-placeholder,hsl(0_0%_50%))]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--contact-ring,hsl(220_90%_56%/0.3))]",
    "focus:border-[var(--contact-ring-border,hsl(220_90%_56%))]"
  );

  return (
    <section
      className={cn(
        "py-16 sm:py-24 bg-[var(--contact-bg,hsl(0_0%_100%))]",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--contact-title,hsl(0_0%_9%))]">
              {title}
            </h2>
            <p className="mt-4 text-base text-[var(--contact-subtitle,hsl(0_0%_40%))]">
              {subtitle}
            </p>

            <div className="mt-8 space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-4">
                  {info.icon && (
                    <div className="mt-0.5 flex-shrink-0 text-[var(--contact-icon,hsl(220_90%_56%))]">
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
                        className="text-sm font-medium text-[var(--contact-value,hsl(0_0%_9%))] hover:text-[var(--contact-value-hover,hsl(220_90%_56%))] transition-colors"
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
            </div>

            {mapEmbed && (
              <div className="mt-8 overflow-hidden rounded-xl border border-[var(--contact-map-border,hsl(0_0%_0%/0.08))]">
                <iframe
                  src={mapEmbed}
                  className="h-48 w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Location map"
                />
              </div>
            )}
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border p-6 sm:p-8 bg-[var(--contact-form-bg,hsl(0_0%_98%))] border-[var(--contact-form-border,hsl(0_0%_0%/0.08))]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]">
                  <svg className="h-6 w-6 text-[var(--contact-success-icon,hsl(142_76%_36%))]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="split-name" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                      Name
                    </label>
                    <input
                      id="split-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="split-email" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                      Email
                    </label>
                    <input
                      id="split-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="split-subject" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                    Subject
                  </label>
                  <input
                    id="split-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="split-message" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                    Message
                  </label>
                  <textarea
                    id="split-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project..."
                    className={cn(inputClasses, "resize-none")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
                    "bg-[var(--contact-btn-bg,hsl(0_0%_9%))] text-[var(--contact-btn-text,hsl(0_0%_100%))]",
                    "hover:bg-[var(--contact-btn-hover,hsl(0_0%_20%))]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
