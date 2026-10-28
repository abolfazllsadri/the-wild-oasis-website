"use client";

import { useReservation } from "@/components/ReservationContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

export default function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range?.from || !range?.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-8 rounded-full bg-accent-500 px-8 py-4 text-base font-semibold leading-snug text-primary-800 shadow-xl shadow-slate-900">
      <p>
        Don&apos;t forget to reserve your dates <br /> from{" "}
        <strong>{format(new Date(range?.from), "MMM dd yyyy")}</strong> to{" "}
        <strong>{format(new Date(range?.to), "MMM dd yyyy")}</strong>
      </p>

      <button
        onClick={resetRange}
        className="rounded-full p-1 transition-all hover:bg-accent-600"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
