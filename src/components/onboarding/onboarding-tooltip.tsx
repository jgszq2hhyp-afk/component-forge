// @version 1.0.0
// @category onboarding
// @name onboarding-tooltip
// @source custom

import { cn } from "@/lib/utils";

interface OnboardingTooltipProps {
  title: string;
  description: string;
  step?: number;
  totalSteps?: number;
  position?: "top" | "bottom";
  className?: string;
}

export default function OnboardingTooltip({ title, description, step, totalSteps, position = "bottom", className }: OnboardingTooltipProps) {
  return (
    <div className={cn("relative w-64 rounded-xl border p-4 shadow-lg", className)} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
      {/* Arrow */}
      <div className={cn("absolute left-1/2 -translate-x-1/2 size-3 rotate-45 border", position === "bottom" ? "-top-1.5 border-b-0 border-r-0" : "-bottom-1.5 border-t-0 border-l-0")} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }} aria-hidden="true" />
      <h4 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{title}</h4>
      <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{description}</p>
      {step !== undefined && totalSteps !== undefined && (
        <p className="mt-2 text-xs font-medium" style={{ color: "var(--primary)" }}>Step {step} of {totalSteps}</p>
      )}
    </div>
  );
}
