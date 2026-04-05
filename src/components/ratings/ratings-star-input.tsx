// @version 1.0.0
// @category ratings
// @name ratings-star-input
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const STAR_COUNT = 5;

interface RatingsStarInputProps { value?: number; onChange?: (rating: number) => void; size?: number; className?: string; }

export default function RatingsStarInput({ value = 0, onChange, size = 28, className }: RatingsStarInputProps) {
  const [hover, setHover] = useState(0);
  return (
    <div className={cn("flex gap-0.5", className)} role="radiogroup" aria-label="Rating">
      {Array.from({ length: STAR_COUNT }, (_, i) => i + 1).map((star) => (
        <button key={star} type="button" onClick={() => onChange?.(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="p-0.5 focus-visible:outline-none focus-visible:ring-2 rounded" aria-label={`${star} star${star > 1 ? "s" : ""}`} style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
          <svg width={size} height={size} viewBox="0 0 24 24" fill={(hover || value) >= star ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}
