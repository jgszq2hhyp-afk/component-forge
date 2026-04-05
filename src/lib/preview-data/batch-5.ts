// batch-5.ts — Preview props for heroes, integrations, loading, login, logo-cloud, map

const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

// Shared logo placeholder — grey square, 160 × 48
const LOGO =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22160%22%20height%3D%2248%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  /* ======================================================================
     HEROES  (21 components)
     ====================================================================== */
  heroes: {
    "hero-animated-text": {
      headlineBefore: "Ship products",
      rotatingWords: ["faster", "smarter", "confidently", "at scale"],
      headlineAfter: "than ever before",
      subheadline:
        "The all-in-one platform that keeps your team aligned and your customers delighted.",
      ctaText: "Start for free",
      ctaHref: "#",
      secondaryCtaText: "See how it works",
      secondaryCtaHref: "#",
    },

    "hero-before-after": {
      beforeSrc: IMG,
      afterSrc: IMG,
      beforeAlt: "Design before redesign",
      afterAlt: "Design after redesign",
      title: "See the difference",
      description:
        "Drag the slider to compare our redesign against the original — a cleaner layout, faster load times, and higher conversion rates.",
    },

    "hero-centered-minimal": {
      badgeText: "Now in public beta",
      headline: "Analytics that actually make sense",
      subheadline:
        "Turn raw data into clear decisions. No SQL required, no waiting for engineers.",
      ctaText: "Get started free",
      ctaHref: "#",
      secondaryCtaText: "View documentation",
      secondaryCtaHref: "#",
    },

    "hero-dark-creative": {
      headline: "Design without limits",
      subheadline:
        "A creative suite built for modern teams — from wireframe to pixel-perfect prototype in minutes.",
      ctaText: "Start designing",
      ctaHref: "#",
      secondaryCtaText: "Browse templates",
      secondaryCtaHref: "#",
      gridDensity: 12,
    },

    "hero-feature-cards": {
      badgeText: "Introducing v3.0",
      headline: "The platform engineers trust",
      subheadline:
        "Everything your team needs to build, deploy, and monitor production-grade software.",
      ctaText: "Start building",
      ctaHref: "#",
      features: [
        {
          icon: null,
          title: "Instant deploys",
          description: "Push to main and your changes go live in seconds.",
        },
        {
          icon: null,
          title: "Global edge network",
          description: "Serve users from 30+ regions with automatic failover.",
        },
        {
          icon: null,
          title: "Built-in observability",
          description: "Logs, metrics, and traces — all in one place.",
        },
      ],
    },

    "hero-floating-cards": {
      headline: "Security you can count on",
      subheadline:
        "Enterprise-grade protection that's simple enough for any team to configure and manage.",
      ctaText: "Explore security",
      ctaHref: "#",
      secondaryCtaText: "Read the docs",
      secondaryCtaHref: "#",
    },

    "hero-glassmorphism": {
      badge: "Summer release",
      headline: "Collaborate in real time",
      subheadline:
        "Bring your team together on a shared canvas. Edit, comment, and ship — simultaneously.",
      ctaText: "Open workspace",
      ctaHref: "#",
      secondaryCtaText: "Watch demo",
      secondaryCtaHref: "#",
    },

    "hero-gradient-animated": {
      headline: "Marketing that converts",
      subheadline:
        "AI-powered copy, A/B testing, and campaign analytics in one beautiful dashboard.",
      ctaText: "Try it free",
      ctaHref: "#",
      secondaryCtaText: "See pricing",
      secondaryCtaHref: "#",
      interactive: true,
    },

    "hero-gradient-text": {
      headline: "Your API. Your rules.",
      subheadline:
        "A developer-first platform that gives you full control without sacrificing speed or reliability.",
      ctaText: "Read the docs",
      ctaHref: "#",
      secondaryCtaText: "View on GitHub",
      secondaryCtaHref: "#",
    },

    "hero-parallax": {
      headline: "Escape the ordinary",
      subheadline:
        "Award-winning travel experiences curated for curious explorers who want more than a package tour.",
      ctaText: "Start exploring",
      ctaHref: "#",
      layers: [
        { imageSrc: IMG, imageAlt: "Mountain landscape", speed: 0.4 },
        { imageSrc: IMG, imageAlt: "Foreground foliage", speed: 0.7 },
      ],
      overlayOpacity: 0.35,
    },

    "hero-saas-landing": {
      badgeText: "Trusted by 10,000+ teams",
      headline: "Close more deals",
      highlightedWord: "deals",
      subheadline:
        "A CRM that works the way your sales team thinks — intuitive, fast, and built for growth.",
      ctaText: "Start free trial",
      ctaHref: "#",
      secondaryCtaText: "Schedule a demo",
      secondaryCtaHref: "#",
      avatars: [
        { src: AVATAR, alt: "User avatar" },
        { src: AVATAR, alt: "User avatar" },
        { src: AVATAR, alt: "User avatar" },
        { src: AVATAR, alt: "User avatar" },
      ],
      socialProofText: "Join 10,000+ sales professionals",
      screenshotSrc: IMG,
      screenshotAlt: "CRM dashboard screenshot",
    },

    "hero-scrollytelling": {
      sections: [
        {
          title: "Capture every idea",
          description:
            "Jot down thoughts, sketches, or voice notes — everything syncs instantly across your devices.",
          imageSrc: IMG,
          imageAlt: "Idea capture interface",
        },
        {
          title: "Organise automatically",
          description:
            "Our AI groups related notes, surfaces connections you'd never spot manually, and keeps your workspace tidy.",
          imageSrc: IMG,
          imageAlt: "Organised workspace view",
        },
        {
          title: "Share and collaborate",
          description:
            "Invite teammates, set permissions, and co-edit in real time without ever leaving the app.",
          imageSrc: IMG,
          imageAlt: "Collaboration interface",
        },
        {
          title: "Publish anywhere",
          description:
            "Export to PDF, Notion, or your blog with a single click. Your content, your format.",
          imageSrc: IMG,
          imageAlt: "Export options panel",
        },
      ],
    },

    "hero-split-image": {
      headline: "Financial clarity for founders",
      subheadline:
        "Real-time P&L, cash flow forecasts, and investor-ready reports — without hiring a CFO.",
      ctaText: "Get started",
      ctaHref: "#",
      imageSrc: IMG,
      imageAlt: "Financial dashboard overview",
      reversed: false,
    },

    "hero-typography-only": {
      headline: "Words have power. Use them well.",
      subheadline:
        "An editorial toolkit for writers, journalists, and content teams who care about craft.",
      ctaText: "Start writing",
      ctaHref: "#",
      secondaryCtaText: "See examples",
      secondaryCtaHref: "#",
    },

    "hero-video-background": {
      headline: "Built for the next generation of work",
      subheadline:
        "Async-first tools that let distributed teams do their best work — on any timezone, any device.",
      ctaText: "Join the waitlist",
      ctaHref: "#",
      secondaryCtaText: "Learn more",
      secondaryCtaHref: "#",
      videoSrc: "",
      posterSrc: IMG,
      overlayOpacity: 0.55,
    },

    "hero-with-carousel": {
      slides: [
        {
          imageSrc: IMG,
          imageAlt: "E-commerce storefront",
          headline: "Launch your store in minutes",
          subheadline: "Templates, payments, and shipping — all ready to go.",
        },
        {
          imageSrc: IMG,
          imageAlt: "Analytics dashboard",
          headline: "Know your customers deeply",
          subheadline: "Unified analytics across every sales channel.",
        },
        {
          imageSrc: IMG,
          imageAlt: "Mobile app preview",
          headline: "Sell on every platform",
          subheadline: "Web, iOS, Android — one backend, infinite storefronts.",
        },
      ],
      ctaText: "Open your shop",
      ctaHref: "#",
      autoPlayInterval: 5000,
    },

    "hero-with-form": {
      headline: "Get early access",
      subheadline:
        "Join 2,400 teams already on the waitlist. We'll reach out the moment your spot opens up.",
      badgeText: "Limited seats available",
      formTitle: "Reserve your spot",
      formDescription: "Takes less than 30 seconds. No credit card required.",
      submitText: "Reserve my spot",
    },

    "hero-with-image-overlay": {
      headline: "Hospitality reimagined",
      subheadline:
        "Book handpicked boutique hotels and private villas with concierge service included.",
      ctaText: "Browse properties",
      ctaHref: "#",
      secondaryCtaText: "How it works",
      secondaryCtaHref: "#",
      imageSrc: IMG,
      imageAlt: "Luxury boutique hotel terrace",
      overlayOpacity: 0.5,
      contentPosition: "bottom-left",
    },

    "hero-with-mockup": {
      headline: "Your entire workflow, one screen",
      subheadline:
        "Project management, time tracking, and invoicing — unified in a single elegant interface.",
      ctaText: "Start free",
      ctaHref: "#",
      secondaryCtaText: "Watch the tour",
      secondaryCtaHref: "#",
      mockupType: "browser",
      screenshotSrc: IMG,
      screenshotAlt: "Project management dashboard",
    },

    "hero-with-stats": {
      headline: "Scale with confidence",
      subheadline:
        "Infrastructure that grows with you — from your first user to your millionth request.",
      ctaText: "See our plans",
      ctaHref: "#",
      secondaryCtaText: "Talk to sales",
      secondaryCtaHref: "#",
      stats: [
        { value: "99.99%", label: "Uptime SLA" },
        { value: "< 50ms", label: "Median latency" },
        { value: "180+", label: "Countries served" },
        { value: "2.4B+", label: "Requests per day" },
      ],
    },

    "hero-with-video-modal": {
      headline: "See how teams build faster with us",
      subheadline:
        "A 3-minute walkthrough that shows exactly how we cut deployment time by 70%.",
      ctaText: "Start your trial",
      ctaHref: "#",
      videoSrc: "",
      backgroundImageSrc: IMG,
      backgroundImageAlt: "Product screenshot with team collaboration",
      playButtonLabel: "Watch the product tour",
    },
  },

  /* ======================================================================
     INTEGRATIONS  (6 components)
     ====================================================================== */
  integrations: {
    "integrations-card-grid": {
      headline: "Connect your favourite tools",
      integrations: [
        {
          name: "Slack",
          description: "Send real-time alerts and weekly summaries straight to any channel.",
          category: "Communication",
        },
        {
          name: "GitHub",
          description: "Trigger workflows on pull requests, releases, and code reviews.",
          category: "Developer Tools",
        },
        {
          name: "Stripe",
          description: "Sync invoices, subscriptions, and payment events automatically.",
          category: "Payments",
        },
        {
          name: "HubSpot",
          description: "Push leads and deal updates to your CRM without lifting a finger.",
          category: "CRM",
        },
        {
          name: "Zapier",
          description: "Connect to 5,000+ apps with no-code automation workflows.",
          category: "Automation",
        },
        {
          name: "Google Sheets",
          description: "Export reports and live data to spreadsheets on a schedule.",
          category: "Productivity",
        },
      ],
    },

    "integrations-comparison-table": {
      headline: "Integration status",
      integrations: [
        { name: "Slack", type: "Communication", status: "available" },
        { name: "Microsoft Teams", type: "Communication", status: "available" },
        { name: "Salesforce", type: "CRM", status: "available" },
        { name: "HubSpot", type: "CRM", status: "coming-soon" },
        { name: "SAP ERP", type: "Enterprise", status: "coming-soon" },
        { name: "Oracle CX", type: "Enterprise", status: "unavailable" },
      ],
    },

    "integrations-featured-banner": {
      name: "Slack",
      description:
        "Bring your team's conversations and your product data into one place. Get smart alerts, daily digests, and slash-command lookups directly inside Slack — no context switching needed.",
      features: [
        "Real-time alerts for critical events",
        "Daily and weekly digest reports",
        "Slash commands for instant lookups",
        "Configurable channels per workspace",
      ],
      ctaLabel: "Connect Slack",
      ctaHref: "#",
    },

    "integrations-logo-grid": {
      headline: "Works with the tools you already use",
      subheadline: "One-click connections to the most popular business software.",
      integrations: [
        { name: "Stripe", logoSrc: LOGO, href: "#" },
        { name: "Shopify", logoSrc: LOGO, href: "#" },
        { name: "Salesforce", logoSrc: LOGO, href: "#" },
        { name: "HubSpot", logoSrc: LOGO, href: "#" },
        { name: "Twilio", logoSrc: LOGO, href: "#" },
        { name: "Intercom", logoSrc: LOGO, href: "#" },
      ],
    },

    "integrations-logo-wall": {
      headline: "Works with your favourite tools",
      description:
        "Native integrations with the platforms your team already relies on — set up in minutes.",
      logos: [
        { name: "Notion", src: LOGO },
        { name: "Figma", src: LOGO },
        { name: "Linear", src: LOGO },
        { name: "GitHub", src: LOGO },
        { name: "Vercel", src: LOGO },
        { name: "Datadog", src: LOGO },
      ],
    },

    "integrations-showcase": {
      headline: "Deep integrations, real outcomes",
      integrations: [
        {
          name: "Stripe",
          description:
            "Sync payment intents, subscriptions, and refund events in real time. Reconcile revenue without manual exports.",
          logoSrc: LOGO,
          features: [
            "Automatic invoice sync",
            "Subscription lifecycle tracking",
            "Failed payment alerts",
          ],
          href: "#",
        },
        {
          name: "GitHub",
          description:
            "Link commits and pull requests to project tasks. See code progress alongside product milestones.",
          logoSrc: LOGO,
          features: [
            "PR-to-task linking",
            "Deployment status badges",
            "Code review reminders",
          ],
          href: "#",
        },
        {
          name: "Zendesk",
          description:
            "Surface support ticket context inside your product. Reduce churn by catching issues before customers escalate.",
          logoSrc: LOGO,
          features: [
            "Ticket-to-account mapping",
            "CSAT score sync",
            "SLA breach alerts",
          ],
          href: "#",
        },
      ],
    },
  },

  /* ======================================================================
     LOADING  (6 components)
     ====================================================================== */
  loading: {
    "loading-dots-bounce": {
      label: "Loading your dashboard",
    },

    "loading-page-transition": {},

    "loading-progress-bar": {
      progress: 65,
      height: "4px",
    },

    "loading-skeleton-cards": {
      count: 6,
      columns: 3,
    },

    "loading-skeleton-list": {
      rows: 5,
    },

    "loading-spinner-overlay": {
      fullscreen: false,
      label: "Saving changes…",
    },

    "loading-dot-matrix": {
      duration: 200,
      isPlaying: true,
      repeatCount: 0,
    },
  },

  /* ======================================================================
     LOGIN  (6 components)
     ====================================================================== */
  login: {
    "login-magic-link": {},

    "login-otp-verification": {
      email: "sophie@example.com",
    },

    "login-simple": {},

    "login-social-buttons": {
      headline: "Sign in to your account",
      providers: [
        {
          name: "Continue with Google",
          icon: null,
          href: "#",
        },
        {
          name: "Continue with GitHub",
          icon: null,
          href: "#",
        },
        {
          name: "Continue with Microsoft",
          icon: null,
          href: "#",
        },
      ],
    },

    "login-split-image": {
      imageSrc: IMG,
      imageAlt: "Abstract workspace background",
      brandName: "Acme",
      signupHref: "#",
      forgotPasswordHref: "#",
      socialProviders: [],
    },

    "login-glass-form": {
      title: "Welcome back",
      description: "Sign in to your account to continue",
    },

    "register-multi-step": {
      steps: [
        {
          title: "Account",
          fields: [
            { name: "name", label: "Full name", type: "text", required: true, placeholder: "Jane Smith" },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "jane@acme.com" },
            { name: "password", label: "Password", type: "password", required: true, placeholder: "At least 8 characters" },
          ],
        },
        {
          title: "Profile",
          fields: [
            { name: "company", label: "Company", type: "text", required: false, placeholder: "Acme Corp" },
            { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "+1 555 000 0000" },
          ],
        },
        {
          title: "Confirm",
          fields: [],
        },
      ],
    },
  },

  /* ======================================================================
     LOGO-CLOUD  (6 components)
     ====================================================================== */
  "logo-cloud": {
    "logo-cloud-card-grid": {
      headline: "Trusted by industry leaders",
      logos: [
        { name: "Notion", src: LOGO },
        { name: "Linear", src: LOGO },
        { name: "Vercel", src: LOGO },
        { name: "Figma", src: LOGO },
        { name: "Stripe", src: LOGO },
        { name: "GitHub", src: LOGO },
        { name: "Loom", src: LOGO },
        { name: "Airtable", src: LOGO },
      ],
    },

    "logo-cloud-dark-strip": {
      logos: [
        { name: "Stripe", src: LOGO },
        { name: "Shopify", src: LOGO },
        { name: "Twilio", src: LOGO },
        { name: "Datadog", src: LOGO },
        { name: "MongoDB", src: LOGO },
        { name: "Intercom", src: LOGO },
      ],
    },

    "logo-cloud-marquee": {
      logos: [
        { name: "Notion", src: LOGO },
        { name: "Linear", src: LOGO },
        { name: "Vercel", src: LOGO },
        { name: "Figma", src: LOGO },
        { name: "Stripe", src: LOGO },
        { name: "GitHub", src: LOGO },
        { name: "Loom", src: LOGO },
        { name: "Retool", src: LOGO },
      ],
      speed: 30,
    },

    "logo-cloud-scrolling": {
      headline: "Powering teams at",
      logos: [
        { name: "Airbnb", src: LOGO, href: "#" },
        { name: "Spotify", src: LOGO, href: "#" },
        { name: "Dropbox", src: LOGO, href: "#" },
        { name: "Atlassian", src: LOGO, href: "#" },
        { name: "Zendesk", src: LOGO, href: "#" },
        { name: "HubSpot", src: LOGO, href: "#" },
        { name: "Twilio", src: LOGO, href: "#" },
      ],
    },

    "logo-cloud-static-grid": {
      headline: "Trusted by teams at",
      subheadline: "From fast-growing startups to Fortune 500 companies.",
      logos: [
        { name: "Notion", src: LOGO, href: "#" },
        { name: "Linear", src: LOGO, href: "#" },
        { name: "Vercel", src: LOGO, href: "#" },
        { name: "Figma", src: LOGO, href: "#" },
        { name: "Stripe", src: LOGO, href: "#" },
        { name: "GitHub", src: LOGO, href: "#" },
      ],
    },

    "logo-cloud-with-text": {
      headline: "Trusted by leading companies",
      logos: [
        { name: "Airbnb", src: LOGO },
        { name: "Spotify", src: LOGO },
        { name: "Dropbox", src: LOGO },
        { name: "Atlassian", src: LOGO },
        { name: "Zendesk", src: LOGO },
      ],
    },
  },

  /* ======================================================================
     MAP  (6 components)
     ====================================================================== */
  map: {
    "map-contact-card": {
      headline: "Visit our studio",
      address: "14 Kreuzberg Alley, 10961 Berlin, Germany",
      contactDetails: [
        { label: "Phone", value: "+49 30 1234567", href: "tel:+4930123456" },
        { label: "Email", value: "hello@studioacme.de", href: "mailto:hello@studioacme.de" },
        { label: "Hours", value: "Mon–Fri, 09:00–18:00" },
      ],
    },

    "map-directions-card": {
      headline: "How to find us",
      address: "Schillerstraße 22, 60313 Frankfurt am Main",
      directions: [
        {
          title: "By U-Bahn",
          description: "Take the U4 to Konstablerwache — we're a 5-minute walk from exit B.",
        },
        {
          title: "By car",
          description: "Follow Hanauer Landstraße westbound. Paid parking available on Schillerstraße.",
        },
        {
          title: "By bike",
          description: "Secure bike racks are available in our courtyard — no lock needed.",
        },
      ],
      mapsLink: "#",
    },

    "map-fullwidth-embed": {
      embedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=13.38,52.50,13.42,52.52&layer=mapnik",
      title: "Our office location in Berlin",
    },

    "map-location-section": {
      headline: "Find us in Munich",
      address: "Maximilianstraße 4, 80539 München",
      phone: "+49 89 9876543",
      email: "info@example.de",
      hours: [
        { day: "Monday – Friday", time: "08:30 – 17:30" },
        { day: "Saturday", time: "10:00 – 14:00" },
        { day: "Sunday", time: "Closed" },
      ],
    },

    "map-multi-location": {
      headline: "Our locations",
      locations: [
        {
          name: "Berlin HQ",
          address: "Unter den Linden 10, 10117 Berlin",
          phone: "+49 30 111 222 33",
          email: "berlin@example.com",
          hours: [
            { day: "Mon – Fri", time: "09:00 – 18:00" },
            { day: "Sat – Sun", time: "Closed" },
          ],
        },
        {
          name: "Hamburg Office",
          address: "Jungfernstieg 40, 20354 Hamburg",
          phone: "+49 40 555 666 77",
          email: "hamburg@example.com",
          hours: [
            { day: "Mon – Fri", time: "09:00 – 17:00" },
            { day: "Sat – Sun", time: "Closed" },
          ],
        },
        {
          name: "Munich Branch",
          address: "Leopoldstraße 82, 80802 München",
          phone: "+49 89 888 999 00",
          email: "munich@example.com",
          hours: [
            { day: "Mon – Thu", time: "08:30 – 17:30" },
            { day: "Fri", time: "08:30 – 15:00" },
          ],
        },
      ],
    },

    "map-store-locator": {
      headline: "Find a store near you",
      stores: [
        {
          name: "Berlin Mitte",
          address: "Friedrichstraße 100, 10117 Berlin",
          phone: "+49 30 123 456",
          hours: "Mon–Sat 10:00–20:00",
        },
        {
          name: "Hamburg Altstadt",
          address: "Mönckebergstraße 7, 20095 Hamburg",
          phone: "+49 40 987 654",
          hours: "Mon–Sat 10:00–19:00",
        },
        {
          name: "Munich Maxvorstadt",
          address: "Brienner Straße 50, 80333 München",
          phone: "+49 89 246 810",
          hours: "Mon–Sat 10:00–19:30",
        },
        {
          name: "Cologne Innenstadt",
          address: "Schildergasse 12, 50667 Köln",
          phone: "+49 221 135 791",
          hours: "Mon–Sat 09:30–20:00",
        },
      ],
    },
  },
};
