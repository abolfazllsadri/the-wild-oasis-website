import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "@/components/TextExpander";
import Image from "next/image";
import type { Cabin } from "@/lib/types";

export default function Cabin({ cabin }: { cabin: Cabin }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="mb-12 grid grid-cols-1 gap-6 rounded-xl border border-primary-800 p-4 sm:p-6 lg:mb-24 lg:grid-cols-[3fr_4fr] lg:gap-12 lg:p-8">
      <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[22rem]">
        <Image
          fill
          priority
          src={image}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="select-none rounded-xl object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="mb-5 select-none text-4xl font-black text-accent-100 sm:text-5xl lg:text-6xl">
          Cabin {name}
        </h3>

        {description && (
          <p className="mb-10 text-lg text-primary-300">
            <TextExpander>{description}</TextExpander>
          </p>
        )}

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 shrink-0 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>

          <li className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 shrink-0 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>

          <li className="flex items-center gap-3">
            <EyeSlashIcon className="h-5 w-5 shrink-0 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
