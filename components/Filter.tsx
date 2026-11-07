"use client";

import FilterButton from "@/components/FilterButton";
import { cabinSortOptions, CapacityFilter } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeFilter = searchParams.get("capacity") ?? "all";
  const activeSort = searchParams.get("sort") ?? "name";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleFilter(filter: CapacityFilter) {
    updateParam("capacity", filter);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        <FilterButton
          filter="all"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          All cabins
        </FilterButton>

        <FilterButton
          filter="small"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          1&mdash;3 guests
        </FilterButton>

        <FilterButton
          filter="medium"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          4&mdash;7 guests
        </FilterButton>

        <FilterButton
          filter="large"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          8&mdash;12 guests
        </FilterButton>
      </div>

      <label className="flex items-center gap-2 text-sm text-primary-300">
        <span>Sort by</span>

        <select
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="rounded-lg border border-primary-800 bg-primary-900 px-3 py-2 text-primary-100"
        >
          {cabinSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
