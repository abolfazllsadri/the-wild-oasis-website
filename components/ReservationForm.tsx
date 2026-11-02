"use client";

import { useReservation } from "@/components/ReservationContext";
import SubmitButton from "@/components/SubmitButton";
import { createReservation } from "@/lib/actions";
import type { Cabin } from "@/lib/types";
import { toUTCDate } from "@/lib/utils";
import type { User } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

type ReservationFormProps = {
  user: User;
  cabin: Cabin;
  breakfastPrice: number;
};

export default function ReservationForm({
  cabin,
  user,
  breakfastPrice,
}: ReservationFormProps) {
  const { id, maxCapacity } = cabin;
  const { range, resetRange } = useReservation();

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const startDate = range?.from;
  const endDate = range?.to;

  async function handleAction(formData: FormData) {
    if (!startDate || !endDate) return;

    const { error } = await createReservation(
      {
        startDate: toUTCDate(startDate),
        endDate: toUTCDate(endDate),
        cabinId: id,
      },
      formData,
    );

    if (error?.trim()) {
      toast.error(error);
      return;
    }

    formRef.current?.reset();
    resetRange();
    router.push("/cabins/thankyou");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 bg-primary-800 px-5 py-2 text-sm text-primary-300 sm:px-10 sm:text-base lg:px-12">
        <p>Logged in as</p>

        <div className="flex min-w-0 items-center gap-2">
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name ?? "User avatar"}
              className="h-9 w-9 shrink-0 rounded-full border border-primary-700"
              width={100}
              height={100}
              // Important to display google profile images
              referrerPolicy="no-referrer"
            />
          )}

          <p className="truncate font-semibold">{user?.name}</p>
        </div>
      </div>

      <form
        ref={formRef}
        action={handleAction}
        className="flex flex-1 flex-col gap-5 bg-primary-900 px-5 py-6 text-lg sm:px-10 sm:py-10 lg:px-12"
      >
        <div className="space-y-3">
          <label htmlFor="numGuests" className="block text-lg font-medium">
            How many guests?
          </label>

          <select
            size={5}
            id="numGuests"
            name="numGuests"
            className="field"
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
            rows={3}
            maxLength={500}
            placeholder="Any pets, allergies, special requirements, etc.?"
            className="field"
          />
        </div>

        <div className="space-y-3">
          <label htmlFor="hasBreakfast" className="block text-lg font-medium">
            Would you like breakfast?
          </label>

          <select
            id="hasBreakfast"
            name="hasBreakfast"
            className="field"
            defaultValue=""
          >
            <option value="">Select breakfast option...</option>
            <option value="true">
              Yes, include breakfast (${breakfastPrice} per guest, per night)
            </option>
            <option value="false">No, thanks</option>
          </select>
        </div>

        <div className="mt-auto flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
          {!(startDate && endDate) && (
            <p className="select-none text-center text-base text-primary-300">
              Start by selecting dates
            </p>
          )}

          <SubmitButton
            pendingText="Reserving..."
            disabled={!(startDate && endDate)}
          >
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
