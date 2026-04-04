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
        'py-12 sm:py-16 bg-[var(--logo-grid-bg,transparent)]',
        className,
      )}
      aria-label={heading ?? 'Partner-Logos'}
    >
      <div className={`mx-auto ${SECTION_MAX_WIDTH} px-4 sm:px-6 lg:px-8`}>
        {heading && (
          <p
            className="mb-10 text-center font-medium uppercase tracking-wider text-[var(--logo-grid-heading-color,hsl(0_0%_45%))]"
            style={{ fontSize: HEADING_CLAMP }}
          >
            {heading}
          </p>
        )}

        <ul
          className={cn(
            'grid gap-8 items-center justify-items-center',
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
                  `h-8 sm:h-10 w-auto ${MAX_LOGO_WIDTH} object-contain transition-all duration-300 motion-reduce:transition-none`,
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
                      'flex items-center justify-center p-4',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg',
                    )}
                    style={{
                      ['--tw-ring-color' as string]: 'var(--primary)',
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
                className="flex items-center justify-center p-4"
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
