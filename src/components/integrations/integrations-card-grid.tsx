// @version 1.0.0
// @category integrations
// @name integrations-card-grid
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const ICON_SIZE = 48;

interface Integration {
  name: string;
  description: string;
  iconSrc?: string;
  category?: string;
}

interface IntegrationsCardGridProps {
  headline?: string;
  integrations: Integration[];
  className?: string;
}

export default function IntegrationsCardGrid({
  headline = "Integrations",
  integrations,
  className,
}: IntegrationsCardGridProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby="icg-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="icg-heading" className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>
          {headline}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((int) => (
            <article key={int.name} className={cn("flex items-start gap-4 rounded-xl border p-5", "motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:shadow-md", "motion-reduce:transition-none")} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              {int.iconSrc ? (
                <img src={int.iconSrc} alt="" className="shrink-0 rounded-lg" style={{ width: ICON_SIZE, height: ICON_SIZE }} />
              ) : (
                <div className="flex shrink-0 items-center justify-center rounded-lg" style={{ width: ICON_SIZE, height: ICON_SIZE, backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}>
                  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{int.name}</h3>
                {int.category && <span className="text-xs" style={{ color: "var(--primary)" }}>{int.category}</span>}
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{int.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
