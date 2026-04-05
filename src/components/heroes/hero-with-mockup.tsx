// @version 2.0.0
// @category heroes
// @name hero-with-mockup
// @source https://dev.to/vaibhavg/shadcn-hero-sections-37af, https://prebuiltui.com/components/hero-section

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FADE_DURATION = '0.9s';
const FLOAT_DURATION = '6s';
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const TEXT_DELAY = '0.1s';
const MOCKUP_ENTRANCE_DELAY = '0.3s';
const MOCKUP_FLOAT_DELAY = '1.2s';
const HEADING_CLAMP = 'clamp(2.25rem, 4vw + 1rem, 4.25rem)';
const ACTIVE_SCALE = '0.98';
const CTA_FONT_SIZE = '0.9375rem';
const PHONE_WIDTH = 320;
const PHONE_HEIGHT = 640;
const DESKTOP_WIDTH = 1200;
const DESKTOP_HEIGHT = 720;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MockupType = 'browser' | 'phone' | 'laptop';

interface HeroWithMockupProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  mockupType?: MockupType;
  screenshotSrc: string;
  screenshotAlt: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hwm-fade-left {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
}

@keyframes hwm-fade-right {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
}

@keyframes hwm-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hwm-fade-left {
    from, to { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hwm-fade-right {
    from, to { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hwm-float {
    from, to { transform: none; }
  }
}
`;

// ---------------------------------------------------------------------------
// Mockup frames
// ---------------------------------------------------------------------------

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        border: '1px solid color-mix(in srgb, var(--foreground) 12%, transparent)',
        boxShadow: '0 20px 60px -12px color-mix(in srgb, var(--foreground) 15%, transparent)',
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--foreground) 5%, var(--background))',
          borderBottom: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
        }}
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 15%, transparent)' }} />
          <span className="size-2.5 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 15%, transparent)' }} />
          <span className="size-2.5 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 15%, transparent)' }} />
        </div>
        <div
          className="mx-auto h-6 w-48 rounded-md"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--foreground) 6%, transparent)',
          }}
        />
      </div>
      {children}
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto max-w-[280px] md:max-w-[320px] overflow-hidden rounded-[2rem] p-2"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--foreground) 8%, var(--background))',
        boxShadow: '0 20px 60px -12px color-mix(in srgb, var(--foreground) 15%, transparent)',
      }}
    >
      {/* Notch */}
      <div className="relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 rounded-b-2xl z-10"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--foreground) 8%, var(--background))',
          }}
          aria-hidden="true"
        />
        <div className="overflow-hidden rounded-[1.5rem]">{children}</div>
      </div>
    </div>
  );
}

function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      {/* Screen */}
      <div
        className="overflow-hidden rounded-t-xl w-full"
        style={{
          border: '2px solid color-mix(in srgb, var(--foreground) 12%, transparent)',
          borderBottom: 'none',
          boxShadow: '0 -8px 40px -12px color-mix(in srgb, var(--foreground) 10%, transparent)',
        }}
      >
        {children}
      </div>
      {/* Base */}
      <div
        className="h-3 w-[105%] rounded-b-lg"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--foreground) 10%, var(--background))',
          borderTop: '1px solid color-mix(in srgb, var(--foreground) 15%, transparent)',
        }}
        aria-hidden="true"
      />
      <div
        className="h-1 w-[40%] rounded-b-md"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--foreground) 8%, var(--background))',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

const frames: Record<MockupType, React.ComponentType<{ children: React.ReactNode }>> = {
  browser: BrowserFrame,
  phone: PhoneFrame,
  laptop: LaptopFrame,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroWithMockup({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  mockupType = 'browser',
  screenshotSrc,
  screenshotAlt,
  className,
}: HeroWithMockupProps) {
  const Frame = frames[mockupType];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Product hero with mockup"
        className={cn(
          'relative overflow-hidden',
          'px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-32',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div
          className={cn(
            'mx-auto grid max-w-7xl grid-cols-1 items-center gap-10',
            mockupType === 'phone'
              ? 'lg:grid-cols-[1fr_auto]'
              : 'lg:grid-cols-2 lg:gap-16',
          )}
        >
          {/* Text side */}
          <header
            className="flex flex-col justify-center"
            style={{
              animation: `hwm-fade-left ${FADE_DURATION} ${EASING} both`,
              animationDelay: TEXT_DELAY,
            }}
          >
            <h1
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
              }}
            >
              {headline}
            </h1>

            {subheadline && (
              <p
                className="mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-lg"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subheadline}
              </p>
            )}

            {(ctaText || secondaryCtaText) && (
              <nav aria-label="Call to action" className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                {ctaText && (
                  <a
                    href={ctaHref}
                    className={cn(
                      'inline-flex items-center justify-center',
                      `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                      'transition-all duration-200',
                      'hover:brightness-110 hover:shadow-lg',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      `active:scale-[${ACTIVE_SCALE}]`,
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
                      `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                      'border transition-all duration-200',
                      'hover:brightness-110',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      `active:scale-[${ACTIVE_SCALE}]`,
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
              </nav>
            )}
          </header>

          {/* Mockup side */}
          <figure
            aria-label={screenshotAlt}
            style={{
              animation: `hwm-fade-right ${FADE_DURATION} ${EASING} both, hwm-float ${FLOAT_DURATION} ease-in-out infinite`,
              animationDelay: `${MOCKUP_ENTRANCE_DELAY}, ${MOCKUP_FLOAT_DELAY}`,
            }}
          >
            <Frame>
              <Image
                src={screenshotSrc}
                alt={screenshotAlt}
                width={mockupType === 'phone' ? PHONE_WIDTH : DESKTOP_WIDTH}
                height={mockupType === 'phone' ? PHONE_HEIGHT : DESKTOP_HEIGHT}
                className="w-full h-auto"
              />
            </Frame>
          </figure>
        </div>
      </section>
    </>
  );
}
