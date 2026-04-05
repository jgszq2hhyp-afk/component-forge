// @version 1.0.0
// @category logo-cloud
// @name logo-cloud-static-grid
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.5rem, 3vw, 2.5rem)';
const SUBHEADLINE_CLAMP = 'clamp(0.9375rem, 1vw + 0.5rem, 1.125rem)';
const SECTION_PADDING_Y = 'clamp(3rem, 8vw, 6rem)';
const SECTION_PADDING_X = 'clamp(1.5rem, 4vw, 5rem)';
const CONTENT_MAX_WIDTH = '72rem';
const LOGO_HEIGHT = 44;
const LOGO_MAX_WIDTH = 160;
const LOGO_CELL_PADDING_Y = '1.5rem';
const LOGO_CELL_PADDING_X = '2rem';
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

interface LogoCloudStaticGridProps {
  headline: string;
  subheadline?: string;
  logos: LogoItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function LogoCloudStaticGrid({
  headline,
  subheadline,
  logos,
  className,
}: LogoCloudStaticGridProps) {
  const headingId = 'logo-cloud-grid-heading';

  return (
    <section
      aria-labelledby={headingId}
      className={cn('relative', className)}
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
        {/* Section Header */}
        <header className="text-center">
          <h2
            id={headingId}
            className="font-semibold tracking-tight"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>

          {subheadline && (
            <p
              className="mx-auto mt-3 max-w-xl leading-relaxed"
              style={{
                fontSize: SUBHEADLINE_CLAMP,
                color: 'var(--muted-foreground)',
              }}
            >
              {subheadline}
            </p>
          )}
        </header>

        {/* Logo Grid */}
        <ul
          className={cn(
            'mt-10 md:mt-14 grid gap-px list-none p-0',
            'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
          )}
          role="list"
          style={{
            backgroundColor: 'var(--border)',
            borderRadius: '1rem',
            overflow: 'hidden',
          }}
        >
          {logos.map((logo) => {
            const imageElement = (
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className={cn(
                  'block object-contain',
                  'grayscale opacity-50',
                  'transition-all duration-300 motion-reduce:transition-none',
                  'group-hover:grayscale-0 group-hover:opacity-100',
                )}
                style={{
                  height: LOGO_HEIGHT,
                  maxWidth: LOGO_MAX_WIDTH,
                }}
              />
            );

            return (
              <li
                key={logo.name}
                className="group flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--background)',
                  paddingBlock: LOGO_CELL_PADDING_Y,
                  paddingInline: LOGO_CELL_PADDING_X,
                }}
              >
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                    className={cn(
                      'inline-flex items-center justify-center rounded-md',
                      FOCUS_RING,
                    )}
                    style={{
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    {imageElement}
                  </a>
                ) : (
                  <figure
                    className="inline-flex items-center justify-center"
                    aria-label={logo.name}
                  >
                    {imageElement}
                  </figure>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
