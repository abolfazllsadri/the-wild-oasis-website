"use client";

import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

type Tone = "warning" | "danger";

type TonesType = Record<
  Tone,
  { iconWrap: string; button: string; spinner: string }
>;

const tones: TonesType = {
  warning: {
    iconWrap: "bg-accent-600/15 text-accent-500 ring-accent-500/5",
    button:
      "bg-accent-600 text-slate-950 shadow-accent-500/20 hover:bg-accent-500 focus-visible:outline-accent-300",
    spinner: "border-slate-950/30 border-t-slate-950",
  },
  danger: {
    iconWrap: "bg-red-500/15 text-red-400 ring-red-500/5",
    button:
      "bg-red-600 text-white shadow-red-600/20 hover:bg-red-500 focus-visible:outline-red-400",
    spinner: "border-white/30 border-t-white",
  },
};

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  action: () => void | Promise<void>;
  title: string;
  description: string;
  confirmLabel?: string;
  pendingLabel?: string;
  cancelLabel?: string;
  icon?: React.ReactNode;
  tone?: Tone;
};

export default function ConfirmDialog({
  open,
  onClose,
  action,
  title,
  description,
  confirmLabel = "Confirm",
  pendingLabel = "Please wait...",
  cancelLabel = "Cancel",
  icon,
  tone = "warning",
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = tones[tone];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      className="confirm-dialog mx-auto mb-0 mt-auto w-full max-w-full overflow-hidden rounded-t-3xl border border-white/10 bg-primary-950 p-0 text-primary-100 shadow-2xl shadow-black/50 backdrop:bg-black/60 backdrop:backdrop-blur-sm sm:my-auto sm:max-w-md sm:rounded-3xl"
    >
      <form action={action}>
        <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:p-8">
          <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-white/15 sm:hidden" />

          <div className="flex flex-col items-center text-center">
            <div
              className={`mb-5 flex h-14 w-14 items-center justify-center rounded-full ring-8 ${t.iconWrap}`}
            >
              {icon}
            </div>

            <h2
              id="confirm-title"
              className="font-serif text-2xl font-bold tracking-wider"
            >
              {title}
            </h2>

            <p
              id="confirm-desc"
              className="mt-2 text-sm leading-relaxed text-primary-400 sm:text-base"
            >
              {description}
            </p>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-6 py-3 font-medium text-primary-200 transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:opacity-50 sm:min-w-32"
            >
              {cancelLabel}
            </button>

            <ConfirmButton pendingLabel={pendingLabel} tone={tone}>
              {confirmLabel}
            </ConfirmButton>
          </div>
        </div>
      </form>
    </dialog>
  );
}

type ConfirmButtonProps = {
  children: React.ReactNode;
  pendingLabel: string;
  tone: Tone;
};

function ConfirmButton({ children, pendingLabel, tone }: ConfirmButtonProps) {
  const { pending } = useFormStatus();
  const t = tones[tone];

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold shadow-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-32 ${t.button}`}
    >
      {pending && (
        <span
          className={`h-4 w-4 animate-spin rounded-full border-2 ${t.spinner}`}
        />
      )}

      {pending ? pendingLabel : children}
    </button>
  );
}
