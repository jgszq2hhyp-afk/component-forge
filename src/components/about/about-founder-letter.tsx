// @version 1.0.0
// @category about
// @name about-founder-letter
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const QUOTE_MAX_WIDTH = "max-w-3xl" as const;

const IMAGE_SIZE = "h-20 w-20" as const;

const SECTION_PADDING = "py-16 md:py-24" as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface AboutFounderLetterProps {
  quote: string;
  name: string;
  role: string;
  imageSrc?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Initials helper                                                   */
/* ------------------------------------------------------------------ */

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]![0] ?? "" : "";
  return (first + last).toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function AboutFounderLetter({
  quote,
  name,
  role,
  imageSrc,
  className,
}: AboutFounderLetterProps) {
  const initials = getInitials(name);

  return (
    <section
      className={cn(
        "w-full",
        SECTION_PADDING,
        className,
      )}
      style={{ color: "var(--foreground)", backgroundColor: "var(--background)" }}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", QUOTE_MAX_WIDTH)}>
        {/* Decorative open-quote mark */}
        <div
          className="mb-6 select-none text-center"
          style={{
            fontSize: "clamp(4rem, 8vw, 8rem)",
            lineHeight: "1",
            color: "var(--primary)",
            opacity: 0.25,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Blockquote */}
        <figure className="flex flex-col items-center gap-8 text-center">
          <blockquote
            className={cn(
              "italic leading-relaxed",
              "motion-safe:transition-opacity motion-safe:duration-500",
              "motion-reduce:transition-none",
            )}
            style={{
              fontSize: "clamp(1.125rem, 2vw + 0.25rem, 1.75rem)",
              color: "var(--foreground)",
            }}
          >
            <p>{quote}</p>
          </blockquote>

          {/* Divider */}
          <div
            className="h-px w-16"
            style={{ backgroundColor: "var(--border, hsl(0 0% 90%))" }}
            aria-hidden="true"
          />

          {/* Attribution */}
          <figcaption className="flex flex-col items-center gap-4">
            {/* Avatar */}
            <div
              className={cn(
                "relative shrink-0 overflow-hidden rounded-full",
                IMAGE_SIZE,
                "ring-2 ring-offset-2",
                "focus-visible:outline-none focus-visible:ring-2",
              )}
              style={{
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-lg font-semibold"
                  style={{
                    backgroundColor: "var(--muted, hsl(0 0% 96%))",
                    color: "var(--muted-foreground)",
                  }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Name + Role */}
            <div className="flex flex-col items-center gap-1">
              <cite
                className="not-italic text-base font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {name}
              </cite>
              <span
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {role}
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
