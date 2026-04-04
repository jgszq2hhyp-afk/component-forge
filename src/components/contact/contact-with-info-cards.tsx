// @version 1.0.0
// @category contact
// @name Contact With Info Cards
// @source custom-implementation

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface InfoCard {
  icon?: React.ReactNode;
  title: string;
  description: string;
  value: string;
  href?: string;
}

interface ContactWithInfoCardsProps {
  title?: string;
  subtitle?: string;
  infoCards?: InfoCard[];
  onSubmit?: (data: { name: string; email: string; phone: string; message: string }) => void;
  className?: string;
}

const defaultPhoneIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const defaultEmailIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const defaultLocationIcon = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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

export default function ContactWithInfoCards({
  title = "Let's Talk",
  subtitle = "Choose your preferred way to reach us or fill out the form below.",
  infoCards = defaultInfoCards,
  onSubmit,
  className,
}: ContactWithInfoCardsProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
        "py-16 sm:py-24 bg-[var(--contact-bg,hsl(0_0%_98%))]",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--contact-title,hsl(0_0%_9%))]">
            {title}
          </h2>
          <p className="mt-3 text-base text-[var(--contact-subtitle,hsl(0_0%_40%))]">
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
                "bg-[var(--contact-card-bg,hsl(0_0%_100%))]",
                "border-[var(--contact-card-border,hsl(0_0%_0%/0.08))]"
              )}
            >
              {card.icon && (
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--contact-icon-bg,hsl(220_90%_56%/0.1))] text-[var(--contact-icon,hsl(220_90%_56%))]">
                  {card.icon}
                </div>
              )}
              <h3 className="text-base font-semibold text-[var(--contact-title,hsl(0_0%_9%))]">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--contact-subtitle,hsl(0_0%_50%))]">
                {card.description}
              </p>
              {card.href ? (
                <a
                  href={card.href}
                  className="mt-2 inline-block text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline"
                >
                  {card.value}
                </a>
              ) : (
                <p className="mt-2 text-sm font-medium text-[var(--contact-value,hsl(0_0%_9%))]">
                  {card.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mt-12 mx-auto max-w-2xl rounded-2xl border p-6 sm:p-8 bg-[var(--contact-form-bg,hsl(0_0%_100%))] border-[var(--contact-form-border,hsl(0_0%_0%/0.08))]">
          {isSubmitted ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--contact-success-bg,hsl(142_76%_36%/0.1))]">
                <svg className="h-6 w-6 text-[var(--contact-success-icon,hsl(142_76%_36%))]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--contact-title,hsl(0_0%_9%))]">Sent!</h3>
              <p className="mt-2 text-sm text-[var(--contact-subtitle,hsl(0_0%_40%))]">We'll get back to you shortly.</p>
              <button
                onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }}
                className="mt-4 text-sm font-medium text-[var(--contact-link,hsl(220_90%_56%))] hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="info-name" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">Name</label>
                  <input id="info-name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Your name" className={inputClasses} />
                </div>
                <div>
                  <label htmlFor="info-email" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">Email</label>
                  <input id="info-email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className={inputClasses} />
                </div>
              </div>
              <div>
                <label htmlFor="info-phone" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">Phone (optional)</label>
                <input id="info-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClasses} />
              </div>
              <div>
                <label htmlFor="info-message" className="block text-sm font-medium mb-1.5 text-[var(--contact-label,hsl(0_0%_30%))]">Message</label>
                <textarea id="info-message" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="How can we help?" className={cn(inputClasses, "resize-none")} />
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
    </section>
  );
}
