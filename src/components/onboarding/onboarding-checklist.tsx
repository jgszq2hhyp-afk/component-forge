'use client'

// @version 1.0.0
// @category onboarding
// @name onboarding-checklist
// @source custom

import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Named constants
// ---------------------------------------------------------------------------
const PROGRESS_TRANSITION_MS = 400
const CONFETTI_PARTICLE_COUNT = 24
const CONFETTI_DURATION_MS = 1800
const CELEBRATION_DELAY_MS = 300
const HEADING_CLAMP = 'clamp(1.25rem, 1rem + 1vw, 1.75rem)'
const SECTION_PADDING = 'clamp(1.5rem, 1rem + 2vw, 3rem)'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Task {
  id: string
  label: string
  description?: string
  defaultCompleted?: boolean
}

interface OnboardingChecklistProps {
  tasks: Task[]
  headline?: string
  description?: string
  onAllComplete?: () => void
  className?: string
}

// ---------------------------------------------------------------------------
// Confetti particle component (pure CSS animation)
// ---------------------------------------------------------------------------
function ConfettiParticle({ index }: { index: number }): ReactNode {
  const angle = (360 / CONFETTI_PARTICLE_COUNT) * index
  const distance = 40 + Math.random() * 60
  const size = 4 + Math.random() * 4
  const delay = Math.random() * 0.3

  const colors = [
    'var(--primary)',
    'var(--accent)',
    'var(--ring, hsl(215 20% 65%))',
    'var(--foreground)',
  ]
  const color = colors[index % colors.length]

  return (
    <span
      aria-hidden="true"
      className="motion-safe:animate-[confetti-burst_0.8s_ease-out_forwards] motion-reduce:hidden absolute rounded-full opacity-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: '50%',
        top: '50%',
        animationDelay: `${delay}s`,
        ['--confetti-x' as string]: `${Math.cos((angle * Math.PI) / 180) * distance}px`,
        ['--confetti-y' as string]: `${Math.sin((angle * Math.PI) / 180) * distance}px`,
      }}
    />
  )
}

