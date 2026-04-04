// @version 1.0.0
// @category animations
// @name blur-fade
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlurFadeProps {
  /** Delay before animation starts (ms) */
  delay?: number;
  children: ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes bf-reveal {
  from {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes bf-reveal {
    from { opacity: 0; filter: none; }
    to   { opacity: 1; filter: none; }
  }

  .bf-wrapper {
    filter: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BlurFade({
  delay = 0,
  children,
  className,
}: BlurFadeProps) {
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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div
        ref={ref}
        className={cn('bf-wrapper', className)}
        style={{
          opacity: visible ? undefined : 0,
          filter: visible ? undefined : 'blur(12px)',
          animation: visible
            ? `bf-reveal 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms both`
            : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
}
