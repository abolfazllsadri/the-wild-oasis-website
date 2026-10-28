"use client";

import { useOptimistic } from "react";
import ReservationCard from "@/components/ReservationCard";
import type { ReservationCardBooking } from "@/lib/types";
import { deleteReservation } from "@/lib/actions";

export default function ReservationList({
  bookings,
}: {
  bookings: ReservationCardBooking[];
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic<
    ReservationCardBooking[],
    number
  >(bookings, (curBookings, bookingId) =>
    curBookings.filter((booking) => booking.id !== bookingId),
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  if (!bookings) return null;

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          booking={booking}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
