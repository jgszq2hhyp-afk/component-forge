// @version 1.0.0
// @category services
// @name services-feature-list
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface Feature { title: string; description: string; }
interface ServicesFeatureListProps { headline?: string; description?: string; features: Feature[]; className?: string; }

export default function ServicesFeatureList({ headline, description, features, className }: ServicesFeatureListProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "sfl-heading" : undefined}>
      <div className="mx-auto max-w-4xl">
        {headline && (
          <div className="mb-8 text-center">
            <h2 id="sfl-heading" className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
            {description && <p className="mt-3 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="flex gap-3 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <svg className="mt-0.5 size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}><path d="M20 6L9 17l-5-5" /></svg>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{f.title}</h3>
                <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
