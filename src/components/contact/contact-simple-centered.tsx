// @version 1.0.0
// @category contact
// @name Contact Simple Centered
// @source custom-implementation

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactSimpleCenteredProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
  className?: string;
}

export default function ContactSimpleCentered({
  title = "Contact Us",
  subtitle = "Have a question or want to work together? Drop us a message.",
  onSubmit,
  className,
}: ContactSimpleCenteredProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
        "py-16 sm:py-24 bg-[var(--contact-bg,hsl(0_0%_100%))]",
        className
      )}
    >
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--contact-title,hsl(0_0%_9%))]">
            {title}
          </h2>
          <p className="mt-3 text-base text-[var(--contact-subtitle,hsl(0_0%_40%))]">
            {subtitle}
          </p>
        </div>

        <div className="mt-10">
          {isSubmitted ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]">
                <svg className="h-7 w-7 text-[var(--contact-success-icon,hsl(142_76%_36%))]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--contact-title,hsl(0_0%_9%))]">
                Thank you!
              </h3>
              <p className="mt-2 text-sm text-[var(--contact-subtitle,hsl(0_0%_40%))]">
                Your message has been received. We'll be in touch soon.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", message: "" });
                }}
                className="mt-6 text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="simple-name" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                  Name
                </label>
                <input
                  id="simple-name"
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
                <label htmlFor="simple-email" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                  Email
                </label>
                <input
                  id="simple-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="simple-message" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">
                  Message
                </label>
                <textarea
                  id="simple-message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
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
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
