// @version 1.0.0
// @category blog
// @name blog-cards-grid
// @source custom

import Image from 'next/image';
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

interface BlogCardsGridProps {
  posts: BlogPost[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (server component)
// ---------------------------------------------------------------------------

export default function BlogCardsGrid({ posts, className }: BlogCardsGridProps) {
  return (
    <section
      className={cn('px-6 py-16 md:px-12 md:py-24 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={cn(
                'group flex flex-col overflow-hidden rounded-xl',
                'blog-card-hover',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderWidth: '1px',
                borderColor: 'var(--border)',
              }}
            >
              {/* Image */}
              {post.imageSrc && (
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt ?? post.title}
                    fill
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
                <Link href={`/blog/${post.slug}`}>
                  <h3
                    className="text-lg font-semibold leading-snug md:text-xl"
                    style={{ color: 'var(--card-foreground)' }}
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
                      alt={post.author.name}
                      width={32}
                      height={32}
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
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .blog-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px color-mix(in srgb, var(--foreground) 8%, transparent);
        }
        .blog-card-image-zoom {
          transition: transform 0.3s ease;
        }
        .blog-card-hover:hover .blog-card-image-zoom {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .blog-card-hover,
          .blog-card-image-zoom {
            transition: none !important;
          }
          .blog-card-hover:hover {
            transform: none;
          }
          .blog-card-hover:hover .blog-card-image-zoom {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
