// @version 1.0.0
// @category blog
// @name blog-sidebar-layout
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

interface CategoryItem {
  name: string;
  slug: string;
  count?: number;
}

interface BlogSidebarLayoutProps {
  posts: BlogPost[];
  popularPosts?: BlogPost[];
  categories?: CategoryItem[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (server component)
// ---------------------------------------------------------------------------

export default function BlogSidebarLayout({
  posts,
  popularPosts,
  categories,
  newsletterTitle = 'Newsletter',
  newsletterDescription = 'Erhalte die neuesten Artikel direkt in dein Postfach.',
  className,
}: BlogSidebarLayoutProps) {
  return (
    <section
      className={cn('px-6 py-16 md:px-12 md:py-24 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
        {/* ---------------------------------------------------------------- */}
        {/* Main column                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col gap-5 sm:flex-row sidebar-post-hover"
            >
              {/* Thumbnail */}
              {post.imageSrc && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] shrink-0 overflow-hidden rounded-lg sm:w-56 md:w-64"
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover sidebar-image-zoom"
                  />
                </Link>
              )}

              {/* Text */}
              <div className="flex flex-1 flex-col">
                {post.category && (
                  <span
                    className="mb-1.5 text-xs font-medium tracking-wide uppercase"
                    style={{ color: 'var(--primary)' }}
                  >
                    {post.category}
                  </span>
                )}
                <Link href={`/blog/${post.slug}`}>
                  <h3
                    className="text-lg font-semibold leading-snug sidebar-post-title"
                    style={{ color: 'var(--foreground)' }}
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
                <div className="mt-auto flex items-center gap-3 pt-3 text-xs">
                  {post.author?.avatarSrc && (
                    <Image
                      src={post.author.avatarSrc}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      sizes="24px"
                      className="rounded-full object-cover"
                    />
                  )}
                  {post.author?.name && (
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                      {post.author.name}
                    </span>
                  )}
                  <time dateTime={post.publishedAt} style={{ color: 'var(--muted-foreground)' }}>
                    {post.publishedAt}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                          */}
        {/* ---------------------------------------------------------------- */}
        <aside className="flex flex-col gap-8 lg:sticky lg:top-8 lg:self-start">
          {/* Newsletter signup */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: 'var(--card)',
              borderWidth: '1px',
              borderColor: 'var(--border)',
            }}
          >
            <h4
              className="text-base font-semibold"
              style={{ color: 'var(--card-foreground)' }}
            >
              {newsletterTitle}
            </h4>
            <p
              className="mt-1.5 text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {newsletterDescription}
            </p>
            <form className="mt-4 flex flex-col gap-2.5" onSubmit={undefined}>
              <input
                type="email"
                placeholder="deine@email.de"
                required
                className={cn(
                  'w-full rounded-lg px-3.5 py-2.5 text-sm',
                  'placeholder:text-[var(--muted-foreground)]',
                  'focus-visible:outline-none focus-visible:ring-2',
                )}
                style={{
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  borderWidth: '1px',
                  borderColor: 'var(--border)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                }}
              />
              <button
                type="submit"
                className={cn(
                  'w-full rounded-lg px-4 py-2.5 text-sm font-semibold',
                  'sidebar-newsletter-btn',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                Abonnieren
              </button>
            </form>
          </div>

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: 'var(--card)',
                borderWidth: '1px',
                borderColor: 'var(--border)',
              }}
            >
              <h4
                className="text-base font-semibold"
                style={{ color: 'var(--card-foreground)' }}
              >
                Kategorien
              </h4>
              <ul className="mt-3 flex flex-col gap-1.5" role="list">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/blog/category/${cat.slug}`}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm sidebar-cat-link"
                      style={{ color: 'var(--foreground)' }}
                    >
                      <span>{cat.name}</span>
                      {cat.count !== undefined && (
                        <span
                          className="text-xs tabular-nums"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {cat.count}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Popular posts */}
          {popularPosts && popularPosts.length > 0 && (
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: 'var(--card)',
                borderWidth: '1px',
                borderColor: 'var(--border)',
              }}
            >
              <h4
                className="text-base font-semibold"
                style={{ color: 'var(--card-foreground)' }}
              >
                Beliebte Artikel
              </h4>
              <ul className="mt-3 flex flex-col gap-4" role="list">
                {popularPosts.slice(0, 5).map((post) => (
                  <li key={post.slug} className="flex gap-3">
                    {post.imageSrc && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative block size-14 shrink-0 overflow-hidden rounded-md"
                      >
                        <Image
                          src={post.imageSrc}
                          alt={post.imageAlt ?? post.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </Link>
                    )}
                    <div className="flex flex-col justify-center">
                      <Link href={`/blog/${post.slug}`}>
                        <h5
                          className="line-clamp-2 text-sm font-medium leading-snug sidebar-popular-title"
                          style={{ color: 'var(--card-foreground)' }}
                        >
                          {post.title}
                        </h5>
                      </Link>
                      <time
                        dateTime={post.publishedAt}
                        className="mt-0.5 text-xs"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {post.publishedAt}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Animations with reduced-motion support */}
      <style>{`
        .sidebar-post-hover {
          transition: transform 0.15s ease;
        }
        .sidebar-post-title {
          transition: color 0.15s ease;
        }
        .sidebar-post-hover:hover .sidebar-post-title {
          color: var(--primary);
        }
        .sidebar-image-zoom {
          transition: transform 0.3s ease;
        }
        .sidebar-post-hover:hover .sidebar-image-zoom {
          transform: scale(1.04);
        }
        .sidebar-newsletter-btn {
          transition: brightness 0.15s ease;
        }
        .sidebar-newsletter-btn:hover {
          filter: brightness(1.1);
        }
        .sidebar-cat-link {
          transition: background-color 0.15s ease;
        }
        .sidebar-cat-link:hover {
          background-color: color-mix(in srgb, var(--primary) 8%, transparent);
        }
        .sidebar-popular-title {
          transition: color 0.15s ease;
        }
        .sidebar-popular-title:hover {
          color: var(--primary);
        }
        @media (prefers-reduced-motion: reduce) {
          .sidebar-post-hover,
          .sidebar-post-title,
          .sidebar-image-zoom,
          .sidebar-newsletter-btn,
          .sidebar-cat-link,
          .sidebar-popular-title {
            transition: none !important;
          }
          .sidebar-post-hover:hover .sidebar-image-zoom {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