// ---------------------------------------------------------------------------
// Checkmark icon (SVG)
// ---------------------------------------------------------------------------
function CheckIcon({ checked }: { checked: boolean }): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        'h-4 w-4 shrink-0 transition-transform duration-200',
        'motion-safe:transition-transform motion-reduce:transition-none',
        checked ? 'scale-100' : 'scale-0'
      )}
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function OnboardingChecklist({
  tasks,
  headline = 'Get started',
  description,
  onAllComplete,
  className,
}: OnboardingChecklistProps): ReactNode {
  // Derive initial completed state from defaultCompleted flags
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const task of tasks) {
      initial[task.id] = task.defaultCompleted ?? false
    }
    return initial
  })

  const [showCelebration, setShowCelebration] = useState(false)
  const celebrationFiredRef = useRef(false)

  const completedCount = tasks.filter((t) => completed[t.id]).length
  const totalCount = tasks.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const allDone = completedCount === totalCount && totalCount > 0

  // Fire celebration and callback when everything is done
  useEffect(() => {
    if (allDone && !celebrationFiredRef.current) {
      celebrationFiredRef.current = true
      const timer = setTimeout(() => {
        setShowCelebration(true)
        onAllComplete?.()
      }, CELEBRATION_DELAY_MS)
      return () => clearTimeout(timer)
    }
    if (!allDone) {
      celebrationFiredRef.current = false
      setShowCelebration(false)
    }
  }, [allDone, onAllComplete])

  // Auto-dismiss celebration
  useEffect(() => {
    if (!showCelebration) return
    const timer = setTimeout(() => setShowCelebration(false), CONFETTI_DURATION_MS)
    return () => clearTimeout(timer)
  }, [showCelebration])

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>, id: string) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        toggle(id)
      }
    },
    [toggle]
  )

  return (
    <section
      aria-label={headline}
      className={cn('relative w-full max-w-xl mx-auto', className)}
      style={{ padding: SECTION_PADDING }}
    >
      {/* Keyframes injected once */}
      <style>{`
        @keyframes confetti-burst {
          0% { opacity: 1; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(var(--confetti-x), var(--confetti-y)) scale(0); }
        }
        @keyframes celebration-pop {
          0% { opacity: 0; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Header */}
      <header className="mb-6">
        <h2
          className="font-bold tracking-tight"
          style={{
            fontSize: HEADING_CLAMP,
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h2>
        {description && (
          <p
            className="mt-1 text-sm leading-relaxed"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {description}
          </p>
        )}
      </header>

      {/* Progress bar */}
      <div className="mb-6" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${progressPercent}% complete`}>
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {completedCount} of {totalCount} complete
          </span>
          <span
            className="text-xs font-semibold tabular-nums"
            style={{ color: allDone ? 'var(--primary)' : 'var(--foreground)' }}
          >
            {progressPercent}%
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--border)' }}
        >
          <div
            className={cn(
              'h-full rounded-full',
              'motion-safe:transition-[width] motion-reduce:transition-none'
            )}
            style={{
              width: `${progressPercent}%`,
              backgroundColor: 'var(--primary)',
              transitionDuration: `${PROGRESS_TRANSITION_MS}ms`,
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul role="list" className="space-y-2">
        {tasks.map((task) => {
          const isChecked = completed[task.id] ?? false
          return (
            <li
              key={task.id}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onClick={() => toggle(task.id)}
              onKeyDown={(e) => handleKeyDown(e, task.id)}
              className={cn(
                'group relative flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer select-none',
                'motion-safe:transition-[background-color,border-color,opacity] motion-safe:duration-200',
                'motion-reduce:transition-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isChecked ? 'opacity-80' : 'opacity-100'
              )}
              style={{
                borderColor: isChecked ? 'var(--primary)' : 'var(--border)',
                backgroundColor: isChecked ? 'var(--accent)' : 'var(--card)',
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {/* Custom checkbox */}
              <span
                aria-hidden="true"
                className={cn(
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2',
                  'motion-safe:transition-[background-color,border-color] motion-safe:duration-200',
                  'motion-reduce:transition-none'
                )}
                style={{
                  borderColor: isChecked ? 'var(--primary)' : 'var(--border)',
                  backgroundColor: isChecked ? 'var(--primary)' : 'transparent',
                  color: isChecked ? 'var(--primary-foreground)' : 'transparent',
                }}
              >
                <CheckIcon checked={isChecked} />
              </span>

              {/* Label and description */}
              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    'block text-sm font-medium leading-tight',
                    'motion-safe:transition-[text-decoration-color,color] motion-safe:duration-300',
                    'motion-reduce:transition-none',
                    isChecked && 'line-through'
                  )}
                  style={{
                    color: isChecked ? 'var(--muted-foreground)' : 'var(--foreground)',
                    textDecorationColor: isChecked
                      ? 'var(--muted-foreground)'
                      : 'transparent',
                  }}
                >
                  {task.label}
                </span>
                {task.description && (
                  <span
                    className={cn(
                      'mt-0.5 block text-xs leading-normal',
                      'motion-safe:transition-opacity motion-safe:duration-200',
                      'motion-reduce:transition-none',
                      isChecked ? 'opacity-60' : 'opacity-100'
                    )}
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {task.description}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {/* Celebration overlay */}
      {showCelebration && (
        <div
          aria-live="polite"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {/* Confetti burst */}
          <div className="relative h-0 w-0">
            {Array.from({ length: CONFETTI_PARTICLE_COUNT }, (_, i) => (
              <ConfettiParticle key={i} index={i} />
            ))}
          </div>

          {/* Big checkmark */}
          <div
            className="motion-safe:animate-[celebration-pop_0.5s_ease-out_forwards] motion-reduce:opacity-100 flex h-16 w-16 items-center justify-center rounded-full opacity-0"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            <svg
              aria-label="All tasks complete"
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8"
            >
              <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}
