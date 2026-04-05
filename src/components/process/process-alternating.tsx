// @version 1.0.0
// @category process
// @name process-alternating
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface ProcessStep { title: string; description: string; imageSrc?: string; }
interface ProcessAlternatingProps { headline?: string; steps: ProcessStep[]; className?: string; }

export default function ProcessAlternating({ headline, steps, className }: ProcessAlternatingProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "pa-heading" : undefined}>
      <div className="mx-auto max-w-5xl">
        {headline && <h2 id="pa-heading" className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className={cn("grid items-center gap-8 md:grid-cols-2", i % 2 === 1 && "md:[direction:rtl]")}>
              {step.imageSrc ? (
                <div className="aspect-video overflow-hidden rounded-xl border md:[direction:ltr]" style={{ borderColor: "var(--border)" }}>
                  <img src={step.imageSrc} alt="" className="size-full object-cover" />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-xl md:[direction:ltr]" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 5%, transparent)" }}>
                  <span className="text-4xl font-bold" style={{ color: "var(--primary)", opacity: 0.2 }}>{i + 1}</span>
                </div>
              )}
              <div className="md:[direction:ltr]">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--primary)" }}>Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-bold" style={{ color: "var(--foreground)" }}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
