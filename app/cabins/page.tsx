import CabinList from "@/components/CabinList";
import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";
import Spinner from "@/components/Spinner";
import { CapacityFilter } from "@/lib/types";
import type { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cabins",
};

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: PageProps) {
  const filter = (searchParams?.capacity ?? "all") as CapacityFilter;

  return (
    <div>
      <h1 className="mb-5 text-3xl font-semibold tracking-wider text-accent-400 sm:text-4xl">
        Our Luxury Cabins
      </h1>

      <p className="mb-10 text-lg text-primary-200">
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

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
