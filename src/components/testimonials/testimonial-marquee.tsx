// @version 2.0.0
// @category testimonials
// @name testimonial-marquee
// @source self-authored

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-3xl';
const HEADING_CLAMP = 'clamp(1.875rem, 2.5vw + 1rem, 3rem)';
const CARD_WIDTH = 'w-[320px]';
const CARD_RADIUS = 'rounded-xl';
const CARD_PADDING = 'p-6';
const AVATAR_SIZE_PX = 36;
const AVATAR_FALLBACK_SIZE = 'h-9 w-9';
const INITIALS_MAX_LENGTH = 2;
const FADE_EDGE_WIDTH = 'w-16 md:w-24';
const DEFAULT_DURATION_S = 30;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MarqueeTestimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
}

interface TestimonialMarqueeProps {
  headline?: string;
  subheadline?: string;
  testimonials: MarqueeTestimonial[];
  /** Duration for one full scroll cycle in seconds. */
  durationSeconds?: number;
  /** Scroll direction */
  direction?: 'left' | 'right';
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes marquee-scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes marquee-scroll-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes marquee-scroll-left {
    from, to { transform: translateX(0); }
  }
  @keyframes marquee-scroll-right {
    from, to { transform: translateX(0); }
  }

  .marquee-track {
    animation-play-state: paused !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, INITIALS_MAX_LENGTH)
    .toUpperCase();
}

// ---------------------------------------------------------------------------
// Component (Server Component — pure CSS marquee animation)
// ---------------------------------------------------------------------------

export default function TestimonialMarquee({
  headline,
  subheadline,
  testimonials,
  durationSeconds = DEFAULT_DURATION_S,
  direction = 'left',
  className,
}: TestimonialMarqueeProps) {
  const animationName =
    direction === 'left' ? 'marquee-scroll-left' : 'marquee-scroll-right';

  // Duplicate the list so the scroll loops seamlessly
  const doubled = [...testimonials, ...testimonials];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Kundenstimmen'}
        className={cn('py-16 md:py-24 overflow-hidden', className)}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={`mx-auto ${SECTION_MAX_WIDTH} px-6 text-center mb-12`}>
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--foreground)',
                  fontSize: HEADING_CLAMP,
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Marquee track */}
        <div className="relative" role="marquee" aria-label="Scrollende Kundenstimmen">
          {/* Fade edges */}
          <div
            className={cn('pointer-events-none absolute left-0 top-0 z-10 h-full', FADE_EDGE_WIDTH)}
            style={{
              background: 'linear-gradient(to right, var(--background), transparent)',
            }}
            aria-hidden="true"
          />
          <div
            className={cn('pointer-events-none absolute right-0 top-0 z-10 h-full', FADE_EDGE_WIDTH)}
            style={{
              background: 'linear-gradient(to left, var(--background), transparent)',
            }}
            aria-hidden="true"
          />

          <div
            className="marquee-track flex w-max gap-6"
            style={{
              animation: `${animationName} ${durationSeconds}s linear infinite`,
            }}
          >
            {doubled.map((t, i) => (
              <article
                key={`${t.name}-${i}`}
                className={cn(
                  'shrink-0',
                  CARD_WIDTH,
                  CARD_RADIUS,
                  CARD_PADDING,
                )}
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <blockquote
                  className="text-sm leading-relaxed line-clamp-4"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>

                <footer className="mt-4 flex items-center gap-3">
                  {t.avatarSrc ? (
                    <Image
                      src={t.avatarSrc}
                      alt={`Profilbild von ${t.name}`}
                      width={AVATAR_SIZE_PX}
                      height={AVATAR_SIZE_PX}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={cn(
                        'flex items-center justify-center rounded-full text-xs font-bold',
                        AVATAR_FALLBACK_SIZE,
                      )}
                      style={{
                        backgroundColor: 'var(--muted)',
                        color: 'var(--muted-foreground)',
                      }}
                      aria-hidden="true"
                    >
                      {getInitials(t.name)}
                    </div>
                  )}

                  <div>
                    <cite
                      className="text-sm font-semibold not-italic"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {t.name}
                    </cite>
                    {(t.role || t.company) && (
                      <p
                        className="text-xs"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {[t.role, t.company].filter(Boolean).join(' @ ')}
                      </p>
                    )}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
