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
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-4xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
