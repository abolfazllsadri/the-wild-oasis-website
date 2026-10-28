import SelectCountry from "@/components/SelectCountry";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";
import { getGuest } from "@/lib/data-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session?.user?.email ?? "");

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest} />
    </div>
  );
}
