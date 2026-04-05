"use client"

// @version 1.0.0
// @category countdown
// @name countdown-launch
// @source custom

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INTERVAL_MS = 1000;
const CARD_MIN_WIDTH = '5rem';
const CARD_PADDING = '1.25rem 0.5rem';
const CARD_BORDER_RADIUS = '0.75rem';
const CONTENT_MAX_WIDTH = '40rem';
const NUMBER_CLAMP = 'clamp(2rem, 5vw + 1rem, 3.5rem)';
const LABEL_CLAMP = 'clamp(0.6875rem, 0.8vw + 0.25rem, 0.875rem)';
const HEADING_CLAMP = 'clamp(1.75rem, 4vw + 0.5rem, 3.5rem)';
const BODY_CLAMP = 'clamp(0.9375rem, 1vw + 0.5rem, 1.25rem)';
const INPUT_CLAMP = 'clamp(0.8125rem, 1vw + 0.25rem, 1rem)';
const BUTTON_BORDER_RADIUS = '0.5rem';
const BUTTON_PADDING_X = '1.5rem';
const BUTTON_PADDING_Y = '0.75rem';
const GRADIENT_DURATION_S = 12;
const FLIP_DURATION_MS = 600;
const PLACEHOLDER_VALUE = '--';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownLaunchProps {
  /** Target date for the countdown */
  targetDate: string | Date;
  /** Main heading */
  title?: string;
  /** Subheading / description */
  description?: string;
  /** Callback when email form is submitted */
  onEmailSubmit?: (email: string) => void;
  /** Background effect style */
  backgroundEffect?: 'particles' | 'gradient' | 'none';
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function calcTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

// ---------------------------------------------------------------------------
// FlipCard sub-component
// ---------------------------------------------------------------------------

interface FlipCardProps {
  value: string;
  label: string;
  prevValue: string;
}

function FlipCard({ value, label, prevValue }: FlipCardProps) {
  const flipping = value !== prevValue;

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative overflow-hidden"
        style={{
          minWidth: CARD_MIN_WIDTH,
          padding: CARD_PADDING,
          borderRadius: CARD_BORDER_RADIUS,
          backgroundColor: 'color-mix(in oklch, var(--card) 90%, var(--foreground) 10%)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Current number */}
        <span
          className={cn(
            'block text-center font-bold tabular-nums',
            flipping && 'animate-[flipIn_var(--flip-duration)_ease-out]'
          )}
          style={{
            fontSize: NUMBER_CLAMP,
            color: 'var(--foreground)',
            lineHeight: 1.1,
            ['--flip-duration' as string]: `${FLIP_DURATION_MS}ms`,
          }}
          aria-live="polite"
        >
          {value}
        </span>
      </div>
      <span
        className="text-center font-medium uppercase tracking-wider"
        style={{
          fontSize: LABEL_CLAMP,
          color: 'var(--muted-foreground)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CountdownLaunch({
  targetDate,
  title = 'Demnächst verfügbar',
  description = 'Wir arbeiten an etwas Besonderem. Tragen Sie sich ein, um informiert zu werden.',
  onEmailSubmit,
  backgroundEffect = 'gradient',
  className,
}: CountdownLaunchProps) {
  const target = useMemo(
    () => (targetDate instanceof Date ? targetDate : new Date(targetDate)),
    [targetDate]
  );

  // SSR-safe: start with null to show placeholders
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const prevTimeRef = useRef<TimeLeft | null>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Hydration-safe countdown
  useEffect(() => {
    setTimeLeft(calcTimeLeft(target));

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        prevTimeRef.current = prev;
        return calcTimeLeft(target);
      });
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [target]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim()) return;
      onEmailSubmit?.(email.trim());
      setSubmitted(true);
      setEmail('');
    },
    [email, onEmailSubmit]
  );

  // Display values -- placeholder until hydrated
  const display = timeLeft
    ? {
        days: pad(timeLeft.days),
        hours: pad(timeLeft.hours),
        minutes: pad(timeLeft.minutes),
        seconds: pad(timeLeft.seconds),
      }
    : {
        days: PLACEHOLDER_VALUE,
        hours: PLACEHOLDER_VALUE,
        minutes: PLACEHOLDER_VALUE,
        seconds: PLACEHOLDER_VALUE,
      };

  const prev = prevTimeRef.current
    ? {
        days: pad(prevTimeRef.current.days),
        hours: pad(prevTimeRef.current.hours),
        minutes: pad(prevTimeRef.current.minutes),
        seconds: pad(prevTimeRef.current.seconds),
      }
    : display;

  const segments: Array<{ key: keyof typeof display; label: string }> = [
    { key: 'days', label: 'Tage' },
    { key: 'hours', label: 'Stunden' },
    { key: 'minutes', label: 'Minuten' },
    { key: 'seconds', label: 'Sekunden' },
  ];

  return (
    <section
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden',
        className
      )}
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
      }}
    >
      {/* Background effect */}
      {backgroundEffect === 'gradient' && (
        <div
          className="pointer-events-none absolute inset-0 animate-[gradientShift_var(--gradient-duration)_ease_infinite]"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, color-mix(in oklch, var(--primary) 15%, transparent) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, color-mix(in oklch, var(--accent) 12%, transparent) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 80%, color-mix(in oklch, var(--primary) 8%, transparent) 0%, transparent 60%)
            `,
            ['--gradient-duration' as string]: `${GRADIENT_DURATION_S}s`,
          }}
        />
      )}

      {backgroundEffect === 'particles' && (
        <div
          className="pointer-events-none absolute inset-0 animate-[gradientShift_var(--gradient-duration)_ease_infinite]"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, color-mix(in oklch, var(--primary) 6%, transparent) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, color-mix(in oklch, var(--accent) 6%, transparent) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, color-mix(in oklch, var(--primary) 4%, transparent) 0%, transparent 40%)
            `,
            ['--gradient-duration' as string]: `${GRADIENT_DURATION_S * 2}s`,
          }}
        />
      )}

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ maxWidth: CONTENT_MAX_WIDTH }}
      >
        {/* Heading */}
        <h1
          className="font-bold tracking-tight"
          style={{
            fontSize: HEADING_CLAMP,
            color: 'var(--foreground)',
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="mx-auto mt-4"
          style={{
            fontSize: BODY_CLAMP,
            color: 'var(--muted-foreground)',
            lineHeight: 1.6,
            maxWidth: '32rem',
          }}
        >
          {description}
        </p>

        {/* Countdown grid */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-4"
          role="timer"
          aria-label="Countdown"
        >
          {segments.map(({ key, label }) => (
            <FlipCard
              key={key}
              value={display[key]}
              prevValue={prev[key]}
              label={label}
            />
          ))}
        </div>

        {/* Email signup */}
        <div className="mt-12 w-full" style={{ maxWidth: '28rem' }}>
          {submitted ? (
            <p
              className="text-center font-medium"
              style={{
                fontSize: BODY_CLAMP,
                color: 'var(--primary)',
              }}
              role="status"
            >
              Vielen Dank! Wir informieren Sie, sobald es losgeht.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="countdown-email" className="sr-only">
                E-Mail-Adresse
              </label>
              <input
                id="countdown-email"
                type="email"
                required
                placeholder="ihre@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'flex-1 border transition-colors',
                  FOCUS_RING
                )}
                style={{
                  padding: `${BUTTON_PADDING_Y} ${BUTTON_PADDING_X}`,
                  borderRadius: BUTTON_BORDER_RADIUS,
                  fontSize: INPUT_CLAMP,
                  backgroundColor: 'var(--card)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                }}
              />
              <button
                type="submit"
                className={cn('shrink-0 font-medium transition-colors', FOCUS_RING)}
                style={{
                  padding: `${BUTTON_PADDING_Y} ${BUTTON_PADDING_X}`,
                  borderRadius: BUTTON_BORDER_RADIUS,
                  fontSize: INPUT_CLAMP,
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                }}
              >
                Benachrichtigen
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes flipIn {
          0% {
            transform: rotateX(90deg);
            opacity: 0;
          }
          50% {
            transform: rotateX(-10deg);
            opacity: 1;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
        @keyframes gradientShift {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          33% {
            transform: scale(1.05) rotate(1deg);
          }
          66% {
            transform: scale(0.97) rotate(-1deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[flipIn_var\\(--flip-duration\\)_ease-out\\] {
            animation: none !important;
          }
          .animate-\\[gradientShift_var\\(--gradient-duration\\)_ease_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
