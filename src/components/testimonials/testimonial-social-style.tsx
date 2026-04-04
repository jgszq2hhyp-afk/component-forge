// @version 1.0.0
// @category testimonials
// @name testimonial-social-style
// @source self-authored

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SocialTestimonial {
  text: string;
  authorName: string;
  authorHandle?: string;
  authorAvatarSrc?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  date?: string;
}

interface TestimonialSocialStyleProps {
  headline?: string;
  subheadline?: string;
  testimonials: SocialTestimonial[];
  columns?: 2 | 3;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes social-card-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes social-card-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Star component
// ---------------------------------------------------------------------------

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      style={{ color: 'var(--primary)' }}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rating} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component (server component — no interactivity)
// ---------------------------------------------------------------------------

export default function TestimonialSocialStyle({
  headline,
  subheadline,
  testimonials,
  columns = 3,
  className,
}: TestimonialSocialStyleProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      className={cn('py-16 md:py-24 px-6 md:px-12 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* Header */}
      {(headline || subheadline) && (
        <div className="mx-auto max-w-3xl text-center mb-12">
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

      {/* Grid */}
      <div className={cn('mx-auto max-w-7xl grid gap-6', gridCols)}>
        {testimonials.map((t, i) => (
          <article
            key={`${t.authorName}-${i}`}
            className="rounded-xl p-5"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              animation: `social-card-in 0.4s ease-out ${i * 0.08}s both`,
            }}
          >
            {/* Author header */}
            <div className="flex items-center gap-3">
              {t.authorAvatarSrc ? (
                <Image
                  src={t.authorAvatarSrc}
                  alt={t.authorName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: 'var(--muted)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {t.authorName
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: 'var(--foreground)' }}
                >
                  {t.authorName}
                </p>
                {t.authorHandle && (
                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {t.authorHandle}
                  </p>
                )}
              </div>

              {/* Social icon placeholder */}
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c.01.14.01.28.01.42 0 4.25-3.24 9.15-9.15 9.15-1.82 0-3.51-.53-4.93-1.44.25.03.52.04.78.04 1.51 0 2.89-.51 3.99-1.38-1.41-.03-2.6-.96-3.01-2.24.2.03.4.05.61.05.29 0 .58-.04.85-.11C4.27 13.04 3.12 11.67 3.12 10.03v-.04c.44.24.94.39 1.47.41-.86-.58-1.43-1.56-1.43-2.68 0-.59.16-1.14.44-1.61 1.58 1.94 3.95 3.22 6.62 3.35-.05-.24-.08-.48-.08-.73 0-1.77 1.44-3.21 3.21-3.21.92 0 1.76.39 2.35 1.02.73-.14 1.42-.41 2.05-.78-.24.75-.75 1.38-1.42 1.78.65-.08 1.28-.25 1.86-.51-.44.65-.99 1.22-1.63 1.68z" />
              </svg>
            </div>

            {/* Rating */}
            {t.rating && (
              <div className="mt-3">
                <StarRating rating={t.rating} />
              </div>
            )}

            {/* Text content */}
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: 'var(--card-foreground)' }}
            >
              {t.text}
            </p>

            {/* Date */}
            {t.date && (
              <p
                className="mt-3 text-xs"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {t.date}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
