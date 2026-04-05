const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // about
  // ─────────────────────────────────────────────────────────────────────────────
  about: {
    "about-awards-recognition": {
      headline: "Industry Awards & Recognition",
      awards: [
        { title: "Best Digital Agency", organization: "Webby Awards", year: 2024 },
        { title: "UX Excellence Award", organization: "Nielsen Norman Group", year: 2023 },
        { title: "Top 100 Design Studios", organization: "Awwwards", year: 2023 },
        { title: "Innovation in Web Design", organization: "CSS Design Awards", year: 2022 },
      ],
    },

    "about-company-history": {
      headline: "Our Journey Through the Years",
      milestones: [
        {
          year: "2014",
          title: "Founded in a Berlin co-working space",
          description:
            "Three designers with a shared vision launched the studio, focused on crafting purposeful digital experiences.",
        },
        {
          year: "2017",
          title: "First international client partnership",
          description:
            "Expanded beyond Germany to serve clients across Europe, growing the team to twelve specialists.",
        },
        {
          year: "2020",
          title: "Launched our proprietary design system",
          description:
            "Released an open-source component library that quickly gained traction in the developer community.",
        },
        {
          year: "2024",
          title: "Reached 200+ delivered projects",
          description:
            "Celebrated a decade of growth, serving brands from start-ups to Fortune 500 companies worldwide.",
        },
      ],
    },

    "about-company-numbers": {
      headline: "By the Numbers",
      stats: [
        { value: "200", suffix: "+", label: "Projects Delivered" },
        { value: "98", suffix: "%", label: "Client Satisfaction Rate" },
        { value: "12", label: "Countries Served" },
        { value: "10", suffix: " yrs", label: "Years in Business" },
      ],
    },

    "about-founder-letter": {
      quote:
        "We started this company because we believed great design could change how people experience the web — not just how it looks, but how it feels. That conviction still drives every pixel we craft.",
      name: "Sarah Chen",
      role: "Co-Founder & Creative Director",
      imageSrc: AVATAR,
    },

    "about-mission-values": {
      missionTitle: "Design With Purpose, Build With Precision",
      missionDescription:
        "We partner with ambitious companies to create digital products that are beautiful, accessible, and built to last. Every decision we make serves both the user and the business.",
      values: [
        {
          icon: null,
          title: "User First",
          text: "Every feature we design starts with a deep understanding of the people who will use it.",
        },
        {
          icon: null,
          title: "Radical Transparency",
          text: "We share progress, challenges, and decisions openly — no surprises at delivery.",
        },
        {
          icon: null,
          title: "Craft Over Speed",
          text: "We take the time to get details right, because quality compounds over time.",
        },
      ],
    },

    "about-team-culture": {
      headline: "How We Work Together",
      images: [
        { src: IMG, alt: "Team working in the studio" },
        { src: IMG, alt: "Design review session" },
        { src: IMG, alt: "Team retreat offsite" },
        { src: IMG, alt: "Workshop with client" },
      ],
      values: [
        {
          title: "Async by default",
          description:
            "Deep work is protected. We communicate clearly in writing and respect each other's focus time.",
        },
        {
          title: "Feedback is a gift",
          description:
            "We cultivate a culture of honest, constructive critique that makes the work stronger.",
        },
        {
          title: "Learning never stops",
          description:
            "Every team member has a personal learning budget and dedicated time for skill development.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // animations
  // ─────────────────────────────────────────────────────────────────────────────
  animations: {
    "text-marquee": {
      texts: ["Award-Winning Design", "Pixel-Perfect Craft", "Built for Scale", "Trusted by 200+ Brands"],
      direction: "left",
      variant: "filled",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // avatar
  // ─────────────────────────────────────────────────────────────────────────────
  avatar: {
    "avatar-badge-list": {
      headline: "Design Team",
      users: [
        { name: "Sarah Chen", role: "Lead Designer", badge: "Design" },
        { name: "Marcus Williams", role: "Frontend Engineer", badge: "Engineering" },
        { name: "Elena Rodriguez", role: "Product Manager", badge: "Product" },
        { name: "Priya Patel", role: "UX Researcher", badge: "Research" },
      ],
    },

    "avatar-group-stack": {
      avatars: [
        { src: AVATAR, alt: "Sarah Chen", name: "Sarah Chen" },
        { src: AVATAR, alt: "Marcus Williams", name: "Marcus Williams" },
        { src: AVATAR, alt: "Elena Rodriguez", name: "Elena Rodriguez" },
        { src: AVATAR, alt: "Priya Patel", name: "Priya Patel" },
        { src: AVATAR, alt: "James O'Brien", name: "James O'Brien" },
      ],
      size: "md",
    },

    "avatar-initials": {
      name: "Sarah Chen",
      status: "online",
    },

    "avatar-profile-card": {
      name: "Marcus Williams",
      role: "VP of Engineering",
      bio: "Marcus leads our engineering team with a passion for scalable systems and developer experience. He previously built infrastructure at two successful fintech start-ups.",
      avatarSrc: AVATAR,
      socialLinks: [
        { label: "GitHub", href: "#", icon: null },
        { label: "LinkedIn", href: "#", icon: null },
      ],
      stats: [
        { label: "Projects", value: "48" },
        { label: "Years Exp.", value: "12" },
        { label: "Followers", value: "3.2k" },
      ],
    },

    // avatar-upload: only optional/callback props — provide currentSrc
    "avatar-upload": {
      currentSrc: AVATAR,
    },

    "avatar-with-name": {
      name: "Elena Rodriguez",
      role: "Product Manager",
      size: "md",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // backgrounds
  // ─────────────────────────────────────────────────────────────────────────────
  backgrounds: {
    // All props have defaults; only override meaningful ones
    "background-aurora": {
      intensity: "medium",
    },

    "background-dot-grid": {
      dotSize: 1,
      gap: 24,
      fade: true,
    },

    "background-gradient-mesh": {
      intensity: "subtle",
    },

    "background-grid-pattern": {
      gridSize: 40,
    },

    "background-noise-texture": {
      opacity: 0.05,
    },

    "background-particles": {
      density: "medium",
      speed: "slow",
    },

    "backgrounds-balloons": {},
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // banners
  // ─────────────────────────────────────────────────────────────────────────────
  banners: {
    "announcement-banner": {
      text: "We just launched our new design system — explore what's new.",
      linkText: "Read the announcement",
      linkHref: "#",
      variant: "default",
      dismissible: true,
      badge: "New",
    },

    // banner-cookie-simple: message has default; callbacks skipped
    "banner-cookie-simple": {
      message:
        "We use cookies to improve your experience and analyze site traffic. You can manage your preferences at any time.",
    },

    "banner-feature-release": {
      title: "Container Queries are now available in all components",
      href: "#",
      variant: "info",
    },

    "banner-maintenance-mode": {
      message: "Scheduled maintenance in progress. Some features may be temporarily unavailable.",
      estimatedTime: "approx. 30 minutes",
    },

    // banner-notification-toast: action has onClick callback — skip action
    "banner-notification-toast": {
      message: "Your project has been saved successfully.",
      type: "success",
      position: "top",
    },

    "banner-promotional": {
      title: "Summer Sale — 40% Off All Plans",
      description: "Upgrade before the deadline and lock in the lowest price we have ever offered.",
      ctaLabel: "Claim Offer",
      ctaHref: "#",
      endDate: "2026-08-31T23:59:59",
      dismissible: true,
      variant: "gradient",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // blog
  // ─────────────────────────────────────────────────────────────────────────────
  blog: {
    "blog-author-bio": {
      name: "Aiko Tanaka",
      bio: "Aiko is a senior product designer and writer focused on design systems, accessibility, and the intersection of craft and engineering. She has contributed to open-source projects used by thousands of developers.",
      avatarSrc: AVATAR,
      socialLinks: [
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Personal Site", href: "#" },
      ],
    },

    "blog-cards-grid": {
      headline: "Latest Articles",
      posts: [
        {
          title: "Why Container Queries Change Everything",
          excerpt: "A deep dive into how CSS container queries unlock truly component-driven responsive design.",
          slug: "container-queries-guide",
          imageSrc: IMG,
          imageAlt: "Abstract CSS illustration",
          category: "CSS",
          author: { name: "Sarah Chen", avatarSrc: AVATAR },
          publishedAt: "2026-03-15",
        },
        {
          title: "Building a Design System That Lasts",
          excerpt: "Lessons learned from maintaining a component library across four product teams over two years.",
          slug: "design-system-longevity",
          imageSrc: IMG,
          imageAlt: "Design tokens diagram",
          category: "Design Systems",
          author: { name: "Marcus Williams", avatarSrc: AVATAR },
          publishedAt: "2026-02-28",
        },
        {
          title: "Accessible Color in Practice",
          excerpt: "How to choose color palettes that meet WCAG AA contrast without sacrificing visual appeal.",
          slug: "accessible-color-practice",
          imageSrc: IMG,
          imageAlt: "Color palette swatches",
          category: "Accessibility",
          author: { name: "Priya Patel", avatarSrc: AVATAR },
          publishedAt: "2026-02-10",
        },
      ],
    },

    "blog-featured-post": {
      featured: {
        title: "The Future of Web Animation in 2026",
        excerpt:
          "Scroll-driven animations, view transitions, and the new @starting-style rule are rewriting what is possible on the web without JavaScript.",
        slug: "web-animation-2026",
        imageSrc: IMG,
        imageAlt: "Animated web illustration",
        category: "Animation",
        author: { name: "Elena Rodriguez", avatarSrc: AVATAR },
        publishedAt: "2026-04-01",
      },
      secondary: [
        {
          title: "Oklch: The Color Space You Should Be Using",
          excerpt: "Perceptually uniform, gamut-aware, and CSS-native — oklch() is the color space for modern design.",
          slug: "oklch-color-guide",
          imageSrc: IMG,
          imageAlt: "Color gradient illustration",
          category: "CSS",
          author: { name: "Aiko Tanaka" },
          publishedAt: "2026-03-20",
        },
        {
          title: "Mastering View Transitions",
          excerpt: "A practical guide to page and component transitions using the View Transition API.",
          slug: "view-transitions-mastery",
          imageSrc: IMG,
          imageAlt: "Page transition demo",
          category: "Performance",
          author: { name: "James O'Brien" },
          publishedAt: "2026-03-05",
        },
      ],
    },

    "blog-minimal-list": {
      posts: [
        {
          title: "Container Queries in Production",
          excerpt: "Real-world patterns for adopting container queries across a large codebase.",
          slug: "container-queries-production",
          category: "CSS",
          publishedAt: "2026-03-28",
        },
        {
          title: "Designing for Reduced Motion",
          excerpt: "How to deliver delightful animations while fully respecting user preferences.",
          slug: "designing-reduced-motion",
          category: "Accessibility",
          publishedAt: "2026-03-14",
        },
        {
          title: "The Case for Server Components",
          excerpt: "When React Server Components shine — and when they don't.",
          slug: "server-components-case",
          category: "React",
          publishedAt: "2026-02-22",
        },
        {
          title: "Typography Scales That Work",
          excerpt: "Building fluid type systems with clamp() and a modular scale.",
          slug: "typography-scales",
          category: "Design",
          publishedAt: "2026-02-05",
        },
      ],
    },

    "blog-sidebar-layout": {
      posts: [
        {
          title: "Container Queries in Production",
          excerpt: "Real-world patterns for adopting container queries across a large codebase without breaking existing layouts.",
          slug: "container-queries-production",
          imageSrc: IMG,
          imageAlt: "Code snippet illustration",
          category: "CSS",
          author: { name: "Sarah Chen", avatarSrc: AVATAR },
          publishedAt: "2026-03-28",
        },
        {
          title: "Designing for Reduced Motion",
          excerpt: "How to deliver delightful animations while fully respecting user motion preferences.",
          slug: "designing-reduced-motion",
          imageSrc: IMG,
          imageAlt: "Animation diagram",
          category: "Accessibility",
          author: { name: "Priya Patel", avatarSrc: AVATAR },
          publishedAt: "2026-03-14",
        },
        {
          title: "The Case for Server Components",
          excerpt: "When React Server Components shine and when client components are still the right call.",
          slug: "server-components-case",
          imageSrc: IMG,
          imageAlt: "React architecture diagram",
          category: "React",
          author: { name: "Marcus Williams", avatarSrc: AVATAR },
          publishedAt: "2026-02-22",
        },
      ],
      popularPosts: [
        {
          title: "Oklch: The Color Space You Should Be Using",
          excerpt: "",
          slug: "oklch-color-guide",
          imageSrc: IMG,
          imageAlt: "Color guide thumbnail",
          publishedAt: "2026-03-20",
        },
        {
          title: "Mastering View Transitions",
          excerpt: "",
          slug: "view-transitions-mastery",
          imageSrc: IMG,
          imageAlt: "View transitions thumbnail",
          publishedAt: "2026-03-05",
        },
      ],
      categories: [
        { name: "CSS", slug: "css", count: 14 },
        { name: "Accessibility", slug: "accessibility", count: 9 },
        { name: "React", slug: "react", count: 21 },
        { name: "Design Systems", slug: "design-systems", count: 7 },
      ],
      newsletterTitle: "Stay in the loop",
      newsletterDescription: "Get the latest articles and resources delivered straight to your inbox.",
    },

    "blog-table-of-contents": {
      headings: [
        { id: "introduction", text: "Introduction", level: 2 },
        { id: "why-it-matters", text: "Why It Matters", level: 2 },
        { id: "core-concepts", text: "Core Concepts", level: 3 },
        { id: "practical-examples", text: "Practical Examples", level: 3 },
        { id: "performance-considerations", text: "Performance Considerations", level: 2 },
        { id: "conclusion", text: "Conclusion", level: 2 },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // breadcrumbs
  // ─────────────────────────────────────────────────────────────────────────────
  breadcrumbs: {
    "breadcrumb-animated": {
      items: [
        { label: "Home", href: "#" },
        { label: "Blog", href: "#" },
        { label: "CSS", href: "#" },
        { label: "Container Queries in Production", href: "#" },
      ],
    },

    "breadcrumb-pill-style": {
      items: [
        { label: "Home", href: "#" },
        { label: "Products", href: "#" },
        { label: "Design System", href: "#" },
        { label: "Components", href: "#" },
      ],
    },

    "breadcrumb-simple": {
      items: [
        { label: "Home", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Getting Started", href: "#" },
        { label: "Installation" },
      ],
    },

    "breadcrumb-slash-separated": {
      items: [
        { label: "Home", href: "#" },
        { label: "Shop", href: "#" },
        { label: "Apparel", href: "#" },
        { label: "Jackets", href: "#" },
      ],
    },

    "breadcrumb-with-dropdown": {
      items: [
        { label: "Home", href: "#" },
        { label: "Products", href: "#" },
        { label: "Categories", href: "#" },
        { label: "Design Tools", href: "#" },
        { label: "Prototyping", href: "#" },
      ],
    },

    "breadcrumb-with-icon": {
      items: [
        { label: "Home", href: "#" },
        { label: "Settings", href: "#" },
        { label: "Account", href: "#" },
        { label: "Billing" },
      ],
    },
  },
};
