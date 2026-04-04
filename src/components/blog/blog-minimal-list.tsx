// @version 1.0.0
// @category blog
// @name blog-minimal-list
// @source custom

import Link from 'next/link';
import { cn } from '@/lib/utils';

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
// Component (server component — pure typography, no images)
// ---------------------------------------------------------------------------

export default function BlogMinimalList({ posts, className }: BlogMinimalListProps) {
  return (
    <section
      className={cn('px-6 py-16 md:px-12 md:py-24 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-3xl">
        <ul className="flex flex-col" role="list">
          {posts.map((post, index) => (
            <li key={post.slug}>
              {/* Divider (not before first item) */}
              {index > 0 && (
                <div
                  className="my-0"
                  style={{
                    borderTopWidth: '1px',
                    borderColor: 'var(--border)',
                  }}
                  aria-hidden="true"
                />
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 md:flex-row md:gap-8 md:py-10 minimal-list-item"
              >
                {/* Date column */}
                <div className="shrink-0 md:w-28 lg:w-32">
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
                    className="text-lg font-semibold leading-snug md:text-xl minimal-list-title"
                    style={{ color: 'var(--foreground)' }}
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
                  >
                    Weiterlesen
                    <svg
                      className="size-3.5"
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

      {/* Subtle hover animation with reduced-motion support */}
      <style>{`
        .minimal-list-item {
          transition: padding-left 0.2s ease;
        }
        .minimal-list-item:hover {
          padding-left: 8px;
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
          gap: 6px;
        }
        @media (prefers-reduced-motion: reduce) {
          .minimal-list-item,
          .minimal-list-title,
          .minimal-list-arrow {
            transition: none !important;
          }
          .minimal-list-item:hover {
            padding-left: 0;
          }
          .minimal-list-item:hover .minimal-list-arrow {
            gap: 4px;
          }
        }
      `}</style>
    </section>
  );
}
