// @version 2.0.0
// @category testimonials
// @name testimonial-featured-quote
// @source self-authored

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-4xl';
const HEADING_CLAMP = 'clamp(1.25rem, 1.5vw + 0.75rem, 1.875rem)';
const COMPANY_LOGO_WIDTH = 120;
const COMPANY_LOGO_HEIGHT = 40;
const COMPANY_LOGO_DISPLAY_HEIGHT = 'h-8';
const AVATAR_SIZE_PX = 56;
const QUOTE_ICON_SIZE = 'h-10 w-10 md:h-12 md:w-12';
const DECORATIVE_QUOTE_SIZE = 'text-[120px]';
const DECORATIVE_LINE_WIDTH = 'w-16';
const ANIMATION_DURATION = '0.6s';
const ANIMATION_EASING = 'ease-out';

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
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes featured-quote-fade-in {
    from, to {
      opacity: 1;
      transform: none;
    }
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component (Server Component — no client interactivity needed)
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
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={`Kundenstimme von ${authorName}`}
        className={cn(
          'relative py-20 md:py-32 px-6 md:px-12 lg:px-20',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div
          className={`mx-auto ${SECTION_MAX_WIDTH} text-center`}
          style={{
            animation: `featured-quote-fade-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
          }}
        >
          {/* Company logo */}
          {companyLogoSrc && (
            <div className="mb-10 flex justify-center">
              <Image
                src={companyLogoSrc}
                alt={companyLogoAlt}
                width={COMPANY_LOGO_WIDTH}
                height={COMPANY_LOGO_HEIGHT}
                className={`${COMPANY_LOGO_DISPLAY_HEIGHT} w-auto object-contain opacity-60`}
              />
            </div>
          )}

          {/* Decorative quotation mark */}
          <figure className="relative">
            <svg
              className={cn('mx-auto mb-6', QUOTE_ICON_SIZE)}
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
              className={cn(
                'pointer-events-none absolute -top-6 left-0 font-serif leading-none select-none hidden md:block',
                DECORATIVE_QUOTE_SIZE,
              )}
              style={{ color: 'var(--primary)', opacity: 0.06 }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <span
              className={cn(
                'pointer-events-none absolute -bottom-16 right-0 font-serif leading-none select-none hidden md:block',
                DECORATIVE_QUOTE_SIZE,
              )}
              style={{ color: 'var(--primary)', opacity: 0.06 }}
              aria-hidden="true"
            >
              &rdquo;
            </span>

            <blockquote>
              <p
                className="font-medium leading-relaxed"
                style={{
                  color: 'var(--foreground)',
                  fontSize: HEADING_CLAMP,
                }}
              >
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <figcaption className="mt-10 flex flex-col items-center gap-4">
              {authorAvatarSrc && (
                <Image
                  src={authorAvatarSrc}
                  alt={`Profilbild von ${authorName}`}
                  width={AVATAR_SIZE_PX}
                  height={AVATAR_SIZE_PX}
                  className="rounded-full object-cover"
                />
              )}

              <div>
                <cite
                  className="text-base font-semibold not-italic"
                  style={{ color: 'var(--foreground)' }}
                >
                  {authorName}
                </cite>
                {authorRole && (
                  <p
                    className="mt-0.5 text-sm"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {authorRole}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>

          {/* Decorative line */}
          <div
            className={cn('mx-auto mt-8 h-px', DECORATIVE_LINE_WIDTH)}
            style={{ backgroundColor: 'var(--border)' }}
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  );
}
