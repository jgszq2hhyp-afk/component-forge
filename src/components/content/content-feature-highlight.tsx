// @version 1.0.0
// @category content
// @name content-feature-highlight
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const MIN_HEIGHT = "clamp(20rem,50vw,32rem)";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContentFeatureHighlightProps {
  headline: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  reversed?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContentFeatureHighlight({
  headline,
  description,
  imageSrc,
  imageAlt = "",
  reversed = false,
  className,
}: ContentFeatureHighlightProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby="cfh-heading"
    >
      <div
        className={cn(
          "mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2",
          reversed && "lg:[direction:rtl]",
        )}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden rounded-2xl lg:[direction:ltr]"
          style={{ minHeight: MIN_HEIGHT }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--background) 60%, transparent), transparent)" }}
            aria-hidden="true"
          />
        </div>

        {/* Text */}
        <div className="lg:[direction:ltr]">
          <h2
            id="cfh-heading"
            className="mb-4 font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
