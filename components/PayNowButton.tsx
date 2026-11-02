"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/lib/actions";
import { toast } from "sonner";
import LinkButton from "@/components/LinkButton";

export default function PayNowButton({ bookingId }: { bookingId: number }) {
  const [isPending, startTransition] = useTransition();

  function handlePayment() {
    startTransition(async () => {
      const { url, error } = await createCheckoutSession(bookingId);

      if (error || !url) {
        toast.error(error ?? "Could not start the payment. Please try again.");
        return;
      }

      window.location.assign(url);
    });
  }

  return (
    <LinkButton
      type="button"
      disabled={isPending}
      onClick={handlePayment}
      className="px-4 py-1.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? "Redirecting..." : "Pay now"}
    </LinkButton>
  );
}
