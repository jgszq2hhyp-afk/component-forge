// @version 2.0.0
// @category navigation
// @name Nav Sidebar
// @score 92
// @source custom-implementation

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIDEBAR_WIDTH_EXPANDED = '16rem';
const SIDEBAR_WIDTH_COLLAPSED = '4rem';
const MOBILE_TOPBAR_HEIGHT = '3.5rem';
const LOGO_PY = '1.25rem';
const LOGO_PX = '1rem';
const GROUP_SPACING = '1.5rem';
const LINK_PY = '0.5rem';
const LINK_PX = '0.75rem';
const LINK_GAP = '0.75rem';
const LINK_BORDER_RADIUS = '0.5rem';
const COLLAPSE_ICON_SIZE = 16;
const NAV_ICON_SIZE = 20;
const HAMBURGER_SIZE = 20;
const HAMBURGER_STROKE = 2;
const COLLAPSE_STROKE = 2;
const TRANSITION_DURATION_MS = '300ms';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const ringStyle = {
  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
  ['--tw-ring-offset-color' as string]: 'var(--background)',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SidebarLink {
  icon?: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
}

interface SidebarGroup {
  title?: string;
  links: SidebarLink[];
}

interface NavSidebarProps {
  logo?: React.ReactNode;
  groups?: SidebarGroup[];
  footerLinks?: SidebarLink[];
  activeHref?: string;
  className?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Default icon
// ---------------------------------------------------------------------------

const defaultIcon = (
  <svg
    style={{ width: NAV_ICON_SIZE, height: NAV_ICON_SIZE }}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
  </svg>
);

const defaultGroups: SidebarGroup[] = [
  {
    links: [
      { label: 'Dashboard', href: '#dashboard', icon: defaultIcon },
      { label: 'Analytics', href: '#analytics', icon: defaultIcon, badge: 'New' },
      { label: 'Projects', href: '#projects', icon: defaultIcon },
    ],
  },
  {
    title: 'Management',
    links: [
      { label: 'Team', href: '#team', icon: defaultIcon },
      { label: 'Settings', href: '#settings', icon: defaultIcon },
      { label: 'Billing', href: '#billing', icon: defaultIcon },
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavSidebar({
  logo = 'Brand',
  groups = defaultGroups,
  footerLinks = [
    { label: 'Help', href: '#help', icon: defaultIcon },
    { label: 'Logout', href: '#logout', icon: defaultIcon },
  ],
  activeHref = '#dashboard',
  className,
  collapsed: controlledCollapsed,
  onCollapsedChange,
}: NavSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

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

  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();

      const container = navLinksRef.current;
      if (!container) return;

      const focusableLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('a'));
      const currentIndex = focusableLinks.indexOf(document.activeElement as HTMLAnchorElement);

      let nextIndex: number;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < focusableLinks.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableLinks.length - 1;
      }

      focusableLinks[nextIndex]?.focus();
    },
    [],
  );

  const sidebarContent = (
    <div className="flex h-full flex-col" ref={navLinksRef} onKeyDown={handleNavKeyDown}>
      <div
        className="flex items-center justify-between"
        style={{
          padding: `${LOGO_PY} ${LOGO_PX}`,
          borderBottom: '1px solid var(--sidebar-border, var(--border))',
        }}
      >
        {!collapsed && (
          <a
            href="/"
            aria-label="Home"
            className={cn(
              'text-lg font-bold rounded-lg',
              focusRing,
            )}
            style={{
              color: 'var(--sidebar-logo, var(--foreground))',
              ...ringStyle,
            }}
          >
            {logo}
          </a>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'hidden lg:flex p-1.5 rounded-lg',
            focusRing,
          )}
          style={{
            color: 'var(--sidebar-muted, var(--muted-foreground))',
            ...ringStyle,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              'var(--sidebar-hover-bg, var(--muted))';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
          }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={cn(collapsed && 'rotate-180')}
            style={{ width: COLLAPSE_ICON_SIZE, height: COLLAPSE_ICON_SIZE }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={COLLAPSE_STROKE}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4" style={{ display: 'flex', flexDirection: 'column', gap: GROUP_SPACING }}>
        {groups.map((group, gi) => (
          <div key={gi} role="group" aria-label={group.title ?? `Navigation group ${gi + 1}`}>
            {group.title && !collapsed && (
              <p
                className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--sidebar-muted, var(--muted-foreground))' }}
                id={`sidebar-group-${gi}`}
              >
                {group.title}
              </p>
            )}
            <ul
              className="space-y-1"
              role="menu"
              aria-labelledby={group.title ? `sidebar-group-${gi}` : undefined}
            >
              {group.links.map((link) => {
                const isActive = link.href === activeHref;
                return (
                  <li key={link.href} role="none">
                    <a
                      href={link.href}
                      role="menuitem"
                      title={collapsed ? link.label : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center text-sm font-medium',
                        collapsed && 'justify-center',
                        focusRing,
                      )}
                      style={{
                        color: isActive
                          ? 'var(--sidebar-active-text, var(--foreground))'
                          : 'var(--sidebar-link, var(--muted-foreground))',
                        backgroundColor: isActive
                          ? 'var(--sidebar-active-bg, var(--muted))'
                          : 'transparent',
                        gap: collapsed ? 0 : LINK_GAP,
                        borderRadius: LINK_BORDER_RADIUS,
                        padding: collapsed ? `${LINK_PY} 0.5rem` : `${LINK_PY} ${LINK_PX}`,
                        ...ringStyle,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.backgroundColor =
                            'var(--sidebar-hover-bg, var(--muted))';
                          (e.currentTarget as HTMLElement).style.color =
                            'var(--sidebar-link-hover, var(--foreground))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                          (e.currentTarget as HTMLElement).style.color =
                            'var(--sidebar-link, var(--muted-foreground))';
                        }
                      }}
                    >
                      {link.icon && (
                        <span className="flex-shrink-0" aria-hidden="true">{link.icon}</span>
                      )}
                      {!collapsed && (
                        <>
                          <span className="flex-1">{link.label}</span>
                          {link.badge && (
                            <span
                              className="rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                backgroundColor: 'var(--sidebar-badge-bg, var(--primary))',
                                color: 'var(--sidebar-badge-text, var(--primary-foreground))',
                              }}
                            >
                              {link.badge}
                            </span>
                          )}
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="px-3 py-3 space-y-1"
        style={{ borderTop: '1px solid var(--sidebar-border, var(--border))' }}
      >
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            title={collapsed ? link.label : undefined}
            className={cn(
              'flex items-center text-sm font-medium',
              collapsed && 'justify-center',
              focusRing,
            )}
            style={{
              color: 'var(--sidebar-link, var(--muted-foreground))',
              gap: collapsed ? 0 : LINK_GAP,
              borderRadius: LINK_BORDER_RADIUS,
              padding: collapsed ? `${LINK_PY} 0.5rem` : `${LINK_PY} ${LINK_PX}`,
              ...ringStyle,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                'var(--sidebar-hover-bg, var(--muted))';
              (e.currentTarget as HTMLElement).style.color =
                'var(--sidebar-link-hover, var(--foreground))';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.color =
                'var(--sidebar-link, var(--muted-foreground))';
            }}
          >
            {link.icon && <span className="flex-shrink-0" aria-hidden="true">{link.icon}</span>}
            {!collapsed && <span>{link.label}</span>}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
        style={{
          height: MOBILE_TOPBAR_HEIGHT,
          backgroundColor: 'var(--sidebar-bg, var(--background))',
          borderBottom: '1px solid var(--sidebar-border, var(--border))',
        }}
        aria-label="Mobile header"
      >
        <a
          href="/"
          aria-label="Home"
          className={cn(
            'text-lg font-bold rounded-lg',
            focusRing,
          )}
          style={{
            color: 'var(--sidebar-logo, var(--foreground))',
            ...ringStyle,
          }}
        >
          {logo}
        </a>
        <button
          ref={mobileToggleRef}
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            'p-2 rounded-lg',
            focusRing,
          )}
          style={{
            color: 'var(--sidebar-muted, var(--muted-foreground))',
            ...ringStyle,
          }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="sidebar-nav"
        >
          <svg
            style={{ width: HAMBURGER_SIZE, height: HAMBURGER_SIZE }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={HAMBURGER_STROKE}
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 50%, transparent)' }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        id="sidebar-nav"
        aria-label="Sidebar navigation"
        className={cn(
          'fixed top-0 left-0 z-50 h-screen',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className,
        )}
        style={{
          width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
          transitionProperty: 'width, transform',
          transitionDuration: TRANSITION_DURATION_MS,
          backgroundColor: 'var(--sidebar-bg, var(--background))',
          borderRight: '1px solid var(--sidebar-border, var(--border))',
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
