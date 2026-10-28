import SelectCountry from "@/components/SelectCountry";
import SubmitButton from "@/components/SubmitButton";
import { updateGuest } from "@/lib/actions";
import type { Guest } from "@/lib/types";
import Image from "next/image";

type UpdateProfileProps = {
  guest: Guest | null;
};

export default function UpdateProfileForm({ guest }: UpdateProfileProps) {
  if (!guest) return null;

  const { id, email, fullName, countryFlag, nationalID, nationality } = guest;

  return (
    <form
      action={updateGuest}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={fullName}
          className="w-full rounded-md bg-primary-200 px-5 py-3 text-primary-800 shadow-sm transition disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="w-full rounded-md bg-primary-200 px-5 py-3 text-primary-800 shadow-sm transition disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            src={countryFlag ?? ""}
            width={100}
            height={100}
            priority
            className="h-5 w-8 rounded-sm"
            alt={`${nationality} Country flag`}
          />
        </div>

        <SelectCountry
          id="nationality"
          name="nationality"
          className="w-full rounded-md bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultCountry={nationality ?? ""}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="w-full rounded-md bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitButton>Update profile</SubmitButton>
      </div>
    </form>
  );
}
