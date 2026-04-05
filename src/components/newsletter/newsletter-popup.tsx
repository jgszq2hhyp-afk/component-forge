// @version 1.0.0
// @category newsletter
// @name newsletter-popup
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface NewsletterPopupProps {
  headline?: string;
  description?: string;
  delay?: number;
  className?: string;
}

export default function NewsletterPopup({
  headline = "Don't miss out",
  description = "Subscribe for exclusive content and updates.",
  delay = 3000,
  className,
}: NewsletterPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setVisible(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", className)} role="dialog" aria-modal="true" aria-label={headline}>
      <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 70%, transparent)" }} onClick={() => setVisible(false)} aria-hidden="true" />
      <div className={cn("relative w-full max-w-sm rounded-2xl border p-6 shadow-2xl", "motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-200 motion-reduce:animate-none")} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <button type="button" onClick={() => setVisible(false)} className="absolute top-3 right-3 rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Close" style={{ color: "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
        <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{headline}</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>
        <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); setVisible(false); }}>
          <input type="email" required placeholder="Your email" className="w-full rounded-lg border px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} />
          <button type="submit" className="w-full rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
