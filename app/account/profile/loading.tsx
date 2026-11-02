import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <Spinner />
      <p className="text-lg font-medium text-primary-200 sm:text-xl">
        Loading your data...
      </p>
    </div>
  );
}
