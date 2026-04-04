'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from './use-reduced-motion';

interface UseScrollProgressOptions {
  elementRef?: RefObject<HTMLElement | null>;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}): number {
  const { elementRef } = options;
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(0);
      return;
    }

    const calculateProgress = () => {
      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const rawProgress = (viewportHeight - rect.top) / (viewportHeight + elementHeight);
        setProgress(Math.min(1, Math.max(0, rawProgress)));
      } else {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) {
          setProgress(0);
          return;
        }
        setProgress(Math.min(1, Math.max(0, window.scrollY / scrollHeight)));
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(calculateProgress);
    };

    calculateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementRef, prefersReducedMotion]);

  return progress;
}
