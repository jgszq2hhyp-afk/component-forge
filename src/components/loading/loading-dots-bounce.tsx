// @version 1.0.0
// @category loading
// @name loading-dots-bounce
// @source custom

import { cn } from "@/lib/utils";

const DOT_SIZE = 10;
const DOT_COUNT = 3;

interface LoadingDotsBounceProps {
  label?: string;
  className?: string;
}

export default function LoadingDotsBounce({
  label = "Loading",
  className,
}: LoadingDotsBounceProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} role="status" aria-label={label}>
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <span
          key={i}
          className="inline-block rounded-full motion-safe:animate-bounce"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            backgroundColor: "var(--primary)",
            animationDelay: `${i * 150}ms`,
            animationDuration: "600ms",
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}
