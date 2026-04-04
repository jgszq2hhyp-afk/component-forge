// @version 1.0.0
// @category testimonials
// @name testimonial-single-large
// @source self-authored

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Quote icon
// ---------------------------------------------------------------------------

function QuoteIcon() {
  return (
    <svg
      width="64"
      height="64"
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
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28',
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
            animation: 'single-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
            animationDelay: '0.1s',
          }}
        >
          {/* Text content */}
          <div className={cn(imageSrc ? '' : 'max-w-3xl mx-auto text-center')}>
            <span style={{ color: 'var(--primary)', opacity: 0.3 }}>
              <QuoteIcon />
            </span>

            <blockquote
              className="mt-4 text-xl sm:text-2xl lg:text-3xl font-medium leading-snug tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div
              className={cn(
                'mt-8 flex items-center gap-4',
                !imageSrc && 'justify-center',
              )}
            >
              {avatarSrc && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-offset-2"
                  style={{
                    ['--tw-ring-color' as string]: 'var(--border)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  <Image
                    src={avatarSrc}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p
                  className="text-base font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {name}
                </p>
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
                <div className="ml-auto relative h-8 w-24 opacity-50">
                  <Image
                    src={companyLogoSrc}
                    alt={company ?? 'Firmenlogo'}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Optional image */}
          {imageSrc && (
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{
                animation: 'single-fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.3s',
              }}
            >
              <Image
                src={imageSrc}
                alt={imageAlt ?? name}
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
