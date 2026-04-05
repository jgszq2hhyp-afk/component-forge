// @version 1.0.0
// @category avatar
// @name avatar-profile-card
// @source custom

import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const AVATAR_DIMENSION = 96;
const AVATAR_FALLBACK_SIZE = 'text-2xl';
const NAME_CLAMP = 'clamp(1.25rem, 2vw + 0.75rem, 1.75rem)';
const ROLE_CLAMP = 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)';
const CARD_PADDING = 'clamp(1.5rem, 3vw, 2.5rem)';
const CARD_MAX_WIDTH = '28rem';
const CARD_BORDER_RADIUS = '1rem';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

interface Stat {
  label: string;
  value: string;
}

interface AvatarProfileCardProps {
  name: string;
  role: string;
  bio?: string;
  avatarSrc?: string;
  socialLinks?: SocialLink[];
  stats?: Stat[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Helper: extract initials
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------------------
// Sub-component: Avatar with fallback
// ---------------------------------------------------------------------------

function ProfileAvatar({
  src,
  name,
}: {
  src?: string;
  name: string;
}) {
  if (src) {
    return (
      <div
        className="relative mx-auto overflow-hidden rounded-full"
        style={{ width: AVATAR_DIMENSION, height: AVATAR_DIMENSION }}
      >
        <Image
          src={src}
          alt={`Profile photo of ${name}`}
          width={AVATAR_DIMENSION}
          height={AVATAR_DIMENSION}
          className="rounded-full object-cover"
          style={{ width: AVATAR_DIMENSION, height: AVATAR_DIMENSION }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mx-auto flex items-center justify-center rounded-full',
        AVATAR_FALLBACK_SIZE,
        'bg-[var(--avatar-fallback-bg,var(--primary,hsl(222_47%_11%)))]',
        'text-[var(--avatar-fallback-text,var(--primary-foreground,hsl(210_40%_98%)))]',
        'font-semibold select-none'
      )}
      style={{ width: AVATAR_DIMENSION, height: AVATAR_DIMENSION }}
      role="img"
      aria-label={`Initials of ${name}`}
    >
      {getInitials(name)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Stats Row
// ---------------------------------------------------------------------------

function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <dl
      className={cn(
        'flex items-center justify-center gap-6',
        'border-t border-[var(--profile-border,var(--border,hsl(214_32%_91%)))]',
        'pt-4 mt-4'
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="flex flex-col">
            <span
              className={cn(
                'font-bold',
                'text-[var(--profile-stat-value,var(--foreground,hsl(222_47%_11%)))]'
              )}
            >
              {stat.value}
            </span>
            <span
              className={cn(
                'text-xs',
                'text-[var(--profile-stat-label,var(--muted-foreground,hsl(215_16%_47%)))]'
              )}
            >
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Social Links
// ---------------------------------------------------------------------------

function SocialLinksRow({ links }: { links: SocialLink[] }) {
  return (
    <nav aria-label="Social links" className="flex items-center justify-center gap-3 mt-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={cn(
            'inline-flex items-center justify-center',
            'size-9 rounded-full',
            'bg-[var(--profile-social-bg,var(--muted,hsl(210_40%_96%)))]',
            'text-[var(--profile-social-text,var(--muted-foreground,hsl(215_16%_47%)))]',
            'transition-colors duration-200',
            'hover:bg-[var(--profile-social-hover-bg,var(--accent,hsl(210_40%_90%)))]',
            'hover:text-[var(--profile-social-hover-text,var(--accent-foreground,hsl(222_47%_11%)))]',
            FOCUS_RING
          )}
          style={{
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
          }}
        >
          {link.icon}
        </a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function AvatarProfileCard({
  name,
  role,
  bio,
  avatarSrc,
  socialLinks,
  stats,
  className,
}: AvatarProfileCardProps) {
  return (
    <article
      className={cn(
        'mx-auto text-center rounded-2xl',
        'bg-[var(--profile-bg,var(--card,hsl(0_0%_100%)))]',
        'border border-[var(--profile-border,var(--border,hsl(214_32%_91%)))]',
        'shadow-sm',
        className
      )}
      style={{
        padding: CARD_PADDING,
        maxWidth: CARD_MAX_WIDTH,
        borderRadius: CARD_BORDER_RADIUS,
      }}
      aria-label={`Profile card for ${name}`}
    >
      {/* Avatar */}
      <ProfileAvatar src={avatarSrc} name={name} />

      {/* Name */}
      <h2
        className={cn(
          'mt-4 font-bold',
          'text-[var(--profile-name,var(--foreground,hsl(222_47%_11%)))]'
        )}
        style={{ fontSize: NAME_CLAMP }}
      >
        {name}
      </h2>

      {/* Role */}
      <p
        className={cn(
          'mt-1',
          'text-[var(--profile-role,var(--muted-foreground,hsl(215_16%_47%)))]'
        )}
        style={{ fontSize: ROLE_CLAMP }}
      >
        {role}
      </p>

      {/* Bio */}
      {bio && (
        <p
          className={cn(
            'mt-3 leading-relaxed',
            'text-sm',
            'text-[var(--profile-bio,var(--muted-foreground,hsl(215_16%_47%)))]',
            'max-w-prose mx-auto'
          )}
        >
          {bio}
        </p>
      )}

      {/* Social Links */}
      {socialLinks && socialLinks.length > 0 && (
        <SocialLinksRow links={socialLinks} />
      )}

      {/* Stats */}
      {stats && stats.length > 0 && <StatsRow stats={stats} />}
    </article>
  );
}
