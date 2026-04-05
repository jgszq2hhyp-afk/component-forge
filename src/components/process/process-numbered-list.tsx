// @version 1.0.0
// @category process
// @name process-numbered-list
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const NUMBER_SIZE = 40;

interface Step { title: string; description: string; }
interface ProcessNumberedListProps { headline?: string; steps: Step[]; className?: string; }

export default function ProcessNumberedList({ headline, steps, className }: ProcessNumberedListProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "pnl-heading" : undefined}>
      <div className="mx-auto max-w-2xl">
        {headline && <h2 id="pnl-heading" className="mb-8 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <ol className="space-y-6" role="list">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ width: NUMBER_SIZE, height: NUMBER_SIZE, backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>{i + 1}</div>
              <div className="pt-2">
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
