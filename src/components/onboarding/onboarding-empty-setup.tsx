// @version 1.0.0
// @category onboarding
// @name onboarding-empty-setup
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface SetupStep {
  title: string;
  description: string;
  completed?: boolean;
}

interface OnboardingEmptySetupProps {
  headline?: string;
  steps: SetupStep[];
  className?: string;
}

export default function OnboardingEmptySetup({ headline = "Get Started", steps, className }: OnboardingEmptySetupProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby="oes-heading">
      <div className="mx-auto max-w-lg text-center">
        <h2 id="oes-heading" className="mb-8 font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
        <div className="space-y-3 text-left">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border p-4" style={{ borderColor: step.completed ? "var(--primary)" : "var(--border)", backgroundColor: "var(--card)" }}>
              <div className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold")} style={{ backgroundColor: step.completed ? "var(--primary)" : "var(--border)", color: step.completed ? "var(--primary-foreground)" : "var(--muted-foreground)" }}>
                {step.completed ? (
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                ) : (
                  i + 1
                )}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: step.completed ? "var(--muted-foreground)" : "var(--foreground)", textDecoration: step.completed ? "line-through" : "none" }}>{step.title}</p>
                <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
