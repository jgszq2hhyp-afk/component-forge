// @version 1.0.0
// @category content
// @name Content Two Column Text
// @source custom

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = "clamp(1.5rem, 3vw, 2.5rem)";
const SECTION_PADDING = "py-[clamp(3rem,8vw,6rem)]";
const COLUMN_GAP = "gap-8 lg:gap-12";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContentTwoColumnTextProps {
  headline?: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContentTwoColumnText({
  headline,
  leftContent,
  rightContent,
  className,
}: ContentTwoColumnTextProps) {
  const headingId = "content-two-column-heading";

  return (
    <section
      aria-labelledby={headline ? headingId : undefined}
      className={cn(
        SECTION_PADDING,
        "bg-[var(--background)] text-[var(--foreground)]",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {headline && (
          <header className="mb-10">
            <h2
              id={headingId}
              className="font-bold tracking-tight text-[var(--foreground)]"
              style={{ fontSize: HEADING_CLAMP }}
            >
              {headline}
            </h2>
          </header>
        )}

        <div className={cn("grid grid-cols-1 lg:grid-cols-2", COLUMN_GAP)}>
          <div className="text-base leading-relaxed text-[var(--muted-foreground)]">
            {leftContent}
          </div>
          <div className="text-base leading-relaxed text-[var(--muted-foreground)]">
            {rightContent}
          </div>
        </div>
      </div>
    </section>
  );
}
