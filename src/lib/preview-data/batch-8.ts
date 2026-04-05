const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────────────────────────────────────────
  stats: {
    "stats-cards-grid": {
      heading: "Platform at a Glance",
      columns: 3,
      variant: "elevated",
      stats: [
        {
          value: "$2.4M",
          label: "Monthly Revenue",
          description: "Recurring revenue across all plans",
          trend: { direction: "up", value: "+18.5%" },
        },
        {
          value: "12K",
          label: "Active Users",
          description: "Logged in at least once this month",
          trend: { direction: "up", value: "+7.2%" },
        },
        {
          value: "99.9%",
          label: "Uptime",
          description: "Measured over the last 90 days",
          trend: { direction: "up", value: "+0.1%" },
        },
        {
          value: "4.8s",
          label: "Avg. Response Time",
          description: "Global median across all regions",
          trend: { direction: "down", value: "-12%" },
        },
      ],
    },

    "stats-counter-animated": {
      heading: "Numbers that speak",
      subheading: "Trusted by companies of every size",
      stats: [
        { value: 8400, suffix: "+", label: "Customers" },
        { value: 99, suffix: "%", label: "Satisfaction Rate" },
        { value: 3, prefix: "$", suffix: "M", label: "Revenue Processed" },
        { value: 140, suffix: " ms", label: "Avg. API Latency" },
      ],
    },

    "stats-inline-bar": {
      heading: "Performance Benchmarks",
      subheading: "How we compare against industry averages",
      stats: [
        { label: "Customer Satisfaction", value: 97, displayValue: "97%" },
        { label: "On-Time Delivery", value: 94, displayValue: "94%" },
        { label: "Revenue Growth YoY", value: 78, displayValue: "78%" },
        { label: "Employee Retention", value: 92, displayValue: "92%" },
      ],
    },

    "stats-large-numbers": {
      heading: "Results that matter",
      subheading: "Since launch we have helped teams ship faster, retain more customers, and grow sustainably.",
      variant: "alternating",
      stats: [
        {
          value: "$42M",
          label: "Revenue Generated",
          description:
            "Across all customer accounts in fiscal year 2025",
        },
        {
          value: "180K",
          label: "Hours Saved",
          description:
            "Estimated manual work eliminated through automation",
        },
        {
          value: "99.95%",
          label: "Uptime SLA",
          description:
            "Guaranteed and consistently delivered over 24 months",
        },
      ],
    },

    "stats-radial-progress": {
      stats: [
        { label: "Customer Retention", value: 94, max: 100, suffix: "%" },
        { label: "NPS Score", value: 72, max: 100, suffix: "" },
        { label: "Bug Resolution", value: 88, max: 100, suffix: "%" },
        { label: "Deployment Success", value: 99, max: 100, suffix: "%" },
      ],
    },

    "stats-with-icons": {
      heading: "Why teams choose us",
      subheading: "Built for scale, designed for simplicity",
      columns: 4,
      variant: "card",
      stats: [
        {
          value: "12K+",
          label: "Active Users",
          description: "Across 60+ countries",
        },
        {
          value: "$2.4M",
          label: "Monthly Revenue",
          description: "Managed on our platform",
        },
        {
          value: "99.9%",
          label: "Uptime",
          description: "Guaranteed in our SLA",
        },
        {
          value: "4.8 / 5",
          label: "Customer Rating",
          description: "Average across all reviews",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TABLES
  // ─────────────────────────────────────────────────────────────────────────────
  tables: {
    "table-comparison-matrix": {
      headline: "Compare Plans",
      products: [
        { name: "Starter" },
        { name: "Pro", recommended: true },
        { name: "Enterprise" },
      ],
      features: [
        { name: "Custom Domain", values: ["yes", "yes", "yes"] },
        { name: "Analytics Dashboard", values: ["partial", "yes", "yes"] },
        { name: "Team Members", values: ["no", "yes", "yes"] },
        { name: "Priority Support", values: ["no", "partial", "yes"] },
        { name: "API Access", values: ["no", "yes", "yes"] },
        { name: "SSO / SAML", values: ["no", "no", "yes"] },
      ],
    },

    "table-data-display": {
      headline: "Recent Transactions",
      columns: [
        { key: "id", label: "ID", align: "left" },
        { key: "customer", label: "Customer", align: "left" },
        { key: "amount", label: "Amount", align: "right" },
        { key: "status", label: "Status", align: "center" },
        { key: "date", label: "Date", align: "left" },
      ],
      rows: [
        { id: "#10042", customer: "Acme Corp", amount: "$1,200.00", status: "Paid", date: "2026-04-01" },
        { id: "#10041", customer: "Globex Inc", amount: "$840.50", status: "Pending", date: "2026-03-31" },
        { id: "#10040", customer: "Initech LLC", amount: "$3,750.00", status: "Paid", date: "2026-03-30" },
        { id: "#10039", customer: "Umbrella Co", amount: "$290.00", status: "Refunded", date: "2026-03-29" },
      ],
    },

    "table-expandable-rows": {
      headers: ["Order", "Customer", "Total", "Status"],
      rows: [
        {
          cells: ["#10042", "Acme Corp", "$1,200.00", "Paid"],
          detail:
            "2× Pro Plan ($600 each) — billing cycle: annual. Invoice sent on 2026-04-01. Payment confirmed via Stripe.",
        },
        {
          cells: ["#10041", "Globex Inc", "$840.50", "Pending"],
          detail:
            "1× Enterprise add-on ($840.50) — awaiting bank transfer. Expected clearance within 3 business days.",
        },
        {
          cells: ["#10040", "Initech LLC", "$3,750.00", "Paid"],
          detail:
            "5× Team seats ($750 each) — quarterly billing. Auto-renewal enabled. Next charge on 2026-07-01.",
        },
        {
          cells: ["#10039", "Umbrella Co", "$290.00", "Refunded"],
          detail:
            "Starter Plan — refund requested on 2026-03-29 within the 14-day trial period. Processed in 2 business days.",
        },
      ],
    },

    "table-responsive-cards": {
      headers: ["Name", "Role", "Department", "Location"],
      rows: [
        ["Emma Johnson", "Product Manager", "Product", "Berlin"],
        ["Luca Rossi", "Senior Engineer", "Engineering", "Milan"],
        ["Aiko Tanaka", "UX Designer", "Design", "Tokyo"],
        ["Carlos Mendes", "Data Analyst", "Analytics", "São Paulo"],
      ],
    },

    "table-sortable": {
      columns: [
        { key: "name", label: "Product", sortable: true },
        { key: "revenue", label: "Revenue", sortable: true },
        { key: "users", label: "Users", sortable: true },
        { key: "status", label: "Status", sortable: false },
      ],
      rows: [
        { name: "Starter Plan", revenue: 48000, users: 320, status: "Active" },
        { name: "Pro Plan", revenue: 112000, users: 880, status: "Active" },
        { name: "Enterprise Plan", revenue: 240000, users: 150, status: "Active" },
        { name: "Legacy Plan", revenue: 9600, users: 64, status: "Deprecated" },
      ],
    },

    "table-striped": {
      headers: ["Month", "Visitors", "Signups", "Conversion"],
      rows: [
        ["January", "18,400", "1,120", "6.1%"],
        ["February", "21,300", "1,490", "7.0%"],
        ["March", "24,800", "1,860", "7.5%"],
        ["April", "22,100", "1,720", "7.8%"],
      ],
    },

    "table-spotlight-search": {
      columns: [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "status", label: "Status" },
      ],
      rows: [
        { id: 1, name: "Astra", role: "Engineer", status: "Active" },
        { id: 2, name: "Bravo", role: "Design", status: "Active" },
        { id: 3, name: "Charlie", role: "Marketing", status: "Offline" },
        { id: 4, name: "Delta", role: "Sales", status: "Active" },
        { id: 5, name: "Echo", role: "Engineering", status: "Active" },
        { id: 6, name: "Foxtrot", role: "Design", status: "Away" },
      ],
      placeholder: "Search name or role\u2026",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TABS
  // ─────────────────────────────────────────────────────────────────────────────
  tabs: {
    "tabs-full-width": {
      tabs: [
        {
          id: "overview",
          label: "Overview",
          content: "Get a high-level summary of your account activity, recent transactions, and key metrics at a glance.",
        },
        {
          id: "analytics",
          label: "Analytics",
          content: "Drill into traffic sources, conversion funnels, and retention cohorts with interactive charts.",
        },
        {
          id: "settings",
          label: "Settings",
          content: "Manage your workspace preferences, notification rules, and connected integrations.",
        },
      ],
    },

    "tabs-icon-labels": {
      tabs: [
        {
          id: "dashboard",
          label: "Dashboard",
          content: "Your personalized dashboard with real-time KPIs and alerts.",
        },
        {
          id: "reports",
          label: "Reports",
          content: "Download and schedule detailed reports across all your data sources.",
        },
        {
          id: "team",
          label: "Team",
          content: "Manage members, roles, and permissions for your workspace.",
        },
      ],
    },

    "tabs-pill-cards": {
      headline: "Everything your team needs",
      tabs: [
        {
          label: "For Developers",
          cards: [
            {
              title: "REST & GraphQL API",
              description:
                "Fully documented endpoints with SDKs for Node, Python, and Go.",
            },
            {
              title: "Webhooks",
              description:
                "Push real-time events to any URL with retry logic and logs.",
            },
            {
              title: "CLI Tooling",
              description:
                "Deploy, rollback, and manage resources directly from your terminal.",
            },
          ],
        },
        {
          label: "For Designers",
          cards: [
            {
              title: "Design Tokens",
              description:
                "Export your design system tokens as CSS, JSON, or Tailwind config.",
            },
            {
              title: "Figma Plugin",
              description:
                "Sync components bidirectionally between Figma and your codebase.",
            },
            {
              title: "Asset Management",
              description:
                "Upload, tag, and serve optimised images and icons at global CDN speed.",
            },
          ],
        },
        {
          label: "For Managers",
          cards: [
            {
              title: "Usage Dashboard",
              description:
                "Track seat consumption, API calls, and storage across all projects.",
            },
            {
              title: "Audit Logs",
              description:
                "Full tamper-proof history of every action taken in your workspace.",
            },
            {
              title: "Budget Alerts",
              description:
                "Set spending thresholds and receive email or Slack notifications.",
            },
          ],
        },
      ],
    },

    "tabs-segmented": {
      tabs: [
        {
          id: "monthly",
          label: "Monthly",
          content: "View your metrics aggregated by calendar month.",
        },
        {
          id: "quarterly",
          label: "Quarterly",
          content: "Track trends across Q1–Q4 with quarter-over-quarter comparisons.",
        },
        {
          id: "annual",
          label: "Annual",
          content: "Review full-year performance and export an annual summary report.",
        },
      ],
    },

    "tabs-underline-animated": {
      tabs: [
        {
          label: "Features",
          content:
            "Explore the full feature set built to help your team move faster and smarter.",
        },
        {
          label: "Pricing",
          content:
            "Simple, transparent pricing — start free and scale as you grow.",
        },
        {
          label: "Changelog",
          content:
            "See what we shipped this month: new integrations, performance fixes, and more.",
        },
        {
          label: "Roadmap",
          content:
            "Vote on upcoming features and track what we're building next.",
        },
      ],
    },

    "tabs-vertical-split": {
      tabs: [
        {
          label: "Onboarding",
          content:
            "A guided setup wizard walks your team through configuration in under 10 minutes.",
        },
        {
          label: "Integrations",
          content:
            "Connect to Slack, Jira, GitHub, and 50+ other tools with one click.",
        },
        {
          label: "Security",
          content:
            "SOC 2 Type II certified. All data encrypted in transit and at rest.",
        },
        {
          label: "Support",
          content:
            "24/7 live chat and dedicated customer success managers on Pro and Enterprise plans.",
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TEAM
  // ─────────────────────────────────────────────────────────────────────────────
  team: {
    "about-story-timeline": {
      heading: "Our Story",
      subheading: "From a side project to a global platform",
      variant: "alternating",
      events: [
        {
          year: "2019",
          title: "The Spark",
          description:
            "Two engineers, frustrated by clunky analytics tools, built a prototype over a weekend in Berlin.",
          highlight: false,
          imageSrc: IMG,
        },
        {
          year: "2020",
          title: "First Paying Customer",
          description:
            "An e-commerce startup paid us $99/month. We celebrated with cheap pizza and a lot of coffee.",
          highlight: true,
          imageSrc: IMG,
        },
        {
          year: "2022",
          title: "Series A — $8M",
          description:
            "We raised $8 million to hire our first dedicated design and data-engineering teams.",
          highlight: true,
          imageSrc: IMG,
        },
        {
          year: "2025",
          title: "10K Customers",
          description:
            "We crossed 10,000 paying customers across 60 countries and launched our open API.",
          highlight: false,
          imageSrc: IMG,
        },
      ],
    },

    "team-carousel": {
      heading: "The People Behind the Product",
      subheading: "A diverse team of builders, designers, and problem-solvers",
      members: [
        {
          name: "Maya Patel",
          role: "CEO & Co-Founder",
          imageSrc: AVATAR,
          bio: "Former VP Engineering at Stripe. Leads product strategy and company vision.",
        },
        {
          name: "Jonas Berg",
          role: "CTO & Co-Founder",
          imageSrc: AVATAR,
          bio: "Systems architect who obsesses over latency and reliability.",
        },
        {
          name: "Amara Osei",
          role: "Head of Design",
          imageSrc: AVATAR,
          bio: "Designs systems that feel effortless. Previously at Figma.",
        },
        {
          name: "Sofia Reyes",
          role: "Head of Engineering",
          imageSrc: AVATAR,
          bio: "Full-stack generalist, performance evangelist, open-source contributor.",
        },
      ],
    },

    "team-compact-list": {
      headline: "Our Team",
      members: [
        { name: "Maya Patel", role: "CEO & Co-Founder", avatarSrc: AVATAR },
        { name: "Jonas Berg", role: "CTO & Co-Founder", avatarSrc: AVATAR },
        { name: "Amara Osei", role: "Head of Design", avatarSrc: AVATAR },
        { name: "Rafael Mora", role: "Lead Engineer", avatarSrc: AVATAR },
      ],
    },

    "team-grid-cards": {
      heading: "Meet the Team",
      subheading: "Distributed across 4 continents, united by a shared mission",
      columns: 3,
      variant: "bordered",
      members: [
        {
          name: "Maya Patel",
          role: "CEO & Co-Founder",
          imageSrc: AVATAR,
          bio: "Leads company vision and product strategy with 12 years in SaaS.",
          socials: [
            { platform: "linkedin", url: "#" },
            { platform: "twitter", url: "#" },
          ],
        },
        {
          name: "Jonas Berg",
          role: "CTO & Co-Founder",
          imageSrc: AVATAR,
          bio: "Infrastructure and distributed systems expert. Built platforms at scale.",
          socials: [
            { platform: "github", url: "#" },
            { platform: "linkedin", url: "#" },
          ],
        },
        {
          name: "Amara Osei",
          role: "Head of Design",
          imageSrc: AVATAR,
          bio: "Crafts user experiences that reduce friction and drive retention.",
          socials: [
            { platform: "twitter", url: "#" },
            { platform: "website", url: "#" },
          ],
        },
      ],
    },

    "team-minimal-list": {
      heading: "Our Team",
      subheading: "Distributed across Berlin, London, and Singapore",
      showDepartment: true,
      showLocation: true,
      members: [
        {
          name: "Maya Patel",
          role: "CEO & Co-Founder",
          avatarSrc: AVATAR,
          department: "Leadership",
          location: "Berlin",
        },
        {
          name: "Jonas Berg",
          role: "CTO & Co-Founder",
          avatarSrc: AVATAR,
          department: "Leadership",
          location: "Berlin",
        },
        {
          name: "Amara Osei",
          role: "Head of Design",
          avatarSrc: AVATAR,
          department: "Design",
          location: "London",
        },
        {
          name: "Kenji Nakamura",
          role: "Senior Backend Engineer",
          avatarSrc: AVATAR,
          department: "Engineering",
          location: "Singapore",
        },
      ],
    },

    "team-with-bio": {
      heading: "Leadership Team",
      subheading: "The people who set direction and culture",
      members: [
        {
          name: "Maya Patel",
          role: "CEO & Co-Founder",
          imageSrc: AVATAR,
          shortBio: "Visionary operator with deep product and growth expertise.",
          fullBio:
            "Maya spent 8 years at Stripe leading product for their developer platform before co-founding this company in 2019. She holds an MBA from INSEAD and is a regular speaker at SaaStr and Web Summit. Under her leadership the company has grown from 0 to $2.4M MRR.",
          socials: [
            { platform: "linkedin", url: "#" },
            { platform: "twitter", url: "#" },
          ],
        },
        {
          name: "Jonas Berg",
          role: "CTO & Co-Founder",
          imageSrc: AVATAR,
          shortBio: "Systems thinker who loves hard infrastructure problems.",
          fullBio:
            "Jonas previously built the observability platform at Zalando and led distributed systems at SoundCloud. He is a core contributor to several open-source projects and holds a BSc in Computer Science from KTH Stockholm. He co-authored our reliability runbooks that achieve 99.95% uptime.",
          socials: [
            { platform: "github", url: "#" },
            { platform: "linkedin", url: "#" },
          ],
        },
        {
          name: "Amara Osei",
          role: "Head of Design",
          imageSrc: AVATAR,
          shortBio: "Designs systems that feel effortless to use at any scale.",
          fullBio:
            "Amara joined from Figma where she led the design-systems team. She is passionate about accessibility and has given talks at Config and An Event Apart. She holds an MA in Interaction Design from the RCA London. Every pixel of our product reflects her belief that good design is invisible.",
          socials: [
            { platform: "twitter", url: "#" },
            { platform: "website", url: "#" },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TESTIMONIALS  (11 components — every file has an entry)
  // ─────────────────────────────────────────────────────────────────────────────
  testimonials: {
    "testimonial-avatar-stack": {
      headline: "Loved by 8,400+ teams worldwide",
      avatars: [
        { src: AVATAR, alt: "Maya Patel" },
        { src: AVATAR, alt: "Jonas Berg" },
        { src: AVATAR, alt: "Amara Osei" },
        { src: AVATAR, alt: "Sofia Reyes" },
      ],
      rating: 5,
      totalReviews: 2480,
      quote: "The best analytics tool we have ever used. Saves us hours every week.",
    },

    "testimonial-carousel": {
      headline: "What our customers say",
      subheadline: "Real results from real teams",
      testimonials: [
        {
          id: "t1",
          quote:
            "We cut our reporting time by 60% in the first month. The dashboard is exactly what we needed.",
          name: "Sarah Lin",
          role: "Head of Operations",
          company: "Horizon Labs",
          avatarSrc: AVATAR,
        },
        {
          id: "t2",
          quote:
            "Switching from our old tool was painless. The onboarding team held our hand every step of the way.",
          name: "David Okafor",
          role: "CTO",
          company: "Skybound SaaS",
          avatarSrc: AVATAR,
        },
        {
          id: "t3",
          quote:
            "Our NPS jumped 18 points after we started acting on the insights this platform surfaces.",
          name: "Priya Sharma",
          role: "VP Customer Success",
          company: "Nexora",
          avatarSrc: AVATAR,
        },
        {
          id: "t4",
          quote:
            "I recommended it to three other CEOs in my network within two weeks of using it. That says everything.",
          name: "Tom Richter",
          role: "CEO",
          company: "Stackform",
          avatarSrc: AVATAR,
        },
      ],
    },

    "testimonial-featured-quote": {
      quote:
        "This platform completely changed how we understand our customers. The depth of insight we get now was simply not possible before — and it took us less than a day to set up.",
      authorName: "Sarah Lin",
      authorRole: "Head of Operations, Horizon Labs",
      authorAvatarSrc: AVATAR,
      companyLogoSrc: IMG,
      companyLogoAlt: "Horizon Labs",
    },

    "testimonial-grid": {
      headline: "Trusted by fast-growing teams",
      subheadline: "Here is what they have to say",
      columns: 3,
      testimonials: [
        {
          quote:
            "The automation alone saved us 12 hours of manual work per week. Absolute game changer for a lean team.",
          name: "Sarah Lin",
          role: "Head of Operations",
          company: "Horizon Labs",
          avatarSrc: AVATAR,
          featured: true,
        },
        {
          quote:
            "Setup took 15 minutes. We had our first useful insight within the hour. Incredibly well designed.",
          name: "David Okafor",
          role: "CTO",
          company: "Skybound SaaS",
          avatarSrc: AVATAR,
        },
        {
          quote:
            "Support is phenomenal. They replied at 2am on a Sunday and had my issue fixed before I woke up.",
          name: "Priya Sharma",
          role: "VP Customer Success",
          company: "Nexora",
          avatarSrc: AVATAR,
        },
        {
          quote:
            "We replaced three separate tools with this one. Our stack is leaner and our team is happier.",
          name: "Tom Richter",
          role: "CEO",
          company: "Stackform",
          avatarSrc: AVATAR,
        },
      ],
    },

    "testimonial-marquee": {
      headline: "Thousands of happy teams",
      subheadline: "Join them today",
      direction: "left",
      durationSeconds: 30,
      testimonials: [
        {
          quote: "Saved us hours every week. Our team loves it.",
          name: "Sarah Lin",
          role: "Head of Ops",
          company: "Horizon Labs",
          avatarSrc: AVATAR,
        },
        {
          quote: "Best analytics tool we have ever shipped.",
          name: "David Okafor",
          role: "CTO",
          company: "Skybound SaaS",
          avatarSrc: AVATAR,
        },
        {
          quote: "Our NPS jumped 18 points in two months. Incredible.",
          name: "Priya Sharma",
          role: "VP Customer Success",
          company: "Nexora",
          avatarSrc: AVATAR,
        },
        {
          quote: "I tell everyone I know to switch. No hesitation.",
          name: "Tom Richter",
          role: "CEO",
          company: "Stackform",
          avatarSrc: AVATAR,
        },
      ],
    },

    "testimonial-minimal": {
      headline: "What customers say",
      layout: "stacked",
      testimonials: [
        {
          quote:
            "Elegant, fast, and genuinely useful. We have never looked back.",
          name: "Sarah Lin",
          role: "Head of Operations, Horizon Labs",
        },
        {
          quote:
            "The kind of product you wish existed years ago.",
          name: "David Okafor",
          role: "CTO, Skybound SaaS",
        },
        {
          quote:
            "Simple enough for our non-technical team, powerful enough for our engineers.",
          name: "Priya Sharma",
          role: "VP Customer Success, Nexora",
        },
      ],
    },

    "testimonial-single-large": {
      quote:
        "We evaluated six platforms before choosing this one. The depth of data, the speed of the UI, and the quality of support are all in a different league. Six months in, we are still finding features that delight us.",
      name: "Sarah Lin",
      role: "Head of Operations",
      company: "Horizon Labs",
      avatarSrc: AVATAR,
      imageSrc: IMG,
      imageAlt: "Sarah Lin at work",
    },

    "testimonial-social-style": {
      headline: "Loved across the internet",
      subheadline: "Real reviews from real users",
      columns: 3,
      testimonials: [
        {
          text: "Just switched our whole team to this. The time savings are unreal. Highly recommend.",
          authorName: "Sarah Lin",
          authorHandle: "@sarahlin_ops",
          authorAvatarSrc: AVATAR,
          rating: 5,
          date: "Mar 28, 2026",
        },
        {
          text: "Been using it for 3 months. The analytics are 10× better than what we had before.",
          authorName: "David Okafor",
          authorHandle: "@dokafor_cto",
          authorAvatarSrc: AVATAR,
          rating: 5,
          date: "Apr 1, 2026",
        },
        {
          text: "Customer support responded within minutes. Fixed my issue on the spot. Rarely see this level of care.",
          authorName: "Priya Sharma",
          authorHandle: "@priya_cx",
          authorAvatarSrc: AVATAR,
          rating: 5,
          date: "Apr 3, 2026",
        },
      ],
    },

    "testimonial-video-cards": {
      headline: "See what customers experience",
      subheadline: "Watch short video testimonials from real users",
      testimonials: [
        {
          name: "Sarah Lin",
          role: "Head of Operations",
          company: "Horizon Labs",
          quote: "We cut our reporting time by 60% in the first month.",
          thumbnailSrc: IMG,
          videoUrl: "",
        },
        {
          name: "David Okafor",
          role: "CTO",
          company: "Skybound SaaS",
          quote: "Switching was painless. The onboarding team was exceptional.",
          thumbnailSrc: IMG,
          videoUrl: "",
        },
        {
          name: "Priya Sharma",
          role: "VP Customer Success",
          company: "Nexora",
          quote: "Our NPS jumped 18 points after acting on these insights.",
          thumbnailSrc: IMG,
          videoUrl: "",
        },
      ],
    },

    "testimonial-video-wall": {
      headline: "Real stories, real results",
      subheadline: "Hear directly from the teams using our platform every day",
      testimonials: [
        {
          name: "Sarah Lin",
          role: "Head of Operations",
          company: "Horizon Labs",
          videoSrc: "",
          posterSrc: IMG,
          quote: "60% less time on weekly reports. That is hours back every single week.",
        },
        {
          name: "David Okafor",
          role: "CTO",
          company: "Skybound SaaS",
          videoSrc: "",
          posterSrc: IMG,
          quote: "We went from zero to production in under a day. Remarkable onboarding.",
        },
        {
          name: "Priya Sharma",
          role: "VP Customer Success",
          company: "Nexora",
          videoSrc: "",
          posterSrc: IMG,
          quote: "Our NPS is up 18 points. The data finally told us what customers actually needed.",
        },
      ],
    },

    "testimonials-avatar-pills": {
      testimonials: [
        {
          quote:
            "The attention to detail and performance optimizations exceeded our expectations. We saw a 40% increase in conversions.",
          author: "Sarah Lin",
          role: "Head of Operations, Horizon Labs",
          avatar: AVATAR,
        },
        {
          quote:
            "Working with this team felt like an extension of our own. Communication was seamless from day one.",
          author: "David Okafor",
          role: "CTO, Skybound SaaS",
          avatar: AVATAR,
        },
        {
          quote:
            "They delivered ahead of schedule without cutting corners. Rare to find that combination.",
          author: "Priya Sharma",
          role: "VP Customer Success, Nexora",
          avatar: AVATAR,
        },
        {
          quote:
            "Our users love the new experience. Support tickets dropped by 60% after launch.",
          author: "Tom Richter",
          role: "CEO, Stackform",
          avatar: AVATAR,
        },
      ],
    },

    "testimonial-with-stars": {
      headline: "What our customers say",
      subheadline: "Rated 4.9 / 5 across 2,480 verified reviews",
      averageRating: 4.9,
      totalReviews: 2480,
      testimonials: [
        {
          quote:
            "Hands down the most intuitive analytics tool I have used in 10 years of running ops teams.",
          name: "Sarah Lin",
          role: "Head of Operations",
          company: "Horizon Labs",
          avatarSrc: AVATAR,
          rating: 5,
        },
        {
          quote:
            "The API is clean, the docs are clear, and the support team actually knows the product.",
          name: "David Okafor",
          role: "CTO",
          company: "Skybound SaaS",
          avatarSrc: AVATAR,
          rating: 5,
        },
        {
          quote:
            "We replaced a patchwork of three tools with this one. Our stack is simpler and our team is happier.",
          name: "Priya Sharma",
          role: "VP Customer Success",
          company: "Nexora",
          avatarSrc: AVATAR,
          rating: 5,
        },
        {
          quote:
            "Good product. Would love more export options, but the core analytics are excellent.",
          name: "Tom Richter",
          role: "CEO",
          company: "Stackform",
          avatarSrc: AVATAR,
          rating: 4,
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // VIDEO
  // ─────────────────────────────────────────────────────────────────────────────
  video: {
    "video-background-section": {
      videoSrc: "",
      headline: "Ship faster. Scale smarter.",
      description:
        "The platform trusted by 10,000+ engineering and product teams worldwide.",
    },

    "video-feature-showcase": {
      videoSrc: "",
      posterSrc: IMG,
      headline: "See it in action",
      videoPosition: "left",
      features: [
        {
          title: "Real-time Analytics",
          description:
            "Watch your metrics update the moment events happen — no refresh required.",
        },
        {
          title: "One-click Integrations",
          description:
            "Connect Slack, Jira, and GitHub in seconds with pre-built OAuth connectors.",
        },
        {
          title: "Smart Alerts",
          description:
            "Set threshold-based alerts and get notified via email, SMS, or Slack.",
        },
      ],
    },

    "video-gallery-grid": {
      headline: "Learn from our video library",
      videos: [
        {
          title: "Getting Started in 5 Minutes",
          thumbnailSrc: IMG,
          duration: "5:12",
          href: "#",
        },
        {
          title: "Setting Up Your First Dashboard",
          thumbnailSrc: IMG,
          duration: "8:44",
          href: "#",
        },
        {
          title: "Advanced Segmentation",
          thumbnailSrc: IMG,
          duration: "12:30",
          href: "#",
        },
        {
          title: "Integrating with Your CRM",
          thumbnailSrc: IMG,
          duration: "7:05",
          href: "#",
        },
      ],
    },

    "video-hero-section": {
      videoSrc: "",
      posterSrc: IMG,
      headline: "Analytics that move at the speed of your business",
      subheadline:
        "Real-time insights for teams who cannot afford to wait until Monday morning.",
      ctaText: "Start for free",
      ctaHref: "#",
      overlayOpacity: 0.45,
    },

    "video-inline-player": {
      src: "",
      poster: IMG,
      title: "Product overview — 3 minutes",
      aspectRatio: "16/9",
    },

    "video-testimonial-section": {
      headline: "Hear from our customers",
      columns: 3,
      testimonials: [
        {
          videoSrc: "",
          posterSrc: IMG,
          name: "Sarah Lin",
          role: "Head of Operations",
          company: "Horizon Labs",
        },
        {
          videoSrc: "",
          posterSrc: IMG,
          name: "David Okafor",
          role: "CTO",
          company: "Skybound SaaS",
        },
        {
          videoSrc: "",
          posterSrc: IMG,
          name: "Priya Sharma",
          role: "VP Customer Success",
          company: "Nexora",
        },
      ],
    },
  },
};
