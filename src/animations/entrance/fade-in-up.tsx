// @version 2.0.0
// @category animations
// @name fade-in-up
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_DELAY_MS = 0;
const DEFAULT_DURATION_MS = 600;
const TRANSLATE_OFFSET_PX = 24;
const INTERSECTION_THRESHOLD = 0.15;
const EASING_FUNCTION = "cubic-bezier(0.16,1,0.3,1)";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface FadeInUpProps {
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Animation duration (ms) */
  duration?: number;
  children: ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Scoped keyframes                                                  */
/* ------------------------------------------------------------------ */

const keyframes = `
@keyframes fiu-enter {
  from {
    opacity: 0;
    transform: translateY(${TRANSLATE_OFFSET_PX}px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes fiu-enter {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .fiu-wrapper {
    transform: none !important;
    animation-duration: 0.01ms !important;
  }
}
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function FadeInUp({
  delay = DEFAULT_DELAY_MS,
  duration = DEFAULT_DURATION_MS,
  children,
  className,
}: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        ref={ref}
        className={cn("fiu-wrapper", className)}
        style={{
          opacity: visible ? undefined : 0,
          animation: visible
            ? `fiu-enter ${duration}ms ${EASING_FUNCTION} ${delay}ms both`
            : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
