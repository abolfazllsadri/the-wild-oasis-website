"use client";

import { confirmPayment } from "@/lib/actions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type PaymentToastProps = {
  status?: string;
  sessionId?: string;
};

export default function PaymentToast({ status, sessionId }: PaymentToastProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "cancelled")
      toast.info("Payment cancelled. You can pay any time from this page.", {
        id: "payment",
      });

    if (status === "success" && sessionId) {
      toast.loading("Confirming your payment...", { id: "payment" });

      confirmPayment(sessionId)
        .then(({ paid, error }) => {
          if (paid)
            toast.success("Payment received. Thank you!", { id: "payment" });
          else if (error) toast.error(error, { id: "payment" });
          else
            toast.warning(
              "Your payment is still processing. This reservation will update shortly.",
              { id: "payment" },
            );

          router.refresh();
        })
        .catch(() =>
          toast.error("We couldn't verify this payment.", { id: "payment" }),
        );
    }

    if (status) router.replace(pathname, { scroll: false });
  }, [status, router, pathname, sessionId]);

  return null;
}
