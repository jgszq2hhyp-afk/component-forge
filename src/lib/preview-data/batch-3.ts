// Auto-generated preview props for batch-3 categories:
// cta, dashboard, dividers, ecommerce, empty-state, error, faq

const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  // -------------------------------------------------------------------------
  // CTA
  // -------------------------------------------------------------------------
  cta: {
    "cta-banner-gradient": {
      headline: "Launch Faster With the Right Tools",
      description:
        "Join thousands of teams who ship products 3× faster. No credit card required.",
      ctaText: "Start for Free",
      href: "#",
    },

    "cta-card-centered": {
      headline: "Ready to Transform Your Workflow?",
      description:
        "Everything you need to build, launch, and scale — in one platform.",
      ctaText: "Get Started Today",
      href: "#",
      secondaryCtaText: "See a Demo",
      secondaryCtaHref: "#",
    },

    "cta-exit-intent": {
      headline: "Wait — grab 20% off before you go!",
      description:
        "Subscribe now and unlock your exclusive discount plus weekly tips.",
      inputPlaceholder: "name@email.com",
      ctaText: "Claim My Discount",
      dismissText: "No thanks, I'll pay full price",
    },

    "cta-floating-bar": {
      text: "Limited offer: 3 months free on any annual plan.",
      ctaText: "Claim Offer",
      ctaHref: "#",
      showAfterScroll: 400,
    },

    "cta-inline-section": {
      headline: "Start Building Something Great Today",
      description:
        "Thousands of teams rely on our platform to ship faster and collaborate better.",
      ctaText: "Get Started Free",
      ctaHref: "#",
      secondaryCtaText: "Book a Demo",
      secondaryCtaHref: "#",
      variant: "gradient",
    },

    "cta-newsletter": {
      headline: "Stay Ahead of the Curve",
      description:
        "Get curated insights, product updates, and expert advice delivered every Tuesday.",
      ctaText: "Subscribe",
      href: "#",
      placeholderText: "your@email.com",
      successMessage: "You're in! Check your inbox to confirm.",
    },

    "cta-split-highlight": {
      headline: "Accelerate Your Team's Productivity",
      description:
        "Our platform automates the repetitive work so your team can focus on what matters.",
      ctaText: "Try It Free",
      href: "#",
      highlightStat: "4.8×",
      highlightLabel: "Average productivity boost",
    },

    "cta-sticky-bottom": {
      title: "Start Your Free 14-Day Trial",
      description: "No credit card required. Cancel anytime.",
      ctaLabel: "Get Started",
      ctaHref: "#",
      secondaryLabel: "Learn More",
      secondaryHref: "#",
      showAfterScroll: 400,
      dismissible: true,
    },

    "cta-slide-confirm": {
      label: "Slide to confirm",
      resolveTo: "success",
    },

    "cta-with-testimonial": {
      headline: "Join 12,000+ Teams Shipping Faster",
      description:
        "Streamline your entire development cycle — from idea to production.",
      ctaText: "Start Free Trial",
      href: "#",
      quote:
        "We cut our release cycle from two weeks to two days. The ROI was immediate and undeniable.",
      authorName: "Sarah Chen",
      authorRole: "VP of Engineering, Layerstack",
    },
  },

  // -------------------------------------------------------------------------
  // Dashboard
  // -------------------------------------------------------------------------
  dashboard: {
    "dashboard-activity-feed": {
      headline: "Recent Activity",
      activities: [
        {
          type: "create",
          user: "Sarah Chen",
          action: "created a new project — Horizon v2",
          timestamp: "2 min ago",
          avatarSrc: AVATAR,
        },
        {
          type: "update",
          user: "Marcus Williams",
          action: "updated billing information",
          timestamp: "14 min ago",
          avatarSrc: AVATAR,
        },
        {
          type: "comment",
          user: "Elena Rodriguez",
          action: "commented on Design Review ticket",
          timestamp: "1 hr ago",
          avatarSrc: AVATAR,
        },
        {
          type: "delete",
          user: "Priya Patel",
          action: "deleted draft campaign — Q2 Launch",
          timestamp: "3 hr ago",
          avatarSrc: AVATAR,
        },
      ],
    },

    "dashboard-chart-card": {
      title: "Revenue Overview",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: [4200, 6800, 5300, 9100, 7600, 11200, 8400],
      },
      tabs: ["7d", "30d", "90d", "1y"],
    },

    "dashboard-notifications-panel": {
      headline: "Notifications",
      notifications: [
        {
          id: "1",
          title: "Deployment succeeded",
          message: "Production release v2.4.1 is live.",
          time: "Just now",
          type: "success",
          read: false,
        },
        {
          id: "2",
          title: "Storage at 85%",
          message: "Consider upgrading your plan to avoid disruptions.",
          time: "12 min ago",
          type: "warning",
          read: false,
        },
        {
          id: "3",
          title: "New team member",
          message: "Marcus Williams joined your workspace.",
          time: "1 hr ago",
          type: "info",
          read: false,
        },
        {
          id: "4",
          title: "Scheduled backup failed",
          message: "Nightly backup did not complete. Check logs.",
          time: "3 hr ago",
          type: "error",
          read: true,
        },
      ],
    },

    "dashboard-quick-actions": {
      headline: "Quick Actions",
      actions: [
        {
          label: "Invite Member",
          description: "Add someone to your workspace",
          href: "#",
        },
        {
          label: "Create Project",
          description: "Start a new project from scratch",
          href: "#",
        },
        {
          label: "Generate Report",
          description: "Export analytics as PDF",
          href: "#",
        },
        {
          label: "Manage Billing",
          description: "Update plan or payment details",
          href: "#",
        },
      ],
    },

    "dashboard-recent-orders": {
      headline: "Recent Orders",
      orders: [
        {
          id: "#ORD-4821",
          customer: "Sarah Chen",
          amount: "$249.00",
          status: "completed",
          date: "Apr 4, 2026",
        },
        {
          id: "#ORD-4820",
          customer: "Marcus Williams",
          amount: "$89.00",
          status: "processing",
          date: "Apr 4, 2026",
        },
        {
          id: "#ORD-4819",
          customer: "Elena Rodriguez",
          amount: "$499.00",
          status: "pending",
          date: "Apr 3, 2026",
        },
        {
          id: "#ORD-4818",
          customer: "Priya Patel",
          amount: "$149.00",
          status: "cancelled",
          date: "Apr 3, 2026",
        },
      ],
    },

    "dashboard-agent-plan": {
      tasks: [
        {
          id: "1",
          title: "Research competitor websites",
          status: "completed",
          subtasks: [
            {
              id: "1-1",
              title: "Scrape top 5 competitor landing pages",
              status: "completed",
              description: "Collect HTML structure, copy, and visual layout from competitor sites.",
              tools: ["Web Scraper", "Puppeteer"],
            },
            {
              id: "1-2",
              title: "Analyze design patterns",
              status: "completed",
              description: "Identify common UI patterns, color schemes, and CTAs.",
              tools: ["Vision API"],
            },
          ],
        },
        {
          id: "2",
          title: "Generate website wireframes",
          status: "in-progress",
          dependencies: ["Research competitor websites"],
          subtasks: [
            {
              id: "2-1",
              title: "Create hero section layout",
              status: "completed",
              description: "Design above-the-fold hero with headline, subline, and CTA.",
              tools: ["Figma MCP", "Design Tokens"],
            },
            {
              id: "2-2",
              title: "Build pricing comparison table",
              status: "in-progress",
              description: "Responsive pricing grid with feature comparison.",
              tools: ["Component Library"],
            },
            {
              id: "2-3",
              title: "Design mobile navigation",
              status: "pending",
              description: "Hamburger menu with slide-in drawer for mobile viewports.",
            },
          ],
        },
        {
          id: "3",
          title: "Deploy staging environment",
          status: "pending",
          dependencies: ["Generate website wireframes"],
          subtasks: [
            {
              id: "3-1",
              title: "Configure Vercel project",
              status: "pending",
              description: "Set up environment variables, domain, and build settings.",
              tools: ["Vercel CLI"],
            },
            {
              id: "3-2",
              title: "Run Lighthouse audit",
              status: "pending",
              description: "Performance, accessibility, and SEO checks.",
              tools: ["Lighthouse", "PageSpeed API"],
            },
          ],
        },
      ],
    },

    "dashboard-stats-overview": {
      period: "vs. last month",
      stats: [
        {
          label: "Total Revenue",
          value: "$48,295",
          change: 12.4,
          trend: "up",
        },
        {
          label: "Active Users",
          value: "3,841",
          change: 8.1,
          trend: "up",
        },
        {
          label: "New Signups",
          value: "128",
          change: -3.2,
          trend: "down",
        },
        {
          label: "Churn Rate",
          value: "1.8%",
          change: 0,
          trend: "neutral",
        },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // Dividers
  // -------------------------------------------------------------------------
  dividers: {
    "divider-curved": {
      color: "var(--muted)",
      height: 100,
      invert: false,
    },

    "divider-diagonal": {
      color: "var(--muted)",
      height: 60,
      direction: "right",
    },

    "divider-dotted": {},

    "divider-gradient": {},

    "divider-wave": {
      color: "var(--muted)",
      height: 80,
      flip: false,
    },

    "divider-zigzag": {},
  },

  // -------------------------------------------------------------------------
  // Ecommerce
  // -------------------------------------------------------------------------
  ecommerce: {
    "ecommerce-cart-summary": {
      headline: "Order Summary",
      items: [
        {
          name: "Merino Wool Sweater",
          quantity: 1,
          price: "€89.00",
          imageSrc: IMG,
        },
        {
          name: "Slim Fit Chinos",
          quantity: 2,
          price: "€98.00",
          imageSrc: IMG,
        },
        {
          name: "Leather Belt",
          quantity: 1,
          price: "€34.00",
          imageSrc: IMG,
        },
      ],
      subtotal: "€221.00",
      shipping: "Free",
      total: "€221.00",
    },

    "ecommerce-category-banner": {
      title: "New Arrivals — Spring 2026",
      description:
        "Discover our freshest styles crafted for the season. Lightweight fabrics, modern cuts.",
      imageSrc: IMG,
      imageAlt: "Spring fashion collection",
    },

    "ecommerce-featured-collection": {
      collection: {
        title: "The Essentials Edit",
        description:
          "Timeless pieces designed to anchor any wardrobe — quality that outlasts trends.",
        products: [
          {
            title: "Classic Oxford Shirt",
            price: 79,
            image: IMG,
            href: "#",
          },
          {
            title: "Tailored Linen Trousers",
            price: 119,
            image: IMG,
            href: "#",
          },
          {
            title: "Cashmere Crew-Neck",
            price: 159,
            image: IMG,
            href: "#",
          },
          {
            title: "Canvas Weekend Tote",
            price: 59,
            image: IMG,
            href: "#",
          },
        ],
      },
    },

    "ecommerce-product-detail": {
      product: {
        title: "Merino Wool Crew-Neck Sweater",
        price: 149,
        salePrice: 119,
        description:
          "Crafted from 100% superfine merino wool, this sweater offers unmatched softness and temperature regulation. Perfect for layering through every season.",
        images: [
          { src: IMG, alt: "Sweater — front view" },
          { src: IMG, alt: "Sweater — back view" },
          { src: IMG, alt: "Sweater — detail" },
        ],
        variants: [
          {
            label: "Size",
            options: ["XS", "S", "M", "L", "XL"],
          },
          {
            label: "Color",
            options: ["Navy", "Oatmeal", "Forest Green"],
          },
        ],
      },
    },

    "ecommerce-product-grid": {
      headline: "Bestsellers",
      columns: 3,
      currency: "EUR",
      products: [
        {
          title: "Slim Oxford Shirt",
          price: 79,
          image: IMG,
          badge: "new",
          href: "#",
        },
        {
          title: "Tailored Chinos",
          price: 99,
          salePrice: 69,
          image: IMG,
          badge: "sale",
          href: "#",
        },
        {
          title: "Merino Crew-Neck",
          price: 149,
          image: IMG,
          href: "#",
        },
        {
          title: "Canvas Sneakers",
          price: 89,
          image: IMG,
          badge: "new",
          href: "#",
        },
      ],
    },

    "ecommerce-product-quick-view": {
      name: "Heritage Leather Sneaker",
      price: "€129.00",
      originalPrice: "€159.00",
      description:
        "Hand-finished leather upper with cushioned insole and vulcanised rubber sole. Built to last, styled to impress.",
      imageSrc: IMG,
      imageAlt: "Heritage leather sneaker",
      badge: "Sale",
      features: [
        "Full-grain leather upper",
        "Cushioned memory-foam insole",
        "Durable vulcanised rubber outsole",
        "Available in whole and half sizes",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // Empty State
  // -------------------------------------------------------------------------
  "empty-state": {
    "empty-state-error": {
      title: "Failed to Load Data",
      description:
        "We encountered an error while fetching your reports. Please try again.",
      retryLabel: "Retry",
    },

    "empty-state-illustrated": {
      illustration: "no-data",
      title: "No Reports Yet",
      description:
        "Your analytics will appear here once you start collecting data.",
      ctaText: "Set Up Tracking",
      ctaHref: "#",
    },

    "empty-state-inbox": {
      title: "Inbox Zero",
      description: "You're all caught up! No new messages waiting.",
    },

    "empty-state-minimal": {
      title: "No Projects Found",
      description:
        "Create your first project to get started with the workspace.",
      ctaText: "Create Project",
      ctaHref: "#",
    },

    "empty-state-no-data": {
      title: "No Data Available",
      description:
        "Analytics will appear here once your integration is live.",
    },

    "empty-state-search": {
      query: "darkmode theme",
      suggestions: ["components", "dashboard", "charts", "typography"],
    },
  },

  // -------------------------------------------------------------------------
  // Error
  // -------------------------------------------------------------------------
  error: {
    "error-403": {
      message:
        "You need admin privileges to access this area. Contact your workspace owner.",
      homeHref: "#",
    },

    "error-404-illustrated": {
      title: "Page Not Found",
      message:
        "The page you're looking for has been moved or no longer exists.",
      homeHref: "#",
      searchAction: "#",
    },

    "error-404-minimal": {
      title: "Page Not Found",
      message:
        "Sorry, we couldn't find the page you were looking for. It may have moved or been removed.",
      homeHref: "#",
    },

    "error-500-server": {
      title: "Something Went Wrong",
      message:
        "An unexpected server error occurred. Our team has been notified — please try again shortly.",
      homeHref: "#",
      contactHref: "#",
    },

    "error-maintenance": {
      title: "Down for Maintenance",
      message:
        "We're upgrading our infrastructure to serve you better. We'll be back shortly.",
      homeHref: "#",
      estimatedTime: "~30 minutes",
      socialLinks: [
        { label: "X (Twitter)", href: "#", icon: "x" },
        { label: "LinkedIn", href: "#", icon: "linkedin" },
      ],
    },

    "error-offline": {
      headline: "You're Offline",
      description:
        "No internet connection detected. Check your network and try again.",
    },
  },

  // -------------------------------------------------------------------------
  // FAQ
  // -------------------------------------------------------------------------
  faq: {
    "faq-accordion": {
      headline: "Frequently Asked Questions",
      description:
        "Everything you need to know about our platform and pricing.",
      allowMultiple: false,
      items: [
        {
          question: "Is there a free plan available?",
          answer:
            "Yes — our Starter plan is free forever with up to 3 projects and 5 team members. No credit card needed to sign up.",
        },
        {
          question: "Can I change my plan at any time?",
          answer:
            "Absolutely. You can upgrade, downgrade, or cancel your subscription from your billing settings at any time. Changes take effect at the start of the next billing cycle.",
        },
        {
          question: "How does the 14-day trial work?",
          answer:
            "When you start a trial you get full access to all Pro features for 14 days. No credit card is required and you won't be charged unless you choose to continue.",
        },
        {
          question: "Do you offer discounts for annual billing?",
          answer:
            "Yes — paying annually saves you 20% compared to monthly billing. The discount is applied automatically when you select the yearly option.",
        },
      ],
    },

    "faq-alternating-cards": {
      title: "Got Questions? We Have Answers.",
      description:
        "Browse the most common questions our customers ask before getting started.",
      items: [
        {
          question: "What integrations do you support?",
          answer:
            "We natively integrate with Slack, GitHub, Jira, Notion, Figma, and 60+ other tools. Custom integrations are available via our REST API.",
          category: "Integrations",
        },
        {
          question: "Is my data encrypted?",
          answer:
            "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II certified and GDPR compliant.",
          category: "Security",
        },
        {
          question: "Can I export my data?",
          answer:
            "Yes — you can export all your data in JSON or CSV format at any time from the settings panel. There are no export limits.",
          category: "Data",
        },
        {
          question: "What support channels are available?",
          answer:
            "Pro and Business plans include live chat support. Enterprise customers get a dedicated success manager and 24/7 phone support.",
          category: "Support",
        },
      ],
    },

    "faq-expandable-grid": {
      title: "Common Questions",
      description: "Quick answers to the questions we hear most often.",
      items: [
        {
          question: "How quickly can I get set up?",
          answer:
            "Most teams are fully onboarded within 30 minutes. Our setup wizard guides you through connecting your tools and inviting teammates.",
        },
        {
          question: "Do you support single sign-on (SSO)?",
          answer:
            "SSO via SAML 2.0 and OIDC is available on Business and Enterprise plans. We support Okta, Azure AD, Google Workspace, and more.",
        },
        {
          question: "What happens when my trial ends?",
          answer:
            "Your account automatically moves to the free plan. Your data is preserved and you can upgrade at any point to regain Pro features.",
        },
        {
          question: "Is there a limit on API calls?",
          answer:
            "Free plans include 1,000 API calls/month. Pro plans include 100,000 calls/month. Enterprise plans have custom limits.",
        },
        {
          question: "Can I self-host the platform?",
          answer:
            "Self-hosting is available for Enterprise customers. We provide Docker images, Helm charts, and full deployment documentation.",
        },
        {
          question: "Do you have a status page?",
          answer:
            "Yes — our real-time status page shows uptime and incident history. You can subscribe to email or webhook notifications.",
        },
      ],
    },

    "faq-tabs-grouped": {
      title: "Frequently Asked Questions",
      description: "Browse by topic or scroll through all questions below.",
      items: [
        {
          question: "How do I invite my team?",
          answer:
            "Go to Settings → Team, enter their email addresses, and choose a role. They'll receive an invitation link valid for 48 hours.",
          category: "Getting Started",
        },
        {
          question: "What is the onboarding process like?",
          answer:
            "After signing up, a guided checklist walks you through connecting your first integration, creating a project, and inviting teammates.",
          category: "Getting Started",
        },
        {
          question: "Which payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfer for annual Enterprise contracts.",
          category: "Billing",
        },
        {
          question: "Can I get a refund?",
          answer:
            "We offer a full refund within 14 days of any payment if you're not satisfied — no questions asked.",
          category: "Billing",
        },
        {
          question: "How is my data backed up?",
          answer:
            "We perform automated daily backups with 30-day retention. Point-in-time restore is available on Business and Enterprise plans.",
          category: "Security",
        },
        {
          question: "Who can access my workspace data?",
          answer:
            "Only authenticated members of your workspace can access your data. Anthropic staff can only access data with your explicit consent for support.",
          category: "Security",
        },
      ],
    },

    "faq-timeline": {
      title: "Your Questions, Answered",
      description: "A step-by-step look at the questions customers ask most.",
      items: [
        {
          question: "How do I get started?",
          answer:
            "Sign up for free, complete the onboarding checklist, and you'll have your first project live within minutes.",
        },
        {
          question: "What plan is right for my team?",
          answer:
            "For teams under 10 the Pro plan covers everything. Larger teams or enterprise security needs should consider our Business plan.",
        },
        {
          question: "How do I connect my existing tools?",
          answer:
            "Navigate to Integrations, search for your tool, and click Connect. OAuth handles the authentication automatically.",
        },
        {
          question: "Can I migrate data from another platform?",
          answer:
            "Yes — we provide CSV import and dedicated migration guides for popular platforms. Our support team can assist with complex migrations.",
        },
      ],
    },

    "faq-two-columns": {
      headline: "Frequently Asked Questions",
      description:
        "Can't find your answer here? Reach out to our support team anytime.",
      items: [
        {
          question: "What makes you different from competitors?",
          answer:
            "We focus on simplicity without sacrificing power. Our customers consistently praise the intuitive UI and the speed of our support team.",
        },
        {
          question: "How do permissions and roles work?",
          answer:
            "We offer five built-in roles (Owner, Admin, Manager, Member, Viewer) and fully customisable permission sets on Business plans.",
        },
        {
          question: "Is there a mobile app?",
          answer:
            "Yes — native iOS and Android apps are available. They sync in real time and support offline mode for core features.",
        },
        {
          question: "How do I contact support?",
          answer:
            "Use the in-app chat, email support@example.com, or browse our documentation. Response times are under 2 hours on business days.",
        },
        {
          question: "Are there usage limits on the free plan?",
          answer:
            "Free plans include 3 projects, 5 seats, 1 GB storage, and 1,000 API calls per month. Upgrading removes all limits.",
        },
        {
          question: "What SLA do you offer?",
          answer:
            "We guarantee 99.9% uptime for Pro and Business plans. Enterprise plans come with a 99.99% SLA and dedicated infrastructure.",
        },
      ],
    },

    "faq-with-categories": {
      headline: "Support Centre",
      description:
        "Find answers organised by topic, or expand any question below.",
      categories: [
        {
          name: "Pricing",
          items: [
            {
              question: "Do you offer a free tier?",
              answer:
                "Yes — our Starter plan is permanently free with core features included. No time limit and no credit card required.",
            },
            {
              question: "Can I switch plans mid-cycle?",
              answer:
                "Yes. Upgrades take effect immediately and are prorated. Downgrades apply at the next renewal date.",
            },
            {
              question: "Are there discounts for non-profits?",
              answer:
                "We offer a 50% discount for registered non-profit organisations. Contact our sales team with proof of status.",
            },
          ],
        },
        {
          name: "Security",
          items: [
            {
              question: "Is the platform SOC 2 certified?",
              answer:
                "Yes — we hold SOC 2 Type II certification. Our latest audit report is available to Enterprise customers on request.",
            },
            {
              question: "Do you support two-factor authentication?",
              answer:
                "2FA via authenticator app, SMS, or hardware key is available on all plans and can be enforced workspace-wide by admins.",
            },
          ],
        },
        {
          name: "Integrations",
          items: [
            {
              question: "How many integrations are available?",
              answer:
                "We offer 60+ native integrations and a REST API plus webhooks for custom connections with virtually any tool.",
            },
            {
              question: "Can I build a custom integration?",
              answer:
                "Absolutely. Our public API documentation and SDK make it straightforward to build and publish integrations.",
            },
          ],
        },
      ],
    },

    "faq-with-search": {
      headline: "How Can We Help?",
      description:
        "Search for an answer or browse all frequently asked questions below.",
      searchPlaceholder: "Search questions…",
      noResultsText:
        "No questions match your search. Try different keywords.",
      items: [
        {
          question: "How do I reset my password?",
          answer:
            "Click 'Forgot password' on the login screen, enter your email, and follow the link we send you. The link expires after 24 hours.",
        },
        {
          question: "Can I have multiple workspaces?",
          answer:
            "Yes — you can create or join multiple workspaces with a single account. Each workspace has its own billing and settings.",
        },
        {
          question: "How do I cancel my subscription?",
          answer:
            "Go to Settings → Billing → Cancel Plan. Your access continues until the end of the current period. We do not charge after cancellation.",
        },
        {
          question: "Is there a limit on file uploads?",
          answer:
            "Individual file uploads are limited to 500 MB. Total storage depends on your plan: 1 GB (Free), 50 GB (Pro), 500 GB (Business).",
        },
        {
          question: "Do you support dark mode?",
          answer:
            "Yes — dark, light, and system-preference modes are all supported and can be toggled from your profile settings.",
        },
      ],
    },
  },
};
