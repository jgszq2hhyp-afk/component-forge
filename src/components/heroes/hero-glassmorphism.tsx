// @version 2.0.0
// @category heroes
// @name hero-glassmorphism
// @source aura-inspired

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GRADIENT_DURATION = '15s';
const HEADING_CLAMP = 'clamp(2rem, 1.5rem + 2.5vw, 3.75rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)';

const BLOB_A_SIZE = '40vw';
const BLOB_A_MAX = '500px';
const BLOB_A_DURATION = '18s';
const BLOB_B_SIZE = '35vw';
const BLOB_B_MAX = '450px';
const BLOB_B_DURATION = '22s';
const BLOB_C_SIZE = '25vw';
const BLOB_C_MAX = '350px';
const BLOB_C_DURATION = '20s';

const BLOB_A_OPACITY = 0.25;
const BLOB_B_OPACITY = 0.2;
const BLOB_C_OPACITY = 0.18;

const BLUR_PX = 80;
const GLASS_BLUR_PX = 16;
const GLASS_SATURATE = 180;
const GLASS_BG_MIX = 60;
const GLASS_BORDER_MIX = 40;
const NOISE_OPACITY = 0.035;

const FADE_UP_DISTANCE_PX = 16;
const FADE_UP_DURATION = '0.8s';
const FADE_UP_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const DELAY_1 = '0.1s';
const DELAY_2 = '0.2s';
const DELAY_3 = '0.35s';
const DELAY_4 = '0.5s';

const BTN_TRANSITION_DURATION = '0.25s';
const BTN_TRANSITION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const BTN_HOVER_LIFT_PX = -1;
const BTN_HOVER_SHADOW = '0 4px 16px -4px oklch(0 0 0 / 0.15)';

const BADGE_BG_MIX = 15;
const BADGE_BORDER_MIX = 25;
const SECONDARY_BG_MIX = 8;
const SECONDARY_BORDER_MIX = 60;

