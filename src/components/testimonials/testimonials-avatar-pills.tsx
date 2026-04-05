// @source 21st.dev/r/jatin-yadav05/unique-testimonial
// Avatar pill testimonials with blur transition between quotes
// Active avatar expands to show name, quote transitions with blur+scale

"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  /** data-URI or URL for avatar; falls back to initials circle */
  avatar?: string;
}

interface TestimonialsAvatarPillsProps {
  testimonials?: Testimonial[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Defaults                                                          */
/* ------------------------------------------------------------------ */

const COLORS = [
  "oklch(0.65 0.18 250)", // blue
  "oklch(0.65 0.18 330)", // pink
  "oklch(0.65 0.18 145)", // green
  "oklch(0.65 0.18 30)",  // orange
  "oklch(0.65 0.18 280)", // purple
];

function initialsUri(name: string, idx: number): string {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const bg = encodeURIComponent(COLORS[idx % COLORS.length]);
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="40" fill="${COLORS[idx % COLORS.length]}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui" font-size="28" font-weight="600">${initials}</text></svg>`
  )}`;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The attention to detail and performance optimizations exceeded our expectations. We saw a 40% increase in conversions.",
    author: "Sarah Chen",
    role: "VP of Product, Acme Inc.",
  },
  {
    quote:
      "Working with this team felt like an extension of our own. Communication was seamless from day one.",
    author: "Marcus Rivera",
    role: "CTO, Bloom Health",
  },
  {
    quote:
      "They delivered ahead of schedule without cutting corners. Rare to find that combination.",
    author: "Lena Hoffmann",
    role: "Founder, Craft Studio",
  },
  {
    quote:
      "Our users love the new experience. Support tickets dropped by 60% after launch.",
    author: "James Okafor",
    role: "Head of Design, Novabit",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function TestimonialsAvatarPills({
  testimonials = DEFAULT_TESTIMONIALS,
  className,
}: TestimonialsAvatarPillsProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = testimonials[activeIdx];

  const handleSelect = useCallback((idx: number) => {
    setActiveIdx(idx);
  }, []);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-2xl flex-col items-center gap-10 px-4 py-12",
        className
      )}
    >
      {/* Quote area */}
      <div className="relative min-h-[180px] w-full text-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeIdx}
            initial={{ opacity: 0, filter: "blur(6px)", scale: 0.96 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)", scale: 0.96 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="motion-reduce:!filter-none motion-reduce:!transform-none"
          >
            <p
              className="text-xl font-medium leading-relaxed md:text-2xl"
              style={{ color: "var(--foreground)" }}
            >
              &ldquo;{active.quote}&rdquo;
            </p>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="mt-4 text-sm motion-reduce:!transform-none"
              style={{ color: "var(--muted-foreground)" }}
            >
              {active.role}
            </motion.p>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Avatar pills */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {testimonials.map((t, idx) => {
          const isActive = idx === activeIdx;
          const avatarSrc = t.avatar ?? initialsUri(t.author, idx);

          return (
            <motion.button
              key={t.author}
              onClick={() => handleSelect(idx)}
              layout
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className={cn(
                "flex items-center gap-2 rounded-full border px-1 py-1 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2",
                "motion-reduce:!transform-none"
              )}
              style={{
                borderColor: isActive ? "var(--primary)" : "var(--border)",
                backgroundColor: isActive ? "var(--card)" : "transparent",
                // ring uses --ring
                // @ts-expect-error CSS custom property
                "--tw-ring-color": "var(--ring)",
              }}
              aria-pressed={isActive}
            >
              <img
                src={avatarSrc}
                alt={t.author}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden whitespace-nowrap pr-2 text-sm font-medium motion-reduce:!transform-none"
                    style={{ color: "var(--foreground)" }}
                  >
                    {t.author}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
