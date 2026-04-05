// @version 1.0.0
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
  filter: blur(80px);
  pointer-events: none;
}

.hgm-blob--a {
  width: 40vw;
  height: 40vw;
  max-width: 500px;
  max-height: 500px;
  top: 10%;
  left: 5%;
  background: var(--primary);
  opacity: 0.25;
  animation: hgm-float-a 18s ease-in-out infinite;
}

.hgm-blob--b {
  width: 35vw;
  height: 35vw;
  max-width: 450px;
  max-height: 450px;
  top: 40%;
  right: 5%;
  background: var(--accent);
  opacity: 0.2;
  animation: hgm-float-b 22s ease-in-out infinite;
}

.hgm-blob--c {
  width: 25vw;
  height: 25vw;
  max-width: 350px;
  max-height: 350px;
  bottom: 10%;
  left: 30%;
  background: var(--muted);
  opacity: 0.18;
  animation: hgm-float-c 20s ease-in-out infinite;
}

/* ---- Glass card ---- */
.hgm-glass {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background: color-mix(in srgb, var(--background) 60%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
  position: relative;
  overflow: hidden;
}

/* ---- Noise texture overlay ---- */
.hgm-noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: 0.035;
  z-index: 1;
}

/* ---- Content fade-in ---- */
@keyframes hgm-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hgm-animate {
  animation: hgm-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hgm-animate--1 { animation-delay: 0.1s; }
.hgm-animate--2 { animation-delay: 0.2s; }
.hgm-animate--3 { animation-delay: 0.35s; }
.hgm-animate--4 { animation-delay: 0.5s; }

/* ---- Button hover (CSS-only) ---- */
.hgm-btn {
  transition:
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.25s ease;
}

.hgm-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.15);
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
    color-mix(in srgb, var(--primary) 30%, transparent),
    transparent 50%,
    color-mix(in srgb, var(--accent) 20%, transparent)
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
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
                  color: 'var(--primary)',
                  border: '1px solid color-mix(in srgb, var(--primary) 25%, transparent)',
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
              <div className="hgm-animate hgm-animate--4 mt-8 flex flex-wrap items-center justify-center gap-4">
                {ctaText && (
                  <a
                    href={ctaHref}
                    className="hgm-btn inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-xl"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    {ctaText}
                  </a>
                )}
                {secondaryCtaText && (
                  <a
                    href={secondaryCtaHref}
                    className="hgm-btn inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-xl"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--foreground) 8%, transparent)',
                      color: 'var(--foreground)',
                      border: '1px solid color-mix(in srgb, var(--border) 60%, transparent)',
                    }}
                  >
                    {secondaryCtaText}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
