// @version 1.0.0
// @category animations
// @name stagger-children
// @source custom

'use client';

import { cn } from '@/lib/utils';
import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StaggerChildrenProps {
  /** Delay between each child animation (ms) */
  staggerDelay?: number;
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes sc-enter {
  from {
    opacity: 0;
    transform: translateY(20px);
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
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StaggerChildren({
  staggerDelay = 100,
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
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div ref={ref} className={cn('sc-container', className)}>
        {Children.map(children, (child, index) => (
          <div
            className="sc-child"
            style={{
              opacity: visible ? undefined : 0,
              animation: visible
                ? `sc-enter 500ms cubic-bezier(0.16,1,0.3,1) ${index * staggerDelay}ms both`
                : 'none',
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </>
  );
}
