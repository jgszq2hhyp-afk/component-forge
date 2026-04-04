'use client';

import { useRef, useState, useEffect } from 'react';

interface UseIntersectionRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionRevealOptions = {},
) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible } as const;
}
