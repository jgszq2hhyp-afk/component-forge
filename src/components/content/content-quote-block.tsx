// @version 1.0.0
// @category content
// @name content-quote-block
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const QUOTE_FONT = "clamp(1.25rem,2.5vw,1.75rem)";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ContentQuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContentQuoteBlock({
  quote,
  author,
  role,
  className,
}: ContentQuoteBlockProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
    >
      <blockquote className="mx-auto max-w-3xl text-center">
        <div
          className="mb-4 flex justify-center"
          aria-hidden="true"
        >
          <svg
            className="size-10"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ color: "color-mix(in srgb, var(--primary) 20%, transparent)" }}
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>
        <p
          className="font-medium italic leading-relaxed"
          style={{ fontSize: QUOTE_FONT, color: "var(--foreground)" }}
        >
          &ldquo;{quote}&rdquo;
        </p>
        {(author || role) && (
          <footer className="mt-6">
            {author && (
              <cite className="not-italic text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {author}
              </cite>
            )}
            {role && (
              <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                {role}
              </p>
            )}
          </footer>
        )}
      </blockquote>
    </section>
  );
}
