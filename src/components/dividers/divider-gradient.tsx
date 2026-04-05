// @version 1.0.0
// @category dividers
// @name divider-gradient
// @source custom

import { cn } from "@/lib/utils";

const DIVIDER_HEIGHT = 4;

interface DividerGradientProps {
  className?: string;
}

export default function DividerGradient({ className }: DividerGradientProps) {
  return (
    <div
      className={cn("w-full", className)}
      role="separator"
      style={{
        height: DIVIDER_HEIGHT,
        background: "linear-gradient(to right, transparent, var(--primary), transparent)",
      }}
    />
  );
}
