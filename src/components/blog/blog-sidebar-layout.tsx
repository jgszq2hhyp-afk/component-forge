"use client"

// @version 2.0.0
// @category blog
// @name blog-sidebar-layout
// @source custom

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';
const SECTION_PADDING = 'px-6 py-16 md:px-12 md:py-24 lg:px-20';
const MAX_CONTENT_WIDTH = 'max-w-7xl';
const SIDEBAR_WIDTH_LG = 'lg:grid-cols-[1fr_320px]';
const SIDEBAR_WIDTH_XL = 'xl:grid-cols-[1fr_360px]';
const THUMB_WIDTH_SM = 'sm:w-56';
const THUMB_WIDTH_MD = 'md:w-64';
const THUMB_SIZES = '(max-width: 640px) 100vw, 256px';
const AVATAR_SIZE = 24;
const POPULAR_THUMB_SIZE = 56;
const MAX_POPULAR_POSTS = 5;
const IMAGE_ZOOM_SCALE = 1.04;
const CAT_HOVER_BG = 'color-mix(in srgb, var(--primary) 8%, transparent)';

const STYLE_CSS = `
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
    transform: scale(${IMAGE_ZOOM_SCALE});
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
    background-color: ${CAT_HOVER_BG};
  }
  .sidebar-popular-title {
    transition: color 0.15s ease;
  }
  .sidebar-popular-title:hover {
    color: var(--primary);
  }
  @media (prefers-reduced-motion: reduce) {
    [data-blog-sidebar-layout] *,
    [data-blog-sidebar-layout] *::before,
    [data-blog-sidebar-layout] *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .sidebar-post-hover:hover .sidebar-image-zoom {
      transform: none;
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
// Component (Server Component)
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
      aria-label="Blog mit Seitenleiste"
      data-blog-sidebar-layout=""
      className={cn(SECTION_PADDING, className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLE_CSS }} />

      <div className={cn('mx-auto grid grid-cols-1 gap-12', MAX_CONTENT_WIDTH, SIDEBAR_WIDTH_LG, SIDEBAR_WIDTH_XL)}>
        {/* ---------------------------------------------------------------- */}
        {/* Main column                                                      */}
        {/* ---------------------------------------------------------------- */}
        <main className="flex flex-col gap-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col gap-5 sm:flex-row sidebar-post-hover"
            >
              {/* Thumbnail */}
              {post.imageSrc && (
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    'relative block aspect-[16/10] shrink-0 overflow-hidden rounded-lg',
                    THUMB_WIDTH_SM, THUMB_WIDTH_MD,
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                  aria-label={`Bild zu: ${post.title}`}
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes={THUMB_SIZES}
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
                <Link
                  href={`/blog/${post.slug}`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
                  style={{
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  <h3
                    className="font-semibold leading-snug sidebar-post-title"
                    style={{
                      fontSize: HEADING_CLAMP,
                      color: 'var(--foreground)',
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
                <footer className="mt-auto flex items-center gap-3 pt-3 text-xs">
                  {post.author?.avatarSrc && (
                    <Image
                      src={post.author.avatarSrc}
                      alt={post.author.name}
                      width={AVATAR_SIZE}
                      height={AVATAR_SIZE}
                      sizes={`${AVATAR_SIZE}px`}
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
                </footer>
              </div>
            </article>
          ))}
        </main>

        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                          */}
        {/* ---------------------------------------------------------------- */}
        <aside aria-label="Seitenleiste" className="flex flex-col gap-8 lg:sticky lg:top-8 lg:self-start">
          {/* Newsletter signup */}
          <section
            aria-label="Newsletter"
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
              <label htmlFor="sidebar-newsletter-email" className="sr-only">
                E-Mail-Adresse
              </label>
              <input
                id="sidebar-newsletter-email"
                type="email"
                placeholder="deine@email.de"
                required
                className={cn(
                  'w-full rounded-lg px-3.5 py-2.5 text-sm',
                  'placeholder:text-[var(--muted-foreground)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  backgroundColor: 'var(--background)',
                  color: 'var(--foreground)',
                  borderWidth: '1px',
                  borderColor: 'var(--border)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
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
          </section>

          {/* Categories */}
          {categories && categories.length > 0 && (
            <nav
              aria-label="Kategorien"
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
                      className={cn(
                        'flex items-center justify-between rounded-md px-2 py-1.5 text-sm sidebar-cat-link',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      )}
                      style={{
                        color: 'var(--foreground)',
                        ['--tw-ring-color' as string]: 'var(--primary)',
                        ['--tw-ring-offset-color' as string]: 'var(--background)',
                      }}
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
            </nav>
          )}

          {/* Popular posts */}
          {popularPosts && popularPosts.length > 0 && (
            <section
              aria-label="Beliebte Artikel"
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
                {popularPosts.slice(0, MAX_POPULAR_POSTS).map((post) => (
                  <li key={post.slug} className="flex gap-3">
                    {post.imageSrc && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className={cn(
                          'relative block shrink-0 overflow-hidden rounded-md',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                        )}
                        style={{
                          width: POPULAR_THUMB_SIZE,
                          height: POPULAR_THUMB_SIZE,
                          ['--tw-ring-color' as string]: 'var(--primary)',
                          ['--tw-ring-offset-color' as string]: 'var(--background)',
                        }}
                        aria-label={`Bild zu: ${post.title}`}
                      >
                        <Image
                          src={post.imageSrc}
                          alt={post.imageAlt ?? post.title}
                          fill
                          sizes={`${POPULAR_THUMB_SIZE}px`}
                          className="object-cover"
                        />
                      </Link>
                    )}
                    <div className="flex flex-col justify-center">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
                        style={{
                          ['--tw-ring-color' as string]: 'var(--primary)',
                          ['--tw-ring-offset-color' as string]: 'var(--background)',
                        }}
                      >
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
            </section>
          )}
        </aside>
      </div>
    </section>
  );
}
