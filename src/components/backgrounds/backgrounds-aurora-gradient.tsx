// @source 21st.dev/r/aceternity/aurora-background
"use client";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

// ---------------------------------------------------------------------------
// Keyframes (injected via style tag on first render)
// ---------------------------------------------------------------------------

const AURORA_KEYFRAMES = `
@keyframes aurora {
  0% {
    background-position: 50% 50%, 50% 50%;
  }
  50% {
    background-position: 350% 50%, 350% 50%;
  }
  100% {
    background-position: 50% 50%, 50% 50%;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BackgroundsAuroraGradient({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 text-white transition-colors",
        className
      )}
    >
      {/* Inject keyframes */}
      <style dangerouslySetInnerHTML={{ __html: AURORA_KEYFRAMES }} />

      {/* Aurora layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "motion-reduce:animate-none absolute -inset-[10px] opacity-50",
            "[background-image:repeating-linear-gradient(100deg,var(--aurora-blue)_10%,var(--aurora-indigo)_15%,var(--aurora-blue-2)_20%,var(--aurora-violet)_25%,var(--aurora-blue)_30%)]",
            "[background-size:300%_200%]",
            "mix-blend-mode:difference",
            "blur-[10px]",
            "after:absolute after:inset-0 after:mix-blend-mode-difference",
            "after:[background-image:repeating-linear-gradient(100deg,var(--aurora-blue)_10%,var(--aurora-indigo)_15%,var(--aurora-blue-2)_20%,var(--aurora-violet)_25%,var(--aurora-blue)_30%)]",
            "after:[background-size:200%_100%]",
            "after:animate-[aurora_60s_linear_infinite]",
            "after:blur-[120px]",
            "after:opacity-70"
          )}
          style={
            {
              "--aurora-blue": "#0ea5e9",
              "--aurora-indigo": "#6366f1",
              "--aurora-blue-2": "#3b82f6",
              "--aurora-violet": "#8b5cf6",
              animation: "aurora 60s linear infinite",
            } as React.CSSProperties
          }
        />

        {/* Radial gradient mask */}
        {showRadialGradient && (
          <div className="absolute inset-0 bg-zinc-950 [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {children ?? (
          <div className="flex flex-col items-center gap-4 px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Aurora Background
            </h1>
            <p className="max-w-lg text-lg text-white/60">
              A beautiful aurora gradient animation that creates an immersive
              background effect.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
