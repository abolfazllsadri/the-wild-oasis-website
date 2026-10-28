"use client";

import { useReservation } from "@/components/ReservationContext";
import SubmitButton from "@/components/SubmitButton";
import { createReservation } from "@/lib/actions";
import type { Cabin } from "@/lib/types";
import { differenceInDays } from "date-fns";
import type { User } from "next-auth";
import Image from "next/image";
import { useRef } from "react";

type ReservationFormProps = {
  cabin: Cabin;
  user: User;
};

export default function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = cabin;
  const formRef = useRef<HTMLFormElement>(null);

  const startDate = range?.from! ?? "";
  const endDate = range?.to! ?? "";
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  async function handleAction(formData: FormData) {
    await createReservationWithData(formData);
    formRef.current?.reset();
    resetRange();
  }

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-2">
          <Image
            src={user?.image ?? ""}
            alt={user?.name ?? "User avatar"}
            className="h-9 w-9 rounded-full border border-primary-700"
            width={100}
            height={100}
            // Important to display google profile images
            referrerPolicy="no-referrer"
          />

          <p className="font-semibold">{user?.name}</p>
        </div>
      </div>

      <form
        ref={formRef}
        action={handleAction}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
      >
        <div className="space-y-3">
          <label htmlFor="numGuests" className="block text-lg font-medium">
            How many guests?
          </label>

          <select
            id="numGuests"
            name="numGuests"
            className="w-full cursor-pointer rounded-lg border border-transparent bg-primary-200 px-5 py-3 text-lg text-primary-800 shadow-sm outline-none transition duration-200 focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-600/40"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>

            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label htmlFor="observations" className="block text-lg font-medium">
            Anything we should know about your stay?
          </label>

          <textarea
            id="observations"
            name="observations"
            placeholder="Any pets, allergies, special requirements, etc.?"
            maxLength={500}
            className="w-full rounded-lg border border-transparent bg-primary-200 px-5 py-3 text-lg text-primary-800 shadow-sm outline-none transition duration-200 placeholder:text-primary-700 focus-within:border-primary-700 focus-within:ring-4 focus-within:ring-primary-600/40"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="hasBreakfast"
            className="mb-3 block text-lg font-medium"
          >
            Would you like breakfast?
          </label>

          <select
            id="hasBreakfast"
            name="hasBreakfast"
            className="w-full cursor-pointer rounded-lg border border-transparent bg-primary-200 px-5 py-3 text-lg text-primary-800 shadow-sm outline-none transition duration-200 focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-600/40"
            defaultValue=""
          >
            <option value="">Select breakfast option...</option>

            <option value="true">Yes, include breakfast</option>
            <option value="false">No, thanks</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="select-none text-base text-primary-300">
            Start by selecting dates
          </p>

          <SubmitButton
            disabled={!(startDate && endDate)}
            pendingText="Reserving..."
          >
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
