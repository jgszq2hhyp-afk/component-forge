// @version 2.0.0
// @category error
// @name error-404-illustrated
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useState, type FormEvent } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.5rem, 4vw, 1.875rem)';
const SVG_CENTER_FONT_SIZE = '72px';
const SVG_CENTER_OPACITY = 0.08;
const ILLUSTRATION_MAX_WIDTH_SM = 'max-w-sm';
const ILLUSTRATION_MAX_WIDTH_MD = 'md:max-w-md';
const CONTENT_MAX_WIDTH = 'max-w-lg';
const DESCRIPTION_MAX_WIDTH = 'max-w-md';
const SEARCH_MAX_WIDTH = 'max-w-sm';
const SEARCH_ICON_SIZE = 'size-4';
const ARROW_ICON_SIZE = 'size-4';
const FLOAT_DURATION_A = '4s';
const FLOAT_DURATION_B = '5s';
const FLOAT_OFFSET = '-8px';
const FADE_DURATION = '0.6s';
const FADE_TRANSLATE = '12px';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ErrorPageProps {
  title?: string;
  message?: string;
  homeHref?: string;
  className?: string;
  searchAction?: string;
}

// ---------------------------------------------------------------------------
// Illustration (abstract geometric shapes — pure SVG, no emoji)
// ---------------------------------------------------------------------------

function Illustration({ className }: { className?: string }) {
  return (
    <svg
      className={cn('error-illustrated-svg', className)}
      viewBox="0 0 480 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      {/* Large circle */}
      <circle
        cx="240"
        cy="160"
        r="110"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="8 6"
      />
      {/* Accent arc */}
      <path
        d="M160 100 A100 100 0 0 1 320 100"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Floating shapes */}
      <rect
        x="100"
        y="60"
        width="32"
        height="32"
        rx="6"
        stroke="var(--muted-foreground)"
        strokeWidth="1.5"
        opacity="0.35"
        className="error-illustrated-float-a"
      />
      <circle
        cx="380"
        cy="90"
        r="14"
        stroke="var(--primary)"
        strokeWidth="1.5"
        opacity="0.4"
        className="error-illustrated-float-b"
      />
      <polygon
        points="370,230 390,260 350,260"
        stroke="var(--muted-foreground)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        className="error-illustrated-float-a"
      />
      {/* Center "404" text */}
      <text
        x="240"
        y="175"
        textAnchor="middle"
        style={{
          fontSize: SVG_CENTER_FONT_SIZE,
          fontWeight: 800,
          fill: 'var(--foreground)',
          opacity: SVG_CENTER_OPACITY,
        }}
      >
        404
      </text>
      {/* Broken link icon */}
      <g transform="translate(215, 130)" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
        <path d="M10 20 L2 28 A8 8 0 0 0 13 39 L20 32" />
        <path d="M30 12 L38 4 A8 8 0 0 0 27 -7 L20 0" />
        <line x1="16" y1="16" x2="24" y2="24" strokeDasharray="3 4" />
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component ('use client' — search bar needs form state)
// ---------------------------------------------------------------------------

export default function Error404Illustrated({
  title = 'Page not found',
  message = 'The page you were looking for could not be found. Try searching or go back to the homepage.',
  homeHref = '/',
  searchAction = '/search',
  className,
}: ErrorPageProps) {
  const [query, setQuery] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!query.trim()) {
      e.preventDefault();
    }
  }

  return (
    <main
      aria-label="404 error page with search"
      className={cn(
        'flex min-h-svh flex-col items-center justify-center',
        'px-6 py-16 md:px-12 md:py-24',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* SVG illustration */}
      <Illustration className={cn('mx-auto w-full', ILLUSTRATION_MAX_WIDTH_SM, ILLUSTRATION_MAX_WIDTH_MD)} />

      {/* Content */}
      <div className={cn('relative z-10 mt-6 md:mt-8', CONTENT_MAX_WIDTH)}>
        <h1
          className="font-bold tracking-tight"
          style={{
            color: 'var(--foreground)',
            fontSize: HEADING_CLAMP,
          }}
        >
          {title}
        </h1>

        <p
          className={cn('mx-auto mt-3 text-base leading-relaxed', DESCRIPTION_MAX_WIDTH)}
          style={{ color: 'var(--muted-foreground)' }}
        >
          {message}
        </p>

        {/* Search bar */}
        <form
          action={searchAction}
          method="get"
          onSubmit={handleSubmit}
          role="search"
          aria-label="Site search"
          className={cn(
            'mx-auto mt-8 flex overflow-hidden rounded-lg',
            SEARCH_MAX_WIDTH,
            'transition-shadow duration-200 motion-reduce:transition-none',
            'focus-within:ring-2 focus-within:ring-offset-2',
          )}
          style={{
            border: '1px solid var(--border)',
            ['--tw-ring-color' as string]: 'var(--primary)',
            ['--tw-ring-offset-color' as string]: 'var(--background)',
          }}
        >
          <label htmlFor="error-search" className="sr-only">
            Search
          </label>
          <input
            id="error-search"
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the site..."
            className={cn(
              'flex-1 border-0 bg-transparent px-4 py-3 text-sm',
              'outline-none placeholder:opacity-50',
            )}
            style={{
              color: 'var(--foreground)',
            }}
          />
          <button
            type="submit"
            className={cn(
              'inline-flex items-center justify-center px-5',
              'text-sm font-medium',
              'transition-colors duration-150 motion-reduce:transition-none',
              'hover:brightness-110',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
            aria-label="Search"
          >
            <svg
              className={SEARCH_ICON_SIZE}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>

        {/* Home button */}
        <nav aria-label="Error page navigation" className="mt-6">
          <a
            href={homeHref}
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-semibold',
              'transition-colors duration-200 motion-reduce:transition-none',
              'hover:underline underline-offset-4',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              color: 'var(--primary)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            <svg
              className={ARROW_ICON_SIZE}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12.667 8H3.333M7.333 4l-4 4 4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to home
          </a>
        </nav>
      </div>

      {/* Animations + reduced motion: disable ALL */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .error-illustrated-svg {
              animation: errorIllFadeIn ${FADE_DURATION} ease-out both;
            }
            .error-illustrated-float-a {
              animation: errorIllFloat ${FLOAT_DURATION_A} ease-in-out infinite alternate;
            }
            .error-illustrated-float-b {
              animation: errorIllFloat ${FLOAT_DURATION_B} ease-in-out 0.5s infinite alternate;
            }
            @keyframes errorIllFadeIn {
              from { opacity: 0; transform: translateY(${FADE_TRANSLATE}); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes errorIllFloat {
              from { transform: translateY(0); }
              to   { transform: translateY(${FLOAT_OFFSET}); }
            }
            @media (prefers-reduced-motion: reduce) {
              .error-illustrated-svg,
              .error-illustrated-float-a,
              .error-illustrated-float-b {
                animation: none !important;
                transition: none !important;
              }
            }
          `,
        }}
      />
    </main>
  );
}
