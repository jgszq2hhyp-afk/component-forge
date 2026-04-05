// @version 1.0.0
// @category loading
// @name loading-page-transition
// @source custom

import { cn } from "@/lib/utils";

interface LoadingPageTransitionProps {
  className?: string;
}

export default function LoadingPageTransition({ className }: LoadingPageTransitionProps) {
  return (
    <div className={cn("flex min-h-[50vh] w-full flex-col items-center justify-center gap-4", className)} role="status" aria-label="Loading page">
      {/* Spinner */}
      <div
        className="size-10 rounded-full border-4 motion-safe:animate-spin"
        style={{
          borderColor: "var(--border)",
          borderTopColor: "var(--primary)",
        }}
        aria-hidden="true"
      />
      <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
        Loading...
      </p>
    </div>
  );
}
