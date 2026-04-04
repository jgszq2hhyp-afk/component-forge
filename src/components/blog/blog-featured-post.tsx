// @version 2.0.0
// @category blog
// @name blog-featured-post
// @source custom

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FEATURED_ASPECT_RATIO = '21 / 9';
const FEATURED_ASPECT_RATIO_MD = '2.5 / 1';
const FEATURED_SHADOW = '0 16px 48px color-mix(in srgb, var(--foreground) 12%, transparent)';
const FEATURED_IMAGE_ZOOM = '1.03';
const SECONDARY_LIFT = '-3px';
const SECONDARY_SHADOW = '0 8px 24px color-mix(in srgb, var(--foreground) 8%, transparent)';
const SECONDARY_IMAGE_ZOOM = '1.04';

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
      aria-label="Featured blog posts"
      className={cn('px-6 py-16 md:px-12 md:py-24 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Featured hero post */}
        <Link
          href={`/blog/${featured.slug}`}
          aria-label={`Featured post: ${featured.title}`}
          className={cn(
            'group relative block overflow-hidden rounded-2xl featured-post-hover',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          )}
          style={{
            backgroundColor: 'var(--card)',
            ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
            ['--tw-ring-offset-color' as string]: 'var(--background)',
          }}
        >
          {featured.imageSrc && (
            <figure
              className="relative"
              style={{ aspectRatio: FEATURED_ASPECT_RATIO }}
            >
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
            </figure>
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
              className="mt-2 line-clamp-2 max-w-2xl leading-relaxed"
              style={{
                fontSize: 'clamp(0.875rem, 0.25vw + 0.8rem, 1rem)',
                color: 'color-mix(in srgb, var(--background) 80%, transparent)',
              }}
            >
              {featured.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {featured.author?.avatarSrc && (
                <Image
                  src={featured.author.avatarSrc}
                  alt={`Photo of ${featured.author.name}`}
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
                aria-hidden="true"
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
        <div
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {secondary.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              role="listitem"
              className={cn(
                'group flex flex-col overflow-hidden rounded-xl secondary-card-hover',
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
              {post.imageSrc && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block overflow-hidden focus-visible:outline-none"
                  style={{ aspectRatio: '16 / 9' }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt ?? post.title}
                    fill
                    loading="lazy"
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
                      fontSize: 'clamp(0.95rem, 0.3vw + 0.85rem, 1.125rem)',
                      color: 'var(--card-foreground)',
                    }}
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
                  <span style={{ color: 'var(--muted-foreground)' }} aria-hidden="true">&middot;</span>
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
          box-shadow: ${FEATURED_SHADOW};
        }
        .featured-image-zoom {
          transition: transform 0.5s ease;
        }
        .featured-post-hover:hover .featured-image-zoom {
          transform: scale(${FEATURED_IMAGE_ZOOM});
        }
        .secondary-card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .secondary-card-hover:hover {
          transform: translateY(${SECONDARY_LIFT});
          box-shadow: ${SECONDARY_SHADOW};
        }
        .secondary-image-zoom {
          transition: transform 0.3s ease;
        }
        .secondary-card-hover:hover .secondary-image-zoom {
          transform: scale(${SECONDARY_IMAGE_ZOOM});
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
            box-shadow: none;
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