const GLOW_PRIMARY_MIX = 30;
const GLOW_ACCENT_MIX = 20;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroGlassmorphismProps {
  badge?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Styles: gradient animation, glass, noise, decorative blobs
// ---------------------------------------------------------------------------

const styles = `
/* ---- Gradient background animation ---- */
@keyframes hgm-gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hgm-bg {
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--accent) 50%,
    var(--primary) 100%
  );
  background-size: 400% 400%;
  animation: hgm-gradient-shift ${GRADIENT_DURATION} ease infinite;
}

/* ---- Decorative blur circles ---- */
@keyframes hgm-float-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(30px, -40px) scale(1.05); }
  66%      { transform: translate(-20px, 20px) scale(0.95); }
}

@keyframes hgm-float-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(-40px, 30px) scale(0.97); }
  66%      { transform: translate(25px, -25px) scale(1.03); }
}

@keyframes hgm-float-c {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(20px, 30px) scale(1.06); }
}

.hgm-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(${BLUR_PX}px);
  pointer-events: none;
}

.hgm-blob--a {
  width: ${BLOB_A_SIZE};
  height: ${BLOB_A_SIZE};
  max-width: ${BLOB_A_MAX};
  max-height: ${BLOB_A_MAX};
  top: 10%;
  left: 5%;
  background: var(--primary);
  opacity: ${BLOB_A_OPACITY};
  animation: hgm-float-a ${BLOB_A_DURATION} ease-in-out infinite;
}

.hgm-blob--b {
  width: ${BLOB_B_SIZE};
  height: ${BLOB_B_SIZE};
  max-width: ${BLOB_B_MAX};
  max-height: ${BLOB_B_MAX};
  top: 40%;
  right: 5%;
  background: var(--accent);
  opacity: ${BLOB_B_OPACITY};
  animation: hgm-float-b ${BLOB_B_DURATION} ease-in-out infinite;
}

.hgm-blob--c {
  width: ${BLOB_C_SIZE};
  height: ${BLOB_C_SIZE};
  max-width: ${BLOB_C_MAX};
  max-height: ${BLOB_C_MAX};
  bottom: 10%;
  left: 30%;
  background: var(--muted);
  opacity: ${BLOB_C_OPACITY};
  animation: hgm-float-c ${BLOB_C_DURATION} ease-in-out infinite;
}

/* ---- Glass card ---- */
.hgm-glass {
  backdrop-filter: blur(${GLASS_BLUR_PX}px) saturate(${GLASS_SATURATE}%);
  -webkit-backdrop-filter: blur(${GLASS_BLUR_PX}px) saturate(${GLASS_SATURATE}%);
  background: color-mix(in srgb, var(--background) ${GLASS_BG_MIX}%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) ${GLASS_BORDER_MIX}%, transparent);
  position: relative;
  overflow: hidden;
}

/* ---- Noise texture overlay ---- */
.hgm-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: ${NOISE_OPACITY};
  z-index: 1;
}

/* ---- Content fade-in ---- */
@keyframes hgm-fade-up {
  from {
    opacity: 0;
    transform: translateY(${FADE_UP_DISTANCE_PX}px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hgm-animate {
  animation: hgm-fade-up ${FADE_UP_DURATION} ${FADE_UP_EASING} both;
}

.hgm-animate--1 { animation-delay: ${DELAY_1}; }
.hgm-animate--2 { animation-delay: ${DELAY_2}; }
.hgm-animate--3 { animation-delay: ${DELAY_3}; }
.hgm-animate--4 { animation-delay: ${DELAY_4}; }

/* ---- Button hover (CSS-only) ---- */
.hgm-btn {
  transition:
    transform ${BTN_TRANSITION_DURATION} ${BTN_TRANSITION_EASING},
    box-shadow ${BTN_TRANSITION_DURATION} ${BTN_TRANSITION_EASING},
    opacity ${BTN_TRANSITION_DURATION} ease;
}

.hgm-btn:hover {
  transform: translateY(${BTN_HOVER_LIFT_PX}px);
  box-shadow: ${BTN_HOVER_SHADOW};
}

.hgm-btn:active {
  transform: translateY(0);
}

/* ---- Gradient border glow on glass card ---- */
.hgm-glass::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary) ${GLOW_PRIMARY_MIX}%, transparent),
    transparent 50%,
    color-mix(in srgb, var(--accent) ${GLOW_ACCENT_MIX}%, transparent)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 0;
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
  .hgm-bg {
    animation: none !important;
  }

  .hgm-blob {
    animation: none !important;
  }

  .hgm-animate {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .hgm-btn,
  .hgm-btn:hover {
    transition: none !important;
    transform: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Inline SVG noise filter
// ---------------------------------------------------------------------------

const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <filter id="hgm-grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#hgm-grain)"/>
</svg>`;

const noiseDataUri = `data:image/svg+xml;base64,${typeof btoa !== 'undefined' ? btoa(noiseSvg) : Buffer.from(noiseSvg).toString('base64')}`;

// ---------------------------------------------------------------------------
// Component (Server Component - pure CSS animations)
// ---------------------------------------------------------------------------

export default function HeroGlassmorphism({
  badge,
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  className,
}: HeroGlassmorphismProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <section
        aria-label={headline}
        className={cn(
          'hgm-bg relative min-h-screen flex items-center justify-center overflow-hidden',
          'px-4 sm:px-6 lg:px-8 py-16',
          className,
        )}
      >
        {/* Decorative blur circles */}
        <div className="hgm-blob hgm-blob--a" aria-hidden="true" />
        <div className="hgm-blob hgm-blob--b" aria-hidden="true" />
        <div className="hgm-blob hgm-blob--c" aria-hidden="true" />

        {/* Glass card */}
        <div
          className="hgm-glass relative z-10 w-full max-w-3xl rounded-2xl p-10 lg:p-16"
        >
          {/* Noise texture */}
          <div
            className="hgm-noise rounded-2xl"
            aria-hidden="true"
            style={{
              backgroundImage: `url("${noiseDataUri}")`,
              backgroundRepeat: 'repeat',
            }}
          />

          {/* Content (above noise layer) */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Badge */}
            {badge && (
              <span
                className="hgm-animate hgm-animate--1 inline-block mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full"
                aria-hidden="true"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--primary) ${BADGE_BG_MIX}%, transparent)`,
                  color: 'var(--primary)',
                  border: `1px solid color-mix(in srgb, var(--primary) ${BADGE_BORDER_MIX}%, transparent)`,
                }}
              >
                {badge}
              </span>
            )}

            {/* Headline */}
            <h1
              className="hgm-animate hgm-animate--2 font-bold tracking-tight leading-tight"
              style={{
                color: 'var(--foreground)',
                fontSize: HEADING_CLAMP,
              }}
            >
              {headline}
            </h1>

            {/* Subheadline */}
            {subheadline && (
              <p
                className="hgm-animate hgm-animate--3 mt-5 max-w-xl leading-relaxed"
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: SUBHEADING_CLAMP,
                }}
              >
                {subheadline}
              </p>
            )}

            {/* CTAs */}
            {(ctaText || secondaryCtaText) && (
              <nav
                className="hgm-animate hgm-animate--4 mt-8 flex flex-wrap items-center justify-center gap-4"
                aria-label="Call to action"
              >
                {ctaText && (
                  <a
                    href={ctaHref}
                    className={cn(
                      'hgm-btn inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-xl',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    )}
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                    }}
                  >
                    {ctaText}
                  </a>
                )}
                {secondaryCtaText && (
                  <a
                    href={secondaryCtaHref}
                    className={cn(
                      'hgm-btn inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-xl',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    )}
                    style={{
                      backgroundColor: `color-mix(in srgb, var(--foreground) ${SECONDARY_BG_MIX}%, transparent)`,
                      color: 'var(--foreground)',
                      border: `1px solid color-mix(in srgb, var(--border) ${SECONDARY_BORDER_MIX}%, transparent)`,
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                    }}
                  >
                    {secondaryCtaText}
                  </a>
                )}
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
