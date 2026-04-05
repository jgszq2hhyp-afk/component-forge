"use client"

// @version 1.0.0
// @category heroes
// @name HeroBeforeAfter
// @source custom

'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const INITIAL_POSITION = 50;
const KEYBOARD_STEP = 2;
const MIN_POSITION = 0;
const MAX_POSITION = 100;
const SLIDER_HANDLE_SIZE = 44;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface HeroBeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  description?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function HeroBeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Before',
  afterAlt = 'After',
  title,
  description,
  className,
}: HeroBeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(MAX_POSITION, Math.max(MIN_POSITION, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  /* Mouse events */
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updatePosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  /* Touch events */
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX);
      }
    },
    [updatePosition],
  );

  /* Keyboard events */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setPosition((prev) => Math.max(MIN_POSITION, prev - KEYBOARD_STEP));
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setPosition((prev) => Math.min(MAX_POSITION, prev + KEYBOARD_STEP));
    }
  }, []);

  return (
    <section
      className={cn('w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]', className)}
      aria-labelledby={title ? 'hero-before-after-heading' : undefined}
    >
      {(title || description) && (
        <header className="mx-auto max-w-3xl text-center mb-[clamp(2rem,5vw,3rem)]">
          {title && (
            <h1
              id="hero-before-after-heading"
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-[var(--foreground)]"
            >
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-4 text-[clamp(1rem,1.5vw,1.25rem)] text-[var(--muted-foreground)]">
              {description}
            </p>
          )}
        </header>
      )}

      <div
        ref={containerRef}
        className="relative mx-auto max-w-5xl aspect-[16/9] overflow-hidden rounded-2xl select-none cursor-col-resize"
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          if (touch) updatePosition(touch.clientX);
        }}
      >
        {/* After image (full background) */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${MAX_POSITION - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[var(--background)] shadow-lg motion-safe:transition-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        />

        {/* Slider handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before/after comparison slider"
          aria-valuemin={MIN_POSITION}
          aria-valuemax={MAX_POSITION}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% before, ${Math.round(MAX_POSITION - position)}% after`}
          className={cn(
            'absolute top-1/2 z-10',
            'flex items-center justify-center rounded-full',
            'bg-[var(--background)] border-2 border-[var(--primary)]',
            'shadow-lg cursor-col-resize',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'motion-safe:transition-none',
          )}
          style={{
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: SLIDER_HANDLE_SIZE,
            height: SLIDER_HANDLE_SIZE,
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
          }}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--primary)]"
          >
            <polyline points="8 4 4 8 8 12" />
            <polyline points="16 4 20 8 16 12" />
          </svg>
        </div>

        {/* Labels */}
        <span
          className="absolute left-3 bottom-3 rounded-md bg-[var(--background)]/80 px-2.5 py-1 text-xs font-medium text-[var(--foreground)] backdrop-blur-sm"
          aria-hidden="true"
        >
          Before
        </span>
        <span
          className="absolute right-3 bottom-3 rounded-md bg-[var(--background)]/80 px-2.5 py-1 text-xs font-medium text-[var(--foreground)] backdrop-blur-sm"
          aria-hidden="true"
        >
          After
        </span>
      </div>
    </section>
  );
}
