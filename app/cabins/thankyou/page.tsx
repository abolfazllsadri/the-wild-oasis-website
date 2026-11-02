import LinkButton from "@/components/LinkButton";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = { title: "Thank you", robots: { index: false } };

export default function Page() {
  return (
    <div className="mx-auto max-w-xl space-y-6 py-8 text-center sm:py-16">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-500/15 text-green-400 ring-8 ring-green-500/5">
        <CheckCircleIcon className="h-9 w-9" aria-hidden />
      </div>

      <h1 className="text-balance text-3xl font-semibold sm:text-4xl">
        Thank you for your reservation!
      </h1>

      <p className="text-lg text-primary-300">
        Your stay has been booked. You can review or edit it any time from your
        guest area. You can pay online from your reservations page, or on
        arrival.
      </p>

      <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-5">
        <LinkButton
          href="/account/reservations"
          className="px-6 py-3 text-lg font-semibold"
        >
          Manage your reservations
        </LinkButton>

        <Link
          href="/cabins"
          className="px-6 py-3 text-lg text-primary-200 transition-colors hover:text-accent-300"
        >
          Browse more cabins
        </Link>
      </div>
    </div>
  );
}
