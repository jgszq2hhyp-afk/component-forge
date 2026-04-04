// @version 1.0.0
// @category blog
// @name blog-featured-post
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

interface BlogFeaturedPostProps {
  featured: BlogPost;
  secondary: BlogPost[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (server component)
// ---------------------------------------------------------------------------

export default function BlogFeaturedPost({
  featured,
  secondary,
  className,
}: BlogFeaturedPostProps) {
  return (
    <section
      className={cn('px-6 py-16 md:px-12 md:py-24 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Featured hero post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block overflow-hidden rounded-2xl featured-post-hover"
          style={{ backgroundColor: 'var(--card)' }}
        >
          {featured.imageSrc && (
            <div className="relative aspect-[21/9] md:aspect-[2.5/1]">
              <Image
                src={featured.imageSrc}
                alt={featured.imageAlt ?? featured.title}
                fill
                priority
                sizes="100vw"
                className="object-cover featured-image-zoom"
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, color-mix(in srgb, var(--foreground) 80%, transparent) 0%, transparent 60%)',
                }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Overlay text */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
            {featured.category && (
              <span
                className="mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                {featured.category}
              </span>
            )}
            <h2
              className="font-bold leading-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.75rem)',
                color: 'var(--background)',
              }}
            >
              {featured.title}
            </h2>
            <p
              className="mt-2 line-clamp-2 max-w-2xl text-sm md:text-base leading-relaxed"
              style={{ color: 'color-mix(in srgb, var(--background) 80%, transparent)' }}
            >
              {featured.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {featured.author?.avatarSrc && (
                <Image
                  src={featured.author.avatarSrc}
                  alt={featured.author.name}
                  width={28}
                  height={28}
                  sizes="28px"
                  className="rounded-full object-cover"
                />
              )}
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--background)' }}
              >
                {featured.author?.name}
              </span>
              <span
                className="text-sm"
                style={{ color: 'color-mix(in srgb, var(--background) 60%, transparent)' }}
              >
                &middot;
              </span>
              <time
                dateTime={featured.publishedAt}
                className="text-sm"
                style={{ color: 'color-mix(in srgb, var(--background) 60%, transparent)' }}
              >
                {featured.publishedAt}
              </time>
            </div>
          </div>
        </Link>

        {/* Secondary posts row */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secondary.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl secondary-card-hover"
              style={{
                backgroundColor: 'var(--card)',
                borderWidth: '1px',
                borderColor: 'var(--border)',
              }}
            >
              {post.imageSrc && (
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover secondary-image-zoom"
                  />
                </Link>
              )}
              <div className="flex flex-1 flex-col p-5">
                {post.category && (
                  <span
                    className="mb-2 text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--primary)' }}
                  >
                    {post.category}
                  </span>
                )}
                <Link href={`/blog/${post.slug}`}>
                  <h3
                    className="text-base font-semibold leading-snug md:text-lg"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {post.title}
                  </h3>
                </Link>
                <p
                  className="mt-1.5 line-clamp-2 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-4 text-xs">
                  {post.author?.name && (
                    <span className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      {post.author.name}
                    </span>
                  )}
                  <span style={{ color: 'var(--muted-foreground)' }}>&middot;</span>
                  <time dateTime={post.publishedAt} style={{ color: 'var(--muted-foreground)' }}>
                    {post.publishedAt}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Animations with reduced-motion support */}
      <style>{`
        .featured-post-hover {
          transition: box-shadow 0.3s ease;
        }
        .featured-post-hover:hover {
          box-shadow: 0 16px 48px color-mix(in srgb, var(--foreground) 12%, transparent);
        }
        .featured-image-zoom {
          transition: transform 0.5s ease;
        }
        .featured-post-hover:hover .featured-image-zoom {
          transform: scale(1.03);
        }
        .secondary-card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .secondary-card-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px color-mix(in srgb, var(--foreground) 8%, transparent);
        }
        .secondary-image-zoom {
          transition: transform 0.3s ease;
        }
        .secondary-card-hover:hover .secondary-image-zoom {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .featured-post-hover,
          .featured-image-zoom,
          .secondary-card-hover,
          .secondary-image-zoom {
            transition: none !important;
          }
          .featured-post-hover:hover,
          .secondary-card-hover:hover {
            transform: none;
          }
          .featured-post-hover:hover .featured-image-zoom,
          .secondary-card-hover:hover .secondary-image-zoom {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
