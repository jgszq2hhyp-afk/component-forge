// @version 1.0.0
// @category careers
// @name Careers Job Listing
// @source custom

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = "clamp(1.5rem, 3vw, 2.5rem)";
const SUBHEADING_CLAMP = "clamp(1rem, 2vw, 1.25rem)";
const SECTION_PADDING = "py-[clamp(3rem,8vw,6rem)]";
const MAX_CONTENT_WIDTH = "max-w-4xl";

const TYPE_COLORS: Record<JobType, string> = {
  "full-time": "bg-green-500/10 text-green-700",
  "part-time": "bg-blue-500/10 text-blue-700",
  remote: "bg-purple-500/10 text-purple-700",
};

const TYPE_LABELS: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  remote: "Remote",
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type JobType = "full-time" | "part-time" | "remote";

interface Job {
  title: string;
  department: string;
  location: string;
  type: JobType;
  href: string;
}

interface CareersJobListingProps {
  headline?: string;
  subheadline?: string;
  jobs: Job[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function groupByDepartment(jobs: Job[]): Map<string, Job[]> {
  const groups = new Map<string, Job[]>();
  for (const job of jobs) {
    const existing = groups.get(job.department) ?? [];
    existing.push(job);
    groups.set(job.department, existing);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function JobTypeBadge({ type }: { type: JobType }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        TYPE_COLORS[type],
      )}
    >
      {TYPE_LABELS[type]}
    </span>
  );
}

function LocationIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--muted-foreground)] transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CareersJobListing({
  headline = "Open Positions",
  subheadline = "Join our team and help us build the future. We're looking for talented people who share our passion.",
  jobs,
  className,
}: CareersJobListingProps) {
  const headingId = "careers-job-listing-heading";
  const grouped = groupByDepartment(jobs);

  if (jobs.length === 0) {
    return (
      <section
        aria-labelledby={headingId}
        className={cn(
          SECTION_PADDING,
          "bg-[var(--background)] text-[var(--foreground)]",
          className,
        )}
      >
        <div className={cn("mx-auto px-4 sm:px-6", MAX_CONTENT_WIDTH)}>
          <header className="text-center">
            <h2
              id={headingId}
              className="font-bold tracking-tight text-[var(--foreground)]"
              style={{ fontSize: HEADING_CLAMP }}
            >
              {headline}
            </h2>
          </header>
          <p className="mt-8 text-center text-[var(--muted-foreground)]">
            No open positions right now. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        SECTION_PADDING,
        "bg-[var(--background)] text-[var(--foreground)]",
        className,
      )}
    >
      <div className={cn("mx-auto px-4 sm:px-6", MAX_CONTENT_WIDTH)}>
        <header className="text-center">
          <h2
            id={headingId}
            className="font-bold tracking-tight text-[var(--foreground)]"
            style={{ fontSize: HEADING_CLAMP }}
          >
            {headline}
          </h2>
          {subheadline && (
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
              {subheadline}
            </p>
          )}
        </header>

        <div className="mt-12 space-y-10">
          {Array.from(grouped.entries()).map(([department, departmentJobs]) => (
            <div key={department}>
              <h3
                className="font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-3"
                style={{ fontSize: SUBHEADING_CLAMP }}
              >
                {department}
              </h3>
              <ul role="list" className="divide-y divide-[var(--border)]">
                {departmentJobs.map((job) => (
                  <li key={`${job.department}-${job.title}`}>
                    <a
                      href={job.href}
                      className={cn(
                        "group flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between",
                        "rounded-lg transition-colors motion-reduce:transition-none",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                      )}
                      style={{
                        ["--tw-ring-color" as string]:
                          "var(--ring, hsl(215 20% 65%))",
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors motion-reduce:transition-none">
                          {job.title}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                            <LocationIcon />
                            {job.location}
                          </span>
                          <JobTypeBadge type={job.type} />
                        </div>
                      </div>
                      <div className="shrink-0 self-start sm:self-center">
                        <ArrowIcon />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
