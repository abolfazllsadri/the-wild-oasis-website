"use client";

import { startTransition, useOptimistic } from "react";
import ReservationCard from "@/components/ReservationCard";
import type { ReservationCardBooking } from "@/lib/types";
import { deleteReservation } from "@/lib/actions";
import { toast } from "sonner";

type ReservationListProps = {
  bookings: ReservationCardBooking[];
};

export default function ReservationList({ bookings }: ReservationListProps) {
  const [optimisticBookings, optimisticDelete] = useOptimistic<
    ReservationCardBooking[],
    number
  >(bookings, (curBookings, bookingId) =>
    curBookings.filter((booking) => booking.id !== bookingId),
  );

  function handleDelete(bookingId: number) {
    startTransition(async () => {
      optimisticDelete(bookingId);

      const { error } = await deleteReservation(bookingId);

      if (error) toast.error(error);
      else toast.success("Reservation deleted");
    });
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
