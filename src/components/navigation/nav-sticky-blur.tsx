// @version 2.0.0
// @category navigation
// @name nav-sticky-blur
// @source self-authored

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCROLL_THRESHOLD = 50;
const LOGO_FONT_SIZE = 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)';
const SPRING_STIFFNESS = 500;
const SPRING_DAMPING = 35;
const PANEL_SPRING_STIFFNESS = 400;
const PANEL_SPRING_DAMPING = 40;
const LINK_STAGGER_DELAY = 0.05;
const LINK_STAGGER_OFFSET = 0.15;
const LINK_STAGGER_DURATION = 0.3;
const ACTIVE_LINK_OPACITY = 0.7;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const mobileMenuVariants = {
  closed: { x: '100%' },
  open: { x: 0 },
} as const;

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
} as const;

const linkVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: LINK_STAGGER_DELAY * i + LINK_STAGGER_OFFSET, duration: LINK_STAGGER_DURATION },
  }),
} as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavStickyBlurProps {
  logo?: React.ReactNode;
  logoText?: string;
  links: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Reduced-motion helper
// ---------------------------------------------------------------------------

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NavStickyBlur({
  logo,
  logoText,
  links,
  ctaText,
  ctaHref = '#',
  className,
}: NavStickyBlurProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const reducedMotion = usePrefersReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  useEffect(() => {
    const updateActive = () => {
      setActiveHref(window.location.hash || window.location.pathname);
    };
    updateActive();
    window.addEventListener('hashchange', updateActive);
    return () => window.removeEventListener('hashchange', updateActive);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    },
    [mobileOpen],
  );

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
  }, [mobileOpen]);

  const transitionDuration = reducedMotion ? 0 : 0.3;

  return (
    <>
      <nav
        ref={navRef}
        onKeyDown={handleKeyDown}
        aria-label="Main navigation"
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-16 lg:h-20',
          'transition-[background-color,border-color,box-shadow]',
          reducedMotion ? 'duration-0' : 'duration-300',
          'ease-out',
          scrolled
            ? 'border-b shadow-sm backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
          className,
        )}
        style={{
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--background) 80%, transparent)'
            : 'transparent',
          borderColor: scrolled
            ? 'color-mix(in srgb, var(--border) 50%, transparent)'
            : 'transparent',
        }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className={cn(
              'relative z-10 flex shrink-0 items-center gap-2 rounded-md',
              focusRing,
            )}
            style={{
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            {logo}
            {logoText && (
              <span
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--foreground)',
                  fontSize: LOGO_FONT_SIZE,
                }}
              >
                {logoText}
              </span>
            )}
          </a>

          <ul className="hidden items-center gap-1 lg:flex" role="menubar">
            {links.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setActiveHref(link.href)}
                    className={cn(
                      'relative rounded-md px-3 py-2 text-sm font-medium',
                      'transition-colors',
                      reducedMotion ? 'duration-0' : 'duration-200',
                      focusRing,
                    )}
                    style={{
                      color: isActive
                        ? 'var(--primary)'
                        : `color-mix(in srgb, var(--foreground) ${ACTIVE_LINK_OPACITY * 100}%, transparent)`,
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color =
                        'var(--foreground)';
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = isActive
                        ? 'var(--primary)'
                        : `color-mix(in srgb, var(--foreground) ${ACTIVE_LINK_OPACITY * 100}%, transparent)`;
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--primary)' }}
                        aria-hidden="true"
                        transition={{
                          type: 'spring',
                          stiffness: SPRING_STIFFNESS,
                          damping: SPRING_DAMPING,
                          duration: reducedMotion ? 0 : undefined,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {ctaText && (
              <a
                href={ctaHref}
                className={cn(
                  'hidden rounded-full px-5 py-2 text-sm font-semibold lg:inline-flex',
                  focusRing,
                  'transition-transform',
                  reducedMotion ? 'duration-0' : 'duration-200',
                  !reducedMotion && 'hover:scale-105 active:scale-[0.98]',
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground, var(--background))',
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {ctaText}
              </a>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              className={cn(
                'relative z-10 inline-flex items-center justify-center rounded-md p-2 lg:hidden',
                focusRing,
                'transition-colors',
                reducedMotion ? 'duration-0' : 'duration-200',
              )}
              style={{
                color: 'var(--foreground)',
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: transitionDuration }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-50 lg:hidden"
              style={{
                backgroundColor:
                  'color-mix(in srgb, var(--background) 60%, transparent)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            <motion.aside
              key="mobile-panel"
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{
                type: reducedMotion ? 'tween' : 'spring',
                stiffness: PANEL_SPRING_STIFFNESS,
                damping: PANEL_SPRING_DAMPING,
                duration: transitionDuration,
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Escape') {
                  setMobileOpen(false);
                }
                if (e.key === 'Tab' && !e.shiftKey) {
                  if (document.activeElement === lastLinkRef.current) {
                    e.preventDefault();
                    closeButtonRef.current?.focus();
                  }
                }
                if (e.key === 'Tab' && e.shiftKey) {
                  if (document.activeElement === closeButtonRef.current) {
                    e.preventDefault();
                    lastLinkRef.current?.focus();
                  }
                }
              }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col lg:hidden"
              style={{
                backgroundColor: 'var(--background)',
                borderLeft: '1px solid var(--border)',
              }}
            >
              <div className="flex h-16 items-center justify-end px-4 sm:px-6">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className={cn(
                    'inline-flex items-center justify-center rounded-md p-2',
                    focusRing,
                    'transition-colors',
                    reducedMotion ? 'duration-0' : 'duration-200',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  <X className="size-6" aria-hidden="true" />
                </button>
              </div>

              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-8 sm:px-6">
                {links.map((link, i) => {
                  const isActive = activeHref === link.href;
                  const isLast = i === links.length - 1 && !ctaText;
                  return (
                    <motion.li
                      key={link.href}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      custom={i}
                    >
                      <a
                        href={link.href}
                        ref={isLast ? lastLinkRef : undefined}
                        onClick={() => {
                          setActiveHref(link.href);
                          setMobileOpen(false);
                        }}
                        className={cn(
                          'block rounded-lg px-4 py-3 text-base font-medium',
                          focusRing,
                          'transition-colors',
                          reducedMotion ? 'duration-0' : 'duration-200',
                        )}
                        style={{
                          color: isActive
                            ? 'var(--primary)'
                            : 'var(--foreground)',
                          backgroundColor: isActive
                            ? 'color-mix(in srgb, var(--primary) 10%, transparent)'
                            : 'transparent',
                          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                          ['--tw-ring-offset-color' as string]: 'var(--background)',
                        }}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}

                {ctaText && (
                  <motion.li
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    custom={links.length}
                    className="mt-4"
                  >
                    <a
                      href={ctaHref}
                      ref={lastLinkRef}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block rounded-full px-4 py-3 text-center text-base font-semibold',
                        focusRing,
                        'transition-transform',
                        reducedMotion ? 'duration-0' : 'duration-200',
                        !reducedMotion && 'active:scale-[0.98]',
                      )}
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground, var(--background))',
                        ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                        ['--tw-ring-offset-color' as string]: 'var(--background)',
                      }}
                    >
                      {ctaText}
                    </a>
                  </motion.li>
                )}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
