// @version 1.0.0
// @category contact
// @name Contact Floating Card
// @source custom-implementation

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactFloatingCardProps {
  title?: string;
  subtitle?: string;
  backgroundText?: string;
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
  className?: string;
}

export default function ContactFloatingCard({
  title = "Drop Us a Line",
  subtitle = "We're here to help and answer any question you might have.",
  backgroundText = "CONTACT",
  onSubmit,
  className,
}: ContactFloatingCardProps) {
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
    "w-full rounded-lg border-0 border-b-2 bg-transparent px-0 py-3 text-sm transition-colors",
    "border-[var(--contact-input-border,hsl(0_0%_0%/0.12))]",
    "text-[var(--contact-input-text,hsl(0_0%_9%))]",
    "placeholder:text-[var(--contact-input-placeholder,hsl(0_0%_50%))]",
    "focus:outline-none focus:border-[var(--contact-ring-border,hsl(220_90%_56%))]"
  );

  return (
    <section
      className={cn(
        "relative py-24 sm:py-32 overflow-hidden",
        "bg-[var(--contact-section-bg,hsl(0_0%_96%))]",
        className
      )}
    >
      {/* Background Text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black tracking-tighter text-[var(--contact-bg-text,hsl(0_0%_0%/0.03))]">
          {backgroundText}
        </span>
      </div>

      {/* Floating Card */}
      <div className="relative mx-auto max-w-lg px-4 sm:px-6">
        <div
          className={cn(
            "rounded-2xl p-8 sm:p-10 shadow-2xl",
            "bg-[var(--contact-card-bg,hsl(0_0%_100%))]",
            "ring-1 ring-[var(--contact-card-ring,hsl(0_0%_0%/0.05))]"
          )}
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--contact-title,hsl(0_0%_9%))]">
              {title}
            </h2>
            <p className="mt-2 text-sm text-[var(--contact-subtitle,hsl(0_0%_40%))]">
              {subtitle}
            </p>
          </div>

          <div className="mt-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]">
                  <svg className="h-7 w-7 text-[var(--contact-success-icon,hsl(142_76%_36%))]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="mt-4 text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="float-name" className="sr-only">Name</label>
                  <input
                    id="float-name"
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
                  <label htmlFor="float-email" className="sr-only">Email</label>
                  <input
                    id="float-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="float-message" className="sr-only">Message</label>
                  <textarea
                    id="float-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className={cn(inputClasses, "resize-none")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full rounded-full px-6 py-3 text-sm font-medium transition-all",
                    "bg-[var(--contact-btn-bg,hsl(0_0%_9%))] text-[var(--contact-btn-text,hsl(0_0%_100%))]",
                    "hover:bg-[var(--contact-btn-hover,hsl(0_0%_20%))] hover:shadow-lg",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "motion-reduce:transition-none"
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
