// @version 1.0.0
// @category about
// @name about-team-culture
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_HEADLINE = "Our Culture & Values";

const GRID_COLS = "grid-cols-2" as const;

const VALUE_ICON_SIZE = "h-2 w-2" as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface CultureImage {
  src: string;
  alt: string;
}

interface CultureValue {
  title: string;
  description: string;
}

interface AboutTeamCultureProps {
  headline?: string;
  images: CultureImage[];
  values: CultureValue[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function AboutTeamCulture({
  headline = DEFAULT_HEADLINE,
  images,
  values,
  className,
}: AboutTeamCultureProps) {
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

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* 2x2 Image Collage */}
          <div
            className={cn("grid gap-4", GRID_COLS)}
            role="group"
            aria-label="Team culture images"
          >
            {images.slice(0, 4).map((image, index) => (
              <div
                key={`culture-img-${index}`}
                className={cn(
                  "relative overflow-hidden rounded-2xl",
                  "aspect-square",
                  "motion-safe:transition-transform motion-safe:duration-300",
                  "motion-safe:hover:scale-[1.02]",
                  "motion-reduce:transition-none",
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: "var(--foreground)" }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Values List */}
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-6" role="list">
              {values.map((value, index) => (
                <li
                  key={`value-${index}`}
                  className={cn(
                    "flex gap-4 items-start rounded-xl p-4",
                    "motion-safe:transition-colors motion-safe:duration-200",
                    "motion-reduce:transition-none",
                  )}
                  style={{ backgroundColor: "var(--muted, hsl(0 0% 96%))" }}
                >
                  {/* Decorative dot */}
                  <span
                    className={cn(
                      "mt-2 shrink-0 rounded-full",
                      VALUE_ICON_SIZE,
                    )}
                    style={{ backgroundColor: "var(--primary)" }}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
