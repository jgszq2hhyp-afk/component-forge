// @version 1.0.0
// @category logo-cloud
// @name logo-cloud-scrolling
// @source custom

'use client';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.5rem, 3vw, 2.5rem)';
const SECTION_PADDING_Y = 'clamp(3rem, 8vw, 6rem)';
const SECTION_PADDING_X = 'clamp(1.5rem, 4vw, 5rem)';
const CONTENT_MAX_WIDTH = '72rem';
const LOGO_HEIGHT = 40;
const LOGO_MAX_WIDTH = 140;
const LOGO_GAP = 'clamp(2rem, 4vw, 4rem)';
const SCROLL_DURATION = '30s';
const FADE_MASK_WIDTH = '8rem';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LogoItem {
  name: string;
  src: string;
  href?: string;
}

interface LogoCloudScrollingProps {
  headline?: string;
  logos: LogoItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes lcs-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes lcs-scroll {
    from, to {
      transform: translateX(0);
    }
  }
}
`;

// ---------------------------------------------------------------------------
// Component ('use client' - CSS animation)
// ---------------------------------------------------------------------------

export default function LogoCloudScrolling({
  headline,
  logos,
  className,
}: LogoCloudScrollingProps) {
  const headingId = 'logo-cloud-scrolling-heading';

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-labelledby={headline ? headingId : undefined}
        aria-label={headline ? undefined : 'Partner logos'}
        className={cn('relative overflow-hidden', className)}
        style={{
          paddingBlock: SECTION_PADDING_Y,
          paddingInline: SECTION_PADDING_X,
          backgroundColor: 'var(--background)',
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: CONTENT_MAX_WIDTH }}
        >
          {/* Optional headline */}
          {headline && (
            <header className="text-center mb-10 md:mb-14">
              <h2
                id={headingId}
                className="font-semibold tracking-tight"
                style={{
                  fontSize: HEADING_CLAMP,
                  color: 'var(--muted-foreground)',
                }}
              >
                {headline}
              </h2>
            </header>
          )}
        </div>

        {/* Scrolling container */}
        <div
          className="relative"
          style={{
            maskImage: `linear-gradient(to right, transparent, black ${FADE_MASK_WIDTH}, black calc(100% - ${FADE_MASK_WIDTH}), transparent)`,
            WebkitMaskImage: `linear-gradient(to right, transparent, black ${FADE_MASK_WIDTH}, black calc(100% - ${FADE_MASK_WIDTH}), transparent)`,
          }}
        >
          <div
            className="flex w-max items-center"
            style={{
              gap: LOGO_GAP,
              animation: `lcs-scroll ${SCROLL_DURATION} linear infinite`,
            }}
            aria-hidden="true"
          >
            {duplicatedLogos.map((logo, index) => {
              const LogoImage = (
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="block object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 motion-reduce:transition-none"
                  style={{
                    height: LOGO_HEIGHT,
                    maxWidth: LOGO_MAX_WIDTH,
                    filter: 'grayscale(100%)',
                  }}
                />
              );

              if (logo.href) {
                return (
                  <a
                    key={`${logo.name}-${index}`}
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex shrink-0 items-center',
                      'rounded-md',
                      FOCUS_RING,
                    )}
                    style={{
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                    tabIndex={-1}
                  >
                    {LogoImage}
                  </a>
                );
              }

              return (
                <span
                  key={`${logo.name}-${index}`}
                  className="inline-flex shrink-0 items-center"
                >
                  {LogoImage}
                </span>
              );
            })}
          </div>
        </div>

        {/* Screen-reader accessible list */}
        <ul className="sr-only" role="list">
          {logos.map((logo) => (
            <li key={logo.name}>{logo.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
