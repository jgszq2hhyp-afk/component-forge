// @version 1.0.0
// @category dividers
// @name divider-dotted
// @source custom

import { cn } from "@/lib/utils";

const DOT_SIZE = 4;
const DOT_GAP = 12;

interface DividerDottedProps {
  className?: string;
}

export default function DividerDotted({ className }: DividerDottedProps) {
  return (
    <div
      className={cn("w-full", className)}
      role="separator"
      style={{
        height: DOT_SIZE,
        backgroundImage: `radial-gradient(circle, var(--border) ${DOT_SIZE / 2}px, transparent ${DOT_SIZE / 2}px)`,
        backgroundSize: `${DOT_GAP + DOT_SIZE}px ${DOT_SIZE}px`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
      }}
    />
  );
}
