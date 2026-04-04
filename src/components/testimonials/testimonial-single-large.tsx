// @version 2.0.0
// @category testimonials
// @name testimonial-single-large
// @source self-authored

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const CONTENT_MAX_WIDTH = 'max-w-3xl';
const AVATAR_SIZE = 'w-14 h-14';
const COMPANY_LOGO_HEIGHT = 'h-8';
const COMPANY_LOGO_WIDTH = 'w-24';
const QUOTE_ICON_SIZE = 64;
const ANIMATION_DURATION = '0.8s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const ANIMATION_DELAY_TEXT = '0.1s';
const ANIMATION_DELAY_IMAGE = '0.3s';
const HEADING_CLAMP = 'clamp(1.25rem, 2vw + 0.75rem, 1.875rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TestimonialSingleLargeProps {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  companyLogoSrc?: string;
  avatarSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes single-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes single-fade-in {
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
// Quote icon
// ---------------------------------------------------------------------------

function QuoteIcon() {
  return (
    <svg
      width={QUOTE_ICON_SIZE}
      height={QUOTE_ICON_SIZE}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 41C16 36.4 18.4 31.6 23.2 28L26.4 31.2C23.2 34.4 22.4 36.8 22.4 39.2H28V48H16V41ZM35.2 41C35.2 36.4 37.6 31.6 42.4 28L45.6 31.2C42.4 34.4 41.6 36.8 41.6 39.2H47.2V48H35.2V41Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialSingleLarge({
  quote,
  name,
  role,
  company,
  companyLogoSrc,
  avatarSrc,
  imageSrc,
  imageAlt,
  className,
}: TestimonialSingleLargeProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={`Kundenstimme von ${name}`}
        className={cn(
          `${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28`,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div
          className={cn(
            'grid grid-cols-1 items-center gap-10',
            imageSrc ? 'lg:grid-cols-2 lg:gap-16' : '',
          )}
          style={{
            animation: `single-fade-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
            animationDelay: ANIMATION_DELAY_TEXT,
          }}
        >
          {/* Text content */}
          <div className={cn(imageSrc ? '' : `${CONTENT_MAX_WIDTH} mx-auto text-center`)}>
            <span style={{ color: 'var(--primary)', opacity: 0.3 }}>
              <QuoteIcon />
            </span>

            <figure>
              <blockquote
                className="mt-4 font-medium leading-snug tracking-tight"
                style={{
                  fontSize: HEADING_CLAMP,
                  color: 'var(--foreground)',
                }}
              >
                <p>&ldquo;{quote}&rdquo;</p>
              </blockquote>

              {/* Author */}
              <figcaption
                className={cn(
                  'mt-8 flex items-center gap-4',
                  !imageSrc && 'justify-center',
                )}
              >
                {avatarSrc && (
                  <div
                    className={`relative ${AVATAR_SIZE} rounded-full overflow-hidden flex-shrink-0 ring-2 ring-offset-2`}
                    style={{
                      ['--tw-ring-color' as string]: 'var(--border)',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    <Image
                      src={avatarSrc}
                      alt={`Profilbild von ${name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <cite
                    className="text-base font-semibold not-italic"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {name}
                  </cite>
                  {(role || company) && (
                    <p
                      className="text-sm"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {[role, company].filter(Boolean).join(' bei ')}
                    </p>
                  )}
                </div>

                {companyLogoSrc && (
                  <div className={`ml-auto relative ${COMPANY_LOGO_HEIGHT} ${COMPANY_LOGO_WIDTH} opacity-50`}>
                    <Image
                      src={companyLogoSrc}
                      alt={company ? `Logo von ${company}` : 'Firmenlogo'}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                )}
              </figcaption>
            </figure>
          </div>

          {/* Optional image */}
          {imageSrc && (
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                animation: `single-fade-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: ANIMATION_DELAY_IMAGE,
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt ?? `Bild von ${name}`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
