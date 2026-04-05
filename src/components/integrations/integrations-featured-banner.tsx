// @version 1.0.0
// @category integrations
// @name integrations-featured-banner
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface IntegrationsFeaturedBannerProps {
  name: string;
  description: string;
  iconSrc?: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export default function IntegrationsFeaturedBanner({
  name,
  description,
  iconSrc,
  features = [],
  ctaLabel = "Learn More",
  ctaHref = "#",
  className,
}: IntegrationsFeaturedBannerProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <div className="grid items-center gap-6 p-8 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              {iconSrc && <img src={iconSrc} alt="" className="size-12 rounded-xl" />}
              <h2 className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{name}</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{description}</p>
            {features.length > 0 && (
              <ul className="mt-4 space-y-2" role="list">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--foreground)" }}>
                    <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <a href={ctaHref} className="mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
              {ctaLabel}
            </a>
          </div>
          <div className="flex items-center justify-center rounded-xl p-8" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)" }}>
            <svg className="size-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)", opacity: 0.3 }} aria-hidden="true">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
