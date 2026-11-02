import LinkButton from "@/components/LinkButton";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center py-12 sm:py-24">
      <div className="max-w-xl space-y-6 text-center">
        <h1 className="text-balance text-3xl font-bold text-primary-50 sm:text-4xl">
          Reservation not found
        </h1>

        <p className="text-lg text-primary-200">
          The reservation you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>

        <LinkButton
          href="/account/reservations"
          className="px-6 py-3 text-lg font-semibold"
        >
          Back to all reservations &rarr;
        </LinkButton>
      </div>
    </section>
  );
}
