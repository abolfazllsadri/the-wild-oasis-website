import LinkButton from "@/components/LinkButton";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center px-6 py-24">
      <div className="max-w-xl space-y-6 text-center">
        <h1 className="text-4xl font-bold text-primary-50">
          This page could not be found :(
        </h1>

        <p className="text-lg text-primary-200">
          The cabin you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <LinkButton href="/cabins" className="px-6 py-3 text-xl font-semibold">
          Back to all cabins &rarr;
        </LinkButton>
      </div>
    </main>
  );
}
