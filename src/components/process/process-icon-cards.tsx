// @version 1.0.0
// @category process
// @name process-icon-cards
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const ICON_SIZE = 48;

interface ProcessStep { title: string; description: string; icon?: React.ReactNode; }
interface ProcessIconCardsProps { headline?: string; steps: ProcessStep[]; className?: string; }

export default function ProcessIconCards({ headline, steps, className }: ProcessIconCardsProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "pic-heading" : undefined}>
      <div className="mx-auto max-w-5xl">
        {headline && <h2 id="pic-heading" className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <div className={cn("grid gap-6", steps.length <= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4")}>
          {steps.map((step, i) => (
            <article key={i} className="flex flex-col items-center rounded-xl border p-6 text-center" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <div className="mb-4 flex items-center justify-center rounded-full" style={{ width: ICON_SIZE, height: ICON_SIZE, backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}>
                {step.icon ?? <span className="text-sm font-bold" style={{ color: "var(--primary)" }}>{i + 1}</span>}
              </div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
