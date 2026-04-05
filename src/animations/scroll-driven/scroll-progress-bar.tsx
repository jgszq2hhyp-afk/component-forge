// @version 2.0.0
// @category animations
// @name scroll-progress-bar
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const BAR_HEIGHT_PX = 3;
const Z_INDEX = 50;
const REDUCED_MOTION_OPACITY = 0.3;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ScrollProgressBarProps {
  /** Stick to top or bottom of the viewport */
  position?: "top" | "bottom";
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Scoped keyframes                                                  */
/* ------------------------------------------------------------------ */

const keyframes = `
@keyframes spb-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@supports (animation-timeline: scroll()) {
  .spb-bar {
    animation: spb-grow linear both;
    animation-timeline: scroll();
    will-change: transform;
  }
}

/* Fallback: browsers without scroll-driven animations */
@supports not (animation-timeline: scroll()) {
  .spb-bar {
    transform: scaleX(1);
    opacity: ${REDUCED_MOTION_OPACITY};
  }
}

@media (prefers-reduced-motion: reduce) {
  .spb-bar {
    animation: none !important;
    transform: scaleX(1) !important;
    opacity: ${REDUCED_MOTION_OPACITY};
  }
}
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ScrollProgressBar({
  position = "top",
  className,
}: ScrollProgressBarProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        className={cn(
          "spb-bar pointer-events-none fixed left-0 w-full origin-left",
          position === "top" ? "top-0" : "bottom-0",
          className
        )}
        style={{
          height: BAR_HEIGHT_PX,
          zIndex: Z_INDEX,
          backgroundColor: "var(--color-primary, oklch(0.6 0.25 260))",
        }}
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </>
  );
}
