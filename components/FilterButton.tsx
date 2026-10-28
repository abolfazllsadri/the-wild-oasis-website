"use client";

import type { CapacityFilter } from "@/lib/types";
import { cn } from "@/lib/utils";

type FilterButtonProps = {
  filter: CapacityFilter;
  handleFilter: (filter: CapacityFilter) => void;
  activeFilter: string;
  children: React.ReactNode;
};

export default function FilterButton({
  filter,
  handleFilter,
  activeFilter,
  children,
}: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={filter === activeFilter}
      onClick={() => handleFilter(filter)}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition sm:text-base",
        filter === activeFilter
          ? "border-accent-500 bg-accent-500/15 text-accent-300"
          : "border-primary-800 hover:bg-primary-800",
      )}
    >
      {children}
    </button>
  );
}
