// @version 1.0.0
// @category about
// @name about-awards-recognition
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_HEADLINE = "Awards & Recognition";

const CIRCLE_SIZE = "h-16 w-16" as const;

const CARD_PADDING = "p-6" as const;

const GRID_LAYOUT = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Award {
  title: string;
  organization: string;
  year: number;
}

interface AboutAwardsRecognitionProps {
  headline?: string;
  awards: Award[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Trophy Icon (inline SVG)                                          */
/* ------------------------------------------------------------------ */

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function AboutAwardsRecognition({
  headline = DEFAULT_HEADLINE,
  awards,
  className,
}: AboutAwardsRecognitionProps) {
  return (
    <section
      className={cn(
        "w-full py-16 md:py-24",
        className,
      )}
      style={{ color: "var(--foreground)", backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h2
          className="mb-12 text-center font-bold tracking-tight"
          style={{
            fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
            color: "var(--foreground)",
          }}
        >
          {headline}
        </h2>

        {/* Awards Grid */}
        <div
          className={cn("grid gap-6", GRID_LAYOUT)}
          role="list"
          aria-label="Awards list"
        >
          {awards.map((award, index) => (
            <article
              key={`award-${index}`}
              role="listitem"
              className={cn(
                "flex flex-col items-center gap-4 rounded-2xl text-center",
                CARD_PADDING,
                "border",
                "motion-safe:transition-shadow motion-safe:duration-300",
                "motion-safe:hover:shadow-lg",
                "motion-reduce:transition-none",
              )}
              style={{
                borderColor: "var(--border, hsl(0 0% 90%))",
                backgroundColor: "var(--card, var(--background))",
              }}
            >
              {/* Circle placeholder with icon */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-full",
                  CIRCLE_SIZE,
                )}
                style={{
                  backgroundColor: "var(--muted, hsl(0 0% 96%))",
                  color: "var(--primary)",
                }}
                aria-hidden="true"
              >
                <TrophyIcon className="h-7 w-7" />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-semibold leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                {award.title}
              </h3>

              {/* Organization */}
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {award.organization}
              </p>

              {/* Year badge */}
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                {award.year}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
