import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getBooking, getCabin } from "@/lib/data-service";
import { auth } from "@/lib/auth";
import { format, isPast } from "date-fns";
import EditReservationForm from "@/components/EditReservationForm";

type PageProps = {
  params: { bookingId: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `Edit reservation #${params.bookingId}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { bookingId } = params;
  const [session, booking] = await Promise.all([auth(), getBooking(bookingId)]);

  if (!booking || Number(booking.guestId) !== Number(session?.user?.guestId))
    notFound();

  const { numGuests, observations, cabinId, startDate, endDate, numNights } =
    booking;

  if (isPast(new Date(startDate))) redirect("/account/reservations");

  const cabin = await getCabin(String(cabinId));
  if (!cabin) notFound();

  return (
    <div>
      <h2 className="mb-2 text-2xl font-semibold tracking-wider text-accent-400 sm:text-3xl">
        Edit Reservation #{bookingId}
      </h2>

      <p className="mb-7 text-primary-300">
        Cabin {cabin.name} &middot;{" "}
        {format(new Date(startDate), "MMM dd, yyyy")} &ndash;{" "}
        {format(new Date(endDate), "MMM dd, yyyy")} ({numNights} night
        {numNights === 1 ? "" : "s"})
      </p>

      <EditReservationForm
        bookingId={Number(bookingId)}
        numGuests={numGuests}
        observations={observations}
        maxCapacity={cabin.maxCapacity}
      />
    </div>
  );
}
