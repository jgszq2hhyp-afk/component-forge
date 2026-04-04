'use client';

import { useState, useEffect, useCallback, type RefObject } from 'react';
import { useReducedMotion } from './use-reduced-motion';

interface MagneticTransform {
  x: number;
  y: number;
}

interface UseMagneticCursorOptions {
  ref: RefObject<HTMLElement | null>;
  strength?: number;
}

export function useMagneticCursor({ ref, strength = 0.3 }: UseMagneticCursorOptions): MagneticTransform {
  const [transform, setTransform] = useState<MagneticTransform>({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) * strength;
      const deltaY = (event.clientY - centerY) * strength;

      setTransform({ x: deltaX, y: deltaY });
    },
    [ref, strength],
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTransform({ x: 0, y: 0 });
      return;
    }

    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, prefersReducedMotion, handleMouseMove, handleMouseLeave]);

  return transform;
}
