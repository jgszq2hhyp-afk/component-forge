// @source 21st.dev/r/efferd/not-found-page-1
// Recreation based on component name — original source unavailable

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ErrorNotFoundProps {
  code?: string;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Animated background circles (CSS-only, no JS needed)
// ---------------------------------------------------------------------------

function FloatingCircles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Large blurred circle top-right */}
      <div
        className={cn(
          "absolute -top-24 -right-24 h-96 w-96 rounded-full",
          "bg-[var(--primary)]/10 blur-3xl",
          "animate-[float_8s_ease-in-out_infinite] motion-reduce:animate-none",
        )}
      />
      {/* Medium blurred circle bottom-left */}
      <div
        className={cn(
          "absolute -bottom-16 -left-16 h-72 w-72 rounded-full",
          "bg-[var(--primary)]/8 blur-3xl",
          "animate-[float_10s_ease-in-out_infinite_reverse] motion-reduce:animate-none",
        )}
      />
      {/* Small accent circle */}
      <div
        className={cn(
          "absolute top-1/3 left-1/4 h-40 w-40 rounded-full",
          "bg-[var(--destructive)]/5 blur-2xl",
          "animate-[float_12s_ease-in-out_infinite_2s] motion-reduce:animate-none",
        )}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component — no interactivity)
// ---------------------------------------------------------------------------

export default function ErrorNotFound({
  code = "404",
  title = "Page not found",
  description = "Oops! The page you're looking for seems to have wandered off. Let's get you back on track.",
  homeHref = "/",
  homeLabel = "Back to Home",
  className,
}: ErrorNotFoundProps) {
  return (
    <main
      aria-label={`${code} error page`}
      className={cn(
        "relative flex min-h-svh flex-col items-center justify-center overflow-hidden",
        "bg-[var(--background)] px-6 py-20 text-center",
        className,
      )}
    >
      <FloatingCircles />

      {/* Large watermark code */}
      <span
        className={cn(
          "pointer-events-none absolute select-none font-extrabold leading-none tracking-tighter",
          "text-[var(--foreground)]",
        )}
        style={{
          fontSize: "clamp(10rem, 30vw, 22rem)",
          opacity: 0.04,
        }}
        aria-hidden
      >
        {code}
      </span>

      {/* Content */}
      <div className="relative z-10 flex max-w-lg flex-col items-center gap-6">
        {/* Error badge */}
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium",
            "border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]",
          )}
        >
          <span
            className="inline-block h-2 w-2 rounded-full bg-[var(--destructive)] animate-pulse motion-reduce:animate-none"
            aria-hidden
          />
          Error {code}
        </span>

        {/* Heading */}
        <h1
          className="font-bold tracking-tight text-[var(--foreground)]"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          {title}
        </h1>

        {/* Description */}
        <p className="max-w-md text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={homeHref}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3",
              "bg-[var(--primary)] text-[var(--background)]",
              "text-sm font-semibold",
              "transition-all duration-200 motion-reduce:transition-none",
              "hover:opacity-90 hover:shadow-lg",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
            )}
          >
            {/* Arrow-left icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            {homeLabel}
          </a>

          <a
            href={homeHref}
            className={cn(
              "inline-flex items-center justify-center rounded-lg px-6 py-3",
              "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)]",
              "text-sm font-semibold",
              "transition-all duration-200 motion-reduce:transition-none",
              "hover:bg-[var(--muted-foreground)]/10",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2",
            )}
          >
            Report Issue
          </a>
        </div>
      </div>

      {/* Keyframe via inline style tag — avoids needing tailwind config */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </main>
  );
}
