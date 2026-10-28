import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import type { Cabin } from "@/lib/types";

export default function CabinCard({ cabin }: { cabin: Cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-primary-800 shadow-lg shadow-primary-900 sm:flex-row">
      <div className="relative h-52 flex-1 sm:h-auto sm:flex-1">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="border-b border-primary-800 object-cover sm:border-b-0 sm:border-r"
          sizes="(max-width: 640px) 100vw, 45vw"
        />
      </div>

      <div className="sm:flex-1">
        <div className="bg-primary-950 px-5 pb-4 pt-5 sm:px-7">
          <h3 className="mb-3 text-2xl font-semibold text-accent-500">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />

            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-medium text-green-600">
                  ${regularPrice - discount}
                </span>

                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-medium">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-primary-800 bg-primary-950 text-center">
          <Link
            href={`/cabins/${id}`}
            className="block w-full border-l border-primary-800 px-6 py-4 font-medium transition-all hover:bg-accent-600 hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
