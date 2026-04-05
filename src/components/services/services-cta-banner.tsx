// @version 1.0.0
// @category services
// @name services-cta-banner
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface ServicesCtaBannerProps { headline: string; description?: string; ctaLabel?: string; ctaHref?: string; className?: string; }

export default function ServicesCtaBanner({ headline, description, ctaLabel = "Get Started", ctaHref = "#", className }: ServicesCtaBannerProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-3xl rounded-2xl p-8 text-center lg:p-12" style={{ backgroundColor: "var(--primary)" }}>
        <h2 className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--primary-foreground)" }}>{headline}</h2>
        {description && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--primary-foreground)", opacity: 0.8 }}>{description}</p>}
        <a href={ctaHref} className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary-foreground)", color: "var(--primary)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
