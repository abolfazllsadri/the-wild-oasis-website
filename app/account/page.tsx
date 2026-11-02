import Spinner from "@/components/Spinner";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";
import { formatDistanceFromNow, fromUTCDate } from "@/lib/utils";
import { format, isPast, isToday } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Guest area",
  robots: { index: false },
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ").at(0) ?? "";
  const bookings = await getBookings(session?.user.guestId as number);

  const active = bookings
    .filter((booking) => !isPast(new Date(booking.endDate)))
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));

  const next = active.at(0);

  const start = fromUTCDate(next?.startDate as string);
  const distance = formatDistanceFromNow(start);

  const stats = [
    { label: "Upcoming stays", value: active.length },
    { label: "Total reservations", value: bookings.length },
    {
      label: "Nights booked",
      value: bookings.reduce((sum, booking) => sum + booking.numNights, 0),
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400 sm:text-3xl">
        Welcome, {firstName}
      </h2>

      <p className="mb-8 text-primary-300">
        Here&apos;s a quick look at your stays.
      </p>

      <Suspense fallback={<Spinner />}>
        <ul className="grid grid-cols-3 gap-2 sm:gap-4">
          {stats.map(({ label, value }) => (
            <li
              key={label}
              className="rounded-xl border border-primary-800 bg-primary-900/40 p-3 sm:p-5"
            >
              <p className="text-2xl font-semibold text-accent-400 sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-xs leading-tight text-primary-300 sm:text-sm">
                {label}
              </p>
            </li>
          ))}
        </ul>

        <section className="mt-10">
          <h3 className="mb-4 text-2xl tracking-wider">
            {next && isPast(new Date(next.startDate))
              ? "Current stay"
              : "Next stay"}
          </h3>

          {next ? (
            <div className="flex flex-col overflow-hidden rounded-xl border border-primary-800 bg-primary-950/20 sm:flex-row">
              <div className="relative h-44 sm:h-auto sm:w-56 sm:shrink-0">
                <Image
                  src={next.cabins.image}
                  fill
                  alt={`Cabin ${next.cabins.name}`}
                  sizes="(min-width: 640px) 224px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <p className="font-serif text-xl font-semibold tracking-wider">
                    {next.numNights} night{next.numNights === 1 ? "" : "s"} in
                    Cabin {next.cabins.name}
                  </p>

                  <p className="my-1 text-sm text-primary-300">
                    {format(new Date(next.startDate), "EEE, MMM dd yyyy")}{" "}
                    &ndash; {format(new Date(next.endDate), "EEE, MMM dd yyyy")}
                  </p>

                  <p className="text-sm text-accent-400">
                    {isToday(start)
                      ? "Today"
                      : isPast(start)
                        ? `Started ${distance}`
                        : distance}
                  </p>
                </div>

                <Link
                  href="/account/reservations"
                  className="mt-auto text-accent-400 transition-colors hover:text-accent-300"
                >
                  Manage reservations &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-primary-800 p-6 text-center sm:p-10">
              <p className="mb-4 text-lg text-primary-200">
                You have no upcoming stays yet.
              </p>

              <Link
                href="/cabins"
                className="inline-block rounded-lg bg-accent-500 px-6 py-3 font-semibold text-primary-900 transition hover:bg-accent-400"
              >
                Browse our cabins
              </Link>
            </div>
          )}
        </section>
      </Suspense>
    </div>
  );
}
