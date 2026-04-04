// @version 1.0.0
// @category testimonials
// @name testimonial-marquee
// @source self-authored

import Image from 'next/image';
import { cn } from '@/lib/utils';

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
}
`;

// ---------------------------------------------------------------------------
// Component (server component — pure CSS marquee animation)
// ---------------------------------------------------------------------------

export default function TestimonialMarquee({
  headline,
  subheadline,
  testimonials,
  durationSeconds = 30,
  direction = 'left',
  className,
}: TestimonialMarqueeProps) {
  const animationName =
    direction === 'left' ? 'marquee-scroll-left' : 'marquee-scroll-right';

  // Duplicate the list so the scroll loops seamlessly
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      className={cn('py-16 md:py-24 overflow-hidden', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* Header */}
      {(headline || subheadline) && (
        <div className="mx-auto max-w-3xl px-6 text-center mb-12">
          {headline && (
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--foreground)' }}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className="mt-4 text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {subheadline}
            </p>
          )}
        </div>
      )}

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-24"
          style={{
            background:
              'linear-gradient(to right, var(--background), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-24"
          style={{
            background:
              'linear-gradient(to left, var(--background), transparent)',
          }}
        />

        <div
          className="flex w-max gap-6"
          style={{
            animation: `${animationName} ${durationSeconds}s linear infinite`,
          }}
        >
          {doubled.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[320px] shrink-0 rounded-xl p-6"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <p
                className="text-sm leading-relaxed line-clamp-4"
                style={{ color: 'var(--card-foreground)' }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-4 flex items-center gap-3">
                {t.avatarSrc ? (
                  <Image
                    src={t.avatarSrc}
                    alt={t.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {t.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {t.name}
                  </p>
                  {(t.role || t.company) && (
                    <p
                      className="text-xs"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {[t.role, t.company].filter(Boolean).join(' @ ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
