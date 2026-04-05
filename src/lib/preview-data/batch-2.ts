const IMG =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23e2e8f0%22%2F%3E%3C%2Fsvg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23cbd5e1%22%2F%3E%3C%2Fsvg%3E";

export const data: Record<string, Record<string, Record<string, unknown>>> = {
  cards: {
    "cards-bento-grid": {
      headline: "Everything You Need to Succeed",
      cards: [
        {
          title: "AI-Powered Analytics",
          description:
            "Get deep insights into your performance with real-time dashboards and predictive models.",
          image: IMG,
          span: 2,
        },
        {
          title: "Global Infrastructure",
          description:
            "Deploy to 30+ regions worldwide with automatic failover and 99.99% uptime.",
        },
        {
          title: "Team Collaboration",
          description:
            "Work together seamlessly with shared workspaces and granular permissions.",
        },
        {
          title: "Enterprise Security",
          description:
            "SOC 2 Type II certified with end-to-end encryption and SSO support.",
          span: 2,
        },
      ],
    },

    "cards-glassmorphism": {
      headline: "Built for Modern Teams",
      columns: 3,
      cards: [
        {
          title: "99.99% Uptime",
          description:
            "Our globally distributed infrastructure ensures your services are always available.",
          metric: "99.99%",
        },
        {
          title: "Lightning Fast",
          description:
            "Average response times under 50ms thanks to edge caching and optimised runtimes.",
          metric: "<50ms",
        },
        {
          title: "Customer Satisfaction",
          description:
            "Thousands of teams trust us to power their most critical workflows every day.",
          metric: "4.9/5",
        },
      ],
    },

    "cards-hover-reveal": {
      columns: 3,
      cards: [
        {
          title: "Product Design",
          summary: "Human-centred design that drives engagement.",
          detail:
            "We combine user research, rapid prototyping, and iterative testing to create interfaces that feel natural and drive measurable outcomes.",
          image: IMG,
        },
        {
          title: "Engineering",
          summary: "Scalable software built for the long run.",
          detail:
            "Our engineers follow modern best practices — clean architecture, comprehensive testing, and continuous deployment pipelines.",
          image: IMG,
        },
        {
          title: "Data & AI",
          summary: "Turn raw data into competitive advantage.",
          detail:
            "From predictive analytics to large language model integrations, we help businesses make smarter decisions faster.",
          image: IMG,
        },
        {
          title: "Cloud & DevOps",
          summary: "Infrastructure that scales with your growth.",
          detail:
            "We design, migrate, and optimise cloud environments so your team can ship confidently at any scale.",
          image: IMG,
        },
      ],
    },

    "cards-icon-feature": {
      columns: 3,
      features: [
        {
          title: "Instant Setup",
          description:
            "Get started in minutes with our guided onboarding and pre-built integrations.",
        },
        {
          title: "Advanced Reporting",
          description:
            "Customisable dashboards give you full visibility across every dimension of your business.",
        },
        {
          title: "24/7 Support",
          description:
            "Our expert support team is available around the clock via chat, email, and phone.",
        },
        {
          title: "Flexible Permissions",
          description:
            "Define roles and access levels so every team member sees exactly what they need.",
        },
        {
          title: "API-First",
          description:
            "A comprehensive REST and GraphQL API lets you connect any tool in your stack.",
        },
        {
          title: "GDPR Compliant",
          description:
            "Data residency options and consent management keep you on the right side of regulations.",
        },
      ],
    },

    "cards-pricing-minimal": {
      headline: "Simple, Transparent Pricing",
      plans: [
        {
          name: "Starter",
          price: "0 EUR",
          period: "/month",
          features: [
            "Up to 3 projects",
            "5 GB storage",
            "Community support",
            "Basic analytics",
          ],
          ctaText: "Get started free",
          ctaHref: "#",
        },
        {
          name: "Pro",
          price: "49 EUR",
          period: "/month",
          features: [
            "Unlimited projects",
            "100 GB storage",
            "Priority support",
            "Advanced analytics",
            "Custom domains",
          ],
          ctaText: "Start free trial",
          ctaHref: "#",
          highlighted: true,
        },
        {
          name: "Enterprise",
          price: "199 EUR",
          period: "/month",
          features: [
            "Everything in Pro",
            "Unlimited storage",
            "Dedicated support",
            "SLA guarantee",
            "Custom contracts",
            "SSO & audit logs",
          ],
          ctaText: "Contact sales",
          ctaHref: "#",
        },
      ],
    },

    "cards-testimonial-compact": {
      columns: 3,
      testimonials: [
        {
          quote:
            "Switching to this platform cut our deployment time in half. The team collaboration features are exceptional.",
          name: "Sarah Chen",
          role: "CTO at NovaSoft",
          rating: 5,
        },
        {
          quote:
            "The analytics dashboard alone has saved us countless hours of manual reporting every week.",
          name: "Marcus Williams",
          role: "Head of Growth at Loopline",
          rating: 5,
        },
        {
          quote:
            "Outstanding support team. Any issue we've raised has been resolved the same day.",
          name: "Elena Rodriguez",
          role: "VP Engineering at Stackr",
          rating: 4,
        },
      ],
    },
  },

  careers: {
    "careers-application-form": {
      jobTitle: "Senior Frontend Engineer",
    },

    "careers-benefits-grid": {
      headline: "Why Work With Us",
      benefits: [
        {
          title: "Flexible Remote Work",
          description:
            "Work from anywhere in the world. We trust our team to deliver results, not sit at a desk.",
        },
        {
          title: "Competitive Salary",
          description:
            "Benchmark compensation reviewed annually, with performance bonuses and equity options.",
        },
        {
          title: "Learning Budget",
          description:
            "€2,000 per year for courses, conferences, and books — because growth never stops.",
        },
        {
          title: "Health & Wellness",
          description:
            "Full health insurance, mental health support, and a monthly wellness stipend.",
        },
        {
          title: "30 Days Paid Leave",
          description:
            "Recharge properly. We offer 30 days of holiday plus local public holidays.",
        },
        {
          title: "Modern Equipment",
          description:
            "Your choice of MacBook or ThinkPad, plus a home office setup budget of €1,000.",
        },
      ],
    },

    "careers-culture-section": {
      headline: "Life at Forge",
      description:
        "We believe the best work happens when people feel supported, challenged, and genuinely excited about what they're building.",
      imageSrc: IMG,
      imageAlt: "Team working together in a bright open office",
      perks: [
        {
          title: "Radical Transparency",
          description:
            "We share company metrics, strategy, and decisions openly with every team member.",
        },
        {
          title: "Async-First Culture",
          description:
            "Deep work is protected. Meetings have an agenda and a defined outcome — always.",
        },
        {
          title: "Continuous Learning",
          description:
            "Regular internal tech talks, external speaker sessions, and quarterly hack days.",
        },
        {
          title: "Ownership Mindset",
          description:
            "Every person owns a meaningful piece of the product and is trusted to drive it forward.",
        },
      ],
    },

    "careers-job-listing": {
      headline: "Open Positions",
      subheadline:
        "Join a team that's redefining how modern businesses operate.",
      jobs: [
        {
          title: "Senior Frontend Engineer",
          department: "Engineering",
          location: "Remote",
          type: "full-time",
          href: "#",
        },
        {
          title: "Backend Engineer (Go)",
          department: "Engineering",
          location: "Remote",
          type: "full-time",
          href: "#",
        },
        {
          title: "Product Designer",
          department: "Design",
          location: "Berlin, Germany",
          type: "full-time",
          href: "#",
        },
        {
          title: "Growth Marketing Manager",
          department: "Marketing",
          location: "Remote",
          type: "remote",
          href: "#",
        },
      ],
    },

    "careers-open-positions": {
      headline: "Join Our Team",
      positions: [
        {
          title: "Staff Software Engineer",
          department: "Platform",
          location: "Remote",
          type: "full-time",
          href: "#",
        },
        {
          title: "DevOps Engineer",
          department: "Infrastructure",
          location: "Berlin, Germany",
          type: "full-time",
          href: "#",
        },
        {
          title: "UX Researcher",
          department: "Design",
          location: "Remote",
          type: "remote",
          href: "#",
        },
        {
          title: "Customer Success Manager",
          department: "Customer Success",
          location: "London, UK",
          type: "part-time",
          href: "#",
        },
      ],
    },

    "careers-team-testimonial": {
      headline: "What Our Team Says",
      testimonials: [
        {
          quote:
            "I've never worked somewhere that genuinely invests in your development the way this company does. The learning budget and mentorship are real.",
          name: "Priya Patel",
          role: "Senior Engineer",
          avatarSrc: AVATAR,
        },
        {
          quote:
            "The async-first culture actually works. I get deep work time every day and my manager trusts me to get things done.",
          name: "James O'Brien",
          role: "Product Designer",
          avatarSrc: AVATAR,
        },
        {
          quote:
            "Moving here from a large corporation was the best decision I made. Small team, big impact — you can see your work ship and matter.",
          name: "Aiko Tanaka",
          role: "Data Engineer",
          avatarSrc: AVATAR,
        },
      ],
    },
  },

  comparison: {
    "comparison-checklist-cards": {
      headline: "Compare Our Plans",
      plans: [
        {
          name: "Starter",
          features: [
            { name: "Up to 3 projects", included: true },
            { name: "5 GB storage", included: true },
            { name: "Community support", included: true },
            { name: "Custom domains", included: false },
            { name: "Priority support", included: false },
            { name: "Advanced analytics", included: false },
          ],
        },
        {
          name: "Pro",
          highlighted: true,
          features: [
            { name: "Up to 3 projects", included: true },
            { name: "5 GB storage", included: true },
            { name: "Community support", included: true },
            { name: "Custom domains", included: true },
            { name: "Priority support", included: true },
            { name: "Advanced analytics", included: false },
          ],
        },
        {
          name: "Enterprise",
          features: [
            { name: "Up to 3 projects", included: true },
            { name: "5 GB storage", included: true },
            { name: "Community support", included: true },
            { name: "Custom domains", included: true },
            { name: "Priority support", included: true },
            { name: "Advanced analytics", included: true },
          ],
        },
      ],
    },

    "comparison-feature-table": {
      headline: "Feature Comparison",
      features: [
        { name: "Custom domain" },
        { name: "API access" },
        { name: "Team members" },
        { name: "Advanced analytics" },
        { name: "Priority support" },
        { name: "SSO & audit logs" },
      ],
      plans: [
        {
          name: "Starter",
          price: "Free",
          features: [true, false, false, false, false, false],
        },
        {
          name: "Pro",
          price: "€49/mo",
          features: [true, true, true, true, false, false],
        },
        {
          name: "Enterprise",
          price: "€199/mo",
          features: [true, true, true, true, true, true],
        },
      ],
    },

    "comparison-plan-side-by-side": {
      headline: "Choose the Right Plan",
      plans: [
        {
          name: "Pro",
          price: "€49",
          period: "per month",
          features: [
            "Unlimited projects",
            "100 GB storage",
            "Priority support",
            "Advanced analytics",
            "Custom domains",
          ],
          ctaLabel: "Start free trial",
          ctaHref: "#",
        },
        {
          name: "Enterprise",
          price: "€199",
          period: "per month",
          features: [
            "Everything in Pro",
            "Unlimited storage",
            "Dedicated account manager",
            "SLA guarantee",
            "Custom contracts",
            "SSO & audit logs",
          ],
          recommended: true,
          ctaLabel: "Contact sales",
          ctaHref: "#",
        },
      ],
    },

    "comparison-slider-before-after": {
      headline: "See the Difference",
      beforeSrc: IMG,
      afterSrc: IMG,
      beforeLabel: "Before",
      afterLabel: "After",
      beforeAlt: "Website before redesign",
      afterAlt: "Website after redesign",
      aspectRatio: "16/9",
    },

    "comparison-specs-table": {
      headline: "Product Comparison",
      products: ["Basic", "Advanced", "Pro Max"],
      specs: [
        { name: "Storage", values: ["10 GB", "100 GB", "Unlimited"] },
        { name: "Bandwidth", values: ["100 GB/mo", "1 TB/mo", "Unlimited"] },
        { name: "Deployments", values: ["5/day", "50/day", "Unlimited"] },
        { name: "Team members", values: ["1", "10", "Unlimited"] },
        { name: "Support", values: ["Email", "Priority", "Dedicated"] },
        { name: "Custom domains", values: ["1", "10", "Unlimited"] },
      ],
    },

    "comparison-toggle-cards": {
      headline: "Cloud vs. On-Premise",
      optionA: {
        title: "Cloud Hosted",
        features: [
          "Automatic updates and patches",
          "99.99% uptime SLA",
          "Scales instantly with demand",
          "No infrastructure maintenance",
          "Built-in backups and disaster recovery",
        ],
      },
      optionB: {
        title: "On-Premise",
        features: [
          "Full control over your data",
          "Customisable to your exact needs",
          "No recurring licence fees",
          "Works in air-gapped environments",
          "Integrate with internal systems directly",
        ],
      },
    },
  },

  contact: {
    "contact-faq-combined": {
      headline: "Questions & Contact",
      description:
        "Can't find the answer you're looking for? Reach out and we'll get back to you within one business day.",
      faqs: [
        {
          question: "How long does onboarding take?",
          answer:
            "Most customers are up and running within a single business day. Our onboarding team guides you through every step.",
        },
        {
          question: "Do you offer a free trial?",
          answer:
            "Yes — all plans come with a 14-day free trial, no credit card required.",
        },
        {
          question: "Can I cancel at any time?",
          answer:
            "Absolutely. You can cancel your subscription at any time from your account settings with no cancellation fees.",
        },
        {
          question: "Is my data backed up automatically?",
          answer:
            "Yes. We run automated backups every hour, with 30-day retention on all paid plans.",
        },
      ],
      contactDetails: [
        { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
        { label: "Phone", value: "+49 30 12345678", href: "tel:+4930123456789" },
        { label: "Address", value: "Unter den Linden 1, 10117 Berlin" },
      ],
    },

    "contact-floating-card": {
      title: "Let's Talk",
      subtitle:
        "Have a project in mind? We'd love to hear about it — fill in the form and we'll be in touch shortly.",
      backgroundText: "HELLO",
    },

    "contact-full-page": {
      title: "Start a Conversation",
      subtitle:
        "Whether you have a question or a big idea, we're ready to listen.",
      email: "hello@example.com",
      phone: "+49 30 12345678",
      address: "Unter den Linden 1, 10117 Berlin, Germany",
      hours: "Mon–Fri, 9:00–18:00 CET",
      socialLinks: [
        { label: "LinkedIn", href: "#" },
        { label: "Twitter", href: "#" },
        { label: "GitHub", href: "#" },
      ],
    },

    "contact-simple-centered": {
      title: "Get in Touch",
      subtitle:
        "We reply to every message within one business day. No bots, just real people.",
    },

    "contact-split-form": {
      title: "Let's Build Something Together",
      subtitle:
        "Tell us about your project and we'll get back to you with a tailored proposal.",
      contactInfo: [
        { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
        { label: "Phone", value: "+49 30 12345678", href: "tel:+4930123456789" },
        { label: "Address", value: "Unter den Linden 1, 10117 Berlin" },
      ],
    },

    "contact-with-info-cards": {
      title: "Contact Us",
      subtitle:
        "Our team is happy to answer any questions. Fill in the form or reach us directly.",
      infoCards: [
        {
          title: "Email",
          description: "Send us a message anytime.",
          value: "hello@example.com",
          href: "mailto:hello@example.com",
        },
        {
          title: "Phone",
          description: "Mon–Fri, 9:00–18:00 CET.",
          value: "+49 30 12345678",
          href: "tel:+4930123456789",
        },
        {
          title: "Office",
          description: "Come visit us in Berlin.",
          value: "Unter den Linden 1, 10117 Berlin",
        },
      ],
    },
  },

  content: {
    "content-feature-highlight": {
      headline: "Ship Faster With Confidence",
      description:
        "Our platform gives your team the tools to iterate quickly without sacrificing reliability. Automated testing, one-click rollbacks, and real-time monitoring are built in from day one.",
      imageSrc: IMG,
      imageAlt: "Developer dashboard showing deployment pipeline",
      reversed: false,
    },

    "content-icon-list": {
      headline: "Why Teams Choose Us",
      columns: 2,
      items: [
        {
          title: "Zero-Config Setup",
          description:
            "Sensible defaults get you productive in minutes, not hours.",
        },
        {
          title: "Real-Time Collaboration",
          description:
            "Multiple team members can work on the same project simultaneously.",
        },
        {
          title: "Automated Testing",
          description:
            "Every change is tested automatically against your full test suite.",
        },
        {
          title: "One-Click Rollbacks",
          description:
            "Made a mistake? Revert to any previous deployment with a single click.",
        },
        {
          title: "Detailed Audit Logs",
          description:
            "A full audit trail keeps your security and compliance teams happy.",
        },
        {
          title: "Global CDN",
          description:
            "Assets served from 100+ edge locations for sub-second load times worldwide.",
        },
      ],
    },

    "content-quote-block": {
      quote:
        "The best investment we've made this year. Onboarding was seamless, the platform is rock-solid, and their team genuinely cares about our success.",
      author: "Sarah Chen",
      role: "CTO at NovaSoft",
    },

    "content-stats-with-text": {
      headline: "Trusted by Teams Worldwide",
      description:
        "From early-stage startups to Fortune 500 companies, thousands of organisations rely on our platform to power their most critical workflows.",
      stats: [
        { value: "12,000+", label: "Active teams" },
        { value: "99.99%", label: "Uptime SLA" },
        { value: "4.9/5", label: "Customer rating" },
        { value: "<50ms", label: "Avg. response time" },
      ],
    },

    "content-text-with-image": {
      headline: "Built for Scale, Designed for People",
      text: "We believe powerful software doesn't have to be complicated. Our platform handles the heavy lifting so your team can focus on what matters — building great products and delighting customers.",
      imageSrc: IMG,
      imageAlt: "Product interface showing a clean analytics dashboard",
      imagePosition: "right",
    },

    "content-two-column-text": {
      headline: "Our Approach",
      leftContent:
        "We start every engagement by deeply understanding your business context. That means listening before we talk, asking hard questions, and challenging assumptions that might lead you in the wrong direction. Only once we understand the real problem do we begin designing a solution.",
      rightContent:
        "From there, we move in tight iteration loops — shipping working software early and often, collecting real feedback, and adapting as we go. Transparency is core to how we work: you always know what we're building, why, and what comes next.",
    },
  },

  "cookie-consent": {
    "cookie-banner-gdpr": {
      privacyHref: "#",
    },

    "cookie-consent-bottom-bar": {
      message:
        "We use cookies to improve your experience and analyse site traffic. By clicking Accept, you consent to our use of cookies.",
    },

    "cookie-consent-categories-inline": {
      headline: "Manage Cookie Preferences",
      categories: [
        {
          id: "essential",
          name: "Essential",
          description: "Required for the website to function correctly. Cannot be disabled.",
          required: true,
        },
        {
          id: "analytics",
          name: "Analytics",
          description: "Help us understand how visitors interact with our website.",
        },
        {
          id: "marketing",
          name: "Marketing",
          description: "Used to deliver personalised advertisements relevant to your interests.",
        },
        {
          id: "preferences",
          name: "Preferences",
          description: "Remember your settings and customisations across visits.",
        },
      ],
    },

    "cookie-consent-floating": {
      message:
        "We use cookies to improve your experience. By continuing, you agree to our cookie policy.",
    },

    "cookie-consent-full-overlay": {
      headline: "Your Privacy Matters",
      message:
        "We use cookies and similar technologies to give you the best experience on our website. You can choose to accept all, reject non-essential cookies, or customise your preferences at any time.",
    },

    "cookie-preference-modal": {
      open: true,
      categories: [
        {
          id: "essential",
          label: "Essential",
          description: "Necessary for the website to function. Cannot be disabled.",
          required: true,
        },
        {
          id: "analytics",
          label: "Analytics",
          description: "Help us understand how visitors use our site so we can improve it.",
        },
        {
          id: "marketing",
          label: "Marketing",
          description: "Used to show you relevant ads on other websites.",
        },
        {
          id: "preferences",
          label: "Preferences",
          description: "Remember your language, region, and other personalisation settings.",
        },
      ],
    },
  },

  countdown: {
    "countdown-event": {
      headline: "Annual Product Summit",
      targetDate: "2026-09-15T09:00:00",
      expiredMessage: "The summit has begun!",
    },

    "countdown-flip-clock": {
      headline: "Next Release Drops In",
      targetDate: "2026-07-01T00:00:00",
      expiredMessage: "We're live!",
    },

    "countdown-launch": {
      targetDate: "2026-08-01T00:00:00",
      title: "Something Big Is Coming",
      description:
        "We're putting the finishing touches on our next product. Drop your email to be first in line when we launch.",
      backgroundEffect: "gradient",
    },

    "countdown-minimal-inline": {
      targetDate: "2026-06-30T23:59:59",
      prefix: "Offer ends in",
      expiredText: "Offer expired",
    },

    "countdown-sale-banner": {
      message: "Summer Sale — 40% off all Pro plans.",
      targetDate: "2026-06-30T23:59:59",
      ctaLabel: "Claim discount",
      ctaHref: "#",
    },

    "countdown-with-progress": {
      headline: "Early Access Closes In",
      targetDate: "2026-07-15T00:00:00",
      startDate: "2026-06-01T00:00:00",
      expiredMessage: "Early access is now closed.",
    },
  },
};
