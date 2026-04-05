// @version 2.0.0
// @category blog
// @name blog-minimal-list
// @source custom

import Link from 'next/link';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';
const SECTION_PADDING = 'px-6 py-16 md:px-12 md:py-24 lg:px-20';
const MAX_CONTENT_WIDTH = 'max-w-3xl';
const HOVER_INDENT_PX = 8;
const ARROW_GAP_HOVER_PX = 6;
const ARROW_GAP_DEFAULT_PX = 4;
const DATE_COL_WIDTH_MD = 'md:w-28';
const DATE_COL_WIDTH_LG = 'lg:w-32';
const ARROW_SIZE = 'size-3.5';

const STYLE_CSS = `
  .minimal-list-item {
    transition: padding-left 0.2s ease;
  }
  .minimal-list-item:hover {
    padding-left: ${HOVER_INDENT_PX}px;
  }
  .minimal-list-title {
    transition: color 0.15s ease;
  }
  .minimal-list-item:hover .minimal-list-title {
    color: var(--primary);
  }
  .minimal-list-arrow {
    transition: gap 0.2s ease;
  }
  .minimal-list-item:hover .minimal-list-arrow {
    gap: ${ARROW_GAP_HOVER_PX}px;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-blog-minimal-list] *,
    [data-blog-minimal-list] *::before,
    [data-blog-minimal-list] *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .minimal-list-item:hover {
      padding-left: 0;
    }
    .minimal-list-item:hover .minimal-list-arrow {
      gap: ${ARROW_GAP_DEFAULT_PX}px;
    }
  }
`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlogPost {
  title: string;
  excerpt: string;
  slug: string;
  imageSrc?: string;
  imageAlt?: string;
  category?: string;
  author?: { name: string; avatarSrc?: string };
  publishedAt: string;
}

interface BlogMinimalListProps {
  posts: BlogPost[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function BlogMinimalList({ posts, className }: BlogMinimalListProps) {
  return (
    <section
      aria-label="Blog-Artikelliste"
      data-blog-minimal-list=""
      className={cn(SECTION_PADDING, className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE_CSS }} />

      <div className={cn('mx-auto', MAX_CONTENT_WIDTH)}>
        <ul className="flex flex-col" role="list">
          {posts.map((post, index) => (
            <li key={post.slug}>
              {/* Divider (not before first item) */}
              {index > 0 && (
                <hr
                  style={{
                    borderColor: 'var(--border)',
                  }}
                  aria-hidden="true"
                />
              )}

              <Link
                href={`/blog/${post.slug}`}
                className={cn(
                  'group flex flex-col gap-2 py-8 md:flex-row md:gap-8 md:py-10 minimal-list-item',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md',
                )}
                style={{
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {/* Date column */}
                <div className={cn('shrink-0', DATE_COL_WIDTH_MD, DATE_COL_WIDTH_LG)}>
                  <time
                    dateTime={post.publishedAt}
                    className="text-sm tabular-nums"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {post.publishedAt}
                  </time>
                </div>

                {/* Content column */}
                <div className="flex-1">
                  {post.category && (
                    <span
                      className="mb-1.5 block text-xs font-medium tracking-wide uppercase"
                      style={{ color: 'var(--primary)' }}
                    >
                      {post.category}
                    </span>
                  )}
                  <h3
                    className="font-semibold leading-snug minimal-list-title"
                    style={{
                      fontSize: HEADING_CLAMP,
                      color: 'var(--foreground)',
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="mt-1.5 line-clamp-2 text-sm leading-relaxed md:text-base"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Read more indicator */}
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium minimal-list-arrow"
                    style={{ color: 'var(--primary)' }}
                    aria-hidden="true"
                  >
                    Weiterlesen
                    <svg
                      className={ARROW_SIZE}
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3.333 8h9.334M8.667 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
