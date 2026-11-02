import LinkButton from "@/components/LinkButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center py-12 sm:py-24">
      <div className="max-w-xl space-y-6 text-center">
        <p className="text-7xl font-black text-accent-500/40 sm:text-8xl">
          404
        </p>

        <h1 className="text-balance text-3xl font-bold text-primary-50 sm:text-4xl">
          This page could not be found
        </h1>

        <p className="text-lg text-primary-200">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <LinkButton href="/" className="px-6 py-3 text-lg font-semibold">
            Go back home
          </LinkButton>

          <Link
            href="/cabins"
            className="px-6 py-3 text-lg text-primary-200 transition-colors hover:text-accent-300"
          >
            Browse cabins
          </Link>
        </div>
      </div>
    </section>
  );
}
