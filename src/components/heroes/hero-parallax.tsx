// @version 1.0.0
// @category heroes
// @name hero-parallax
// @source https://tw-elements.com/docs/standard/extended/parallax/, https://www.hover.dev/components/heros

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ParallaxLayer {
  imageSrc: string;
  imageAlt: string;
  speed: number; // 0 = fixed, 1 = normal scroll, <1 = parallax slower
}

interface HeroParallaxProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  layers: ParallaxLayer[];
  overlayOpacity?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hp-fade-in {
  from {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hp-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroParallax({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  layers,
  overlayOpacity = 0.45,
  className,
}: HeroParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    function onScroll() {
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        // Only calculate when section is visible
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          setScrollY(-rect.top);
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        ref={sectionRef}
        className={cn(
          'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
      >
        {/* Parallax layers */}
        {layers.map((layer, i) => (
          <div
            key={i}
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translate3d(0, ${scrollY * (layer.speed - 1) * 0.3}px, 0)`,
            }}
            aria-hidden="true"
          >
            <Image
              src={layer.imageSrc}
              alt={layer.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `color-mix(in srgb, var(--background) ${overlayOpacity * 100}%, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center">
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)',
              color: 'var(--foreground)',
              animation: 'hp-fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.15s',
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mx-auto mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{
                color: 'var(--muted-foreground)',
                animation: 'hp-fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.3s',
              }}
            >
              {subheadline}
            </p>
          )}

          {ctaText && (
            <div
              className="mt-8 md:mt-10"
              style={{
                animation: 'hp-fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.45s',
              }}
            >
              <a
                href={ctaHref}
                className={cn(
                  'inline-flex items-center justify-center',
                  'rounded-lg px-8 py-4 text-base font-semibold',
                  'transition-all duration-200',
                  'hover:brightness-110 hover:shadow-xl',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'active:scale-[0.98]',
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
