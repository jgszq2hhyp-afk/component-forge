// @version 1.0.0
// @category login
// @name register-multi-step
// @source custom

'use client';

import { type KeyboardEvent, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

/* ─── Named Constants ─── */
const DEFAULT_TRANSITION_DURATION_MS = 300;
const RING_STYLE = { ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

/* ─── Types ─── */
interface StepField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}

interface Step {
  title: string;
  fields: StepField[];
}

interface RegisterMultiStepProps {
  steps?: Step[];
  onComplete?: (data: Record<string, string>) => void;
  className?: string;
}

/* ─── Default Steps ─── */
const DEFAULT_STEPS: Step[] = [
  {
    title: 'Konto',
    fields: [
      { name: 'name', label: 'Vollständiger Name', type: 'text', required: true, placeholder: 'Max Mustermann' },
      { name: 'email', label: 'E-Mail', type: 'email', required: true, placeholder: 'name@beispiel.de' },
      { name: 'password', label: 'Passwort', type: 'password', required: true, placeholder: 'Mindestens 8 Zeichen' },
    ],
  },
  {
    title: 'Profil',
    fields: [
      { name: 'company', label: 'Unternehmen', type: 'text', required: false, placeholder: 'Firma GmbH' },
      { name: 'phone', label: 'Telefon', type: 'tel', required: false, placeholder: '+49 123 456789' },
    ],
  },
  {
    title: 'Bestätigung',
    fields: [],
  },
];

/* ─── Icons ─── */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Component ─── */
export function RegisterMultiStep({
  steps = DEFAULT_STEPS,
  onComplete,
  className,
}: RegisterMultiStepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const stepCount = steps.length;
  const isLastStep = currentStep === stepCount - 1;
  const isConfirmStep = isLastStep && steps[currentStep].fields.length === 0;

  /* Focus first field on step change */
  useEffect(() => {
    if (!isConfirmStep && formRef.current) {
      const firstInput = formRef.current.querySelector<HTMLInputElement>('input');
      firstInput?.focus();
    }
  }, [currentStep, isConfirmStep]);

  const validateStep = useCallback((): boolean => {
    const step = steps[currentStep];
    const next: Record<string, string> = {};

    for (const field of step.fields) {
      const value = formData[field.name]?.trim() ?? '';
      if (field.required && !value) {
        next[field.name] = `${field.label} ist erforderlich`;
      } else if (field.type === 'email' && value && !EMAIL_REGEX.test(value)) {
        next[field.name] = 'Bitte gültige E-Mail eingeben';
      } else if (field.type === 'password' && value && value.length < MIN_PASSWORD_LENGTH) {
        next[field.name] = `Mindestens ${MIN_PASSWORD_LENGTH} Zeichen`;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [currentStep, formData, steps]);

  const animateTransition = useCallback((dir: 'next' | 'prev', callback: () => void) => {
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, DEFAULT_TRANSITION_DURATION_MS);
  }, []);

  const goNext = useCallback(() => {
    if (!validateStep()) return;
    if (isLastStep) {
      onComplete?.(formData);
      return;
    }
    animateTransition('next', () => setCurrentStep((s) => s + 1));
  }, [validateStep, isLastStep, onComplete, formData, animateTransition]);

  const goBack = useCallback(() => {
    if (currentStep === 0) return;
    animateTransition('prev', () => setCurrentStep((s) => s - 1));
  }, [currentStep, animateTransition]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        goNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        goBack();
      }
    },
    [goNext, goBack],
  );

  const updateField = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  /* Progress percentage */
  const progressPercent = ((currentStep + 1) / stepCount) * 100;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .register-step-enter-next {
          animation: register-slide-in-right ${DEFAULT_TRANSITION_DURATION_MS}ms ease-out;
        }
        .register-step-enter-prev {
          animation: register-slide-in-left ${DEFAULT_TRANSITION_DURATION_MS}ms ease-out;
        }
        .register-step-exit-next {
          animation: register-slide-out-left ${DEFAULT_TRANSITION_DURATION_MS}ms ease-out forwards;
        }
        .register-step-exit-prev {
          animation: register-slide-out-right ${DEFAULT_TRANSITION_DURATION_MS}ms ease-out forwards;
        }
        @keyframes register-slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes register-slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes register-slide-out-left {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-30px); }
        }
        @keyframes register-slide-out-right {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(30px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .register-step-enter-next,
          .register-step-enter-prev,
          .register-step-exit-next,
          .register-step-exit-prev {
            animation: none;
          }
        }
      `}} />

      <div
        className={cn(
          'mx-auto w-full max-w-lg rounded-xl border border-[var(--border)] bg-[var(--card,var(--background))] p-6 shadow-sm sm:p-8',
          className,
        )}
      >
        {/* ─── Progress Bar ─── */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
            <span>
              Schritt {currentStep + 1} von {stepCount}
            </span>
            <span>{steps[currentStep].title}</span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--muted)]"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Fortschritt: Schritt ${currentStep + 1} von ${stepCount}`}
          >
            <div
              className="h-full rounded-full bg-[var(--primary)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ─── Step Indicators ─── */}
        <nav aria-label="Registrierungsschritte" className="mb-8">
          <ol className="flex items-center justify-center gap-2">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <li
                  key={step.title}
                  className="flex items-center gap-2"
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                      isCompleted && 'bg-[var(--primary)] text-[var(--primary-foreground)]',
                      isCurrent && 'border-2 border-[var(--primary)] text-[var(--primary)]',
                      !isCompleted && !isCurrent && 'border border-[var(--border)] text-[var(--muted-foreground)]',
                    )}
                  >
                    {isCompleted ? <CheckIcon /> : idx + 1}
                  </span>
                  <span
                    className={cn(
                      'hidden text-xs font-medium sm:inline',
                      isCurrent ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]',
                    )}
                  >
                    {step.title}
                  </span>
                  {idx < stepCount - 1 && (
                    <div
                      className={cn(
                        'mx-1 h-px w-6 sm:w-10',
                        idx < currentStep ? 'bg-[var(--primary)]' : 'bg-[var(--border)]',
                      )}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* ─── Step Content ─── */}
        <form
          ref={formRef}
          onKeyDown={handleKeyDown}
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          aria-label="Registrierung"
          noValidate
        >
          <div
            className={cn(
              'min-h-[200px]',
              !isAnimating && direction === 'next' && 'register-step-enter-next',
              !isAnimating && direction === 'prev' && 'register-step-enter-prev',
              isAnimating && direction === 'next' && 'register-step-exit-next',
              isAnimating && direction === 'prev' && 'register-step-exit-prev',
            )}
          >
            {isConfirmStep ? (
              /* ─── Confirm Step ─── */
              <div className="space-y-4">
                <h2
                  className="font-semibold text-[var(--foreground)]"
                  style={{ fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)' }}
                >
                  Zusammenfassung
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Bitte überprüfen Sie Ihre Angaben.
                </p>
                <dl className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)]">
                  {steps.slice(0, -1).flatMap((step) =>
                    step.fields.map((field) => (
                      <div key={field.name} className="flex items-center justify-between px-4 py-3">
                        <dt className="text-sm text-[var(--muted-foreground)]">{field.label}</dt>
                        <dd className="text-sm font-medium text-[var(--foreground)]">
                          {field.type === 'password'
                            ? '••••••••'
                            : formData[field.name] || '—'}
                        </dd>
                      </div>
                    )),
                  )}
                </dl>
              </div>
            ) : (
              /* ─── Field Steps ─── */
              <div className="space-y-5">
                <h2
                  className="font-semibold text-[var(--foreground)]"
                  style={{ fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)' }}
                >
                  {steps[currentStep].title}
                </h2>
                {steps[currentStep].fields.map((field) => (
                  <div key={field.name} className="space-y-1.5">
                    <label
                      htmlFor={`register-${field.name}`}
                      className="block text-sm font-medium text-[var(--foreground)]"
                    >
                      {field.label}
                      {field.required && (
                        <span className="ml-0.5 text-[var(--destructive)]" aria-hidden="true">*</span>
                      )}
                    </label>
                    <input
                      id={`register-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.name] ?? ''}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      aria-invalid={!!errors[field.name]}
                      aria-describedby={errors[field.name] ? `register-${field.name}-error` : undefined}
                      autoComplete={
                        field.type === 'email'
                          ? 'email'
                          : field.type === 'password'
                            ? 'new-password'
                            : field.type === 'tel'
                              ? 'tel'
                              : 'off'
                      }
                      style={RING_STYLE}
                      className={cn(
                        'block w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm',
                        'placeholder:text-[var(--muted-foreground)]',
                        'transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                        errors[field.name]
                          ? 'border-[var(--destructive)]'
                          : 'border-[var(--border)]',
                      )}
                    />
                    {errors[field.name] && (
                      <p
                        id={`register-${field.name}-error`}
                        className="text-xs text-[var(--destructive)]"
                        role="alert"
                      >
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── Navigation Buttons ─── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={currentStep === 0 || isAnimating}
              style={RING_STYLE}
              className={cn(
                'rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium',
                'text-[var(--foreground)] transition-colors',
                'hover:bg-[var(--accent)] disabled:opacity-40 disabled:pointer-events-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
            >
              Zurück
            </button>
            <button
              type="submit"
              disabled={isAnimating}
              style={RING_STYLE}
              className={cn(
                'rounded-lg px-5 py-2.5 text-sm font-semibold',
                'bg-[var(--primary)] text-[var(--primary-foreground)]',
                'transition-opacity hover:opacity-90 disabled:opacity-50',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
            >
              {isLastStep ? 'Registrieren' : 'Weiter'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterMultiStep;
