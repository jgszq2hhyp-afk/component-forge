// Auto-generated preview props for batch-7
// Categories: pricing, process, ratings, search, services, sidebar, social-proof

const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  // ─────────────────────────────────────────────────────────────────────────
  // PRICING
  // ─────────────────────────────────────────────────────────────────────────
  pricing: {
    "pricing-cards-gradient": {
      headline: "Simple, Transparent Pricing",
      description:
        "Choose the plan that fits your team. Upgrade or downgrade at any time.",
      plans: [
        {
          name: "Starter",
          description: "Perfect for individuals and small projects.",
          price: "$19",
          period: "/month",
          features: [
            { text: "5 projects" },
            { text: "10 GB storage" },
            { text: "Email support" },
            { text: "API access" },
          ],
          ctaText: "Get Started",
          ctaHref: "#",
          highlighted: false,
        },
        {
          name: "Pro",
          description: "Great for growing teams and agencies.",
          price: "$49",
          period: "/month",
          features: [
            { text: "Unlimited projects" },
            { text: "100 GB storage" },
            { text: "Priority support" },
            { text: "Advanced analytics" },
          ],
          ctaText: "Start Free Trial",
          ctaHref: "#",
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Enterprise",
          description: "For large organisations with custom needs.",
          price: "$99",
          period: "/month",
          features: [
            { text: "Unlimited projects" },
            { text: "1 TB storage" },
            { text: "Dedicated account manager" },
            { text: "SSO & audit logs" },
          ],
          ctaText: "Contact Sales",
          ctaHref: "#",
          highlighted: false,
        },
      ],
    },

    "pricing-comparison-table": {
      headline: "Compare Plans",
      description: "Find the right tier for your workflow.",
      plans: [
        {
          id: "starter",
          name: "Starter",
          price: "$19",
          period: "/mo",
          ctaText: "Get Started",
          ctaHref: "#",
          highlighted: false,
        },
        {
          id: "pro",
          name: "Pro",
          price: "$49",
          period: "/mo",
          ctaText: "Start Trial",
          ctaHref: "#",
          highlighted: true,
        },
        {
          id: "enterprise",
          name: "Enterprise",
          price: "$99",
          period: "/mo",
          ctaText: "Contact Sales",
          ctaHref: "#",
          highlighted: false,
        },
      ],
      features: [
        {
          name: "Projects",
          category: "Core",
          values: { starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
        },
        {
          name: "Storage",
          category: "Core",
          values: { starter: "10 GB", pro: "100 GB", enterprise: "1 TB" },
        },
        {
          name: "API Access",
          category: "Core",
          values: { starter: true, pro: true, enterprise: true },
        },
        {
          name: "Priority Support",
          category: "Support",
          values: { starter: false, pro: true, enterprise: true },
        },
        {
          name: "SSO",
          category: "Security",
          values: { starter: false, pro: false, enterprise: true },
        },
        {
          name: "Audit Logs",
          category: "Security",
          values: { starter: false, pro: false, enterprise: true },
        },
      ],
      selectedPlanId: "pro",
    },

    "pricing-single-highlight": {
      headline: "Everything You Need",
      description: "One plan, no hidden fees, cancel anytime.",
      planName: "Pro",
      planDescription:
        "The complete toolkit for professional developers and growing teams.",
      price: "$49",
      period: "/month",
      features: [
        { text: "Unlimited projects" },
        { text: "100 GB storage" },
        { text: "Priority email & chat support" },
        { text: "Advanced analytics dashboard" },
        { text: "Custom domain support" },
        { text: "Team collaboration tools" },
      ],
      ctaText: "Start Your Free Trial",
      ctaHref: "#",
      guaranteeText: "30-day money-back guarantee. No credit card required.",
    },

    "pricing-slider": {
      headline: "Pay Only for What You Use",
      description:
        "Slide to your team size and see exactly what you'll pay each month.",
      tiers: [
        {
          name: "Starter",
          basePrice: 0,
          unitPrice: 2,
          features: ["Email support", "5 GB storage per user", "Basic analytics"],
          highlighted: false,
          cta: "Get Started",
          ctaHref: "#",
        },
        {
          name: "Pro",
          basePrice: 29,
          unitPrice: 5,
          features: [
            "Priority support",
            "20 GB storage per user",
            "Advanced analytics",
            "API access",
          ],
          highlighted: true,
          cta: "Start Free Trial",
          ctaHref: "#",
        },
        {
          name: "Enterprise",
          basePrice: 99,
          unitPrice: 8,
          features: [
            "Dedicated support",
            "Unlimited storage",
            "Custom integrations",
            "SSO & audit logs",
          ],
          highlighted: false,
          cta: "Contact Sales",
          ctaHref: "#",
        },
      ],
      unit: "users",
      minUnits: 1,
      maxUnits: 100,
      defaultUnits: 15,
      currency: "$",
    },

    "pricing-three-columns": {
      headline: "Choose Your Plan",
      description:
        "Flexible pricing to match every stage of your business growth.",
      plans: [
        {
          name: "Starter",
          description: "For individuals just getting started.",
          price: "$19",
          period: "/month",
          features: [
            { text: "5 projects", included: true },
            { text: "10 GB storage", included: true },
            { text: "Email support", included: true },
            { text: "Priority support", included: false },
            { text: "Custom domain", included: false },
            { text: "SSO login", included: false },
          ],
          ctaText: "Get Started",
          ctaHref: "#",
          highlighted: false,
        },
        {
          name: "Pro",
          description: "For teams ready to scale.",
          price: "$49",
          period: "/month",
          features: [
            { text: "Unlimited projects", included: true },
            { text: "100 GB storage", included: true },
            { text: "Email support", included: true },
            { text: "Priority support", included: true },
            { text: "Custom domain", included: true },
            { text: "SSO login", included: false },
          ],
          ctaText: "Start Free Trial",
          ctaHref: "#",
          highlighted: true,
          badge: "Most Popular",
        },
        {
          name: "Enterprise",
          description: "For organisations with advanced needs.",
          price: "$99",
          period: "/month",
          features: [
            { text: "Unlimited projects", included: true },
            { text: "1 TB storage", included: true },
            { text: "24/7 dedicated support", included: true },
            { text: "Priority support", included: true },
            { text: "Custom domain", included: true },
            { text: "SSO login", included: true },
          ],
          ctaText: "Contact Sales",
          ctaHref: "#",
          highlighted: false,
        },
      ],
    },

    "pricing-toggle-cards": {
      heading: "Simple, transparent pricing",
      subheading: "Choose the plan that fits your needs. Upgrade or downgrade at any time.",
    },

    "pricing-toggle-monthly": {
      headline: "Flexible Billing",
      description: "Switch between monthly and annual billing at any time.",
      monthlyLabel: "Monthly",
      yearlyLabel: "Annual",
      yearlySavingsBadge: "Save 20%",
      plans: [
        {
          name: "Starter",
          description: "For individuals and hobby projects.",
          monthlyPrice: "$19",
          yearlyPrice: "$15",
          features: [
            { text: "5 projects", included: true },
            { text: "10 GB storage", included: true },
            { text: "API access", included: true },
            { text: "Priority support", included: false },
          ],
          ctaText: "Get Started",
          ctaHref: "#",
          highlighted: false,
        },
        {
          name: "Pro",
          description: "For professional teams and agencies.",
          monthlyPrice: "$49",
          yearlyPrice: "$39",
          features: [
            { text: "Unlimited projects", included: true },
            { text: "100 GB storage", included: true },
            { text: "API access", included: true },
            { text: "Priority support", included: true },
          ],
          ctaText: "Start Free Trial",
          ctaHref: "#",
          highlighted: true,
          badge: "Best Value",
        },
        {
          name: "Enterprise",
          description: "Custom solutions for large organisations.",
          monthlyPrice: "$99",
          yearlyPrice: "$79",
          features: [
            { text: "Unlimited projects", included: true },
            { text: "1 TB storage", included: true },
            { text: "API access", included: true },
            { text: "Dedicated account manager", included: true },
          ],
          ctaText: "Contact Sales",
          ctaHref: "#",
          highlighted: false,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PROCESS
  // ─────────────────────────────────────────────────────────────────────────
  process: {
    "process-alternating": {
      headline: "How It Works",
      steps: [
        {
          title: "Sign Up & Connect",
          description:
            "Create your account in seconds and connect your existing tools. No credit card required to get started.",
          imageSrc: IMG,
        },
        {
          title: "Configure Your Workspace",
          description:
            "Set up your projects, invite team members, and define your workflows with our intuitive drag-and-drop editor.",
          imageSrc: IMG,
        },
        {
          title: "Launch & Collaborate",
          description:
            "Go live and collaborate in real time. Track progress, assign tasks, and hit your deadlines with confidence.",
          imageSrc: IMG,
        },
        {
          title: "Analyse & Optimise",
          description:
            "Use built-in analytics to spot bottlenecks, measure performance, and continuously improve your process.",
          imageSrc: IMG,
        },
      ],
    },

    "process-connector-line": {
      headline: "Our Simple Process",
      steps: [
        {
          title: "Discovery Call",
          description:
            "We learn about your business, goals, and challenges in a 30-minute call.",
        },
        {
          title: "Strategy & Proposal",
          description:
            "Our team crafts a tailored strategy and sends you a detailed proposal within 48 hours.",
        },
        {
          title: "Design & Build",
          description:
            "We design and develop your solution iteratively, with weekly check-ins and previews.",
        },
        {
          title: "Launch & Handover",
          description:
            "We deploy your project, train your team, and provide ongoing support.",
        },
      ],
    },

    "process-horizontal-steps": {
      headline: "Get Up and Running in Minutes",
      subheadline:
        "Four simple steps to transform the way your team works together.",
      steps: [
        {
          title: "Create Account",
          description:
            "Sign up with your work email and verify your account in under a minute.",
        },
        {
          title: "Import Your Data",
          description:
            "Connect your existing tools or import a CSV — we handle the rest automatically.",
        },
        {
          title: "Invite Your Team",
          description:
            "Add colleagues via email or share a unique invite link with custom permission levels.",
        },
        {
          title: "Start Collaborating",
          description:
            "Assign tasks, leave comments, and track progress all from one unified dashboard.",
        },
      ],
    },

    "process-icon-cards": {
      headline: "Why Teams Choose Us",
      steps: [
        {
          title: "Onboard in Minutes",
          description:
            "No lengthy setup. Connect your tools and your team is productive from day one.",
        },
        {
          title: "Automate the Routine",
          description:
            "Let our smart workflows handle repetitive tasks so your team can focus on what matters.",
        },
        {
          title: "Track Everything",
          description:
            "Real-time dashboards give you full visibility into every project and deadline.",
        },
        {
          title: "Scale Confidently",
          description:
            "Built for teams of 2 to 2,000 — our infrastructure grows with your business.",
        },
      ],
    },

    "process-numbered-list": {
      headline: "From Idea to Launch",
      steps: [
        {
          title: "Define Your Requirements",
          description:
            "Document your goals, target audience, and key features using our guided brief template.",
        },
        {
          title: "Review the Prototype",
          description:
            "Receive an interactive prototype within 72 hours and provide feedback directly in the tool.",
        },
        {
          title: "Approve the Design",
          description:
            "Once happy, sign off on the final designs and we begin development immediately.",
        },
        {
          title: "Go Live",
          description:
            "We deploy to your infrastructure or ours, with monitoring and support included.",
        },
      ],
    },

    "process-vertical-timeline": {
      headline: "Your Journey With Us",
      subheadline:
        "A transparent, step-by-step overview of everything that happens from first contact to final delivery.",
      steps: [
        {
          title: "Initial Consultation",
          description:
            "A free 30-minute call to understand your needs, timeline, and budget.",
          label: "Week 1",
        },
        {
          title: "Discovery & Research",
          description:
            "We audit your existing setup, research competitors, and map out the ideal solution.",
          label: "Week 2",
        },
        {
          title: "Design Phase",
          description:
            "High-fidelity wireframes and UI designs are presented for your review and approval.",
          label: "Weeks 3–4",
        },
        {
          title: "Development & Testing",
          description:
            "We build, test, and QA every feature against agreed acceptance criteria.",
          label: "Weeks 5–8",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RATINGS
  // ─────────────────────────────────────────────────────────────────────────
  ratings: {
    "ratings-aggregate-display": {
      average: 4.8,
      total: 330,
      distribution: [156, 87, 45, 24, 18] as [
        number,
        number,
        number,
        number,
        number,
      ],
      headline: "What Our Customers Say",
    },

    "ratings-bar-breakdown": {
      distribution: [156, 87, 45, 24, 18],
      totalReviews: 330,
      averageRating: 4.8,
    },

    "ratings-compact-inline": {
      rating: 4.8,
      reviewCount: 330,
      maxRating: 5,
    },

    "ratings-review-cards": {
      headline: "Customer Reviews",
      columns: 3,
      reviews: [
        {
          name: "Emma Schulz",
          rating: 5,
          date: "March 12, 2026",
          text: "Absolutely transformed how our team collaborates. Setup was effortless and the support team is outstanding.",
          verified: true,
          avatarSrc: AVATAR,
        },
        {
          name: "Lukas Brenner",
          rating: 5,
          date: "February 28, 2026",
          text: "We cut our project delivery time in half. The analytics dashboard alone is worth the subscription.",
          verified: true,
          avatarSrc: AVATAR,
        },
        {
          name: "Sophia Müller",
          rating: 4,
          date: "January 15, 2026",
          text: "Great product with a clean interface. Would love to see more export options, but overall highly recommended.",
          verified: false,
          avatarSrc: AVATAR,
        },
      ],
    },

    "ratings-star-input": {
      value: 4,
      size: 28,
    },

    "ratings-testimonial-with-stars": {
      headline: "Trusted by Thousands",
      reviews: [
        {
          author: "Anna Koch",
          role: "Product Manager at Acme",
          rating: 5,
          text: "This tool changed the way I manage my product backlog. Highly recommend to any PM.",
        },
        {
          author: "Markus Weber",
          role: "CTO at Initech",
          rating: 5,
          text: "Solid engineering, great DX, and the team behind it is incredibly responsive.",
        },
        {
          author: "Laura Bauer",
          role: "Freelance Designer",
          rating: 4,
          text: "Beautiful interface and easy to use. It fits perfectly into my client workflow.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SEARCH
  // ─────────────────────────────────────────────────────────────────────────
  search: {
    "search-autocomplete": {
      suggestions: [
        "Getting started guide",
        "How to invite team members",
        "Billing and invoices",
        "API documentation",
        "Integrations overview",
        "Custom domains",
        "Export your data",
        "Security and compliance",
      ],
      placeholder: "Search documentation...",
    },

    "search-command-bar": {
      placeholder: "Search anything...",
      shortcutKey: "k",
    },

    "search-filter-sidebar": {
      filters: [
        {
          label: "Category",
          options: ["Design", "Development", "Marketing", "Analytics"],
        },
        {
          label: "Price Range",
          options: ["Free", "Under $50", "$50–$100", "$100+"],
        },
        {
          label: "Rating",
          options: ["4 stars & up", "3 stars & up", "2 stars & up"],
        },
      ],
      activeFilters: ["Design", "4 stars & up"],
    },

    "search-hero-section": {
      placeholder: "Search components, categories, docs...",
      suggestions: [
        "Pricing cards",
        "Hero sections",
        "Testimonials",
        "Navigation menus",
        "Footer layouts",
        "Contact forms",
      ],
      popularTags: ["Pricing", "Hero", "Cards", "Forms", "Testimonials"],
    },

    "search-inline-bar": {
      placeholder: "Search articles...",
    },

    "search-results-section": {
      query: "pricing",
      totalCount: 3,
      results: [
        {
          title: "Pricing Cards Gradient",
          description:
            "A set of gradient pricing cards with highlighted plan support, badge labels, and feature lists. Ideal for SaaS landing pages.",
          url: "#pricing-cards-gradient",
          highlights: ["pricing", "gradient", "SaaS"],
        },
        {
          title: "Pricing Comparison Table",
          description:
            "A feature-rich comparison table component that lets visitors evaluate plans side by side with boolean and text feature values.",
          url: "#pricing-comparison-table",
          highlights: ["pricing", "comparison", "table"],
        },
        {
          title: "Pricing Toggle Monthly",
          description:
            "Toggle between monthly and annual billing with an animated switch. Displays a savings badge when annual billing is selected.",
          url: "#pricing-toggle-monthly",
          highlights: ["pricing", "toggle", "billing"],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SERVICES
  // ─────────────────────────────────────────────────────────────────────────
  services: {
    "services-comparison-table": {
      headline: "Service Tiers at a Glance",
      featureNames: [
        "Initial consultation",
        "Custom design",
        "Responsive development",
        "CMS integration",
        "SEO setup",
        "Ongoing maintenance",
      ],
      tiers: [
        {
          name: "Basic",
          features: {
            "Initial consultation": true,
            "Custom design": false,
            "Responsive development": true,
            "CMS integration": false,
            "SEO setup": false,
            "Ongoing maintenance": false,
          },
        },
        {
          name: "Standard",
          features: {
            "Initial consultation": true,
            "Custom design": true,
            "Responsive development": true,
            "CMS integration": true,
            "SEO setup": false,
            "Ongoing maintenance": false,
          },
        },
        {
          name: "Premium",
          features: {
            "Initial consultation": true,
            "Custom design": true,
            "Responsive development": true,
            "CMS integration": true,
            "SEO setup": true,
            "Ongoing maintenance": true,
          },
        },
      ],
    },

    "services-cta-banner": {
      headline: "Ready to Transform Your Business?",
      description:
        "Book a free strategy session with our team and discover how we can help you grow faster.",
      ctaLabel: "Book a Free Call",
      ctaHref: "#",
    },

    "services-detailed-list": {
      headline: "What We Offer",
      services: [
        {
          title: "Web Design & Development",
          description:
            "We build fast, accessible, and beautiful websites tailored to your brand. From landing pages to complex web applications.",
          imageSrc: IMG,
          imageAlt: "Web design illustration",
          features: [
            "Responsive design for all devices",
            "Performance-optimised code",
            "Accessibility-first approach",
            "CMS integration",
          ],
        },
        {
          title: "SEO & Content Strategy",
          description:
            "Drive organic traffic with a data-driven SEO strategy and content that converts visitors into customers.",
          imageSrc: IMG,
          imageAlt: "SEO strategy illustration",
          features: [
            "Technical SEO audit",
            "Keyword research and mapping",
            "Content calendar planning",
            "Monthly reporting",
          ],
        },
        {
          title: "Brand Identity",
          description:
            "Define and communicate what makes you unique with a consistent, compelling brand identity that stands out.",
          imageSrc: IMG,
          imageAlt: "Brand identity illustration",
          features: [
            "Logo and visual system",
            "Typography and colour palette",
            "Brand guidelines document",
            "Social media kit",
          ],
        },
      ],
    },

    "services-feature-list": {
      headline: "Built for Modern Teams",
      description:
        "Every feature is designed to reduce friction and help your team move faster.",
      features: [
        {
          title: "Real-Time Collaboration",
          description:
            "Work together simultaneously — no more version conflicts or email back-and-forth.",
        },
        {
          title: "Automated Workflows",
          description:
            "Set up triggers and actions to automate repetitive tasks across your stack.",
        },
        {
          title: "Detailed Analytics",
          description:
            "Track engagement, performance, and ROI with customisable dashboards.",
        },
        {
          title: "Enterprise Security",
          description:
            "SOC 2 Type II certified, with SSO, audit logs, and role-based access control.",
        },
        {
          title: "100+ Integrations",
          description:
            "Connect to Slack, GitHub, Jira, Figma, and dozens of other tools your team already uses.",
        },
        {
          title: "Priority Support",
          description:
            "Dedicated support with guaranteed response times and a named account manager.",
        },
      ],
    },

    "services-icon-grid": {
      headline: "Our Core Services",
      subheadline:
        "A full suite of digital services to help your business thrive online.",
      columns: 3,
      services: [
        {
          title: "Web Development",
          description:
            "Custom websites and web applications built with modern, performant technologies.",
        },
        {
          title: "UI/UX Design",
          description:
            "User-centred design that converts visitors and delights customers.",
        },
        {
          title: "SEO Optimisation",
          description:
            "Sustainable organic growth through technical excellence and great content.",
        },
        {
          title: "Email Marketing",
          description:
            "Automated campaigns that nurture leads and keep customers engaged.",
        },
        {
          title: "Analytics & Reporting",
          description:
            "Data-driven insights to guide every decision your team makes.",
        },
        {
          title: "Cloud Hosting",
          description:
            "Scalable, secure infrastructure with 99.9% uptime guarantees.",
        },
      ],
    },

    "services-pricing-cards": {
      headline: "Our Service Packages",
      services: [
        {
          title: "Starter Website",
          description:
            "A professional 5-page website to establish your online presence.",
          price: "€1,499",
          unit: "one-time",
          features: [
            "5 custom pages",
            "Mobile responsive",
            "Basic SEO setup",
            "Contact form",
          ],
          ctaLabel: "Get Started",
          ctaHref: "#",
          highlighted: false,
        },
        {
          title: "Business Website",
          description:
            "A full-featured site with CMS, blog, and conversion optimisation.",
          price: "€3,499",
          unit: "one-time",
          features: [
            "Up to 20 pages",
            "CMS & blog",
            "Advanced SEO",
            "Analytics integration",
            "12-month support",
          ],
          ctaLabel: "Most Popular",
          ctaHref: "#",
          highlighted: true,
        },
        {
          title: "E-Commerce Store",
          description:
            "A complete online shop with payment processing and inventory management.",
          price: "€5,999",
          unit: "one-time",
          features: [
            "Unlimited products",
            "Payment gateway",
            "Inventory management",
            "Email automation",
            "24-month support",
          ],
          ctaLabel: "Start Selling",
          ctaHref: "#",
          highlighted: false,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SIDEBAR
  // ─────────────────────────────────────────────────────────────────────────
  sidebar: {
    "sidebar-blog": {
      categories: [
        { name: "Design", count: 14, href: "#" },
        { name: "Development", count: 22, href: "#" },
        { name: "Marketing", count: 9, href: "#" },
        { name: "Business", count: 6, href: "#" },
      ],
      recentPosts: [
        {
          title: "10 UI Patterns Every Designer Should Know",
          date: "April 1, 2026",
          href: "#",
        },
        {
          title: "How We Cut Load Time by 60% With Server Components",
          date: "March 22, 2026",
          href: "#",
        },
        {
          title: "The Ultimate SEO Checklist for 2026",
          date: "March 10, 2026",
          href: "#",
        },
      ],
      tags: [
        { name: "React", href: "#" },
        { name: "TypeScript", href: "#" },
        { name: "Next.js", href: "#" },
        { name: "Tailwind", href: "#" },
        { name: "SEO", href: "#" },
        { name: "Design Systems", href: "#" },
      ],
    },

    "sidebar-collapsible": {
      groups: [
        {
          title: "Getting Started",
          links: [
            { label: "Introduction", href: "#" },
            { label: "Installation", href: "#" },
            { label: "Quick Start", href: "#" },
          ],
        },
        {
          title: "Components",
          links: [
            { label: "Buttons", href: "#" },
            { label: "Forms", href: "#" },
            { label: "Cards", href: "#" },
            { label: "Modals", href: "#" },
          ],
        },
        {
          title: "API Reference",
          links: [
            { label: "Authentication", href: "#" },
            { label: "Endpoints", href: "#" },
            { label: "Webhooks", href: "#" },
          ],
        },
      ],
    },

    "sidebar-dashboard": {
      title: "Navigation",
      items: [
        { label: "Dashboard", href: "#", active: true },
        { label: "Projects", href: "#", active: false },
        { label: "Team", href: "#", active: false },
        { label: "Analytics", href: "#", active: false },
        { label: "Settings", href: "#", active: false },
      ],
    },

    "sidebar-filters": {
      sections: [
        {
          title: "Status",
          options: ["Active", "Draft", "Archived", "Deleted"],
        },
        {
          title: "Assigned To",
          options: ["Me", "My Team", "Unassigned"],
        },
        {
          title: "Priority",
          options: ["Critical", "High", "Medium", "Low"],
        },
      ],
    },

    "sidebar-profile": {
      name: "Niklas Hoffmann",
      email: "niklas@example.com",
      avatarSrc: AVATAR,
      links: [
        { label: "My Profile", href: "#" },
        { label: "Account Settings", href: "#" },
        { label: "Billing", href: "#" },
        { label: "Sign Out", href: "#" },
      ],
    },

    "sidebar-toc": {
      headings: [
        { id: "introduction", text: "Introduction", level: 2 },
        { id: "getting-started", text: "Getting Started", level: 2 },
        { id: "installation", text: "Installation", level: 3 },
        { id: "configuration", text: "Configuration", level: 3 },
        { id: "usage", text: "Usage", level: 2 },
        { id: "basic-example", text: "Basic Example", level: 3 },
        { id: "advanced-example", text: "Advanced Example", level: 3 },
        { id: "api-reference", text: "API Reference", level: 2 },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SOCIAL-PROOF
  // ─────────────────────────────────────────────────────────────────────────
  "social-proof": {
    "logo-carousel-infinite": {
      heading: "Trusted by Industry Leaders",
      logos: [
        { name: "Acme Corp", src: IMG, href: "#" },
        { name: "Globex", src: IMG, href: "#" },
        { name: "Initech", src: IMG, href: "#" },
        { name: "Umbrella Inc", src: IMG, href: "#" },
        { name: "Hooli", src: IMG, href: "#" },
        { name: "Stark Industries", src: IMG, href: "#" },
      ],
      speed: 40,
      pauseOnHover: true,
      direction: "left",
    },

    "logo-grid-static": {
      heading: "Trusted by 500+ companies worldwide",
      logos: [
        { name: "Acme Corp", src: IMG },
        { name: "Globex", src: IMG },
        { name: "Initech", src: IMG },
        { name: "Umbrella Inc", src: IMG },
        { name: "Hooli", src: IMG },
        { name: "Stark Industries", src: IMG },
      ],
      columns: 6,
      grayscale: true,
    },

    "logo-with-testimonial": {
      heading: "What Our Customers Say",
      layout: "grid",
      testimonials: [
        {
          quote:
            "This platform cut our onboarding time by 60%. Our entire team was productive within a day.",
          author: "Sarah Chen",
          role: "CTO",
          company: "Acme Corp",
          logoSrc: IMG,
          avatarSrc: AVATAR,
        },
        {
          quote:
            "The best investment we made this year. Simple to implement, powerful results.",
          author: "Marcus Johnson",
          role: "Head of Engineering",
          company: "Globex",
          logoSrc: IMG,
          avatarSrc: AVATAR,
        },
        {
          quote:
            "Incredible support team and a product that just works. We haven't looked back.",
          author: "Priya Patel",
          role: "VP of Product",
          company: "Initech",
          logoSrc: IMG,
          avatarSrc: AVATAR,
        },
      ],
    },

    "social-proof-banner": {
      headline: "Powering teams across the globe",
      variant: "dark",
      stats: [
        { value: "12,000+", label: "Active Teams" },
        { value: "98%", label: "Customer Satisfaction" },
        { value: "4.9/5", label: "Average Rating" },
        { value: "99.9%", label: "Uptime SLA" },
      ],
    },

    "social-proof-live-counter": {
      count: 47,
      label: "people are viewing this page right now",
    },

    "trust-badges": {
      heading: "Your Trust Is Our Priority",
      layout: "horizontal",
      badges: [
        {
          icon: null,
          label: "SOC 2 Type II",
          sublabel: "Certified",
        },
        {
          icon: null,
          label: "GDPR",
          sublabel: "Compliant",
        },
        {
          icon: null,
          label: "ISO 27001",
          sublabel: "Certified",
        },
        {
          icon: null,
          label: "256-bit SSL",
          sublabel: "Encryption",
        },
      ],
    },
  },
};
