// @version 1.0.0
// @category testimonials
// @name testimonial-featured-quote
// @source self-authored

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TestimonialFeaturedQuoteProps {
  quote: string;
  authorName: string;
  authorRole?: string;
  authorAvatarSrc?: string;
  companyLogoSrc?: string;
  companyLogoAlt?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes featured-quote-fade-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes featured-quote-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component (server component — no interactivity)
// ---------------------------------------------------------------------------

export default function TestimonialFeaturedQuote({
  quote,
  authorName,
  authorRole,
  authorAvatarSrc,
  companyLogoSrc,
  companyLogoAlt = 'Company logo',
  className,
}: TestimonialFeaturedQuoteProps) {
  return (
    <section
      className={cn(
        'relative py-20 md:py-32 px-6 md:px-12 lg:px-20',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div
        className="mx-auto max-w-4xl text-center"
        style={{ animation: 'featured-quote-fade-in 0.6s ease-out both' }}
      >
        {/* Company logo */}
        {companyLogoSrc && (
          <div className="mb-10 flex justify-center">
            <Image
              src={companyLogoSrc}
              alt={companyLogoAlt}
              width={120}
              height={40}
              className="h-8 w-auto object-contain opacity-60"
            />
          </div>
        )}

        {/* Decorative quotation mark */}
        <div className="relative">
          <svg
            className="mx-auto mb-6 h-10 w-10 md:h-12 md:w-12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ color: 'var(--primary)', opacity: 0.3 }}
          >
            <path
              d="M11 7H7.5C6.12 7 5 8.12 5 9.5v.5c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-.5c0-.28.22-.5.5-.5H11c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zm0 5H7.5c-.28 0-.5.22-.5.5V14c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1.5c0-.28-.22-.5-.5-.5zm8-5h-3.5C14.12 7 13 8.12 13 9.5v.5c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-.5c0-.28.22-.5.5-.5H19c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zm0 5h-3.5c-.28 0-.5.22-.5.5V14c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-1.5c0-.28-.22-.5-.5-.5z"
              fill="currentColor"
            />
          </svg>

          {/* Large decorative marks positioned behind quote */}
          <span
            className="pointer-events-none absolute -top-6 left-0 text-[120px] font-serif leading-none select-none hidden md:block"
            style={{ color: 'var(--primary)', opacity: 0.06 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <span
            className="pointer-events-none absolute -bottom-16 right-0 text-[120px] font-serif leading-none select-none hidden md:block"
            style={{ color: 'var(--primary)', opacity: 0.06 }}
            aria-hidden="true"
          >
            &rdquo;
          </span>

          <blockquote>
            <p
              className="text-xl font-medium leading-relaxed md:text-2xl lg:text-3xl"
              style={{ color: 'var(--foreground)' }}
            >
              &ldquo;{quote}&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Author */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {authorAvatarSrc && (
            <Image
              src={authorAvatarSrc}
              alt={authorName}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          )}

          <div>
            <p
              className="text-base font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              {authorName}
            </p>
            {authorRole && (
              <p
                className="mt-0.5 text-sm"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {authorRole}
              </p>
            )}
          </div>
        </div>

        {/* Decorative line */}
        <div
          className="mx-auto mt-8 h-px w-16"
          style={{ backgroundColor: 'var(--border)' }}
        />
      </div>
    </section>
  );
}
