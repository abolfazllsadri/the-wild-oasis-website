import { signOutAction } from "@/lib/actions";
import ConfirmDialog from "@/components/ConfirmDialog";
import { ArrowRightStartOnRectangleIcon as ArrowRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function SignOutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-4 rounded-lg px-5 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100"
      >
        <ArrowRightIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        action={signOutAction}
        tone="warning"
        title="Sign out?"
        description="You will be signed out of your guest area. You can sign back in at any time."
        confirmLabel="Sign out"
        pendingLabel="Signing out..."
        cancelLabel="Stay signed in"
        icon={<ArrowRightIcon className="h-7 w-7 stroke-current" aria-hidden />}
      />
    </>
  );
}
