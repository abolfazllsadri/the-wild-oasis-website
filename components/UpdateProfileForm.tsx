"use client";

import SubmitButton from "@/components/SubmitButton";
import { updateGuest } from "@/lib/actions";
import type { Guest } from "@/lib/types";
import Image from "next/image";
import { toast } from "sonner";

type UpdateProfileProps = {
  guest: Guest | null;
  children: React.ReactNode;
};

export default function UpdateProfileForm({
  guest,
  children,
}: UpdateProfileProps) {
  if (!guest) return null;

  const { email, fullName, countryFlag, nationalID, nationality } = guest;

  async function handleAction(formData: FormData) {
    const { error } = await updateGuest(formData);

    if (error) toast.error(error);
    else toast.success("Profile updated");
  }

  return (
    <form
      action={handleAction}
      className="flex flex-col gap-6 rounded-xl border border-primary-800/50 bg-primary-900 p-5 text-lg sm:px-10 sm:py-8"
    >
      <div className="space-y-2">
        <label htmlFor="fullName">Full name</label>
        <input
          disabled
          id="fullName"
          name="fullName"
          defaultValue={fullName}
          className="field"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">Email address</label>
        <input
          disabled
          id="email"
          name="email"
          defaultValue={email}
          className="field"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image
              src={countryFlag}
              width={100}
              height={100}
              className="h-5 w-8 rounded-sm object-cover"
              alt={`${nationality} flag`}
            />
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          id="nationalID"
          name="nationalID"
          defaultValue={nationalID}
          required
          minLength={6}
          maxLength={12}
          pattern="[a-zA-Z0-9]{6,12}"
          title="6 to 12 letters or numbers"
          autoComplete="off"
          className="field"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end">
        <SubmitButton>Update profile</SubmitButton>
      </div>
    </form>
  );
}
