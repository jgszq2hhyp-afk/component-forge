// @version 1.0.0
// @category portfolio
// @name portfolio-case-study
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface Stat { label: string; value: string; }

interface PortfolioCaseStudyProps {
  title: string;
  client: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  stats?: Stat[];
  className?: string;
}

export default function PortfolioCaseStudy({ title, client, description, imageSrc, imageAlt = "", stats = [], className }: PortfolioCaseStudyProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border)" }}>
          <img src={imageSrc} alt={imageAlt} className="aspect-video w-full object-cover" />
          <div className="p-6 lg:p-8" style={{ backgroundColor: "var(--card)" }}>
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>{client}</span>
            <h2 className="mt-2 font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{title}</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{description}</p>
            {stats.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold tabular-nums" style={{ color: "var(--foreground)" }}>{s.value}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
