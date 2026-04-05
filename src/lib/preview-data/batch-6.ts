// @generated — batch-6: mobile-menu, modal, navigation, newsletter,
//                        notification, onboarding, pagination, portfolio

const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  /* ================================================================== */
  /*  mobile-menu                                                        */
  /* ================================================================== */
  "mobile-menu": {
    "mobile-menu-accordion": {
      isOpen: true,
      groups: [
        {
          label: "Products",
          links: [
            { label: "Overview", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
          ],
        },
        {
          label: "Solutions",
          links: [
            { label: "For Startups", href: "#" },
            { label: "For Enterprise", href: "#" },
            { label: "For Agencies", href: "#" },
          ],
        },
        {
          label: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
          ],
        },
      ],
    },

    "mobile-menu-bottom-sheet": {
      isOpen: true,
      links: [
        { label: "Home", href: "#" },
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },

    "mobile-menu-drawer": {
      open: true,
      position: "left",
      links: [
        {
          label: "Features",
          href: "#",
          children: [
            { label: "Analytics", href: "#" },
            { label: "Automation", href: "#" },
          ],
        },
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },

    "mobile-menu-fullscreen": {
      open: true,
      links: [
        { label: "Home", href: "#" },
        { label: "Work", href: "#" },
        { label: "Services", href: "#" },
        { label: "Contact", href: "#" },
      ],
      socialLinks: [
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Instagram", href: "#" },
      ],
    },

    "mobile-menu-sidebar": {
      isOpen: true,
      side: "left",
      links: [
        { label: "Dashboard", href: "#" },
        { label: "Projects", href: "#" },
        { label: "Analytics", href: "#" },
        { label: "Settings", href: "#" },
      ],
    },

    "mobile-menu-slide-down": {
      isOpen: true,
      links: [
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Portfolio", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  },

  /* ================================================================== */
  /*  modal                                                              */
  /* ================================================================== */
  modal: {
    "modal-command-palette": {
      open: true,
      placeholder: "Search commands…",
      groups: [
        {
          label: "Navigation",
          items: [
            { label: "Go to Dashboard", shortcut: "G D" },
            { label: "Go to Settings", shortcut: "G S" },
            { label: "Go to Profile", shortcut: "G P" },
          ],
        },
        {
          label: "Actions",
          items: [
            { label: "Create New Project", shortcut: "⌘ N" },
            { label: "Invite Team Member", shortcut: "⌘ I" },
            { label: "Export Report", shortcut: "⌘ E" },
          ],
        },
      ],
    },

    "modal-confirmation": {
      isOpen: true,
      title: "Delete project?",
      description:
        "This will permanently delete the project and all associated data. This action cannot be undone.",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      variant: "destructive",
    },

    "modal-dialog-centered": {
      open: true,
      title: "Unsaved changes",
      description:
        "You have unsaved changes that will be lost if you leave this page. Do you want to continue?",
      confirmLabel: "Leave page",
      cancelLabel: "Stay",
      variant: "warning",
    },

    "modal-image-preview": {
      isOpen: true,
      src: IMG,
      alt: "Project screenshot",
      caption: "Homepage redesign — final version",
    },

    "modal-lightbox": {
      trigger: "Open gallery",
      media: [
        { src: IMG, alt: "Project overview" },
        { src: IMG, alt: "Mobile view" },
        { src: IMG, alt: "Detail shot" },
        { src: IMG, alt: "Final delivery" },
      ],
      initialIndex: 0,
    },

    "modal-side-panel": {
      isOpen: true,
      title: "Project Details",
      side: "right",
    },
  },

  /* ================================================================== */
  /*  navigation                                                         */
  /* ================================================================== */
  navigation: {
    "nav-centered-logo": {
      leftLinks: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "About", href: "#" },
      ],
      rightLinks: [
        { label: "Blog", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Support", href: "#" },
      ],
      ctaLabel: "Get Started",
      ctaHref: "#",
    },

    "nav-mega-menu": {
      megaMenus: [
        {
          label: "Products",
          items: [
            {
              title: "Analytics",
              description: "Real-time insights for your business",
              href: "#",
            },
            {
              title: "Automation",
              description: "Streamline repetitive workflows",
              href: "#",
            },
            {
              title: "Integrations",
              description: "Connect your favourite tools",
              href: "#",
            },
          ],
          featured: {
            title: "What's new in v3",
            description:
              "Explore the latest features shipped this quarter.",
            href: "#",
            image: IMG,
          },
        },
        {
          label: "Solutions",
          items: [
            {
              title: "Startups",
              description: "Ship faster with fewer resources",
              href: "#",
            },
            {
              title: "Enterprise",
              description: "Security, compliance, and scale",
              href: "#",
            },
            {
              title: "Agencies",
              description: "Manage multiple client projects",
              href: "#",
            },
          ],
        },
      ],
      links: [
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "#" },
      ],
      ctaLabel: "Start free trial",
      ctaHref: "#",
    },

    "nav-minimal-logo": {
      links: [
        { label: "Work", href: "#" },
        { label: "About", href: "#" },
        { label: "Services", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ctaLabel: "Let's Talk",
      ctaHref: "#",
    },

    "nav-pill-transform": {
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
      ],
      ctaLabel: "Get Started",
      ctaHref: "#",
      scrollThreshold: 50,
    },

    "nav-sidebar": {
      groups: [
        {
          title: "Main",
          links: [
            { label: "Dashboard", href: "#", badge: "3" },
            { label: "Projects", href: "#" },
            { label: "Analytics", href: "#" },
          ],
        },
        {
          title: "Settings",
          links: [
            { label: "Account", href: "#" },
            { label: "Billing", href: "#" },
          ],
        },
      ],
      footerLinks: [{ label: "Help & Support", href: "#" }],
      activeHref: "#",
      collapsed: false,
    },

    "nav-sticky-blur": {
      logoText: "Acme",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
      ],
      ctaText: "Get Started",
      ctaHref: "#",
    },

    "nav-transparent-dark": {
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ctaLabel: "Get Started",
      ctaHref: "#",
      scrollThreshold: 100,
    },

    "nav-with-cta-bar": {
      barText: "🚀 New: AI-powered analytics is now in beta.",
      barCtaLabel: "Learn more",
      barCtaHref: "#",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Blog", href: "#" },
      ],
      ctaLabel: "Start Free Trial",
      ctaHref: "#",
    },

    "nav-with-search": {
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Blog", href: "#" },
      ],
      ctaLabel: "Sign Up",
      ctaHref: "#",
      searchPlaceholder: "Search docs…",
    },
  },

  /* ================================================================== */
  /*  newsletter                                                         */
  /* ================================================================== */
  newsletter: {
    "newsletter-footer-bar": {
      headline: "Get weekly tips on design and development.",
    },

    "newsletter-inline-signup": {
      headline: "Stay ahead of the curve",
      description:
        "Join 12,000+ designers and developers. Get curated articles, tutorials, and tools every Tuesday. No spam, unsubscribe anytime.",
      buttonText: "Subscribe",
      placeholder: "Enter your email address",
    },

    "newsletter-minimal-cta": {
      placeholder: "Your email address",
      buttonText: "Subscribe",
    },

    "newsletter-popup": {
      headline: "Exclusive content, zero noise",
      description:
        "Subscribe and get our weekly digest — industry news, tutorials, and hand-picked resources.",
      delay: 0,
    },

    "newsletter-split-content": {
      headline: "Level up your craft",
      description:
        "Join thousands of professionals who read our weekly newsletter on design, code, and business.",
      benefits: [
        "Curated resources every Tuesday",
        "Early access to new templates",
        "No spam, cancel anytime",
      ],
    },

    "newsletter-with-image": {
      headline: "Subscribe to our newsletter",
      description:
        "Get weekly insights on product design and development delivered straight to your inbox.",
      imageSrc: IMG,
      imageAlt: "Newsletter illustration",
    },
  },

  /* ================================================================== */
  /*  notification                                                       */
  /* ================================================================== */
  notification: {
    "notification-banner": {
      message:
        "Your trial expires in 3 days. Upgrade now to keep access to all features.",
      type: "warning",
      dismissible: true,
    },

    "notification-floating-badge": {
      count: 7,
    },

    "notification-inline-alert": {
      variant: "success",
      title: "Changes saved successfully",
      message:
        "Your profile information has been updated and is now visible to your team.",
      actionLabel: "View profile",
      actionHref: "#",
    },

    "notification-list-panel": {
      headline: "Notifications",
      notifications: [
        {
          id: "1",
          title: "New comment on your project",
          message: "Sarah left a comment on Brand Refresh v2.",
          time: "2 minutes ago",
          read: false,
        },
        {
          id: "2",
          title: "Deploy succeeded",
          message: "Production deployment for v1.4.2 completed.",
          time: "1 hour ago",
          read: false,
        },
        {
          id: "3",
          title: "Invoice paid",
          message: "Client Acme Corp paid invoice #1042.",
          time: "Yesterday",
          read: true,
        },
        {
          id: "4",
          title: "Team member joined",
          message: "Marco Rossi accepted your invitation.",
          time: "2 days ago",
          read: true,
        },
      ],
    },

    "notification-snackbar": {
      message: "Link copied to clipboard",
      actionLabel: "Dismiss",
      autoDismiss: false,
    },

    "notification-toast-stack": {
      position: "bottom-right",
      autoDismissMs: 0,
      toasts: [
        {
          id: "t1",
          type: "success",
          title: "Project published",
          message: "Your project is now live and accessible to the public.",
        },
        {
          id: "t2",
          type: "error",
          title: "Upload failed",
          message: "File size exceeds the 10 MB limit. Please try again.",
        },
        {
          id: "t3",
          type: "info",
          title: "Update available",
          message: "Version 2.1.0 is ready to install.",
        },
      ],
    },
  },

  /* ================================================================== */
  /*  onboarding                                                         */
  /* ================================================================== */
  onboarding: {
    "onboarding-checklist": {
      headline: "Get started with Acme",
      description: "Complete these steps to set up your workspace.",
      tasks: [
        {
          id: "profile",
          label: "Complete your profile",
          description: "Add your name, photo, and timezone.",
          defaultCompleted: true,
        },
        {
          id: "project",
          label: "Create your first project",
          description: "Start from a template or from scratch.",
          defaultCompleted: false,
        },
        {
          id: "invite",
          label: "Invite your team",
          description: "Collaborate with up to 5 members for free.",
          defaultCompleted: false,
        },
        {
          id: "integrate",
          label: "Connect an integration",
          description: "Sync data from GitHub, Slack, or Figma.",
          defaultCompleted: false,
        },
      ],
    },

    "onboarding-empty-setup": {
      headline: "Set up your workspace",
      steps: [
        {
          title: "Create your account",
          description: "Verify your email to activate your account.",
          completed: true,
        },
        {
          title: "Invite teammates",
          description: "Add colleagues to collaborate on projects.",
          completed: true,
        },
        {
          title: "Connect your tools",
          description: "Integrate GitHub, Jira, or Slack.",
          completed: false,
        },
        {
          title: "Launch your first project",
          description: "Use a template or start from scratch.",
          completed: false,
        },
      ],
    },

    "onboarding-feature-tour": {
      headline: "Discover what's possible",
      features: [
        {
          title: "Real-time collaboration",
          description:
            "Work with your team simultaneously. See live cursors, comments, and edits as they happen — no refresh needed.",
          image: IMG,
        },
        {
          title: "Powerful analytics",
          description:
            "Track every metric that matters. Custom dashboards, exportable reports, and automated alerts keep you informed.",
          image: IMG,
        },
        {
          title: "One-click deployments",
          description:
            "Push to production in seconds. Automatic rollbacks, preview environments, and zero-downtime deploys included.",
          image: IMG,
        },
      ],
    },

    "onboarding-progress-bar": {
      currentStep: 3,
      totalSteps: 6,
      label: "Onboarding progress",
    },

    "onboarding-tooltip": {
      title: "Invite your team",
      description:
        "Add teammates by email so they can access and collaborate on your workspace.",
      step: 2,
      totalSteps: 4,
      position: "bottom",
    },

    "onboarding-welcome-steps": {
      steps: [
        {
          title: "Welcome to Acme",
          description:
            "You're moments away from launching your first project. Let's get you set up in just a few steps.",
        },
        {
          title: "Customise your workspace",
          description:
            "Choose a theme, set your timezone, and configure notifications to match the way you work.",
        },
        {
          title: "Invite your team",
          description:
            "Great work is rarely solo. Add teammates, assign roles, and start collaborating right away.",
        },
      ],
    },
  },

  /* ================================================================== */
  /*  pagination                                                         */
  /* ================================================================== */
  pagination: {
    "pagination-compact": {
      currentPage: 4,
      totalPages: 12,
      baseHref: "#",
    },

    "pagination-dots": {
      total: 5,
      current: 2,
    },

    "pagination-infinite-scroll": {
      hasMore: true,
      loading: false,
    },

    "pagination-load-more": {
      loadedCount: 12,
      totalCount: 48,
      hasMore: true,
      isLoading: false,
      loadMoreLabel: "Load more projects",
    },

    "pagination-numbered": {
      currentPage: 5,
      totalPages: 20,
      baseHref: "#",
    },

    "pagination-simple": {
      currentPage: 3,
      totalPages: 10,
      baseHref: "#",
    },
  },

  /* ================================================================== */
  /*  portfolio                                                          */
  /* ================================================================== */
  portfolio: {
    "portfolio-case-study-cards": {
      headline: "Selected Work",
      subheadline: "A look at some of the projects we're most proud of.",
      projects: [
        {
          title: "Brand Identity Overhaul",
          category: "Branding",
          description:
            "A complete visual identity refresh for a Series B fintech startup, spanning logo, color system, and component library.",
          imageSrc: IMG,
          imageAlt: "Brand identity project",
          href: "#",
        },
        {
          title: "E-commerce Platform Redesign",
          category: "UX / UI",
          description:
            "Redesigned the checkout experience, reducing cart abandonment by 34% and increasing average order value.",
          imageSrc: IMG,
          imageAlt: "E-commerce redesign",
          href: "#",
        },
        {
          title: "SaaS Dashboard",
          category: "Product Design",
          description:
            "End-to-end design of an analytics dashboard for a B2B SaaS tool serving over 50,000 users.",
          imageSrc: IMG,
          imageAlt: "SaaS dashboard design",
          href: "#",
        },
      ],
    },

    "portfolio-case-study": {
      title: "Redesigning the onboarding flow",
      client: "Finleap",
      description:
        "We partnered with Finleap to overhaul their new-user onboarding experience. By introducing progressive disclosure and contextual guidance, we cut time-to-activation by 42% and boosted week-one retention by 28%.",
      imageSrc: IMG,
      imageAlt: "Onboarding flow case study",
      stats: [
        { label: "Faster activation", value: "42%" },
        { label: "Week-1 retention", value: "+28%" },
        { label: "Support tickets", value: "−60%" },
      ],
    },

    "portfolio-filterable-grid": {
      headline: "Our Work",
      projects: [
        {
          title: "Horizon Brand Identity",
          category: "Branding",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Luma Mobile App",
          category: "Mobile",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Cartify Checkout",
          category: "UX / UI",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Pulse Dashboard",
          category: "Product Design",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Rootsy Visual Identity",
          category: "Branding",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Verso Landing Page",
          category: "UX / UI",
          imageSrc: IMG,
          href: "#",
        },
      ],
    },

    "portfolio-image-grid": {
      headline: "Recent Projects",
      items: [
        {
          title: "Skyline Architecture",
          category: "Branding",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Nova App Redesign",
          category: "Mobile",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Bloom E-commerce",
          category: "UX / UI",
          imageSrc: IMG,
          href: "#",
        },
        {
          title: "Atlas Dashboard",
          category: "Product Design",
          imageSrc: IMG,
          href: "#",
        },
      ],
    },

    "portfolio-list": {
      headline: "Selected Work",
      projects: [
        { title: "Horizon — Brand Identity", year: "2025", category: "Branding", href: "#" },
        { title: "Cartify — Checkout Redesign", year: "2025", category: "UX / UI", href: "#" },
        { title: "Pulse — Analytics Dashboard", year: "2024", category: "Product Design", href: "#" },
        { title: "Rootsy — Visual Identity", year: "2024", category: "Branding", href: "#" },
      ],
    },

    "portfolio-project-showcase": {
      project: {
        title: "Redefining how teams track progress",
        description:
          "We worked with Pulse to design a next-generation analytics dashboard that gives product teams clear, actionable insight — without the noise.",
        imageSrc: IMG,
        imageAlt: "Pulse dashboard screenshot",
        tags: ["Product Design", "Dashboard", "B2B SaaS"],
        client: "Pulse Analytics",
        year: "2025",
        ctaLabel: "View case study",
        ctaHref: "#",
        stats: [
          { label: "Active users", value: "50k+" },
          { label: "Retention lift", value: "+31%" },
          { label: "NPS score", value: "72" },
        ],
      },
      imagePosition: "left",
    },

    "portfolio-hover-showcase": {
      heading: "Selected Work",
      projects: [
        {
          title: "Lumina",
          description: "AI-powered design system generator.",
          year: "2024",
          link: "#",
          image: IMG,
        },
        {
          title: "Flux",
          description: "Real-time collaboration for creative teams.",
          year: "2024",
          link: "#",
          image: IMG,
        },
        {
          title: "Prism",
          description: "Color palette extraction from any image.",
          year: "2023",
          link: "#",
          image: IMG,
        },
        {
          title: "Vertex",
          description: "3D modeling toolkit for the web.",
          year: "2023",
          link: "#",
          image: IMG,
        },
      ],
    },
  },
};
