import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/data-service";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  params: { cabinId: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);

  if (!cabin?.name)
    return {
      title: "Cabin not found",
    };

  return {
    title: `Cabin ${cabin.name}`,
    description: `Cabin ${cabin.name} sleeps up to ${cabin.maxCapacity} guests, from $${cabin.regularPrice - cabin.discount} per night, in the Italian Dolomites.`,
    openGraph: { images: [cabin.image] },
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }: PageProps) {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);

  if (!cabin) notFound();

  return (
    <div className="mx-auto max-w-6xl sm:mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-6 text-balance text-center text-2xl font-semibold text-accent-400 sm:mb-10 sm:text-3xl lg:text-4xl">
          Reserve {cabin.name} today. Pay online or on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
