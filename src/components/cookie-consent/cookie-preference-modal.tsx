// @version 1.0.0
// @category cookie-consent
// @name cookie-preference-modal
// @source custom

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'cookie-preferences';
const MODAL_MAX_WIDTH = '32rem';
const MODAL_PADDING = '1.5rem';
const MODAL_BORDER_RADIUS = '1rem';
const BACKDROP_BLUR = '8px';
const BACKDROP_OPACITY = '0.6';
const HEADING_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.375rem)';
const BODY_CLAMP = 'clamp(0.8125rem, 1vw + 0.25rem, 0.9375rem)';
const LABEL_CLAMP = 'clamp(0.875rem, 1vw + 0.25rem, 1rem)';
const BUTTON_BORDER_RADIUS = '0.5rem';
const BUTTON_PADDING_X = '1.25rem';
const BUTTON_PADDING_Y = '0.625rem';
const TOGGLE_WIDTH = 44;
const TOGGLE_HEIGHT = 24;
const TOGGLE_THUMB_SIZE = 18;
const TOGGLE_THUMB_OFFSET = 3;
const TOGGLE_TRANSLATE = TOGGLE_WIDTH - TOGGLE_THUMB_SIZE - TOGGLE_THUMB_OFFSET * 2;
const FADE_DURATION_MS = 200;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CookieCategory {
  id: string;
  label: string;
  description: string;
  /** If true, toggle is always on and disabled */
  required?: boolean;
}

interface CookiePreferenceModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Callback with selected preferences */
  onSave?: (preferences: Record<string, boolean>) => void;
  /** Custom cookie categories */
  categories?: CookieCategory[];
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Default categories
// ---------------------------------------------------------------------------

const DEFAULT_CATEGORIES: CookieCategory[] = [
  {
    id: 'essential',
    label: 'Essenziell',
    description:
      'Notwendig für die Grundfunktionen der Website. Kann nicht deaktiviert werden.',
    required: true,
  },
  {
    id: 'statistics',
    label: 'Statistik',
    description:
      'Helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description:
      'Werden verwendet, um relevante Werbung für Besucher anzuzeigen.',
  },
  {
    id: 'preferences',
    label: 'Präferenzen',
    description:
      'Ermöglichen der Website, sich an Informationen zu erinnern, die das Verhalten oder Aussehen der Website verändern.',
  },
];

// ---------------------------------------------------------------------------
// Toggle Switch sub-component
// ---------------------------------------------------------------------------

interface ToggleSwitchProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

