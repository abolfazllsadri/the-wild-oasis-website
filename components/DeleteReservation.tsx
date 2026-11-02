"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import SpinnerMini from "@/components/SpinnerMini";
import ConfirmDialog from "@/components/ConfirmDialog";

type DeleteReservationProps = {
  bookingId: number;
  onDelete: (bookingId: number) => void;
};

export default function DeleteReservation({
  bookingId,
  onDelete,
}: DeleteReservationProps) {
  const [open, setOpen] = useState(false);

  function handleDelete() {
    setOpen(false);
    onDelete(bookingId);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/delete flex flex-1 items-center justify-center gap-2 px-3 py-3.5 text-xs font-bold uppercase leading-none tracking-wide text-primary-300 transition-colors hover:bg-red-600 hover:text-white sm:py-3"
      >
        <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover/delete:text-white" />
        <span className="mt-1">Delete</span>
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        action={handleDelete}
        tone="danger"
        title="Delete reservation?"
        description={
          "This reservation will be permanently removed and this action cannot be undone."
        }
        confirmLabel="Delete"
        pendingLabel="Deleting..."
        cancelLabel="Keep it"
        icon={<TrashIcon className="h-7 w-7" aria-hidden />}
      />
    </>
  );
}
