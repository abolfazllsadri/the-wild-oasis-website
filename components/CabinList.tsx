import CabinCard from "@/components/CabinCard";
import { getCabins } from "@/lib/data-service";
import type { Cabin, CabinSort, CapacityFilter } from "@/lib/types";

type CabinListProps = {
  sort: CabinSort;
  filter: CapacityFilter;
};

const price = (cabin: Cabin) => cabin.regularPrice - cabin.discount;

function filterCabins(cabins: Cabin[], filter: CapacityFilter) {
  if (filter === "small")
    return cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    return cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );

  if (filter === "large")
    return cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return cabins;
}

function sortCabins(cabins: Cabin[], sort: CabinSort) {
  const sorted = [...cabins];

  if (sort === "price-asc") sorted.sort((a, b) => price(a) - price(b));
  if (sort === "price-desc") sorted.sort((a, b) => price(b) - price(a));
  if (sort === "capacity-asc")
    sorted.sort((a, b) => a.maxCapacity - b.maxCapacity);
  if (sort === "capacity-desc")
    sorted.sort((a, b) => b.maxCapacity - a.maxCapacity);

  return sorted;
}

export default async function CabinList({ sort, filter }: CabinListProps) {
  const cabins = await getCabins();

  const displayCabins = sortCabins(filterCabins(cabins, filter), sort);

  if (!displayCabins.length)
    return (
      <p className="text-lg text-primary-300">No cabins match this filter.</p>
    );

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
