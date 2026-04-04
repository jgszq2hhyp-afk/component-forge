// @version 1.0.0
// @category heroes
// @name hero-saas-landing
// @source https://dev.to/vaibhavg/shadcn-hero-sections-37af, https://prebuiltui.com/components/hero-section

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AvatarItem {
  src: string;
  alt: string;
}

interface HeroSaasLandingProps {
  badgeText?: string;
  headline: string;
  highlightedWord?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  avatars?: AvatarItem[];
  socialProofText?: string;
  screenshotSrc?: string;
  screenshotAlt?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hsl-fade-up {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@keyframes hsl-slide-up {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hsl-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hsl-slide-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroSaasLanding({
  badgeText,
  headline,
  highlightedWord,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  avatars = [],
  socialProofText,
  screenshotSrc,
  screenshotAlt = 'Product screenshot',
  className,
}: HeroSaasLandingProps) {
  // Optionally highlight a word in the headline with primary color
  const renderedHeadline = highlightedWord
    ? headline.split(highlightedWord).map((part, i, arr) =>
        i < arr.length - 1 ? (
          <span key={i}>
            {part}
            <span style={{ color: 'var(--primary)' }}>{highlightedWord}</span>
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )
    : headline;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Glow decoration */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[60%] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, color-mix(in srgb, var(--primary) 15%, transparent), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          {badgeText && (
            <div
              className="mb-6"
              style={{
                animation: 'hsl-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.05s',
              }}
            >
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5',
                  'text-xs font-medium tracking-wide',
                  'border',
                )}
                style={{
                  color: 'var(--primary)',
                  borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--primary) 8%, transparent)',
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--primary)' }}
                  aria-hidden="true"
                />
                {badgeText}
              </span>
            </div>
          )}

          {/* Headline */}
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw + 1rem, 4.5rem)',
              color: 'var(--foreground)',
              animation: 'hsl-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.15s',
            }}
          >
            {renderedHeadline}
          </h1>

          {/* Subheadline */}
          {subheadline && (
            <p
              className="mx-auto mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{
                color: 'var(--muted-foreground)',
                animation: 'hsl-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.3s',
              }}
            >
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          {(ctaText || secondaryCtaText) && (
            <div
              className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
              style={{
                animation: 'hsl-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.45s',
              }}
            >
              {ctaText && (
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
                </a>
              )}

              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'border transition-all duration-200',
                    'hover:brightness-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.98]',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'color-mix(in srgb, var(--foreground) 20%, transparent)',
                    ['--tw-ring-color' as string]: 'var(--foreground)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          )}

          {/* Social proof — avatar stack */}
          {(avatars.length > 0 || socialProofText) && (
            <div
              className="mt-8 flex items-center justify-center gap-3"
              style={{
                animation: 'hsl-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.6s',
              }}
            >
              {avatars.length > 0 && (
                <div className="flex -space-x-2">
                  {avatars.slice(0, 5).map((avatar, i) => (
                    <Image
                      key={i}
                      src={avatar.src}
                      alt={avatar.alt}
                      width={32}
                      height={32}
                      className="size-8 rounded-full object-cover ring-2"
                      style={{
                        ['--tw-ring-color' as string]: 'var(--background)',
                      }}
                    />
                  ))}
                </div>
              )}
              {socialProofText && (
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {socialProofText}
                </span>
              )}
            </div>
          )}

          {/* Product screenshot */}
          {screenshotSrc && (
            <div
              className="mt-14 md:mt-20 relative"
              style={{
                animation: 'hsl-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.7s',
              }}
            >
              <div
                className="overflow-hidden rounded-xl md:rounded-2xl"
                style={{
                  border: '1px solid color-mix(in srgb, var(--foreground) 10%, transparent)',
                  boxShadow:
                    '0 20px 60px -12px color-mix(in srgb, var(--foreground) 15%, transparent)',
                }}
              >
                <Image
                  src={screenshotSrc}
                  alt={screenshotAlt}
                  width={1200}
                  height={720}
                  className="w-full h-auto"
                />
              </div>
              {/* Fade out at bottom to blend into page */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 md:h-32"
                style={{
                  background: `linear-gradient(to top, var(--background), transparent)`,
                }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
