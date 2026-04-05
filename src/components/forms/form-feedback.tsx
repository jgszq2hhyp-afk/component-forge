// @version 1.0.0
// @category forms
// @name form-feedback
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useId, useState } from "react";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const STAR_COUNT = 5;
const INPUT_CLASSES = "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

interface FormFeedbackProps {
  headline?: string;
  onSubmit?: (data: { rating: number; message: string }) => void;
  className?: string;
}

export default function FormFeedback({
  headline = "Send Feedback",
  onSubmit,
  className,
}: FormFeedbackProps) {
  const id = useId();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ rating, message });
    setSubmitted(true);
  }, [rating, message, onSubmit]);

  if (submitted) {
    return (
      <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}>
            <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Thank you!</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>Your feedback has been submitted.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-md">
        <h2 id={`${id}-heading`} className="mb-6 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>
          {headline}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star rating */}
          <fieldset>
            <legend className="mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>Rating</legend>
            <div className="flex gap-1">
              {Array.from({ length: STAR_COUNT }, (_, i) => i + 1).map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
                >
                  <svg className="size-7" viewBox="0 0 24 24" fill={(hover || rating) >= star ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Message */}
          <div>
            <label htmlFor={`${id}-msg`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Message</label>
            <textarea id={`${id}-msg`} value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required className={cn(INPUT_CLASSES, "resize-y")} style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} placeholder="Tell us what you think..." />
          </div>

          <button type="submit" disabled={rating === 0} className="w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
}
