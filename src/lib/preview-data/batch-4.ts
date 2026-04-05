// @batch 4
// @categories features, footers, forms, gallery
// Auto-generated preview props — do not edit manually.

const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  // -------------------------------------------------------------------------
  // FEATURES
  // -------------------------------------------------------------------------
  features: {
    "feature-accordion": {
      headline: "Everything You Need to Know",
      subheadline:
        "Find answers to the most common questions about our platform and how it can help your business grow.",
      allowMultiple: false,
      items: [
        {
          title: "How does the onboarding process work?",
          description:
            "Our guided onboarding takes less than 10 minutes. You'll connect your existing tools, set up your workspace, and be ready to collaborate with your team from day one.",
        },
        {
          title: "Can I switch plans at any time?",
          description:
            "Yes — upgrades take effect immediately and you're only billed the prorated difference. Downgrades take effect at the end of your current billing cycle.",
        },
        {
          title: "Is my data secure and encrypted?",
          description:
            "All data is encrypted at rest with AES-256 and in transit with TLS 1.3. We are SOC 2 Type II certified and conduct annual third-party penetration tests.",
        },
        {
          title: "Do you offer a free trial?",
          description:
            "Every new account starts with a 14-day free trial of our Pro plan — no credit card required. After the trial you can continue on our generous free tier or upgrade at any time.",
        },
      ],
    },

    "feature-alternating-rows": {
      headline: "Built for Modern Teams",
      subheadline:
        "Every feature is designed to remove friction and help your team ship faster without compromising quality.",
      rows: [
        {
          title: "Real-Time Collaboration",
          description:
            "Work alongside your teammates in a shared workspace that updates instantly. Leave comments, resolve threads, and keep everyone aligned without switching tabs.",
          imageSrc: IMG,
          imageAlt: "Collaboration interface screenshot",
          badge: "New",
          bullets: [
            "Live cursor presence for all collaborators",
            "Inline comments with thread resolution",
            "Version history with one-click restore",
          ],
        },
        {
          title: "Powerful Analytics Dashboard",
          description:
            "Turn raw data into actionable insights with customisable charts, automated reports, and intelligent alerts that surface what matters most.",
          imageSrc: IMG,
          imageAlt: "Analytics dashboard screenshot",
          badge: "Popular",
          bullets: [
            "100+ pre-built chart templates",
            "Scheduled PDF and Slack reports",
            "Anomaly detection powered by AI",
          ],
        },
        {
          title: "Enterprise-Grade Security",
          description:
            "Protect your data with SSO, role-based access control, audit logs, and end-to-end encryption that meets the highest compliance standards.",
          imageSrc: IMG,
          imageAlt: "Security settings screenshot",
          bullets: [
            "SAML 2.0 & OpenID Connect SSO",
            "Granular role and permission management",
            "SOC 2 Type II certified infrastructure",
          ],
        },
      ],
    },

    "feature-bento-grid": {
      headline: "One Platform, Infinite Possibilities",
      subheadline:
        "A unified toolkit that adapts to your workflow — whether you're a solo founder or a 500-person engineering org.",
      items: [
        {
          title: "AI-Powered Suggestions",
          description:
            "Get context-aware recommendations as you work. Our model learns your preferences and surfaces the right action at the right moment.",
          imageSrc: IMG,
          imageAlt: "AI suggestions interface",
          span: "wide",
        },
        {
          title: "Instant Search",
          description:
            "Find anything across your entire workspace in milliseconds — files, comments, teammates, and history.",
          span: "default",
        },
        {
          title: "Custom Automations",
          description:
            "Build no-code workflows that trigger on any event and connect to 200+ integrations.",
          imageSrc: IMG,
          imageAlt: "Automation builder",
          span: "tall",
        },
        {
          title: "Global CDN",
          description:
            "Your assets are delivered from 50+ edge locations for sub-50 ms load times worldwide.",
          span: "default",
        },
      ],
    },

    "feature-cards-grid": {
      headline: "Features That Drive Results",
      subheadline:
        "Carefully crafted capabilities that help teams of every size move faster and deliver better outcomes.",
      columns: 3,
      cards: [
        {
          title: "Smart Scheduling",
          description:
            "Automatically find the best meeting times across time zones and send calendar invites with one click.",
          href: "#",
        },
        {
          title: "Document Editor",
          description:
            "A collaborative rich-text editor with real-time co-authoring, nested comments, and version control built in.",
          href: "#",
        },
        {
          title: "API & Webhooks",
          description:
            "Extend and integrate with any tool using our comprehensive REST API and real-time webhook events.",
          href: "#",
        },
        {
          title: "Advanced Reporting",
          description:
            "Generate beautiful, shareable reports from live data with drag-and-drop chart builders.",
          href: "#",
        },
        {
          title: "Team Permissions",
          description:
            "Control who sees and edits what with fine-grained role-based access at project, folder, or item level.",
          href: "#",
        },
        {
          title: "24/7 Support",
          description:
            "Our support team responds in under two minutes around the clock — phone, chat, and email included.",
          href: "#",
        },
      ],
    },

    "feature-comparison": {
      headline: "Why Teams Choose Us",
      subheadline:
        "See how we stack up against legacy tools on the features that actually matter.",
      ourLabel: "Our Platform",
      theirLabel: "Legacy Software",
      featureColumnLabel: "Feature",
      features: [
        { label: "Real-time collaboration", ours: true, theirs: false },
        { label: "AI-powered automation", ours: true, theirs: false },
        { label: "Unlimited version history", ours: true, theirs: "30 days only" },
        { label: "Custom integrations (API)", ours: true, theirs: "Paid add-on" },
        { label: "SSO / SAML support", ours: true, theirs: "Enterprise only" },
        { label: "24/7 live support", ours: true, theirs: "Business hours" },
        { label: "No per-seat storage limits", ours: true, theirs: false },
      ],
    },

    "feature-hover-cards": {
      headline: "Built for Scale",
      subheadline:
        "Every layer of our infrastructure is designed to grow with your business — from first prototype to IPO.",
      columns: 3,
      items: [
        {
          title: "99.99% Uptime SLA",
          description:
            "We guarantee four nines of availability backed by automatic failover across multiple regions.",
          detailedDescription:
            "Our infrastructure runs across three AWS regions with active-active replication. Any single region failure triggers automatic traffic rerouting within seconds, ensuring your users never notice an outage.",
          stat: "99.99%",
          href: "#",
        },
        {
          title: "Sub-100 ms Response",
          description:
            "API responses are served from the nearest edge node, keeping latency imperceptible.",
          detailedDescription:
            "Requests are routed through our global Anycast network to the nearest of 52 PoPs. Cached responses are served in under 5 ms; uncached in under 80 ms at p99.",
          stat: "<100 ms",
          href: "#",
        },
        {
          title: "Auto-Scaling",
          description:
            "Traffic spikes are absorbed instantly with zero configuration or manual intervention required.",
          detailedDescription:
            "Our Kubernetes-based orchestration layer scales individual services independently within 30 seconds, handling burst traffic up to 50× normal load without capacity planning.",
          stat: "50× burst",
          href: "#",
        },
        {
          title: "End-to-End Encryption",
          description:
            "Your data is encrypted in transit and at rest using the latest industry standards.",
          detailedDescription:
            "All connections use TLS 1.3. Data at rest is encrypted with AES-256-GCM. Encryption keys are managed in a dedicated HSM and rotated every 90 days.",
          stat: "AES-256",
          href: "#",
        },
      ],
    },

    "feature-icon-grid-large": {
      headline: "Trusted by Industry Leaders",
      subheadline:
        "From startups to Fortune 500 companies, teams rely on our platform to run their most critical workflows.",
      columns: 3,
      items: [
        {
          title: "10× Faster Delivery",
          description:
            "Automated pipelines eliminate repetitive tasks and let engineers focus on what matters — shipping features.",
          stat: "10×",
        },
        {
          title: "50% Cost Reduction",
          description:
            "By consolidating tooling and reducing context-switching, teams cut operational overhead in half on average.",
          stat: "50%",
        },
        {
          title: "3M+ Active Users",
          description:
            "A global community of practitioners contributes templates, integrations, and best practices every day.",
          stat: "3M+",
        },
        {
          title: "180+ Integrations",
          description:
            "Connect to every tool in your stack — from Slack and GitHub to Salesforce and Snowflake — in minutes.",
          stat: "180+",
        },
        {
          title: "< 2 hr Onboarding",
          description:
            "Interactive setup wizards and role-specific guides get new team members productive the same day.",
          stat: "<2 hr",
        },
        {
          title: "4.9★ Rating",
          description:
            "Consistently rated the top product in its category on G2, Capterra, and Product Hunt.",
          stat: "4.9★",
        },
      ],
    },

    "feature-icon-list": {
      headline: "Everything in One Place",
      subheadline:
        "Stop juggling a dozen tools. Our platform brings together the capabilities your team needs to ship great products.",
      layout: "vertical",
      items: [
        {
          title: "Project Management",
          description:
            "Plan sprints, track progress, and keep stakeholders informed with Kanban boards, Gantt charts, and automated status reports.",
          icon: null,
        },
        {
          title: "Design Collaboration",
          description:
            "Review designs, leave pixel-precise comments, and hand off to engineers — all without leaving the platform.",
          icon: null,
        },
        {
          title: "Developer Workflow",
          description:
            "Link pull requests to tasks, run CI pipelines, and deploy to staging with a single keyboard shortcut.",
          icon: null,
        },
        {
          title: "Customer Insights",
          description:
            "Bring user feedback, NPS scores, and support tickets into your planning cycle automatically.",
          icon: null,
        },
      ],
    },

    "feature-interactive-bento": {
      headline: "A Smarter Way to Work",
      subheadline:
        "Interactive building blocks that adapt to your team's unique rhythm and make every workflow feel effortless.",
      cards: [
        {
          title: "Unified Inbox",
          description:
            "All notifications, mentions, and action items from every project in a single prioritised feed.",
          imageSrc: IMG,
          imageAlt: "Unified inbox interface",
          span: "large",
        },
        {
          title: "Quick Actions",
          description:
            "Create tasks, send messages, or trigger automations from anywhere with a global command palette.",
          span: "default",
        },
        {
          title: "Rich Media Embeds",
          description:
            "Drop Figma files, Loom videos, and Notion pages directly into any document or task.",
          span: "wide",
        },
        {
          title: "Custom Fields",
          description:
            "Track any data point your team needs with fully configurable fields, formulas, and views.",
          span: "tall",
        },
      ],
    },

    "feature-neobrutalism": {
      headline: "No Fluff. Pure Performance.",
      subheadline:
        "Bold, honest features that do exactly what they promise — nothing more, nothing less.",
      features: [
        {
          title: "Blazing Fast Search",
          description:
            "Full-text search across every document, comment, and attachment — results in under 50 ms.",
          accentColor: "oklch(0.85 0.18 85)",
        },
        {
          title: "Drag & Drop Builder",
          description:
            "Rearrange your entire workspace with intuitive drag-and-drop. No code, no configuration files.",
          accentColor: "oklch(0.85 0.16 160)",
        },
        {
          title: "Offline Mode",
          description:
            "Keep working on planes and in tunnels. Changes sync automatically when you reconnect.",
          accentColor: "oklch(0.82 0.15 280)",
        },
        {
          title: "Dark & Light Themes",
          description:
            "A meticulously crafted theme system with full WCAG AA contrast ratios in both modes.",
          accentColor: "oklch(0.85 0.17 30)",
        },
        {
          title: "Keyboard First",
          description:
            "Every action has a keyboard shortcut. Power users can run the entire product without touching a mouse.",
          accentColor: "oklch(0.83 0.14 340)",
        },
        {
          title: "Zero Lock-In",
          description:
            "Export all your data in open formats at any time. Your data belongs to you, full stop.",
          accentColor: "oklch(0.85 0.15 200)",
        },
      ],
    },

    "feature-numbered-steps": {
      headline: "From Zero to Productive in Four Steps",
      subheadline:
        "Our streamlined setup process means your team is collaborating in minutes, not weeks.",
      items: [
        {
          title: "Create Your Workspace",
          description:
            "Sign up with your work email and name your workspace. Invite teammates via link or email — no IT ticket required.",
          stat: "2 min",
        },
        {
          title: "Connect Your Tools",
          description:
            "Sync GitHub, Slack, Jira, and 180+ other apps with OAuth in a single click. Your existing data imports automatically.",
          stat: "1 click",
        },
        {
          title: "Customise Your Workflow",
          description:
            "Choose from 50+ project templates or build your own. Set up automations, views, and permissions to match your team's process.",
          stat: "50+ templates",
        },
        {
          title: "Ship Faster",
          description:
            "With everything centralised and automated, your team eliminates status meetings and spends more time on deep work.",
          stat: "40% faster",
        },
      ],
    },

    "feature-showcase-carousel": {
      headline: "See It in Action",
      subheadline:
        "A closer look at the features that make our platform the go-to choice for high-performing teams.",
      autoAdvanceMs: 5000,
      items: [
        {
          title: "Live Collaboration Editing",
          description:
            "Multiple teammates can edit the same document simultaneously with live cursors, conflict-free merging, and instant sync across all devices.",
          imageSrc: IMG,
          imageAlt: "Live collaborative editing interface",
          stat: "∞ collaborators",
        },
        {
          title: "Visual Roadmap Planning",
          description:
            "Drag items across a timeline to schedule work, set dependencies, and communicate quarterly goals in a format every stakeholder understands.",
          imageSrc: IMG,
          imageAlt: "Visual roadmap timeline",
          stat: "12-week view",
        },
        {
          title: "Automated Status Updates",
          description:
            "Progress reports write themselves. Smart summaries pull from tasks, commits, and PRs to generate weekly digests your managers will actually read.",
          imageSrc: IMG,
          imageAlt: "Automated status report",
          stat: "0 meetings",
        },
        {
          title: "Cross-Project Insights",
          description:
            "A bird's-eye analytics view shows resource allocation, velocity trends, and risk signals across every project in your organisation.",
          imageSrc: IMG,
          imageAlt: "Cross-project analytics dashboard",
          stat: "All projects",
        },
      ],
    },

    "feature-stats-combined": {
      headline: "Numbers That Speak for Themselves",
      subheadline:
        "Real metrics from real customers who switched to our platform and never looked back.",
      columns: 3,
      items: [
        {
          title: "Faster Time to Market",
          description:
            "Teams using our platform ship new features in half the time by eliminating cross-tool context switching and manual status updates.",
          stat: "2×",
          statLabel: "delivery speed",
        },
        {
          title: "Customer Satisfaction",
          description:
            "Our NPS of 72 puts us in the top 5% of B2B SaaS products globally, driven by responsive support and continuous improvement.",
          stat: "72",
          statLabel: "Net Promoter Score",
        },
        {
          title: "Data Processed Daily",
          description:
            "Our infrastructure reliably handles massive workloads for enterprises across finance, healthcare, and technology sectors.",
          stat: "4 TB",
          statLabel: "processed per day",
        },
        {
          title: "Uptime Reliability",
          description:
            "Four-nines availability backed by a financially guaranteed SLA, with automatic failover and zero-downtime deployments.",
          stat: "99.99%",
          statLabel: "uptime SLA",
        },
        {
          title: "Integrations Available",
          description:
            "Connect to every tool your team already uses — from version control and CI/CD to CRMs and analytics platforms.",
          stat: "180+",
          statLabel: "native integrations",
        },
        {
          title: "Enterprise Customers",
          description:
            "Trusted by companies like Stripe, Figma, and Linear to run their most critical engineering and product workflows.",
          stat: "2,400+",
          statLabel: "enterprise customers",
        },
      ],
    },

    "feature-sticky-scroll": {
      headline: "Designed for the Way You Work",
      subheadline:
        "Deep-dive into the capabilities that set our platform apart from everything else on the market.",
      items: [
        {
          title: "Smart Task Management",
          description:
            "Create, assign, and track tasks with due dates, priorities, and custom fields. Automated reminders keep nothing falling through the cracks, and dependency mapping visualises the critical path at a glance.",
          imageSrc: IMG,
          imageAlt: "Task management board",
          stat: "∞ tasks",
        },
        {
          title: "Rich Document Workspace",
          description:
            "Write, plan, and document inside a powerful editor that supports markdown, embeds, tables, and code blocks. Link docs directly to tasks so context is always one click away.",
          imageSrc: IMG,
          imageAlt: "Document editor workspace",
          stat: "50 MB embeds",
        },
        {
          title: "Workflow Automation Engine",
          description:
            "Build multi-step automations with a visual no-code builder. Trigger actions on field changes, due-date proximity, or incoming webhook events, then route results to Slack, email, or any API endpoint.",
          imageSrc: IMG,
          imageAlt: "Automation workflow builder",
          stat: "200+ triggers",
        },
        {
          title: "Integrated Analytics",
          description:
            "Track velocity, cycle time, and throughput with charts that update in real time. Export any dataset to CSV or push it to your data warehouse with a single toggle.",
          imageSrc: IMG,
          imageAlt: "Analytics overview dashboard",
          stat: "Live data",
        },
      ],
    },

    "feature-tabs": {
      headline: "One Tool for Every Role",
      subheadline:
        "Whether you're a product manager, engineer, or designer, the platform moulds itself to the way you think.",
      tabs: [
        {
          label: "Managers",
          title: "Full Visibility, Zero Micromanagement",
          description:
            "Get a live picture of every project's health with automated status updates, risk flags, and resource utilisation charts — without asking anyone for a status report.",
          imageSrc: IMG,
          imageAlt: "Manager dashboard overview",
          bullets: [
            "Portfolio-level roadmap with milestones",
            "Automated weekly digests sent to Slack",
            "Capacity planning and workload balance view",
          ],
        },
        {
          label: "Engineers",
          title: "Focus on Code, Not Coordination",
          description:
            "Link pull requests to tasks, see CI status inline, and deploy to staging directly from the task detail — your entire development loop in one place.",
          imageSrc: IMG,
          imageAlt: "Engineering workflow view",
          bullets: [
            "GitHub, GitLab, and Bitbucket integration",
            "Automated task status from PR events",
            "One-click staging deployments",
          ],
        },
        {
          label: "Designers",
          title: "Collaborate on Designs Without Leaving Context",
          description:
            "Embed Figma files, leave annotated feedback, and hand off specifications to engineers — all attached to the task so nothing gets lost in Slack threads.",
          imageSrc: IMG,
          imageAlt: "Design collaboration panel",
          bullets: [
            "Live Figma and Sketch embeds",
            "Pixel-precise annotation tools",
            "Auto-generated design token exports",
          ],
        },
      ],
    },

    "feature-timeline": {
      headline: "Our Journey",
      subheadline:
        "From a two-person side project to a platform trusted by thousands of companies worldwide.",
      items: [
        {
          title: "Founded in a Garage",
          description:
            "Two engineers frustrated by fragmented tooling decided to build the platform they always wished existed. First commit pushed on a Saturday afternoon.",
          badge: "2019",
        },
        {
          title: "Seed Round & Public Beta",
          description:
            "Raised €1.2M from Balderton Capital and opened the beta to 500 design-partner companies. Shipped weekly based on direct user feedback.",
          badge: "2020",
        },
        {
          title: "Series A & 10,000 Teams",
          description:
            "Closed a €12M Series A, expanded to a 40-person team, and crossed the milestone of 10,000 paying teams in 32 countries.",
          badge: "2022",
        },
        {
          title: "Enterprise Tier & Global Expansion",
          description:
            "Launched dedicated enterprise features, data residency in the EU and US, and opened offices in Berlin and San Francisco.",
          badge: "2024",
        },
      ],
    },

    "feature-with-screenshots": {
      headline: "See Every Detail",
      subheadline:
        "Screenshots speak louder than bullet points. Here's what your team will actually use every day.",
      items: [
        {
          title: "Kanban & List Views in One Click",
          description:
            "Switch between Kanban, list, timeline, and calendar views instantly. Every view pulls from the same underlying data so filters, assignees, and priorities stay in sync.",
          imageSrc: IMG,
          imageAlt: "Kanban board and list view toggle",
          stat: "4 views",
          badge: "Core",
        },
        {
          title: "Real-Time Activity Feed",
          description:
            "Every change, comment, and status update is logged in a chronological feed. Filter by user, date, or project to zero in on exactly what happened and when.",
          imageSrc: IMG,
          imageAlt: "Real-time activity feed panel",
          stat: "Full history",
          badge: "Transparency",
        },
        {
          title: "Customisable Dashboard",
          description:
            "Drag and drop widgets — charts, task lists, countdowns, and embeds — to build the perfect home screen for your role and daily workflow.",
          imageSrc: IMG,
          imageAlt: "Customisable personal dashboard",
          stat: "20+ widgets",
          badge: "Personalised",
        },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // FOOTERS
  // -------------------------------------------------------------------------
  footers: {
    "footer-dark-modern": {
      companyName: "Craftlabs",
      tagline:
        "Building tools that help creative teams do their best work — faster and with less friction.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
            { label: "Roadmap", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Imprint", href: "#" },
          ],
        },
      ],
      bottomLinks: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
      ],
    },

    "footer-gradient-cta": {
      ctaHeadline: "Ready to ship faster?",
      ctaDescription:
        "Join over 12,000 teams who use Craftlabs to plan, build, and deliver great products together.",
      ctaButtonText: "Start for Free",
      ctaHref: "#",
      companyName: "Craftlabs",
      linkGroups: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Integrations", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Imprint", href: "#" },
          ],
        },
      ],
    },

    "footer-mega-columns": {
      companyName: "Craftlabs",
      description:
        "The all-in-one platform for product, engineering, and design teams to collaborate and ship faster.",
      columns: [
        {
          title: "Product",
          links: [
            { label: "Overview", href: "#" },
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
            { label: "Roadmap", href: "#" },
          ],
        },
        {
          title: "Solutions",
          links: [
            { label: "For Startups", href: "#" },
            { label: "For Enterprise", href: "#" },
            { label: "For Agencies", href: "#" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Documentation", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Status", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "#" },
          ],
        },
      ],
      bottomLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Imprint", href: "#" },
      ],
    },

    "footer-minimal-centered": {
      companyName: "Craftlabs",
      links: [
        { label: "Home", href: "#" },
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Imprint", href: "#" },
      ],
    },

    "footer-simple-links": {
      companyName: "Craftlabs",
      links: [
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Services", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Imprint", href: "#" },
      ],
    },

    "footer-split-cta": {
      ctaHeadline: "Start your free 14-day trial",
      ctaDescription:
        "No credit card required. Set up in minutes and invite your whole team on day one.",
      ctaButtonText: "Get Started Free",
      ctaButtonHref: "#",
      companyName: "Craftlabs",
      columns: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Integrations", href: "#" },
            { label: "Changelog", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help Center", href: "#" },
            { label: "Status", href: "#" },
            { label: "Contact", href: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Imprint", href: "#" },
          ],
        },
      ],
      bottomLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Imprint", href: "#" },
      ],
    },

    "footer-with-map": {
      companyName: "Craftlabs GmbH",
      contact: {
        address: "Rosenthaler Str. 40, 10178 Berlin, Germany",
        phone: "+49 30 12345678",
        email: "hello@craftlabs.io",
      },
      links: [
        { label: "Home", href: "#" },
        { label: "Services", href: "#" },
        { label: "Portfolio", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Imprint", href: "#" },
      ],
      mapPlaceholderText: "Interactive map — Berlin office",
    },

    "footer-with-newsletter": {
      companyName: "Craftlabs",
      newsletterHeadline: "Stay in the loop",
      newsletterDescription:
        "Get weekly tips on product development, design systems, and team collaboration delivered straight to your inbox.",
      newsletterPlaceholder: "your@email.com",
      newsletterButtonText: "Subscribe",
      columns: [
        {
          title: "Product",
          links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Help Center", href: "#" },
            { label: "Status", href: "#" },
            { label: "Contact", href: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Imprint", href: "#" },
          ],
        },
      ],
    },

    "footer-with-social": {
      companyName: "Craftlabs",
      description:
        "The collaboration platform that helps product teams plan better, build faster, and ship with confidence.",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Imprint", href: "#" },
      ],
      socialLinks: [
        {
          label: "Twitter / X",
          href: "#",
          icon: null,
        },
        {
          label: "LinkedIn",
          href: "#",
          icon: null,
        },
        {
          label: "GitHub",
          href: "#",
          icon: null,
        },
        {
          label: "YouTube",
          href: "#",
          icon: null,
        },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // FORMS
  // -------------------------------------------------------------------------
  forms: {
    "form-contact-advanced": {
      headline: "Get in Touch",
      description:
        "Tell us about your project and we'll get back to you within one business day.",
      submitLabel: "Send Message",
    },

    "form-feedback": {
      headline: "How are we doing?",
    },

    "form-login-register": {},

    "form-multi-step": {
      submitLabel: "Complete Sign-Up",
      steps: [
        {
          title: "Your Details",
          description: "Tell us a little about yourself to get started.",
          content: null,
        },
        {
          title: "Choose a Plan",
          description: "Select the plan that fits your team size and goals.",
          content: null,
        },
        {
          title: "Review & Confirm",
          description:
            "Double-check your information before we create your account.",
          content: null,
        },
      ],
    },

    "form-newsletter-preferences": {
      headline: "Email Preferences",
      preferences: [
        {
          id: "product-updates",
          label: "Product Updates",
          description:
            "New features, improvements, and major releases — typically once or twice a month.",
          defaultEnabled: true,
        },
        {
          id: "weekly-digest",
          label: "Weekly Digest",
          description:
            "A curated roundup of tips, community highlights, and industry news every Friday.",
          defaultEnabled: true,
        },
        {
          id: "marketing",
          label: "Promotions & Offers",
          description:
            "Exclusive deals, trial extensions, and partner discounts relevant to your plan.",
          defaultEnabled: false,
        },
        {
          id: "security-alerts",
          label: "Security Alerts",
          description:
            "Critical notifications about your account security — highly recommended to keep on.",
          defaultEnabled: true,
        },
      ],
    },

    "form-survey-section": {
      headline: "Share Your Feedback",
      description:
        "Help us improve the product by answering a few quick questions. Takes about two minutes.",
      submitLabel: "Submit Feedback",
      questions: [
        {
          id: "overall",
          type: "rating",
          question: "How would you rate your overall experience with our platform?",
        },
        {
          id: "onboarding",
          type: "choice",
          question: "How did you first hear about us?",
          options: [
            "Search engine",
            "Social media",
            "Word of mouth",
            "Conference or event",
            "Other",
          ],
        },
        {
          id: "feature-request",
          type: "text",
          question:
            "Is there a feature you'd love us to build? Describe it in your own words.",
        },
      ],
    },
  },

  // -------------------------------------------------------------------------
  // GALLERY
  // -------------------------------------------------------------------------
  gallery: {
    "gallery-before-after": {
      title: "Transformations That Speak for Themselves",
      subtitle:
        "Drag the slider to compare before and after — every project, side by side.",
      pairs: [
        {
          before: {
            src: IMG,
            alt: "Living room before renovation",
            label: "Before",
          },
          after: {
            src: IMG,
            alt: "Living room after renovation",
            label: "After",
          },
          title: "Living Room Renovation",
        },
        {
          before: {
            src: IMG,
            alt: "Brand identity before redesign",
            label: "Before",
          },
          after: {
            src: IMG,
            alt: "Brand identity after redesign",
            label: "After",
          },
          title: "Brand Identity Redesign",
        },
        {
          before: {
            src: IMG,
            alt: "Website before redesign",
            label: "Before",
          },
          after: {
            src: IMG,
            alt: "Website after redesign",
            label: "After",
          },
          title: "E-Commerce Website",
        },
      ],
    },

    "gallery-carousel": {
      title: "Behind the Scenes",
      subtitle:
        "A visual journey through our projects, team, and creative process.",
      autoPlay: true,
      autoPlayInterval: 4000,
      images: [
        {
          src: IMG,
          alt: "Product launch event at headquarters",
          title: "Product Launch",
          description:
            "The room erupted when we unveiled the new collaboration suite to our design partners.",
        },
        {
          src: IMG,
          alt: "Design sprint wall covered in sticky notes",
          title: "Design Sprint",
          description:
            "Five days, two whiteboards, and forty sticky notes later — we had our north star.",
        },
        {
          src: IMG,
          alt: "Team hiking offsite in the mountains",
          title: "Annual Offsite",
          description:
            "Building relationships outside the office is part of how we build great products inside it.",
        },
        {
          src: IMG,
          alt: "Dashboard UI on a large monitor",
          title: "New Dashboard",
          description:
            "Months of iteration distilled into a single screen that tells you everything you need to know.",
        },
      ],
    },

    "gallery-filterable": {
      title: "Our Portfolio",
      subtitle:
        "A selection of projects across branding, web, and product design.",
      allLabel: "All Work",
      columns: 3,
      items: [
        {
          src: IMG,
          alt: "E-commerce platform redesign",
          title: "E-Commerce Platform",
          category: "Web Design",
          description: "Full redesign boosting conversion rate by 34%.",
          href: "#",
        },
        {
          src: IMG,
          alt: "Tech startup brand identity",
          title: "Fintech Startup Identity",
          category: "Branding",
          description: "Logo, colour system, and brand guidelines.",
          href: "#",
        },
        {
          src: IMG,
          alt: "Fitness tracker mobile app",
          title: "Fitness Tracker App",
          category: "App Design",
          description: "iOS & Android design for 200k+ users.",
          href: "#",
        },
        {
          src: IMG,
          alt: "SaaS analytics dashboard",
          title: "Analytics Dashboard",
          category: "Web Design",
          description: "Data visualisation for a Series B SaaS company.",
          href: "#",
        },
        {
          src: IMG,
          alt: "Restaurant brand overhaul",
          title: "Restaurant Rebrand",
          category: "Branding",
          description: "Complete visual identity for a Berlin bistro chain.",
          href: "#",
        },
        {
          src: IMG,
          alt: "Annual report editorial design",
          title: "Annual Report 2024",
          category: "Print",
          description: "60-page editorial with infographics and photography.",
          href: "#",
        },
        {
          src: IMG,
          alt: "Community platform app design",
          title: "Community Platform",
          category: "App Design",
          description: "Social product for a creator economy startup.",
          href: "#",
        },
        {
          src: IMG,
          alt: "Product packaging design",
          title: "Packaging Design",
          category: "Print",
          description: "Sustainable packaging for a DTC skincare brand.",
          href: "#",
        },
        {
          src: IMG,
          alt: "Minimal portfolio website",
          title: "Portfolio Site",
          category: "Web Design",
          description: "Personal portfolio for an award-winning photographer.",
          href: "#",
        },
      ],
    },

    "gallery-fullscreen-viewer": {
      columns: 3,
      images: [
        { src: IMG, alt: "Architecture photograph — concrete facade" },
        { src: IMG, alt: "Portrait — natural light studio shoot" },
        { src: IMG, alt: "Landscape — misty mountain valley" },
        { src: IMG, alt: "Product — minimal skincare packaging" },
        { src: IMG, alt: "Street — neon reflections in rain" },
        { src: IMG, alt: "Interior — Scandinavian living space" },
        { src: IMG, alt: "Abstract — ink drop in water" },
        { src: IMG, alt: "Food — artisan sourdough loaf" },
        { src: IMG, alt: "Travel — cobblestone alley in Lisbon" },
      ],
    },

    "gallery-lightbox-grid": {
      title: "Photography Collection",
      subtitle:
        "Click any image to open the full-screen lightbox and browse the series.",
      columns: 3,
      images: [
        { src: IMG, alt: "Sunrise over the Dolomites", caption: "Dolomites, Italy" },
        { src: IMG, alt: "Urban skyline at dusk", caption: "Berlin, Germany" },
        { src: IMG, alt: "Close-up of tropical flora", caption: "Botanical Garden, Singapore" },
        { src: IMG, alt: "Abandoned industrial warehouse", caption: "Detroit, USA" },
        { src: IMG, alt: "Fisherman on a wooden pier", caption: "Koh Lanta, Thailand" },
        { src: IMG, alt: "Snow-covered pine forest", caption: "Lapland, Finland" },
        { src: IMG, alt: "Colourful market stalls", caption: "Marrakech, Morocco" },
        { src: IMG, alt: "Geometric tile pattern", caption: "Lisbon, Portugal" },
      ],
    },

    "gallery-masonry": {
      columns: 3,
      gap: 4,
      images: [
        { src: IMG, alt: "Portrait in golden hour light", width: 800, height: 1100, category: "Portrait" },
        { src: IMG, alt: "Coastal cliffs at low tide", width: 1200, height: 800, category: "Landscape" },
        { src: IMG, alt: "Flat lay of design tools", width: 900, height: 900, category: "Product" },
        { src: IMG, alt: "Aerial view of city grid", width: 1200, height: 675, category: "Architecture" },
        { src: IMG, alt: "Macro shot of coffee foam", width: 800, height: 1000, category: "Food" },
        { src: IMG, alt: "Ballet dancer mid-leap", width: 800, height: 1200, category: "Portrait" },
        { src: IMG, alt: "Desert dunes at sunset", width: 1200, height: 800, category: "Landscape" },
        { src: IMG, alt: "Ceramic mugs on a shelf", width: 900, height: 1100, category: "Product" },
      ],
    },
    "gallery-sticky-scroll": {
      heroHeading: ["Create Gallery In a Better Way", "Using CSS sticky properties"],
      footerText: "gallery",
    },
  },
};
