// @source 21st.dev/r/cnippet_dev/davincho-hero-1
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function HeroesCounter({ className }: { className?: string }) {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <button
        onClick={() => setCount((c) => c - 1)}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-lg font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        -
      </button>
      <span className="min-w-[3ch] text-center text-2xl font-bold tabular-nums text-foreground">
        {count}
      </span>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background text-lg font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        +
      </button>
    </div>
  );
}
