// @version 1.0.0
// @category social-proof
// @name social-proof-live-counter
// @source custom

import { cn } from "@/lib/utils";

interface SocialProofLiveCounterProps { count: number; label?: string; className?: string; }

export default function SocialProofLiveCounter({ count, label = "people are viewing this right now", className }: SocialProofLiveCounterProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2", className)} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full rounded-full motion-safe:animate-ping" style={{ backgroundColor: "var(--primary)", opacity: 0.4 }} />
        <span className="relative inline-flex size-2.5 rounded-full" style={{ backgroundColor: "var(--primary)" }} />
      </span>
      <span className="text-sm" style={{ color: "var(--foreground)" }}>
        <strong className="font-semibold tabular-nums">{count}</strong> {label}
      </span>
    </div>
  );
}
