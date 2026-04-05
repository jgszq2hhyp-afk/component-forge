// @version 1.0.0
// @category login
// @name login-split-image
// @source custom

'use client';

import { type FormEvent, type ReactNode, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ─── Named Constants ─── */
const MIN_PASSWORD_LENGTH = 1;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RING_STYLE = { ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' };

/* ─── Types ─── */
interface SocialProvider {
  name: string;
  icon: ReactNode;
  onClick?: () => void;
}

interface LoginSplitImageProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  imageSrc?: string;
  imageAlt?: string;
  brandName?: string;
  brandLogo?: ReactNode;
  socialProviders?: SocialProvider[];
  signupHref?: string;
  forgotPasswordHref?: string;
  className?: string;
}

/* ─── Icons ─── */
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* ─── Component ─── */
export function LoginSplitImage({
  onSubmit,
  imageSrc = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
  imageAlt = 'Decorative background',
  brandName = 'Brand',
  brandLogo,
  socialProviders = [],
  signupHref = '/signup',
  forgotPasswordHref = '/forgot-password',
  className,
}: LoginSplitImageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const next: { email?: string; password?: string } = {};
    if (!email.trim()) {
      next.email = 'E-Mail ist erforderlich';
    } else if (!EMAIL_REGEX.test(email)) {
      next.email = 'Bitte gültige E-Mail eingeben';
    }
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      next.password = 'Passwort ist erforderlich';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validate()) return;
      setIsSubmitting(true);
      onSubmit?.({ email, password });
      // Reset after a tick so consumer can handle async
      setTimeout(() => setIsSubmitting(false), 0);
    },
    [email, password, validate, onSubmit],
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .login-split-image__image {
          animation: login-split-fade-in 600ms ease-out both;
        }
        @keyframes login-split-fade-in {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .login-split-image__image {
            animation: none;
          }
        }
      `}} />

      <div
        className={cn(
          'grid min-h-screen lg:grid-cols-2',
          'bg-[var(--background)] text-[var(--foreground)]',
          className,
        )}
      >
        {/* ─── Left: Form ─── */}
        <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Brand */}
            <div className="flex flex-col items-center gap-3">
              {brandLogo ? (
                <div className="shrink-0">{brandLogo}</div>
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]"
                  style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)' }}
                  aria-hidden="true"
                >
                  {brandName.charAt(0)}
                </div>
              )}
              <h1
                className="font-bold tracking-tight text-[var(--foreground)]"
                style={{ fontSize: 'clamp(1.5rem, 2vw + 1rem, 2rem)' }}
              >
                Willkommen zurück
              </h1>
              <p
                className="text-[var(--muted-foreground)]"
                style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1rem)' }}
              >
                Melden Sie sich bei {brandName} an
              </p>
            </div>

            {/* Social Providers */}
            {socialProviders.length > 0 && (
              <div className="space-y-3">
                {socialProviders.map((provider) => (
                  <button
                    key={provider.name}
                    type="button"
                    onClick={provider.onClick}
                    style={RING_STYLE}
                    className={cn(
                      'flex w-full items-center justify-center gap-3 rounded-lg',
                      'border border-[var(--border)] bg-[var(--background)]',
                      'px-4 py-2.5 text-sm font-medium',
                      'transition-colors hover:bg-[var(--accent)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    )}
                  >
                    <span className="shrink-0">{provider.icon}</span>
                    <span>Mit {provider.name} anmelden</span>
                  </button>
                ))}

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--border)]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[var(--background)] px-2 text-[var(--muted-foreground)]">
                      oder per E-Mail
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              aria-label="Login"
              className="space-y-5"
              noValidate
            >
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-[var(--foreground)]"
                >
                  E-Mail
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'login-email-error' : undefined}
                  placeholder="name@beispiel.de"
                  style={RING_STYLE}
                  className={cn(
                    'block w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm',
                    'placeholder:text-[var(--muted-foreground)]',
                    'transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    errors.email
                      ? 'border-[var(--destructive)]'
                      : 'border-[var(--border)]',
                  )}
                />
                {errors.email && (
                  <p id="login-email-error" className="text-xs text-[var(--destructive)]" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-[var(--foreground)]"
                  >
                    Passwort
                  </label>
                  <a
                    href={forgotPasswordHref}
                    className={cn(
                      'text-xs font-medium text-[var(--primary)] hover:underline',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                    )}
                    style={RING_STYLE}
                  >
                    Passwort vergessen?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'login-password-error' : undefined}
                    placeholder="••••••••"
                    style={RING_STYLE}
                    className={cn(
                      'block w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 pr-10 text-sm',
                      'placeholder:text-[var(--muted-foreground)]',
                      'transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      errors.password
                        ? 'border-[var(--destructive)]'
                        : 'border-[var(--border)]',
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                    style={RING_STYLE}
                    className={cn(
                      'absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1',
                      'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
                      'transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    )}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && (
                  <p id="login-password-error" className="text-xs text-[var(--destructive)]" role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="login-remember"
                  name="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={RING_STYLE}
                  className={cn(
                    'h-4 w-4 rounded border-[var(--border)] text-[var(--primary)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                />
                <label htmlFor="login-remember" className="text-sm text-[var(--muted-foreground)]">
                  Angemeldet bleiben
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={RING_STYLE}
                className={cn(
                  'flex w-full items-center justify-center rounded-lg',
                  'bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-[var(--primary-foreground)]',
                  'transition-opacity hover:opacity-90 disabled:opacity-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
              >
                {isSubmitting ? 'Wird angemeldet...' : 'Anmelden'}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[var(--muted-foreground)]">
              Noch kein Konto?{' '}
              <a
                href={signupHref}
                className={cn(
                  'font-medium text-[var(--primary)] hover:underline rounded-sm',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={RING_STYLE}
              >
                Jetzt registrieren
              </a>
            </p>
          </div>
        </div>

        {/* ─── Right: Image (hidden on mobile) ─── */}
        <div
          className="login-split-image__image hidden lg:block relative overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[var(--primary)]/10" />
        </div>
      </div>
    </>
  );
}

export default LoginSplitImage;
