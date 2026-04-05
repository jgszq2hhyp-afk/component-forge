// @version 1.0.0
// @category blog
// @name blog-author-bio
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const AVATAR_SIZE = 'size-20 sm:size-24' as const;
const FALLBACK_AVATAR = '' as const;
const MAX_WIDTH = 'max-w-2xl' as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface SocialLink {
  /** Accessible label, e.g. "Twitter" */
  label: string;
  /** URL */
  href: string;
}

interface BlogAuthorBioProps {
  /** Author full name */
  name: string;
  /** Short biography */
  bio: string;
  /** Avatar image source URL */
  avatarSrc?: string;
  /** List of social / external links */
  socialLinks?: SocialLink[];
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  External-link icon                                                */
/* ------------------------------------------------------------------ */

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn('size-3.5', className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.5-2.25a.75.75 0 01.75-.75h4a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0V5.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22H12.5a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Initials fallback                                                 */
/* ------------------------------------------------------------------ */

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BlogAuthorBio({
  name,
  bio,
  avatarSrc = FALLBACK_AVATAR,
  socialLinks = [],
  className,
}: BlogAuthorBioProps) {
  const initials = getInitials(name);

  return (
    <article
      aria-label={`Über ${name}`}
      className={cn(
        MAX_WIDTH,
        'rounded-2xl border border-[var(--color-border,hsl(0_0%_88%))]',
        'bg-[var(--color-surface,hsl(0_0%_100%))]',
        'p-6 sm:p-8',
        'shadow-sm',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        {/* Avatar */}
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`Profilbild von ${name}`}
            className={cn(
              AVATAR_SIZE,
              'shrink-0 rounded-full object-cover',
              'border-2 border-[var(--color-border,hsl(0_0%_88%))]',
            )}
          />
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              AVATAR_SIZE,
              'flex shrink-0 items-center justify-center rounded-full',
              'bg-[var(--color-muted,hsl(0_0%_95%))]',
              'text-lg font-semibold text-[var(--color-text-muted,hsl(0_0%_45%))]',
              'border-2 border-[var(--color-border,hsl(0_0%_88%))]',
            )}
          >
            {initials}
          </span>
        )}

        {/* Text content */}
        <div className="flex-1 text-center sm:text-left">
          <h3
            className="font-bold tracking-tight text-[var(--color-text,hsl(0_0%_8%))]"
            style={{ fontSize: 'clamp(1.125rem, 1rem + 0.5vw, 1.375rem)' }}
          >
            {name}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted,hsl(0_0%_35%))]">
            {bio}
          </p>

          {/* Social links */}
          {socialLinks.length > 0 && (
            <nav aria-label="Social-Media-Links" className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full',
                    'border border-[var(--color-border,hsl(0_0%_85%))]',
                    'px-3 py-1 text-xs font-medium',
                    'text-[var(--color-text,hsl(0_0%_15%))]',
                    'hover:bg-[var(--color-muted,hsl(0_0%_95%))]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
                    'motion-safe:transition-colors motion-safe:duration-200',
                    'motion-reduce:transition-none',
                  )}
                >
                  {link.label}
                  <ExternalLinkIcon />
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </article>
  );
}
