// @version 1.0.0
// @category about
// @name about-mission-values
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(2rem, 4vw + 1rem, 3.5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1vw + 0.75rem, 1.375rem)';
const VALUE_TITLE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)';
const SECTION_PADDING_Y = 'clamp(3rem, 8vw, 6rem)';
const SECTION_PADDING_X = 'clamp(1.5rem, 4vw, 5rem)';
const CONTENT_MAX_WIDTH = '72rem';
const MISSION_MAX_WIDTH = '48rem';
const ICON_SIZE = 48;
const ICON_CONTAINER_SIZE = 64;
const GLOW_MIX_PERCENT = '10%';
const ICON_BG_MIX_PERCENT = '12%';
const CARD_BORDER_MIX_PERCENT = '20%';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  text: string;
}

interface AboutMissionValuesProps {
  missionTitle: string;
  missionDescription: string;
  values: ValueItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function AboutMissionValues({
  missionTitle,
  missionDescription,
  values,
  className,
}: AboutMissionValuesProps) {
  const headingId = 'mission-values-heading';

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
      {/* Subtle radial glow behind mission header */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[50%] w-[80%] rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, color-mix(in srgb, var(--primary) ${GLOW_MIX_PERCENT}, transparent), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="relative mx-auto"
        style={{ maxWidth: CONTENT_MAX_WIDTH }}
      >
        {/* Mission Header */}
        <header className="text-center" style={{ maxWidth: MISSION_MAX_WIDTH, marginInline: 'auto' }}>
          <h2
            id={headingId}
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {missionTitle}
          </h2>

          <p
            className="mt-4 md:mt-6 leading-relaxed"
            style={{
              fontSize: SUBHEADLINE_CLAMP,
              color: 'var(--muted-foreground)',
            }}
          >
            {missionDescription}
          </p>
        </header>

        {/* Separator */}
        <div
          className="mx-auto mt-10 md:mt-14 h-px w-full max-w-md"
          style={{ backgroundColor: 'var(--border)' }}
          role="separator"
          aria-hidden="true"
        />

        {/* Values Grid */}
        <ul
          className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none p-0"
          role="list"
        >
          {values.map((value) => (
            <li
              key={value.title}
              className={cn(
                'group relative flex flex-col rounded-2xl p-6 md:p-8',
                'transition-shadow duration-300 motion-reduce:transition-none',
                'hover:shadow-lg',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: `color-mix(in srgb, var(--border) ${CARD_BORDER_MIX_PERCENT}, transparent)`,
              }}
            >
              {/* Icon */}
              <figure
                className="flex items-center justify-center rounded-xl"
                style={{
                  width: ICON_CONTAINER_SIZE,
                  height: ICON_CONTAINER_SIZE,
                  backgroundColor: `color-mix(in srgb, var(--primary) ${ICON_BG_MIX_PERCENT}, transparent)`,
                  color: 'var(--primary)',
                }}
                aria-hidden="true"
              >
                <span
                  className="flex items-center justify-center"
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
                >
                  {value.icon}
                </span>
              </figure>

              {/* Content */}
              <h3
                className="mt-5 font-semibold tracking-tight"
                style={{
                  fontSize: VALUE_TITLE_CLAMP,
                  color: 'var(--foreground)',
                }}
              >
                {value.title}
              </h3>

              <p
                className="mt-2 text-sm leading-relaxed md:text-base"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {value.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
