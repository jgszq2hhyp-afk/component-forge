// @version 1.0.0 // @category sidebar // @name sidebar-blog // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIDEBAR_MAX_WIDTH = '20rem';
const HEADING_FONT_SIZE = 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)';
const SECTION_GAP = '2rem';
const TAG_PADDING_X = '0.75rem';
const TAG_PADDING_Y = '0.375rem';
const TAG_FONT_SIZE = '0.75rem';
const TAG_BORDER_RADIUS = '9999px';
const SEARCH_INPUT_HEIGHT = '2.5rem';
const SEARCH_ICON_SIZE = 18;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlogCategory {
  name: string;
  count: number;
  href: string;
}

interface RecentPost {
  title: string;
  date: string;
  href: string;
}

interface BlogTag {
  name: string;
  href: string;
}

interface SidebarBlogProps {
  /** Category list with post counts */
  categories?: BlogCategory[];
  /** Recent posts to display */
  recentPosts?: RecentPost[];
  /** Tags for the tag cloud */
  tags?: BlogTag[];
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Search icon (inline SVG)
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <svg
      width={SEARCH_ICON_SIZE}
      height={SEARCH_ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ color: 'var(--muted-foreground)' }}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Section heading
// ---------------------------------------------------------------------------

function SidebarHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className="font-semibold tracking-tight"
      style={{
        fontSize: HEADING_FONT_SIZE,
        color: 'var(--foreground)',
        marginBottom: '0.75rem',
      }}
    >
      {children}
    </h3>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SidebarBlog({
  categories = [],
  recentPosts = [],
  tags = [],
  className,
}: SidebarBlogProps) {
  const searchHeadingId = 'sidebar-search-heading';
  const categoriesHeadingId = 'sidebar-categories-heading';
  const recentHeadingId = 'sidebar-recent-heading';
  const tagsHeadingId = 'sidebar-tags-heading';

  return (
    <aside
      className={cn('flex flex-col', className)}
      style={{
        maxWidth: SIDEBAR_MAX_WIDTH,
        gap: SECTION_GAP,
      }}
      aria-label="Blog sidebar"
    >
      {/* ---- Search ---- */}
      <section aria-labelledby={searchHeadingId}>
        <SidebarHeading id={searchHeadingId}>Search</SidebarHeading>
        <form role="search" action="/search" method="get">
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute left-3 flex items-center">
              <SearchIcon />
            </div>
            <input
              type="search"
              name="q"
              placeholder="Search articles..."
              aria-label="Search articles"
              className={cn(
                'w-full rounded-lg pl-10 pr-4 text-sm',
                'placeholder:text-[var(--muted-foreground)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'motion-safe:transition-colors',
              )}
              style={{
                height: SEARCH_INPUT_HEIGHT,
                backgroundColor: 'var(--card, hsl(0 0% 100%))',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            />
          </div>
        </form>
      </section>

      {/* ---- Categories ---- */}
      {categories.length > 0 && (
        <section aria-labelledby={categoriesHeadingId}>
          <SidebarHeading id={categoriesHeadingId}>Categories</SidebarHeading>
          <nav aria-label="Blog categories">
            <ul className="flex flex-col gap-1" role="list">
              {categories.map((category) => (
                <li key={category.href}>
                  <a
                    href={category.href}
                    className={cn(
                      'flex items-center justify-between rounded-md px-3 py-2 text-sm',
                      'hover:bg-[var(--muted,hsl(210_40%_96%))]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      'motion-safe:transition-colors motion-safe:duration-150',
                    )}
                    style={{
                      color: 'var(--foreground)',
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    <span>{category.name}</span>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: 'var(--muted, hsl(210 40% 96%))',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {category.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}

      {/* ---- Recent Posts ---- */}
      {recentPosts.length > 0 && (
        <section aria-labelledby={recentHeadingId}>
          <SidebarHeading id={recentHeadingId}>Recent Posts</SidebarHeading>
          <nav aria-label="Recent blog posts">
            <ul className="flex flex-col gap-3" role="list">
              {recentPosts.map((post) => (
                <li key={post.href}>
                  <a
                    href={post.href}
                    className={cn(
                      'group block rounded-md px-3 py-2',
                      'hover:bg-[var(--muted,hsl(210_40%_96%))]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      'motion-safe:transition-colors motion-safe:duration-150',
                    )}
                    style={{
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    <span
                      className="block text-sm font-medium leading-snug"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {post.title}
                    </span>
                    <time
                      dateTime={post.date}
                      className="mt-1 block text-xs"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {post.date}
                    </time>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}

      {/* ---- Tags ---- */}
      {tags.length > 0 && (
        <section aria-labelledby={tagsHeadingId}>
          <SidebarHeading id={tagsHeadingId}>Tags</SidebarHeading>
          <nav aria-label="Blog tags">
            <ul className="flex flex-wrap gap-2" role="list">
              {tags.map((tag) => (
                <li key={tag.href}>
                  <a
                    href={tag.href}
                    className={cn(
                      'inline-block font-medium',
                      'hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      'motion-safe:transition-colors motion-safe:duration-150',
                    )}
                    style={{
                      fontSize: TAG_FONT_SIZE,
                      padding: `${TAG_PADDING_Y} ${TAG_PADDING_X}`,
                      borderRadius: TAG_BORDER_RADIUS,
                      backgroundColor: 'var(--muted, hsl(210 40% 96%))',
                      color: 'var(--muted-foreground)',
                      ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    {tag.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}
    </aside>
  );
}
