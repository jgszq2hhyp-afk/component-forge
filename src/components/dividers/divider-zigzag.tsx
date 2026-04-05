// @version 1.0.0
// @category dividers
// @name divider-zigzag
// @source custom

import { cn } from "@/lib/utils";

const ZIG_HEIGHT = 20;
const ZIG_WIDTH = 40;

interface DividerZigzagProps {
  className?: string;
}

export default function DividerZigzag({ className }: DividerZigzagProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)} role="separator">
      <svg
        viewBox={`0 0 ${ZIG_WIDTH * 2} ${ZIG_HEIGHT}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: ZIG_HEIGHT, display: "block" }}
        aria-hidden="true"
      >
        <path
          d={`M0 ${ZIG_HEIGHT} L${ZIG_WIDTH / 2} 0 L${ZIG_WIDTH} ${ZIG_HEIGHT} L${ZIG_WIDTH * 1.5} 0 L${ZIG_WIDTH * 2} ${ZIG_HEIGHT}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
