import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, isPast, isToday } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import type { ReservationCardBooking } from "@/lib/types";
import Link from "next/link";
import { cn, formatDistanceFromNow } from "@/lib/utils";
import PayNowButton from "@/components/PayNowButton";

const STATUS = {
  past: {
    label: "Past",
    className: "border-yellow-800 bg-yellow-900/80 text-yellow-200",
  },
  ongoing: {
    label: "Ongoing",
    className: "border-sky-800 bg-sky-900/80 text-sky-200",
  },
  upcoming: {
    label: "Upcoming",
    className: "border-green-800 bg-green-900/80 text-green-200",
  },
} as const;

type ReservationCardProps = {
  booking: ReservationCardBooking;
  onDelete: (bookingId: number) => void;
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
    isPaid,
    cabins: { name, image },
  } = booking;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const status = isPast(end) ? "past" : isPast(start) ? "ongoing" : "upcoming";
  const canManage = status === "upcoming";

  const distance = formatDistanceFromNow(startDate);
  const timeLabel = isToday(start)
    ? "Today"
    : status === "ongoing"
      ? `Started ${distance}`
      : distance;

  return (
    <li className="group flex flex-col overflow-hidden rounded-xl border border-primary-800 bg-primary-950/20 transition hover:border-primary-700 hover:shadow-lg hover:shadow-black/20 sm:flex-row">
      <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48 md:w-56">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          sizes="(min-width: 768px) 224px, (min-width: 640px) 192px, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <span
          className={cn(
            "absolute left-3 top-3 select-none rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md",
            STATUS[status].className,
          )}
        >
          {STATUS[status].label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-serif text-xl font-semibold">
            {numNights} night{numNights === 1 ? "" : "s"} in Cabin {name}
          </h3>

          <p className="mt-1 text-primary-300">
            {format(start, "EEE, MMM dd yyyy")} &ndash;{" "}
            {format(end, "EEE, MMM dd yyyy")}
          </p>

          <p className="text-sm text-accent-400">{timeLabel}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-2xl font-semibold text-accent-400">
              ${totalPrice}
            </span>

            <span className="text-primary-300">
              {numGuests} guest{numGuests === 1 ? "" : "s"}
            </span>

            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                isPaid
                  ? "border-green-800 bg-green-900/50 text-green-300"
                  : "border-primary-700 text-primary-300",
              )}
            >
              {isPaid ? "Paid" : "Unpaid"}
            </span>

            {!isPaid && status !== "past" && (
              <PayNowButton bookingId={Number(id)} />
            )}
          </div>

          <p className="text-xs text-primary-500">
            Booked {formatDistanceFromNow(created_at as string)}
          </p>
        </div>
      </div>

      {canManage && (
        <div className="flex border-t border-primary-800 sm:w-28 sm:flex-col sm:border-l sm:border-t-0">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group/edit flex flex-1 items-center justify-center gap-2 border-r border-primary-800 px-3 py-3.5 text-xs font-bold uppercase leading-none tracking-wide text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 sm:border-b sm:border-r-0 sm:py-3"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-500 transition-colors group-hover/edit:text-primary-900" />
            Edit
          </Link>

          <DeleteReservation onDelete={onDelete} bookingId={Number(id)} />
        </div>
      )}
    </li>
  );
}
