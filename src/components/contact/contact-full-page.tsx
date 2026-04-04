// @version 1.0.0
// @category contact
// @name Contact Full Page
// @source custom-implementation

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SocialLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface ContactFullPageProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  socialLinks?: SocialLink[];
  onSubmit?: (data: {
    name: string;
    email: string;
    company: string;
    budget: string;
    message: string;
  }) => void;
  className?: string;
}

const budgetOptions = [
  { label: "Select a budget range", value: "" },
  { label: "Under $5,000", value: "under-5k" },
  { label: "$5,000 - $10,000", value: "5k-10k" },
  { label: "$10,000 - $25,000", value: "10k-25k" },
  { label: "$25,000+", value: "25k-plus" },
];

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = cn(
    "w-full rounded-lg border px-4 py-3 text-sm transition-colors",
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
        "min-h-screen bg-[var(--contact-bg,hsl(0_0%_100%))]",
        className
      )}
    >
      <div className="grid min-h-screen lg:grid-cols-5">
        {/* Left Panel - Info */}
        <div className="lg:col-span-2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-[var(--contact-panel-bg,hsl(0_0%_4%))] text-[var(--contact-panel-text,hsl(0_0%_100%))]">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-base text-[var(--contact-panel-muted,hsl(0_0%_100%/0.6))]">
              {subtitle}
            </p>
          </div>

          <div className="mt-12 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,hsl(0_0%_100%/0.4))]">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-1 block text-sm hover:underline text-[var(--contact-panel-text,hsl(0_0%_100%))]"
              >
                {email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,hsl(0_0%_100%/0.4))]">
                Phone
              </p>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="mt-1 block text-sm hover:underline text-[var(--contact-panel-text,hsl(0_0%_100%))]"
              >
                {phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,hsl(0_0%_100%/0.4))]">
                Address
              </p>
              <p className="mt-1 text-sm whitespace-pre-line text-[var(--contact-panel-text,hsl(0_0%_100%))]">
                {address}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--contact-panel-muted,hsl(0_0%_100%/0.4))]">
                Hours
              </p>
              <p className="mt-1 text-sm text-[var(--contact-panel-text,hsl(0_0%_100%))]">
                {hours}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[var(--contact-panel-muted,hsl(0_0%_100%/0.6))] hover:text-[var(--contact-panel-text,hsl(0_0%_100%))] transition-colors"
              >
                {link.icon ?? link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:col-span-3 flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="w-full max-w-lg">
            {isSubmitted ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]">
                  <svg className="h-8 w-8 text-[var(--contact-success-icon,hsl(142_76%_36%))]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[var(--contact-title,hsl(0_0%_9%))]">
                  Message received!
                </h2>
                <p className="mt-3 text-sm text-[var(--contact-subtitle,hsl(0_0%_40%))]">
                  We'll review your message and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
                  }}
                  className="mt-6 text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="full-email" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                      Email
                    </label>
                    <input
                      id="full-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="full-company" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                      Company
                    </label>
                    <input
                      id="full-company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="full-budget" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                      Budget
                    </label>
                    <select
                      id="full-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="full-message" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                    Tell us about your project
                  </label>
                  <textarea
                    id="full-message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, and timeline..."
                    className={cn(inputClasses, "resize-none")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full rounded-lg px-5 py-3 text-sm font-medium transition-colors",
                    "bg-[var(--contact-btn-bg,hsl(0_0%_9%))] text-[var(--contact-btn-text,hsl(0_0%_100%))]",
                    "hover:bg-[var(--contact-btn-hover,hsl(0_0%_20%))]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
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
