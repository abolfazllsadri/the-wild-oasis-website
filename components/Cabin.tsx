import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "@/components/TextExpander";
import Image from "next/image";
import type { Cabin } from "@/lib/types";

export default function Cabin({ cabin }: { cabin: Cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="mb-24 grid grid-cols-[3fr_4fr] gap-20 rounded-lg border border-primary-800 px-10 py-3">
      <div className="relative -translate-x-3 scale-[1.15]">
        <Image
          fill
          src={image}
          className="select-none rounded-xl object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div>
        <h3 className="mb-5 w-[150%] translate-x-[-254px] select-none rounded-lg bg-primary-950 px-6 py-4 text-7xl font-black text-accent-100">
          Cabin {name}
        </h3>

        {description && (
          <p className="mb-10 text-lg text-primary-300">
            <TextExpander>{description}</TextExpander>
          </p>
        )}

        <ul className="mb-7 flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>

          <li className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>

          <li className="flex items-center gap-3">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
