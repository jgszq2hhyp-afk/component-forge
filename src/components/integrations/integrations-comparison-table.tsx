// @version 1.0.0
// @category integrations
// @name integrations-comparison-table
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface IntegrationRow {
  name: string;
  type: string;
  status: "available" | "coming-soon" | "unavailable";
}

interface IntegrationsComparisonTableProps {
  headline?: string;
  integrations: IntegrationRow[];
  className?: string;
}

function StatusBadge({ status }: { status: IntegrationRow["status"] }) {
  const styles: Record<string, { bg: string; text: string; label: string }> = {
    available: { bg: "color-mix(in srgb, var(--primary) 10%, transparent)", text: "var(--primary)", label: "Available" },
    "coming-soon": { bg: "color-mix(in srgb, var(--foreground) 8%, transparent)", text: "var(--muted-foreground)", label: "Coming Soon" },
    unavailable: { bg: "color-mix(in srgb, var(--destructive, red) 10%, transparent)", text: "var(--destructive, red)", label: "Unavailable" },
  };
  const s = styles[status];
  return <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: s.bg, color: s.text }}>{s.label}</span>;
}

export default function IntegrationsComparisonTable({
  headline = "Integration Status",
  integrations,
  className,
}: IntegrationsComparisonTableProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby="ict-heading">
      <div className="mx-auto max-w-3xl">
        <h2 id="ict-heading" className="mb-6 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 3%, var(--background))" }}>
                <th className="px-5 py-3 text-left font-semibold" style={{ color: "var(--foreground)" }}>Integration</th>
                <th className="px-5 py-3 text-left font-semibold" style={{ color: "var(--foreground)" }}>Type</th>
                <th className="px-5 py-3 text-center font-semibold" style={{ color: "var(--foreground)" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {integrations.map((row, i) => (
                <tr key={row.name} className="border-t" style={{ borderColor: "var(--border)", backgroundColor: i % 2 === 1 ? "color-mix(in srgb, var(--foreground) 2%, var(--background))" : "var(--background)" }}>
                  <td className="px-5 py-3 font-medium" style={{ color: "var(--foreground)" }}>{row.name}</td>
                  <td className="px-5 py-3" style={{ color: "var(--muted-foreground)" }}>{row.type}</td>
                  <td className="px-5 py-3 text-center"><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
