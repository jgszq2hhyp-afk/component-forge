// @version 1.0.0
// @category heroes
// @name hero-gradient-animated
// @source https://ui.aceternity.com/components/background-gradient-animation

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroGradientAnimatedProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  interactive?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hga-move-horizontal {
  0%   { transform: translateX(-50%) translateY(-10%); }
  50%  { transform: translateX(50%) translateY(10%); }
  100% { transform: translateX(-50%) translateY(-10%); }
}

@keyframes hga-move-circle {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

@keyframes hga-move-vertical {
  0%   { transform: translateY(-50%); }
  50%  { transform: translateY(50%); }
  100% { transform: translateY(-50%); }
}

@keyframes hga-fade-up {
  from {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hga-move-horizontal {
    0%, 100% { transform: translateX(0) translateY(0); }
  }
  @keyframes hga-move-circle {
    0%, 100% { transform: rotate(0deg); }
  }
  @keyframes hga-move-vertical {
    0%, 100% { transform: translateY(0); }
  }
  @keyframes hga-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Gradient blob config
// ---------------------------------------------------------------------------

interface BlobConfig {
  animation: string;
  duration: string;
  cssVar: string;
}

const blobs: BlobConfig[] = [
  { animation: 'hga-move-vertical', duration: '30s', cssVar: '--hga-first' },
  { animation: 'hga-move-circle', duration: '20s', cssVar: '--hga-second' },
  { animation: 'hga-move-horizontal', duration: '40s', cssVar: '--hga-third' },
  { animation: 'hga-move-circle', duration: '25s', cssVar: '--hga-fourth' },
  { animation: 'hga-move-vertical', duration: '35s', cssVar: '--hga-fifth' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroGradientAnimated({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  interactive = true,
  className,
}: HeroGradientAnimatedProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    function handleMouseMove(e: MouseEvent) {
      if (!interactiveRef.current) return;
      const rect = interactiveRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      interactiveRef.current.style.transform = `translate(${e.clientX - rect.left - rect.width / 2}px, ${e.clientY - rect.top - rect.height / 2}px)`;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{
          /* Gradient blobs use CSS vars from the theme */
          '--hga-first': 'var(--primary)',
          '--hga-second': 'color-mix(in srgb, var(--primary) 60%, var(--background))',
          '--hga-third': 'color-mix(in srgb, var(--primary) 40%, var(--foreground) 10%)',
          '--hga-fourth': 'color-mix(in srgb, var(--primary) 80%, var(--background))',
          '--hga-fifth': 'color-mix(in srgb, var(--primary) 30%, var(--background))',
          backgroundColor: 'var(--background)',
        } as React.CSSProperties}
      >
        {/* Animated gradient blobs */}
        <div
          className="absolute inset-0"
          style={{ filter: 'blur(80px)' }}
          aria-hidden="true"
        >
          {blobs.map((blob, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-hard-light"
              style={{
                width: '50%',
                height: '50%',
                top: `${15 + i * 12}%`,
                left: `${10 + i * 15}%`,
                backgroundColor: `var(${blob.cssVar})`,
                opacity: 0.25,
                animation: `${blob.animation} ${blob.duration} ease-in-out infinite`,
              }}
            />
          ))}

          {/* Interactive blob follows cursor */}
          {interactive && (
            <div
              ref={interactiveRef}
              className="absolute top-1/2 left-1/2 rounded-full mix-blend-hard-light transition-transform duration-300 ease-out"
              style={{
                width: '40%',
                height: '40%',
                backgroundColor: 'var(--hga-first)',
                opacity: 0.15,
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center">
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)',
              color: 'var(--foreground)',
              animation: 'hga-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
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
                animation: 'hga-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.3s',
              }}
            >
              {subheadline}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <div
              className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
              style={{
                animation: 'hga-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.45s',
              }}
            >
              {ctaText && (
                <a
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'backdrop-blur-sm transition-all duration-200',
                    'hover:brightness-110 hover:shadow-lg',
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
              )}

              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'border backdrop-blur-md transition-all duration-200',
                    'hover:brightness-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.98]',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'color-mix(in srgb, var(--foreground) 30%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--background) 30%, transparent)',
                    ['--tw-ring-color' as string]: 'var(--foreground)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
