// @source 21st.dev/r/serafim/balloons
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { balloons, textBalloons } from "balloons-js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BalloonsCelebrationProps {
  type?: "default" | "text";
  text?: string;
  fontSize?: number;
  color?: string;
  className?: string;
  onLaunch?: () => void;
}

export interface BalloonsRef {
  launchAnimation: () => void;
}

// ---------------------------------------------------------------------------
// Raw Balloons component (named export, for programmatic use via ref)
// ---------------------------------------------------------------------------

export const Balloons = React.forwardRef<BalloonsRef, BalloonsCelebrationProps>(
  (
    {
      type = "default",
      text = "Hooray!",
      fontSize = 120,
      color,
      className,
      onLaunch,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    const launch = React.useCallback(() => {
      if (type === "text") {
        textBalloons([
          {
            text,
            fontSize,
            color: color ?? "#000000",
          },
        ]);
      } else {
        balloons();
      }
      onLaunch?.();
    }, [type, text, fontSize, color, onLaunch]);

    React.useImperativeHandle(ref, () => ({
      launchAnimation: launch,
    }));

    return <div ref={containerRef} className={cn("pointer-events-none fixed inset-0 z-[9999]", className)} />;
  },
);
Balloons.displayName = "Balloons";

// ---------------------------------------------------------------------------
// Default export: self-contained demo with button
// ---------------------------------------------------------------------------

export default function BalloonsCelebration() {
  const balloonsRef = React.useRef<BalloonsRef>(null);
  const [mode, setMode] = React.useState<"default" | "text">("default");

  const handleLaunch = () => {
    balloonsRef.current?.launchAnimation();
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-8">
      <Balloons ref={balloonsRef} type={mode} text="Party!" fontSize={120} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMode("default")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            mode === "default"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          Balloons
        </button>
        <button
          type="button"
          onClick={() => setMode("text")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            mode === "text"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          Text Balloons
        </button>
      </div>

      <button
        type="button"
        onClick={handleLaunch}
        className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        Launch Balloons
      </button>

      <p className="text-sm text-muted-foreground">
        {mode === "default"
          ? "Random colored balloons will float up"
          : "Text balloons will appear on screen"}
      </p>
    </div>
  );
}
