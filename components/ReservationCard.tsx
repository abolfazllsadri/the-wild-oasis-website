import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import type { ReservationCardBooking } from "@/lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

type ReservationCardProps = {
  booking: ReservationCardBooking;
  onDelete: (bookingId: number) => Promise<void>;
};

export default function ReservationCard({
  booking,
  onDelete,
}: ReservationCardProps) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins: { name, image },
  } = booking;

  const start = new Date(startDate);
  const past = isPast(start);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-primary-800 bg-primary-950/20 transition hover:border-primary-700 hover:shadow-lg hover:shadow-black/20 sm:flex-row">
      <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-48 md:w-56">
        <Image
          src={image}
          priority
          fill
          alt={`Cabin ${name}`}
          sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <span
          className={cn(
            "absolute left-3 top-3 select-none rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md",
            past
              ? "border-yellow-800 bg-yellow-900/80 text-yellow-200"
              : "border-green-800 bg-green-900/80 text-green-200",
          )}
        >
          {past ? "Past" : "Upcoming"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-serif text-xl font-semibold">
            {numNights} night{numNights === 1 ? "" : "s"} in Cabin {name}
          </h3>

          <p className="mt-1 text-primary-300">
            {format(start, "EEE, MMM dd yyyy")} &ndash;{" "}
            {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>

          <p className="text-sm text-accent-400">
            {isToday(start) ? "Today" : formatDistanceFromNow(startDate)}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-accent-400">
              ${totalPrice}
            </span>

            <span className="text-primary-300">
              {numGuests} guest{numGuests === 1 ? "" : "s"}
            </span>
          </div>

          <p className="text-xs text-primary-500">
            Booked {format(new Date(created_at ?? ""), "MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {!past && (
        <div className="flex border-t border-primary-800 sm:w-28 sm:flex-col sm:border-l sm:border-t-0">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group/edit flex flex-1 items-center justify-center gap-2 border-r border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 sm:border-b sm:border-r-0"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-500 transition-colors group-hover/edit:text-primary-900" />
            Edit
          </Link>

          <DeleteReservation onDelete={onDelete} bookingId={Number(id)} />
        </div>
      )}
    </article>
  );
}
