"use client";

import { useReservation } from "@/components/ReservationContext";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

export default function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range?.from || !range?.to) return null;

  return (
    <div
      role="status"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between gap-4 rounded-2xl bg-accent-500 px-5 py-3 text-sm font-semibold leading-snug text-primary-900 shadow-xl shadow-black/40 sm:w-auto sm:max-w-none sm:rounded-full sm:px-8 sm:py-4 sm:text-base"
    >
      <p>
        Don&apos;t forget to reserve your dates from{" "}
        <strong>{format(range.from, "MMM dd yyyy")}</strong> to{" "}
        <strong>{format(range.to, "MMM dd yyyy")}</strong>
      </p>

      <button
        type="button"
        onClick={resetRange}
        aria-label="Clear selected dates"
        className="shrink-0 rounded-full p-1 transition-colors hover:bg-accent-600"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
