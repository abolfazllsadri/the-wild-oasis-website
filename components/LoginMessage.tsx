import LinkButton from "@/components/LinkButton";

export default function LoginMessage({ cabinId }: { cabinId: number }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 bg-primary-800 px-6 py-12 text-center">
      <p className="text-balance text-xl">
        Sign in to reserve this cabin and manage your stay.
      </p>

      <LinkButton
        href={`/login?next=/cabins/${cabinId}`}
        className="px-8 py-4 font-semibold"
      >
        Sign in to reserve
      </LinkButton>
    </div>
  );
}
