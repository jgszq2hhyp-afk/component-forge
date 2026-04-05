// @version 1.0.0
// @category search
// @name SearchResultsSection
// @source custom

import { cn } from "@/lib/utils";

/* ─── Named Constants ─── */
const HEADING_FONT_SIZE = "clamp(1.5rem, 3vw, 2.25rem)";
const TITLE_FONT_SIZE = "clamp(1rem, 1.5vw, 1.25rem)";
const SECTION_PADDING_Y = "clamp(2rem, 6vh, 4rem)";
const SECTION_PADDING_X = "clamp(1rem, 5vw, 3rem)";
const CARD_BORDER_RADIUS = "0.75rem";
const CARD_GAP = "1.25rem";
const HIGHLIGHT_PADDING_INLINE = "0.2em";
const MAX_DESCRIPTION_LENGTH = 200;

/* ─── Props ─── */
interface SearchResult {
  title: string;
  description: string;
  url: string;
  highlights?: string[];
}

interface SearchResultsSectionProps {
  results: SearchResult[];
  query: string;
  totalCount: number;
  className?: string;
}

/* ─── Helper: Truncate ─── */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/* ─── Helper: Highlight query in text ─── */
function highlightQuery(text: string, query: string): React.ReactNode[] {
  if (!query.trim()) return [text];

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();
    if (isMatch) {
      return (
        <mark
          key={index}
          className="rounded-sm font-medium"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--foreground)",
            paddingInline: HIGHLIGHT_PADDING_INLINE,
          }}
        >
          {part}
        </mark>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

/* ─── Link Icon ─── */
function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={14}
      height={14}
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ─── No Results ─── */
function NoResults({ query }: { query: string }) {
  return (
    <div
      className="flex flex-col items-center gap-3 py-16 text-center"
      role="status"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        width={48}
        height={48}
        aria-hidden="true"
        style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="8" x2="14" y2="14" />
        <line x1="14" y1="8" x2="8" y2="14" />
      </svg>
      <p
        className="text-lg font-medium"
        style={{ color: "var(--foreground)" }}
      >
        No results found
      </p>
      <p
        className="max-w-md text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        We couldn&apos;t find anything matching &quot;{query}&quot;. Try a
        different search term.
      </p>
    </div>
  );
}

/* ─── Component ─── */
export default function SearchResultsSection({
  results,
  query,
  totalCount,
  className,
}: SearchResultsSectionProps) {
  const hasResults = results.length > 0;

  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
      }}
      aria-label={`Search results for ${query}`}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: HEADING_FONT_SIZE,
              color: "var(--foreground)",
            }}
          >
            Results for &quot;{query}&quot;
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--muted-foreground)" }}
            role="status"
            aria-live="polite"
          >
            {totalCount} {totalCount === 1 ? "result" : "results"} found
          </p>
        </header>

        {/* Results or Empty State */}
        {hasResults ? (
          <ol
            className="flex flex-col"
            style={{ gap: CARD_GAP }}
            role="list"
            aria-label="Search results"
          >
            {results.map((result, index) => (
              <li key={index}>
                <article
                  className="flex flex-col gap-2 rounded-xl p-5"
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: CARD_BORDER_RADIUS,
                  }}
                >
                  {/* Title */}
                  <h3
                    className="font-semibold"
                    style={{
                      fontSize: TITLE_FONT_SIZE,
                      color: "var(--foreground)",
                    }}
                  >
                    {highlightQuery(result.title, query)}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {highlightQuery(
                      truncateText(result.description, MAX_DESCRIPTION_LENGTH),
                      query
                    )}
                  </p>

                  {/* Highlights */}
                  {result.highlights && result.highlights.length > 0 && (
                    <div className="mt-1 flex flex-col gap-1">
                      {result.highlights.map((highlight, hIndex) => (
                        <p
                          key={hIndex}
                          className="text-xs italic leading-relaxed"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          &ldquo;...{highlightQuery(highlight, query)}...&rdquo;
                        </p>
                      ))}
                    </div>
                  )}

                  {/* URL */}
                  <div className="mt-1 flex items-center gap-1.5">
                    <span style={{ color: "var(--primary)" }}>
                      <LinkIcon />
                    </span>
                    <a
                      href={result.url}
                      className="text-xs underline underline-offset-2"
                      style={{ color: "var(--primary)" }}
                    >
                      {result.url}
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <NoResults query={query} />
        )}
      </div>
    </section>
  );
}
