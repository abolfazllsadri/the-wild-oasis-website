import CabinCard from "@/components/CabinCard";
import { getCabins } from "@/lib/data-service";
import type { Cabin, CapacityFilter } from "@/lib/types";
// import { unstable_noStore as noStore } from "next/cache";

type CabinListProps = {
  filter: CapacityFilter;
};

export default async function CabinList({ filter }: CabinListProps) {
  // noStore();

  const cabins = await getCabins();

  let filteredCabins!: Cabin[];

  if (filter === "all") filteredCabins = cabins;

  if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );

  if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  if (!filteredCabins.length)
    return (
      <p className="text-lg text-primary-300">No cabins match this filter.</p>
    );

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
