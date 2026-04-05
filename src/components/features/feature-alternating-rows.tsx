// @version 2.0.0
// @category features
// @name feature-alternating-rows
// @source self-authored

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_STEP_DELAY_S = 0.15;
const IMAGE_ANIMATION_OFFSET_S = 0.1;
const ANIMATION_DURATION_S = 0.7;
const HEADING_CLAMP = "clamp(1.875rem, 1.5rem + 1.5vw, 3rem)";
const SUBHEADING_CLAMP = "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)";
const ROW_TITLE_CLAMP = "clamp(1.5rem, 1.2rem + 1vw, 1.875rem)";
const SECTION_MAX_WIDTH = "80rem";
const CUBIC_EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const CHECK_ICON_SIZE = 16;
const CHECK_STROKE_WIDTH = 1.5;
const IMAGE_ASPECT_RATIO = "aspect-[4/3]";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureRow {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: string;
  bullets?: string[];
}

interface FeatureAlternatingRowsProps {
  headline?: string;
  subheadline?: string;
  rows: FeatureRow[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes alt-slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes alt-slide-in-right {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes alt-slide-in-left {
    from { opacity: 1; transform: none; }
    to   { opacity: 1; transform: none; }
  }
  @keyframes alt-slide-in-right {
    from { opacity: 1; transform: none; }
    to   { opacity: 1; transform: none; }
  }

  .alt-row-text,
  .alt-row-image {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Checkmark icon
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width={CHECK_ICON_SIZE}
      height={CHECK_ICON_SIZE}
      viewBox={`0 0 ${CHECK_ICON_SIZE} ${CHECK_ICON_SIZE}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth={CHECK_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureAlternatingRows({
  headline,
  subheadline,
  rows,
  className,
}: FeatureAlternatingRowsProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? "Features"}
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24",
          className,
        )}
        style={{
          maxWidth: SECTION_MAX_WIDTH,
          backgroundColor: "var(--background)",
        }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className="max-w-2xl mx-auto text-center mb-16 lg:mb-20">
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  color: "var(--foreground)",
                  fontSize: HEADING_CLAMP,
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 leading-relaxed"
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: SUBHEADING_CLAMP,
                }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Rows */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {rows.map((row, index) => {
            const isReversed = index % 2 === 1;
            const textDelay = `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STEP_DELAY_S}s`;
            const imageDelay = `${ANIMATION_BASE_DELAY_S + IMAGE_ANIMATION_OFFSET_S + index * ANIMATION_STEP_DELAY_S}s`;

            return (
              <article
                key={`${row.title}-${index}`}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Text */}
                <div
                  className={cn(
                    "alt-row-text",
                    isReversed ? "lg:order-2" : "lg:order-1",
                  )}
                  style={{
                    animation: `alt-slide-in-${isReversed ? "right" : "left"} ${ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                    animationDelay: textDelay,
                  }}
                >
                  {row.badge && (
                    <span
                      className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-foreground)",
                      }}
                    >
                      {row.badge}
                    </span>
                  )}
                  <h3
                    className="font-bold tracking-tight"
                    style={{
                      color: "var(--foreground)",
                      fontSize: ROW_TITLE_CLAMP,
                    }}
                  >
                    {row.title}
                  </h3>
                  <p
                    className="mt-4 text-base leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {row.description}
                  </p>

                  {/* Bullet list */}
                  {row.bullets && row.bullets.length > 0 && (
                    <ul
                      className="mt-6 space-y-3"
                      aria-label={`${row.title} features`}
                    >
                      {row.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: "var(--primary)" }}
                            aria-hidden="true"
                          >
                            <CheckIcon />
                          </span>
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--muted-foreground)" }}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Image */}
                <figure
                  className={cn(
                    "alt-row-image relative rounded-2xl overflow-hidden",
                    IMAGE_ASPECT_RATIO,
                    isReversed ? "lg:order-1" : "lg:order-2",
                  )}
                  style={{
                    animation: `alt-slide-in-${isReversed ? "left" : "right"} ${ANIMATION_DURATION_S}s ${CUBIC_EASE_OUT} both`,
                    animationDelay: imageDelay,
                  }}
                >
                  <Image
                    src={row.imageSrc}
                    alt={row.imageAlt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                </figure>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
