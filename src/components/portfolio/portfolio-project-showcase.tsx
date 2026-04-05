// @version 1.0.0
// @category portfolio
// @name Portfolio Project Showcase
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = 'clamp(1.75rem, 4vw, 3rem)';
const DESCRIPTION_CLAMP = 'clamp(1rem, 1.5vw + 0.5rem, 1.125rem)';
const STAT_VALUE_CLAMP = 'clamp(1.5rem, 3vw, 2.25rem)';
const IMAGE_BORDER_RADIUS = 'rounded-2xl';
const IMAGE_SPLIT_RATIO = 'lg:col-span-3'; // 60% in 5-col grid
const TEXT_SPLIT_RATIO = 'lg:col-span-2'; // 40% in 5-col grid
const SECTION_PADDING = 'py-16 sm:py-24';
const MAX_WIDTH = 'max-w-7xl';
const TRANSITION_DURATION = 'duration-300';
const ARROW_SIZE = 16;
const ARROW_STROKE = 2;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ProjectStat {
  label: string;
  value: string;
}

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  tags?: string[];
  client?: string;
  year?: string;
  ctaLabel?: string;
  ctaHref?: string;
  stats?: ProjectStat[];
}

interface PortfolioProjectShowcaseProps {
  project: Project;
  imagePosition?: 'left' | 'right';
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ARROW_SIZE}
      height={ARROW_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ARROW_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        'ml-2 transition-transform',
        TRANSITION_DURATION,
        'group-hover:translate-x-1',
        'motion-reduce:!transition-none motion-reduce:!translate-x-0'
      )}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function StatItem({ stat }: { stat: ProjectStat }) {
  return (
    <div className="text-center">
      <p
        className="font-bold text-[var(--foreground,hsl(0_0%_9%))]"
        style={{ fontSize: STAT_VALUE_CLAMP }}
      >
        {stat.value}
      </p>
      <p className="mt-1 text-sm text-[var(--muted-foreground,hsl(0_0%_40%))]">
        {stat.label}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function PortfolioProjectShowcase({
  project,
  imagePosition = 'left',
  className,
}: PortfolioProjectShowcaseProps) {
  const isReversed = imagePosition === 'right';

  return (
    <section
      className={cn(
        SECTION_PADDING,
        'bg-[var(--background,hsl(0_0%_100%))]',
        className
      )}
      aria-labelledby="showcase-heading"
    >
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', MAX_WIDTH)}>
        <div
          className={cn(
            'grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-16',
            isReversed && 'lg:[direction:rtl]'
          )}
        >
          {/* Image */}
          <div className={cn(IMAGE_SPLIT_RATIO, isReversed && 'lg:[direction:ltr]')}>
            <div
              className={cn(
                'relative overflow-hidden',
                IMAGE_BORDER_RADIUS,
                'border border-[var(--border,hsl(0_0%_0%/0.08))]',
                'shadow-lg'
              )}
            >
              <div className="aspect-[16/10]">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt ?? project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className={cn(TEXT_SPLIT_RATIO, isReversed && 'lg:[direction:ltr]')}>
            {/* Meta: client + year */}
            {(project.client || project.year) && (
              <div className="mb-4 flex items-center gap-3 text-sm text-[var(--muted-foreground,hsl(0_0%_40%))]">
                {project.client && (
                  <span>
                    <span className="sr-only">Client: </span>
                    {project.client}
                  </span>
                )}
                {project.client && project.year && (
                  <span aria-hidden="true" className="text-[var(--border,hsl(0_0%_0%/0.2))]">
                    /
                  </span>
                )}
                {project.year && (
                  <time>
                    <span className="sr-only">Year: </span>
                    {project.year}
                  </time>
                )}
              </div>
            )}

            {/* Title */}
            <h2
              id="showcase-heading"
              className="font-bold tracking-tight text-[var(--foreground,hsl(0_0%_9%))]"
              style={{ fontSize: HEADING_CLAMP }}
            >
              {project.title}
            </h2>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Project tags">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className={cn(
                      'inline-block rounded-full px-3 py-1 text-xs font-medium',
                      'bg-[var(--primary,hsl(220_90%_56%))]',
                      'text-[var(--primary-foreground,hsl(0_0%_100%))]'
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p
              className="mt-5 leading-relaxed text-[var(--muted-foreground,hsl(0_0%_40%))]"
              style={{ fontSize: DESCRIPTION_CLAMP }}
            >
              {project.description}
            </p>

            {/* Stats */}
            {project.stats && project.stats.length > 0 && (
              <div
                className={cn(
                  'mt-8 grid gap-6',
                  project.stats.length === 2 && 'grid-cols-2',
                  project.stats.length === 3 && 'grid-cols-3',
                  project.stats.length >= 4 && 'grid-cols-2 sm:grid-cols-4'
                )}
                role="list"
                aria-label="Project statistics"
              >
                {project.stats.map((stat) => (
                  <div key={stat.label} role="listitem">
                    <StatItem stat={stat} />
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {project.ctaHref && (
              <div className="mt-8">
                <a
                  href={project.ctaHref}
                  className={cn(
                    'group inline-flex items-center',
                    'rounded-lg px-6 py-3 text-sm font-semibold',
                    'bg-[var(--primary,hsl(220_90%_56%))]',
                    'text-[var(--primary-foreground,hsl(0_0%_100%))]',
                    'hover:bg-[var(--primary-hover,hsl(220_90%_48%))]',
                    'transition-colors',
                    TRANSITION_DURATION,
                    'motion-reduce:!transition-none',
                    FOCUS_RING
                  )}
                  style={{
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  }}
                >
                  {project.ctaLabel ?? 'View Project'}
                  <ArrowIcon />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
