// @version 2.0.0
// @category animations
// @name stagger-children
// @source custom

"use client";

import { cn } from "@/lib/utils";
import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_STAGGER_DELAY_MS = 100;
const CHILD_ANIMATION_DURATION_MS = 500;
const TRANSLATE_OFFSET_PX = 20;
const INTERSECTION_THRESHOLD = 0.1;
const EASING_FUNCTION = "cubic-bezier(0.16,1,0.3,1)";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface StaggerChildrenProps {
  /** Delay between each child animation (ms) */
  staggerDelay?: number;
  children: ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Scoped keyframes                                                  */
/* ------------------------------------------------------------------ */

const keyframes = `
@keyframes sc-enter {
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
  @keyframes sc-enter {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .sc-child {
    transform: none !important;
    animation-duration: 0.01ms !important;
  }
}
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function StaggerChildren({
  staggerDelay = DEFAULT_STAGGER_DELAY_MS,
  children,
  className,
}: StaggerChildrenProps) {
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
        className={cn("sc-container", className)}
      >
        {Children.map(children, (child, index) => (
          <div
            className="sc-child"
            style={{
              opacity: visible ? undefined : 0,
              animation: visible
                ? `sc-enter ${CHILD_ANIMATION_DURATION_MS}ms ${EASING_FUNCTION} ${index * staggerDelay}ms both`
                : "none",
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </>
  );
}
