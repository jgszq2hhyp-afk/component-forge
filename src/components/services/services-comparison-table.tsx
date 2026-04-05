// @version 1.0.0
// @category services
// @name services-comparison-table
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface ServiceTier { name: string; features: Record<string, boolean | string>; }
interface ServicesComparisonTableProps { headline?: string; featureNames: string[]; tiers: ServiceTier[]; className?: string; }

export default function ServicesComparisonTable({ headline, featureNames, tiers, className }: ServicesComparisonTableProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "sct-heading" : undefined}>
      <div className="mx-auto max-w-4xl">
        {headline && <h2 id="sct-heading" className="mb-6 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "var(--muted-foreground)" }}>Feature</th>
                {tiers.map((t) => <th key={t.name} className="px-4 py-3 text-center font-semibold" style={{ color: "var(--foreground)" }}>{t.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {featureNames.map((fn, i) => (
                <tr key={fn} className="border-t" style={{ borderColor: "var(--border)", backgroundColor: i % 2 === 1 ? "color-mix(in srgb, var(--foreground) 2%, var(--background))" : "var(--background)" }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{fn}</td>
                  {tiers.map((t) => {
                    const val = t.features[fn];
                    return (
                      <td key={`${t.name}-${fn}`} className="px-4 py-3 text-center" style={{ color: "var(--muted-foreground)" }}>
                        {typeof val === "boolean" ? (
                          val ? <svg className="mx-auto size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--primary)" }}><path d="M20 6L9 17l-5-5" /></svg> : <svg className="mx-auto size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--muted-foreground)" }}><path d="M18 6L6 18M6 6l12 12" /></svg>
                        ) : val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
