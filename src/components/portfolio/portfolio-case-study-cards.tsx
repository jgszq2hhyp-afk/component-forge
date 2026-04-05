// @version 1.0.0
// @category portfolio
// @name Portfolio Case Study Cards
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const IMAGE_ASPECT = 'aspect-[4/3]';
const IMAGE_HOVER_SCALE = 1.05;
const GRID_GAP = 'gap-8';
const HEADING_CLAMP = 'clamp(1.75rem, 4vw, 2.5rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 1.5vw + 0.5rem, 1.125rem)';
const CARD_TITLE_CLAMP = 'clamp(1.125rem, 2vw, 1.375rem)';
const DESCRIPTION_LINE_CLAMP = 3;
const OVERLAY_OPACITY = 0.7;
const TRANSITION_DURATION = 'duration-500';
const SECTION_PADDING = 'py-16 sm:py-24';
const MAX_WIDTH = 'max-w-7xl';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface CaseStudyProject {
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
}

interface PortfolioCaseStudyCardsProps {
  headline?: string;
  subheadline?: string;
  projects: CaseStudyProject[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function CaseStudyCard({ project }: { project: CaseStudyProject }) {
  const card = (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        'bg-[var(--card,hsl(0_0%_100%))]',
        'border border-[var(--border,hsl(0_0%_0%/0.08))]',
        'shadow-sm hover:shadow-xl',
        'transition-shadow',
        TRANSITION_DURATION,
        'motion-reduce:transition-none'
      )}
    >
      {/* Image */}
      <div className={cn(IMAGE_ASPECT, 'relative overflow-hidden')}>
        <Image
          src={project.imageSrc}
          alt={project.imageAlt ?? project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover',
            'transition-transform',
            TRANSITION_DURATION,
            'group-hover:scale-[var(--case-study-hover-scale)]',
            'motion-reduce:!scale-100 motion-reduce:!transition-none'
          )}
          style={{
            ['--case-study-hover-scale' as string]: IMAGE_HOVER_SCALE,
          }}
        />

        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-[var(--primary,hsl(220_90%_56%))]',
            'opacity-0 group-hover:opacity-[var(--case-study-overlay-opacity)]',
            'transition-opacity',
            TRANSITION_DURATION,
            'motion-reduce:!transition-none'
          )}
          style={{
            ['--case-study-overlay-opacity' as string]: OVERLAY_OPACITY,
          }}
          aria-hidden="true"
        >
          <span className="text-[var(--primary-foreground,hsl(0_0%_100%))] font-semibold text-sm tracking-wide uppercase">
            View Case Study
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1 text-xs font-medium',
            'bg-[var(--primary,hsl(220_90%_56%))]',
            'text-[var(--primary-foreground,hsl(0_0%_100%))]'
          )}
        >
          {project.category}
        </span>

        <h3
          className="mt-3 font-bold text-[var(--foreground,hsl(0_0%_9%))]"
          style={{ fontSize: CARD_TITLE_CLAMP }}
        >
          {project.title}
        </h3>

        <p
          className={cn(
            'mt-2 text-sm leading-relaxed',
            'text-[var(--muted-foreground,hsl(0_0%_40%))]'
          )}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: DESCRIPTION_LINE_CLAMP,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>
      </div>
    </article>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        className={cn(
          'block rounded-2xl',
          FOCUS_RING,
          'transition-transform',
          TRANSITION_DURATION,
          'motion-reduce:!transition-none'
        )}
        style={{
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
      >
        {card}
      </a>
    );
  }

  return card;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function PortfolioCaseStudyCards({
  headline = 'Case Studies',
  subheadline = 'Explore our latest projects and see how we deliver results.',
  projects,
  className,
}: PortfolioCaseStudyCardsProps) {
  return (
    <section
      className={cn(
        SECTION_PADDING,
        'bg-[var(--background,hsl(0_0%_100%))]',
        className
      )}
      aria-labelledby={headline ? 'case-study-heading' : undefined}
    >
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', MAX_WIDTH)}>
        {/* Header */}
        {(headline || subheadline) && (
          <header className="mx-auto mb-12 max-w-2xl text-center">
            {headline && (
              <h2
                id="case-study-heading"
                className="font-bold tracking-tight text-[var(--foreground,hsl(0_0%_9%))]"
                style={{ fontSize: HEADING_CLAMP }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 text-[var(--muted-foreground,hsl(0_0%_40%))]"
                style={{ fontSize: SUBHEADING_CLAMP }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Grid */}
        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            GRID_GAP
          )}
        >
          {projects.map((project, index) => (
            <CaseStudyCard
              key={`${project.title}-${index}`}
              project={project}
            />
          ))}
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="py-16 text-center" role="status">
            <p className="text-sm text-[var(--muted-foreground,hsl(0_0%_40%))]">
              No case studies available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
