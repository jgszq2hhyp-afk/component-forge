// @version 1.0.0
// @category newsletter
// @name newsletter-footer-bar
// @source custom

import { cn } from "@/lib/utils";

const BAR_PY = "clamp(1.5rem,3vw,2rem)";
const BAR_PX = "clamp(1rem,4vw,2rem)";

interface NewsletterFooterBarProps {
  headline?: string;
  className?: string;
}

export default function NewsletterFooterBar({
  headline = "Subscribe to our newsletter",
  className,
}: NewsletterFooterBarProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{
        padding: `${BAR_PY} ${BAR_PX}`,
        backgroundColor: "color-mix(in srgb, var(--foreground) 95%, var(--background))",
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm font-medium" style={{ color: "var(--background)" }}>{headline}</p>
        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="Email address" className="rounded-lg border-0 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "color-mix(in srgb, var(--background) 15%, transparent)", color: "var(--background)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} />
          <button type="submit" className="shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
