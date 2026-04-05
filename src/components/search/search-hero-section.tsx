// @version 1.0.0
// @category search
// @name SearchHeroSection
// @source custom

"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

/* ─── Named Constants ─── */
const HEADING_FONT_SIZE = "clamp(1.75rem, 4vw, 3rem)";
const SECTION_PADDING_Y = "clamp(3rem, 10vh, 7rem)";
const SECTION_PADDING_X = "clamp(1rem, 5vw, 3rem)";
const INPUT_HEIGHT = "3.25rem";
const DROPDOWN_MAX_HEIGHT = "16rem";
const TAG_FONT_SIZE = "0.8125rem";
const NO_RESULTS_INDEX = -1;

/* ─── Props ─── */
interface SearchHeroSectionProps {
  placeholder?: string;
  suggestions?: string[];
  popularTags?: string[];
  onSearch?: (query: string) => void;
  className?: string;
}

/* ─── Search Icon ─── */
function SearchIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ─── Component ─── */
export default function SearchHeroSection({
  placeholder = "Search...",
  suggestions = [],
  popularTags = [],
  onSearch,
  className,
}: SearchHeroSectionProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(NO_RESULTS_INDEX);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ─── Filtered Suggestions ─── */
  const filtered = query.trim()
    ? suggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const showDropdown = isOpen && filtered.length > 0;
  const listboxId = "search-hero-listbox";

  /* ─── Submit ─── */
  const handleSubmit = useCallback(
    (value: string) => {
      if (!value.trim()) return;
      onSearch?.(value.trim());
      setIsOpen(false);
      setActiveIndex(NO_RESULTS_INDEX);
    },
    [onSearch]
  );

  /* ─── Keyboard Navigation ─── */
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (!showDropdown) {
        if (e.key === "Enter") {
          handleSubmit(query);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0
          );
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1
          );
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < filtered.length) {
            const selected = filtered[activeIndex];
            setQuery(selected);
            handleSubmit(selected);
          } else {
            handleSubmit(query);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          setIsOpen(false);
          setActiveIndex(NO_RESULTS_INDEX);
          break;
        }
      }
    },
    [showDropdown, activeIndex, filtered, query, handleSubmit]
  );

  /* ─── Click Outside ─── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(NO_RESULTS_INDEX);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ─── Scroll active option into view ─── */
  useEffect(() => {
    if (activeIndex >= 0 && listboxRef.current) {
      const activeEl = listboxRef.current.children[activeIndex] as
        | HTMLElement
        | undefined;
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  /* ─── Tag Click ─── */
  const handleTagClick = useCallback(
    (tag: string) => {
      setQuery(tag);
      handleSubmit(tag);
      inputRef.current?.focus();
    },
    [handleSubmit]
  );

  return (
    <section
      className={cn("flex w-full flex-col items-center", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
        backgroundColor: "var(--background)",
      }}
      aria-label="Search"
    >
      <div className="mx-auto w-full max-w-2xl">
        {/* Heading */}
        <h2
          className="mb-8 text-center font-bold tracking-tight"
          style={{
            fontSize: HEADING_FONT_SIZE,
            color: "var(--foreground)",
          }}
        >
          What are you looking for?
        </h2>

        {/* Search Input */}
        <div ref={containerRef} className="relative w-full" role="combobox" aria-expanded={showDropdown} aria-haspopup="listbox" aria-owns={listboxId}>
          <div
            className="relative flex items-center overflow-hidden rounded-xl"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--card)",
            }}
          >
            {/* Icon */}
            <span
              className="pointer-events-none absolute left-4"
              style={{ color: "var(--muted-foreground)" }}
              aria-hidden="true"
            >
              <SearchIcon />
            </span>

            {/* Input */}
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setActiveIndex(NO_RESULTS_INDEX);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              role="combobox"
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-activedescendant={
                activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
              }
              className={cn(
                "w-full bg-transparent py-0 pl-12 pr-4 text-base outline-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "rounded-xl"
              )}
              style={{
                height: INPUT_HEIGHT,
                color: "var(--foreground)",
                ["--tw-ring-color" as string]:
                  "var(--ring, hsl(215 20% 65%))",
              }}
            />
          </div>

          {/* Autocomplete Dropdown */}
          {showDropdown && (
            <ul
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              className="absolute left-0 right-0 top-full z-20 mt-1 overflow-y-auto rounded-xl shadow-lg"
              style={{
                maxHeight: DROPDOWN_MAX_HEIGHT,
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              {filtered.map((suggestion, index) => (
                <li
                  key={suggestion}
                  id={`search-option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={cn(
                    "cursor-pointer px-4 py-2.5 text-sm",
                    "motion-safe:transition-colors motion-safe:duration-100"
                  )}
                  style={{
                    color:
                      index === activeIndex
                        ? "var(--primary-foreground)"
                        : "var(--foreground)",
                    backgroundColor:
                      index === activeIndex ? "var(--primary)" : "transparent",
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setQuery(suggestion);
                    handleSubmit(suggestion);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Popular Tags */}
        {popularTags.length > 0 && (
          <nav className="mt-5 flex flex-wrap items-center justify-center gap-2" aria-label="Popular searches">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--muted-foreground)" }}
            >
              Popular:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={cn(
                  "rounded-full px-3 py-1",
                  "motion-safe:transition-colors motion-safe:duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                )}
                style={{
                  fontSize: TAG_FONT_SIZE,
                  backgroundColor: "var(--accent)",
                  color: "var(--foreground)",
                  ["--tw-ring-color" as string]:
                    "var(--ring, hsl(215 20% 65%))",
                }}
              >
                {tag}
              </button>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
