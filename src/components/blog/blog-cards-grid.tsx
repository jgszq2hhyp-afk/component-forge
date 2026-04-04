// @version 2.0.0
// @category blog
// @name blog-cards-grid
// @source custom

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CARD_LIFT_DISTANCE = '-4px';
const CARD_SHADOW = '0 12px 32px color-mix(in srgb, var(--foreground) 8%, transparent)';
const IMAGE_ZOOM_SCALE = '1.04';
const HOVER_TRANSITION_DURATION = '0.2s';
const IMAGE_TRANSITION_DURATION = '0.3s';

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

interface BlogCardsGridProps {
  /** Section heading (optional) */
  headline?: string;
  posts: BlogPost[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (server component)
// ---------------------------------------------------------------------------

export default function BlogCardsGrid({
  headline,
  posts,
  className,
}: BlogCardsGridProps) {
  return (
    <section
      aria-label={headline ?? 'Blog posts'}
      className={cn('px-6 py-16 md:px-12 md:py-24 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl">
        {headline && (
          <header className="mb-10 md:mb-14">
            <h2
              className="font-bold tracking-tight"
              style={{
                fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)',
                color: 'var(--foreground)',
              }}
            >
              {headline}
            </h2>
          </header>
        )}

        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {posts.map((post) => (
            <article
              key={post.slug}
              role="listitem"
              className={cn(
                'group flex flex-col overflow-hidden rounded-xl',
                'blog-card-hover',
                'focus-within:ring-2 focus-within:ring-offset-2',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderWidth: '1px',
                borderColor: 'var(--border)',
                ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {/* Image */}
              {post.imageSrc && (
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    'relative block aspect-[16/10] overflow-hidden',
                    'focus-visible:outline-none',
                  )}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt ?? post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={cn(
                      'object-cover',
                      'blog-card-image-zoom',
                    )}
                  />
                </Link>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                {/* Category Badge */}
                {post.category && (
                  <span
                    className="mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                      color: 'var(--primary)',
                    }}
                  >
                    {post.category}
                  </span>
                )}

                {/* Title */}
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read: ${post.title}`}
                  className={cn(
                    'rounded-sm',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  <h3
                    className="font-semibold leading-snug"
                    style={{
                      fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.25rem)',
                      color: 'var(--card-foreground)',
                    }}
                  >
                    {post.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p
                  className="mt-2 line-clamp-3 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {post.excerpt}
                </p>

                {/* Author + Date */}
                <div className="mt-auto flex items-center gap-3 pt-5">
                  {post.author?.avatarSrc && (
                    <Image
                      src={post.author.avatarSrc}
                      alt={`Photo of ${post.author.name}`}
                      width={32}
                      height={32}
                      loading="lazy"
                      sizes="32px"
                      className="rounded-full object-cover"
                    />
                  )}
                  <div className="flex flex-col text-xs">
                    {post.author?.name && (
                      <span
                        className="font-medium"
                        style={{ color: 'var(--card-foreground)' }}
                      >
                        {post.author.name}
                      </span>
                    )}
                    <time
                      dateTime={post.publishedAt}
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {post.publishedAt}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Hover animations with reduced-motion support */}
      <style>{`
        .blog-card-hover {
          transition: transform ${HOVER_TRANSITION_DURATION} ease, box-shadow ${HOVER_TRANSITION_DURATION} ease;
        }
        .blog-card-hover:hover {
          transform: translateY(${CARD_LIFT_DISTANCE});
          box-shadow: ${CARD_SHADOW};
        }
        .blog-card-image-zoom {
          transition: transform ${IMAGE_TRANSITION_DURATION} ease;
        }
        .blog-card-hover:hover .blog-card-image-zoom {
          transform: scale(${IMAGE_ZOOM_SCALE});
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-card-hover,
          .blog-card-image-zoom {
            transition: none !important;
          }
          .blog-card-hover:hover {
            transform: none;
            box-shadow: none;
          }
          .blog-card-hover:hover .blog-card-image-zoom {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
