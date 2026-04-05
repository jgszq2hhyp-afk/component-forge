// @version 1.0.0
// @category process
// @name process-connector-line
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const DOT_SIZE = 12;

interface Step { title: string; description: string; }
interface ProcessConnectorLineProps { headline?: string; steps: Step[]; className?: string; }

export default function ProcessConnectorLine({ headline, steps, className }: ProcessConnectorLineProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "pcl-heading" : undefined}>
      <div className="mx-auto max-w-2xl">
        {headline && <h2 id="pcl-heading" className="mb-8 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-[5px] w-0.5" style={{ backgroundColor: "var(--border)" }} aria-hidden="true" />
          <ol className="space-y-8" role="list">
            {steps.map((step, i) => (
              <li key={i} className="relative">
                <div className="absolute -left-6 top-1 rounded-full" style={{ width: DOT_SIZE, height: DOT_SIZE, backgroundColor: "var(--primary)" }} aria-hidden="true" />
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
