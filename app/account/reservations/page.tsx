import ReservationList from "@/components/ReservationList";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservations",
};

// export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session?.user?.guestId as number);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold tracking-wider text-accent-400 sm:text-3xl">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link href="/cabins" className="text-accent-500 underline">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
