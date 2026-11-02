"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "@/components/SubmitButton";
import { updateReservation } from "@/lib/actions";

type EditReservationFormProps = {
  bookingId: number;
  numGuests: number;
  observations: string;
  maxCapacity: number;
};

export default function EditReservationForm({
  bookingId,
  numGuests,
  observations,
  maxCapacity,
}: EditReservationFormProps) {
  const router = useRouter();

  async function handleAction(formData: FormData) {
    const { error } = await updateReservation(formData);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Reservation updated");
    router.push("/account/reservations");
  }

  return (
    <form
      action={handleAction}
      className="flex flex-col gap-6 rounded-xl border border-primary-800/50 bg-primary-900 p-5 text-lg sm:px-10 sm:py-8"
    >
      <input type="hidden" name="bookingId" value={bookingId} />

      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>

        <select
          required
          id="numGuests"
          name="numGuests"
          defaultValue={numGuests}
          className="field"
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

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>

        <textarea
          id="observations"
          name="observations"
          rows={4}
          maxLength={500}
          defaultValue={observations}
          className="field"
        />
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
        <Link
          href="/account/reservations"
          className="px-4 py-2 text-center text-primary-300 transition-colors hover:text-primary-100"
        >
          Cancel
        </Link>

        <SubmitButton>Update reservation</SubmitButton>
      </div>
    </form>
  );
}
