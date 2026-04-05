"use client"

// @version 2.0.0
// @category heroes
// @name hero-parallax
// @source https://tw-elements.com/docs/standard/extended/parallax/, https://www.hover.dev/components/heros

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PARALLAX_DAMPING = 0.3;
const FADE_IN_DURATION = '0.9s';
const FADE_IN_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const MOBILE_BREAKPOINT = 768;

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
  /** Disable parallax effect on mobile viewports (default: true) */
  disableOnMobile?: boolean;
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

  .hp-parallax-layer {
    transform: none !important;
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
  disableOnMobile = true,
  className,
}: HeroParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateParallax = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      scrollYRef.current = -rect.top;
      layerRefs.current.forEach((el, i) => {
        if (el && layers[i]) {
          const offset = scrollYRef.current * (layers[i].speed - 1) * PARALLAX_DAMPING;
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      });
    }
  }, [layers]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // Disable parallax on mobile if configured
    if (disableOnMobile && window.innerWidth < MOBILE_BREAKPOINT) return;

    function onScroll() {
      rafRef.current = requestAnimationFrame(updateParallax);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [disableOnMobile, updateParallax]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        ref={sectionRef}
        aria-label={headline}
        role="banner"
        className={cn(
          'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
      >
        {/* Parallax layers */}
        {layers.map((layer, i) => (
          <div
            key={`${layer.imageSrc}-${i}`}
            ref={(el) => { layerRefs.current[i] = el; }}
            className="hp-parallax-layer absolute inset-0 will-change-transform"
            aria-hidden="true"
          >
            <Image
              src={layer.imageSrc}
              alt={layer.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
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
              fontSize: 'clamp(2.25rem, 5vw + 1rem, 5rem)',
              color: 'var(--foreground)',
              animation: `hp-fade-in ${FADE_IN_DURATION} ${FADE_IN_EASING} both`,
              animationDelay: '0.15s',
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mx-auto mt-5 md:mt-6 leading-relaxed max-w-xl"
              style={{
                fontSize: 'clamp(1rem, 1vw + 0.75rem, 1.25rem)',
                color: 'var(--muted-foreground)',
                animation: `hp-fade-in ${FADE_IN_DURATION} ${FADE_IN_EASING} both`,
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
                animation: `hp-fade-in ${FADE_IN_DURATION} ${FADE_IN_EASING} both`,
                animationDelay: '0.45s',
              }}
            >
              <a
                href={ctaHref}
                aria-label={ctaText}
                className={cn(
                  'inline-flex items-center justify-center',
                  'rounded-lg px-8 py-4 font-semibold',
                  'transition-all duration-200',
                  'hover:brightness-110 hover:shadow-xl',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'active:scale-[0.98]',
                )}
                style={{
                  fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
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
