// @version 1.0.0
// @category heroes
// @name hero-split-image
// @score pending
// @csv-refs landing:1, products:general

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroSplitImageProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles (injected once via <style>)
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hero-split-slide-left {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateX(-48px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
}

@keyframes hero-split-slide-right {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateX(48px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
}

@keyframes hero-split-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hero-split-slide-left {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hero-split-slide-right {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hero-split-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroSplitImage({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  imageSrc,
  imageAlt,
  reversed = false,
  className,
}: HeroSplitImageProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative min-h-[70vh]',
          'px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-32',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div
          className={cn(
            'mx-auto grid max-w-7xl grid-cols-1 items-center gap-8',
            'lg:grid-cols-2 lg:gap-16',
          )}
        >
          {/* ---------------------------------------------------------------- */}
          {/* Text side                                                        */}
          {/* ---------------------------------------------------------------- */}
          <div
            className={cn(
              'flex flex-col justify-center',
              reversed && 'lg:order-last',
            )}
            style={{
              animation:
                'hero-split-slide-left 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.1s',
            }}
          >
            {/* Headline */}
            <h1
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: 'clamp(2.25rem, 4vw + 1rem, 4.25rem)',
                color: 'var(--foreground)',
              }}
            >
              {headline}
            </h1>

            {/* Subheadline */}
            {subheadline && (
              <p
                className="mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-lg"
                style={{
                  color: 'var(--muted-foreground)',
                  animation:
                    'hero-split-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.3s',
                }}
              >
                {subheadline}
              </p>
            )}

            {/* CTA */}
            {ctaText && (
              <div
                className="mt-8 md:mt-10"
                style={{
                  animation:
                    'hero-split-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.5s',
                }}
              >
                <a
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'transition-all duration-200',
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
                  <svg
                    className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.333 8h9.334M8.667 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Image side                                                       */}
          {/* ---------------------------------------------------------------- */}
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl',
              reversed && 'lg:order-first',
            )}
            style={{
              animation:
                'hero-split-slide-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.25s',
              boxShadow:
                '0 8px 30px color-mix(in srgb, var(--foreground) 8%, transparent)',
            }}
          >
            <div
              className={cn(
                'relative w-full',
                'aspect-[16/9] lg:aspect-[4/3]',
                'transition-transform duration-500 ease-out',
                'hover:scale-[1.02]',
              )}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
