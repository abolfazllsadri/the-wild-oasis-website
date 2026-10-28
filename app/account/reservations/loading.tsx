import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl font-medium text-primary-200">
        Loading reservations data...
      </p>
    </div>
  );
}
