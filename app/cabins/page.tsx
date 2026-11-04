import CabinList from "@/components/CabinList";
import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";
import { CapacityFilter } from "@/lib/types";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cabins",
  description:
    "Browse our luxury cabins in the Italian Dolomites. Filter by capacity, compare prices and reserve your stay.",
};

export const revalidate = 3600;

export default async function Page({ searchParams }: PageProps<"/cabins">) {
  const { capacity = "all" } = await searchParams;
  const filter = capacity as CapacityFilter;

  return (
    <div>
      <h1 className="mb-5 text-3xl font-semibold tracking-wider text-accent-400 sm:text-4xl">
        Our Luxury Cabins
      </h1>

      <p className="mb-10 max-w-3xl text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex sm:justify-end">
        <Filter />
      </div>

      <Suspense fallback={<Loading />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>

      <ReservationReminder />
    </div>
  );
}

function Loading() {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-14">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="h-52 animate-pulse rounded-lg border border-primary-800 bg-primary-900/50"
        />
      ))}
    </div>
  );
}
