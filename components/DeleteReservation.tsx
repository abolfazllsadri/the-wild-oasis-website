"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import SpinnerMini from "@/components/SpinnerMini";
import { deleteReservation } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";

type DeleteReservationProps = {
  bookingId: number;
  onDelete: (bookingId: number) => Promise<void>;
};

export default function DeleteReservation({
  bookingId,
  onDelete,
}: DeleteReservationProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    setOpen(false);
    startTransition(() => onDelete(bookingId));
  }

  return (
    <>
      <button
        disabled={isPending}
        onClick={() => setOpen(true)}
        className="group/delete flex flex-1 flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[initial] disabled:hover:text-primary-300"
      >
        {isPending && (
          <div className="mx-auto">
            <SpinnerMini />
          </div>
        )}

        {!isPending && (
          <>
            <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover/delete:text-primary-800" />
            <span className="mt-1">Delete</span>
          </>
        )}
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
