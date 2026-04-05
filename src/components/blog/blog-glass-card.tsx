// @source 21st.dev/r/moumensoliman/glass-blog-card-shadcnui
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";

const IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' rx='8' fill='%231a1a2e'/%3E%3C/svg%3E";
const AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='50' fill='%23cbd5e1'/%3E%3C/svg%3E";

interface BlogGlassCardAuthor {
  name: string;
  avatar: string;
}

interface BlogGlassCardProps {
  title?: string;
  excerpt?: string;
  image?: string;
  author?: BlogGlassCardAuthor;
  date?: string;
  readTime?: string;
  tags?: string[];
  className?: string;
}

const defaultPost = {
  title: "The Future of UI Design",
  excerpt:
    "Exploring the latest trends in glassmorphism, 3D elements, and micro-interactions.",
  image: IMG,
  author: {
    name: "Moumen Soliman",
    avatar: AVATAR,
  },
  date: "Dec 2, 2025",
  readTime: "5 min read",
  tags: ["Design", "UI/UX"],
};

export default function BlogGlassCard({
  title = defaultPost.title,
  excerpt = defaultPost.excerpt,
  image = defaultPost.image,
  author = defaultPost.author,
  date = defaultPost.date,
  readTime = defaultPost.readTime,
  tags = defaultPost.tags,
  className,
}: BlogGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("w-full max-w-[400px] motion-reduce:transform-none motion-reduce:transition-none", className)}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)]/50 bg-[var(--card)]/30 backdrop-blur-md transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-xl hover:shadow-[var(--primary)]/10">
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          <div className="absolute bottom-3 left-3 flex gap-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full border border-[var(--border)]/50 bg-[var(--background)]/50 px-2.5 py-0.5 text-xs font-medium text-[var(--foreground)] backdrop-blur-sm transition-colors hover:bg-[var(--background)]/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover Overlay Action */}
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background)]/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-[var(--primary-foreground)] shadow-lg shadow-[var(--primary)]/25"
            >
              <BookOpen className="h-4 w-4" />
              Read Article
            </motion.button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 p-5">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-[var(--muted-foreground)]">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--border)]/50 pt-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[var(--border)]/50">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </span>
              <div className="flex flex-col text-xs">
                <span className="font-medium text-[var(--foreground)]">
                  {author.name}
                </span>
                <span className="text-[var(--muted-foreground)]">{date}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
