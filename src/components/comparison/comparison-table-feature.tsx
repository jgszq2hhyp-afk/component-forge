// @source 21st.dev/r/ruixenui/comparison-table
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Item = {
  id: number;
  category: string;
  price: number;
  rating: number;
  stock: number;
};

const defaultData: Item[] = [
  { id: 1, category: "Laptop", price: 1200, rating: 4.5, stock: 20 },
  { id: 2, category: "Tablet", price: 600, rating: 4.1, stock: 35 },
  { id: 3, category: "Smartphone", price: 800, rating: 4.7, stock: 50 },
  { id: 4, category: "Monitor", price: 300, rating: 4.0, stock: 15 },
  { id: 5, category: "Laptop", price: 1500, rating: 4.8, stock: 10 },
  { id: 6, category: "Tablet", price: 550, rating: 4.2, stock: 28 },
];

const categories = ["all", "Laptop", "Tablet", "Smartphone", "Monitor"] as const;

export default function ComparisonTableFeature() {
  const [selected, setSelected] = React.useState<number[]>([]);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
          ? [...prev, id]
          : prev
    );
  };

  const resetSelection = () => setSelected([]);

  const filteredData = defaultData.filter((item) => {
    const matchesSearch = item.category
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const comparedItems = defaultData.filter((item) =>
    selected.includes(item.id)
  );

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
      <div className="p-3">
        <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
          Comparison Table
        </h2>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs flex h-10 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {/* Native select replacing shadcn Select */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 w-[180px] rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All" : cat}
              </option>
            ))}
          </select>

          <button
            onClick={resetSelection}
            className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium text-[var(--foreground)] ring-offset-[var(--background)] transition-colors hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
          >
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b border-[var(--border)] transition-colors">
                <th className="h-10 px-2.5 text-left align-middle font-medium text-[var(--muted-foreground)]">
                  Category
                </th>
                <th className="h-10 px-2.5 text-left align-middle font-medium text-[var(--muted-foreground)]">
                  Price ($)
                </th>
                <th className="h-10 px-2.5 text-left align-middle font-medium text-[var(--muted-foreground)]">
                  Rating
                </th>
                <th className="h-10 px-2.5 text-left align-middle font-medium text-[var(--muted-foreground)]">
                  Stock
                </th>
                <th className="h-10 px-2.5 text-left align-middle font-medium text-[var(--muted-foreground)]">
                  Select
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50",
                    selected.includes(item.id) && "bg-[var(--muted)]/50"
                  )}
                >
                  <td className="p-2 text-[var(--foreground)]">
                    {item.category}
                  </td>
                  <td className="p-2 text-[var(--foreground)]">
                    {item.price}
                  </td>
                  <td className="p-2 text-[var(--foreground)]">
                    {item.rating}
                  </td>
                  <td className="p-2 text-[var(--foreground)]">
                    {item.stock}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => toggleSelect(item.id)}
                      className={cn(
                        "inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                        selected.includes(item.id)
                          ? "bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/90"
                          : "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)]"
                      )}
                    >
                      {selected.includes(item.id) ? "Remove" : "Compare"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparison view */}
        {comparedItems.length === 2 && (
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <h3 className="text-lg font-medium mb-3 text-[var(--foreground)]">
              Comparison Result
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="font-semibold text-[var(--foreground)]">
                Attribute
              </div>
              <div className="font-semibold text-[var(--foreground)]">
                {comparedItems[0].category}
              </div>
              <div className="font-semibold text-[var(--foreground)]">
                {comparedItems[1].category}
              </div>

              <div className="text-[var(--muted-foreground)]">Price ($)</div>
              <div
                className={cn(
                  "text-[var(--foreground)]",
                  comparedItems[0].price < comparedItems[1].price &&
                    "text-green-600 dark:text-green-400"
                )}
              >
                {comparedItems[0].price}
              </div>
              <div
                className={cn(
                  "text-[var(--foreground)]",
                  comparedItems[1].price < comparedItems[0].price &&
                    "text-green-600 dark:text-green-400"
                )}
              >
                {comparedItems[1].price}
              </div>

              <div className="text-[var(--muted-foreground)]">Rating</div>
              <div
                className={cn(
                  "text-[var(--foreground)]",
                  comparedItems[0].rating > comparedItems[1].rating &&
                    "text-green-600 dark:text-green-400"
                )}
              >
                {comparedItems[0].rating}
              </div>
              <div
                className={cn(
                  "text-[var(--foreground)]",
                  comparedItems[1].rating > comparedItems[0].rating &&
                    "text-green-600 dark:text-green-400"
                )}
              >
                {comparedItems[1].rating}
              </div>

              <div className="text-[var(--muted-foreground)]">Stock</div>
              <div
                className={cn(
                  "text-[var(--foreground)]",
                  comparedItems[0].stock > comparedItems[1].stock &&
                    "text-green-600 dark:text-green-400"
                )}
              >
                {comparedItems[0].stock}
              </div>
              <div
                className={cn(
                  "text-[var(--foreground)]",
                  comparedItems[1].stock > comparedItems[0].stock &&
                    "text-green-600 dark:text-green-400"
                )}
              >
                {comparedItems[1].stock}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
