// @version 2.0.0
// @category social-proof
// @name Logo Grid Static
// @source custom-implementation

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const DEFAULT_LOGO_WIDTH = 140;
const DEFAULT_LOGO_HEIGHT = 48;
const MAX_LOGO_WIDTH = 'max-w-[140px]';
const HEADING_CLAMP = 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)';
const LOGO_HEIGHT_SM = 'h-8';
const LOGO_HEIGHT_MD = 'sm:h-10';
const LOGO_PADDING = 'p-4';
const SECTION_PADDING_Y = 'py-12 sm:py-16';
const SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';
const HEADING_MARGIN_BOTTOM = 'mb-10';
const GRID_GAP = 'gap-8';
const RING_COLOR_VALUE = 'var(--ring, hsl(215 20% 65%))';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Logo {
  name: string;
  src: string;
  href?: string;
  width?: number;
  height?: number;
}

interface LogoGridStaticProps {
  logos?: Logo[];
  heading?: string;
  columns?: 3 | 4 | 5 | 6;
  grayscale?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const defaultLogos: Logo[] = [
  { name: 'Acme Corp', src: '/logos/acme.svg' },
  { name: 'Globex', src: '/logos/globex.svg' },
  { name: 'Initech', src: '/logos/initech.svg' },
  { name: 'Umbrella', src: '/logos/umbrella.svg' },
  { name: 'Hooli', src: '/logos/hooli.svg' },
  { name: 'Stark Industries', src: '/logos/stark.svg' },
];

const columnClasses: Record<3 | 4 | 5 | 6, string> = {
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function LogoGridStatic({
  logos = defaultLogos,
  heading = 'Trusted by industry leaders',
  columns = 4,
  grayscale = true,
  className,
}: LogoGridStaticProps) {
  return (
    <section
      className={cn(
        SECTION_PADDING_Y,
        'bg-[var(--logo-grid-bg,transparent)]',
        className,
      )}
      aria-label={heading ?? 'Partner-Logos'}
    >
      <div className={cn('mx-auto', SECTION_MAX_WIDTH, SECTION_PADDING_X)}>
        {heading && (
          <h2
            className={cn(
              HEADING_MARGIN_BOTTOM,
              'text-center font-medium uppercase tracking-wider',
              'text-[var(--logo-grid-heading-color,hsl(0_0%_45%))]',
            )}
            style={{ fontSize: HEADING_CLAMP }}
          >
            {heading}
          </h2>
        )}

        <ul
          className={cn(
            'grid items-center justify-items-center',
            GRID_GAP,
            columnClasses[columns],
          )}
          role="list"
        >
          {logos.map((logo) => {
            const imageElement = (
              <img
                src={logo.src}
                alt={`Logo von ${logo.name}`}
                width={logo.width ?? DEFAULT_LOGO_WIDTH}
                height={logo.height ?? DEFAULT_LOGO_HEIGHT}
                className={cn(
                  LOGO_HEIGHT_SM,
                  LOGO_HEIGHT_MD,
                  'w-auto object-contain',
                  MAX_LOGO_WIDTH,
                  'transition-all duration-300 motion-reduce:transition-none',
                  grayscale
                    ? 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100'
                    : 'opacity-60 hover:opacity-100',
                )}
                loading="lazy"
              />
            );

            if (logo.href) {
              return (
                <li key={logo.name}>
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-center rounded-lg',
                      LOGO_PADDING,
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    )}
                    style={{
                      ['--tw-ring-color' as string]: RING_COLOR_VALUE,
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                    aria-label={`${logo.name} besuchen (öffnet in neuem Tab)`}
                  >
                    {imageElement}
                  </a>
                </li>
              );
            }

            return (
              <li
                key={logo.name}
                className={cn('flex items-center justify-center', LOGO_PADDING)}
              >
                {imageElement}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
