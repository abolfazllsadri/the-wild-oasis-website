import LinkButton from "@/components/LinkButton";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign-in problem",
  robots: { index: false },
};

function getErrorMessage(code?: string) {
  if (code === "AccessDenied")
    return {
      title: "We couldn't sign you in",
      description:
        "Your Google account was verified, but we couldn't finish setting up your guest profile. Please try again in a moment.",
    };

  if (code === "Configuration")
    return {
      title: "Sign-in is unavailable",
      description: "There is a problem on our side. Please try again later.",
    };

  if (code?.startsWith("OAuth") || code === "Callback")
    return {
      title: "Sign-in was interrupted",
      description:
        "The sign-in with Google was cancelled or did not finish. You can try again whenever you are ready.",
    };

  if (code === "SessionRequired")
    return {
      title: "Please sign in",
      description: "You need to be signed in to see this page.",
    };

  return {
    title: "Something went wrong",
    description:
      "An unexpected error occurred while signing you in. Please try again.",
  };
}

export default async function Page({
  searchParams,
}: PageProps<"/login/error">) {
  const { error } = await searchParams;

  const code =
    error && /^[A-Za-z]{1,40}$/.test(error?.toString()) ? error : null;
  const { title, description } = getErrorMessage(code?.toString());

  return (
    <div className="flex items-center justify-center py-8 sm:py-20">
      <div className="w-full max-w-md rounded-2xl border border-primary-800 bg-primary-900/50 p-6 text-center shadow-2xl shadow-black/30 sm:p-10">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-400 ring-8 ring-red-500/5">
          <ExclamationTriangleIcon className="h-7 w-7" aria-hidden />
        </div>

        <h1 className="text-2xl text-balance text-primary-50 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-3 text-primary-300">{description}</p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
          <LinkButton
            href="/login"
            className="w-full px-6 py-3 text-lg font-semibold sm:w-auto"
          >
            Try again
          </LinkButton>

          <Link
            href="/"
            className="px-4 py-2 text-primary-300 transition-colors hover:text-primary-100"
          >
            Back to home
          </Link>
        </div>

        {code && (
          <p className="mt-8 text-xs text-primary-500">Error code: {code}</p>
        )}
      </div>
    </div>
  );
}
