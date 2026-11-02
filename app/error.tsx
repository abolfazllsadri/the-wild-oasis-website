"use client";

import { useEffect } from "react";
import Link from "next/link";
import LinkButton from "@/components/LinkButton";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <section className="flex items-center justify-center py-12 sm:py-24">
      <div className="w-full max-w-lg space-y-6 rounded-xl border border-primary-800 bg-primary-900/50 p-6 text-center shadow-lg sm:p-8">
        <h1 className="text-balance text-3xl font-bold text-primary-50 sm:text-4xl">
          Something went wrong!
        </h1>

        <p className="text-lg text-primary-200">
          {isDev && error.message
            ? error.message
            : "An unexpected error occurred while loading this page. Please try again."}
        </p>

        <div className="flex flex-row items-center justify-center gap-3 sm:gap-5">
          <LinkButton
            onClick={() => reset()}
            className="rounded-lg px-6 py-3 text-lg font-semibold"
          >
            Try again
          </LinkButton>

          <Link
            href="/"
            className="px-6 py-3 text-lg text-primary-200 transition-colors hover:text-accent-300"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
