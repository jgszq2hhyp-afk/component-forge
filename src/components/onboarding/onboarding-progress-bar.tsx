// @version 1.0.0
// @category onboarding
// @name onboarding-progress-bar
// @source custom

import { cn } from "@/lib/utils";

const BAR_HEIGHT = 6;

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  className?: string;
}

export default function OnboardingProgressBar({ currentStep, totalSteps, label, className }: OnboardingProgressBarProps) {
  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));
  return (
    <div className={cn("w-full", className)}>
      {label && <p className="mb-2 text-sm font-medium" style={{ color: "var(--foreground)" }}>{label}</p>}
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden rounded-full" style={{ height: BAR_HEIGHT, backgroundColor: "var(--border)" }}>
          <div className="h-full rounded-full motion-safe:transition-[width] motion-safe:duration-500" style={{ width: `${progress}%`, backgroundColor: "var(--primary)" }} role="progressbar" aria-valuenow={currentStep} aria-valuemin={0} aria-valuemax={totalSteps} />
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums" style={{ color: "var(--muted-foreground)" }}>{currentStep}/{totalSteps}</span>
      </div>
    </div>
  );
}
