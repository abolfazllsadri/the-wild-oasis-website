"use client";

import LinkButton from "@/components/LinkButton";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex items-center justify-center px-6 py-24">
      <div className="max-w-lg space-y-6 rounded-lg border border-primary-800 bg-primary-950 p-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-primary-50">
          Something went wrong!
        </h1>

        <p className="text-lg text-primary-200">
          {error.message ||
            "An unexpected error occurred while loading this page."}
        </p>

        <LinkButton
          onClick={() => reset()}
          className="rounded-lg px-6 py-3 text-xl font-medium"
        >
          Try again
        </LinkButton>
      </div>
    </section>
  );
}