function ToggleSwitch({ checked, disabled, onChange, id }: ToggleSwitchProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'relative shrink-0 cursor-pointer rounded-full transition-colors',
        disabled && 'cursor-not-allowed opacity-50',
        FOCUS_RING
      )}
      style={{
        width: `${TOGGLE_WIDTH}px`,
        height: `${TOGGLE_HEIGHT}px`,
        backgroundColor: checked ? 'var(--primary)' : 'var(--border)',
        ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
      }}
    >
      <span
        aria-hidden="true"
        className="block rounded-full shadow-sm transition-transform"
        style={{
          width: `${TOGGLE_THUMB_SIZE}px`,
          height: `${TOGGLE_THUMB_SIZE}px`,
          backgroundColor: 'var(--primary-foreground)',
          transform: checked
            ? `translate(${TOGGLE_TRANSLATE}px, ${TOGGLE_THUMB_OFFSET}px)`
            : `translate(${TOGGLE_THUMB_OFFSET}px, ${TOGGLE_THUMB_OFFSET}px)`,
          transitionDuration: `${FADE_DURATION_MS}ms`,
        }}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CookiePreferenceModal({
  open,
  onClose,
  onSave,
  categories = DEFAULT_CATEGORIES,
  className,
}: CookiePreferenceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Initialize preferences: required categories are always true
  const [preferences, setPreferences] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      categories.map((cat) => [cat.id, cat.required === true])
    )
  );

  // Reset preferences when categories change or modal opens
  useEffect(() => {
    if (open) {
      // Load saved preferences from localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, boolean>;
          setPreferences(
            Object.fromEntries(
              categories.map((cat) => [
                cat.id,
                cat.required ? true : (parsed[cat.id] ?? false),
              ])
            )
          );
          return;
        }
      } catch {
        // ignore parse errors
      }
      setPreferences(
        Object.fromEntries(
          categories.map((cat) => [cat.id, cat.required === true])
        )
      );
    }
  }, [open, categories]);

  // Focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;

    // Store previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const modal = modalRef.current;
    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      const focusable = modal.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', handleEscape);

    // Focus first focusable element
    const firstFocusable = modal.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', trapFocus);
      document.removeEventListener('keydown', handleEscape);
      // Restore focus
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const handleToggle = useCallback((id: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleAcceptAll = useCallback(() => {
    const allAccepted = Object.fromEntries(
      categories.map((cat) => [cat.id, true])
    );
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allAccepted));
    } catch {
      // silent
    }
    onSave?.(allAccepted);
    onClose();
  }, [categories, onSave, onClose]);

  const handleSaveSelection = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // silent
    }
    onSave?.(preferences);
    onClose();
  }, [preferences, onSave, onClose]);

  if (!open) return null;

  const headingId = 'cookie-pref-modal-heading';

  return (
    <div
      className={cn('fixed inset-0 z-[60] flex items-center justify-center', className)}
      style={{
        ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `color-mix(in oklch, var(--foreground) ${BACKDROP_OPACITY.replace('0.', '')}%, transparent)`,
          backdropFilter: `blur(${BACKDROP_BLUR})`,
          WebkitBackdropFilter: `blur(${BACKDROP_BLUR})`,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative z-10 w-full border shadow-xl"
        style={{
          maxWidth: MODAL_MAX_WIDTH,
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: MODAL_PADDING,
          borderRadius: MODAL_BORDER_RADIUS,
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
          margin: '1rem',
        }}
      >
        {/* Header */}
        <header className="mb-4">
          <h2
            id={headingId}
            className="font-semibold"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            Cookie-Einstellungen
          </h2>
          <p
            className="mt-1"
            style={{
              fontSize: BODY_CLAMP,
              color: 'var(--muted-foreground)',
              lineHeight: 1.6,
            }}
          >
            Wählen Sie, welche Cookies Sie zulassen möchten.
          </p>
        </header>

        {/* Categories */}
        <ul className="space-y-4" role="list">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex items-start justify-between gap-4 border-b pb-4"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={`toggle-${cat.id}`}
                  className="block font-medium"
                  style={{
                    fontSize: LABEL_CLAMP,
                    color: 'var(--foreground)',
                  }}
                >
                  {cat.label}
                  {cat.required && (
                    <span
                      className="ml-2 text-xs font-normal"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      (erforderlich)
                    </span>
                  )}
                </label>
                <p
                  className="mt-0.5"
                  style={{
                    fontSize: BODY_CLAMP,
                    color: 'var(--muted-foreground)',
                    lineHeight: 1.5,
                  }}
                >
                  {cat.description}
                </p>
              </div>
              <ToggleSwitch
                id={`toggle-${cat.id}`}
                checked={cat.required ? true : (preferences[cat.id] ?? false)}
                disabled={cat.required}
                onChange={(value) => handleToggle(cat.id, value)}
              />
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAcceptAll}
            className={cn('font-medium transition-colors', FOCUS_RING)}
            style={{
              padding: `${BUTTON_PADDING_Y} ${BUTTON_PADDING_X}`,
              borderRadius: BUTTON_BORDER_RADIUS,
              fontSize: BODY_CLAMP,
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            Alle akzeptieren
          </button>
          <button
            type="button"
            onClick={handleSaveSelection}
            className={cn('border font-medium transition-colors', FOCUS_RING)}
            style={{
              padding: `${BUTTON_PADDING_Y} ${BUTTON_PADDING_X}`,
              borderRadius: BUTTON_BORDER_RADIUS,
              fontSize: BODY_CLAMP,
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              borderColor: 'var(--border)',
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            Auswahl speichern
          </button>
        </div>
      </div>

      {/* Reduced-motion override */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [role="switch"] span {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
