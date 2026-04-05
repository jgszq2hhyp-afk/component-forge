// @version 1.0.0
// @category newsletter
// @name newsletter-split-content
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface NewsletterSplitContentProps {
  headline?: string;
  description?: string;
  benefits?: string[];
  className?: string;
}

export default function NewsletterSplitContent({
  headline = "Stay in the loop",
  description = "Get the latest updates delivered to your inbox.",
  benefits = [],
  className,
}: NewsletterSplitContentProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-5xl rounded-2xl border p-8" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{description}</p>
            {benefits.length > 0 && (
              <ul className="mt-4 space-y-2" role="list">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@example.com" className="flex-1 rounded-lg border px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} />
            <button type="submit" className="shrink-0 rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
