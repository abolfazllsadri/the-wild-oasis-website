import SelectCountry from "@/components/SelectCountry";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";
import { getGuest } from "@/lib/data-service";
import { cn } from "@/lib/utils";

type PageProps = {
  searchParams: { status?: string };
};

export const metadata = { title: "Update profile" };

const MESSAGES: Record<string, { text: string; style: string }> = {
  updated: {
    text: "Your profile was updated.",
    style: "border-green-800 bg-green-900/40 text-green-200",
  },
  "invalid-id": {
    text: "National ID must be 6 to 12 letters or numbers.",
    style: "border-red-900 bg-red-950/50 text-red-300",
  },
};

export default async function Page({ searchParams }: PageProps) {
  const session = await auth();
  const guest = await getGuest(session?.user?.email ?? "");
  const message = MESSAGES[searchParams.status ?? ""];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400 sm:text-3xl">
        Update your guest profile
      </h2>

      <p className="mb-8 text-base text-primary-200 sm:text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {message && (
        <p
          role="status"
          className={cn("mb-6 rounded-lg border px-4 py-3", message.style)}
        >
          {message.text}
        </p>
      )}

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          id="nationality"
          name="nationality"
          className="field"
          defaultCountry={guest?.nationality ?? ""}
        />
      </UpdateProfileForm>
    </div>
  );
}
